$(document).ready(function () {
  rankStart();
});

async function rankStart() {
  data = await getRanks(summoner['id']);
  let queueIdRecent = ['RANKED_SOLO_5x5', 'RANKED_TEAM_5x5'];

  $('#ranksDiv').html('');
  queueIdRecent.forEach((qId) => {
    if (!data[qId]) {
      let text = $(`<p>No rank</p>`);
      let nodata = $('<div></div>').addClass(
        'hidden flex justify-center items-center ' + qId
      );
      nodata.prepend([text]);
      $('#ranksDiv').append(nodata);
      return;
    }

    let rank = $(`<div></div>`).addClass('hidden bg-gray-600 relative r' + qId);
    let img = $(
      `<div><img src='https://raw.communitydragon.org/pbe/plugins/rcp-fe-lol-postgame/global/default/ranked-tier-${data[
        qId
      ]['tier'].toLowerCase()}.png'></div>`
    ).addClass('w-32');

    let tier =
      $(`<div class='text-center w-full absolute top-2'><p>${data[qId]['rank']}  ${data[qId]['leaguePoints']} LP 
    </p></div>`);

    let stats = $(`<div class='text-center w-full '><p>${
      Math.floor(
        (1000 * data[qId]['wins']) / (data[qId]['wins'] + data[qId]['losses'])
      ) / 10
    }% (${data[qId]['wins']}/${data[qId]['losses']})
    </p></div>`);

    rank.prepend([img, tier, stats]);
    $('#ranksDiv').append(rank);
  });
  $('.rRANKED_SOLO_5x5').removeClass('hidden');
}
async function getRanks(summonerId) {
  ajaxSettings = {
    type: 'GET',
    data: {
      summonerId: summonerId,
      region: region,
    },
    url: $SCRIPT_ROOT + 'ranks',
    cache: false,
    async: false,
    tryCount: 0,
    retryLimit: 10,
  };
  return await ajaxRetry(ajaxSettings, 1000);
}

//buttons
$(function () {
  $('#soloqB').bind('click', function () {
    $('.ranksButtons').children().removeClass('bg-gray-600');
    $('#soloqB').addClass('bg-gray-600');

    $('#ranksDiv').children().addClass('hidden');
    $('.rRANKED_SOLO_5x5').removeClass('hidden');
  });
});
$(function () {
  $('#flexBut').bind('click', function () {
    $('.ranksButtons').children().removeClass('bg-gray-600');
    $('#flexBut').addClass('bg-gray-600');

    $('#ranksDiv').children().addClass('hidden');
    $('.rRANKED_TEAM_5x5').removeClass('hidden');
  });
});
