from flask import *
from config import *
from threading import Thread
from bson import json_util
import time
import os
from random import randint
from pymongo import MongoClient, DESCENDING


ranks = Blueprint('ranks', __name__)


@ranks.route("/", methods=['GET', 'POST'])
def ajax_ranks():
    summonerId = request.args.get('summonerId', 0, type=str)
    region = request.args.get('region', 0, type=str)
    if region not in ['eun1', 'euw1', 'kr', 'na1', 'br1', 'la1', 'la2', 'oc1', 'ru', 'tr1', 'jp1']:
        return 'region not allowed', 403

    client = MongoClient('localhost', 27017)
    regionRankedPlayersColl = client.rankedPlayers[region]

    res = {}
    soloq = list(regionRankedPlayersColl.find(
        {'summonerId': summonerId, 'queueType': 'RANKED_SOLO_5x5'}, sort=[('time', DESCENDING)]).limit(1))
    try:
        res['RANKED_SOLO_5x5'] = soloq[0]
    except:
        pass

    flex = list(regionRankedPlayersColl.find(
        {'summonerId': summonerId, 'queueType': 'RANKED_TEAM_5x5'}, sort=[('time', DESCENDING)]).limit(1))
    try:
        res['RANKED_FLEX_SR'] = flex[0]
    except:
        pass
    return json.loads(json_util.dumps(res))
