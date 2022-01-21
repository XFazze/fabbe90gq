
from flask import *
from config import *
from threading import Thread
from bson import json_util
import time
import os
from random import randint

from lb.api_calls import *
from lb.match_history import *
from lb.championIdtoname import *
from forms.lb2000_form import *
from lb.runes import *
from lb.analysis import *
from lb.popular import *
from lb.regions import *
from lb.newSaveMatch import *
from lb.ranks import *
from lb.recentData import *

lb2000 = Blueprint('lb2000', __name__)
# TODO connect accounts by verifying with pfp
# TODO player Tags
# champs player wr for champs/length
# TODO timeframes in analysis

# TODO Live game viewing

# TODO Lp graph search every night

# TODO summoner top champ background

# TODO get live lobby/game

# TODO cache more summonerdata

# TODO rank distribution
# TODO average rank of champion
# TODO users top %

# TODO user not found page

# TODO calendar of matches

# TODO summoner history


@lb2000.route("/", methods=['GET', 'POST'])
@lb2000.route("/<region>/<summonername>", methods=['GET', 'POST'])
def lb2000_index(region='noregion', summonername='nouser'):
    if request.method == 'POST':
        username = request.form.get('userName')
        region = regionConverter3[request.form.get('region')]
        return redirect('/lb2000/' + region + '/' + username)

    popular = getPopular(region)

    res = render_template('lb2000/lb2000_search.html',
                          error=False, popular=popular)
    if summonername != 'nouser' or region != 'noregion':
        res = returnprofile(summonername, region, popular)
    if not res:
        res = render_template('lb2000/lb2000_search.html', error=True)
    return res


def returnprofile(summonername, region, popular):
    region_large = regionConverter1[region]
    summoner = get_summoner(region, summonername, riot_api_key)
    if not summoner:
        return False
    else:
        addPopular(summonername, region)
        mastery = get_mastery(region, summoner['id'], riot_api_key)
        masterPoints = int(sum([item['championPoints']
                           for item in mastery])/1000)
        total_mastery = get_total_mastery(region, summoner['id'], riot_api_key)
        Thread(target=getMatches, args=(
            summoner['puuid'], region_large, region, riot_api_key)).start()
        Thread(target=get_recentData, args=(summoner['puuid'],)).start()
        Thread(target=getRankedPlayers, args=(
            region, summoner['id'], riot_api_key)).start()

        multiAccId = randint(1, 27)
        multiAccUrl = f'https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon{ multiAccId }.png'
        client = MongoClient('localhost', 27017)
        coll = client.lb2000.multiAcc
        coll.replace_one({'puuid': summoner['puuid']}, {
                         'puuid': summoner['puuid'], 'pfpId': multiAccId}, upsert=True)
        coll = client.lb2000.puuidRegion
        coll.replace_one({'puuid': summoner['puuid']}, {
                         'puuid': summoner['puuid'], 'region': region}, upsert=True)

        # match_history =  get_match_history(region_large, summoner['puuid'], riot_api_key, 0, 9)
        # Thread(target=download_matches, args=(match_history, region, riot_api_key, runeIdToName)).start()
        # Thread(target=get_details, args=(summoner['puuid'], region_large, riot_api_key)).start()
        timenow = time.time()
        for i in mastery:
            i["championId"] = str(i["championId"])
        print('profile success')
        return render_template('lb2000/lb2000_base.html', summoner=summoner, region=region, region_large=region_large, niceRegion=regionConverter4[region], mastery=mastery, total_mastery=total_mastery, champ_id_to_name=champ_id_to_name, timenow=timenow,
                               summonerid=str(summoner['id']),  masterPoints=masterPoints, popular=popular, multiAccUrl=multiAccUrl)


@lb2000.route("/wr", methods=['GET', 'POST'])
def ajax_wr():
    puuid = request.args.get('puuid', 0, type=str)
    client = MongoClient('localhost', 27017)
    db = client.loldetails
    collection = db[str(puuid)]
    wr = list(collection.find({'type': 'wr'}))

    if len(wr) == 0:
        print('cant find wr for puuid: ', puuid)
        return '0'
    return json.loads(json_util.dumps(wr[0]))


@lb2000.route("/progress", methods=['GET', 'POST'])
def ajax_progress():
    puuid = request.args.get('puuid', 0, type=str)
    client = MongoClient('localhost', 27017)
    db = client.newMatches
    matchesColl = db.matches
    matchTrackingColl = db.matchTracking

    matchesDownloaded = matchesColl.count_documents(
        {'metadata.participants': {'$in': [puuid]}})
    tracking = matchTrackingColl.find_one({'puuid': puuid}, {'matchAmount': 1})
    if not tracking:
        print('user matches not found')
        return "matchTracking not found", 400

    print('amount downloaded:', matchesDownloaded,
          'total amount:', tracking['matchAmount'])
    res = {
        'totalAmount': tracking['matchAmount'],
        'downloaded': matchesDownloaded,
        'matchesToBeDownloaded': tracking['matchAmount'] - matchesDownloaded
    }
    return json.loads(json_util.dumps(res))


@lb2000.route("/match", methods=['GET', 'POST'])
def ajax_match():
    matchId = request.args.get('id', 0, type=str)
    region, id = matchId.split('_')
    filename = 'static/lolgames_html/'+region+'/'+id+'.txt'
    while not os.path.isfile(filename):
        print('didnt find game sleeping', filename)
        time.sleep(2)

    return send_file(filename, mimetype='txt')


@lb2000.route("/newMatch", methods=['GET', 'POST'])
def ajax_newMatch():
    matchId = request.args.get('id', 0, type=str)
    client = MongoClient('localhost', 27017)
    db = client.newMatches
    collection = db.matches
    match = collection.find_one({'metadata.matchId': matchId})
    if not match:
        print('match not found')
        return "match not found", 400
    return json.loads(json_util.dumps(match))


@lb2000.route("/newMatchHistory", methods=['GET', 'POST'])
def ajax_newMatchHistory():
    puuid = request.args.get('puuid', 0, type=str)
    client = MongoClient('localhost', 27017)
    db = client.newMatches
    collection = db.matchTracking
    newMatchHistory = collection.find_one({'puuid': puuid})
    if not newMatchHistory:
        print('match not found')
        return "match not found", 400
    return json.loads(json_util.dumps(newMatchHistory))


@lb2000.route("/recentData", methods=['GET', 'POST'])
def ajax_recentData():
    puuid = request.args.get('puuid', 0, type=str)
    client = MongoClient('localhost', 27017)
    db = client.analysis
    collection = db.recentData
    recentData = collection.find_one({'puuid': puuid, 'type': 'data'})
    if not recentData:
        print('recentdata not found')
        return "data not found", 400
    return json.loads(json_util.dumps(recentData))


@lb2000.route("/ranks", methods=['GET', 'POST'])
def ajax_ranks():
    summonerId = request.args.get('summonerId', 0, type=str)
    region = request.args.get('region', 0, type=str)
    if region not in ['eun1', 'euw1', 'kr', 'na1', 'br1', 'la1', 'la2', 'oc1', 'ru', 'tr1', 'jp1']:
        return 'region not allowed', 403

    client = MongoClient('localhost', 27017)
    regionRankedPlayersColl = client.rankedPlayers[region]

    res = {}
    soloq = list(regionRankedPlayersColl.find(
        {'summonerId': summonerId, 'queueType': 'RANKED_SOLO_5x5'}, sort=[('time', DESCENDING)]).limit(1))
    try:
        res['RANKED_SOLO_5x5'] = soloq[0]
    except:
        pass

    flex = list(regionRankedPlayersColl.find(
        {'summonerId': summonerId, 'queueType': 'RANKED_TEAM_5x5'}, sort=[('time', DESCENDING)]).limit(1))
    try:
        res['RANKED_FLEX_SR'] = flex[0]
    except:
        pass
    return json.loads(json_util.dumps(res))


@lb2000.route("/verify", methods=['GET', 'POST'])
def ajax_multiAccVerify():
    puuid = request.args.get('puuid', 0, type=str)
    region = request.args.get('region', 0, type=str)
    browserId = request.args.get('browserId', 0, type=str)
    client = MongoClient('localhost', 27017)
    coll = client.lb2000.multiAcc

    try:
        pfpId = list(coll.find({'puuid': puuid}))[0]['pfpId']
    except:
        return 'user is not in database', 400

    summoner = get_summonerPuuid(region, puuid, riot_api_key)
    if pfpId != summoner['profileIconId']:
        return 'Wrong profile Id', 400

    try:
        accounts = list(coll.find({'browserId': browserId}))[0]
        print(accounts)
        if puuid in accounts['accounts']:
            return 'account already added', 400

        accounts['accounts'].append(puuid)

        coll.replace_one({'browserId': browserId}, accounts)
    except:
        accounts = {
            'browserId': browserId,
            'accounts': [puuid]
        }
        coll.insert(accounts)
    coll.update_many({'browserId': {'$ne': browserId}},
                     {'$pull': {'accounts': puuid}})
    return 'successfull', 200


@lb2000.route("/multiAcc", methods=['GET', 'POST'])
def ajax_multiAccFind():
    puuid = request.args.get('puuid', 0, type=str)
    client = MongoClient('localhost', 27017)
    coll = client.lb2000.multiAcc
    try:
        accounts = list(coll.find({'accounts': {'$in': puuid}}))
    except:
        return 'there was no multi accunts', 400
    if not accounts:
        print('users doesnt exists')
        return 'this account has no linked accounts', 400
    puuids = accounts['accounts']
    puuidRegion = client.lb2000.puuidRegion

    res = []
    for puuid in puuids:
        region = list(puuidRegion.find({'puuid': puuid}))[0]['region']
        res.append(get_summonerPuuid(region, puuid))
        # TODO add rank

    return json.loads(json_util.dumps(res))


'''
@lb2000.route("/riot.txt", methods=['GET', 'POST'])
def riot():
    filename = 'static/riot.txt'
    return send_file(filename, mimetype='txt')
'''
