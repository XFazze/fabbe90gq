import os
import json
import ast
import requests
import time
from flask import *
from flask_wtf import FlaskForm
from wtforms import Form, SelectField, validators, SubmitField, IntegerField
from wtforms.validators import DataRequired
from ratio_code.basic_copy import *
from forms.osu_form import *
from forms.pappa_form import *
from forms.factorio_form import *
from forms.lb2000_form import *
from ludvig_blabarsylt.api_calls import *
from ludvig_blabarsylt.championIdtoname import *

# Initializing flask and sql
app = Flask(__name__,  static_folder='static')
app.config['SECRET_KEY'] = 'you-will-never-guess'


@app.route("/")
def index():
    return render_template('index.html')

# Bjornbanan


@app.route("/bjornbanan")
def bjornbanan():
    return render_template('bjornbanan/bjornbanan.html')


@app.route("/bjornbanan/help")
def bjornbanan_help():
    return render_template('bjornbanan/bjornbanan_help.html')


@app.route("/bjornbanan/music_help")
def bjornbanan_music_help():
    return render_template('bjornbanan/bjornbanan_m_help.html')

# projects files


@app.route("/projects/files")
def files():
    files = os.listdir("/home/pi/website/static/projects/")
    return render_template('files.html', files=files)


@app.route('/projects/files/<path:filename>')
def sendfile(filename):
    projects_path = app.static_folder + "/projects/"
    return send_from_directory(projects_path, filename)

# projects


@app.route("/projects/")
def projects():
    files = os.listdir("/home/pi/website/static/projects/")
    return render_template('projects.html', files=files)


@app.route("/projects/pappa", methods=['GET', 'POST'])
def pappa():
    return render_template('produktutveckling/pappa.html')

@app.route("/projects/pappa/login", methods=['GET', 'POST'])
def pappa_login():
    form = pappa_login_form()
    return render_template('produktutveckling/pappa_login.html', form=form)

@app.route("/projects/pappa/register", methods=['GET', 'POST'])
def pappa_register():
    form = pappa_register_form()
    if request.method == "POST":
        return redirect('/hejda')
    return render_template('produktutveckling/pappa_register.html', form=form)



@app.route("/games/osu", methods=['GET', 'POST'])
def osu():
    form = osuform()
    if form.validate_on_submit():
        print("suvbl")
        '''with open('/home/pi/website/static/leaderboards/osu.json', 'r+') as f:
            leaderboard = f.read()
            leaderboard = ast.literal_eval(leaderboard)
            for place in range(len(leaderboard)):
                if leaderboard[place]["value" ] < value
        return form.name.data'''
    with open('/home/pi/website/static/leaderboards/osu.json', 'r+') as f:
        leaderboard = f.read()
        leaderboard = ast.literal_eval(leaderboard)
    return render_template('games/osu.html', form=form, leaderboard=leaderboard)

# proportions calc
@app.route("/projects/factorio",  methods=['GET', 'POST'])
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
        return render_template('factorio_proportions.html',
                            form=form,
                            ratio=ratio,
                            component=component,
                            submitted=True,
                            sop=sop)
    return render_template('factorio_proportions.html',
                           form=form,
                           ratio="wee",
                           component="component",
                           submitted=False,
                           sop="sop")


# http://127.0.0.1:5000/ludvig_blabarsylt_2000?name=xfazze&region=eun1&region_large=europe
@app.route("/ludvig_blabarsylt_2000/old", methods=['GET', 'POST'])
def lb2000_old():
    api_key='RGAPI-8b2450d3-f27b-487f-a114-77839bfc1e90'
    username = request.args.get('name')  # getluminated"  # kuuro2
    region = request.args.get('region')   # eun1"
    region_large = request.args.get('region_large')   # europe
    if username is None or region is None or region_large is None:
        print("should be redirected")
        return redirect("ludvig_blabarsylt_2000/search")
    print(request.args.get('name'), request.args.get('region'),request.args.get('region_large'))

    summoner_dict= get_summoner(region, username,api_key)
    id = summoner_dict["id"]
    puuid = summoner_dict["puuid"]
    mastery_dict= get_mastery(region, id, api_key)
    total_mastery= get_total_mastery(region, id, api_key)
    match_history= get_match_history(region_large, puuid, api_key)
    match_id = match_history[0]
    match_dict= get_match(region_large, match_id, api_key)
    match_timeline_dict= get_match_timeline(region_large, match_id, api_key)
    live_game_dict= get_live_game(region, id, api_key)

    return render_template('lb2000/lb2000.html', summoner_dict=summoner_dict,
                           mastery_dict=mastery_dict,
                           total_mastery=total_mastery,
                           match_history=match_history,
                           match_dict=match_dict,
                           match_timeline_dict=match_timeline_dict,
                           live_game_dict=live_game_dict)


@app.route("/ludvig_blabarsylt_2000", methods=['GET', 'POST'])
def lb2000():
    api_key='RGAPI-8b2450d3-f27b-487f-a114-77839bfc1e90'
    form = lb2000_getuser()
    if form.validate_on_submit():
        username = form.username.data
        region = form.region.data
        large_region = form.large_region.data
        summoner = get_summoner(region, username, api_key)
        print(summoner['id'])
        if "status" in summoner.keys():
            return render_template('lb2000/lb2000_search.html', form=form, error=True)
        else:
            mastery = get_mastery(region, summoner['id'], api_key)
            total_mastery = get_total_mastery(region, summoner['id'], api_key)
            ranks = get_rank(region, summoner['id'], api_key)
            timenow = time.time()
            form = lb2000_getgames()
            if form.validate_on_submit():
                print("form is validatged")
                return render_template('lb2000/lb2000_match_history.html', summoner=summoner, region=region, mastery=mastery, total_mastery=total_mastery, champ_id_to_name=champ_id_to_name, timenow=timenow,ranks=ranks,form=form)

            return render_template('lb2000/lb2000_base.html', summoner=summoner, region=region, mastery=mastery, total_mastery=total_mastery, champ_id_to_name=champ_id_to_name, timenow=timenow,ranks=ranks,form=form)
    return render_template('lb2000/lb2000_search.html', form=form, error=False)


@app.route("/ludvig_blabarsylt_2000/profile", methods=['GET', 'POST'])
def lb2000_profile():
    api_key='RGAPI-8b2450d3-f27b-487f-a114-77839bfc1e90'
    username = request.args.get('name')  # getluminated"  # xfazze
    region = request.args.get('region')   # eun1"
    region_large = request.args.get('region_large')   # europe
    print(request.args.get('name'), request.args.get('region'),request.args.get('region_large'))


    summoner_dict = get_summoner(region, username, api_key)
    puuid = summoner_dict["puuid"]
    match_history= get_match_history(region_large, puuid, api_key)
    matches = []
    o = 0
    time_0 = time.time()
    print(time_0)
    for match_id in match_history:
        o += 1
        matches.append(get_match(region_large, match_id, api_key))
        if o % 10 == 0:
            while time_0 + 10 > time.time():
                print("sleeping",time.time() )
                time.sleep(1)
            time_0 = time.time()
        print(o)
    

    return render_template('lb2000/ludvig_blabarsylt_2000.html', summoner_dict=summoner_dict,
                           matches=matches, time=time.time(), round=round, puuid=puuid)
# Run the site
if __name__ == "__main__":
    app.run()
