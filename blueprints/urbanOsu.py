from flask import *
from pymongo import MongoClient
from config import *
import random
import requests

urbanOsu = Blueprint('urbanOsu', __name__)


@urbanOsu.route("/", methods=['GET', 'POST'])
def urbanOsuAuth():
    state = str(random.randint(10**16, 9*10**16))
    client = MongoClient('localhost', 27017)
    collection = client.website.urbanOsuState
    collection.insert_one({'state': state})
    url = 'https://osu.ppy.sh/oauth/authorize?' + 'response_type=' + 'code' + '&client_id=' + \
        client_id_urbanOsu + '&redirect_uri=' + \
        redirect_uri_urbanOsu + '&state' + state + '&scope=public'
    return redirect(url)


@urbanOsu.route("/callback", methods=['GET', 'POST'])
def urbanOsuCallback():
    code = request.args.get('code')
    if code == 'access_denied':
        return '<div>Backend authorization failed</div>'
    state = request.args.get('state')
    client = MongoClient('localhost', 27017)
    collection = client.website.urbanOsuState
    if not (collection.find({'state': state})):
        return '<div> State not same stop hacking</div>'

    url = 'https://osu.ppy.sh/oauth/token'
    params = {
        'client_id': client_id_urbanOsu,
        'client_secret': client_secret_urbanOsu,
        'code': code,
        'redirect_uri': redirect_uri_urbanOsu,
        'grant_type': 'authorization_code'
    }
    resp = requests.post(url, data=params)
    respData = resp.json()
    print('response data', respData)
    session['tokens'] = {
        'access_token': respData['access_token'],
        'refresh_token': respData['refresh_token'],
    }
    return redirect('/urbanOsu/profile')


@urbanOsu.route('/profile')
def urbanOsuProfile():
    if 'tokens' not in session:
        return redirect("/urbanOsu")
    headers = {'Authorization': "Bearer " +
               str(session['tokens'].get('access_token'))}
    user = requests.get('https://osu.ppy.sh/api/v2/me/osu', headers=headers)
    print('osu status code', user.status_code)
    if user.status_code > 300:
        print(user)
        return '<div>There was an error when getting your data.</div>'
    user_data = user.json()
    scores = requests.get('https://osu.ppy.sh/api/v2/users/' + str(
        user_data['id']) + '/scores/best?mode=osu&limit=100', headers=headers)
    print('osu status code', scores.status_code)
    if scores.status_code > 300:
        print(scores.text)
        return '<div>There was an error when getting your data.</div>'
    scores = scores.json()
    d = [m['beatmap']['id'] for m in scores]
    client = MongoClient('localhost', 27017)
    collection = client.website.urbanOsuScores
    collection.replace_one({
        'userId': user_data['id']},
        {'scores': d,
        'userId': user_data['id']},
        upsert= True
    )

    return render_template('urbanOsu/profile.html',
                           user_data=user_data,
                           tokens=session.get('tokens'))
