async function ajaxRetry(ajaxSettings, wait = 1000) {
  try {
    return await $.ajax(ajaxSettings);
  } catch (e) {
    //console.log('in catch', ajaxSettings['data']['id']);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, wait);
    });
    return await ajaxRetry(ajaxSettings, wait + 1000);
  }
}

$GAME_VERSION = '12.2.1';

$(function () {
  for (let btnI = 0; btnI < $('.underContentBtns').children().length; btnI++) {
    let btn = $('.underContentBtns').children()[btnI].id;

    $('#' + btn).bind('click', async function () {
      if ($('#' + btn).hasClass('toggleDD')) {
        $('#' + btn).addClass('bg-gray-600');
        return;
      }
      $('#' + btn)
        .parent()
        .children()
        .removeClass('bg-gray-600');
      $('#' + btn).addClass('bg-gray-600');

      if ($('#' + btn).hasClass('special')) {
        return;
      }
      $('#' + btn)
        .parent()
        .parent()
        .children()
        .addClass('hidden');
      $('#' + btn)
        .parent()
        .removeClass('hidden');

      $('#Div' + btn).removeClass('hidden');
    });
  }
});
