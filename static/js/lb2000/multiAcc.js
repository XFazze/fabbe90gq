import Cookies from '/static/js.cookie.mjs';

//$(document).ready(function () {
//multiAcc();
//});

$(function () {
  $('#multiAccVerify').bind('click', async function () {
    var browserId = Cookies.get('browserId');
    if (!browserId) {
      browserId = makeid(30);
      console.log('creaing new browserId', browserId);
      Cookies.set('browserId', browserId);
    }
    console.log('edistsing browserId', browserId);
    await verifyCheck(browserId);
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
    url: $SCRIPT_ROOT + 'verify',
    cache: false,
    async: false,
    tryCount: 0,
    retryLimit: 10,
  };
  try {
    return await $.ajax(ajaxSettings);
  } catch (e) {
    console.log('verify failed', e.responseText);
  }
}

async function multiAcc() {
  var accs = await getMultiAccounts();
  console.log(accs);
}
async function getMultiAccounts() {
  ajaxSettings = {
    type: 'GET',
    data: {
      puuid: summoner['puuid'],
      region: region,
    },
    url: $SCRIPT_ROOT + 'multiAcc',
    cache: false,
    async: false,
    tryCount: 0,
    retryLimit: 10,
  };
  return await ajaxRetry(ajaxSettings);
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
