window.onload = function () {
    var canvas = document.getElementById("game-layer");
    var canvasLeft = canvas.offsetLeft + canvas.clientLeft;
    var canvasTop = canvas.offsetTop + canvas.clientTop;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 500, 300);
    var line = [100,100]
    var oldline = [100,0]
    var speed = 200;
    var element = {
        colour: '#05EFFF',
        top: 150,
        left: 250
    };

    var last_time = Date.now()*10;

    canvas.addEventListener('click', function (event) {
        var x = event.pageX - canvasLeft,
            y = event.pageY - canvasTop;

    });
    function draw(line){
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.moveTo(250, 0);
        ctx.lineTo(250+line[0], line[1]);
        ctx.fillRect(500,0,200,100)
        ctx.stroke();

    }
    function undraw(line){
        ctx.beginPath();
        ctx.fillStyle = 'black';
        ctx.moveTo(250, 0);
        ctx.lineTo(250+line[0], line[1]);
        ctx.stroke();

    }
    function gameLoop() {
        console.log("gameLoop");
        line  = [line[0], line[1]+1]
        console.log('new line', line)
        draw(line);
        undraw(oldline);
        oldline = line;
        setTimeout(gameLoop, speed/10);
    }
    gameLoop()

    document.getElementById("resetbutton").addEventListener("click", function (event) {
        last_time = Date.now()*10;
        difficulty = 1;
        clicks = 0; 
        element.top = 150;
        element.left = 250;
    
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 500, 300);


    });
};
