import requests, json, os.path, time, sphc, os
from datetime import datetime
def testget():
    requests.get('http://google.com')
    print('http google')
    requests.get('https://google.com')
    print('https google')
    requests.get('http://fabbe90.gq')
    print('http fabbe90')
    requests.get('https://fabbe90.gq')
    print('https fabbe90')
    

def get_summoner(region, username, api_key):
    #requests.adapters.DEFAULT_RETRIES = 1
    url = "https://" + region + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + username + "?api_key=" + api_key
    print("summoner url: ", url)
    return requests.get(url).json()
