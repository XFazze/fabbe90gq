from flask import *
from config import *
from threading import Thread
from bson import json_util
import time
import os
from random import randint
from pymongo import MongoClient


wr = Blueprint('wr', __name__)

# FIXME data is no longer generated


@wr.route("/", methods=['GET', 'POST'])
def ajax_wr():
    puuid = request.args.get('puuid', 0, type=str)
    client = MongoClient('localhost', 27017)
    db = client.loldetails
    collection = db[str(puuid)]
    wr = list(collection.find({'type': 'wr'}))

    if len(wr) == 0:
        print('cant find wr for puuid: ', puuid)
        return '0'
    return json.loads(json_util.dumps(wr[0]))
