
window.onload = function(){ 
document.getElementById("mainlinksBtn").onclick = function() {
    document.getElementById("mainlinks").style.display = "block";
  }

document.getElementById("musiclinksBtn").onclick = function() {
    document.getElementById("musiclinks").style.display = "block";
}
document.getElementById("musiclinksBtn-close").onclick = function() {
  document.getElementById("musiclinks").style.display = "none";
}
document.getElementById("mainlinksBtn-close").onclick = function() {
  document.getElementById("mainlinks").style.display = "none";
}
};
