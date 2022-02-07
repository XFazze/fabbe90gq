from flask import *
from config import *
from threading import Thread
from bson import json_util
import time
import os
from random import randint
from pymongo import MongoClient


recentData = Blueprint('recentData', __name__)


@recentData.route("/", methods=['GET', 'POST'])
def ajax_recentData():
    puuid = request.args.get('puuid', 0, type=str)
    client = MongoClient('localhost', 27017)
    db = client.analysis
    collection = db.recentData
    recentData = collection.find_one({'puuid': puuid, 'type': 'data'})
    if not recentData:
        print('recentdata not found')
        return "data not found", 400
    return json.loads(json_util.dumps(recentData))
