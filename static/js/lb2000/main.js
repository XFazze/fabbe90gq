async function ajaxRetry(ajaxSettings, wait = 1000) {
  try {
    return await $.ajax(ajaxSettings);
  } catch (e) {
    console.log('in catch', ajaxSettings['data']['id']);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, wait);
    });
    return await ajaxRetry(ajaxSettings, wait + 1000);
  }
}

$GAME_VERSION = '12.1.1';
