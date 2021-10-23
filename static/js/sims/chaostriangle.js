var ctx;
var triangles = [];
var PP = 0;
var newt;
var t0 = [[0,700], [1000,700], [500,0], 1];
window.onload = function () {
    var canvas = document.getElementById("game-layer");
    var canvasLeft = canvas.offsetLeft + canvas.clientLeft;
    var canvasTop = canvas.offsetTop + canvas.clientTop;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 1000, 700);

    console.log('started');
    pone(t0);
    console.log('created main traiangle');
    //newt = create(t0);
    //pone(newt[2]);
    //newt = create(newt[2]);
    //pone(newt[2]);


};

function randomfill(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 1000, 700);
    console.log('randomfill called')
    pone(t0);
    triangles = [];
    var temp = create(t0);
    var rng;
    for (let i = 0; i < 1234; i++) {
        // paint middle 
        pone(temp[2]);

        // add triangles to all
        for (let i = 0; i < temp.length; i++) {
            //console.log(temp[i][3]);
            triangles.push(temp[i]);
        };
        
        // get a random new triangle
        rng =  getRndInteger(triangles.length);
        var tempt = triangles[rng];
        triangles.pop(rng, 1);

        // create 4 new triangles in the new triangle
        temp = create(tempt)
    };

};

// triangle is a tuple {bottomleft, bottomright, top} of coords
// every instance in tuple is a tuple of 2 cords
// first triangle is bottom right topcord 
function create(triangle){
    let bl = [triangle[0],
    [triangle[0][0]+(triangle[1][0]-triangle[0][0])/2,  triangle[1][1]], 
    [triangle[0][0]+(triangle[1][0]-triangle[0][0])/4, triangle[2][1]+(triangle[0][1] - triangle[2][1])/2],
    triangle[3]*1];

    let br = [[triangle[0][0]+(triangle[1][0]-triangle[0][0])/2, triangle[1][1]],
    triangle[1],
    [triangle[1][0]-(triangle[1][0]-triangle[0][0])/4, triangle[2][1]+(triangle[0][1] - triangle[2][1])/2],
    triangle[3]*1];

    let mid = [[triangle[0][0]+(triangle[1][0]-triangle[0][0])/4, triangle[2][1]+(triangle[0][1]-triangle[2][1])/2],
    [triangle[1][0]-(triangle[1][0]-triangle[0][0])/4, triangle[2][1]+(triangle[0][1]-triangle[2][1])/2],
    [triangle[0][0]+(triangle[1][0]-triangle[0][0])/2, triangle[0][1]],
    triangle[3]*-1];

    let top = [[triangle[0][0]+(triangle[1][0]-triangle[0][0])/4, triangle[2][1]+(triangle[0][1]+triangle[2][1])/2],
    [triangle[1][0]-(triangle[1][0]-triangle[0][0])/4, triangle[2][1]+(triangle[0][1]+triangle[2][1])/2],
    [triangle[0][0]+(triangle[1][0]-triangle[0][0])/2, triangle[2][1]],
    triangle[3]*1];
    if(bl[2][1] > 700){
        console.log('bl is higher than 700')
    };
    if(br[2][1] > 700){
        console.log('br is higher than 700')
    };
    if(mid[2][1] > 700){
        console.log('miud is higher than 700')
    };
    if(top[2][1] > 700){
        console.log('bl is higher than 700')
    };
    return [bl, br, mid, top]
};


function pone(t){
    ctx.beginPath();
    //var randomColor = '#' +Math.floor(Math.random()*16777215).toString(16);
    //ctx.fillStyle = randomColor;
    if(t[3] > 0){
        ctx.fillStyle = "black";
    }else{
        ctx.fillStyle = "white";
    };
    ctx.moveTo(t[0][0],t[0][1]);
    ctx.lineTo(t[1][0],t[1][1]);
    ctx.lineTo(t[2][0], t[2][1]);
    ctx.fill();
    ctx.closePath();

    
};

function getRndInteger(max) {
    return Math.floor(Math.random() * max);
  }