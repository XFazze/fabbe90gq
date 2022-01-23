
from doctest import master
from pymongo import MongoClient, DESCENDING
from copy import deepcopy
import time
from lb2000.update.api_calls import *


def updateMasterySummoner(id, region, puuid, riotApiKey):
    client = MongoClient('localhost', 27017)
    db = client.lb2000
    masteryColl = db.mastery

    mastery = get_mastery(region, id, riotApiKey)
    masterPoints = int(sum([item['championPoints']for item in mastery])/1000)
    totalMastery = get_total_mastery(region, id, riotApiKey)
    data = {
        'puuid': puuid,
        'mastery': mastery,
        'masterPoints': masterPoints,
        'totalMastery': totalMastery,

    }

    searchMastery = deepcopy(data)
    data['time'] = round(time.time())
    masteryColl.replace_one(searchMastery, data, upsert=True)
    return
