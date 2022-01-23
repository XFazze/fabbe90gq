import requests
regionConverter2 = {
    "eun1" : "eune",
    "euw1" : "eune",
    "br1" :  "na",
    "jp1" : "kr",
    "kr" : "kr",
    "la1" : "na",
    "la2" : "na",
    "na1" : "na",
    "oc1" : "na",
    "ru" : "eune",
    "tr1" : "euw"
}
def get_mmrs(region, username):
    #requests.adapters.DEFAULT_RETRIES = 1
    #print( regionConverter2[region], username)
    url = 'https://' + regionConverter2[region] + '.whatismymmr.com/api/v1/summoner?name=' + username
    #print('mmr url', url)
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
        if response['ranked']['percentile'] > 50:
            soloqresp = 'top'
        else:
            soloqresp = 'bottom'
        if response['normal']['percentile'] > 50:
            normalresp = 'top'
        else:
            normalresp = 'bottom'
        if response['ARAM']['percentile'] > 50:
            aramresp = 'top'
        else:
            aramresp = 'bottom'
            
        res = {
            'soloq': {'elo': response['ranked']['avg'],
                    'err' : response['ranked']['err'],
                    'closestRank' : response['ranked']['closestRank'],
                    'percentile' : soloqresp,
            },
            'normals': {'elo': response['normal']['avg'],
                    'err' : response['normal']['err'],
                    'closestRank' : response['normal']['closestRank'],
                    'percentile' : normalresp,
            },
            'aram': {'elo': response['ARAM']['avg'],
                    'err' : response['ARAM']['err'],
                    'closestRank' : response['ARAM']['closestRank'],
                    'percentile' : aramresp,
            },
        }
    return res



if __name__ == '__main__':
    print(get_mmrs('eun1', 'kuuro'))