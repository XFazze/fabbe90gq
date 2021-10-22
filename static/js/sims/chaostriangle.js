var ctx;
var triangles = [];
var PP = 0;
window.onload = function () {
    var canvas = document.getElementById("game-layer");
    var canvasLeft = canvas.offsetLeft + canvas.clientLeft;
    var canvasTop = canvas.offsetTop + canvas.clientTop;
    ctx = canvas.getContext("2d");
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 1000, 700);

    var t0 = [[100,600], [900,600], [500,0], 1];
    console.log('started')
    paint(t0);

    console.log('outside while loop')


}

// triangle is a tuple {bottomleft, bottomright, top} of coords
// every instance in tuple is a tuple of 2 cords
// first triangle is bottom right topcord 

function paint(triangle){
    PP++;
    console.log("in while loop");
    ctx.beginPath();
    if(triangle[3] > 0){
        ctx.fillStyle = "black";
    }else{
        ctx.fillStyle = "yellow";
    }
    ctx.moveTo(triangle[0][0],triangle[0][1]);
    console.log('bottom left:', triangle[0][0],triangle[0][1]);
    ctx.lineTo(triangle[1][0],triangle[1][1]);
    console.log('bottom right:', triangle[1][0],triangle[1][1]);
    ctx.lineTo(triangle[2][0], triangle[2][1]);
    console.log('top:', triangle[2][0], triangle[2][1]);
    ctx.fill();
    ctx.closePath();
    // upside down can be by making the top coord y lower than the bottoms

    let bl = [triangle[0],
    [triangle[0][0]+(triangle[1][0]-triangle[0][0])/2,  triangle[1][1]], 
    [triangle[0][0]+(triangle[1][0]-triangle[0][0])/4, triangle[2][1]+(triangle[0][1] - triangle[2][1])/2],
    triangle[3]*-1];

    let br = [[triangle[0][0]+(triangle[1][0]-triangle[0][0])/2, triangle[1][1]],
    triangle[1],
    [triangle[1][0]-(triangle[1][0]-triangle[0][0])/4, triangle[2][1]+(triangle[0][1] - triangle[2][1])/2],
    triangle[3]*-1];

    let mid = [[triangle[0][0]+(triangle[1][0]-triangle[0][0])/4, triangle[2][1]+(triangle[0][1]+triangle[2][1])/2],
    [triangle[1][0]-(triangle[1][0]-triangle[0][0])/4, triangle[2][1]+(triangle[0][1]+triangle[2][1])/2],
    [triangle[0][0]+(triangle[1][0]-triangle[0][0])/2, triangle[0][1]],
    triangle[3]*-1];

    let top = [[triangle[0][0]+(triangle[1][0]-triangle[0][0])/4, triangle[2][1]/2],
    [triangle[1][0]-(triangle[1][0]-triangle[0][0])/4, triangle[2][1]/2],
    [(triangle[1][0]-triangle[0][0])/2, triangle[2][1]],
    triangle[3]*-1];


    print(bl, br, mid, top);
    if (PP < 10){
        setTimeout(paint(mid), 2000);
    };


};