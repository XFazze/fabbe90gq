import requests, json, os.path, time, sphc, os
from datetime import datetime
from ratelimit import limits, sleep_and_retry

@sleep_and_retry
@limits(calls=30, period=60)
def call(url, params={}, headers={}):
    return requests.get(url, params=params, headers=headers).json()

def get_summoner(region, username, api_key):
    #requests.adapters.DEFAULT_RETRIES = 1
    url = "https://" + region + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + username + "?api_key=" + api_key
    params = {
            'api_key': api_key
    }
    #print("summoner url: ", url)
    return call(url, params=params)


def get_total_mastery(region, id, api_key):
    url = "https://" + region + ".api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/" + id + "?api_key=" + api_key
    params = {
            'api_key': api_key
    }
    #print('total mastery url', url)
    return call(url, params=params)

def get_mastery(region, id, api_key):
    url = "https://" + region + ".api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" +  id + "?api_key=" + api_key
    params = {
            'api_key': api_key
    }
    #print('mastery url', url)
    return call(url, params=params)

def get_rank(region, id, api_key):
    url = "https://" + region + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" +  id + "?api_key=" + api_key
    params = {
            'api_key': api_key
    }
    #print("rank url: ", url)
    return call(url, params=params)

def get_match_history(region_large, puuid, api_key, start=0, count=9):
    url = "https://" + region_large + ".api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids"
    params = {
            'start': start,
            'count': count,
            'api_key': api_key
    }
    #print("match history url: ", url)
    return call(url, params=params)  # max 100 but has filters


def get_match(region_large, match_id, api_key):
    url = "https://" + region_large + ".api.riotgames.com/lol/match/v5/matches/" + match_id
    params = {
        'api_key': api_key
    }
    #print("match url: ", url)
    return call(url, params=params)

def get_match_timeline(region_large, match_id, api_key):
    url = "https://" + region_large + ".api.riotgames.com/lol/match/v5/matches/" + match_id + "/timeline?api_key=" + api_key
    params = {
            'api_key': api_key
    }
    #print("match timeline url: ", url)
    return call(url, params=params)

def get_live_game(region, id, api_key):
    url = "https://" + region + ".api.riotgames.com/lol/spectator/v4/active-games/by-summoner/" + id + "?api_key=" + api_key
    params = {
            'api_key': api_key
    }
    #print("live game url: ", url)
    return call(url, params=params)

