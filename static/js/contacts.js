window.onload = function(){ 
    document.getElementById("contactsBtn").onclick = function() {
        document.getElementById("contacts").style.display = "block";
        document.getElementById("contactsBtn").style.fontSize = 22;
      }
      
    document.getElementById("games-contactsBtn").onclick = function() {
        document.getElementById("games-contacts").style.display = "block";
      }
    document.getElementById("rest-contactsBtn").onclick = function() {
        document.getElementById("rest-contacts").style.display = "block";
        }
    document.getElementById("contactsBtn-close").onclick = function() {
      document.getElementById("contacts").style.display = "none";
      document.getElementById("games-contacts").style.display = "none";
      document.getElementById("rest-contacts").style.display = "none";
      document.getElementById("contactsBtn").style.fontSize = 36;
          }
    document.getElementById("games-contactsBtn-close").onclick = function() {
      document.getElementById("games-contacts").style.display = "none";
          }
    document.getElementById("rest-contactsBtn-close").onclick = function() {
      document.getElementById("rest-contacts").style.display = "none";
          }
    };
    