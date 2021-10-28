function rngnumber(){
    lown = document.getElementById('lown').value;
    highn = document.getElementById('highn').value;
    res = Math.floor(getRndInteger(lown, highn).toString());
    res = res.toString();
    document.getElementById('resRngNum').innerHTML = res;
    console.log('res', res)
    
}
function getRndInteger(min, max) {
    return Math.random() * (max - min) + min;
}

function spacedwords(){
    text = document.getElementById("word").value.split(' ');
    for(let i = 0; i < text.length; i++){
        if(text[i] == ''){
            text.splice(i, 1)
        }
    }
    nwords = document.getElementById('nwords').value;
    reswords = []
    for(let i = 0; i < nwords; i++){
        reswords = reswords+ ' ' + (text.splice(getRndInteger(0,text.length), 1))
    }
    document.getElementById('resSpaceWords').innerHTML = reswords;
    console.log('res', reswords)


}
function nlwords(){
    text = document.getElementById("word").value.split('\n');
    for(let i = 0; i < text.length; i++){
        if(text[i] == '\n'){
            text.splice(i, 1)
        }
    }
    nwords = document.getElementById('nwords').value;
    reswords = []
    for(let i = 0; i < nwords; i++){
        reswords = reswords+ ' ' + (text.splice(getRndInteger(0,text.length), 1))
    }
    document.getElementById('resNlWords').innerHTML = reswords;
    console.log('res', reswords)


}
//document.getElementById("myTextarea").value