window.onload = function(){ 
    document.getElementById("name").onclick = function() {
      document.getElementById("namediv").style.display = "block";
      document.getElementById("vannerdiv").style.display = "none";
      document.getElementById("loggbokdiv").style.display = "none";
      document.getElementById("paminnelserdiv").style.display = "none";
      document.getElementById("Installningardiv").style.display = "none";
      }
    document.getElementById("vanner").onclick = function() {
      document.getElementById("namediv").style.display = "none";
      document.getElementById("vannerdiv").style.display = "block";
      document.getElementById("loggbokdiv").style.display = "none";
      document.getElementById("paminnelserdiv").style.display = "none";
      document.getElementById("Installningardiv").style.display = "none";
    }
    document.getElementById("loggbok").onclick = function() {
      document.getElementById("namediv").style.display = "none";
      document.getElementById("vannerdiv").style.display = "none";
      document.getElementById("loggbokdiv").style.display = "block";
      document.getElementById("paminnelserdiv").style.display = "none";
      document.getElementById("Installningardiv").style.display = "none";
    }
    document.getElementById("paminnelser").onclick = function() {
      document.getElementById("namediv").style.display = "none";
      document.getElementById("vannerdiv").style.display = "none";
      document.getElementById("loggbokdiv").style.display = "none";
      document.getElementById("paminnelserdiv").style.display = "block";
      document.getElementById("Installningardiv").style.display = "none";
    }
    document.getElementById("installnigar").onclick = function() {
      document.getElementById("namediv").style.display = "none";
      document.getElementById("vannerdiv").style.display = "none";
      document.getElementById("loggbokdiv").style.display = "none";
      document.getElementById("paminnelserdiv").style.display = "none";
      document.getElementById("Installningardiv").style.display = "block";
    }
    document.getElementById("trainBtn").onclick = function() {
      document.getElementById("training_inpt").style.display = "block";
      var lenght = document.createElement("INPUT");
      lenght.setAttribute("type", "text");
      lenght.setAttribute("value", "Längd");
      lenght.setAttribute("id", "lenght");
      document.getElementById("training_inpt").appendChild(lenght);
      var typ = document.createElement("INPUT");
      typ.setAttribute("type", "text");
      typ.setAttribute("value", "Styrka");
      typ.setAttribute("id", "typ");
      document.getElementById("training_inpt").appendChild(typ);
      var feeliong = document.createElement("INPUT");
      feeliong.setAttribute("type", "text");
      feeliong.setAttribute("value", "1/10");
      feeliong.setAttribute("id", "feeliong");
      document.getElementById("training_inpt").appendChild(feeliong);
      var comment = document.createElement("INPUT");
      comment.setAttribute("type", "text");
      comment.setAttribute("value", "Känslan");
      comment.setAttribute("id", "comment");
      document.getElementById("training_inpt").appendChild(comment);
    }
    document.getElementById("train_closeBtn").onclick = function() {
      document.getElementById("training_inpt").style.display = "none";
      var bigdiv = document.createElement("div");
      bigdiv.setAttribute('id', 'bigdiv')
      document.getElementById("loggbokdiv").appendChild(bigdiv);

      var typ = document.getElementById("typ");
      var typp = document.createElement("h3");
      typp.setAttribute('class', 'inline_train');
      typp.textContent = typ.value;
      typ.remove();
      document.getElementById("bigdiv").appendChild(typp)


      var lenght = document.getElementById("lenght");
      var lenghtp = document.createElement("h3");
      lenghtp.setAttribute('class', 'inline_train');
      lenghtp.textContent = ":  " + lenght.value;
      lenght.remove();
      document.getElementById("bigdiv").appendChild(lenghtp)

      var timep = document.createElement("h3");
      timep.setAttribute('class', 'inlne_right');
      timep.textContent = "just nu";
      document.getElementById("bigdiv").appendChild(timep)
       
      var feeliongtp = document.createElement("br");
      document.getElementById("bigdiv").appendChild(feeliongtp)


      var feeliongtp = document.createElement("h4");
      feeliongtp.setAttribute('class', 'inline_train');
      feeliongtp.textContent = "Din känsla: ";
      document.getElementById("bigdiv").appendChild(feeliongtp)

      var feeliong = document.getElementById("feeliong");
      var feeliongp = document.createElement("h4");
      feeliongp.setAttribute('class', 'inlne_right');
      feeliongp.textContent = feeliong.value;
      feeliong.remove();
      document.getElementById("bigdiv").appendChild(feeliongp)

      var comment = document.getElementById("comment");
      var commentp = document.createElement("p");
      commentp.textContent = comment.value;
      comment.remove();
      document.getElementById("bigdiv").appendChild(commentp)
      
      var feeliongtp = document.createElement("br");
      document.getElementById("bigdiv").appendChild(feeliongtp)
      var feeliongtp = document.createElement("br");
      document.getElementById("bigdiv").appendChild(feeliongtp)

      console.log(bigdiv)
    }
    
    };
    