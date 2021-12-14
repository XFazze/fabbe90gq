var playing, p;
window.onload = function () {


    }();

function start(){
    var playercount = document.getElementById('player').value
    var div = document.getElementById('players')
    div.innerHTML = ''
    //console.log(div)
    
    for (let index = 1; index <= playercount; index++) {
        var newdiv = document.createElement('div');
    
       
        var poop = document.createElement('p');
        poop.innerHTML = 'Player '+index+"-"
        poop.classList.add('name')
        newdiv.appendChild(poop) 

        var poop = document.createElement('p');
        poop.innerHTML = '10'
        poop.classList.add('money')
        newdiv.appendChild(poop)

        newdiv.id = 'p'+index
        newdiv.style.display = 'flex';
        newdiv.style.padding = '1rem';
        div.appendChild(newdiv)
    }        
    document.getElementById('play').style.display = 'block';
}

function roll(){
    document.getElementById('rolling').style.display = 'block';
    document.getElementById('won').style.display = 'none';
    document.getElementById('boom').style.display = 'none';
    var gain = document.getElementById('gain').innerHTML;
    console.log(gain)
    if (gain == 'Winnings') {
        gain = 0;
    }else{
        gain = Number(gain);
    }
    rn = getRndInteger(1,6)
    document.getElementById('rolling').style.display = 'none';
    if (rn == 1) {
        document.getElementById('boom').style.display = 'block';

    }else{
        var won = document.getElementById('won');
        won.style.display = 'block';
        won.innerHTML = rn;
        console.log(Number(gain)+rn)
        gain += rn;
        document.getElementById('gain').innerHTML = gain;

    }

}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}