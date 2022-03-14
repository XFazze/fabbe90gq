from flask import *
from config import *
from threading import Thread
from bson import json_util
from random import randint
from pymongo import MongoClient, DESCENDING
from config import riotApiKey

from lb2000.update.api_calls import *
from lb2000.update.mastery import *
mastery = Blueprint('mastery', __name__)


@mastery.route("/", methods=['GET', 'POST'])
def getMastery():
    puuid = request.args.get('puuid', 0, type=str)
    region = request.args.get('region', 0, type=str)
    id = request.args.get('id', 0, type=str)
    updateMasterySummoner(id, region, puuid, riotApiKey)
    client = MongoClient('localhost', 27017)
    coll = client.lb2000.mastery
    mastery = list(coll.find({'puuid': puuid},
                   sort=[('time', DESCENDING)]))[0]
    return json.loads(json_util.dumps(mastery))
