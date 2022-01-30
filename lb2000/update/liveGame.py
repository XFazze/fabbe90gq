from curses import pair_content
from lb2000.update.api_calls import *
from pymongo import MongoClient, DESCENDING
import time
from lb2000.ranks import *
import math
# check if its gone more than 1 min since last check
# if so gets it again 
def updateLiveGame(region, id, riotApiKey):
    client = MongoClient('localhost', 27017)
    liveGameColl = client.lb2000.liveGame
    rankedPlayersColl = client.lb2000.rankedPlayers
    t = time.time()
    try:
        lastGame = list(liveGameColl.find({'participants.summonerId': id}))[0]
        print('found a game:', lastGame['gameLength'] + lastGame['gameStartTime'])
        elapseTime = (lastGame['gameLength'] + lastGame['gameStartTime']/1000 + 30)

        if elapseTime + 30 > t:
            print('reecnt game is recent enough')
            return
        

    except:
        lastGame = False
        print('there is no last game')


    res = get_live_game(region, id, riotApiKey)
    if not res and lastGame:
        liveGameColl.delete_many({'gameId':lastGame['gameId']})

    if not res:
        return
    
    # rank
    #TODO add summoner level
    totalRank = 0
    for player in res['participants']:
        playerRank = rankedPlayersColl.find_one(
            {'summonerId': player['summonerId'], 'region':region}, sort=[('time', DESCENDING)])
        if not playerRank:
            # print('user not found')
            player['rank'] = {
                'tier': 'unranked',
                'rank': ''
            }
            continue
        player['rank'] = playerRank
        player['rank'] = playerRank

        totalRank += tiers.index(playerRank['tier']) * \
            4 + divisions.index(playerRank['rank'])
    res['averageRank'] = {
        'tier': tiers[int(math.floor(totalRank // 4))],
        'division': divisions[int(math.floor(totalRank % 4))]
    }

    liveGameColl.insert(res)
    return
