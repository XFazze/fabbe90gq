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
        return render_template('factorio_proportions.html', form=form, ratio=ratio, component=component, submitted=True,  sop=sop)
    return render_template('factorio_proportions.html', form=form, ratio="wee", component="component", submitted=False, sop="sop")

def match_sleep(region_large, match_id):
        time.sleep(1)
        url = "https://" + region_large + ".api.riotgames.com/lol/match/v5/matches/" + match_id + "?api_key=" + 'RGAPI-8b2450d3-f27b-487f-a114-77839bfc1e90'
        temp_json = {}
        json_match =  requests.get(url).json()
        temp_json["meta"] ={}
        temp_json["meta"]["gameCreation"] = json_match["info"]["gameCreation"]
        temp_json["meta"]["gameDuration"] = json_match["info"]["gameDuration"]
        temp_json["meta"]["gameMode"] = json_match["info"]["gameMode"]
        temp_json["meta"]["gameType"] = json_match["info"]["gameType"]
        temp_json["meta"]["gameVersion"] = json_match["info"]["gameVersion"]

        for player in json_match["info"]["participants"]:
            temp_json[player['summonerId']] = {}
            temp_json[player['summonerId']]['meta'] = {}
            temp_json[player['summonerId']]['meta']['lane'] = player['lane']
            temp_json[player['summonerId']]['meta']['profileIcon'] = player['profileIcon']
            temp_json[player['summonerId']]['meta']['puuid'] = player['puuid']
            temp_json[player['summonerId']]['meta']['role'] = player['role']
            temp_json[player['summonerId']]['meta']['summonerId'] = player['summonerId']
            temp_json[player['summonerId']]['meta']['summonerLevel'] = player['summonerLevel']
            temp_json[player['summonerId']]['meta']['summonerName'] = player['summonerName']
            temp_json[player['summonerId']]['meta']['teamPosition'] = player['teamPosition']
            temp_json[player['summonerId']]['meta']['individualPosition'] = player['individualPosition']
            temp_json[player['summonerId']]['meta']['win'] = player['win']
            
            temp_json[player['summonerId']]['champ'] = {}
            temp_json[player['summonerId']]['champ']['championName'] = player['championName']
            temp_json[player['summonerId']]['champ']['assists'] = player['assists']
            temp_json[player['summonerId']]['champ']['champLevel'] = player['champLevel']
            temp_json[player['summonerId']]['champ']['deaths'] = player['deaths']
            temp_json[player['summonerId']]['champ']['kills'] = player['kills']
            temp_json[player['summonerId']]['champ']['item0'] = player['item0']
            temp_json[player['summonerId']]['champ']['item1'] = player['item1']
            temp_json[player['summonerId']]['champ']['item2'] = player['item2']
            temp_json[player['summonerId']]['champ']['item3'] = player['item3']
            temp_json[player['summonerId']]['champ']['item4'] = player['item4']
            temp_json[player['summonerId']]['champ']['item5'] = player['item5']
            temp_json[player['summonerId']]['champ']['item6'] = player['item6']
            temp_json[player['summonerId']]['champ']['summoner1Id'] = player['summoner1Id']
            temp_json[player['summonerId']]['champ']['summoner2Id'] = player['summoner2Id']
                        
            temp_json[player['summonerId']]['perks'] = {}
            temp_json[player['summonerId']]['perks']['statPerks'] = player['perks']['statPerks']
            temp_json[player['summonerId']]['perks']['primaryStyle'] = {}
            temp_json[player['summonerId']]['perks']['primaryStyle']['statPerks'] = player['perks']['styles'][0]['style']
            temp_json[player['summonerId']]['perks']['primaryStyle']['statPerks'] = player['perks']['styles'][0]["selections"][0]
            temp_json[player['summonerId']]['perks']['primaryStyle']['statPerks'] = player['perks']['styles'][0]["selections"][1]
            temp_json[player['summonerId']]['perks']['primaryStyle']['statPerks'] = player['perks']['styles'][0]["selections"][2]
            temp_json[player['summonerId']]['perks']['primaryStyle']['statPerks'] = player['perks']['styles'][0]["selections"][3]
            temp_json[player['summonerId']]['perks']['subStyle'] = {}
            temp_json[player['summonerId']]['perks']['subStyle']['statPerks'] = player['perks']['styles'][1]['style']
            temp_json[player['summonerId']]['perks']['subStyle']['statPerks'] = player['perks']['styles'][1]["selections"][0]
            temp_json[player['summonerId']]['perks']['subStyle']['statPerks'] = player['perks']['styles'][1]["selections"][1]

            temp_json[player['summonerId']]['vision'] = {}
            temp_json[player['summonerId']]['vision']['detectorWardsPlaced'] = player['detectorWardsPlaced']
            temp_json[player['summonerId']]['vision']['sightWardsBoughtInGame'] = player['sightWardsBoughtInGame']
            temp_json[player['summonerId']]['vision']['visionScore'] = player['visionScore']
            temp_json[player['summonerId']]['vision']['visionWardsBoughtInGame'] = player['visionWardsBoughtInGame']
            temp_json[player['summonerId']]['vision']['wardsKilled'] = player['wardsKilled']
            temp_json[player['summonerId']]['vision']['wardsPlaced'] = player['wardsPlaced']

            temp_json[player['summonerId']]['poppin'] = {}
            temp_json[player['summonerId']]['poppin']['doubleKills'] = player['doubleKills']
            temp_json[player['summonerId']]['poppin']['killingSprees'] = player['killingSprees']
            temp_json[player['summonerId']]['poppin']['largestKillingSpree'] = player['largestKillingSpree']
            temp_json[player['summonerId']]['poppin']['largestMultiKill'] = player['largestMultiKill']
            temp_json[player['summonerId']]['poppin']['largestCriticalStrike'] = player['largestCriticalStrike']
            temp_json[player['summonerId']]['poppin']['longestTimeSpentLiving'] = player['longestTimeSpentLiving']
            temp_json[player['summonerId']]['poppin']['totalTimeSpentDead'] = player['totalTimeSpentDead']
            temp_json[player['summonerId']]['poppin']['pentaKills'] = player['pentaKills']
            temp_json[player['summonerId']]['poppin']['quadraKills'] = player['quadraKills']
            temp_json[player['summonerId']]['poppin']['tripleKills'] = player['tripleKills']
            temp_json[player['summonerId']]['poppin']['unrealKills'] = player['unrealKills']
            
            temp_json[player['summonerId']]['damage'] = {}
            temp_json[player['summonerId']]['damage']['magicDamageDealt'] = player['magicDamageDealt']
            temp_json[player['summonerId']]['damage']['physicalDamageDealt'] = player['physicalDamageDealt']
            temp_json[player['summonerId']]['damage']['totalDamageDealt'] = player['totalDamageDealt']
            temp_json[player['summonerId']]['damage']['trueDamageDealt'] = player['trueDamageDealt']
            temp_json[player['summonerId']]['damage']['magicDamageDealtToChampions'] = player['magicDamageDealtToChampions']
            temp_json[player['summonerId']]['damage']['physicalDamageDealtToChampions'] = player['physicalDamageDealtToChampions']
            temp_json[player['summonerId']]['damage']['totalDamageDealtToChampions'] = player['totalDamageDealtToChampions']
            temp_json[player['summonerId']]['damage']['totalDamageDealt'] = player['trueDamageDealtToChampions']
            temp_json[player['summonerId']]['damage']['trueDamageDealt'] = player['damageDealtToBuildings']
            temp_json[player['summonerId']]['damage']['magicDamageDealtToChampions'] = player['damageDealtToObjectives']
            temp_json[player['summonerId']]['damage']['physicalDamageDealtToChampions'] = player['damageDealtToTurrets']
            temp_json[player['summonerId']]['damage']['physicalDamageTaken'] = player['physicalDamageTaken']
            temp_json[player['summonerId']]['damage']['totalDamageTaken'] = player['totalDamageTaken']
            temp_json[player['summonerId']]['damage']['trueDamageTaken'] = player['trueDamageTaken']

            temp_json[player['summonerId']]['utility'] = {}
            temp_json[player['summonerId']]['utility']['totalDamageShieldedOnTeammates'] = player['totalDamageShieldedOnTeammates']
            temp_json[player['summonerId']]['utility']['totalHeal'] = player['totalHeal']
            temp_json[player['summonerId']]['utility']['totalHealsOnTeammates'] = player['totalHealsOnTeammates']
            temp_json[player['summonerId']]['utility']['timeCCingOthers'] = player['timeCCingOthers']
            temp_json[player['summonerId']]['utility']['totalTimeCCDealt'] = player['totalTimeCCDealt']

            temp_json[player['summonerId']]['objectives'] = {}
            temp_json[player['summonerId']]['objectives']['neutralMinionsKilled'] = player['neutralMinionsKilled']
            temp_json[player['summonerId']]['objectives']['dragonKills'] = player['dragonKills']
            temp_json[player['summonerId']]['objectives']['baronKills'] = player['baronKills']
            temp_json[player['summonerId']]['objectives']['objectivesStolen'] = player['objectivesStolen']
            temp_json[player['summonerId']]['objectives']['objectivesStolenAssists'] = player['objectivesStolenAssists']
            temp_json[player['summonerId']]['objectives']['totalMinionsKilled'] = player['totalMinionsKilled']
            
            temp_json[player['summonerId']]['gameobjectives'] = {}
            temp_json[player['summonerId']]['gameobjectives']['firstBloodAssist'] = player['firstBloodAssist']
            temp_json[player['summonerId']]['gameobjectives']['firstBloodKill'] = player['firstBloodKill']
            temp_json[player['summonerId']]['gameobjectives']['firstTowerAssist'] = player['firstTowerAssist']
            temp_json[player['summonerId']]['gameobjectives']['firstTowerKill'] = player['firstTowerKill']
            temp_json[player['summonerId']]['gameobjectives']['inhibitorKills'] = player['inhibitorKills']
            temp_json[player['summonerId']]['gameobjectives']['inhibitorsLost'] = player['inhibitorsLost']
            temp_json[player['summonerId']]['gameobjectives']['turretKills'] = player['turretKills']
            temp_json[player['summonerId']]['gameobjectives']['turretsLost'] = player['turretsLost']
            
            temp_json[player['summonerId']]['stats'] = {}
            temp_json[player['summonerId']]['stats']['goldEarned'] = player['goldEarned']
            temp_json[player['summonerId']]['stats']['goldSpent'] = player['goldSpent']
            temp_json[player['summonerId']]['stats']['itemsPurchased'] = player['itemsPurchased']
            temp_json[player['summonerId']]['stats']['spell1Casts'] = player['spell1Casts']
            temp_json[player['summonerId']]['stats']['spell2Casts'] = player['spell2Casts']
            temp_json[player['summonerId']]['stats']['spell3Casts'] = player['spell3Casts']
            temp_json[player['summonerId']]['stats']['spell4Casts'] = player['spell4Casts']
            temp_json[player['summonerId']]['stats']['summoner1Casts'] = player['summoner1Casts']
            temp_json[player['summonerId']]['stats']['summoner2Casts'] = player['summoner2Casts']
        return temp_json
            

@app.route("/ludvig_blabarsylt_2000", methods=['GET', 'POST'])
def lb2000():
    api_key='RGAPI-8b2450d3-f27b-487f-a114-77839bfc1e90'
    form = lb2000_getuser()
    
    
    if form.validate_on_submit():
        username = form.username.data
        region = form.region.data
        region_large = form.large_region.data
        summoner = get_summoner(region, username, api_key)
        print(summoner['puuid'])
        if "status" in summoner.keys():
            return render_template('lb2000/lb2000_search.html', form=form, error=True)
        else:
            mastery = get_mastery(region, summoner['id'], api_key)
            total_mastery = get_total_mastery(region, summoner['id'], api_key)
            ranks = get_rank(region, summoner['id'], api_key)
            match_history = get_match_history(region_large, summoner['puuid'], api_key)
            timenow = time.time()
            form = lb2000_getuser()
            return render_template('lb2000/lb2000_base.html', summoner=summoner, region=region, mastery=mastery, total_mastery=total_mastery, champ_id_to_name=champ_id_to_name, timenow=timenow,ranks=ranks,form=form,
                                    match_history=match_history,match_sleep=match_sleep,region_large=region_large, summonerid=summoner['id'])
    return render_template('lb2000/lb2000_search.html', form=form, error=False)



# Run the site
if __name__ == "__main__":
    app.run()
