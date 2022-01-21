//TODO load 10 recent matches
//TODO scroll/click to load more
//TODO select what date it should load
var ajaxSettings;
var matchTracking, matchTrackingIndex;
$(document).ready(function () {
  recentDataStart();
  $GAME_VERSION = '12.1.1';
});

async function recentDataStart() {
  matchTracking = await getMatchHistory();
  $(`.${summoner['puuid']}`).css('float', 'left');
  await loadTen(matchTracking['matches'].splice(0, 10));
  matchTrackingIndex = 10;
}

$(function () {
  $('#load10more').bind('click', function () {
    //FIXME some matches on the same day might be wrong order
    loadTen(
      matchTracking['matches'].splice(
        matchTrackingIndex,
        matchTrackingIndex + 10
      )
    );
    matchTrackingIndex += 10;
  });
});

async function getMatchHistory() {
  ajaxSettings = {
    type: 'GET',
    data: {
      puuid: summoner['puuid'],
    },
    url: $SCRIPT_ROOT + 'newMatchHistory',
    cache: false,
    async: false,
    tryCount: 0,
    retryLimit: 10,
  };
  return await ajaxRetry(ajaxSettings, 1000);
}

async function loadTen(matches) {
  matches.forEach(async (matchId) => {
    ajaxSettings = {
      type: 'GET',
      data: {
        id: matchId,
      },
      url: $SCRIPT_ROOT + 'newMatch',
      cache: false,
      async: false,
      tryCount: 0,
      retryLimit: 10,
    };
    var matchData = await ajaxRetry(ajaxSettings, 1000);
    var matchDiv = await createMatchDiv(matchData);
    $('#match_history').append(matchDiv);
  });
}

function createMatchDiv(match) {
  //console.log(match.info.participants, summoner['puuid'])
  let winClass, teamSide;

  let matchDiv = $('<div></div>').addClass('flex flex-row mb-3 ');
  let meta = $('<div></div>').addClass(
    'flex flex-col w-36 place-items-center justify-center'
  );
  let teamsDiv = $('<div></div>').addClass('flex gap-4');
  let objectives = $('<div></div>').addClass(
    'flex-row flex order-2 gap-4 hidden items-center objectivDiv'
  );

  let teams = {
    100: $('<div></div>').prepend(summoner).addClass(' block '),
    200: $('<div></div>').prepend(summoner).addClass(' block '),
  };

  let dateValue = new Date(match['info']['gameCreation']);

  let date = $(
    '<span>' +
      dateValue.getHours() +
      ':' +
      dateValue.getMinutes() +
      ' ' +
      dateValue.getDate() +
      '/' +
      (dateValue.getMonth() + 1) +
      '</span>'
  );
  let year = $(
    '<span class="hidden">-' +
      String(dateValue.getFullYear()).slice(-2) +
      '</span>'
  );
  let length = $(
    '<p>' + Math.floor(match['info']['gameDuration'] / 6) / 10 + ' m</p>'
  );
  let queueId = $(
    `<p>${queueIdConverter[match['info']['queueId']]}:${
      match['metadata']['averageRank']['tier']
    } ${match['metadata']['averageRank']['division']}</p>`
  );
  meta.prepend([length, date, year, queueId]);

  let teamsPlayers = { 100: '', 200: '' };
  var totalKills = {
    100: match['info']['teams'][0]['objectives']['champion']['kills'],
    200: match['info']['teams'][1]['objectives']['champion']['kills'],
  };
  var userPos;
  let goldMatchups = {
    TOP: { 100: 0, 200: 0 },
    JUNGLE: { 100: 0, 200: 0 },
    MIDDLE: { 100: 0, 200: 0 },
    BOTTOM: { 100: 0, 200: 0 },
    UTILITY: { 100: 0, 200: 0 },
  };
  match['info']['participants'].forEach((player) => {
    teamsPlayers[player['teamId']] =
      teamsPlayers[player['teamId']] + ' ' + player['puuid'];
    goldMatchups[player['teamPosition']][player['teamId']] =
      player['goldEarned'];
    if (player['puuid'] != summoner['puuid']) {
      return;
    }
    userPos = player['teamPosition'];
    teams[player['teamId']].addClass('order-1 bg-gray-400 flex flex-col');
    teams[Math.abs(player['teamId'] - 300)].addClass(
      'order-3 bg-gray-400 flex flex-col'
    );

    if (player.win) {
      meta.addClass('bg-blue-500');
    } else {
      meta.addClass('bg-red-400');
    }
  });
  var teamgold = getGold(goldMatchups);
  let teamsObjectives100 = $(`<div>
        <p class='h-8'>${
          match['info']['teams'][0]['objectives']['champion']['kills']
        }</p>
        <p class='h-8'>${
          match['info']['teams'][0]['objectives']['dragon']['kills']
        }</p>
        <p class='h-8'>${
          match['info']['teams'][0]['objectives']['baron']['kills']
        }</p>
        <p class='h-8'>${
          match['info']['teams'][0]['objectives']['riftHerald']['kills']
        }</p>
        <p class='h-8'>${
          match['info']['teams'][0]['objectives']['tower']['kills']
        }</p>
        <p class='h-8'>${
          match['info']['teams'][0]['objectives']['inhibitor']['kills']
        }</p>
        <p class='h-8'>${Math.floor(teamgold.team100 / 1000)}k</p>
        </div>`).addClass(' xl:flex flex-col teamsObjectives100');

  let teamsObjectives200 = $(`<div>
        <p class='h-8'>${
          match['info']['teams'][1]['objectives']['champion']['kills']
        }</p>
        <p class='h-8'>${
          match['info']['teams'][1]['objectives']['dragon']['kills']
        }</p>
        <p class='h-8'>${
          match['info']['teams'][1]['objectives']['baron']['kills']
        }</p>
        <p class='h-8'>${
          match['info']['teams'][1]['objectives']['riftHerald']['kills']
        }</p>
        <p class='h-8'>${
          match['info']['teams'][1]['objectives']['tower']['kills']
        }</p>
        <p class='h-8'>${
          match['info']['teams'][1]['objectives']['inhibitor']['kills']
        }</p>
        <p class='h-8'>${Math.floor(teamgold.team200 / 1000)}k</p>
        </div>`).addClass(' xl:flex flex-col teamsObjectives200');
  // TODO make these go to the raw cdragon
  let teamsObjectivesMiddle = $(`<div>
        <img src="https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-postgame/global/default/mask-icon-offense.png" class='h-8 w-8'>
        <img src="/static/pics/objectives/drake.png" class='h-8 w-8'>
        <img src="/static/pics/objectives/baron.png" class='h-8 w-8'>
        <img src="/static/pics/objectives/riftherald.png" class='h-8 w-8'>
        <img src="/static/pics/objectives/tower.png" class='h-8 w-8'>
        <img src="/static/pics/objectives/inhib.png" class='h-8 w-8'>
        <img src="https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-postgame/global/default/mask-icon-gold.png" class='h-8 w-8'>
    
        </div>`).addClass('flex flex-col xl:flex teamsObjectivesMiddle');
  objectives.prepend([
    teamsObjectives100,
    teamsObjectivesMiddle,
    teamsObjectives200,
  ]);

  match['info']['participants'].forEach((player) => {
    //console.log(player)
    let username = $(`<div><p>${player['summonerName']}</p></div>`).addClass(
      'w-fit text-clip '
    );
    let rank = $(`<P>${player['rank']} | ${player['summonerLevel']} lvl</p>`);
    let summonerDiv = $(`<div></div>`)
      .prepend([username, rank])
      .addClass(
        'w-36 truncate items-center place-items-center flex flex-col flex-nonwrap '
      );
    let teamPositionToImg = {
      TOP: 'rankposition_gold-top',
      JUNGLE: 'rankposition_gold-jungle',
      MIDDLE: 'rankposition_gold-mid',
      BOTTOM: 'rankposition_gold-bot',
      UTILITY: 'rankposition_gold-support',
    };
    let lane = $(
      `<div><img src='https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/ranked/positions/${
        teamPositionToImg[player['teamPosition']]
      }.png' class='w-10 pr-2'></div>`
    ).addClass('relative flex place-items-center lanesIMG');

    let champ = $(
      `<img src='http://ddragon.leagueoflegends.com/cdn/${$GAME_VERSION}/img/champion/${player['championName']}.png' ></img>`
    ).addClass('w-12 ');
    let champlvl = $(
      `<div><div class='bg-gray-300 opacity-90 leading-4'>${player['champLevel']}</div></div>`
    ).addClass('absolute  top-11 z-1');
    let champDiv = $(`<div></div>`)
      .prepend([champ, champlvl])
      .addClass('relative flex place-items-center');

    let sum1 = $(
      `<img src="http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/${
        summonerIdToName[player['summoner1Id']]
      }" class='w-6'></img>`
    );
    let sum2 = $(
      `<img src="http://ddragon.leagueoflegends.com/cdn/8.11.1/img/spell/${
        summonerIdToName[player['summoner2Id']]
      }" class='w-6 '></img>`
    );
    let sums = $(`<div></div>`)
      .prepend([sum1, sum2])
      .addClass('relative flex-col flex place-items-center self-center ');

    let runePath =
      'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/';
    let keystone = $(
      `<img src="${runePath}${
        runeIdToPath[player['perks']['styles'][0]['selections'][0]['perk']]
      }" class='w-6 max-w-full'></img>`
    );
    let secondTreeLogo = $(
      `<img src="${runePath}${
        runeStyleIdToPath[player['perks']['styles'][1]['style']]
      }" class='w-6 max-w-full'></img>`
    );
    let easyRunes = $('<div></div>')
      .prepend([keystone, secondTreeLogo])
      .addClass('bg-gray-700');
    let primaryTree = $(`<div>
        <img src='${runePath}${
      runeIdToPath[player['perks']['styles'][0]['selections'][1]['perk']]
    }' class='w-6 max-w-full'></img>
        <img src='${runePath}${
      runeIdToPath[player['perks']['styles'][0]['selections'][2]['perk']]
    }' class='w-6 max-w-full'></img>
        <img src='${runePath}${
      runeIdToPath[player['perks']['styles'][0]['selections'][3]['perk']]
    }') class='w-6 max-w-full'></img>
        </div>`).addClass('flex flex-row max-w-full');

    let secondTree = $(`<div>
        <img src='${runePath}${
      runeIdToPath[player['perks']['styles'][1]['selections'][0]['perk']]
    }' class='w-6 max-w-full'></img>
        <img src='${runePath}${
      runeIdToPath[player['perks']['styles'][1]['selections'][1]['perk']]
    }' class='w-6 max-w-full'></img>
        </div>`).addClass('flex flex-row max-w-full');

    let statTree = $(`<div>
        <img src='${runePath}${
      runeIdToPath[player['perks']['statPerks']['offense']]
    }' class='w-6 '></img>
        <img src='${runePath}${
      runeIdToPath[player['perks']['statPerks']['flex']]
    }' class='w-6 '></img>
        <img src='${runePath}${
      runeIdToPath[player['perks']['statPerks']['defense']]
    }' class='w-6 '></img>
        </div>`).addClass('flex flex-row max-w-full');
    let fullTree = $(`<div></div>`)
      .prepend([primaryTree, secondTree, statTree])
      .addClass(
        ' max-w-full flex-col absolute bg-black group-hover:opacity-100 opacity-0 z-20 '
      );
    let runes = $(`<div></div>`)
      .prepend([easyRunes, fullTree])
      .addClass(
        'items-center place-items-center flex flex-row flex-nonwrap group '
      );

    let itemsValue = [
      player['item0'],
      player['item1'],
      player['item2'],
      player['item3'],
      player['item4'],
      player['item5'],
    ];
    itemsValue = itemsValue.sort().reverse();
    let itemPath = 'http://ddragon.leagueoflegends.com/cdn/12.1.1/img/item/';
    for (let index = 0; index < itemsValue.length; index++) {
      if (itemsValue[index] == 0) {
        itemsValue[index] = '/static/pics/transparent';
      } else {
        itemsValue[index] = itemPath + itemsValue[index];
      }
    }

    let itemsTop = $(`<div>
        <img src='${itemsValue[0]}.png' class='w-6 '></img>
        <img src='${itemsValue[1]}.png' class='w-6 '></img>
        <img src='${itemsValue[2]}.png' class='w-6 '></img>
        </div>`).addClass('flex flex-row');
    let itemsBot = $(`<div>
        <img src='${itemsValue[3]}.png' class='w-6 '></img>
        <img src='${itemsValue[4]}.png' class='w-6 '></img>
        <img src='${itemsValue[5]}.png' class='w-6 '></img>
        </div>`).addClass('flex flex-row  ');
    let itemsWard = $(`<div>
        <img src='${itemPath}${player['item6']}.png' class='w-6 '></img>
        </div>`).addClass('flex flex-row ');

    let items = $('<div></div>')
      .prepend([itemsTop, itemsBot])
      .addClass('flex flex-col ');
    let itemsAll = $('<div></div>')
      .prepend([items, itemsWard])
      .addClass('flex flex-row items-center place-items-center flex-nonwrap ');

    let killsDeathAssists = $(
      `<p>${player['kills']}/${player['deaths']}/${player['assists']}</p>`
    );
    let kda;
    if (player['deaths'] == 0) {
      kda = $(`<p >Nice</p>`);
    } else {
      kda = $(
        `<p>${
          Math.floor(
            (10 * (player['kills'] + player['assists'])) / player['deaths']
          ) / 10
        }(${Math.floor(
          (100 * (player['kills'] + player['assists'])) /
            totalKills[player['teamId']]
        )}%)</p>`
      );
    }
    let killsHelp = $(
      `<div style="color:white"><p>kills/deaths/assists</p><p>kda </p> <p> kill participation</p></div>`
    ).addClass(
      'group-hover:opacity-100 opacity-0  z-10 bg-gray-500 text-my-color decoration-white text-center absolute'
    );
    let kills = $(`<div></div>`)
      .prepend([killsDeathAssists, kda])
      .addClass(
        'w-20 items-center place-items-center flex flex-col flex-nonwrap group'
      );

    let visionScore = $(
      `<p>${player['visionScore']}(${player['visionWardsBoughtInGame']}/${player['wardsKilled']}/${player['wardsPlaced']})</p>`
    ).addClass('whitespace-nowrap');
    let cs = $(
      `<p>${player['totalMinionsKilled']}(${
        Math.floor(
          (10 * player['totalMinionsKilled']) /
            (Math.floor(match['info']['gameDuration'] / 6) / 10)
        ) / 10
      })</p>`
    );
    let goldDiff = $(
      `<p>${
        Math.floor(
          (player['goldEarned'] -
            goldMatchups[player['teamPosition']][
              Math.abs(player['teamId'] - 300)
            ]) /
            100
        ) / 10
      }k</p>`
    );
    let randomHelp = $(`<div style="color:white">
        <p>vision score(control wards/wards killed/wards placed)</p>
        <p>cs(cs/min)</p> 
        <p>matchup gold difference</p>
        </div>`).addClass(
      'group-hover:opacity-100 opacity-0 bg-gray-500 text-my-color decoration-white text-center absolute'
    );
    let random = $(`<div></div>`)
      .prepend([visionScore, cs, goldDiff])
      .addClass(
        'w-28 items-center place-items-center  flex-col group  2xl:flex random'
      );

    //FIXME objective damage isnt working
    let damage = $(
      `<p>${Math.floor(player['totalDamageDealtToChampions'] / 1000)}k/${
        Math.floor(player['damageDealtToBuildings'] / 100) / 10
      }k/${Math.floor(
        player['damageDealtToObjectives'] - player['damageDealtToObjectives']
      )}</p>`
    ); // champions/buildings/objectives
    let heal = $(
      `<p>${
        Math.floor(
          (player['totalHeal'] - player['totalHealsOnTeammates']) / 100
        ) / 10
      }k/${player['totalHealsOnTeammates']}/${
        player['totalHealsOnTeammates']
      }</p>`
    ); //     selfheal/teamheal/shield
    let cc = $(`<p>${player['totalTimeCCDealt']}s</p>`); //     cc
    let damageDiv = $(`<div></div>`)
      .prepend([damage, heal, cc])
      .addClass(
        'w-44 items-center place-items-center flex-col group  xl:flex damageDiv'
      );

    let playerDiv = $('<div></div>')
      .prepend([
        summonerDiv,
        lane,
        champDiv,
        sums,
        runes,
        itemsAll,
        kills,
        damageDiv,
        random,
      ])
      .addClass(' flex playerDiv hidden ' + player['puuid']);
    if (player['puuid'] == summoner['puuid']) {
      playerDiv.removeClass('hidden');
      playerDiv.addClass('bg-gray-300');
    }
    if (player['teamPosition'] == userPos) {
      playerDiv.addClass('matchup' + summoner['puuid']);
    }
    if (player['teamPosition'] == 'TOP') {
      playerDiv.addClass('order-1 ');
    } else if (player['teamPosition'] == 'JUNGLE') {
      playerDiv.addClass('order-2');
    } else if (player['teamPosition'] == 'MIDDLE') {
      playerDiv.addClass('order-3');
    } else if (player['teamPosition'] == 'BOTTOM') {
      playerDiv.addClass('order-4');
    } else if (player['teamPosition'] == 'UTILITY') {
      playerDiv.addClass('order-5');
    }
    teams[player['teamId']].append(playerDiv);
  });
  teamsDiv.prepend(teams['100'], objectives, teams['200']);
  matchDiv.append(meta);
  matchDiv.append(teamsDiv);
  return matchDiv;
}

function getGold(team) {
  let team100 = 0;
  let team200 = 0;
  for (const [key, value] of Object.entries(team)) {
    team100 += value['100'];
    team200 += value['200'];
  }
  return { team100, team200 };
}
summonerIdToName = {
  1: 'SummonerBoost.png',
  11: 'SummonerSmite.png',
  12: 'SummonerTeleport.png',
  13: 'SummonerMana.png',
  14: 'SummonerDot.png',
  21: 'SummonerBarrier.png',
  3: 'SummonerExhaust.png',
  30: 'SummonerPoroRecall.png',
  31: 'SummonerPoroThrow.png',
  32: 'SummonerSnowball.png',
  39: 'SummonerSnowURFSnowball_Mark.png',
  4: 'SummonerFlash.png',
  54: 'Summoner_UltBookPlaceholder.png',
  55: 'Summoner_UltBookSmitePlaceholder.png',
  6: 'SummonerHaste.png',
  7: 'SummonerHeal.png',
};
runeIdToPath = {
  8369: '/perk-images/styles/inspiration/firststrike/firststrike.png',
  8446: '/perk-images/styles/resolve/demolish/demolish.png',
  8126: '/perk-images/styles/domination/cheapshot/cheapshot.png',
  8321: '/perk-images/styles/inspiration/futuresmarket/futuresmarket.png',
  8415: '/perk-images/styles/runesicon.png',
  8410: '/perk-images/styles/resolve/approachvelocity/approachvelocity.png',
  8135: '/perk-images/styles/domination/ravenoushunter/ravenoushunter.png',
  8232: '/perk-images/styles/sorcery/waterwalking/waterwalking.png',
  8299: '/perk-images/styles/sorcery/laststand/laststand.png',
  8112: '/perk-images/styles/domination/electrocute/electrocute.png',
  8234: '/perk-images/styles/sorcery/celerity/celeritytemp.png',
  8453: '/perk-images/styles/resolve/revitalize/revitalize.png',
  8360: '/perk-images/styles/inspiration/unsealedspellbook/unsealedspellbook.png',
  8004: '/perk-images/styles/runesicon.png',
  8128: '/perk-images/styles/domination/darkharvest/darkharvest.png',
  8220: '/perk-images/styles/runesicon.png',
  8016: '/perk-images/styles/runesicon.png',
  8473: '/perk-images/styles/resolve/boneplating/boneplating.png',
  8339: '/perk-images/styles/inspiration/celestialbody/celestialbody.png',
  8214: '/perk-images/styles/sorcery/summonaery/summonaery.png',
  8237: '/perk-images/styles/sorcery/scorch/scorch.png',
  8139: '/perk-images/styles/domination/tasteofblood/greenterror_tasteofblood.png',
  8008: '/perk-images/styles/precision/lethaltempo/lethaltempotemp.png',
  9105: '/perk-images/styles/precision/legendtenacity/legendtenacity.png',
  8010: '/perk-images/styles/precision/conqueror/conqueror.png',
  8106: '/perk-images/styles/domination/ultimatehunter/ultimatehunter.png',
  8017: '/perk-images/styles/precision/cutdown/cutdown.png',
  8224: '/perk-images/styles/sorcery/nullifyingorb/pokeshield.png',
  8210: '/perk-images/styles/sorcery/transcendence/transcendence.png',
  8005: '/perk-images/styles/precision/presstheattack/presstheattack.png',
  8435: '/perk-images/styles/resolve/mirrorshell/mirrorshell.png',
  8115: '/perk-images/styles/runesicon.png',
  8359: '/perk-images/styles/inspiration/kleptomancy/kleptomancy.png',
  8352: '/perk-images/styles/inspiration/timewarptonic/timewarptonic.png',
  5003: '/perk-images/statmods/statmodsmagicresicon.png',
  8120: '/perk-images/styles/domination/ghostporo/ghostporo.png',
  8134: '/perk-images/styles/domination/ingenioushunter/ingenioushunter.png',
  8351: '/perk-images/styles/inspiration/glacialaugment/glacialaugment.png',
  8242: '/perk-images/styles/sorcery/unflinching/unflinching.png',
  8401: '/perk-images/styles/resolve/mirrorshell/mirrorshell.png',
  9111: '/perk-images/styles/precision/triumph.png',
  8105: '/perk-images/styles/domination/relentlesshunter/relentlesshunter.png',
  8454: '/perk-images/styles/runesicon.png',
  8275: '/perk-images/styles/sorcery/nimbuscloak/6361.png',
  8207: '/perk-images/styles/runesicon.png',
  8439: '/perk-images/styles/resolve/veteranaftershock/veteranaftershock.png',
  8109: '/perk-images/styles/runesicon.png',
  5002: '/perk-images/statmods/statmodsarmoricon.png',
  8414: '/perk-images/styles/runesicon.png',
  5008: '/perk-images/statmods/statmodsadaptiveforceicon.png',
  8320: '/perk-images/styles/runesicon.png',
  8319: '/perk-images/styles/runesicon.png',
  5001: '/perk-images/statmods/statmodshealthscalingicon.png',
  8430: '/perk-images/styles/resolve/ironskin/ironskin.png',
  8014: '/perk-images/styles/precision/coupdegrace/coupdegrace.png',
  5007: '/perk-images/statmods/statmodscdrscalingicon.png',
  8021: '/perk-images/styles/precision/fleetfootwork/fleetfootwork.png',
  8226: '/perk-images/styles/sorcery/manaflowband/manaflowband.png',
  8451: '/perk-images/styles/resolve/overgrowth/overgrowth.png',
  8313: '/perk-images/styles/inspiration/perfecttiming/perfecttiming.png',
  9103: '/perk-images/styles/precision/legendbloodline/legendbloodline.png',
  8114: '/perk-images/styles/runesicon.png',
  8230: '/perk-images/styles/sorcery/phaserush/phaserush.png',
  8318: '/perk-images/styles/runesicon.png',
  8316: '/perk-images/styles/inspiration/miniondematerializer/miniondematerializer.png',
  8463: '/perk-images/styles/resolve/fontoflife/fontoflife.png',
  7000: '/perk-images/template/7000.png',
  8304: '/perk-images/styles/inspiration/magicalfootwear/magicalfootwear.png',
  8236: '/perk-images/styles/sorcery/gatheringstorm/gatheringstorm.png',
  8009: '/perk-images/styles/precision/presenceofmind/presenceofmind.png',
  8006: '/perk-images/styles/runesicon.png',
  9104: '/perk-images/styles/precision/legendalacrity/legendalacrity.png',
  8416: '/perk-images/styles/runesicon.png',
  5005: '/perk-images/statmods/statmodsattackspeedicon.png',
  8306: '/perk-images/styles/inspiration/hextechflashtraption/hextechflashtraption.png',
  8465: '/perk-images/styles/resolve/guardian/guardian.png',
  8138: '/perk-images/styles/domination/eyeballcollection/eyeballcollection.png',
  8127: '/perk-images/styles/runesicon.png',
  8143: '/perk-images/styles/domination/suddenimpact/suddenimpact.png',
  8345: '/perk-images/styles/inspiration/biscuitdelivery/biscuitdelivery.png',
  8444: '/perk-images/styles/resolve/secondwind/secondwind.png',
  8205: '/perk-images/styles/runesicon.png',
  8437: '/perk-images/styles/resolve/graspoftheundying/graspoftheundying.png',
  9923: '/perk-images/styles/domination/hailofblades/hailofblades.png',
  8429: '/perk-images/styles/resolve/conditioning/conditioning.png',
  8124: '/perk-images/styles/domination/predator/predator.png',
  8233: '/perk-images/styles/sorcery/absolutefocus/absolutefocus.png',
  8007: '/perk-images/styles/runesicon.png',
  8136: '/perk-images/styles/domination/zombieward/zombieward.png',
  8358: '/perk-images/styles/inspiration/masterkey/masterkey.png',
  8208: '/perk-images/styles/runesicon.png',
  8347: '/perk-images/styles/inspiration/cosmicinsight/cosmicinsight.png',
  8472: '/perk-images/styles/resolve/chrysalis/chrysalis.png',
  8229: '/perk-images/styles/sorcery/arcanecomet/arcanecomet.png',
  8344: '/perk-images/styles/runesicon.png',
  9101: '/perk-images/styles/precision/overheal.png',
};
runeStyleIdToPath = {
  8000: 'perk-images/styles/7201_precision.png',
  8100: 'perk-images/styles/7200_domination.png',
  8200: 'perk-images/styles/7202_sorcery.png',
  8300: 'perk-images/styles/7203_whimsy.png',
  8400: 'perk-images/styles/7204_resolve.png',
};
teamPositionToPath = {
  TOP: '/static/pics/roles/TOP',
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
