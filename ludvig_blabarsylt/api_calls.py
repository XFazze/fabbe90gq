import requests, json, os.path, time
def get_summoner(region, username, api_key):
    url = "https://" + region + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + username + "?api_key=" + api_key
    print(url)
    return requests.get(url).json()
    

def get_total_mastery(region, id, api_key):
    url = "https://" + region + ".api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/" + id + "?api_key=" + api_key
    return requests.get(url).json()

def get_mastery(region, id, api_key):
    url = "https://" + region + ".api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" +  id + "?api_key=" + api_key
    return requests.get(url).json()

def get_rank(region, id, api_key):
    url = "https://" + region + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" +  id + "?api_key=" + api_key
    return requests.get(url).json()

def get_match_history(region_large, puuid, api_key):
    url = "https://" + region_large + ".api.riotgames.com//lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count=9&api_key=" + api_key
    return requests.get(url).json()  # max 100 but has filters


def get_match(region_large, match_id, api_key):
    url = "https://" + region_large + ".api.riotgames.com/lol/match/v5/matches/" + match_id + "?api_key=" + api_key
    return requests.get(url).json()

def get_match_timeline(region_large, match_id, api_key):
    url = "https://" + region_large + ".api.riotgames.com/lol/match/v5/matches/" + match_id + "/timeline?api_key=" + api_key
    return requests.get(url).json()

def get_live_game(region, id, api_key):
    url = "https://" + region + ".api.riotgames.com/lol/spectator/v4/active-games/by-summoner/" + id + "?api_key=" + api_key
    return requests.get(url).json()

def download_matches(match_history, region_large, api_key):
        for match in match_history:
            match_name = match.split('_')
            path = '/home/pi/website/static/lolgames/' + match_name[0] + '/' + match_name[1] + '.json'
            if os.path.isfile(path):
                print('skipped already downloaded game')
                continue
            time.sleep(1/15)
            ret_json = {}
            url = "https://" + region_large + ".api.riotgames.com/lol/match/v5/matches/" + match + "?api_key=" + api_key
            json_match =  requests.get(url).json()
            ret_json["meta"] ={}
            ret_json["meta"]["gameCreation"] = json_match["info"]["gameCreation"]
            ret_json["meta"]["gameDuration"] = json_match["info"]["gameDuration"]
            ret_json["meta"]["gameMode"] = json_match["info"]["gameMode"]
            ret_json["meta"]["gameType"] = json_match["info"]["gameType"]
            ret_json["meta"]["gameVersion"] = json_match["info"]["gameVersion"]

            for player in json_match["info"]["participants"]:
                ret_json[player['summonerId']] = {}
                ret_json[player['summonerId']]['meta'] = {}
                ret_json[player['summonerId']]['meta']['lane'] = player['lane']
                ret_json[player['summonerId']]['meta']['profileIcon'] = player['profileIcon']
                ret_json[player['summonerId']]['meta']['puuid'] = player['puuid']
                ret_json[player['summonerId']]['meta']['role'] = player['role']
                ret_json[player['summonerId']]['meta']['summonerId'] = player['summonerId']
                ret_json[player['summonerId']]['meta']['summonerLevel'] = player['summonerLevel']
                ret_json[player['summonerId']]['meta']['summonerName'] = player['summonerName']
                ret_json[player['summonerId']]['meta']['teamPosition'] = player['teamPosition']
                ret_json[player['summonerId']]['meta']['individualPosition'] = player['individualPosition']
                ret_json[player['summonerId']]['meta']['win'] = player['win']
                
                ret_json[player['summonerId']]['champ'] = {}
                ret_json[player['summonerId']]['champ']['championName'] = player['championName']
                ret_json[player['summonerId']]['champ']['assists'] = player['assists']
                ret_json[player['summonerId']]['champ']['champLevel'] = player['champLevel']
                ret_json[player['summonerId']]['champ']['deaths'] = player['deaths']
                ret_json[player['summonerId']]['champ']['kills'] = player['kills']
                ret_json[player['summonerId']]['champ']['item0'] = player['item0']
                ret_json[player['summonerId']]['champ']['item1'] = player['item1']
                ret_json[player['summonerId']]['champ']['item2'] = player['item2']
                ret_json[player['summonerId']]['champ']['item3'] = player['item3']
                ret_json[player['summonerId']]['champ']['item4'] = player['item4']
                ret_json[player['summonerId']]['champ']['item5'] = player['item5']
                ret_json[player['summonerId']]['champ']['item6'] = player['item6']
                ret_json[player['summonerId']]['champ']['summoner1Id'] = player['summoner1Id']
                ret_json[player['summonerId']]['champ']['summoner2Id'] = player['summoner2Id']
                            
                ret_json[player['summonerId']]['perks'] = {}
                ret_json[player['summonerId']]['perks']['statPerks'] = player['perks']['statPerks']
                ret_json[player['summonerId']]['perks']['primaryStyle'] = {}
                ret_json[player['summonerId']]['perks']['primaryStyle']['statPerks'] = player['perks']['styles'][0]['style']
                ret_json[player['summonerId']]['perks']['primaryStyle']['statPerks'] = player['perks']['styles'][0]["selections"][0]
                ret_json[player['summonerId']]['perks']['primaryStyle']['statPerks'] = player['perks']['styles'][0]["selections"][1]
                ret_json[player['summonerId']]['perks']['primaryStyle']['statPerks'] = player['perks']['styles'][0]["selections"][2]
                ret_json[player['summonerId']]['perks']['primaryStyle']['statPerks'] = player['perks']['styles'][0]["selections"][3]
                ret_json[player['summonerId']]['perks']['subStyle'] = {}
                ret_json[player['summonerId']]['perks']['subStyle']['statPerks'] = player['perks']['styles'][1]['style']
                ret_json[player['summonerId']]['perks']['subStyle']['statPerks'] = player['perks']['styles'][1]["selections"][0]
                ret_json[player['summonerId']]['perks']['subStyle']['statPerks'] = player['perks']['styles'][1]["selections"][1]

                ret_json[player['summonerId']]['vision'] = {}
                ret_json[player['summonerId']]['vision']['detectorWardsPlaced'] = player['detectorWardsPlaced']
                ret_json[player['summonerId']]['vision']['sightWardsBoughtInGame'] = player['sightWardsBoughtInGame']
                ret_json[player['summonerId']]['vision']['visionScore'] = player['visionScore']
                ret_json[player['summonerId']]['vision']['visionWardsBoughtInGame'] = player['visionWardsBoughtInGame']
                ret_json[player['summonerId']]['vision']['wardsKilled'] = player['wardsKilled']
                ret_json[player['summonerId']]['vision']['wardsPlaced'] = player['wardsPlaced']

                ret_json[player['summonerId']]['poppin'] = {}
                ret_json[player['summonerId']]['poppin']['doubleKills'] = player['doubleKills']
                ret_json[player['summonerId']]['poppin']['killingSprees'] = player['killingSprees']
                ret_json[player['summonerId']]['poppin']['largestKillingSpree'] = player['largestKillingSpree']
                ret_json[player['summonerId']]['poppin']['largestMultiKill'] = player['largestMultiKill']
                ret_json[player['summonerId']]['poppin']['largestCriticalStrike'] = player['largestCriticalStrike']
                ret_json[player['summonerId']]['poppin']['longestTimeSpentLiving'] = player['longestTimeSpentLiving']
                ret_json[player['summonerId']]['poppin']['totalTimeSpentDead'] = player['totalTimeSpentDead']
                ret_json[player['summonerId']]['poppin']['pentaKills'] = player['pentaKills']
                ret_json[player['summonerId']]['poppin']['quadraKills'] = player['quadraKills']
                ret_json[player['summonerId']]['poppin']['tripleKills'] = player['tripleKills']
                ret_json[player['summonerId']]['poppin']['unrealKills'] = player['unrealKills']
                
                ret_json[player['summonerId']]['damage'] = {}
                ret_json[player['summonerId']]['damage']['magicDamageDealt'] = player['magicDamageDealt']
                ret_json[player['summonerId']]['damage']['physicalDamageDealt'] = player['physicalDamageDealt']
                ret_json[player['summonerId']]['damage']['totalDamageDealt'] = player['totalDamageDealt']
                ret_json[player['summonerId']]['damage']['trueDamageDealt'] = player['trueDamageDealt']
                ret_json[player['summonerId']]['damage']['magicDamageDealtToChampions'] = player['magicDamageDealtToChampions']
                ret_json[player['summonerId']]['damage']['physicalDamageDealtToChampions'] = player['physicalDamageDealtToChampions']
                ret_json[player['summonerId']]['damage']['totalDamageDealtToChampions'] = player['totalDamageDealtToChampions']
                ret_json[player['summonerId']]['damage']['totalDamageDealt'] = player['trueDamageDealtToChampions']
                ret_json[player['summonerId']]['damage']['trueDamageDealt'] = player['damageDealtToBuildings']
                ret_json[player['summonerId']]['damage']['magicDamageDealtToChampions'] = player['damageDealtToObjectives']
                ret_json[player['summonerId']]['damage']['physicalDamageDealtToChampions'] = player['damageDealtToTurrets']
                ret_json[player['summonerId']]['damage']['physicalDamageTaken'] = player['physicalDamageTaken']
                ret_json[player['summonerId']]['damage']['totalDamageTaken'] = player['totalDamageTaken']
                ret_json[player['summonerId']]['damage']['trueDamageTaken'] = player['trueDamageTaken']

                ret_json[player['summonerId']]['utility'] = {}
                ret_json[player['summonerId']]['utility']['totalDamageShieldedOnTeammates'] = player['totalDamageShieldedOnTeammates']
                ret_json[player['summonerId']]['utility']['totalHeal'] = player['totalHeal']
                ret_json[player['summonerId']]['utility']['totalHealsOnTeammates'] = player['totalHealsOnTeammates']
                ret_json[player['summonerId']]['utility']['timeCCingOthers'] = player['timeCCingOthers']
                ret_json[player['summonerId']]['utility']['totalTimeCCDealt'] = player['totalTimeCCDealt']

                ret_json[player['summonerId']]['objectives'] = {}
                ret_json[player['summonerId']]['objectives']['neutralMinionsKilled'] = player['neutralMinionsKilled']
                ret_json[player['summonerId']]['objectives']['dragonKills'] = player['dragonKills']
                ret_json[player['summonerId']]['objectives']['baronKills'] = player['baronKills']
                ret_json[player['summonerId']]['objectives']['objectivesStolen'] = player['objectivesStolen']
                ret_json[player['summonerId']]['objectives']['objectivesStolenAssists'] = player['objectivesStolenAssists']
                ret_json[player['summonerId']]['objectives']['totalMinionsKilled'] = player['totalMinionsKilled']
                
                ret_json[player['summonerId']]['gameobjectives'] = {}
                ret_json[player['summonerId']]['gameobjectives']['firstBloodAssist'] = player['firstBloodAssist']
                ret_json[player['summonerId']]['gameobjectives']['firstBloodKill'] = player['firstBloodKill']
                ret_json[player['summonerId']]['gameobjectives']['firstTowerAssist'] = player['firstTowerAssist']
                ret_json[player['summonerId']]['gameobjectives']['firstTowerKill'] = player['firstTowerKill']
                ret_json[player['summonerId']]['gameobjectives']['inhibitorKills'] = player['inhibitorKills']
                ret_json[player['summonerId']]['gameobjectives']['inhibitorsLost'] = player['inhibitorsLost']
                ret_json[player['summonerId']]['gameobjectives']['turretKills'] = player['turretKills']
                ret_json[player['summonerId']]['gameobjectives']['turretsLost'] = player['turretsLost']
                
                ret_json[player['summonerId']]['stats'] = {}
                ret_json[player['summonerId']]['stats']['goldEarned'] = player['goldEarned']
                ret_json[player['summonerId']]['stats']['goldSpent'] = player['goldSpent']
                ret_json[player['summonerId']]['stats']['itemsPurchased'] = player['itemsPurchased']
                ret_json[player['summonerId']]['stats']['spell1Casts'] = player['spell1Casts']
                ret_json[player['summonerId']]['stats']['spell2Casts'] = player['spell2Casts']
                ret_json[player['summonerId']]['stats']['spell3Casts'] = player['spell3Casts']
                ret_json[player['summonerId']]['stats']['spell4Casts'] = player['spell4Casts']
                ret_json[player['summonerId']]['stats']['summoner1Casts'] = player['summoner1Casts']
                ret_json[player['summonerId']]['stats']['summoner2Casts'] = player['summoner2Casts']

            with open(path, 'w') as f:
                json.dump(ret_json, f)
                print('saved to' ,path)
