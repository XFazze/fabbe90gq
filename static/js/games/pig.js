var ctx, key, speed, score, player, enemy, firststage, v = 0, bgc;
window.onload = function () {
    (function () {
        var canvas = document.getElementById("game-layer");
        ctx = canvas.getContext("2d");
        ready();


    })();
};

function start(){
    var playercount = document.getElementById('player').value
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(0,0,900,300);
    var x = 900/Math.min(playercount, 10)
    var y = 1
    for (let i = 0; i < playercount; i++) {
        if(i == 10){
            y = 100
        }else if(i == 20){
            y = -100
        }
        ctx.beginPath();
        ctx.fillStyle = 'black';
        console.log(10+(i%10)*x,150+y)
        ctx.fillRect(10+(i%10)*x,150+y,20,10);
        
        
    }
}
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