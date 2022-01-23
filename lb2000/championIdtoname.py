from hashlib import new
import requests

# http://ddragon.leagueoflegends.com/cdn/12.2.1/data/en_US/champion.json


def createChampIdToName():
    championjson = requests.get(
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/data/en_US/champion.json')
    championjson = championjson.json()
    newjson = {}
    for champ in championjson['data']:
        newjson[championjson['data'][champ]['key']
                ] = championjson['data'][champ]['id']
    return newjson


def listOfChampIds():
    championjson = requests.get(
        'http://ddragon.leagueoflegends.com/cdn/12.2.1/data/en_US/champion.json')
    championjson = championjson.json()
    l = []
    for champ in championjson['data']:
        if champ == 'Fiddlesticks':
            l.append('FiddleSticks')
        else:
            l.append(championjson['data'][champ]['id'])
    return l


champ_id_to_name = createChampIdToName()
champNames = listOfChampIds()

if __name__ == "__main__":
    createChampIdToName()
    listOfChampIds()
