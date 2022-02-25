
$(function () {
  var canvas = $("#editGraph")[0];
  var ctx = canvas.getContext("2d");

  var nodes, roads, nodeNameToCoords;
  var hitNode, middleCoords;
  selectPreset('preset1');  

  var offsetX=canvas.offsetLeft;
  var offsetY=canvas.offsetTop;


function getNodes(roads){
    var nodes = []
    roads.forEach(road => {
        if(!nodes.includes(road[0])){
            nodes.append(road[0])
        }
        if(!nodes.includes(road[1])){
            nodes.append(road[1])
        }
    });
    return nodes;
}

function createNodeNameToCoords(nodes){
  let ret = {};
  nodes.forEach(node => {
    ret[node[0]] = [node[1], node[2]]
  });
  return ret
}

function fillRoads(ctx, roads, nodeNameToCoords){
  roads.forEach(road => {
    ctx.beginPath();
    ctx.fillStyle = 'red';
    let begiCoords = nodeNameToCoords[road[0]]
    let endCoords = nodeNameToCoords[road[1]]
    ctx.moveTo(begiCoords[0], begiCoords[1]);
    ctx.lineTo(endCoords[0], endCoords[1]);
    ctx.stroke();
    
    let middleCoords = [(begiCoords[0]+endCoords[0])/2, (begiCoords[1]+endCoords[1])/2]
    ctx.beginPath();
    ctx.fillStyle = '#3d3d3d';
    ctx.fillRect(middleCoords[0]-10,middleCoords[1]-10, 20, 20 )
    ctx.fillStyle = '#FFFFFF';
    ctx.font = "16px Arial";
    ctx.fillText(road[2],middleCoords[0]-10,middleCoords[1]+5)
    ctx.fill();


  });
}

function fillNodes(ctx, nodes){
  nodes.forEach(node => {
    let x = node[1]
    let y = node[2]
    ctx.fillStyle = "#141414";
    ctx.beginPath();
    ctx.arc(x, y , 20, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.font = "20px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(node[0],x-10,y+5)
    ctx.fill();

    
  });
}

async function reFill(){
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 900, 700);
  nodeNameToCoords = createNodeNameToCoords(nodes)
  fillRoads(ctx, roads, nodeNameToCoords);
  fillNodes(ctx, nodes);
}

function fillPreset(ctx, btn){
    var presets = {};
    presets['preset1'] = [[
      ['S', '1', 2],
      ['S', '2', 3],
      ['1', '2', 2],
      ['1', '3', 4],
      ['2', '3', 4],
    ], [
      ['S', 200,300],
      ['1', 300,200],
      ['2', 300,400],
      ['3', 400,300],
    ]]
    presets['preset2'] = [[
    ['S', '1', 1],
    ['S', '7', 6],
    ['S', '12', 16],
    ['1', '8', 8],
    ['7', '8', 7],
    ['7', '12', 17],
    ['12', '13', 25],
    ['12', '16', 24],
    ['16', '17', 28],
    ['8', '13', 18],
    ['17', '18', 29],
    ['13', '18', 26],
    ['8', '2', 9],
    ['2', '14', 10],
    ['2', '3', 2],
    ['14', '15', 23],
    ['15', '18', 27],
    ['18', '19', 30],
    ['19', '20', 31],
    ['10', '20', 21],
    ['10', '19', 20],
    ['9', '15', 19],
    ['3', '9', 11],
    ['4', '9', 12],
    ['3', '4', 3],
    ['4', '5', 4],
    ['5', '6', 5],
    ['5', '10', 13],
    ['6', '11', 15],
    ['6', '10', 14],
    ['11', '20', 22],
    ['9', '10', 0],
    ['10', '11', 0]
    ],[
  ['S', 40, 600],
  ['12', 70, 300],
  ['16', 120, 100],
  ['7',   200, 400],
  ['1',   300, 600],
  ['8',   350, 300],
  ['13',   300, 200],
  ['17',   250, 100],
  ['2',   400, 600],
  ['14',   400, 200],
  ['3',   500, 550],
  ['4',   580, 600],
  ['9',   500, 300],
  ['15',   500, 200],
  ['18',   450, 100],
  ['5',   680, 600],
  ['10',   650, 300],
  ['19',   650, 100],
  ['6',   850, 600],
  ['11',   850, 300],
  ['20',   850, 100]]]
    presets['preset3'] = [
      [],[
      ['S', 300, 300]]
    ]
    nodes = presets[btn][1]
    roads = presets[btn][0]
    //console.log(nodes)
    reFill()
}

function selectPreset(btn){
    fillPreset(ctx, btn)

}

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
    
    
          selectPreset(btn);
        });
      }
})

function checkHitNode(){
  hitNode = undefined
  nodes.forEach(node => {
    //console.log(node, Math.abs(mouseX- node[1]) < 20, Math.abs(mouseY - node[2]))
    if (Math.abs(mouseX- node[1]) < 20 && Math.abs(mouseY- node[2]) < 20){
      console.log('hit a node');
      hitNode = node;
      return;
    }

  });
}

function handleEnter(e) {
  console.log('handle enter')
  var keyCode = e.keyCode;
  if (keyCode === 13) {
      fillWeightText(this.value);
      document.body.removeChild(this);
      hasInput = false;
  }
}

async function editTextWeight(defaultValue){
    let input = document.createElement('input');

    input.type = 'text';
    input.style.position = 'fixed';
    input.style.background = 'blue';
    input.defaultValue = defaultValue;
    input.style.left = (middleCoords[0] - 4) + 'px';
    input.style.top = (middleCoords[1] - 4) + 'px';

    input.onkeydown = handleEnter;

    $('#canvasDiv')[0].appendChild(input);

    input.focus();

    hasInput = true;

}

function fillWeightText(newWeight){
  console.log('filling', middleCoords)
  ctx.beginPath();
  ctx.fillStyle = '#3d3d3d';
  ctx.fillRect(middleCoords[0]-10,middleCoords[1]-10, 20, 20 )
  ctx.fillStyle = '#FFFFFF';
  ctx.font = "16px Arial";
  console.log('filled red')
  console.log('filled wirhg')
  ctx.fillText(newWeight,middleCoords[0]-10,middleCoords[1]+5)
  ctx.fill();

}

async function checkHitRoadWeight(){
  roads.forEach(road => {
    let begiCoords = nodeNameToCoords[road[0]]
    let endCoords = nodeNameToCoords[road[1]]
    middleCoords = [(begiCoords[0]+endCoords[0])/2, (begiCoords[1]+endCoords[1])/2]
    if (Math.abs(mouseX- middleCoords[0]) < 20 && Math.abs(mouseY- middleCoords[1]) < 20){
      editTextWeight(road[2]);
      return
    }

  });

}

function handleMouseDown(e){
  mouseX=parseInt(e.clientX-offsetX);
  mouseY=parseInt(e.clientY-offsetY);
  //console.log('mousednw', mouseX, mouseY)

  checkHitNode()
  checkHitRoadWeight()



}

async function moveNode(){
  let i = nodes.indexOf(hitNode)
  nodes.splice(i,1)
  hitNode[1] = mouseX;
  hitNode[2] = mouseY;
  await nodes.push(hitNode)
  await reFill()


}
async function handleMouseUp(e){
  mouseX = parseInt(e.clientX-offsetX);
  mouseY = parseInt(e.clientY-offsetY);
  console.log('mouseup', mouseX, mouseY);

  if (hitNode){
    moveNode ()
  }
  


}


$('body').on('mousedown', '#editGraph', function(e){handleMouseDown(e);});
$('body').on('mouseup', '#editGraph', function(e){handleMouseUp(e);});
});
// TODO the nodes and edges
// default
// preset
// edited preset
// PRIORITY TODO VIEW A GRAPH

// TODO select algorithm/purpuse
// From list

// TODO View solutions 
// TODO View algorithm in action

