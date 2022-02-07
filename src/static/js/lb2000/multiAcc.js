import Cookies from '/static/js.cookie.mjs';

$(document).ready(function () {
  multiAcc();
  multiAccChanges();
});

$(function () {
  $('#multiAccVerify').bind('click', async function () {
    var browserId = Cookies.get('browserId');
    if (!browserId) {
      browserId = makeid(30);
      console.log('creaing new browserId', browserId);
      Cookies.set('browserId', browserId);
    }
    console.log('edistsing browserId', browserId);
    let resp = await verifyCheck(browserId);
    console.log('Multiacc: ', resp);
    if (resp == 'successful') {
      $('#multiAccResp').html(`<div>
      <p>Success, account added</p>
      <p>Go to other profiles and do the same</p>
      </div>`);
      $('#multiAccResp').removeClass('hidden');
    } else {
      $('#multiAccResp').html(`<div>
      <p>Failed, error:</p>
        <p >${resp}</p>
        </div>`);
      $('#multiAccResp').removeClass('hidden');
    }
  });
});

async function verifyCheck(browserId) {
  ajaxSettings = {
    type: 'GET',
    data: {
      puuid: summoner['puuid'],
      region: region,
      browserId: browserId,
    },
    url: $SCRIPT_ROOT + 'multiAcc/verify',
    cache: false,
    async: false,
    tryCount: 0,
    retryLimit: 10,
  };
  try {
    return await $.ajax(ajaxSettings);
  } catch (e) {
    console.log('verify failed', e.responseText);
    return e.responseText;
  }
}

async function multiAcc() {
  var accs = await getMultiAccounts();
  accs = accs['data'];
  if (accs) {
    accs.forEach(async (user) => {
      var user = await createMultiAccDiv(user);
      $('#DivlinkAccount').append(user);
    });
  } else {
    $('#DivlinkAccount').text('There were no linked accounts');
  }
}
async function getMultiAccounts() {
  ajaxSettings = {
    type: 'GET',
    data: {
      puuid: summoner['puuid'],
    },
    url: $SCRIPT_ROOT + 'multiAcc/find',
    cache: false,
    async: false,
  };
  return await ajaxRetry(ajaxSettings);
}
async function createMultiAccDiv(user) {
  let player = $('<div></div>').addClass('flex  p-4');
  let pfp = $(
    `<img src="https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${user['profileIconId']}.png"></img>`
  ).addClass('w-24');
  let link = $(
    `<a href='${$SCRIPT_ROOT}${user['region']}/${user['name']}'></a>`
  );
  let info = $(`<div></div>`).addClass('flex flex-col justify-center');
  let username = $(`<h2>${user['name']}</h2>`);
  let region = $(`<h2>${regionConverter4[user['region']]}</h2>`);
  let summonerLevel = $(`<h2>${user['summonerLevel']}</h2>`);
  info.prepend(username, region, summonerLevel);
  //console.log(username);
  player.prepend(pfp, info);
  link.prepend(player);
  return link;
}
function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
var regionConverter4 = {
  'eun1': 'EUNE',
  'euw1': 'EUW',
  'kr': 'KR',
  'na1': 'NA',
  'br1': 'BR',
  'la1': 'LAN',
  'la2': 'LAS',
  'oc1': 'OCE',
  'ru': 'RU',
  'tr1': 'TR',
  'jp1': 'JA',
};

async function multiAccChanges() {
  var changes = await getMultiAccChanges(summoner['puuid']);
  changes['pfps'].forEach((pfp) => {
    $('#profilePictureHistory').append(
      `<img class='mb-2' src="https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${pfp}.png">`
    );
  });
  changes['name'].forEach((name) => {
    $('#summonerNamesHistory').append(`<p class='mb-2'>${name}</p>`);
  });
  //console.log('s', changes);
}

async function getMultiAccChanges(summonerPuuid) {
  ajaxSettings = {
    type: 'GET',
    data: {
      puuid: summoner['puuid'],
    },
    url: $SCRIPT_ROOT + 'multiAcc/changes',
    cache: false,
    async: false,
  };
  return await ajaxRetry(ajaxSettings);
}
