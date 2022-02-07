$(function () {
  $('#onlyYou').bind('click', function () {
    $('.playerDiv').addClass('hidden');
    $('.' + summoner['puuid']).removeClass('hidden');
    $('.lanesIMG').removeClass('hidden');
    $('.objectivDiv').addClass('hidden');

    $('.teamsObjectives100').removeClass('hidden');
    $('.teamsObjectives200').removeClass('hidden');
    $('.teamsObjectivesMiddle').removeClass('hidden');
    $('.random').removeClass('hidden');
    $('.damageDiv').removeClass('hidden');

    $('#teammatesButtons').children().removeClass('bg-gray-600');
    $('#onlyYou').addClass('bg-gray-600');
  });
});

$(function () {
  $('#showAll').bind('click', function () {
    $('.playerDiv').removeClass('hidden');
    $('.lanesIMG').addClass('hidden');
    $('.objectivDiv').removeClass('hidden');
    $('#teammatesButtons').children().removeClass('bg-gray-600');
    $('#showAll').addClass('bg-gray-600');
    addScreen();
  });
});

$(function () {
  $('#showMatchup').bind('click', function () {
    $('.playerDiv').addClass('hidden');
    $('.matchup' + summoner['puuid']).removeClass('hidden');
    $('.lanesIMG').removeClass('hidden');
    $('.objectivDiv').addClass('hidden');
    console.log('.matchup' + summoner['puuid']);
    addScreen();
    $('#teammatesButtons').children().removeClass('bg-gray-600');
    $('#showMatchup').addClass('bg-gray-600');
  });
});

$(function () {
  $('#helpMatchHistory').bind('click', function () {
    $('#exampleMatch').toggleClass('hidden');
    $('#helpMatchHistory').toggleClass('bg-gray-600');
  });
});

function addScreen() {
  $('.teamsObjectives100').addClass('hidden');
  $('.teamsObjectives200').addClass('hidden');
  $('.teamsObjectivesMiddle').addClass('hidden');
  $('.random').addClass('hidden');
  $('.damageDiv').addClass('hidden');
}

function settingsBtn(id, default_on) {
  $('#' + id).toggleClass('bg-gray-400');
  //console.log('settingsbtn')
  element = document.getElementById(id);
  //console.log("color: ", element.style.color)
  if (element.style.color == 'var(--main-color)') {
    element.style.color = 'var(--error-color)';
    var element = document.getElementsByClassName(id);
    for (i = 0; i < element.length; i++) {
      element[i].style.display = 'none';
    }
  } else if (element.style.color == 'var(--error-color)') {
    //console.log('not red')
    element.style.color = 'var(--main-color)';
    var element = document.getElementsByClassName(id);
    for (i = 0; i < element.length; i++) {
      element[i].style.display = 'flex';
    }
  } else {
    if (default_on) {
      element.style.color = 'var(--error-color)';
      var element = document.getElementsByClassName(id);
      for (i = 0; i < element.length; i++) {
        element[i].style.display = 'none';
      }
    } else {
      element.style.color = 'var(--main-color)';
      var element = document.getElementsByClassName(id);
      for (i = 0; i < element.length; i++) {
        element[i].style.display = 'flex';
      }
    }
  }
  //console.log('button pressed', id)
}

function taskbarBtn(id) {
  //console.log('showhidebtn')
  var element = document.getElementsByClassName(id);
  var childs = document.getElementById('contents').children;
  //console.log(childs)
  for (i = 0; i < childs.length; i++) {
    childs[i].style.display = 'none';
  }
  for (i = 0; i < element.length; i++) {
    element[i].style.display = 'block';
  }

  var element = document.getElementById(id);
  var childs = document.getElementById('taskbarinner').children;
  for (i = 0; i < childs.length; i++) {
    //console.log('claslist1', childs[i].classList)
    childs[i].classList.remove('bg-gray-600');
    //console.log('claslist2', childs[i].classList)
  }
  //console.log('claslist3', element.classList)
  element.classList.add('bg-gray-600');
  //console.log('claslist3', element.classList)
}

function showhideBtn(show, hide, id) {
  //console.log('showhidebtn')
  for (i = 0; i < hide.length; i++) {
    $('.' + hide[i]).hide();
  }

  for (i = 0; i < show.length; i++) {
    temp = show[i];
    $('.' + temp).css('display', 'flex');
  }

  $('#teammatesButtons').children().removeClass('bg-gray-600');
  $('#' + id).addClass('bg-gray-600');
}

function showmatchup(id) {
  $('#teammatesButtons').children().removeClass('bg-gray-600');
  $('#showMatchup').addClass('bg-gray-600');

  var element = document.getElementsByClassName('runestree');
  for (i = 0; i < element.length; i++) {
    element[i].style.display = 'none';
  }
  var hide = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY'];
  for (i = 0; i < hide.length; i++) {
    temp = hide[i];
    var element = document.getElementsByClassName(temp);
    for (o = 0; o < element.length; o++) {
      element[o].style.display = 'none';
    }
  }
  var usermatches = document.getElementsByClassName(id);
  for (i = 0; i < usermatches.length; i++) {
    parentElement = usermatches[i].parentElement.children;
    for (o = 0; o < parentElement.length; o++) {
      parentElement[o].style.display = 'block';
    }
  }
}
var queueIdConverter = {
  '1400': 'UltimateSpellbook',
  '1020': 'OneForAll',
  '900': 'URF',
  '700': 'Clash',
  '450': 'ARAM',
  '440': 'Flex',
  '430': 'Blind',
  '420': 'Solo/Duo',
  '400': 'Draft',
};
