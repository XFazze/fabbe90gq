window.onload = function () {
    var gcd = function(a, b) {
        if (!b) {
          return a;
        }
      
        return gcd(b, a % b);
      }
    function egcd(num1,num2) {
        var pp  = 0;
        var b0 = num2
        let q, r, m, n1
        let x = 0 
        let y = 1
        let u = 1
        let v = 0
        while (num1 != 0){
            pp = pp +1
            if (pp == 20){
                break
            }
            console.log('one round', num1, num2, q, r, m, n1)
            q = Math.floor(num2/num1)
            r =  num2%num1
            m =  x-u*q
            n1 = y-v*q
            num2 = num1
            num1 = r
            x = u
            y = v
            u = m
            m=n1
        }
    
    if(x < 0){
        x = b0+x;}
    return x
    }

    document.getElementById("calcned").addEventListener("click", function (event) {
        var p = Number(document.getElementById('p').value)
        var q = Number(document.getElementById('q').value)
        var n = p*q
        console.log('n: ', n)
        var rp = (p-1)*(q-1)
        console.log('rp: ', rp)
        document.getElementById("n").innerHTML = n;
        for (var e1 = 5; e1 < n; e1++) {
            if(gcd(rp,e1)==1){
                break;
            }
        }
        console.log('e: ', e1)
        document.getElementById("e").innerHTML = e1;

        var d = egcd(e1, rp)
        console.log('d: ', d)
        document.getElementById("d").innerHTML = d;
    });
    
    document.getElementById("encrypt").addEventListener("click", function (event) {
        var n = Number(document.getElementById('n').innerHTML)
        var e = Number(document.getElementById('e').innerHTML)
        var message = Number(document.getElementById('message').value)
        console.log(message, e, n);
        document.getElementById("encryptedmsg").innerHTML = Math.pow(message, e)%n;
    });

    /*
    document.getElementById("dencrypt").addEventListener("click", function (event) {
        var n = Number(document.getElementById('n').innerHTML)
        var d = Number(document.getElementById('d').innerHTML)
        var encryptedmsg = Number(document.getElementById('encryptedmsg').innerHTML)
        var result = decrypt(encryptedmsg, d, n);
        console.log('decrypting', encryptedmsg, d, n, result);
        document.getElementById("decryptedmsg").innerHTML = result;
    });
    */

    document.getElementById("hack").addEventListener("click", function (event) {
        var nhacck = Number(document.getElementById('nhack').value);
        var ehacck = Number(document.getElementById('ehack').value);
        var p = false;
        var pp;
        for(let i = 2; i < nhacck; i++){
            if(nhacck%i == 0){
                if (!p){
                    p = i;
                }else{
                    pp = i;
                    break;
                }
            }
        };
        console.log('succecssfull hack', p, pp)
        document.getElementById("phack").innerHTML = p;
        document.getElementById("qhack").innerHTML = pp;
        
        console.log('n: ', n);
        var rp = (p-1)*(pp-1);
        console.log('rp: ', rp);

        var d = egcd(ehacck, rp);
        console.log('d: ', d);
        document.getElementById("ddhack").innerHTML = d;
    });
};


function powmod(m, d, n){
    //console.log('powmod', m,d,n);
    for(let i = 2; i < Math.sqrt(d); i++){
        if(d % i == 0){
            d = d/i;
            console.log('bbbbb', m,d,n,i);
            m = (m**i)%n;
            console.log('before', m,d,n);
            m = powmod(m, d, n);
            break;

        };

    };
    return (m** d)%n

};
