import requests
import time
from config import *
import datetime
from pymongo import MongoClient
from blueprints.lb2000 import call
# TODO save matches in mongodb database
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

# when objectives
# when firstblood
# diff kills&cs&gold @ 10&15&30&40&50
# last game result, streak len
# seas


def get_allMatches(puuid, region_large, api_key):
    url = "https://" + region_large + \
        ".api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids"

    matches = []
    index = 0
    while True:
        params = {
            'start': index*100,
            'count': '100',
            'api_key': api_key
        }
        tempmatch = requests.get(url, params=params).json()
        print('matches length',len( matches))
        if len(tempmatch) == 0:
            print
            break
        matches.extend(tempmatch)
        index += 1
        time.sleep(1)
    matches.reverse()
    matchesClean = []
    lastResult=False
    streak=0
    time0 = 1
    for matchId in matches:
        #print('game:', matchId, round(100*matches.index(matchId))/len(matches))
        match, lastResult, streak = call((insertMatch), (region_large, matchId, puuid, lastResult, streak))
        matchesClean.append(match)
        time.sleep(1)
        print(matches.index(matchId), time.time()-time0)
        time0 = time.time()
    
    client = MongoClient('localhost', 27017)
    db = client.loldetailsa
    collection = db.afknotif
    collection.insert_many(matchesClean)
    return 1


def insertMatch(region_large, matchId, puuid, lastResult, streak):
    url = "https://" + region_large + \
        ".api.riotgames.com/lol/match/v5/matches/" + matchId
    #print('match url', url, )
    params = {
        'api_key': riot_api_key
    }
    response = requests.get(url, params=params).json()
    while 'info' not in response.keys():
        print('error or rate limited pulling out')
        time.sleep(120)
        response = requests.get(url, params=params).json()
    # print(response)
    player = next(
        item for item in response['info']['participants'] if item["puuid"] == puuid)
    #print(matchId)
    response['info']['participants'].remove(player)
    res = {
        'gameMode': response['info']['gameMode'],
        'dateInSeconds': response['info']['gameCreation'],
        'timeOfDay': str((response['info']['gameCreation']/3600000) % 24),
        'duration': response['info']['gameDuration'],
        'win': player['win'],
        'lastResult' : lastResult,
        'streak' : streak,
        'side': player['teamId'],
        'surrender' : {
            'early' : player['gameEndedInEarlySurrender'],
            'surrender' : player['gameEndedInSurrender']
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
            'kda': (player['kills'] + player['assists'])/player['deaths'],
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
                'objective' : player['damageDealtToObjectives'],
                'towers' : player['damageDealtToTurrets'],

            },
            'multiKills': {
                'double': player['doubleKills'],
                'triple': player['tripleKills'],
                'quadra': player['quadraKills'],
                'penta': player['pentaKills'],
                'killingSprees': player['killingSprees'],
            },
            'objectives' : {
                'stolen' : player['objectivesStolen'],
                'stolenAssists' : player['objectivesStolenAssists'],
                'drakes' : player['dragonKills'],
                'teamDrakes' : sum([item['dragonKills'] for item in response['info']['participants'] if item["teamId"] == player['teamId']]),
                'totalDrakes' : sum([item['dragonKills'] for item in response['info']['participants'] if item["teamId"] != player['teamId']]),
                'baron' : player['baronKills'],
                'teamDrakes' : sum([item['baronKills'] for item in response['info']['participants'] if item["teamId"] == player['teamId']]),
                'totalDrakes' : sum([item['baronKills'] for item in response['info']['participants'] if item["teamId"] != player['teamId']]),
            },
            'random' : {
                'cctime' : player['timeCCingOthers'],
                'heal' : player['totalHeal']
            }
        },
        'firstBlood' : {
            'self' : player['firstBloodKill'],
            'assist' : player['firstBloodAssist'],
            'team' : [item['firstBloodKill'] for item in response['info']['participants'] if item["teamId"] != player['teamId'] and item['firstBloodKill'] == True]
        }


    }
    if lastResult == streak:
        streak += 1
    else:
        streak = 0
    return res, player['win'], streak


if __name__ == '__main__':
    get_allMatches(
        '3VCS6KTBoaESKYP4ZMpUiBY-sTRJ27gLwjbyWlpNotMgrj_NRWSxWVYwcQPKWxA_ZJtcL49vrGe35g', 'EUROPE', riot_api_key)
