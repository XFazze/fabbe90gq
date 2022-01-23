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
var runeIdToPath = {
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