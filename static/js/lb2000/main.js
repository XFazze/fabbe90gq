
function settingsBtn(id, default_on) {
    //console.log('settingsbtn')
    element = document.getElementById(id)
    //console.log("color: ", element.style.color)
    if (element.style.color == 'var(--main-color)') {
      element.style.color = 'var(--error-color)';
      var element = document.getElementsByClassName(id);
      for (i = 0; i < element.length; i++) {
        element[i].style.display = 'none';
      }
    }
    else if (element.style.color == 'var(--error-color)') {
      //console.log('not red')
      element.style.color = 'var(--main-color)';
      var element = document.getElementsByClassName(id);
      for (i = 0; i < element.length; i++) {
        element[i].style.display = 'flex';
      }
    }
    else {
      if (default_on) {
        element.style.color = 'var(--error-color)';
        var element = document.getElementsByClassName(id);
        for (i = 0; i < element.length; i++) {
          element[i].style.display = 'none';
        }
      }
      else {
        element.style.color = 'var(--main-color)';
        var element = document.getElementsByClassName(id);
        for (i = 0; i < element.length; i++) {
          element[i].style.display = 'flex';
  
        }
      }
    }
    //console.log('button pressed', id)
  };
  
  function taskbarBtn(id) {
    //console.log('showhidebtn')
    var element = document.getElementsByClassName(id);
    var childs = document.getElementById('contents').children;
    //console.log(childs)
    for (i = 0; i < childs.length; i++) {
      childs[i].style.display = 'none';
    }
    for (i = 0; i < element.length; i++) {
      element[i].style.display = 'block';
    }
  
    var element = document.getElementById(id);
    var childs = document.getElementById('taskbarinner').children;
    for (i = 0; i < childs.length; i++) {
      //console.log('claslist1', childs[i].classList)
      childs[i].classList.remove("bg-gray-800");
      //console.log('claslist2', childs[i].classList)
    }
    //console.log('claslist3', element.classList)
    element.classList.add("bg-gray-800");
    //console.log('claslist3', element.classList)
  };
  
  function showhideBtn(show, hide) {
    //console.log('showhidebtn')
    for (i = 0; i < hide.length; i++) {
      temp = hide[i];
      var element = document.getElementsByClassName(temp);
      for (o = 0; o < element.length; o++) {
        element[o].style.display = 'none';
      }
  
    }
    for (i = 0; i < show.length; i++) {
      temp = show[i];
      var element = document.getElementsByClassName(temp);
      for (o = 0; o < element.length; o++) {
        element[o].style.display = 'flex';
      }
  
    }
  };
  
  function showmatchup(id) {
    var element = document.getElementsByClassName('runestree');
    for (i = 0; i < element.length; i++) {
      element[i].style.display = 'none';
  
    }
    var hide = ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'UTILITY']
    for (i = 0; i < hide.length; i++) {
      temp = hide[i];
      var element = document.getElementsByClassName(temp);
      for (o = 0; o < element.length; o++) {
        element[o].style.display = 'none';
      }
    }
    var usermatches = document.getElementsByClassName(id);
    for (i = 0; i < usermatches.length; i++) {
      parentElement = usermatches[i].parentElement.children;
      for (o = 0; o < parentElement.length; o++) {
        parentElement[o].style.display = 'block';
      }
    }
  };