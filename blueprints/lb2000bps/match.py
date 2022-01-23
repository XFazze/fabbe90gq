from flask import *
from config import *
from threading import Thread
from bson import json_util
import time
import os
from random import randint
from pymongo import MongoClient


match = Blueprint('match', __name__)


@match.route("/match", methods=['GET', 'POST'])
def ajax_match():
    matchId = request.args.get('id', 0, type=str)
    client = MongoClient('localhost', 27017)
    db = client.newMatches
    collection = db.matches
    match = collection.find_one({'metadata.matchId': matchId})
    if not match:
        print('match not found')
        return "match not found", 400
    return json.loads(json_util.dumps(match))


@match.route("/matchHistory", methods=['GET', 'POST'])
def ajax_matchHistory():
    puuid = request.args.get('puuid', 0, type=str)
    client = MongoClient('localhost', 27017)
    db = client.newMatches
    collection = db.matchTracking
    newMatchHistory = collection.find_one({'puuid': puuid})
    if not newMatchHistory:
        print('matchHistory not found')
        return "match not found", 400
    return json.loads(json_util.dumps(newMatchHistory))
