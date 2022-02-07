var ctx, key, speed, score, player, enemy, firststage, v = 0, bgc;
window.onload = function () {
    (function () {
        var canvas = document.getElementById("game-layer");
        var canvasLeft = canvas.offsetLeft + canvas.clientLeft;
        var canvasTop = canvas.offsetTop + canvas.clientTop;
        ctx = canvas.getContext("2d");


        ready();

        // listens for the key
        document.addEventListener('keydown', (event) => {
            if (event.key != ' ') {
                console.log('other key pressed ', event.key);
                return
            };
            key = true;
            console.log("space pressed");
            if (!started || deadval) {
                ready();
                document.getElementById('score').innerHTML = 'Score: ' + score;
                gameLoop() // 33 milliseconds = ~ 30 frames per sec
                console.log('started gameloop')
                started = true;
            }
        });

    })();
};

function move(player) {
    undraw(player)
    if (player[1] >= 300 - player[3] && key) {
        //console.log(player,'on ground should jumpp');
        v = 20;
        player[1] = player[1] - v;

    } else if (player[1] < 300 - player[3]) {
        player[1] = player[1] - v;
        if (player[1] > 300 - player[3]) {
            player[1] = 300 - player[3];
        }
        v = v - 1;
        //console.log(player, 'in air do physics');
        key = false;
    }

    draw(player)
    return player
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
function enemymove(enemy) {
    for (let i = 0; i < enemy.length; i++) {
        undraw(enemy[i]);
        enemy[i][0] = enemy[i][0] - 4;
        draw(enemy[i]);
    }
}

function createDeleteEnemy(enemy) {
    var width, height;
    for (let i = 0; i < enemy.length; i++) {
        if (enemy[i][0] + enemy[i][2] < 0) {
            enemy.shift();
            i--;
            width = getRndInteger(20, 50);
            height = getRndInteger(20, 70);
            fromfloor = getRndInteger(220, 300);
            enemy[enemy.length] = [900, fromfloor - height, width, height];
            score++;
            document.getElementById('score').innerHTML = 'Score: ' + score;
        }
    }
    if(score == 5 && firststage){
        //console.log('firststage left')
        width = getRndInteger(20, 70);
        height = getRndInteger(20, 70);
        fromfloor = getRndInteger(230, 300);
        enemy[enemy.length] = [1350, fromfloor - height, width, height];
        firststage = false;
        secondstage = true;
        bgc = '#ff99a0';
        ctx.beginPath();
        ctx.fillStyle = '#ff99a0';
        ctx.fillRect(0, 0, 900, 300);
        draw(player);
        for (let i = 0; i < enemy.length; i++) {
            draw(enemy[i]);
        }

    }
    if(score == 15 && secondstage){
        //console.log('secondstage left')
        width = getRndInteger(20, 70);
        height = getRndInteger(20, 70);
        fromfloor = getRndInteger(220, 300);
        enemy[enemy.length] = [1025, fromfloor - height, width, height];
        secondstage = false;
        thirdstage = true;
        bgc = '#ff5964';
        ctx.beginPath();
        ctx.fillStyle = '#ff5964';
        ctx.fillRect(0, 0, 900, 300);
        draw(player);
        for (let i = 0; i < enemy.length; i++) {
            draw(enemy[i]);
        }

    }
    if(score == 25 && thirdstage){
        //console.log('thirdstage left')
        width = getRndInteger(20, 70);
        height = getRndInteger(20, 70);
        fromfloor = getRndInteger(220, 300);
        enemy[enemy.length] = [1025, fromfloor - height, width, height];
        thirdstage = false;
        bgc = '#eb0010';
        ctx.beginPath();
        ctx.fillStyle = '#eb0010';
        ctx.fillRect(0, 0, 900, 300);
        draw(player);
        for (let i = 0; i < enemy.length; i++) {
            draw(enemy[i]);
        }

    }
    return enemy
}

function checkcollition(enemy, player) {
    for (let i = 0; i < enemy.length; i++) {
        // first 2 checks if its in x range then y
        if (enemy[i][0] < player[0] + player[2] && enemy[i][0] + enemy[i][2] > player[0] &&
            enemy[i][1] < player[1] + player[3] && enemy[i][1] + enemy[i][3] > player[1]) {
            dead();
        }
    }
};
function gameLoop() {
    player = move(player);
    enemy = createDeleteEnemy(enemy);
    enemymove(enemy);
    checkcollition(enemy, player);
    if (deadval) {
        return;
    };
    setTimeout(gameLoop, speed / 40);
}

function ready() {
    console.log('ready is called')
    player = [10, 280, 20, 120];
    key = 'none';
    started = false;
    deadval = false;
    speed = 550;
    enemy = [[900, 250, 50, 50]];
    score = 0;
    firststage = true;
    bgc = 'white';

    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 900, 300);

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 300, 100, 280);
};

function dead() {
    deadval = true;
    ctx.font = "30px Arial";
    ctx.fillStyle = "red";
    ctx.fillText('Dead', 200, 150)
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}