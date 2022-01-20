import requests as r
from pprint import pprint
def getrunes():
    resp =r.get('http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json')

    if resp.status_code != 200:
        raise ValueError('failed to get runes in downloadjson() in lb/runes.py')

    dic = {}
    for i, v in enumerate(resp.json()):
        dic[str(v['id'])] = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1" + v['iconPath'].lower().split('v1')[1]
    return dic

def getrunesShort():
    resp =r.get('http://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perks.json')

    if resp.status_code != 200:
        raise ValueError('failed to get runes in downloadjson() in lb/runes.py')

    dic = {}
    for i, v in enumerate(resp.json()):
        dic[str(v['id'])] = v['iconPath'].lower().split('v1')[1]
    return dic

def getrunesSubTree():
    resp =r.get('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perkstyles.json')

    if resp.status_code != 200:
        raise ValueError('failed to get runes in downloadjson() in lb/runes.py')
    dic = {}
    for i, v in enumerate(resp.json()['styles']):
        print(v)
        dic[str(v['id'])] = v['iconPath'].lower().split('v1')[1]
    return dic

runeIdToName = getrunes()
if __name__ == '__main__':
    js = getrunesSubTree()
    #js = dict(sorted(js.items()))
    #for i in js.items():
    #    print(i)
    pprint(js)

