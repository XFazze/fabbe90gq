
from pymongo import MongoClient


def addPopular(summonerName, region):
    client = MongoClient('localhost', 27017)
    db = client.lb2000
    collection = db.lolPopular
    collection.find_one_and_update({'summonerName': summonerName,
                                    'region': region},
                                   {'$inc': {'popularity': 1}},
                                   {'summonerName': summonerName,
                                    'region': region,
                                    'popularity': 1},
                                    upsert=True)


def getPopular(region):
    query = {}
    if region != 'noregion':
        query['region'] = region
    client = MongoClient('localhost', 27017)
    db = client.lb2000
    collection = db.lolPopular
    return list(collection.find(query).limit(10))
    
