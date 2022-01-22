
from pymongo import MongoClient


def updateSummoner(summoner, region):
    client = MongoClient('localhost', 27017)
    db = client.lb2000
    summoners = db.summoners
    summoner['region'] = region
    summoner.pop('revisionDate')
    summoners.replace_one({'puuid': summoner['puuid']}, summoner, upsert=True)
    return
