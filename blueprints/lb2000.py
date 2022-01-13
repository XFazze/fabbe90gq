from flask import *
from config import *
from lb.api_calls import *
from lb.match_history import *
from lb.championIdtoname import *
from forms.lb2000_form import *
from lb.mmr import get_mmrs
from lb.runes import *
from lb.mmr import *
from threading import Thread
from ratelimit import limits, sleep_and_retry

lb2000 = Blueprint('lb2000', __name__)
#TODO connect accounts by verifying with pfp
#TODO player Tags
# champs player wr for champs/length
#TODO amont+wr of total, gamemode, role, champ
#TODO graph


region_converter = {
    'eun1':'EUROPE',
    'euw1' : 'EUROPE',
    'ru' : 'EUROPE',
    'tr1' : 'EUROPE',
    'br1' : 'AMERICAS',
    'na1' : 'AMERICAS',
    'la1' : 'AMERICAS',
    'la2' : 'AMERICAS',
    'jp1' : 'ASIA',
    'kr' : 'ASIA',
    'oc1' : 'ASIA',
}

@lb2000.route("/test")
def lb2000_test():
    before = "{% extends 'template.html' %}\n   {% block link %}\n  <link rel='stylesheet' href='/static/css/lb2000.css'>\n  <script type='text/javascript' src='/static/js/lb2000.js'></script>\n  {% endblock %}\n  {% block body %}{% endblock %}\n  {% block main%}\n <div id=match_history >"
    summonershow = "<style>  #p6PUxmQfJlQIVk7RN9ZcQAOwJL0IDBJlejCDpZfj1Uw_z5U {display : block;}  </style>"
    after = '</div>\n{% endblock %}'
    url = 'https://europe.api.riotgames.com/lol/match/v5/matches/EUN1_2837606661?api_key=RGAPI-4d3a43d1-172e-4205-a687-1d6a33839206'
    ret_json = jsonconvert(requests.get(url).json())

    match1_html = before + summonershow + str(generate_html(ret_json)) + after

    with open('/home/pi/website/templates/lb2000/example_match.html', 'w') as f1:
        f1.write(match1_html)
    return render_template('lb2000/example_match.html')


@lb2000.route("/", methods=['GET', 'POST'])
@lb2000.route("/<region>/<summonername>", methods=['GET', 'POST'])
def lb2000_index(region='noregion', summonername='nouser'):
    form = lb2000_getuser()
    if form.validate_on_submit():
        username = form.username.data
        region = form.region.data
        return redirect ('/lb2000/' + region + '/'+ username)

    res = render_template('lb2000/lb2000_search.html', form=form, error=False)
    if summonername != 'nouser' or region != 'noregion':
        res = returnprofile(summonername, region)
    if not res:
        res = render_template('lb2000/lb2000_search.html', form=form, error=True)
    return res

def returnprofile(summonername, region):
    region_large = region_converter[region]
    form = lb2000_getuser
    summoner = get_summoner(region, summonername, riot_api_key)
    if "status" in summoner.keys():
        return False
    else:
        mastery = call(get_mastery, (region, summoner['id'], riot_api_key))
        masterPoints = int(sum([item['championPoints'] for item in mastery ])/1000)
        masteryLevels = sum([item['championLevel'] for item in mastery ])
        total_mastery = call(get_total_mastery, (region, summoner['id'], riot_api_key))
        ranks = call(get_rank, (region, summoner['id'], riot_api_key))
        mmr = get_mmrs(region, summoner['name'])
        match_history =  get_match_history(
            region_large, summoner['puuid'], riot_api_key)
        call(multiDownloadMatches, (match_history, region, riot_api_key, runeIdToName, region_converter))
        timenow = time.time()
        form = lb2000_getuser()
        for i in mastery:
            i["championId"] = str(i["championId"])
        print('profile success')
        return render_template('lb2000/lb2000_base.html', summoner=summoner, region=region, mastery=mastery, total_mastery=total_mastery, champ_id_to_name=champ_id_to_name, timenow=timenow, ranks=ranks, form=form,
                      match_history=match_history, region_large=region_large, summonerid=str(summoner['id']), mmr=mmr, masterPoints=masterPoints, masteryLevels=masteryLevels)


@sleep_and_retry
@limits(calls=10, period=60)
def call(function, args):
    return function(*args)
