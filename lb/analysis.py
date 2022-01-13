import requests
import time
import datetime
from pprint import pprint
from pymongo import MongoClient
import ..blueprints

from seasonsSplits import seasonsDates
from queueId import queueIdConverter
from championIdtoname import champNames
from api_calls import *


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
    # downloading and inserting matches into mongodb
    matchesAmount = get_allMatches(puuid, region_large, api_key)
    updateUserDetails(puuid, matchesAmount)


def get_allMatches(puuid, region_large, api_key):
    matches = get_MatchHistory(puuid, region_large, api_key)
    matchesClean = []
    lastResult = False
    streak = 0
    time0 = 1
    for matchId in matches:
        #print('game:', matchId, round(100*matches.index(matchId))/len(matches))
        # TODO skip already analysed matches
        match, lastResult, streak = call(
            (insertMatch), (region_large, matchId, puuid, lastResult, streak, api_key))
        if match:
            matchesClean.append(match)
        time.sleep(1)
        print(matches.index(matchId), round(matches.index(
            matchId)*100/len(matches)), time.time()-time0)
        time0 = time.time()

    client = MongoClient('localhost', 27017)
    db = client.loldetails
    collection = db[puuid]
    collection.insert_many(matchesClean)
    return len(matches)


def get_MatchHistory(puuid, region_large, api_key):
    matches = []
    index = 0
    while True:
        #FIXME get call !!
        tempmatch = call(get_match_history, (puuid, api_key,index*100, '100')).json()
        print('matches length', len(matches))
        if len(tempmatch) == 0:
            print
            break
        matches.extend(tempmatch)
        index += 1
        time.sleep(1)
        break
    matches.reverse()
    return matches


def insertMatch(region_large, matchId, puuid, lastResult, streak, api_key):
    #print('match url', url, )
    response = call(get_match, (region_large, matchId, api_key)).json()
    while 'info' not in response.keys():
        print('error', response['status'], matchId)
        if response['status']['status_code'] == 404:
            print('match not found skipping')
            return False, lastResult, streak

        print('error or rate limited pulling out')
        time.sleep(120)
        response = requests.get(url, params=params).json()
    # print(response)
    player = next(
        item for item in response['info']['participants'] if item["puuid"] == puuid)
    # print(matchId)
    response['info']['participants'].remove(player)
    res = {
        'type': 'game',
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


def updateUserDetails(puuid, matchesAmount):
    client = MongoClient('localhost', 27017)
    db = client.loldetails
    collection = db[puuid]
    details = analyzeMatches(collection, {'type': 'game'})
    retCollection = db['DONE'+puuid]
    retCollection.replace_one({'type' : 'details'}, details)
    meta = {
        'type' : 'meta',
        'latestTime' : time.time(),
        'matchesAmount' : matchesAmount
    }
    retCollection.insert( meta)


def analyzeMatches(collection, query):
    res = {
        'type' : 'details'
    }
    res['wr'] = analyzeWR(collection, query)
    res['timeOfDay'] = analyzeTimeOfDay(collection,query)
    return res


def analyzeWR(collection, query):
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

        for teamPosition in ['MIDDLE', 'TOP', 'JUNGLE', 'BOTTOM', 'UTILITY', '']:
            query['teamPosition'] = teamPosition
            teamPositionDict = {
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

            queueTypeDict[champ] = teamPositionDict
        res[queueIdConverter[queueType]] = queueTypeDict

    #print(res['wins'], res['losses'])
    #for i in queueIdConverter.values():
    #    print(i, res[ i]['wins'], res[ i]['losses'])
    return res


def analyzeTimeOfDay(collection, query):
    res = {
        'wins': 0,
        'losses': 0
    }
    for queueType in queueIdConverter.keys():
        query['queueId'] = int(queueType)
        queueTypeDict = {
            'wins' : 0,
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
                'losses' : losses
            }

        res[queueIdConverter[queueType]] = queueTypeDict

    return res


if __name__ == '__main__':
    get_allMatches('3VCS6KTBoaESKYP4ZMpUiBY-sTRJ27gLwjbyWlpNotMgrj_NRWSxWVYwcQPKWxA_ZJtcL49vrGe35g', 'EUROPE', 'RGAPI-8ecdf5ca-c236-4566-adda-bd355002807b')
    #updateUserDetails('3VCS6KTBoaESKYP4ZMpUiBY-sTRJ27gLwjbyWlpNotMgrj_NRWSxWVYwcQPKWxA_ZJtcL49vrGe35g', 100)
    #get_details('3VCS6KTBoaESKYP4ZMpUiBY-sTRJ27gLwjbyWlpNotMgrj_NRWSxWVYwcQPKWxA_ZJtcL49vrGe35g', 'EUROPE', riot_api_key)
    #analyzeMatches()