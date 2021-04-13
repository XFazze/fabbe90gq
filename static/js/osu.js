var canvas = document.getElementById("game-layer");
var canvasLeft = canvas.offsetLeft + canvas.clientLeft;
var canvasTop = canvas.offsetTop + canvas.clientTop;
var context = canvas.getContext("2d");
var elements = [];


canvas.addEventListener('click', function(event) {
    var x = event.pageX - canvasLeft,
        y = event.pageY - canvasTop;

    elements.forEach(function(element) {
        if (y > element.top && y < element.top + element.height 
            && x > element.left && x < element.left + element.width) {
            alert('clicked an element');
        }
    });

}, false);

elements.push({
    colour: '#05EFFF',
    width: 150,
    height: 100,
    top: 20,
    left: 15
});

elements.forEach(function(element){
    context.fillStyle = element.colour;
    context.fillRect(element.left, element.top, element.width, element.height);
});​
