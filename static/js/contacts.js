window.onload = function(){ 
    document.getElementById("div1Btn").onclick = function() {
      document.getElementById("div1").style.display = "block";
      document.getElementById("div1Btn").style.fontSize = 22;
      }
    document.getElementById("div1-close").onclick = function() {
      document.getElementById("div1").style.display = "none";
      document.getElementById("div2").style.display = "none";
      document.getElementById("div3").style.display = "none";
      document.getElementById("div1Btn").style.fontSize = 36;
    }
      
    document.getElementById("div2Btn").onclick = function() {
      alert("div2");
      document.getElementById("div2").style.display = "block";
      }
    document.getElementById("div2-close").onclick = function() {
      document.getElementById("div2").style.display = "none";
      }
    document.getElementById("div3Btn").onclick = function() {
        document.getElementById("div3").style.display = "block";
      }
    document.getElementById("div3-close").onclick = function() {
      document.getElementById("div3").style.display = "none";
      }
    };
    