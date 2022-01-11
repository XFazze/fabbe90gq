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
    ctx.fillStyle = '#90ee90';
    ctx.arc(element.left,  element.top, 25, 0, 2 * Math.PI);
    ctx.fill();

    var last_time = Date.now()*10;
    var difficulty = 1;
    var clicks = 0;

    canvas.addEventListener('click', function (event) {
        var x = event.pageX - canvasLeft,
            y = event.pageY - canvasTop;

        if ((Math.abs(y-element.top)**2+Math.abs(x-element.left)**2)**0.5 < 25) {
            var scoreElement = document.getElementById('score');
            scoreElement.innerHTML = 'Score: ' + clicks.toString();

            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, 500, 300);   

            element.left = 25+Math.random()*450;
            element.top = 25+Math.random()*250;

            ctx.beginPath();
            ctx.fillStyle = '#90ee90';
            ctx.arc(element.left,  element.top, 25, 0, 2 * Math.PI);
            ctx.fill();
            clicks += 1;
            if (Date.now() > last_time + difficulty*1000){
                document.getElementById("snoop").style.display = "block";
                document.getElementById("game-layer").style.display = "none";
                document.getElementById("leaderboard").style.display = "block";
            }
            difficulty -= difficulty/10
            last_time = Date.now()

        }});
        //FIXME reset button doesnt work
    document.getElementById("resetbutton").addEventListener("click", function (event) {
        last_time = Date.now()*10;
        difficulty = 1;
        clicks = 0; 
        element.top = 150;
        element.left = 250;

        var scoreElement = document.getElementById('score');
        scoreElement.innerHTML = 'Score: hej';
       
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
    
};
