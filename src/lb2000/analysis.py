import requests
import time
import datetime
from pprint import pprint
from pymongo import MongoClient
from threading import Thread

from lb2000.seasonsSplits import seasonsDates
from lb2000.queueId import queueIdConverter
from lb2000.championIdtoname import champNames
from lb2000.update.api_calls import *

# what scores?

# gametype
# season, time of day
# length
# kda
# cs
# killing spree
# mutli kills
# teamates
# vision score, wards placed/killed, control wards
# damage done/taken, share
# side(blue/red) i think teamid
# champs
# first blood
# objectives blood
# last game result, streak len

# TODO wr with diff teamates
# TODO change season/split
# TODO Add wr at different stages:
# TODO make easily updatable
# when objectives
# when firstblood
# diff kills&cs&gold @ 10&15&30&40&50
# last game result, streak len
# avg = avgold +(valuenew+avgold)/newsize


def get_details(puuid, region_large, api_key):
    client = MongoClient('localhost', 27017)
    db = client.loldetails
    collection = db[puuid]
    meta = list(collection.find({'type': 'meta'}))
    try:
        if meta[0]['downloading']:
            print('stop downloading')
            return
        else:
            print('not downloading ')
    except:
        print('new user  start downloading')

    downloadedMatches = [f['id'] for f in list(
        collection.find({'type': 'game'}, {'id': 1}))]
    matches = get_MatchHistory(puuid, region_large, api_key)

    if meta == []:
        meta = {
            'type': 'meta',
            'latestTime': time.time(),
                    'downloadedMatchesAmount': len(downloadedMatches),
                    'totalMatchesAmount': len(matches),
                    'analazyedMatchesAmount': 0,
                    'brokenMatchesAmount': 0,
                    'downloading': True
        }
        collection.insert(meta)
    else:
        meta = meta[0]
        collection.update({'type': 'meta'}, {'$set':
            {'downloading': True,
            'totalMatchesAmount': len(matches)}
        })

    collection.update({'type': 'brokenMatches'},
                      {'$set' : {'type': 'brokenMatches'},
                      '$setOnInsert': {'matches': []}}, upsert=True)

    brokenMatches = list(collection.find({'type': 'brokenMatches'}))[0]['matches']

    notDownloadedMatches = list(
        set(list(set(matches) - set(downloadedMatches)))-set(brokenMatches))
    print('there have already been analyzed matches. New matches :',
          len(notDownloadedMatches), ' and broken: ', len(brokenMatches))
    try:
        if len(notDownloadedMatches):
            get_allMatches(puuid, region_large, api_key, notDownloadedMatches)

        if meta['analazyedMatchesAmount'] != len(matches):
            updateUserDetails(puuid)
    except:
        print('GOT ERROR')
        pass
    collection.update_one({'type': 'meta'}, {'$set': {'downloading': False}})
    print('done with analysis')


def get_MatchHistory(puuid, region_large, api_key):
    matches = []
    index = 0
    while True:
        tempmatch = get_match_history(
            region_large, puuid, api_key, index*100, '100')
        print('matches length', len(matches))
        if len(tempmatch) == 0:
            break
        matches.extend(tempmatch)
        index += 1
        time.sleep(0.5)
    matches.reverse()
    return matches


def get_allMatches(puuid, region_large, api_key, matches):
    lastResult = False
    streak = 0
    time0 = 1

    client = MongoClient('localhost', 27017)
    db = client.loldetails
    collection = db[puuid]

    meta = list(collection.find({'type': 'meta'}))[0]
    for matchId in matches:
        match, lastResult, streak = insertMatch(
            region_large, matchId, puuid, lastResult, streak, api_key)

        if match and len(list(collection.find({'type': 'game', 'id': matchId}))) == 0:
            collection.insert_one(match)
        elif not match:
            collection.find_one_and_update({'type': 'brokenMatches'},
                                           {'$push': {'matches': matchId}})
            meta['brokenMatchesAmount'] += 1

        time.sleep(1)
        print('matchdownload progress: ', matches.index(matchId), round(matches.index(
            matchId)*100/len(matches)), time.time()-time0, puuid)
        time0 = time.time()

        meta['latestTime'] = time.time()
        meta['downloadedMatchesAmount'] = meta['downloadedMatchesAmount']+1
        collection.update({'type': 'meta'}, meta, True)
    return


def insertMatch(region_large, matchId, puuid, lastResult, streak, api_key):
    # print('match url', url, )
    response = get_match(region_large, matchId, api_key)
    while 'info' not in response.keys():
        # print('error', response['status'], matchId)
        if response['status']['status_code'] == 404:
            print('broken')
            return False, lastResult, streak

        print('error or rate limited pulling out', response['status']['status_code'])

        return False, lastResult, streak
    # print(response)
    player = next(
        item for item in response['info']['participants'] if item["puuid"] == puuid)
    # print(matchId)
    response['info']['participants'].remove(player)
    res = {
        'type': 'game',
        'id': matchId,
        'gameMode': response['info']['gameMode'],
        'gameType': response['info']['gameType'],
        'queueId': response['info']['queueId'],
        'teamPosition': player['teamPosition'],
        'dateInSeconds': response['info']['gameCreation'],
        'timeOfDay': str((response['info']['gameCreation']/3600000) % 24),
        'duration': response['info']['gameDuration'],
        'win': player['win'],
        'lastResult': lastResult,
        'streak': streak,
        'side': player['teamId'],
        'surrender': {
            'early': player['gameEndedInEarlySurrender'],
            'surrender': player['gameEndedInSurrender']
        },
        'champ': {
            'id': player['championId'],
            'name': player['championName']
        },
        'teams': {
            'own': [item['championName'] for item in response['info']['participants'] if item["teamId"] == player['teamId']],
            'enemy': [item['championName'] for item in response['info']['participants'] if item["teamId"] != player['teamId']]
        },
        'stats': {
            'kills': player['kills'],
            'assists': player['assists'],
            'deaths': player['deaths'],
            'cs': player['totalMinionsKilled'],
            'vision': {
                'visionScore': player['visionScore'],
                'wardsKilled': player['wardsKilled'],
                'wardsPlaced': player['wardsPlaced'],
                'controlWards': player['visionWardsBoughtInGame'],
                'controlWardsBought': player['detectorWardsPlaced']
            },
            'damage': {
                'done': player['totalDamageDealtToChampions'],
                'doneShare': player['totalDamageDealtToChampions']/sum(item['totalDamageDealtToChampions'] for item in response['info']['participants']),
                'taken': player['totalDamageTaken'],
                'takenShare': player['totalDamageTaken']/sum(item['totalDamageTaken'] for item in response['info']['participants']),
                'objective': player['damageDealtToObjectives'],
                'towers': player['damageDealtToTurrets'],

            },
            'multiKills': {
                'double': player['doubleKills'],
                'triple': player['tripleKills'],
                'quadra': player['quadraKills'],
                'penta': player['pentaKills'],
                'killingSprees': player['killingSprees'],
            },
            'objectives': {
                'stolen': player['objectivesStolen'],
                'stolenAssists': player['objectivesStolenAssists'],
                'drakes': player['dragonKills'],
                'teamDrakes': sum([item['dragonKills'] for item in response['info']['participants'] if item["teamId"] == player['teamId']]),
                'totalDrakes': sum([item['dragonKills'] for item in response['info']['participants'] if item["teamId"] != player['teamId']]),
                'baron': player['baronKills'],
                'teamDrakes': sum([item['baronKills'] for item in response['info']['participants'] if item["teamId"] == player['teamId']]),
                'totalDrakes': sum([item['baronKills'] for item in response['info']['participants'] if item["teamId"] != player['teamId']]),
            },
            'random': {
                'cctime': player['timeCCingOthers'],
                'heal': player['totalHeal']
            }
        },
        'firstBlood': {
            'self': player['firstBloodKill'],
            'assist': player['firstBloodAssist'],
            'team': [item['firstBloodKill'] for item in response['info']['participants'] if item["teamId"] != player['teamId'] and item['firstBloodKill'] == True]
        }


    }
    if player['deaths']:
        res['stats']['kda'] = (
            player['kills'] + player['assists'])/player['deaths']
    else:
        res['stats']['kda'] = -1

    if lastResult == streak:
        streak += 1
    else:
        streak = 0
    return res, player['win'], streak


def updateUserDetails(puuid):
    client = MongoClient('localhost', 27017)
    db = client.loldetails
    collection = db[puuid]
    meta = collection.find({'type': 'meta'})[0]
    meta['latestTime'] = time.time()
    details = analyzeMatches(collection, {'type': 'game'})
    collection.update({'type': 'wr'}, details, True)
    meta['analazyedMatchesAmount'] = meta['downloadedMatchesAmount']
    collection.update({'type': 'meta'}, meta, True)


def analyzeMatches(collection, query):
    res = {
        'type': 'wr'
    }
    res['wr'] = analyzeWR(collection, query)
    print('wr alnalyze complete')
    res['timeOfDay'] = analyzeTimeOfDay(collection, query)
    print('time of daya lnalyze complete')
    return res


def analyzeWR(collection, query):
    res = {
        'total': 0,
        'wins': 0,
        'losses': 0
    }
    for queueType in queueIdConverter.keys():
        query['queueId'] = int(queueType)
        queueTypeDict = {
            'total': 0,
            'wins': 0,
            'losses': 0
        }

        for teamPosition in ['MIDDLE', 'TOP', 'JUNGLE', 'BOTTOM', 'UTILITY', '']:
            query['teamPosition'] = teamPosition
            teamPositionDict = {
                'total': 0,
                'wins': 0,
                'losses': 0
            }

            for champ in champNames:
                query['champ.name'] = champ
                query['win'] = True
                teamPositionDict[champ] = {}
                # print(query)
                wins = collection.find(query).count()
                teamPositionDict[champ]['wins'] = wins
                queueTypeDict['wins'] += wins
                teamPositionDict['wins'] += wins
                res['wins'] += wins

                query['win'] = False
                losses = collection.find(query).count()
                teamPositionDict[champ]['losses'] = losses
                queueTypeDict['losses'] += losses
                teamPositionDict['losses'] += losses
                res['losses'] += losses

                teamPositionDict[champ]['total'] = (losses+wins)
                queueTypeDict['total'] += (losses+wins)
                teamPositionDict['total'] += (losses+wins)
                res['total'] += (losses+wins)
            queueTypeDict[teamPosition] = teamPositionDict
        res[queueIdConverter[queueType]] = queueTypeDict

    # print(res['wins'], res['losses'])
    # for i in queueIdConverter.values():
    #    print(i, res[ i]['wins'], res[ i]['losses'])
    return res


def analyzeTimeOfDay(collection, query):
    #FIXME broken
    res = {
        'wins': 0,
        'losses': 0
    }
    for queueType in queueIdConverter.keys():
        query['queueId'] = int(queueType)
        queueTypeDict = {
            'wins': 0,
            'losses': 0
        }
        for part in range(24):
            query['timeOfDay'] = str(part)
            query['win'] = True
            wins = collection.find(query).count()
            queueTypeDict['wins'] += 1
            res['wins'] += wins

            query['win'] = False
            losses = collection.find(query).count()
            queueTypeDict['losses'] += 1
            res['losses'] += losses

            queueTypeDict[str(part)] = {
                'wins': wins,
                'losses': losses
            }

        res[queueIdConverter[queueType]] = queueTypeDict

    return res


if __name__ == '__main__':
    # get_allMatches('3VCS6KTBoaESKYP4ZMpUiBY-sTRJ27gLwjbyWlpNotMgrj_NRWSxWVYwcQPKWxA_ZJtcL49vrGe35g', 'EUROPE', )
    # updateUserDetails('3VCS6KTBoaESKYP4ZMpUiBY-sTRJ27gLwjbyWlpNotMgrj_NRWSxWVYwcQPKWxA_ZJtcL49vrGe35g', 100)
    get_details('3VCS6KTBoaESKYP4ZMpUiBY-sTRJ27gLwjbyWlpNotMgrj_NRWSxWVYwcQPKWxA_ZJtcL49vrGe35g','EUROPE', 'RGAPI-ebe09c71-4d3e-4de2-ac7a-affc9b730f04')
    # analyzeMatches()
    
