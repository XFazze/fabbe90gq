var ctx, key, speed, score, platform, enemy, firststage, v = 0, bgc, restartPossibleVar = false, pltSpeed;
window.onload = function () {
    (function () {
        var canvas = document.getElementById("game-layer");
        var canvasLeft = canvas.offsetLeft + canvas.clientLeft;
        var canvasTop = canvas.offsetTop + canvas.clientTop;
        ctx = canvas.getContext("2d");
        ready();

        // listens for the key
        document.addEventListener('keydown', (event) => {
            if (event.key != 'a' && event.key != 'd') {
                console.log('other key pressed ', event.key);
                return
            };

            key = event.key;

            if (!started || restartPossibleVar) {
                ready();
                document.getElementById('score').innerHTML = 'Score: ' + score;
                gameLoop() // 33 milliseconds = ~ 30 frames per sec
                console.log('started gameloop')
                started = true;
            }
        });

    })();
};

// paints the new head
function draw(e) {
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(e[0], e[1], e[2], e[3]);
};

// unpaints the tail
function undraw(e) {
    ctx.beginPath();
    ctx.fillStyle = bgc;
    ctx.fillRect(e[0], e[1], e[2], e[3]);
};

// move enemies closer 
function enemymove() {
    for (let i = 0; i < enemy.length; i++) {
        undraw(enemy[i]);
        enemy[i][0] = enemy[i][0] - enemy[i][4];
        enemy[i][1] = enemy[i][1] - enemy[i][5];
        draw(enemy[i]);
    }
}


function checkcollition() {
    for (let i = 0; i < enemy.length; i++) {
        if(enemy[i][1]> 490){
            dead();
        }else if (enemy[i][0] < platform[0] + platform[2] && enemy[i][0] + enemy[i][2] > platform[0] &&
            enemy[i][1] < platform[1] + platform[3] && enemy[i][1] + enemy[i][3] > platform[1]) {
            console.log('made contact');
            enemy[i][5] = enemy[i][5] *-1;
            score++;
            document.getElementById('score').innerHTML = 'Score: ' + score;
            if(score%5==0){
                x = getRndInteger(-6,6)
                y = getRndInteger(-5,5)
                enemy.push([345, 100, 10, 10, x, y])
                pltSpeed = pltSpeed +5;
            }
        }else if(enemy[i][1] < 0){
            enemy[i][5] = enemy[i][5] *-1;

        }
        if (enemy[i][0] < 0 || enemy[i][0] > 690) {
            console.log('made contact');
            enemy[i][4] = enemy[i][4] *-1;
        }else if(enemy[i][0] < 0){
            enemy[i][4] = enemy[i][4] *-1;

        }
    }
};
function move(){
    undraw(platform);
    if(key == 'a'){
        platform[0] = platform[0]-pltSpeed;
        if(platform[0] < 0){
            platform[0] = 0;
        }
    }else if(key == 'd'){
        platform[0] = platform[0]+pltSpeed;
        if(platform[0] > 620){
            platform[0] = 620;
        }

    }
    //console.log(platform)
    draw(platform);
};

function gameLoop() {
    move();
    //createDeleteEnemy();
    enemymove();
    checkcollition();
    if (deadval) {
        return;
    };
    setTimeout(gameLoop, speed / 30);
}

function ready() {
    console.log('ready is called')
    platform = [310, 480, 80, 20];
    key = 'none';
    started = false;
    deadval = false;
    speed = 550;
    enemy = [[345, 0, 10, 10, -1, -5]]; 
    score = 0;
    firststage = true;
    bgc = 'white';
    restartPossibleVar = false;
    pltSpeed = 5;

    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 700, 500);

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(310, 480, 80, 20);
};

function dead() {
    console.log('dead')
    deadval = true;
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText('Dead', 200, 150);
    setTimeout(restartPossible,1000);
};

function restartPossible(){
    console.log('can now restart')
    restartPossibleVar = true;
}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}