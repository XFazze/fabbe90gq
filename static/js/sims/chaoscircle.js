var ctx, ya, ys, xs, xPos, yPos, oldYPos, oldXPos, oldPos = [], size = 100, aproachAngle;
var speed = 100
window.onload = function () {
    var canvas = document.getElementById("game-layer");
    ctx = canvas.getContext("2d");
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 800, 700);

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(400, 350, 300, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(400, 350, 295, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(400, 350, 10, 0, 2 * Math.PI);
    
    ctx.fill();
};
function start(){
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(400, 350, 300, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(400, 350, 295, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(400, 350, 10, 0, 2 * Math.PI);
    ctx.fill();
    ya = 9.82;
    xs = 0;
    ys = 0;
    xPos = 50000;
    yPos = 35000;
    gameLoop();


}
function gameLoop(){
    ys = ys + ya;
    oldYPos = yPos;
    oldXPos = xPos;
    yPos += ys;
    xPos += xs;
    checkCollition();
    draw();
    if(yPos < 80000){
        setTimeout(gameLoop, speed/10);
    }
}

function draw(){
    //console.log('oldpos', oldXPos, oldYPos)
    //console.log('new pos', xPos, yPos)
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.arc(400, 350, 295, 0, 2 * Math.PI);
    ctx.fill();
    
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.arc(xPos/size, yPos/size, 10, 0, 2 * Math.PI);
    ctx.fill();
    oldPos.forEach(element => {
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(element[0]/size, element[1]/size, 3, 0, 2 * Math.PI);
        ctx.fill();
                
    });
    oldPos.unshift([xPos, yPos])
    if (oldPos.length > 100){
        oldPos.pop();
    }


}

function checkCollition(){
    var xinverse, yinverse
    xDiff = Math.abs(xPos/size-400);
    yDiff = Math.abs(yPos/size-350);
    if(Math.sqrt(xDiff**2 + yDiff**2) > 295){
        // find attack angle
        // find circle angle
        // find difference
        // calculate x and y parts
        if((xPos-oldPos[0][0]) < 0){
            xinverse = true
        }
        xdelta = Math.abs(xPos-oldPos[0][0])
        if((yPos-oldPos[0][1]) < 0){
            yinverse = true;
        }
        ydelta = Math.abs(yPos-oldPos[0][1])


        aproachAngle = Math.atan(xdelta/ydelta)*180/Math.PI
        console.log('aprochangle', aproachAngle, xdelta, ydelta)

        slopeAngle = Math.atan(Math.abs(xPos-400*size)/Math.abs(yPos-350*size))      
        console.log('slopeangle', slopeAngle, Math.abs  (xPos-400*size),Math.abs(yPos-350*size))
        xs = -Math.abs(xs)
        ys = -Math.abs(ys)
        console.log('out of boundss',xDiff**2, yDiff**2)
    }
}
function getRndInteger(max) {
    return Math.floor(Math.random() * max);
  }