window.onload = function(){
    background = document.getElementById('background');
    const animationWidth = 300;
    for (let i = 0; i < 5; i++){
        let row = document.createElement("div");
        background.appendChild(row);
        console.log('created row', row)
        for (let o = 0; o < 7 ; o++){
            width = Math.random()
            let item = document.createElement("div");
            row.appendChild(item);
            console.log('created block')
        }
};};

function getStandardDeviation (array) {
    const n = array.length
    const mean = array.reduce((a, b) => a + b) / n
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n)
  }