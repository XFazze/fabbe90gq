window.onload = function(){ 
    document.getElementById("infobtn").onclick = function() {
      document.getElementById("info").style.display = "block";
      document.getElementById("random").style.display = "none";
      document.getElementById("admin").style.display = "none";
      document.getElementById("moderating").style.display = "none";
      document.getElementById("voice").style.display = "none";
      document.getElementById("stats").style.display = "none";
      }
    document.getElementById("randombtn").onclick = function() {
      document.getElementById("info").style.display = "none";
      document.getElementById("random").style.display = "block";
      document.getElementById("admin").style.display = "none";
      document.getElementById("moderating").style.display = "none";
      document.getElementById("voice").style.display = "none";
      document.getElementById("stats").style.display = "none";
    }
    document.getElementById("adminbtn").onclick = function() {
      document.getElementById("info").style.display = "none";
      document.getElementById("random").style.display = "none";
      document.getElementById("admin").style.display = "block";
      document.getElementById("moderating").style.display = "none";
      document.getElementById("voice").style.display = "none";
      document.getElementById("stats").style.display = "none";
    }
    document.getElementById("moderatingbtn").onclick = function() {
      document.getElementById("info").style.display = "none";
      document.getElementById("random").style.display = "none";
      document.getElementById("admin").style.display = "none";
      document.getElementById("moderating").style.display = "block";
      document.getElementById("voice").style.display = "none";
      document.getElementById("stats").style.display = "none";
    }
    document.getElementById("voicebtn").onclick = function() {
      document.getElementById("info").style.display = "none";
      document.getElementById("random").style.display = "none";
      document.getElementById("admin").style.display = "none";
      document.getElementById("moderating").style.display = "none";
      document.getElementById("voice").style.display = "block";
      document.getElementById("stats").style.display = "none";
    }
    document.getElementById("statsbtn").onclick = function() {
      document.getElementById("info").style.display = "none";
      document.getElementById("random").style.display = "none";
      document.getElementById("admin").style.display = "none";
      document.getElementById("moderating").style.display = "none";
      document.getElementById("voice").style.display = "none";
      document.getElementById("stats").style.display = "block";
    }
}