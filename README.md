# Fabbe90.gq

Website developed by Fabian.

- Bjornbanan(discordbot) commands + invite
- Lb2000 league of legends stat site

## Deployment

### Setup
## requirements
* apache2 
* WSGIDaemonProcess

1. copy config file
2. add ssl key and pem
3. change linux user in config and wsgi file
4. enable config

## start devepment mode 
This will start mongod and tailwind jit compiling in the background

## start mongod and tailwindcss watch 
```
npm run dev
```

## start flask server
```
python3 mainscript.py
```

## Config.py file
riotApiKey

secretKey - Import os and os.urandom(12).hex()

spotifyId
spotifySecret 
spotifyRedirectUri
