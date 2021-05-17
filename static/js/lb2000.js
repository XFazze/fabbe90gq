window.onload = function () {
  document.getElementById("champion_masteryBtn").onclick = function () {
    if (document.getElementById("masterydiv").style.overflow == "hidden") {
      document.getElementById("masterydiv").style.overflow = "visible";
      document.getElementById("masterydivtext").innerHTML = "Hide";
    } else {
      document.getElementById("masterydiv").style.overflow = "hidden";
      document.getElementById("masterydivtext").innerHTML = "Show all";
    }
  }
  var ancestor = document.getElementById('match_history');
  console.log(ancestor)
    var childNodes = ancestor.getElementsByTagName('*');
  console.log(childNodes)
      var i, e, d;
      for (i = 0; i < childNodes.length; ++i) {
          e = childNodes[i];
          e.innerHTML = "Looped thrioyg";
        };

};



function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML =
        this.responseText;
    }
  };
  xhttp.open("GET", "static/lolgames/example_match.xml", true);
  xhttp.send();
}