
from requests import get
import math
from pymongo import MongoClient, DESCENDING
from lb2000.ranks import *
from lb2000.update.api_calls import *
from config import *


def updateMatches(puuid, region_large, region, riotApiKey):
    newAmount = updateMatchHistory(puuid, region_large, region, riotApiKey)
    print('donw with updateMatchHistory:', newAmount)
    newAmount = downloadMatches(puuid, region_large, region, riotApiKey)
    print('donw with downloadMatches', newAmount)


def updateMatchHistory(puuid, region_large, region, riotApiKey):
    client = MongoClient('localhost', 27017)
    db = client.lb2000
    collection = db.matchTracking
    if not collection.Collection.count_documents({'puuid': puuid}):
        print('new user')
        user = {
            'puuid': puuid,
            'matchAmount': 0,
            'matches': []
        }
    else:
        user = collection.find({'puuid': puuid})

    notDownloadedMatches = []
    for i in range(11):
        new100Matches = get_match_history(
            region_large, puuid, riotApiKey, i*100, 100)

        newNotDownloadedMatches = [
            matchId for matchId in new100Matches if matchId not in user['matches']]

        print('new matches amount:', len(newNotDownloadedMatches), 'round: ', i)
        notDownloadedMatches.extend(newNotDownloadedMatches)

        if len(notDownloadedMatches) != 100:
            break

    user['matches'].extend(notDownloadedMatches)
    user['matchAmount'] = len(user['matches'])
    collection.replace_one({'puuid': puuid}, user, upsert=True)
    return len(notDownloadedMatches)


def downloadMatches(puuid, region_large, region, riotApiKey):
    client = MongoClient('localhost', 27017)
    lb2000DB = client.lb2000
    matchTrackingColl = lb2000DB.matchTracking
    rankedPlayersColl = lb2000DB.rankedPlayers
    matchesColl = lb2000DB.matches
    brokenMatchesColl = lb2000DB.brokenMatches

    user = list(matchTrackingColl.find({'puuid': puuid}))[0]

    downloadedMatches = list(matchesColl.find(
        {'metadata.participants': {'$in': [puuid]}}, {'metadata.matchId': 1}))
    downloadedMatches = [m['metadata']['matchId'] for m in downloadedMatches]

    brokenMatches = list(matchesColl.find(
        {'metadata.participants': {'$in': [puuid]}}, {'metadata.matchId': 1}))
    brokenMatches = [m['metadata']['matchId'] for m in brokenMatches]

    #print('downlaodedMatches', brokenMatches)
    newMatches = [matchId for matchId in user['matches']
                  if matchId not in downloadedMatches and matchId not in brokenMatches]

    if newMatches == False:
        print('no new matches not downloaded returning')
        return

    for matchId in newMatches:
        print('downloading match', matchId, round(100*(newMatches.index(matchId) /
              len(newMatches))), '%', newMatches.index(matchId), len(newMatches))

        if list(matchesColl.find({'metadata.matchId': matchId})):
            print('match already downloaded. Simultaneusly download is happening')
            continue

        if matchId in brokenMatches:
            print('known broken match ignored')
            continue

        match = get_match(region_large, matchId, riotApiKey)
        if not match:
            brokenMatchesColl.insert({'matchId': matchId, 'puuid': [puuid]})
            continue

        # rank
        totalRank = 0
        rankedPlayers = 0
        try:
            for player in match['info']['participants']:
                playerRank = rankedPlayersColl.find_one({'summonerId': player['summonerId'], 'region':region}, sort=[('time', DESCENDING)])
                if not playerRank:
                    # print('user not found')
                    player['rank'] = {
                        'tier': 'unranked',
                        'rank': ''
                    }
                    continue
                rankedPlayers += 1
                player['rank'] = playerRank
                totalRank += tiers.index(playerRank['tier']) * 4 + divisions.index(playerRank['rank'])
        except:
            pass
        if rankedPlayers:
            totalRank = totalRank/rankedPlayers

            match['metadata']['averageRank'] = { 
                'tier': tiers[int(math.floor(totalRank // 4))],
                'division': divisions[int(math.floor(totalRank % 4))]
            }
        
        else:
            match['metadata']['averageRank'] = { 
                'tier' : None,
                'division' : None
            }

        if list(matchesColl.find({'metadata.matchId': matchId})):
            print('SECOND2match already downloaded. Simultaneusly download is happening')
            break
        matchesColl.insert(match)
    return len(newMatches)


if __name__ == '__main__':
    getMatches('r8ShSO0Y7ADEG-nBNQwIVZ4S4cXx8AJxtTsCwyui2V34DMO4MYkXL-eyo7C4PDF8yGXH0PwVgOSnSQ',
               'EUROPE', 'EUN1', riotApiKey)
