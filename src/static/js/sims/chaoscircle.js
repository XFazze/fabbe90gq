var ctx, ya, ys, xs, xPos, yPos, oldYPos, oldXPos, oldPos = [], size = 100, aproachAngle, xinverse, yinverse;
var speed = 1000, touching = false;
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
    if(yPos > 80000 || yPos > 0 || xPos < 0 ||xPos>80000){
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
    if(Math.sqrt(xDiff**2 + yDiff**2) > 295 && !touching) {
        oxDiff = Math.abs(oldPos[oldPos.length-1][0]/size-400);
        oyDiff = Math.abs(oldPos[oldPos.length-1][1]/size-400);
        touching = true
        // find attack angle
        // find circle angle
        // find difference
        // calculate x and y parts
        if((xPos-oldPos[oldPos.length-1][0]) < 0){
            xinverse = true
        }else{
            xinverse = false
        }
        xdelta = xPos-oldPos[oldPos.length-1][0]
        if((yPos-oldPos[oldPos.length-1][1]) < 0){
            yinverse = true;
        }else{
            yinverse = false
        }
        ydelta = yPos-oldPos[oldPos.length-1][1]


        aproachAngle = Math.atan(xdelta/ydelta)
        //console.log('aprochangle', aproachAngle, xdelta, ydelta)
        slopeAngle = Math.atan((xPos-400*size)/(yPos-350*size))
        //console.log('slopeangle', slopeAngle, Math.abs(xPos-400*size)/Math.abs(yPos-350*size))
        totalAngle = aproachAngle+slopeAngle
        console.log('totalAngle', Math.floor(100*aproachAngle)/100, Math.floor(100*slopeAngle)/100, Math.floor(100*totalAngle)/100)

        totalSpeed = xs+ys
        diff = Math.tan(totalAngle)
        //console.log('diff', diff)
        xs = diff*totalSpeed/(1+diff)
        ys = totalSpeed - xs
        //console.log('inveses,', xinverse, Math.floor(xPos-oldPos[oldPos.length-1][0]),yinverse, Math.floor(yPos-oldPos[oldPos.length-1][1]))
        if (!xinverse){
            xs = -xs;
        }
        if (yinverse){
            ys = -ys;
        }
        ys = -Math.abs(ys)
        //console.log('out of boundss',xDiff**2, yDiff**2)
    }else if(touching & Math.sqrt(xDiff**2 + yDiff**2) < 295){
        //console.log('remove touch')
        touching = false
    }
}

function getRndInteger(max) {
    return Math.floor(Math.random() * max);
  }
