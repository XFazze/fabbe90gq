$(document).ready(function () {
  start();
  $GAME_VERSION = '12.1.1';
});
timeFrames = ['24h', '3d', '7d', '30d', 'lifetime'];

async function start() {
  data = await getRecentData(summoner['puuid']);
  let queueIdRecent = ['420', '450', 'total'];
  queueIdRecent.forEach((qId) => {
    let table = $(`<table></table>`).addClass('hidden dt' + qId);
    timeFrames.forEach((time) => {
      table.append(createTableRecentData(data[qId][time], time));
    });
    $('#recentDataTables').append(table);
  });
  $('.dt420').removeClass('hidden');
}

//buttons
$(function () {
  $('#soloduoRecentData').bind('click', function () {
    $('.recentDataButtons').children().removeClass('bg-gray-600');
    $('#soloduoRecentData').addClass('bg-gray-600');

    $('#recentDataTables').children().addClass('hidden');
    $('.dt420').removeClass('hidden');
  });
});

$(function () {
  $('#aramRecentData').bind('click', function () {
    $('.recentDataButtons').children().removeClass('bg-gray-600');
    $('#aramRecentData').addClass('bg-gray-600');

    $('#recentDataTables').children().addClass('hidden');
    $('.dt450').removeClass('hidden');
  });
});

$(function () {
  $('#recentDataAll').bind('click', function () {
    $('.recentDataButtons').children().removeClass('bg-gray-600');
    $('#recentDataAll').addClass('bg-gray-600');

    $('#recentDataTables').children().addClass('hidden');
    $('.dttotal').removeClass('hidden');
  });
});

async function getRecentData(puuid) {
  ajaxSetting = {
    type: 'GET',
    data: {
      puuid: puuid,
    },
    url: $SCRIPT_ROOT + 'recentData',
    cache: false,
    async: false,
    tryCount: 0,
    retryLimit: 10,
  };
  return await ajaxRetry(ajaxSetting);
}

function createTableRecentData(value, key) {
  if (value['total'] == 0) {
    return $(`<tr>
        <th class='w-24'>
            ${key}
        </th>
        <th class='w-18'>
            NO
        </th>
        <th class='w-18'>
            MATCHES
        </th>
        </tr>`);
  } else {
    return $(`<tr>
    <th class='w-24'>
        ${key}
        </th>
        <th class='w-14'>
            ${Math.floor((1000 * value['wins']) / value['total']) / 10}%
        </th>
        <th class='w-14'>
            ${value['wins']}/${value['losses']}
        </th>
        </tr>`);
  }
}
