
$(function () {
  var letters = createLetters()
  var canvas = $("#editGraph")[0];
  var ctx = canvas.getContext("2d");
  var mousePosition = {x:0, y:0};

  
  var offsetX=canvas.offsetLeft;
  var offsetY=canvas.offsetTop;
  console.log($("#editGraph")[0].offsetTop, canvas.offsetTop)

  var nodes, roads, nodeNameToCoords;
  var hitNode, hitRoadWeigh;
  var algorithm = 'eulerVagBruteForce';
  r = fillPreset('preset1');
  nodes = r.nodes
  roads = r.roads
  nodeNameToCoords = r.nodeNameToCoords





// menu button
$(function () {
    for (let btnI = 0; btnI < $('#part').children().length; btnI++) {
      let btn = $('#part').children()[btnI].id;
  
      $('#' + btn).bind('click', async function () {
        $('#' + btn)
          .parent()
          .children()
          .removeClass('bg-gray-600');

        $('#' + btn).addClass('bg-gray-600');
  
        $('#' + btn)
          .parent()
          .parent()
          .children()
          .addClass('hidden');
        $('#' + btn)
          .parent()
          .removeClass('hidden');
  
        $('#Div' + btn).removeClass('hidden');
      });
    }
  });
 
// preset button
$(function() {
    for (let btnI = 0; btnI < $('#presetList').children().length; btnI++) {
        let btn = $('#presetList').children()[btnI].id;
    
        $('#' + btn).bind('click', async function () {
          $('#' + btn)
            .parent()
            .children()
            .removeClass('bg-gray-600');
  
          $('#' + btn).addClass('bg-gray-600');
    
    
          r = fillPreset(btn);
          nodes = r.nodes
          roads = r.roads
          nodeNameToCoords = r.nodeNameToCoords
        });
      }
})

// Select algorithm button
$(function () {
  for (let categoriesI = 0; categoriesI < $('#algorithms').children().length; categoriesI++) {
    let categorie = $('#algorithms').children()[categoriesI].children;
    for (let algorithmI = 0; algorithmI < categorie.length; algorithmI++) {
      if(categorie[algorithmI].tagName == 'H3'){
        continue
      }
      const algorithmId = categorie[algorithmI].id;
      $('#' + algorithmId).bind('click', async function () {

        $('#' + algorithmId)
          .parent()
          .parent()
          .children()
          .children()
          .removeClass('bg-gray-600');

        $('#' + algorithmId).addClass('bg-gray-600');
        algorithm = algorithmId
      });

  }
  }
});


async function editTextWeight(defaultValue, middleCoords, offsetX,offsetY, road){
  let input = document.createElement('input');

  input.type = 'text';
  input.style.position = 'fixed';
  input.style.background = 'blue';
  input.style.width = '20px';
  input.defaultValue = defaultValue;
  input.style.left = (middleCoords[0] - 10 + offsetX) + 'px';
  input.style.top = (middleCoords[1] - 10 + offsetY) + 'px';

  input.onkeydown = weightHandleEnter;

  $('#canvasDiv')[0].appendChild(input);

  input.select();

  hasInput = true;

}

function weightHandleEnter(e) {
  var keyCode = e.keyCode;
  if (keyCode === 13) {
      fixMiddleCoords = [parseInt(this.style.left.slice(0, -2))-offsetX+10, parseInt(this.style.top.slice(0,-2))-offsetY+10]
      
      let i = roads.indexOf(hitRoadWeigh)
      roads.splice(i, 1)
      hitRoadWeigh[2] = this.value
      roads.push(hitRoadWeigh)
      hitRoadWeigh = undefined
      fillText(this.value, fixMiddleCoords, 'editGraph');
      $('#canvasDiv')[0].removeChild(this);
      hasInput = false;
  }
}

async function handleMouseDown(e, nodes, roads){
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);
  //console.log(mouseX, offsetX)

  hitNode = await checkHitNode(mouseX, mouseY, nodes)

  await removeOldEditRoadWeight()

  r = await checkHitRoadWeight(roads, nodeNameToCoords,mouseX, mouseY)

  if(r){
    hitRoadWeigh = r.road
    middleCoords = r.middleCoords
    editTextWeight(hitRoadWeigh[2], middleCoords, offsetX,offsetY, hitRoadWeigh)
  }

  if(!hitRoadWeigh && !hitNode){
    a = await createNode([mouseX,mouseY], letters, nodes)
    nodeNameToCoords = a.nodeNameToCoords
    nodes = a.nodes
  }


}

async function handleMouseUp(e, nodes, roads){
  mouseX = parseInt(e.clientX-offsetX);
  mouseY = parseInt(e.clientY-offsetY);

  //console.log('mouseup', mouseX, mouseY, canvas);

  if (hitNode){
    chechNodeOrRoad(mouseX,mouseY , nodes, roads, hitNode)
  }
}

$('body').on('mousedown', '#editGraph', function(e){handleMouseDown(e, nodes,roads);});
$('body').on('mouseup', '#editGraph', function(e){handleMouseUp(e, nodes,roads);});


async function handleKeyDown(e){
  if(e.which == 32){
    deleteSomething(mousePosition)
  }
  if(e.which == 16){
    printGraph(nodes,roads)
  }
}
async function handleKeyUp(e){
  if(e.which == 32){
  }
}

$('body').on('keydown', function(e){handleKeyDown(e);});
$('body').on('keyup', function(e){handleKeyUp(e);});


$(document).bind('mousemove',function(mouseMoveEvent){
  mousePosition.x = mouseMoveEvent.pageX - offsetX;
  mousePosition.y = mouseMoveEvent.pageY - offsetY;
  });


function solve(){
  
$('#solutionList').empty()
  nameToFunctionReference = {
    'eulerVagBruteForce' : eulerVagBruteForce
  }
  roads = doubleSidedRoads(roads)
  hideErrors()
  fun = nameToFunctionReference[algorithm]
  console.log('noddd', nodes)
  let solutions = fun(roads, nodes)
  let sortedSolutions = formatSolutions(solutions)
  showSolutions(solutions, nodes, roads)
  drawSolution(nodes, roads, sortedSolutions[0], createNodeNameToCoords)

  console.log('SOLUTIONS: ', sortedSolutions)
}
$('#solve').click(solve)
$("#solutionList tr").click(function(){
  $(this).addClass('bg-slate-600').siblings().removeClass('bg-slate-600');    
  var value=$(this).find('td:first').html();
  alert(value);    
});
});

// TODO select algorithm/purpuse
// From list

// TODO View solutions 
// TODO View algorithm in action

