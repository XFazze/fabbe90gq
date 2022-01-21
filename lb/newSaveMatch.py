
from requests import get
import math
from pymongo import MongoClient, DESCENDING
from lb.ranks import *
from lb.api_calls import *
from config import *


def getMatches(puuid, region_large, region, riot_api_key):
    newAmount = updateMatchHistory(puuid, region_large, region, riot_api_key)
    print('donw with updateMatchHistory:', newAmount)
    newAmount = downloadMatches(puuid, region_large, region, riot_api_key)
    print('donw with downloadMatches', newAmount)


def updateMatchHistory(puuid, region_large, region, riot_api_key):
    client = MongoClient('localhost', 27017)
    db = client.newMatches
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
            region_large, puuid, riot_api_key, i*100, 100)

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


def downloadMatches(puuid, region_large, region, riot_api_key):
    client = MongoClient('localhost', 27017)
    rankedPlayersDB = client.newMatches
    newMatchesDB = client.newMatches
    matchTrackingColl = newMatchesDB.matchTracking
    matchesColl = newMatchesDB.matches
    brokenMatchesColl = newMatchesDB.brokenMatches

    user = list(matchTrackingColl.find({'puuid': puuid}))[0]

    downloadedMatches = list(matchesColl.find(
        {'metadata': {'participants': {'$in': [puuid]}}}, {'matchId': 1}))

    brokenMatches = list(brokenMatchesColl.find({'puuid': {'$in': [puuid]}}))
    print('downlaodedMatches', downloadedMatches)
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

        match = get_match(region_large, matchId, riot_api_key)
        if not match:
            brokenMatchesColl.insert({'matchId': matchId, 'puuid': [puuid]})
            continue

        # rank
        totalRank = 0
        for player in match['info']['participants']:
            playerRank = rankedPlayersDB[region].find_one(
                {'summonerId': player['summonerId']}, sort=[('time', DESCENDING)])
            if not playerRank:
                #print('user not found')
                player['rank'] = {
                    'tier': 'unranked',
                    'rank': ''
                }
                continue
            player['rank'] = playerRank

            totalRank += tiers.index(playerRank['tier']) * \
                4 + divisions.index(playerRank['rank'])
        match['metadata']['averageRank'] = {
            'tier': tiers[int(math.floor(totalRank // 4))],
            'division': divisions[int(math.floor(totalRank % 4))]
        }

        if list(matchesColl.find({'metadata.matchId': matchId})):
            print('SECOND2match already downloaded. Simultaneusly download is happening')
            break
        matchesColl.insert(match)
    return len(newMatches)


if __name__ == '__main__':
    getMatches('r8ShSO0Y7ADEG-nBNQwIVZ4S4cXx8AJxtTsCwyui2V34DMO4MYkXL-eyo7C4PDF8yGXH0PwVgOSnSQ',
               'EUROPE', 'EUN1', riot_api_key)
