from flask import *
from pymongo import MongoClient
from config import *
import random

afknotif = Blueprint('afknotif', __name__)


@afknotif.route("/", methods=['GET', 'POST'])
def afkNotif_index():
    return render_template('afknotif/home.html')


@afknotif.route("/afknotif/id/<id>", methods=['GET', 'POST'])
def afkNotifId(id='a'):
    try:
        id = int(id)
        return render_template('afknotif/alert.html', id=int(id))
    except:
        return redirect('/afknotif')


@afknotif.route("/start", methods=['GET', 'POST'])
def afkNotifStart():
    data = {
        'id': random.randint(1000000000, 10000000000),
        'alert': False
    }
    client = MongoClient('localhost', 27017)
    db = client.website
    collection = db.afknotif
    collection.insert_one(data)
    return render_template('afknotif/start.html', id=data['id'])


@afknotif.route("/alert", methods=['GET', 'POST'])
def afkNotifAlert():
    if request.method == "POST":
        student_id = int(request.get_data().decode()[3:])
        client = MongoClient('localhost', 27017)
        db = client.website
        collection = db.afknotif
        newdata = {'id': student_id, 'alert': True}
        collection.replace_one({'id': student_id}, newdata)
        return jsonify(status="success")


@afknotif.route("/check", methods=['GET', 'POST'])
def afkNotifCheck():
    if request.method == "POST":
        student_id = int(request.get_data().decode()[3:])
        client = MongoClient('localhost', 27017)
        db = client.website
        collection = db.afknotif
        object = collection.find_one({'id': student_id})
        if object['alert']:
            return jsonify(success=True)

        return jsonify(success=False)
