import requests, json, os.path, time, sphc, os
from datetime import datetime
def get_summoner(region, username, api_key):
    requests.adapters.DEFAULT_RETRIES = 1
    url = "https://" + region + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + username + "?api_key=" + api_key
    print("summoner url: ", url)
    return requests.get(url).json()
    

def get_total_mastery(region, id, api_key):
    url = "https://" + region + ".api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/" + id + "?api_key=" + api_key
    return requests.get(url).json()

def get_mastery(region, id, api_key):
    url = "https://" + region + ".api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" +  id + "?api_key=" + api_key
    return requests.get(url).json()

def get_rank(region, id, api_key):
    url = "https://" + region + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" +  id + "?api_key=" + api_key
    print("rank url: ", url)
    return requests.get(url).json()

def get_match_history(region_large, puuid, api_key):
    url = "https://" + region_large + ".api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=9&api_key=" + api_key
    print("match history url: ", url)
    return requests.get(url).json()  # max 100 but has filters


def get_match(region_large, match_id, api_key):
    url = "https://" + region_large + ".api.riotgames.com/lol/match/v5/matches/" + match_id + "?api_key=" + api_key
    print("match url: ", url)
    return requests.get(url).json()

def get_match_timeline(region_large, match_id, api_key):
    url = "https://" + region_large + ".api.riotgames.com/lol/match/v5/matches/" + match_id + "/timeline?api_key=" + api_key
    print("match timeline url: ", url)
    return requests.get(url).json()

def get_live_game(region, id, api_key):
    url = "https://" + region + ".api.riotgames.com/lol/spectator/v4/active-games/by-summoner/" + id + "?api_key=" + api_key
    return requests.get(url).json()


