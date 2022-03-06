$(document).ready(function () {
  $('#mastery').click(masteryLoad());
});
async function masteryLoad() {
  var data = await getMastery();
  data['mastery'].forEach(async (champ) => {
    let im = $(
      `<img class='w-16' src="http://ddragon.leagueoflegends.com/cdn/12.2.1/img/champion/${
        champIdToName[champ['championId']]
      }.png">`
    );
    var points;
    if (champ['championPoints'] > 100000) {
      points = $(
        `<p>${Math.floor(champ['championPoints'] / 1000)}k(${
          champ['championLevel']
        })</p>`
      );
    } else {
      points = $(
        `<p>${Math.floor(champ['championPoints'] / 100) / 10}k(${
          champ['championLevel']
        })</p>`
      );
    }
    console.log(timeNow, champ['lastPlayTime'])
    let lastTime = $(
      `<p>${Math.floor(
        (timeNow - champ['lastPlayTime']/1000) / (60  * 24 * 6)
      )/10}d</p>`
    );
    let champDiv = $(
      `<div class='flex flex-col items-center p-1'></div>`
    ).prepend(im, points, lastTime);
    $('#Divmasteries').append(champDiv);
  });
  $('#totalMastery').text(`Total Mastery: ${data['totalMastery']}`);
  var totalMasteryPoints = 0;
  for (let champI = 0; champI < data['mastery'].length; champI++) {
    const champ = data['mastery'][champI];
    totalMasteryPoints += champ;
  }
  $('#totalMastery').text(`Total Mastery: ${data['totalMastery']}`);
  $('#totalMasteryPoints').text(`Total Mastery: ${data['masterPoints']}k`);
  $('#masteryChampions').text(`Champions: ${String(data['mastery'].length)}`);
}
async function getMastery() {
  ajaxSettings = {
    type: 'GET',
    data: {
      puuid: summoner['puuid'],
      region: region,
      id: summoner[id],
    },
    url: $SCRIPT_ROOT + 'mastery',
    cache: false,
    async: false,
  };
  return await ajaxRetry(ajaxSettings);
}
