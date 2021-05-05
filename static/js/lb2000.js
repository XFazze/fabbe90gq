window.onload = function(){ 
    document.getElementById("champion_masteryBtn").onclick = function() {
        if (document.getElementById("masterydiv").style.overflow == "hidden"){
            document.getElementById("masterydiv").style.overflow = "visible";
            document.getElementById("masterydivtext").innerHTML = "Hide";
      }else{
        document.getElementById("masterydiv").style.overflow = "hidden";
        document.getElementById("masterydivtext").innerHTML = "Show all";
      }
      }
      var i;
      for (i = 0; i < 100; i++) {
        setTimeout(() => { plswork(); }, 1000);
      }
    };
function plswork(){
  document.getElementById("xx").innerHTML = document.getElementById("xx").textContent + "9";

}