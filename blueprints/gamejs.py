from flask import *
from pymongo import MongoClient
from config import *

gamejs = Blueprint('gamejs', __name__)

@gamejs.route("/")
def gamejs_index():
    return render_template('games/home.html')


@gamejs.route("/leaderboard", methods=['GET', 'POST'])
def leaderboard():
    if request.method == "POST":
        jsonf = json.loads(request.form.to_dict()['data'])
        if jsonf['score'] > 1985:
            return redirect("")
        client = MongoClient('localhost', 27017)
        db = client.website
        collection = db.leaderboard
        collection.insert_one(jsonf)
    return redirect("")


@gamejs.route("/osu", methods=['GET', 'POST'])
def osu():
    return render_template('games/osu.html')


@gamejs.route("/snake", methods=['GET', 'POST'])
def snake():
    return render_template('games/snake.html')


@gamejs.route("/dino", methods=['GET', 'POST'])
def dino():
    return render_template('games/dino.html')


@gamejs.route("/bouncingballs", methods=['GET', 'POST'])
def bouncingballs():
    return render_template('games/bouncingballs.html')

@gamejs.route("/pig", methods=['GET', 'POST'])
def pig():
    return render_template('games/pig.html')
