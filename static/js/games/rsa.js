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
    
    document.getElementById("dencrypt").addEventListener("click", function (event) {
        var n = Number(document.getElementById('n').innerHTML)
        var d = Number(document.getElementById('d').innerHTML)
        var encryptedmsg = Number(document.getElementById('encryptedmsg').innerHTML)
        console.log('decrypting', encryptedmsg, d, n, BigInt(encryptedmsg)**BigInt(d));
        document.getElementById("decryptedmsg").innerHTML = Math.pow(encryptedmsg, d)%n;
    });

};
