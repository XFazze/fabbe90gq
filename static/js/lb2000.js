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

};
function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("demo").innerHTML =
        this.responseText;
    }
  };
  xhttp.open("GET", "/EUN1/2829613673.json", true);
  xhttp.send();
}