
from pymongo import MongoClient
from regions import * 

def addPopular(summonerName, region):
    client = MongoClient('localhost', 27017)
    db = client.lb2000
    collection = db.lolPopular
    new = {'summonerName': summonerName,
                                    'region': region,
                                    'niceRegion' : regionConverter4[region],
                                    'popularity': 1}
    collection.find_one_and_update({'summonerName': summonerName,
                                    'region': region,
                                    'niceRegion' : regionConverter4[region]},
                                   {'$inc': {'popularity': 1}},
                                   new,
                                    upsert=True)


def getPopular(region):
    query = {}
    if region != 'noregion':
        query['region'] = region
    client = MongoClient('localhost', 27017)
    db = client.lb2000
    collection = db.lolPopular
    return list(collection.find(query).limit(10))
    
