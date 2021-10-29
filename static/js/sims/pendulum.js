var ctx, angleSpeed;

window.onload = function () {
    var canvas = document.getElementById("game-layer");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 1000, 700);

    console.log('started');
    pole=[500, 650];
    draw(pole);
};

function swing(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 1000, 700);
    console.log('swing called')
    angleSpeed = 1;
    pole=[500, 650];
    gameLoop();

};
function gameLoop() {
    // calculate moment in from angle speed and position
    move();
    // calculate cahnge in anglespeed from position

    setTimeout(gameLoop, 400);
}

function move(){
    undraw(pole);

    draw(pole);

};

function undraw(pole){
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.moveTo(500,350);
    ctx.lineTo(pole[0],pole[1]); 
    ctx.stroke();
    ctx.closePath();
}
function draw(pole){
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.moveTo(500,350);
    ctx.lineTo(pole[0],pole[1]); 
    ctx.fill();
    ctx.closePath();
}

function getRndInteger(max) {
    return Math.floor(Math.random() * max);
  }