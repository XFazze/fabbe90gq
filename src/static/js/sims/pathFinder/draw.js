
  function fillRoads(ctx, roads, nodeNameToCoords){
    roads.forEach(road => {
      ctx.beginPath();
      ctx.strokeStyle = 'black'
      ctx.fillStyle = 'red';
      let begiCoords = nodeNameToCoords[road[0]]
      let endCoords = nodeNameToCoords[road[1]]
      ctx.moveTo(begiCoords[0], begiCoords[1]);
      ctx.lineTo(endCoords[0], endCoords[1]);
      ctx.stroke();
      
      let tempMiddleCoords = [(begiCoords[0]+endCoords[0])/2, (begiCoords[1]+endCoords[1])/2]
      ctx.beginPath();
      ctx.fillStyle = '#3d3d3d';
      ctx.fillRect(tempMiddleCoords[0]-10,tempMiddleCoords[1]-10, 20, 20 )
      ctx.fillStyle = '#FFFFFF';
      ctx.font = "16px Arial";
      ctx.fillText(road[2],tempMiddleCoords[0]-10,tempMiddleCoords[1]+5)
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
  
  async function reFill(canvasId, roads, nodes){
    var ctx = $(`#${canvasId}`)[0].getContext("2d");
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 900, 700);
    nodeNameToCoords = createNodeNameToCoords(nodes)
    fillRoads(ctx, roads, nodeNameToCoords);
    fillNodes(ctx, nodes);
    return nodeNameToCoords
  }

  function fillText(text, middleCoords, graph, color='red', fontSize=16, xPush=0){
    var ctx = $(`#${graph}`)[0].getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(middleCoords[0]-fontSize/2 + xPush*fontSize    ,middleCoords[1]-fontSize/2, fontSize+2, fontSize+2 )
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `${fontSize}px Arial`;
    ctx.fillText(text,middleCoords[0]-fontSize/2 + xPush*fontSize,middleCoords[1]+5)
    ctx.fill();
  
  }
async function markSolution(nodes, roads, solution){
    var ctx = $(`#solutionGraph`)[0].getContext("2d");
    nodeNameToCoords = createNodeNameToCoords(nodes)
    let doubles = []
    for (let i = 1; i < solution.length; i++) {
        const road = solution[i];
        const road2 = solution[i-1];
        
      let begiCoords = nodeNameToCoords[road]
      let endCoords = nodeNameToCoords[road2]
      
      let tempMiddleCoords = [(begiCoords[0]+endCoords[0])/2, (begiCoords[1]+endCoords[1])/2]
      let oneThird = [(begiCoords[0]+tempMiddleCoords[0])/2, (begiCoords[1]+tempMiddleCoords[1])/2]
      let twoThird = [(tempMiddleCoords[0]+endCoords[0])/2, (tempMiddleCoords[1]+endCoords[1])/2]
      let halfThird = [(tempMiddleCoords[0]+oneThird[0])/2, (tempMiddleCoords[1]+oneThird[1])/2]
      doubles.push(halfThird)
      let doubleAmount = betterInclude(doubles, halfThird)-1
      canvas_arrow(ctx,tempMiddleCoords, oneThird)
      fillText(i, halfThird, 'solutionGraph', 'blue', 12, doubleAmount)
      

  
  
}


}
async function canvas_arrow(ctx, begiCoords, endCoords) {


    var headlen = 20; // length of head in pixels
    var dx = endCoords[0] - begiCoords[0];
    var dy = endCoords[1] - begiCoords[1];
    var angle = Math.atan2(dy, dx);
    ctx.beginPath()
    ctx.moveTo(begiCoords[0], begiCoords[1]);
    ctx.lineTo(endCoords[0], endCoords[1]);
    ctx.lineTo(endCoords[0] - headlen * Math.cos(angle - Math.PI / 6), endCoords[1] - headlen * Math.sin(angle - Math.PI / 6));
   
    ctx.moveTo(endCoords[0], endCoords[1]);
    ctx.lineTo(endCoords[0] - headlen * Math.cos(angle + Math.PI / 6), endCoords[1] - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath()

    ctx.lineWidth = 2
    ctx.strokeStyle = 'green'
    ctx.stroke()
  }