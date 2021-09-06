window.onload = function () {
    var canvas = document.getElementById("game-layer");
    var canvasLeft = canvas.offsetLeft + canvas.clientLeft;
    var canvasTop = canvas.offsetTop + canvas.clientTop;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 500, 300);
    var element = {
        colour: '#05EFFF',
        top: 150,
        left: 250
    };

    ctx.beginPath();

    var last_time = Date.now()*10;
    var difficulty = 1;
    var snake = [[20,20]];
    var key = 'none';
    var started = false;
    var dead = false;
    var deadtail;
    var newhead;

    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.fillRect(20, 20, 10 , 10);

    function gameLoop() {
        console.log("gameLoop");
        console.log(key);
        move(snake,key);
        drawhead(newhead);
        undrawtail(deadtail);
    }
  
    document.addEventListener('keydown', (event) => {
        //console.log("PRESSED KEYup", event.key);
        if (event.key == 'ArrowRight' || event.key == 'ArrowLeft' || event.key == 'ArrowUp' || event.key == 'ArrowDown'){
            key = event.key;
        } else{
            console.log('other kwy pressed: ', key)
        }
        if (!started){
            interval = setInterval(gameLoop, 253); // 33 milliseconds = ~ 30 frames per sec
            console.log('started gameloop')

            started = true;
        }
    });
    function dead(){
        clearInterval(interval);
        dead = true;
        document.getElementById("leaderboard").style.display = "block";

    };
    function move(snake, key){
        console.log("move key:", key);
        console.log("old snake: ", snake);
        console.log('last: ',snake[snake.length - 1]);
        if (snake[snake.length - 1][0] === 0 || snake[snake.length - 1][0] === canvas.width || snake[snake.length - 1][1] === 0 || snake[snake.length - 1][1] === canvas.height ){
            console.log('went into wall');

        };
        if (key=="ArrowRight"){
            newhead= [snake[snake.length - 1][0] + 10,snake[snake.length - 1][1]] 
            if (newhead in snake){
                console.log("you ran into yourself");
                dead();

            } else{
                snake.push(newhead);
            };
        };
        if (key=="ArrowLeft"){
            newhead = [snake[snake.length - 1][0] - 10,snake[snake.length - 1][1]]
            if (newhead in snake){
                console.log("you ran into yourself");
                dead();

            } else{
                snake.push(newhead);
            };
        };
        if (key=="ArrowUp"){
            newhead = [snake[snake.length - 1][0],snake[snake.length - 1][1] - 10]
            if (newhead in snake){
                console.log("you ran into yourself");
                dead();

            } else{
                console.log('newhead: ',newhead)
                snake.push(newhead);
            };
        };
        if (key=="ArrowDown"){
            newhead = [snake[snake.length - 1][0],snake[snake.length - 1][1] + 10]
            if (newhead in snake){
                console.log("you ran into yourself");
                dead();
            } else{
                snake.push(newhead);

            };
        };
        console.log(newhead)
        deadtail = snake.shift();
        console.log("new snake: ", snake);

    };
    function drawhead(newhead){
        ctx.beginPath();
        // head
        ctx.fillStyle = 'yellow';
        ctx.fillRect(newhead[0], newhead[1], 10 , 10);

    };
    function undrawtail(deadtail){
        ctx.beginPath();
        // tail
        ctx.fillStyle = 'blue';
        ctx.fillRect(deadtail[0], deadtail[1], 10 , 10);

    };
    document.getElementById("resetbutton").addEventListener("click", function (event) {
        last_time = Date.now()*10;
        difficulty = 1;
        clicks = 0; 
        element.top = 150;
        element.left = 250;

        var scoreElement = document.getElementById('score');
        scoreElement.innerHTML = 'Score: 0';
       
        document.getElementById("snoop").style.display = "none";
        document.getElementById("game-layer").style.display = "block";
        document.getElementById("leaderboard").style.display = "none";
            

        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 500, 300);

        ctx.beginPath();
        ctx.fillStyle = '#90ee90';
        ctx.arc(element.left,  element.top, 25, 0, 2 * Math.PI);
        ctx.fill();

    });
    
    document.getElementById("submit").addEventListener("click", function (event) {
        var user = document.getElementById("leaderboard");
        data = {'game': "osu",
                'score' : clicks,
                'user' : user.elements[0].value}
        $.ajax({
        url: '/gamejs/leaderboard',
        type: 'POST',
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(data),   // converts js value to JSON string
        })
        .done(function(result){     // on success get the return object from server
            console.log(result)     // do whatever with it. In this case see it in console
        })
        
    });
};
