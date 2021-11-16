from flask import *
from pymongo import MongoClient
from config import *
import random
import requests

spotify = Blueprint('spotify', __name__)

@spotify.route("/", methods=['GET', 'POST'])
def spotifyAuth():
    scopes = "user-read-recently-played user-top-read user-read-private user-read-email user-library-read user-follow-read"
    state = str(random.randint(10**16, 9*10**16))
    client = MongoClient('localhost', 27017)
    collection = client.website.spotifystate
    collection.insert_one({'state': state})
    url = 'https://accounts.spotify.com/authorize?' + 'response_type=' + 'code' + '&client_id=' + \
        client_id + '&scope=' + scopes + '&redirect_uri=' + redirect_uri + '&state' + state
    return redirect(url)


@spotify.route("/callback", methods=['GET', 'POST'])
def spotifyCallback():
    code = request.args.get('code')
    if code == 'access_denied':
        return '<div>Backend spotify authorization failed</div>'
    state = request.args.get('state')
    client = MongoClient('localhost', 27017)
    collection = client.website.spotifystate
    if not (collection.find({'state': state})):
        return '<div> State not same stop hacking</div>'
    url = 'https://accounts.spotify.com/api/token'
    params = {
        'code': code,
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code'
    }
    resp = requests.post(url, auth=(client_id, client_secret), data=params)
    respData = resp.json()
    session['tokens'] = {
        'access_token': respData['access_token'],
        'refresh_token': respData['refresh_token'],
    }
    return redirect('/spotify/profile')


@spotify.route("/refresh", methods=['GET', 'POST'])
def spotifyRefresh():
    url = 'https://accounts.spotify.com/api/token'
    params = {
        'refresh_token': session.get('tokens').get('refresh_token'),
        'grant_type': 'authorization_code'
    }
    resp = requests.post(url, auth=(client_id, client_secret), data=params)
    respData = resp.json()
    session['tokens']['access_token'] = respData.get('access_token')
    return json.dumps(session['tokens'])


@spotify.route('/profile')
def spotifyP():
    if 'tokens' not in session:
        return redirect("/spotify")
    headers = {'Authorization': "Bearer "+str(session['tokens'].get('access_token'))}
    user = requests.get('https://api.spotify.com/v1/me', headers=headers)
    print('spotify status code', user.status_code)
    if user.status_code > 300:
        return render_template('notwhitelisted.html')

    user_data = user.json()
    data = {}
    artist_short = requests.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=short_term', headers=headers)
    if artist_short.status_code > 300:
        print('somethingf went wrong in artist_short', artist_short.status_code)
        return render_template('error.html')
    data['artist_short_data'] = artist_short.json()['items']

    artist_medium = requests.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=medium_term', headers=headers)
    if artist_medium.status_code > 300:
        print('somethingf went wrong in artist_medium', artist_medium.status_code)
        return render_template('error.html')
    data['artist_medium_data'] = artist_medium.json()['items']

    artist_long = requests.get('https://api.spotify.com/v1/me/top/artists?limit=50&time_range=long_term', headers=headers)
    if artist_long.status_code > 300:
        print('somethingf went wrong in artist_long', artist_long.status_code)
        return render_template('error.html')
    data['artist_long_data'] = artist_long.json()['items']

    song_short = requests.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=short_term', headers=headers)
    if song_short.status_code > 300:
        print('somethingf went wrong in song_short', song_short.status_code)
        return render_template('error.html')
    data['song_short_data'] = song_short.json()['items']

    song_medium = requests.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=medium_term', headers=headers)
    if song_medium.status_code > 300:
        print('somethingf went wrong in song_medium', song_medium.status_code)
        return render_template('error.html')
    data['song_medium_data'] = song_medium.json()['items']

    song_long = requests.get('https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=long_term', headers=headers)
    if song_long.status_code > 300:
        print('somethingf went wrong in song_long', song_long.status_code)
        return render_template('error.html')
    data['song_long_data'] = song_long.json()['items']

    return render_template('spotify/profile.html',
                           user_data=user_data, image=user_data['images'][0]['url'],
                           tokens=session.get('tokens'),
                           data=data)
