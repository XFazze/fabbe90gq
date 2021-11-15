import requests
import json

CLIENT_ID = "d3a17cc496724a538a7b2af6024b0a26"                  # I den tomma strängen skriver du in ditt CLIENT_ID
CLIENT_SECRET = "6f3ad3a17cc496724a538a7b2af6024b0a262f416e4e4cbc8eff1ddd94be94b1"    # I den tomma strängen skriver du in ditt CLIENT_SECRET
AUTH_URL = 'https://accounts.spotify.com/api/token' # Endpoint för att komma åt användar-token

# Nedan använder vi metoden POST från modulen requests. 
# Metoden POST tar två argument; en endpoint (AUTH_URL) och en dictionary 
# som innehåller tre nycklar (key). Metoden returnerar objektet auth_response
auth_response = requests.post(AUTH_URL, {
    'grant_type': 'client_credentials',
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
})

# Vi använder oss nu av metoden json() för att omvandla objektet auth_response #till en dictionary
auth_response_data = auth_response.json()

# Den token vi behöver för vidare användning av Spotify-API:et hittar vi i 
# nyckeln access-token
access_token = auth_response_data['access_token']

# Alla endpoints till Spotifys API börjar med följande basadress
BASE_URL = 'https://api.spotify.com/v1/'

# I varje sökning på Spotifys API är ett av argumentet en dictionary med 
# nyckeln ‘Authorization’ enligt definitionen nedan
headers = { 'Authorization': f'Bearer {access_token}'}

artist_to_search = 'Queen' # Artisten vi vill söka upp

# Requests-metoden GET används nedan för att få information om en artist. 
# GET tar tre argument: en endpoint_URL (BASE_URL), argumentet headers som är
# en dictionary med användarbehörigheter och ett argument params som innehåller
# information om vad vill fråga endpointen
artist = requests.get(BASE_URL + 'search', 
                 headers=headers, 
                 params = {'q':artist_to_search, 'type':'artist', 'limit':3, 'offset':0})

# Objektet ‘artist’ omvandlas nu till en dictionary med metoden json()
artist_data = artist.json()

# Dictionaryn kan skrivas ut med snygga indrag genom att använda json-metoden dumps
print(json.dumps(artist.json(), indent=2))