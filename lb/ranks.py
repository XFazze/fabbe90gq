
from lb.api_calls import *
from config import *
from pymongo import MongoClient, DESCENDING
import time
from lb.seasonsSplits import *


queues = ['RANKED_SOLO_5x5', 'RANKED_FLEX_SR']
divisions = ['I', 'II', 'III', 'IV']
tiers = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'DIAMOND']


def getRankedPlayers(region, summonerId, riot_api_key):
    # monthlyAllPlayers(region,riot_api_key)
    print('WEWEEWAE')
    getRankedPlayer(region, summonerId, riot_api_key)


def monthlyAllPlayers(region, riot_api_key):
    client = MongoClient('localhost', 27017)
    db = client.rankedPlayers
    regionRankedPlayersColl = db[region]
    t = time.time()
    seasonSplit = timeToSeasonSplit(t)
    try:
        lastTime = regionRankedPlayersColl.find(
            {'summonerId': 'meta'})[0]['time']
        print(lastTime)
        # FIXME newly ranked players !!
        # FIXME Update meta time
        if lastTime + (60*60*24*30) > t:
            print('not old enough data')
            return False

    except:
        regionRankedPlayersColl.insert({
            'summonerId': 'meta',
            'time': t
        })
        print('new region')
    for queue in queues:
        for tier in tiers:
            for division in divisions:
                print(queue, tier, division)
                page = 1
                league = get_league(region, tier,  division,
                                    queue, page, riot_api_key)
                for player in league:
                    player['time'] = t

                while league:
                    print('page', page)
                    league = [dict(
                        player, **{'time': t/1000, 'seasonSplit': seasonSplit}) for player in league]
                    regionRankedPlayersColl.insert_many(league)
                    page += 1
                    league = get_league(
                        region, tier,  division, queue, page, riot_api_key)
                    for player in league:
                        player['time'] = t


def getRankedPlayer(region, summonerId, riot_api_key):
    client = MongoClient('localhost', 27017)
    db = client.rankedPlayers
    regionRankedPlayersColl = db[region]
    oldRanks = list(regionRankedPlayersColl.find({'summonerId': summonerId
                                                  }, sort=[('time', DESCENDING)]))
    # print(oldRanks)

    t = time.time()
    try:
        if oldRanks[0]['time']+60*20 > t:
            print('ranks are new')
            return
    except:
        pass
    ranks = get_rank(region, summonerId, riot_api_key)
    for player in ranks:
        player['time'] = t
    print(ranks)
    regionRankedPlayersColl.insert_many(ranks)


if __name__ == '__main__':
    getRankedPlayers('EUN1', riot_api_key)
