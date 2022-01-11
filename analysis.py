import requests, time
from config import *
import datetime
#TODO save matches in mongodb database
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

# champs
# objectives taken when
# first blood who when
# diff kills&cs&gold @ 10&15&30&40&50
# last game result, streak len
# seas
# side(blue/red)

def get_allMatches(puuid, region_large, api_key):
    url = "https://" + region_large + ".api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids"
    
    qs = ['ranked', 'normal']
    for type in qs:
        matches = []
        print('q type', type)
        index = 0
        while True:
            params = {
                'start': index*100,
                'count':'100',
                'api_key':api_key,
                'type' : type
            }
            tempmatch = requests.get(url, params=params).json()
            print(tempmatch)
            if len(tempmatch) == 0:
                print
                break
            matches.extend(tempmatch)
            index += 1
            time.sleep(1)

        for matchId in matches:
            insertMatch(region_large, matchId, puuid)
            time.sleep(2)

    return   1

def insertMatch(region_large, matchId, puuid):
    url = "https://" + region_large + ".api.riotgames.com/lol/match/v5/matches/" + matchId
    params = {
        'api_key' : riot_api_key
    }
    response = requests.get(url, params=params).json()
    print(response)
    player = next(item for item in response['info']['participants'] if item["puuid"] == puuid)
    res = {
        'gameMode' : response['info']['gameMode'],
        'dateInSeconds' : response['info']['gameCreation'],
        'timeOfDay' : str(datetime.timedelta(response['info']['gameCreation'])),
        'duration' : response['info']['gameDuration'],
        'win' : player['win'],
        'stats': {
            'kills' : player['kills'],
            'assists' : player['assists'],
            'deaths' : player['deaths'],
            'kda' : (player['kills'] + player['assists'])/player['deaths'],
            'cs' : player['totalMinionsKilled'],
            'vision' : {
                'visionScore' : player['visionScore'],
                'wardsKilled' : player['wardsKilled'],
                'wardsPlaced' : player['wardsPlaced'],
                'controlWards' : player['visionWardsBoughtInGame']
            },
            'damage' : {
                'done' : player['totalDamageDealtToChampions'],
                'doneShare' : player['totalDamageDealtToChampions']/sum(item['totalDamageDealtToChampions'] for item in response['info']['participants']),
                'taken' : player['totalDamageTaken'],
                'takenShare' : player['totalDamageTaken']/sum(item['totalDamageTaken'] for item in response['info']['participants'])

            },
            'multiKills' : {
                'double' : player['doubleKills'],
                'triple' : player['tripleKills'],
                'quadra' : player['quadraKills'],
                'penta' : player['pentaKills'],
                'killingSprees' : player['killingSprees'],
            }
        }


    }
    time.sleep(9999)
    

if __name__ == '__main__':
    get_allMatches('3VCS6KTBoaESKYP4ZMpUiBY-sTRJ27gLwjbyWlpNotMgrj_NRWSxWVYwcQPKWxA_ZJtcL49vrGe35g', 'EUROPE', riot_api_key)