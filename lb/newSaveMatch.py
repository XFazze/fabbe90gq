from requests import get
from api_calls import *
from config import *
from pymongo import MongoClient


#TODO get what matches need download
#TODO 


'''
matchTrackingDoc = {

}

'''
def findMatches(puuid, region, riot_api_key):
    client = MongoClient('localhost', 27017)
    db = client.newMatches
    collection = db.matchTracking
    new100Matches = get_match_history(region, puuid, riot_api_key, 0, 100)
    users = collection.find({'puuid':puuid})
    if not users.count():
        print('new user')
        user = {
            'puuid' : puuid,
            'matchAmount' : 0,
            'matches' : []

        }
    else:
        user = list(users)[0]
        list(set(new100Matches)-set(user['matches']))



    return


def downloadMatches(puuid, riot_api_key):
    return

if __name__ == '__main__':
    findMatches('r8ShSO0Y7ADEG-nBNQwIVZ4S4cXx8AJxtTsCwyui2V34DMO4MYkXL-eyo7C4PDF8yGXH0PwVgOSnSQ', 'EUROPE', riot_api_key)