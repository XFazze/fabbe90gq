
import requests
from pprint import pprint


def getInfo():
    url = 'https://ddragon.leagueoflegends.com/cdn/12.2.1/data/en_US/summoner.json'
    response = requests.get(url).json()
    return response


def createIdToImageUrl(info):
    res = {

    }
    for summoner in info['data'].keys():
        res[info['data'][summoner]['key']] = 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/' + \
            info['data'][summoner]['image']['full']
    return res


summonerIdToImg = {'1': 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerBoost.png',
                   '11': 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerSmite.png',
                   '12': 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerTeleport.png',
                   '13': 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerMana.png',
                   '14': 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerDot.png',
                   '21': 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerBarrier.png',
                   '3': 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerExhaust.png',
                   '30': 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerPoroRecall.png',
                   '31': 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerPoroThrow.png',
                   '32': 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerSnowball.png',
                   '39': 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerSnowURFSnowball_Mark.png',
                   '4': 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerFlash.png',
                   '54': 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/Summoner_UltBookPlaceholder.png',
                   '55': 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/Summoner_UltBookSmitePlaceholder.png',
                   '6': 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerHaste.png',
                   '7': 'http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/SummonerHeal.png'}
if __name__ == '__main__':
    info = getInfo()
    pprint(createIdToImageUrl(info))
