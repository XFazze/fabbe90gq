import requests
def get_summoner(region, username):
    url = "https://" + region + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + username + "?api_key=RGAPI-4c0b84cf-2f4a-41b3-bc13-052d168f921e"
    return requests.get(url).json()
    

def get_total_mastery(region, id):
    url = "https://" + region + ".api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/" + id + "?api_key=RGAPI-4c0b84cf-2f4a-41b3-bc13-052d168f921e"
    return requests.get(url).json()

def get_mastery(region, id):
    url = "https://" + region + ".api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" +  id + "?api_key=RGAPI-4c0b84cf-2f4a-41b3-bc13-052d168f921e"
    return requests.get(url).json()

def get_match_history(region_large, puuid):
    url = "https://" + region_large + ".api.riotgames.com//lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=100&api_key=RGAPI-4c0b84cf-2f4a-41b3-bc13-052d168f921e"
    return requests.get(url).json()  # max 100 but has filters


def get_match(region_large, match_id):
    url = "https://" + region_large + ".api.riotgames.com/lol/match/v5/matches/" + match_id + "?api_key=RGAPI-4c0b84cf-2f4a-41b3-bc13-052d168f921e"
    return requests.get(url).json()

def get_match_timeline(region_large, match_id):
    url = "https://" + region_large + ".api.riotgames.com/lol/match/v5/matches/" + match_id + "/timeline?api_key=RGAPI-4c0b84cf-2f4a-41b3-bc13-052d168f921e"
    return requests.get(url).json()

def get_live_game(region, id):
    url = "https://" + region + ".api.riotgames.com/lol/spectator/v4/active-games/by-summoner/" + id + "?api_key=RGAPI-4c0b84cf-2f4a-41b3-bc13-052d168f921e"
    return requests.get(url).json()