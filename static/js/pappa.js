window.onload = function(){ 
    document.getElementById("name").onclick = function() {
      document.getElementById("namediv").style.display = "block";
      document.getElementById("loggbokdiv").style.display = "none";
      }
    document.getElementById("loggbok").onclick = function() {
    document.getElementById("loggbokdiv").style.display = "block";
    document.getElementById("namediv").style.display = "none";
    }
    
    };
    