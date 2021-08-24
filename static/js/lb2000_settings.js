window.onload = function () {
  console.log("Windows loaded ")
    document.getElementById("champion_masteryBtn").onclick = function () {
      console.log("button clicked")
      if (document.getElementById("masterydiv").style.overflow == "hidden") {
        document.getElementById("masterydiv").style.overflow = "visible";
        document.getElementById("masterydivtext").innerHTML = "Hide";
      } else {
        document.getElementById("masterydiv").style.overflow = "hidden";
        document.getElementById("masterydivtext").innerHTML = "Show all";
      }
    }
  
  };
  