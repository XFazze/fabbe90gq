window.onload = function () {
  console.log('onload')
  console.log(summonerid)
  loadmatches()
  console.log('done')


};;

function showplayer() {
  console.log('showplayer')
  var element = document.getElementsByClassName(summonerid);
  for (i = 0; i < element.length; i++) {
    element[i].style.display = 'block';
    //element[i].parentElement.style.float = 'left';
    //element[i].parentElement.parentElement.parentElement.style.color match element
  }
};

function loadmatches() {
  console.log('lodamatces is called')
  var ancestor = document.getElementById('match_history');
  var childNodes = ancestor.getElementsByTagName('*');
  var i, e, d;
  for (i = 0; i < childNodes.length; ++i) {
    gameid = String(childNodes[i].id).split('_');
    path = '/static/lolgames_html/' + gameid[0] + '/' + gameid[1] + '.txt'
    //console.log(path, childNodes[i].id)
    e = childNodes[i];
    //console.log("new match")
    while (true) {
      var breakCondition = checkFileExist(path);
      //console.log("found file:", breakCondition)
      if (breakCondition) {
        break;
      }
      sleep(2000);
    }
    //console.log('made it here')
    loadDoc(path, e);
    showplayer();
    e.innerHTML = path;
  };
}

function loadDoc(path, e) {//TODO fix this
  console.log('loaddoc')
  console.log(path)
  var xhttp = new XMLHttpRequest();
  xhttp.addEventListener('load', showplayer);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      e.innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", path, true);
  xhttp.send();
}

function sleep(milliseconds) {
  console.log('sleep')
  var start = new Date().getTime();
  for (var i = 0; i < 1e8; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function checkFileExist(urlToFile) {
  console.log('checkfileexist')
  var xhr = new XMLHttpRequest();
  xhr.open('HEAD', urlToFile, false);
  xhr.send();

  if (xhr.status == "404") {
    return false;
  } else {
    return true;
  }
}

function settingsBtn(id, default_on) {
  console.log('settingsbtn')
  element = document.getElementById(id)
  console.log("color: ", element.style.color)
  if (element.style.color == 'var(--main-color)') {
    element.style.color = 'var(--error-color)';
    var element = document.getElementsByClassName(id);
    for (i = 0; i < element.length; i++) {
      element[i].style.display = 'none';
    }
  }
  else if (element.style.color == 'var(--error-color)') {
    console.log('not red')
    element.style.color = 'var(--main-color)';
    var element = document.getElementsByClassName(id);
    for (i = 0; i < element.length; i++) {
      element[i].style.display = 'flex';
    }
  }
  else {
    if (default_on) {
      element.style.color = 'var(--error-color)';
      var element = document.getElementsByClassName(id);
      for (i = 0; i < element.length; i++) {
        element[i].style.display = 'none';
      }
    }
    else {
      element.style.color = 'var(--main-color)';
      var element = document.getElementsByClassName(id);
      for (i = 0; i < element.length; i++) {
        element[i].style.display = 'flex';

      }
    }
  }
  console.log('button pressed', id)
}
function taskbarBtn(id) {
  console.log('showhidebtn')
  var element = document.getElementsByClassName(id);
  var childs = document.getElementById('contents').children;
  console.log(childs)
  for (i = 0; i < childs.length; i++) {
    childs[i].style.display = 'none';
  }
  for (i = 0; i < element.length; i++) {
    element[i].style.display = 'block';
  }

  var element = document.getElementById(id);
  var childs = document.getElementById('taskbarinner').children;
  for (i = 0; i < childs.length; i++) {
    console.log('claslist1', childs[i].classList)
    childs[i].classList.remove("bg-gray-800");
    console.log('claslist2', childs[i].classList)
  }
  console.log('claslist3', element.classList)
  element.classList.add("bg-gray-800");
  console.log('claslist3', element.classList)
}

function showhideBtn(show, hide) {
  console.log('showhidebtn')
  for (i = 0; i < hide.length; i++) {
    temp = hide[i];
    var element = document.getElementsByClassName(temp);
    for (o = 0; o < element.length; o++) {
      element[o].style.display = 'none';
    }

  }
  for (i = 0; i < show.length; i++) {
    temp = show[i];
    var element = document.getElementsByClassName(temp);
    for (o = 0; o < element.length; o++) {
      element[o].style.display = 'flex';
    }

  }
}
function showmatchup(id) {
  var element = document.getElementsByClassName('runestree');
  for (i = 0; i < element.length; i++) {
    element[i].style.display = 'none';

  }
  var hide = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY']
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