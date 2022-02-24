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

function fillPreset(ctx, btn){
    preset1 = [
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
    ['6', '11', 15],
    ['6', '10', 14],
    ['11', '20', 22],
    ['9', '10', 0],
    ['10', '11', 0]
    ]
    let nodes = getNodes(roads)
}


function selectPreset(btn){
    var editGraph = $('#editGraph')[0];
    var ctx = editGraph.getContext("2d");
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 900, 700);
    fillPreset(ctx, btn)

}


window.onload = function () {
    selectPreset('preset1');
};


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


// TODO the nodes and edges
// default
// preset
// edited preset
// PRIORITY TODO VIEW A GRAPH

// TODO select algorithm/purpuse
// From list

// TODO View solutions 
// TODO View algorithm in action

