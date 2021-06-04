window.onload = function () {
  var ancestor = document.getElementById('match_history');
  //console.log(ancestor)
    var childNodes = ancestor.getElementsByTagName('*');
  //console.log(childNodes)
      var i, e, d;
      for (i = 0; i < childNodes.length; ++i) {
        gameid = String(childNodes[i].id).split('_');
        path = 'static/lolgames_html/'+gameid[0] + '/' + gameid[1] + '.txt'
        //console.log(path, childNodes[i].id)
        e = childNodes[i];
        loadDoc(path, e)
        e.innerHTML = path;
        };

};



function loadDoc(path, e) {
  //console.log(path)
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      e.innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", path, true);
  xhttp.send();
}