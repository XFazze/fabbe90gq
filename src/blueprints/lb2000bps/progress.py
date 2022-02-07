from flask import *
from config import *
from threading import Thread
from bson import json_util
import time
import os
from random import randint
from pymongo import MongoClient


progress = Blueprint('progress', __name__)


@progress.route("/", methods=['GET', 'POST'])
def ajax_progress():
    puuid = request.args.get('puuid', 0, type=str)
    client = MongoClient('localhost', 27017)
    db = client.lb2000
    matchesColl = db.matches
    matchTrackingColl = db.matchTracking

    matchesDownloaded = matchesColl.count_documents(
        {'metadata.participants': {'$in': [puuid]}})
    tracking = matchTrackingColl.find_one({'puuid': puuid}, {'matchAmount': 1})
    if not tracking:
        print('user matches not found')
        return "matchTracking not found", 400

    print('amount downloaded:', matchesDownloaded,
          'total amount:', tracking['matchAmount'])
    res = {
        'totalAmount': tracking['matchAmount'],
        'downloaded': matchesDownloaded,
        'matchesToBeDownloaded': tracking['matchAmount'] - matchesDownloaded
    }
    return json.loads(json_util.dumps(res))
