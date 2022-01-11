import requests
regionConverter2 = {
    "eun1" : "eune", 
    "euw1" : "eune",
    "BR1" :  "na",
    "JP1" : "kr",
    "KR" : "kr",
    "LA1" : "na",
    "LA2" : "na",
    "NA1" : "na",
    "OC1" : "na",
    "RU" : "eune",
    "TR1" : "euw"
}
def get_mmrs(region, username):
    #requests.adapters.DEFAULT_RETRIES = 1
    print( regionConverter2[region], username)
    url = 'https://' + regionConverter2[region] + '.whatismymmr.com/api/v1/summoner?name=' + username
    print(url)
    headers = {
        'User-Agent': 'debian:fabbe90.gq:v0.0.1'
        }
    response = requests.get(url, headers=headers).json()

    if 'error' in response.keys():
        res =  {
            'soloq' : {'elo': False},
            'normals' : {'elo': False},
            'aram' : {'elo': False}
        }
    else:
        res = {
            'soloq': {'elo': response['ranked']['avg'],
                    'err' : response['ranked']['err'],
                    'closestRank' : response['ranked']['closestRank'],
                    'percentile' : response['ranked']['percentile'],
            },
            'normals': {'elo': response['normal']['avg'],
                    'err' : response['normal']['err'],
                    'closestRank' : response['normal']['closestRank'],
                    'percentile' : response['normal']['percentile'],
            },
            'aram': {'elo': response['ARAM']['avg'],
                    'err' : response['ARAM']['err'],
                    'closestRank' : response['ARAM']['closestRank'],
                    'percentile' : response['ARAM']['percentile'],
            },
        }
    return res



if __name__ == '__main__':
    print(get_mmrs('eun1', 'kuuro'))