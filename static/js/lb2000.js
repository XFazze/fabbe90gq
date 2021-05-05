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
    };
function plswork(){
  document.getElementById("xx").innerHTML = document.getElementById("xx").textContent + "9";

}