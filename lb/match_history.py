import requests
import time
import sphc
import unicodedata
import os
from datetime import datetime


def jsonconvert(json_match, runeIdToName):
# game meta
    ret_json = {}
    ret_json["meta"] = {}
    ret_json["meta"]["gameCreation"] = datetime.fromtimestamp(
        json_match["info"]["gameCreation"]/1000).strftime("%H:%m[%d/%m]")
    ret_json["meta"]["gameDuration"] = json_match["info"]["gameDuration"]
    ret_json["meta"]["gameMode"] = json_match["info"]["gameMode"]
    ret_json["meta"]["gameType"] = json_match["info"]["gameType"]
    ret_json["meta"]["gameVersion"] = json_match["info"]["gameVersion"]

    for player in json_match["info"]["participants"]:
# player meta
        ret_json[player['summonerId']] = {}
        ret_json[player['summonerId']]['meta'] = {}
        ret_json[player['summonerId']]['meta']['lane'] = player['lane']
        ret_json[player['summonerId']
                 ]['meta']['profileIcon'] = player['profileIcon']
        ret_json[player['summonerId']]['meta']['puuid'] = player['puuid']
        ret_json[player['summonerId']]['meta']['role'] = player['role']
        ret_json[player['summonerId']
                 ]['meta']['summonerId'] = player['summonerId']
        ret_json[player['summonerId']
                 ]['meta']['summonerLevel'] = player['summonerLevel']
        ret_json[player['summonerId']
                 ]['meta']['summonerName'] = player['summonerName']
        if player['teamPosition'] == "":
            player['teamPosition'] = "NOROLE"

        ret_json[player['summonerId']
                 ]['meta']['teamPosition'] = player['teamPosition']
        ret_json[player['summonerId']
                 ]['meta']['individualPosition'] = player['individualPosition']
        ret_json[player['summonerId']]['meta']['teamId'] = player['teamId']
        ret_json[player['summonerId']]['meta']['win'] = player['win']
# champ
        ret_json[player['summonerId']]['champ'] = {}
        ret_json[player['summonerId']
                 ]['champ']['championName'] = player['championName']
        ret_json[player['summonerId']]['champ']['assists'] = player['assists']
        ret_json[player['summonerId']
                 ]['champ']['champLevel'] = player['champLevel']
        ret_json[player['summonerId']]['champ']['deaths'] = player['deaths']
        ret_json[player['summonerId']]['champ']['kills'] = player['kills']
        ret_json[player['summonerId']]['champ']['item0'] = player['item0']
        ret_json[player['summonerId']]['champ']['item1'] = player['item1']
        ret_json[player['summonerId']]['champ']['item2'] = player['item2']
        ret_json[player['summonerId']]['champ']['item3'] = player['item3']
        ret_json[player['summonerId']]['champ']['item4'] = player['item4']
        ret_json[player['summonerId']]['champ']['item5'] = player['item5']
        ret_json[player['summonerId']]['champ']['item6'] = player['item6']
        ret_json[player['summonerId']
                 ]['champ']['summoner1Id'] = player['summoner1Id']
        ret_json[player['summonerId']
                 ]['champ']['summoner2Id'] = player['summoner2Id']

# runes
        ret_json[player['summonerId']]['perks'] = {}
        ret_json[player['summonerId']]['perks']['statPerks'] = []
        ret_json[player['summonerId']]['perks']['keystone'] = runeIdToName[str(player['perks']['styles'][0]["selections"][0]['perk'])]

        for i, statperk in player['perks']['statPerks'].items():
            ret_json[player['summonerId']]['perks']['statPerks'].append(
                runeIdToName[str(statperk)])

        ret_json[player['summonerId']]['perks']['primaryStyle'] = []
        for statperk in player['perks']['styles'][0]["selections"][1:]:
            ret_json[player['summonerId']]['perks']['primaryStyle'].append(
                runeIdToName[str(statperk['perk'])])

        ret_json[player['summonerId']]['perks']['subStyle'] = []
        for statperk in player['perks']['styles'][1]["selections"]:
            ret_json[player['summonerId']]['perks']['subStyle'].append(
                runeIdToName[str(statperk['perk'])])
# vision
        ret_json[player['summonerId']]['vision'] = {}
        ret_json[player['summonerId']
                 ]['vision']['detectorWardsPlaced'] = player['detectorWardsPlaced']
        ret_json[player['summonerId']
                 ]['vision']['sightWardsBoughtInGame'] = player['sightWardsBoughtInGame']
        ret_json[player['summonerId']
                 ]['vision']['visionScore'] = player['visionScore']
        ret_json[player['summonerId']
                 ]['vision']['visionWardsBoughtInGame'] = player['visionWardsBoughtInGame']
        ret_json[player['summonerId']
                 ]['vision']['wardsKilled'] = player['wardsKilled']
        ret_json[player['summonerId']
                 ]['vision']['wardsPlaced'] = player['wardsPlaced']
# multikills
        ret_json[player['summonerId']]['multikills'] = {}
        ret_json[player['summonerId']
                 ]['multikills']['doubleKills'] = player['doubleKills']
        ret_json[player['summonerId']
                 ]['multikills']['killingSprees'] = player['killingSprees']
        ret_json[player['summonerId']
                 ]['multikills']['largestKillingSpree'] = player['largestKillingSpree']
        ret_json[player['summonerId']
                 ]['multikills']['largestMultiKill'] = player['largestMultiKill']
        ret_json[player['summonerId']
                 ]['multikills']['largestCriticalStrike'] = player['largestCriticalStrike']
        ret_json[player['summonerId']
                 ]['multikills']['longestTimeSpentLiving'] = player['longestTimeSpentLiving']
        ret_json[player['summonerId']
                 ]['multikills']['totalTimeSpentDead'] = player['totalTimeSpentDead']
        ret_json[player['summonerId']
                 ]['multikills']['pentaKills'] = player['pentaKills']
        ret_json[player['summonerId']
                 ]['multikills']['quadraKills'] = player['quadraKills']
        ret_json[player['summonerId']
                 ]['multikills']['tripleKills'] = player['tripleKills']
        ret_json[player['summonerId']
                 ]['multikills']['unrealKills'] = player['unrealKills']
# damage
        ret_json[player['summonerId']]['damage'] = {}
        ret_json[player['summonerId']
                 ]['damage']['magicDamageDealt'] = player['magicDamageDealt']
        ret_json[player['summonerId']
                 ]['damage']['physicalDamageDealt'] = player['physicalDamageDealt']
        ret_json[player['summonerId']
                 ]['damage']['totalDamageDealt'] = player['totalDamageDealt']
        ret_json[player['summonerId']
                 ]['damage']['trueDamageDealt'] = player['trueDamageDealt']
        ret_json[player['summonerId']
                 ]['damage']['magicDamageDealtToChampions'] = player['magicDamageDealtToChampions']
        ret_json[player['summonerId']
                 ]['damage']['physicalDamageDealtToChampions'] = player['physicalDamageDealtToChampions']
        ret_json[player['summonerId']
                 ]['damage']['totalDamageDealtToChampions'] = player['totalDamageDealtToChampions']
        ret_json[player['summonerId']
                 ]['damage']['totalDamageDealt'] = player['trueDamageDealtToChampions']
        ret_json[player['summonerId']
                 ]['damage']['trueDamageDealt'] = player['damageDealtToBuildings']
        ret_json[player['summonerId']
                 ]['damage']['magicDamageDealtToChampions'] = player['damageDealtToObjectives']
        ret_json[player['summonerId']
                 ]['damage']['damageDealtToTurrets'] = player['damageDealtToTurrets']
        ret_json[player['summonerId']
                 ]['damage']['physicalDamageTaken'] = player['physicalDamageTaken']
        ret_json[player['summonerId']
                 ]['damage']['totalDamageTaken'] = player['totalDamageTaken']
        ret_json[player['summonerId']
                 ]['damage']['trueDamageTaken'] = player['trueDamageTaken']
# support
        ret_json[player['summonerId']]['support'] = {}
        ret_json[player['summonerId']
                 ]['support']['totalDamageShieldedOnTeammates'] = player['totalDamageShieldedOnTeammates']
        ret_json[player['summonerId']
                 ]['support']['totalHeal'] = player['totalHeal']
        ret_json[player['summonerId']
                 ]['support']['totalHealsOnTeammates'] = player['totalHealsOnTeammates']
        ret_json[player['summonerId']
                 ]['support']['timeCCingOthers'] = player['timeCCingOthers']
        ret_json[player['summonerId']
                 ]['support']['totalTimeCCDealt'] = player['totalTimeCCDealt']
# objectives
        ret_json[player['summonerId']]['objectives'] = {}
        ret_json[player['summonerId']
                 ]['objectives']['neutralMinionsKilled'] = player['neutralMinionsKilled']
        ret_json[player['summonerId']
                 ]['objectives']['dragonKills'] = player['dragonKills']
        ret_json[player['summonerId']
                 ]['objectives']['baronKills'] = player['baronKills']
        ret_json[player['summonerId']
                 ]['objectives']['objectivesStolen'] = player['objectivesStolen']
        ret_json[player['summonerId']
                 ]['objectives']['objectivesStolenAssists'] = player['objectivesStolenAssists']
        ret_json[player['summonerId']
                 ]['objectives']['totalMinionsKilled'] = player['totalMinionsKilled']
#events
        ret_json[player['summonerId']]['events'] = {}
        ret_json[player['summonerId']
                 ]['events']['firstBloodAssist'] = player['firstBloodAssist']
        ret_json[player['summonerId']
                 ]['events']['firstBloodKill'] = player['firstBloodKill']
        ret_json[player['summonerId']
                 ]['events']['firstTowerAssist'] = player['firstTowerAssist']
        ret_json[player['summonerId']
                 ]['events']['firstTowerKill'] = player['firstTowerKill']
        ret_json[player['summonerId']
                 ]['events']['inhibitorKills'] = player['inhibitorKills']
        ret_json[player['summonerId']
                 ]['events']['inhibitorsLost'] = player['inhibitorsLost']
        ret_json[player['summonerId']
                 ]['events']['turretKills'] = player['turretKills']
        ret_json[player['summonerId']
                 ]['events']['turretsLost'] = player['turretsLost']
# stats
        ret_json[player['summonerId']]['stats'] = {}
        ret_json[player['summonerId']
                 ]['stats']['goldEarned'] = player['goldEarned']
        ret_json[player['summonerId']
                 ]['stats']['goldSpent'] = player['goldSpent']
        ret_json[player['summonerId']
                 ]['stats']['itemsPurchased'] = player['itemsPurchased']
        ret_json[player['summonerId']
                 ]['stats']['spell1Casts'] = player['spell1Casts']
        ret_json[player['summonerId']
                 ]['stats']['spell2Casts'] = player['spell2Casts']
        ret_json[player['summonerId']
                 ]['stats']['spell3Casts'] = player['spell3Casts']
        ret_json[player['summonerId']
                 ]['stats']['spell4Casts'] = player['spell4Casts']
        ret_json[player['summonerId']
                 ]['stats']['summoner1Casts'] = player['summoner1Casts']
        ret_json[player['summonerId']
                 ]['stats']['summoner2Casts'] = player['summoner2Casts']
    return ret_json


def generate_html(match_json, region):
# meta
    tf = sphc.TagFactory()
    gameCreation = tf.p(
        str(match_json['meta']['gameCreation']), Class='game_creation')
    gameduration = tf.p(
        str(round(match_json['meta']['gameDuration']/6)/10) + 'm', Class='game_duration')
    gamemode = tf.p(match_json['meta']['gameMode'], Class='gameMode')
    gameType = tf.p(match_json['meta']['gameType'], Class='gameType')
    gameVersion = tf.p(match_json['meta']['gameVersion'], Class='gameVersion')
    meta = tf.DIV([gameCreation, gameduration, gamemode,
                  gameType,  gameVersion], Class='meta w-20')

    matchups = {'TOP_matchup_100': 0,
                'JUNGLE_matchup_100': 0,
                'MIDDLE_matchup_100':  0,
                'BOTTOM_matchup_100': 0,
                'UTILITY_matchup_100':  0,
                'NOROLE_matchup_100':  -15,
                'TOP_matchup_200': 0,
                'JUNGLE_matchup_200': 0,
                'MIDDLE_matchup_200':  0,
                'BOTTOM_matchup_200': 0,
                'UTILITY_matchup_200':  0,
                'NOROLE_matchup_200':  -15,
                'lost': []
                }
    tc = 0
    # add all classnames (summonerid +'t') to 2 strings
    t = {'t100': '',
         't200': ''}
    winnerlost = ' '
    for player in match_json:
        if player == 'meta':
            continue
        if match_json[player]['meta']['teamId'] == 100:
            t['t100'] += str(match_json[player]['meta']['summonerId'] + 't ')
        else:
            t['t200'] += str(match_json[player]['meta']['summonerId'] + 't ')

        if match_json[player]['meta']['win']:
            winnerlost += str(match_json[player]['meta']['summonerId'] + 'w ')
        else:
            winnerlost += str(match_json[player]['meta']['summonerId'] + 'l ')

    for player in match_json:
        tc += 1
        if player == 'meta':
            continue
        
# basic champ
        divs = []
        # Champions div
        if match_json[player]['champ']['championName'] == 'FiddleSticks':
            match_json[player]['champ']['championName'] = 'Fiddlesticks'
        champ = tf.img(src="http://ddragon.leagueoflegends.com/cdn/12.1.1/img/champion/" +
                       match_json[player]['champ']['championName'] + ".png", Class='champ')
        lvl = tf.p(str(match_json[player]['champ']
                   ['champLevel']), Class='lvl w-4')
        kda = tf.p(str(match_json[player]['champ']['kills']) + '/' + str(match_json[player]
                   ['champ']['deaths']) + '/' + str(match_json[player]['champ']['assists']), Class='kda w-16 text-right mr-1')
        if match_json[player]['champ']['deaths'] == 0:
            kdacalc = tf.p('(KO)', Class='kdacalc w-12')
        else:
            kdacalc = tf.p('(' + str(round((10*match_json[player]['champ']['kills']+10*match_json[player]
                           ['champ']['assists'])/match_json[player]['champ']['deaths'])/10) + ')', Class='kdacalc w-12')
        kdaboth = tf.DIV([kda, kdacalc], Class='kdaboth flex')
# items
        itemss = ['item0', 'item1', 'item2',
                  'item3', 'item4', 'item5', 'item6']
        itemdiv = []
        for it in itemss:
            if str(match_json[player]['champ'][it]) == '0':
                itemdiv.append(
                    tf.img(src="/static/pics/poor.jpg", Class=it+' w-8 opacity-0'))
            else:
                itemdiv.append(tf.img(src="http://ddragon.leagueoflegends.com/cdn/12.1.1/img/item/" +
                               str(match_json[player]['champ'][it]) + ".png", Class=it+' w-8'))

        items = tf.DIV(itemdiv, Class='items flex w-60')
# runes
        runes = []
        for pr in match_json[player]['perks']['primaryStyle']:
            runes.append(tf.img(src=pr, Class='w-8'))
        for pr in match_json[player]['perks']['subStyle']:
            runes.append(tf.img(src=pr, Class='w-8'))
        for pr in match_json[player]['perks']['statPerks']:
            runes.append(tf.img(src=pr, Class='w-8'))

        keystoneimg = tf.img(src=match_json[player]['perks']['keystone'], Class='keystone w-8')
        keystone = tf.DIV([keystoneimg])
        runestree = tf.DIV(runes, Class='runestree group-hover:flex w-64 flex') #TODO get full runes to show on hover
        runes = tf.DIV([keystone, runestree], Class='group runes flex') #TODO remove all but keystone and make button to show ontop
# detailsdiv
        for category in match_json[player].keys():
            if category in "champmetaperks":
                continue
            ps = []
            for stat in match_json[player][category].keys():
                if stat == "totalMinionsKilled":
                    ps.append(tf.p(
                        '(' + str((round(((match_json[player]['objectives']['totalMinionsKilled']*60)/match_json['meta']['gameDuration'])))) + ')', Class='cspermin'))
                ps.append(
                    tf.p(str(match_json[player][category][stat]), Class=stat))
            divs.append(tf.DIV(ps, Class=category + ' w-24'))
# divstuff stuff
        username = unicodedata.normalize('NFKD', match_json[player]['meta']['summonerName']).encode('ascii', 'ignore')
        summonername = tf.p(username, Class='w-16 text-right overflow-hidden whitespace-nowrap')#TODO fix to work with all unicode names 
        summonernamediv = tf.A(summonername, href='http://127.0.0.1:5000/lb2000/'+region+'/'+username)
        championdiv = tf.DIV(
            [summonernamediv, champ, lvl, kdaboth, runes, items], Class='champion')
        innerdiv = tf.DIV(divs, Class="detaildiv")

        divsdiv = tf.DIV([championdiv, innerdiv], Class="playerdiv flex flex-col justify-items-center")

        teampos = match_json[player]['meta']['teamPosition'] + \
            '_matchup_' + str(match_json[player]['meta']['teamId'])
        if matchups[teampos] == 0:
            playerdiv = tf.DIV( divsdiv, Class= str(match_json[player]['meta']['summonerId'])+' items-center hidden ' + teampos +' ' + match_json[player]['meta']['teamPosition'] + ' '+t['t' + str(match_json[player]['meta']['teamId'])])
            matchups[teampos] = playerdiv
        else:
            playerdiv = tf.DIV(divsdiv, Class=str(match_json[player]['meta']['summonerId'])+' items-center lost  hidden ' + match_json[player]['meta']['teamPosition'] + ' ' +t['t' + str(match_json[player]['meta']['teamId'])])
            matchups['lost'].append(playerdiv)

        
    # matchups
    # checks if aram
    if len(matchups['lost']) == 10:
        pass

    for p in matchups['lost']:
        for key in matchups.keys():
            if matchups[key] == 0:
                matchups[key] = p
                break

    TOP_matchup = tf.DIV([matchups['TOP_matchup_100'],
                         matchups['TOP_matchup_200']], Class='TOP_matchup flex')
    JUNGLE_matchup = tf.DIV([matchups['JUNGLE_matchup_100'],
                            matchups['JUNGLE_matchup_200']], Class='JUNGLE_matchup flex')
    MIDDLE_matchup = tf.DIV([matchups['MIDDLE_matchup_100'],
                            matchups['MIDDLE_matchup_200']], Class='MIDDLE_matchup flex')
    BOTTOM_matchup = tf.DIV([matchups['BOTTOM_matchup_100'],
                            matchups['BOTTOM_matchup_200']], Class='BOTTOM_matchup flex')
    UTILITY_matchup = tf.DIV([matchups['UTILITY_matchup_100'],
                             matchups['UTILITY_matchup_200']], Class='UTILITY_matchup flex')
    players = tf.DIV([TOP_matchup, JUNGLE_matchup, MIDDLE_matchup,
                     BOTTOM_matchup, UTILITY_matchup], Class='players flex flex-col items-center')

    doc = tf.DIV([meta, players], Class=winnerlost+"match flex items-center rounded border-2 border-gray-800 gap-0.5")
    return doc
#TODO summoner spells

def download_matches(match_history, region, api_key, runeIdToName, region_converter):
    for match in match_history:
        match_name = match.split('_')
        path = '/home/pi/website/static/lolgames_html/' + \
            match_name[0] + '/' + match_name[1] + '.txt'
        #if os.path.isfile(path):
        #    print('skipped already downloaded game')
        #    continue
        time.sleep(1/5)
        ret_json = {}
        url = "https://" + region_converter[region] + \
            ".api.riotgames.com/lol/match/v5/matches/" + match + "?api_key=" + api_key
        print(url)
        json_match = requests.get(url).json()
        if "status" in json_match.keys():
            continue

        ret_json = jsonconvert(json_match, runeIdToName)
        div = generate_html(ret_json, region)

        #print('\n\n\npringint folder pand ')
        # for f in os.listdir("/home/pi/website/static/lolgames_html/"):
        #    print(f)
        with open(path, 'w+') as f:
            f.write(str(div))
            print('saved to', path)
