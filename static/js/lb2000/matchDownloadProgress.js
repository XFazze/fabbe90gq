// start loop increasing progressbar

$(document).ready(function () {
  matchDownloadProgress();
});
async function matchDownloadProgress() {
  let progress = await checkProgress(summoner['puuid']);
  if (progress['downloaded'] >= progress['totalAmount']) {
    console.log('all matches are downloaded returning');
    $('#processText').text('All Matches');
    return;
  }
  console.log(progress);
  let size = 500;
  let process = $(
    `<p class='absolute whitespace-nowrap left-7 top-1/4' id='processText'>Match: ${progress['downloaded']}/${progress['totalAmount']}</p>`
  );
  $('#processText').replaceWith(process);
  $('#processDone').width(
    (size * progress['downloaded']) / progress['totalAmount']
  );
  $('#processLeft').width(
    size * (1 - progress['downloaded'] / progress['totalAmount'])
  );

  setTimeout(() => {
    matchDownloadProgress();
  }, 1000 * 10);
}
async function checkProgress(puuid) {
  ajaxSettings = {
    type: 'GET',
    data: {
      puuid: puuid,
    },
    url: $SCRIPT_ROOT + 'progress',
    cache: false,
    async: false,
    tryCount: 0,
    retryLimit: 10,
  };
  return await ajaxRetry(ajaxSettings, 1000);
}
