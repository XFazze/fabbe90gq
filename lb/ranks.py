
from lb.api_calls import *
from config import *
from pymongo import MongoClient
import time
from lb.seasonsSplits import *


queues = ['RANKED_SOLO_5x5', 'RANKED_FLEX_SR']
divisions = ['I', 'II', 'III', 'IV']
tiers = ['IRON', 'BRONZE', 'SILVER', 'GOLD','PLATINUM', 'DIAMOND']

def getRankedPlayers(region, riot_api_key):
    client = MongoClient('localhost', 27017)
    db = client.rankedPlayers
    regionRankedPlayersColl = db[region]
    seasonSplit =  timeToSeasonSplit(time.time())
    try:
        lastTime = regionRankedPlayersColl.find({'summonerId' : 'meta'})[0]['time']
        print(lastTime)
        #FIXME newly ranked players !!
        #FIXME Update meta time 
        if lastTime + 86400 > time.time():
            print('not old enough data')
            return False

    except:
        regionRankedPlayersColl.insert({
            'summonerId' : 'meta',
            'time' : time.time()
        })
        print('new region')
    for queue in queues:
        for tier in tiers:
            for division in divisions:
                print(queue, tier, division)
                page = 1
                league = get_league(region, tier,  division, queue, page, riot_api_key)
                while league:
                    print('page', page)
                    league = [dict(player, **{'time':time.time()/1000, 'seasonSplit' : seasonSplit}) for player in league]
                    regionRankedPlayersColl.insert_many(league)
                    page += 1
                    league = get_league(region, tier,  division, queue, page, riot_api_key)


if __name__ == '__main__':
    getRankedPlayers('EUN1', riot_api_key)