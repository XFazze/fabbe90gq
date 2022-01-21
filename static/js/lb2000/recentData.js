$(document).ready(function () {
  start();
});
timeFrames = ['24h', '3d', '7d', '30d', 'lifetime'];

async function start() {
  data = await getRecentData(summoner['puuid']);
  let queueIdRecent = ['420', '450', 'total'];
  $('#recentDataTables').html('');

  queueIdRecent.forEach((qId) => {
    let table = $(`<div></div>`).addClass(
      'hidden flex h-full flex-col  dt' + qId
    );
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
    return $(`<div class='flex flex-row h-full justify-center'>
        <p class='w-16'>
            ${key}
        </p>
        <p class='w-32'>
            NO MATCHES
        </p>
        </div>`).addClass('my-auto');
  } else {
    return $(`<div class='flex flex-row h-full justify-center'>
    <p class='w-16'>
        ${key}
        </p>
        <div class='w-32 flex flex-row justify-around'>
        <p class='w-8'> ${
          Math.floor((1000 * value['wins']) / value['total']) / 10
        }% </p>
        <p class='w-8'>  (${value['wins']}/${value['losses']})</p>
        </div>
        </div>`).addClass('my-auto');
  }
}
