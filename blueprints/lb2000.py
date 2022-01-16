from flask import *
from config import *
from threading import Thread
from bson import json_util
import os

from lb.api_calls import *
from lb.match_history import *
from lb.championIdtoname import *
from forms.lb2000_form import *
from lb.runes import *
from lb.analysis import *
from lb.popular import *
from lb.regions import *

lb2000 = Blueprint('lb2000', __name__)
#TODO connect accounts by verifying with pfp
#TODO player Tags
# champs player wr for champs/length
#TODO timeframes in analysis

#TODO Live game viewing

#TODO Lp graph search every night

#TODO summoner top champ background

#TODO get live lobby/game

#TODO redo get matches by saving raw matchdata in mongodb and reqiuesting with ajax

#TODO cache more summonerdata



@lb2000.route("/", methods=['GET', 'POST'])
@lb2000.route("/<region>/<summonername>", methods=['GET', 'POST'])
def lb2000_index(region='noregion', summonername='nouser'):
    if not request.script_root:
        # this assumes that the 'index' view function handles the path '/'
        request.script_root = url_for('lb2000.lb2000_index', _external=True)
    if request.method == 'POST':
        username = request.form.get('userName')
        region = regionConverter3[request.form.get('region')]
        return redirect ('/lb2000/' + region + '/'+ username)

    popular = getPopular(region)

    res = render_template('lb2000/lb2000_search.html', error=False, popular=popular)
    if summonername != 'nouser' or region != 'noregion':
        res = returnprofile(summonername, region, popular)
    if not res:
        res = render_template('lb2000/lb2000_search.html', error=True)
    return res

def returnprofile(summonername, region, popular):
    region_large = regionConverter1[region]
    form = lb2000_getuser
    summoner = get_summoner(region, summonername, riot_api_key)
    if "status" in summoner.keys():
        return False
    else:
        addPopular(summonername, region)
        mastery = get_mastery(region, summoner['id'], riot_api_key)
        masterPoints = int(sum([item['championPoints'] for item in mastery ])/1000)
        total_mastery = get_total_mastery(region, summoner['id'], riot_api_key)
        ranks = get_rank(region, summoner['id'], riot_api_key)
        match_history =  get_match_history(
            region_large, summoner['puuid'], riot_api_key, 0, 9)
        Thread(target=download_matches, args=(match_history, region, riot_api_key, runeIdToName)).start()
        Thread(target=get_details, args=(summoner['puuid'], region_large, riot_api_key)).start()
        timenow = time.time()
        form = lb2000_getuser()
        for i in mastery:
            i["championId"] = str(i["championId"])
        print('profile success')
        return render_template('lb2000/lb2000_base.html', summoner=summoner, region=region, region_large=region_large, niceRegion=regionConverter4[region], mastery=mastery, total_mastery=total_mastery, champ_id_to_name=champ_id_to_name, timenow=timenow, ranks=ranks, form=form,
                      match_history=match_history, summonerid=str(summoner['id']),  masterPoints=masterPoints, popular=popular)

@lb2000.route("/wr", methods=['GET', 'POST'])
def ajax_wr():
    puuid = request.args.get('puuid', 0, type=str)
    client = MongoClient('localhost', 27017)
    db = client.loldetails
    collection = db[str(puuid)]
    wr = list(collection.find({'type':'wr'}))

    if len(wr) == 0:
        print('cant find wr for puuid: ', puuid)
        return '0'
    return json.loads(json_util.dumps(wr[0]))

    


@lb2000.route("/progress", methods=['GET', 'POST'])
def ajax_progress():
    puuid = request.args.get('puuid', 0, type=str)
    client = MongoClient('localhost', 27017)
    db = client.loldetails
    collection = db[str(puuid)]
    doc = list(collection.find({'type':'meta'}))

    if len(doc) == 0:
        print('cant find wr for puuid: ', puuid)
        return '0'
    return json.loads(json_util.dumps(doc[0]))

@lb2000.route("/match", methods=['GET', 'POST'])
def ajax_match():
    matchId = request.args.get('id', 0, type=str)
    region, id = matchId.split('_')
    filename = 'static/lolgames_html/'+region+'/'+id+'.txt'
    while not os.path.isfile(filename):
        print('didnt find game sleeping',filename)
        time.sleep(2)
    

    return send_file(filename, mimetype='txt')

@lb2000.route("/example", methods=['GET', 'POST'])
def example():
    return render_template('lb2000/example.html')

'''
@lb2000.route("/riot.txt", methods=['GET', 'POST'])
def riot():
    filename = 'static/riot.txt'
    return send_file(filename, mimetype='txt')
'''