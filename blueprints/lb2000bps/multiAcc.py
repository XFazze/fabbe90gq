from flask import *
from config import *
from threading import Thread
from bson import json_util
import time
import os
from random import randint
from pymongo import MongoClient

from lb.api_calls import *
multiAcc = Blueprint('multiAcc', __name__)


@multiAcc.route("/verify", methods=['GET', 'POST'])
def multiAccVerify():
    puuid = request.args.get('puuid', 0, type=str)
    region = request.args.get('region', 0, type=str)
    browserId = request.args.get('browserId', 0, type=str)
    client = MongoClient('localhost', 27017)
    coll = client.lb2000.multiAcc

    try:
        pfpId = list(coll.find({'puuid': puuid}))[0]['pfpId']
    except:
        return 'website fault didnt save your first request', 400

    summoner = get_summonerPuuid(region, puuid, riot_api_key)
    if pfpId != summoner['profileIconId']:
        return 'Wrong profile Id', 400

    try:
        accounts = list(coll.find({'browserId': browserId}))[0]
        print(accounts)
        if puuid in accounts['accounts']:
            return 'You have already added this account', 400

        accounts['accounts'].append(puuid)

        coll.replace_one({'browserId': browserId}, accounts)
    except:
        accounts = {
            'browserId': browserId,
            'accounts': [puuid]
        }
        coll.insert(accounts)
    coll.update_many({'browserId': {'$ne': browserId}},
                     {'$pull': {'accounts': puuid}})
    return 'successful', 200


@multiAcc.route("/multiAccFind", methods=['GET', 'POST'])
def multiAccFind():
    puuid = request.args.get('puuid', 0, type=str)
    client = MongoClient('localhost', 27017)
    db = client.lb2000
    summoners = db.summoners
    #riotApiKey = list(config.find({'type': 'riotApiKey'}))[0]['value']
    multiAccColl = db.multiAcc
    try:
        accounts = list(multiAccColl.find({'accounts': {'$in': [puuid]}}))[0]
        # print(accounts)
    except:
        return 'there was no multi accunts', 400
    if not accounts:
        print('users doesnt exists')
        return 'this account has no linked accounts', 400
    puuids = accounts['accounts']

    res = {'data': []}
    for puuid in puuids:
        userList = list(summoners.find({'puuid': puuid}))
        user = userList[0]

        res['data'].append(user)
        # TODO add rank

    return json.loads(json_util.dumps(res))
