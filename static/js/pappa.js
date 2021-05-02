window.onload = function(){ 
    document.getElementById("name").onclick = function() {
      document.getElementById("namediv").style.display = "block";
      document.getElementById("vannerdiv").style.display = "none";
      document.getElementById("loggbokdiv").style.display = "none";
      document.getElementById("paminnelserdiv").style.display = "none";
      document.getElementById("Installningardiv").style.display = "none";
      }
    document.getElementById("vanner").onclick = function() {
      document.getElementById("namediv").style.display = "none";
      document.getElementById("vannerdiv").style.display = "block";
      document.getElementById("loggbokdiv").style.display = "none";
      document.getElementById("paminnelserdiv").style.display = "none";
      document.getElementById("Installningardiv").style.display = "none";
    }
    document.getElementById("loggbok").onclick = function() {
      document.getElementById("namediv").style.display = "none";
      document.getElementById("vannerdiv").style.display = "none";
      document.getElementById("loggbokdiv").style.display = "block";
      document.getElementById("paminnelserdiv").style.display = "none";
      document.getElementById("Installningardiv").style.display = "none";
    }
    document.getElementById("paminnelser").onclick = function() {
      document.getElementById("namediv").style.display = "none";
      document.getElementById("vannerdiv").style.display = "none";
      document.getElementById("loggbokdiv").style.display = "none";
      document.getElementById("paminnelserdiv").style.display = "block";
      document.getElementById("Installningardiv").style.display = "none";
    }
    document.getElementById("installnigar").onclick = function() {
      document.getElementById("namediv").style.display = "none";
      document.getElementById("vannerdiv").style.display = "none";
      document.getElementById("loggbokdiv").style.display = "none";
      document.getElementById("paminnelserdiv").style.display = "none";
      document.getElementById("Installningardiv").style.display = "block";
    }
    
    };
    