from flask import *
from config import *
from threading import Thread
from bson import json_util
import time
import os
from random import randint
from pymongo import MongoClient, DESCENDING

from lb2000.update.api_calls import *
liveGame = Blueprint('liveGame', __name__)


@liveGame.route("/", methods=['GET', 'POST'])
def getLiveGame():
    id = request.args.get('id', 0, type=str)
    client = MongoClient('localhost', 27017)
    coll = client.lb2000.liveGame
    try:
        liveGame = list(coll.find({'participants.summonerId': id}))[0]
    except:
        liveGame = {
            'gameLength' : 0
        }
    return json.loads(json_util.dumps(liveGame))
