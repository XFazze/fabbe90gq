
import os, json, ast, pymongo, requests, time, random, base64
from typing import SupportsComplex
from pymongo import collection
from pymongo.errors import CollectionInvalid
from flask import *
from flask_wtf import FlaskForm
#git from werkzeug.datastructures import ContentSecurityPolicy
from wtforms import Form, SelectField, validators, SubmitField, IntegerField
from wtforms.validators import DataRequired
from forms.user_form import login_form, register_form
from ratio_code.basic_copy import *
from forms.pappa_form import *
from forms.factorio_form import *
from forms.lb2000_form import *
from forms.user_form import *
from lb.api_calls import *
from lb.match_history import *
from lb.championIdtoname import *
from config import *
from threading import Thread
from pymongo import MongoClient, collation
from Crypto.Util import number

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
        jsonf = json.loads(request.form.to_dict()['data'])
        if jsonf['score'] > 1985:
            return redirect("")
        client = MongoClient('localhost', 27017)
        db = client.website
        collection = db.leaderboard
        collection.insert_one(jsonf)

    return redirect("")


@app.route("/gamejs/osu", methods=['GET', 'POST'])
def osu():
    return render_template('games/osu.html')

@app.route("/gamejs/snake", methods=['GET', 'POST'])
def snake():
    return render_template('games/snake.html')

@app.route("/gamejs/dino", methods=['GET', 'POST'])
def dino():
    return render_template('games/dino.html')

@app.route("/gamejs/bouncingballs", methods=['GET', 'POST'])
def bouncingballs():
    return render_template('games/bouncingballs.html')

# SIMS  
# rsa
@app.route("/sims/rsa", methods=['GET', 'POST'])
def rsa():
    return render_template('sims/rsa.html', plow=str(number.getPrime(4))+' ||| ' + str(number.getPrime(5)) +', ' + str(number.getPrime(5))+' ||| ' + str(number.getPrime(4)),
    p128=[str(number.getPrime(32)), str(number.getPrime(32)),str(number.getPrime(32)),str(number.getPrime(32))])

# chaos triangle
@app.route("/sims/chaostriangle", methods=['GET', 'POST'])
def chaostriangle():
    return render_template('sims/chaostriangle.html')

# sortingalgorithms
@app.route("/sims/sortingalgorithms", methods=['GET', 'POST'])
def sortingalgorithms():
    return render_template('sims/sortingalgorithms.html')
    
# random number genenrator
@app.route("/sims/rng", methods=['GET', 'POST'])
def rng():
    return render_template('sims/rng.html')

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
'''
@app.route("/portfolio")
def portfolio():
    return render_template('portfolio.html')
'''
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

# register and login
@app.route("/user", methods=['GET', 'POST'])
def user():
    return render_template('user/home.html')

@app.route("/user/register", methods=['GET', 'POST'])
def userRegister():
    form=register_form()
    if form.validate_on_submit():
        result = form.femail.data, form.passw.data
        print(result)
        render_template('user/home.html')
    return render_template('user/register.html', form=form)
   
@app.route("/user/login", methods=['GET', 'POST'])
def userLogin():
    form=login_form()
    if form.validate_on_submit():
        result = form.femail.data, form.passw.data
        session["email"] = form.femail.data
        print(result)
        return render_template('user/home.html')

    return render_template('user/login.html', form=form)

@app.route("/user/forgotpassw", methods=['GET', 'POST'])
def userForgotpassw():
    return render_template('user/forgotpassw.html')

# AFK notif
# TO leave computer and have the screen flash when someone presses a button
@app.route("/afknotif", methods=['GET', 'POST'])
def afkNotif():
    return render_template('afknotif/home.html')

@app.route("/afknotif/id/<id>", methods=['GET', 'POST'])
def afkNotifId(id='a'):
    try:
        id = int(id)
        return render_template('afknotif/alert.html', id=int(id))
    except:
        return redirect('/afknotif')

@app.route("/afknotif/start", methods=['GET', 'POST'])
def afkNotifStart():
    data = {
        'id' : random.randint(1000000000,10000000000),
        'alert' : False
    }
    client = MongoClient('localhost', 27017)
    db = client.website
    collection = db.afknotif
    collection.insert_one(data)
    return render_template('afknotif/start.html', id=data['id'])

@app.route("/afknotif/alert", methods=['GET', 'POST'])
def afkNotifAlert():
    if request.method == "POST":
        student_id = int(request.get_data().decode()[3:])
        client = MongoClient('localhost', 27017)
        db = client.website
        collection = db.afknotif
        newdata = {'id':student_id, 'alert': True}
        object = collection.replace_one({'id':student_id}, newdata)
        return jsonify(status="success")
    
@app.route("/afknotif/check", methods=['GET', 'POST'])
def afkNotifCheck():
    if request.method == "POST":
        student_id = int(request.get_data().decode()[3:])
        client = MongoClient('localhost', 27017)
        db = client.website
        collection = db.afknotif
        object = collection.find_one({'id':student_id})
        if object['alert']:
            print('returning alerted')
            return jsonify(success=True)

        return jsonify(success=False)



@app.route("/spotify", methods=['GET', 'POST'])
def spotifyLogin():
    scopes = 'user-read-private user-read-email'

    form=login_form()
    if form.validate_on_submit():
        result = form.femail.data, form.passw.data
        
        print('from validated')
        state = str(random.randint(10**16,9*10**16))
        
        client = MongoClient('localhost', 27017)
        collection = client.website.spotifystate
        collection.insert_one({'state':state})
        url = 'https://accounts.spotify.com/authorize?' + 'response_type='+ 'code' + '&client_id=' + client_id + '&scope=' + scopes + '&redirect_uri=' + redirect_uri + '&state' + state
        return redirect(url)

    return render_template('spotify/login.html', form=form)

@app.route("/callback", methods=['GET', 'POST'])
def spotifyCallback():
    code = request.args.get('code')
    if code == 'access_denied': return '<div>Backend spotify authorization failed</div>'

    state = request.args.get('state')
    client = MongoClient('localhost', 27017)
    collection = client.website.spotifystate
    if (collection.find({'state':state})):
        print('state is the same', collection.find({'state':state}))
    else:
        print('state not same', {'state':state})

    print('success code and state', code, state)

    url = 'https://accounts.spotify.com/api/token'
    params = {
        'code': code,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
      }
    resp = requests.post(url, auth=(client_id, client_secret), data=params)
    respData = resp.json()
    print('status code', resp.status_code)
    
    access_token = respData['access_token']
    refresh_token = respData['refresh_token']

    session['tokens'] = {
        'access_token': access_token,
        'refresh_token': refresh_token,
    }
    return redirect('spotify/profile')

@app.route("/spotify/refresh", methods=['GET', 'POST'])
def spotifyRefresh():
    url = 'https://accounts.spotify.com/api/token'
    params = {
        'refresh_token': session.get('tokens').get('refresh_token'),
        'grant_type': 'authorization_code'
      }
    resp = requests.post(url, auth=(client_id, client_secret), data=params)
    #print('\nheaders', resp.headers, '\nparams', resp.params,)
    respData = resp.json()
    print('status code', resp.status_code)

    session['tokens']['access_token'] = respData.get('access_token')

    return json.dumps(session['tokens'])

@app.route('/spotify/profile')
def spotifyP():
    if 'tokens' not in session:
        app.logger.error('No tokens in session.')
        abort(400)

    # Get profile info
    headers = {'Authorization': f"Bearer {session['tokens'].get('access_token')}"}

    res = requests.get('https://api.spotify.com/v1/me', headers=headers)
    res_data = res.json()
    if res.status_code != 200:
        app.logger.error(
            'Failed to get profile info: %s',
            res_data.get('error', 'No error message returned.'),
        )
        abort(res.status_code)

    return render_template('spotify/profile.html', data=res_data,image=res_data['images'][0]['url'], tokens=session.get('tokens'))
# Run the site
if __name__ == "__main__":
    app.run(debug=True)
