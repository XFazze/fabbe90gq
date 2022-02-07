
from itsdangerous import exc
from pymongo import MongoClient
from copy import deepcopy
import time
from pprint import pprint

from lb2000.regions import  *
from lb2000.update.api_calls import get_summoner

def updateSummoner(summoner, region):
    client = MongoClient('localhost', 27017)
    db = client.lb2000
    summoners = db.summoners

    coll = db.puuidRegion
    coll.replace_one({'puuid': summoner['puuid']}, {
        'puuid': summoner['puuid'], 'region': region}, upsert=True)

    summoner['region'] = region
    summoner.pop('revisionDate')
    searchSummoner = deepcopy(summoner)
    summoner['time'] = round(time.time())
    summoners.replace_one(searchSummoner, summoner, upsert=True)
    return


def getUpdateLostSummoner(username, region, riotApiKey):
    client = MongoClient('localhost', 27017)
    db = client.lb2000
    summonersColl = db.summoners
    resSummoners = {}
    for Tregion in regionConverter1.keys():
        
        summoner = summonersColl.find_one({'searchName' : username.lower(), 'region' : Tregion})
        if not summoner:
            summoner = get_summoner(Tregion, username, riotApiKey)
            searchSummoner = {
                'searchName' : username.lower(),
                'region' : Tregion
            }

            if not summoner:
                summoner = {'puuid': False, 'searchName' : username.lower(), 'region' : Tregion}
            else:
                summoner['region'] = Tregion
                summoner['searchName'] = summoner['name'].lower()
                summoner.pop('revisionDate')
                summoner['time'] = round(time.time())

            summonersColl.replace_one(searchSummoner, summoner, upsert=True)



        resSummoners[Tregion] = summoner
        #print('resSs', resSummoners)
    return resSummoners

# se if summoner exzist in region otherwise get summoner
# maybe add none and time 
# return list aswell as adding ind db
    summoner['region'] = region
    summoner.pop('revisionDate')
    searchSummoner = deepcopy(summoner)
    summoner['time'] = round(time.time())
    summoners.replace_one(searchSummoner, summoner, upsert=True)
    return
