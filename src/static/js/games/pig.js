var playing, p;
window.onload = function () {


    }();

function start(){
    document.getElementById('winner').style.display = 'none';
    document.getElementById('pname').innerHTML = 'Player 1';
    document.getElementById('gain').innerHTML = '0';
    document.getElementById('wonDiv').style.display = 'none';
    var playercount = document.getElementById('player').value
    var div = document.getElementById('players')
    div.innerHTML = ''
    for (let index = 1; index <= playercount; index++) {
        var newdiv = document.createElement('div');


        var poop = document.createElement('p');
        poop.innerHTML = 'Player '+index+"="
        poop.classList.add('name')
        newdiv.appendChild(poop)

        var poop = document.createElement('p');
        poop.innerHTML = '0'
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
    document.getElementById('wonDiv').style.display = 'none';
    var gain = document.getElementById('gain').innerHTML;

    if (gain == 'Winnings') {
        gain = 0;
    }else{
        gain = Number(gain);
    }
    rn = getRndInteger(1,6)
    document.getElementById('rolling').style.display = 'none';

    if (rn == 1) {
        document.getElementById('boom'+getRndInteger(1,4)).style.display = 'block';
        document.getElementById('boom').style.display = 'block';
        document.getElementById('buttons').style.display = 'none';
        document.getElementById('next').style.display = 'block';
        document.getElementById('gain').innerHTML = 0;
        document.getElementById('pool').style.display = 'none';

    }else{
        document.getElementById('wonDiv').style.display = 'flex';
        document.getElementById('won').innerHTML = rn;
        console.log(Number(gain)+rn)
        gain += rn;
        document.getElementById('gain').innerHTML = gain
    }
}

function hold(){
    var playerNum = Number(document.getElementById('playerNum').innerHTML);
    var money = document.getElementById('p'+playerNum).childNodes[1].innerHTML;
    var gain = Number(document.getElementById('gain').innerHTML);
    newMoney = Number(money) + gain;
    document.getElementById('wonDiv').style.display = 'none';
    if(newMoney >= 100){
        document.getElementById('buttons').style.display = 'none';
        document.getElementById('pool').style.display = 'none';
        document.getElementById('winner').style.display = 'block';
        return
    }
    document.getElementById('p'+playerNum).childNodes[1].innerHTML = newMoney;
    console.log(newMoney, money)
    document.getElementById('boom').style.display = 'none';
    document.getElementById('boom1').style.display = 'none';
    document.getElementById('boom2').style.display = 'none';
    document.getElementById('boom3').style.display = 'none';
    document.getElementById('next').style.display = 'none';
    document.getElementById('buttons').style.display = 'block';
    document.getElementById('gain').innerHTML = '0';
    document.getElementById('pool').style.display = 'flex';
    playerNum++;
    if(playerNum > document.getElementById('players').childNodes.length){
        playerNum = 1
    }
    document.getElementById('playerNum').innerHTML = playerNum
    document.getElementById('pname').innerHTML = 'Player ' + playerNum

}
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}