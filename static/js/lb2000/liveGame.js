// live game
$(document).ready(function () {
    liveGameLoad();
  });
  
async function liveGameLoad() {
    var data = await getLiveGame();
    console.log('dlivegame', data)
    if(data['gameLength'] == 0){
        createNoLiveGame()
    }else{
        createLiveGame(data)

    }
}

async function getLiveGame() {
    ajaxSettings = {
      type: 'GET',
      data: {
        id: summoner['id'],
      },
      url: $SCRIPT_ROOT + 'liveGame',
      cache: false,
      async: false,
    };
    return await ajaxRetry(ajaxSettings);
  }
  
function createNoLiveGame(){
    console.log('no game data')
    var liveGameDiv = $(`<div class='w-full h-64 flex justify-center items-center'></div>`)
    liveGameDiv.append(`<h2>Not currently ingame</h2>`)
    $('#DivliveGame').html(liveGameDiv)
}

function createLiveGame(match){
    let matchDiv = $('<div></div>').addClass('flex flex-row mb-3 ');

    let meta = $('<div></div>').addClass(
      'flex flex-col w-36 place-items-center justify-center'
    );
    let teamsDiv = $('<div></div>').addClass('flex gap-4');
    let teams = {
      100: $('<div></div>').prepend(summoner).addClass(' block '),
      200: $('<div></div>').prepend(summoner).addClass(' block '),
    };
    let dateValue = new Date(match['gameStartTime']);
    let date = $(
      '<span>' +
        dateValue.getHours() +
        ':' +
        dateValue.getMinutes() +
        ' ' +
        dateValue.getDate() +
        '/' +
        (dateValue.getMonth() + 1) +
        '-' +
        String(dateValue.getFullYear()).slice(-2) +
        '</span>'
    );
    let length = $(
      '<p>' + Math.floor(match['gameLength'] / 6) / 10 + ' m</p>'
    );
    let queueId = $(
      `<p>${queueIdConverter[match['gameQueueConfigId']]}:${
        match['averageRank']['tier']
      } ${match['averageRank']['division']}</p>`
    );
    meta.prepend([length, date, queueId]);


    var userPos;
    let teamsPlayers = { 100: '', 200: '' };
    match['participants'].forEach((player) => {
      teamsPlayers[player['teamId']] =
        teamsPlayers[player['teamId']] + ' ' + player['id'];
      if (player['id'] != summoner['id']) {
        return;
      }
      teams[player['teamId']].addClass('order-1 bg-gray-400 flex flex-col');
      teams[Math.abs(player['teamId'] - 300)].addClass(
        'order-3 bg-gray-400 flex flex-col'
      );
  
    });




    match['participants'].forEach((player) => {
    //console.log(player)
    let username = $(`<div><p>${player['summonerName']}</p></div>`).addClass('w-fit text-clip ');
    let rank = $(`<P>${player['rank']} | ${player['summonerLevel']} lvl</p>`);
    let summonerDiv = $(`<div></div>`)
      .prepend([username, rank])
      .addClass(
        'w-36 truncate items-center place-items-center flex flex-col flex-nonwrap '
      );

    let champ = $(
      `<img src='http://ddragon.leagueoflegends.com/cdn/${$GAME_VERSION}/img/champion/${champIdToName[player['championId']]}.png' ></img>`
    ).addClass('w-12 ');
    let champDiv = $(`<div></div>`)
      .prepend([champ])
      .addClass('relative flex place-items-center');
    //FIXME in ultbook there is a sumonercalss named Summoner_UltBookPlaceholder.png and more
    let sum1 = $(
      `<img src="http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/${
        summonerIdToName[player['spell1Id']]
      }" class='w-6'></img>`
    );
    let sum2 = $(
      `<img src="http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/${
        summonerIdToName[player['spell2Id']]
      }" class='w-6 '></img>`
    );
    let sums = $(`<div></div>`)
      .prepend([sum1, sum2])
      .addClass('relative flex-col flex place-items-center self-center ');
      console.log(player['perks']['perkIds'][0], runeIdToPath[player['perks']['perkIds'][0]])
    let runePath =
      'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/';
    let primaryTree = $(`<div>
        <img src='${runePath}${
      runeIdToPath[player['perks']['perkIds'][0]]
    }' class='w-6 max-w-full'></img>
        <img src='${runePath}${
      runeIdToPath[player['perks']['perkIds'][1]]
    }' class='w-6 max-w-full'></img>
        <img src='${runePath}${
      runeIdToPath[player['perks']['perkIds'][2]]
    }') class='w-6 max-w-full'></img>
        </div>`).addClass('flex flex-row max-w-full');

    let secondTree = $(`<div>
        <img src='${runePath}${
      runeIdToPath[player['perks']['perkIds'][3]]
    }' class='w-6 max-w-full'></img>
        <img src='${runePath}${
      runeIdToPath[player['perks']['perkIds'][4]]
    }' class='w-6 max-w-full'></img>
    <img src='${runePath}${
        runeIdToPath[player['perks']['perkIds'][5]]
      }' class='w-6 max-w-full'></img>
        </div>`).addClass('flex flex-row max-w-full');

    let statTree = $(`<div>
        <img src='${runePath}${
      runeIdToPath[player['perks']['perkIds'][6]]
    }' class='w-4 '></img>
        <img src='${runePath}${
      runeIdToPath[player['perks']['perkIds'][7]]
    }' class='w-4 '></img>
        <img src='${runePath}${
      runeIdToPath[player['perks']['perkIds'][8]]
    }' class='w-4 '></img>
        </div>`).addClass('flex flex-col max-w-full');
    let fullTree = $(`<div></div>`)
      .prepend([primaryTree, secondTree])
      .addClass(
        ' max-w-full flex-col flex'
      );
    let runes = $(`<div></div>`)
      .prepend([fullTree, statTree])
      .addClass(
        'items-center place-items-center flex flex-row flex-nonwrap group bg-gray-800'
      );

    let playerDiv = $('<div></div>')
      .prepend([
        summonerDiv,
        champDiv,
        sums,
        runes,
      ])
      .addClass(' flex playerDiv p-2  ' + player['puuid']);
    if (player['id'] == summoner['id']) {
      playerDiv.removeClass('');
      playerDiv.addClass('bg-gray-300');
    }
    teams[player['teamId']].append(playerDiv);
  });
  teamsDiv.prepend(teams['100'], teams['200']);
  matchDiv.append(meta);
  matchDiv.append(teamsDiv);
matchDiv;


    $('#DivliveGame').html(matchDiv)
}