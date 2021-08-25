import requests, json, os.path, time, sphc, os
from datetime import datetime

def jsonconvert(json_match):
    ret_json = {}
    ret_json["meta"] ={}
    ret_json["meta"]["gameCreation"] = datetime.fromtimestamp(json_match["info"]["gameCreation"]/1000).strftime("%H:%m[%d/%m]")
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
        if player['teamPosition'] == "":
            player['teamPosition'] = "NOROLE"

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
    return ret_json

def generate_html(match_json):
    tf = sphc.TagFactory()
    gameCreation = tf.p(str(match_json['meta']['gameCreation']) , Class='game_creation')
    gameduration = tf.p(str(round(match_json['meta']['gameDuration']/6000)/10) + 'm', Class='game_duration')
    gamemode = tf.p('game mode:\n'+match_json['meta']['gameMode'], Class='game_mode')
    gameType = tf.p('game type:\n'+match_json['meta']['gameType'], Class='game_type')
    gameVersion = tf.p('game versiopn:\n'+match_json['meta']['gameVersion'], Class='game_version')
    meta = tf.DIV([gameCreation, gameduration, gamemode, gameType,  gameVersion], Class='meta')

    team1 = []
    team2 = []
    tc = 0
    for player in match_json:
        tc += 1
        if player == 'meta':
            continue

        # Champions div
        champ = tf.img(src="http://ddragon.leagueoflegends.com/cdn/11.16.1/img/champion/" + match_json[player]['champ']['championName'] + ".png", Class='champ')
        lvl = tf.p(str(match_json[player]['champ']['champLevel']), Class='lvl')
        kda  = tf.p(str(match_json[player]['champ']['kills']) + '/'+ str(match_json[player]['champ']['deaths']) + '/'+ str(match_json[player]['champ']['assists']), Class='kda')
        if match_json[player]['champ']['deaths']  == 0:
            kdacalc = tf.p('(KO)', Class='kdacalc')    
        else:
            kdacalc = tf.p('(' + str(round((10*match_json[player]['champ']['kills']+10*match_json[player]['champ']['assists'])/match_json[player]['champ']['deaths'])/10)+ ')', Class='kdacalc')
        cs = tf.p(str(match_json[player]['objectives']['totalMinionsKilled']), Class='cs')
        cspermin = tf.p('(' + str((round((match_json[player]['objectives']['totalMinionsKilled']*10)/((match_json['meta']['gameDuration']/6000)/10)))/10) + ')', Class='cspermin')
        item0 = tf.img(src="http://ddragon.leagueoflegends.com/cdn/11.16.1/img/item/" + str(match_json[player]['champ']['item0']) + ".png", Class='item')
        item1 = tf.img(src="http://ddragon.leagueoflegends.com/cdn/11.16.1/img/item/" + str(match_json[player]['champ']['item1']) + ".png", Class='item')
        item2 = tf.img(src="http://ddragon.leagueoflegends.com/cdn/11.16.1/img/item/" + str(match_json[player]['champ']['item2']) + ".png", Class='item')
        item3 = tf.img(src="http://ddragon.leagueoflegends.com/cdn/11.16.1/img/item/" + str(match_json[player]['champ']['item3']) + ".png", Class='item')
        item4 = tf.img(src="http://ddragon.leagueoflegends.com/cdn/11.16.1/img/item/" + str(match_json[player]['champ']['item4']) + ".png", Class='item')
        item5 = tf.img(src="http://ddragon.leagueoflegends.com/cdn/11.16.1/img/item/" + str(match_json[player]['champ']['item5']) + ".png", Class='item')
        item6 = tf.img(src="http://ddragon.leagueoflegends.com/cdn/11.16.1/img/item/" + str(match_json[player]['champ']['item6']) + ".png", Class='item')
        
        items = tf.DIV([item0, item1, item2, item3, item4, item5, item6], Class='items')
        runes = tf.DIV('runes', Class='runes')
        champion = tf.DIV([champ, lvl, kda, kdacalc, cs,cspermin, runes,items], Class='champion')
        
        # Vision div
        visionscore = tf.p(str(match_json[player]['vision']['visionScore']), Class='visionScore')
        controlwards = tf.p('('+str(match_json[player]['vision']['visionWardsBoughtInGame'])+')', Class='controlwards')
        vision = tf.DIV([visionscore,controlwards], Class='vision')
        objectives = tf.DIV(Class='objectives')
        spells = tf.DIV(Class='spells')
        kills = tf.DIV(Class='kills')
        minons = tf.DIV(Class='minons')
        damage = tf.DIV(Class='damage')
        player = tf.DIV([champion,vision], Class=match_json[player]['meta']['teamPosition']+" "+match_json[player]['meta']['summonerId'])
        if tc > 6:
            team2.append(player)
        else:
            team1.append(player)
    team1 = tf.DIV(team1, Class='team')
    team2 = tf.DIV(team2, Class='team')
    players = tf.DIV([team1,team2], Class='players')

    doc = tf.DIV([meta, players], Class="match")
    return doc

def download_matches(match_history, region_large, api_key):
        for match in match_history:
            match_name = match.split('_')
            path = '/home/pi/website/static/lolgames_html/' + match_name[0] + '/' + match_name[1] + '.txt'
            if os.path.isfile(path):
                print('skipped already downloaded game')
                continue
            time.sleep(1/5)
            ret_json = {}
            url = "https://" + region_large + ".api.riotgames.com/lol/match/v5/matches/" + match + "?api_key=" + api_key
            print(url)
            json_match =  requests.get(url).json()
            if "status" in json_match.keys():
                continue

            ret_json = jsonconvert(json_match)
            div = generate_html(ret_json)

            #print('\n\n\npringint folder pand ')
            #for f in os.listdir("/home/pi/website/static/lolgames_html/"):
	        #    print(f)
            with open(path, 'w') as f:
                f.write(str(div))
                print('saved to' ,path)

