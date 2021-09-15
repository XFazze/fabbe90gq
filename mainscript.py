
import os
import json
import ast
import pymongo
import requests
import time
from flask import *
from flask_wtf import FlaskForm
from wtforms import Form, SelectField, validators, SubmitField, IntegerField
from wtforms.validators import DataRequired
from ratio_code.basic_copy import *
from forms.pappa_form import *
from forms.factorio_form import *
from forms.lb2000_form import *
from lb.api_calls import *
from lb.match_history import *
from lb.championIdtoname import *
from config import *
from threading import Thread
from pymongo import MongoClient, collation

# Initializing flask and sql
app = Flask(__name__,  static_folder='static')
app.config['SECRET_KEY'] = secret_key


@app.route("/")
def index():
    return render_template('index.html')


# BJORNBANAN
@app.route("/bjornbanan")
def bjornbanan():
    return render_template('bjornbanan/bjornbanan.html')

@app.route("/bjornbanan/help")
def bjornbanan_help():
    return render_template('bjornbanan/bjornbanan_help.html')

@app.route("/bjornbanan/commands")
def bjornbanan_commands():
    return render_template('bjornbanan/bjornbanan_commands.html')

@app.route("/bjornbanan/music_help")
def bjornbanan_music_help():
    return render_template('bjornbanan/bjornbanan_m_help.html')

# GAMES
@app.route("/gamejs")
def gamejs():
    return render_template('games/home.html')

@app.route("/gamejs/leaderboard", methods=['GET', 'POST'])
def leaderboard():
    if request.method == "POST":
        print("METHOD IS POST")
        data = {}    # empty dict to store data
        data['game'] = request.json['game']
        data['user'] = request.json['user']
        data['score'] = request.json['score']
        client = MongoClient('localhost', 27017)
        db = client.website
        collection = db.osu
        collection.insert_one(data)

    return redirect('/gamejs/osu')


@app.route("/gamejs/osu", methods=['GET', 'POST'])
def osu():
    client = MongoClient('localhost', 27017)
    db = client.website
    collection = db.leaderboard
    leaderboard = []
    for record in collection.find({"game":"osu"}).sort("score", pymongo.DESCENDING).limit(10):
        leaderboard.append(record)

    return render_template('games/osu.html',  leaderboard=leaderboard)

@app.route("/gamejs/snake", methods=['GET', 'POST'])
def snake():
    client = MongoClient('localhost', 27017)
    db = client.website
    collection = db.leaderboard
    leaderboard = []
    for record in collection.find({"game":"basicsnake"}).sort("score", pymongo.DESCENDING).limit(10):
        leaderboard.append(record)

    return render_template('games/snake.html',  leaderboard=leaderboard)

# Factorio Proportions calc
@app.route("/factorio",  methods=['GET', 'POST'])
def prop_calc():
    form = factorioform()
    if form.validate_on_submit():
        component = form.component.data
        result = get_components(form.component.data, form.amount.data,
                                form.smeliting_mod.data, form.assembler_mod.data)
        print(result)
        ratio = str(result["ratio"])
        sop = stage(result, 1, [])
        print(result)
        return render_template('factorio_proportions.html', form=form, ratio=ratio, component=component, submitted=True,  sop=sop)
    return render_template('factorio_proportions.html', form=form, ratio="wee", component="component", submitted=False, sop="sop")

# Portfolio
@app.route("/portfolio")
def portfolio():
    return render_template('portfolio.html')
        
@app.route("/lb2000/test")
def lb2000_test():    
    
    before = "{% extends 'template.html' %}\n   {% block link %}\n  <link rel='stylesheet' href='/static/css/lb2000.css'>\n  <script type='text/javascript' src='/static/js/lb2000.js'></script>\n  {% endblock %}\n  {% block body %}{% endblock %}\n  {% block main%}\n <div id=match_history >"
    summonershow= "<style>  #p6PUxmQfJlQIVk7RN9ZcQAOwJL0IDBJlejCDpZfj1Uw_z5U {display : block;}  </style>"
    after = '</div>\n{% endblock %}'
    
    url = 'https://europe.api.riotgames.com/lol/match/v5/matches/EUN1_2837606661?api_key=RGAPI-4d3a43d1-172e-4205-a687-1d6a33839206'
    ret_json =  jsonconvert(requests.get(url).json())
    
    match1_html= before +  summonershow + str(generate_html(ret_json)) +after
    print(type(match1_html))

    with open('/home/pi/website/templates/lb2000/example_match.html', 'w') as f1:
        f1.write(match1_html)
    return render_template('lb2000/example_match.html')


@app.route("/lb2000", methods=['GET', 'POST'])
def lb2000():
    form = lb2000_getuser()

    if form.validate_on_submit():
        username = form.username.data
        region = form.region.data
        region_large = form.large_region.data
        summoner = get_summoner(region, username, api_key)
        print("form submitted")
        if "status" in summoner.keys():
            print("error in get_summoner data")
            return render_template('lb2000/lb2000_search.html', form=form, error=True)
        else:
            mastery = get_mastery(region, summoner['id'], api_key)
            total_mastery = get_total_mastery(region, summoner['id'], api_key)
            ranks = get_rank(region, summoner['id'], api_key)
            match_history = get_match_history(region_large, summoner['puuid'], api_key)
            print("match history:",match_history)
            thread = Thread(target=download_matches, args=(match_history,region_large, api_key))
            thread.start()
            timenow = time.time()
            form = lb2000_getuser()
            return render_template('lb2000/lb2000_base.html', summoner=summoner, region=region, mastery=mastery, total_mastery=total_mastery, champ_id_to_name=champ_id_to_name, timenow=timenow,ranks=ranks,form=form,
                                    match_history=match_history,region_large=region_large, summonerid=summoner['id'])
    return render_template('lb2000/lb2000_search.html', form=form, error=False)



# Run the site
if __name__ == "__main__":
    app.run(debug=True)
