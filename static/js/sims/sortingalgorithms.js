var ctx, poles, canvasTop, canvasLeft, sorted = true, speed, smallest, smallestIndex,progression = 0, stopvar = false;
window.onload = function () {
    var canvas = document.getElementById("game-layer");
    var canvasLeft = canvas.offsetLeft + canvas.clientLeft;
    var canvasTop = canvas.offsetTop + canvas.clientTop;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 1000, 700);

    console.log('started');
    ready();


};
function ready(){
    poles = []
    for(let i = 0; i < 100; i++){
        poles.splice(getRndInteger(poles.length), 0, i*7);
    };
    paint();
    speed = 100/(document.getElementById('speed').value);
    if(speed == Infinity){
        speed = 1000;
    }
    sorted = false;
    stopvar = false;

}
function paint(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 1000, 700);
    for(let i = 0; i < poles.length; i++){
        ctx.fillStyle = 'black';
        ctx.fillRect(i*10, 700-poles[i], 10, poles[i]);
        
    }
}

function insertionsort(){
    if(sorted){
        ready();
    };
    sorted = true;
    for(let i = 0; i < 99; i++){
        //console.log('checking ', poles[i], poles[i+1])
        if(poles[i] > poles[i+1]){
            temp = poles [i];
            poles[i] = poles[i+1];
            poles[i+1] = temp;
            sorted = false;
            //console.log('swapped ', poles[i], temp)
            break
        }
    }
    paint();
    if(!sorted && !stopvar){
        setTimeout(insertionsort, speed);
    }else{
        sorted = true;
    }

}

function selectionsort(){
    if(sorted){
        ready();
        progression = 0;
    };

    smallest = 1000;
    smallestIndex = 0;
    for(let i = progression; i < 100; i++){
        if(poles[i] < smallest){
            smallest = poles[i];
            smallestIndex = i;
        }
    }
    poles[smallestIndex] = poles[progression]
    poles[progression] = smallest;


    progression++;
    paint();
    if(progression != 101 && !stopvar){
        setTimeout(selectionsort, speed);
    }else{
        sorted = true;
    }

}

function bubbelsort(){
    if(sorted){
        ready();
    };
    sorted = true;
    for(let i = 0; i < 99; i++){
        if(poles[i] > poles[i+1]){
            temp = poles[i+1];
            poles[i+1] = poles[i];
            poles[i] = temp;
            sorted = false;
        }
    }
    paint();
    if(!sorted && !stopvar){
        console.log(poles)
        setTimeout(bubbelsort, speed);
    }else{
        sorted = true;
    }

}
function stop(){
    stopvar = true;
}
function getRndInteger(max) {
    return Math.floor(Math.random() * max);
  }