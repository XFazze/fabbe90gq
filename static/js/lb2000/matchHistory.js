window.onload = function () {
  //console.log('onload')
  //console.log('summonerid: ', summonerid)
  loadmatches()
  //console.log('done')

};

function loadmatches() {
  //console.log('lodamatces is called')
  var ancestor = document.getElementById('match_history');
  var childNodes = ancestor.getElementsByTagName('*');
  var i, e;
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
};

function loadDoc(path, e) {//TODO fix this
  //console.log('loaddoc')
  //console.log(path)
  var xhttp = new XMLHttpRequest();
  xhttp.addEventListener('load', showplayer);
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      e.innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", path, true);
  xhttp.send();
};

function sleep(milliseconds) {
  //console.log('sleep')
  var start = new Date().getTime();
  for (var i = 0; i < 1e8; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
};

function showplayer() {
  //console.log('showplayer')
  var element = document.getElementsByClassName(summonerid);
  for (i = 0; i < element.length; i++) {
    element[i].style.display = 'block';
    //element[i].parentElement.style.float = 'left';
    //element[i].parentElement.parentElement.parentElement.style.color match element
  }
};
