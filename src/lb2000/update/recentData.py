# TIME INTERVAL 24h, 3d, 7d, 30d, season, lifetime
# Queue type all soloq draft, aram
from hashlib import new
import time
from pprint import pprint
from pymongo import MongoClient, DESCENDING
from lb2000.queueId import *
from lb2000.seasonsSplits import *


def updateRecentData(puuid):
    client = MongoClient('localhost', 27017)
    lb2000db = client.lb2000
    matchesColl = lb2000db.matches
    analysisdb = client.analysis
    recentDataColl = analysisdb.recentData

    lastMatch = list(matchesColl.find({'metadata.participants': {'$in': [puuid]}},
                                      {'metadata.matchId': 1},
                                      sort=[('info.gameCreation', DESCENDING)]).limit(1))[0]

    doc = recentDataColl.find_one({'type': 'meta', 'puuid': puuid})
    try:
        if doc['lastMatch'] == lastMatch:
            print('no new matches in recentData')
            # return
    except:
        print('new user recentdata')
        doc = {
            'type': 'meta',
            'puuid': puuid,
            'lastMatch': ''
        }
        recentDataColl.insert_one(doc)
        doc = {
            'type': 'data',
            'puuid': puuid,
        }
        recentDataColl.insert_one(doc)

    newData = analyzeData(puuid, matchesColl)
    newData['type'] = 'data'
    newData['puuid'] = puuid
    #print('newdata')
    #pprint(newData)
    recentDataColl.update_one({'$and': [{'type': 'meta'}, {'puuid': puuid}]}, {
                              '$set': {'lastMatch': lastMatch}})
    #print(recentDataColl.find_one({'type': 'data', 'puuid': puuid}))
    recentDataColl.replace_one({'type': 'data', 'puuid': puuid},  newData)
    return 1


def analyzeData(puuid, matchesColl):
    timeRanges = {'24h': day,
                  '3d': day*3,
                  '7d': 7*day,
                  '30d': 30*day,
                  'lifetime': day*1000}
    t = 0
    res = {}
    # FIXME seaons isnt included in responde
    timeNow = time.time()*1000
    for key in seasonsDates.keys():
        if seasonsDates[key]['3'] > timeNow and seasonsDates[key]['0'] > timeNow:
            timeRanges['thisSeason'] = seasonsDates[key]['0']

    res['total'] = {'24h': {
        'wins': 0,
        'losses': 0,
        'total': 0
    },
        '3d': {
        'wins': 0,
        'losses': 0,
        'total': 0
    },
        '7d': {
        'wins': 0,
        'losses': 0,
        'total': 0
    },
        '30d': {
        'wins': 0,
        'losses': 0,
        'total': 0
    },
        'lifetime': {
        'wins': 0,
        'losses': 0,
        'total': 0
    }}
    for queueId in queueIdConverter.keys():
        res[queueId] = {}

        for timeRange in timeRanges.keys():
            res[queueId][timeRange] = {}

            query = {'info.queueId': int(queueId),
                     'info.gameCreation': {'$gte': timeNow-timeRanges[timeRange]},
                     'info.participants': {'$elemMatch': {'puuid': puuid, 'win': True}}}

            res[queueId][timeRange]['wins'] = matchesColl.count_documents(
                query)

            query = {'info.queueId': int(queueId),
                     'info.gameCreation': {'$gte': timeNow-timeRanges[timeRange]},
                     'info.participants': {'$elemMatch': {'puuid': puuid, 'win': False}}}

            res[queueId][timeRange]['losses'] = matchesColl.count_documents(
                query)
            res[queueId][timeRange]['total'] = res[queueId][timeRange]['wins'] + \
                res[queueId][timeRange]['losses']

            res['total'][timeRange]['wins'] += res[queueId][timeRange]['wins']
            res['total'][timeRange]['losses'] += res[queueId][timeRange]['losses']
            res['total'][timeRange]['total'] += res[queueId][timeRange]['total']
            t += res[queueId][timeRange]['total']
            # print(query)
            # pprint(res[queueId][timeRange])
        #pprint(res)
    # print(t)
    return res


day = 60*60*24*1000


if __name__ == '__main__':
    get_recentData(
        'fdB4MGz64Ito2ggmcgCP-6TDWbf-TnHOaotXg6TBlRwH00zHNzC_AAHIO2tmywSuAggY5z4MPYlVhQ')
