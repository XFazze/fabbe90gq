
from lb2000.update.api_calls import *
from config import *
from pymongo import MongoClient, DESCENDING
import time
from lb2000.seasonsSplits import *



def updateRankedPlayers(region, summonerId, riotApiKey):
    # monthlyAllPlayers(region,riotApiKey)
    getRankedPlayer(region, summonerId, riotApiKey)


def monthlyAllPlayers(region, riotApiKey):
    client = MongoClient('localhost', 27017)
    db = client.rankedPlayers
    regionRankedPlayersColl = db[region]
    t = time.time()
    seasonSplit = timeToSeasonSplit(t)
    try:
        lastTime = regionRankedPlayersColl.find(
            {'summonerId': 'meta'})[0]['time']
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
                                    queue, page, riotApiKey)
                for player in league:
                    player['time'] = t

                while league:
                    print('page', page)
                    league = [dict(
                        player, **{'time': t/1000, 'seasonSplit': seasonSplit}) for player in league]
                    regionRankedPlayersColl.insert_many(league)
                    page += 1
                    league = get_league(
                        region, tier,  division, queue, page, riotApiKey)
                    for player in league:
                        player['time'] = t


def getRankedPlayer(region, summonerId, riotApiKey):
    client = MongoClient('localhost', 27017)
    db = client.lb2000
    oldRanks = list(db.find({'summonerId': summonerId,'region' : region}, sort=[('time', DESCENDING)]))
    # print(oldRanks)

    t = time.time()
    try:
        if oldRanks[0]['time']+60*20 > t:
            print('ranks are new')
            return
    except:
        pass
    ranks = get_rank(region, summonerId, riotApiKey)
    for player in ranks:
        player['time'] = t
        player['region'] = region
    print(ranks)
    if not ranks:
        return
    db.insert_many(ranks)


if __name__ == '__main__':
    getRankedPlayers('EUN1', riotApiKey)
