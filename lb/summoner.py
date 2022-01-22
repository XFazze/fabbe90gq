
from pymongo import MongoClient
from copy import deepcopy
import time


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
