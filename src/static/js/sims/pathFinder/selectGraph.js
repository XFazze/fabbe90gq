function createLetters(){
    let gigaFreeLetters = []
    let freeLetters = 'abcdefghijklmnopqrstuvwxyz'.split('') //ABCDEFGHIJKLMNOPQRSTUVWYZ
    freeLetters.forEach(letter => {
      freeLetters.forEach(letter2 => {
        gigaFreeLetters.push(letter+letter2)
      })
    });
    freeLetters = freeLetters.concat(gigaFreeLetters)
    return freeLetters
  }
  function createNodeNameToCoords(nodes){
    let ret = {};
    nodes.forEach(node => {
      ret[node[0]] = [node[1], node[2]]
    });
    return ret
  }
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
  
  
  function fillPreset(btn){
      var presets = {};
      presets['preset1'] = [
        [
        ['S', 'a', 2],
        ['S', 'b', 3],
        ['a', 'b', 2],
        ['a', 'E', 4],
        ['b', 'E', 4],
      ], [
        ['S', 200,300],
        ['a', 300,200],
        ['b', 300,400],
        ['E', 400,300],
      ]
      ]
      presets['preset2'] = [
        [
      ['S', 'cc', 1],
      ['S', '7', 6],
      ['S', '12', 16],
      ['cc', '8', 8],
      ['7', '8', 7],
      ['7', '12', 17],
      ['12', '13', 25],
      ['12', '16', 24],
      ['16', '17', 28],
      ['8', '13', 18],
      ['17', '18', 29],
      ['13', '18', 26],
      ['8', 'cd', 9],
      ['cd', '14', 10],
      ['cd', 'cd', 2],
      ['14', '15', 23],
      ['15', '18', 27],
      ['18', '19', 30],
      ['19', '20', 31],
      ['10', '20', 21],
      ['10', '19', 20],
      ['9', '15', 19],
      ['cd', '9', 11],
      ['ce', '9', 12],
      ['cd', 'ce', 3],
      ['ce', '5', 4],
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
    ['cc',   300, 600],
    ['8',   350, 300],
    ['13',   300, 200],
    ['17',   250, 100],
    ['cd',   400, 600],
    ['14',   400, 200],
    ['cd',   500, 550],
    ['ce',   580, 600],
    ['9',   500, 300],
    ['15',   500, 200],
    ['18',   450, 100],
    ['5',   680, 600],
    ['10',   650, 300],
    ['19',   650, 100],
    ['6',   850, 600],
    ['11',   850, 300],
    ['20',   850, 100]
      ]
      ]
      presets['preset3'] = [
        [],[
        ['S', 300, 300]]
      ]
      presets['preset4'] = [
    [
        [
            "S",
            "1",
            2
        ],
        [
            "S",
            "2",
            3
        ],
        [
            "1",
            "2",
            2
        ],
        [
            "1",
            "c",
            10
        ],
        [
            "c",
            "b",
            10
        ],
        [
            "b",
            "a",
            10
        ],
        [
            "a",
            "2",
            10
        ],
        [
            "2",
            "c",
            10
        ]
    ],
    [
        [
            "S",
            200,
            300
        ],
        [
            "1",
            300,
            200
        ],
        [
            "2",
            300,
            400
        ],
        [
            "a",
            424,
            437
        ],
        [
            "b",
            516,
            342
        ],
        [
            "c",
            421,
            214
        ]
    ]
      ]
      presets['preset5'] = [
        [
            [
                "S",
                "1",
                2
            ],
            [
                "S",
                "2",
                3
            ],
            [
                "1",
                "3",
                4
            ],
            [
                "2",
                "3",
                4
            ],
            [
                "1",
                "b",
                10
            ],
            [
                "b",
                "a",
                10
            ],
            [
                "a",
                "1",
                10
            ],
            [
                "3",
                "c",
                10
            ],
            [
                "c",
                "d",
                10
            ],
            [
                "d",
                "e",
                10
            ],
            [
                "e",
                "b",
                10
            ]
        ],
        [
            [
                "S",
                200,
                300
            ],
            [
                "2",
                300,
                400
            ],
            [
                "3",
                400,
                300
            ],
            [
                "a",
                212,
                171
            ],
            [
                "b",
                351,
                164
            ],
            [
                "1",
                301,
                284
            ],
            [
                "c",
                509,
                234
            ],
            [
                "d",
                664,
                182
            ],
            [
                "e",
                591,
                94
            ]
        ]
      ]
      nodes = presets[btn][1]
      roads = presets[btn][0]
      //console.log(nodes)
      reFill('editGraph', createNodeNameToCoords)
      return {nodes, roads, nodeNameToCoords}
  }
  

  
  async function checkHitNode(mouseX, mouseY, nodes){
    let res = 0
    hitNode = undefined
    roadOrigin = undefined
    nodes.forEach(node => {
      if (Math.abs(mouseX- node[1]) < 20 && Math.abs(mouseY- node[2]) < 20){
        res = 1
        hitNode= node
      
  
    }});
    return hitNode
    
  }
  
  async function checkHitRoadWeight(roads,nodeNameToCoords,mouseX,mouseY){
    let res = 0
    roads.forEach(road => {
      let begiCoords = nodeNameToCoords[road[0]]
      let endCoords = nodeNameToCoords[road[1]]
      middleCoords = [(begiCoords[0]+endCoords[0])/2, (begiCoords[1]+endCoords[1])/2]
      if (Math.abs(mouseX- middleCoords[0]) < 20 && Math.abs(mouseY- middleCoords[1]) < 20){
        
        res = {road, middleCoords}
  
    }
      
    });
    return res
  
  }
  
  async function removeOldEditRoadWeight(){
    let canvasChildren = $('#canvasDiv').children()
    for (let i = 0; i < canvasChildren.length; i++) {
      const element = canvasChildren[i];
      if(element.tagName == 'INPUT'){
        $('#canvasDiv')[0].removeChild(element);
      }
      
    }
  
  
  }
  
  function findFreeLetters(letters, nodes){
    let freeLetters = [...letters]
    nodes.forEach(node => {
      if(freeLetters.includes(node[0])){
        let i = freeLetters.indexOf(node[0])
        freeLetters.splice(i, 1)
      }
    });
    return freeLetters

  }
  async function createNode(coords, letters, nodes){
    let freeLetters = findFreeLetters(letters, nodes)
    nodes.push([freeLetters[0], coords[0], coords[1]])
    nodeNameToCoords = await reFill('editGraph')
    return {nodeNameToCoords, nodes};
  }
  
  async function moveNode(){
    let i = nodes.indexOf(hitNode)
    nodes.splice(i,1)
    hitNode[1] = mouseX;
    hitNode[2] = mouseY;
    await nodes.push(hitNode)
    await reFill('editGraph', createNodeNameToCoords)
  
  
  }
  
  async function chechNodeOrRoad(mouseX,mouseY, nodes, roads, hitNode){
    let createdRoad = false
    nodes.forEach(node => {
      if (Math.abs(mouseX- node[1]) < 20 && Math.abs(mouseY- node[2]) < 20){
        if(hitNode[0] != node[0]){
          roads.push([hitNode[0], node[0], 10])
        }
        createdRoad = true
        return
      }
    });
    if(!createdRoad){
      moveNode()
    }
    reFill('editGraph')
    
  
  
  }

  function deleteSomething(mousePosition){
    console.log(mousePosition)
    nodes.forEach(node => {
        if (Math.abs(mousePosition.x- node[1]) < 20 && Math.abs(mousePosition.y- node[2]) < 20){
            let i = nodes.indexOf(node)
            nodes.splice(i,1)
            for (let index = roads.length-1; index >= 0; index--) {
              const road = roads[index];
              
              if(road[1] == node[0] || road[0] == node[0]){
                let i = roads.indexOf(road)
                roads.splice(i,1)
    
              }
            };      
            reFill('editGraph')

    
      }});

      roads.forEach(road => {
        let begiCoords = nodeNameToCoords[road[0]]
        let endCoords = nodeNameToCoords[road[1]]
        middleCoords = [(begiCoords[0]+endCoords[0])/2, (begiCoords[1]+endCoords[1])/2]
        if (Math.abs(mousePosition.x- middleCoords[0]) < 20 && Math.abs(mousePosition.y- middleCoords[1]) < 20){
          
           //  console.log('removing road', road);
            let i = roads.indexOf(road)
           //  console.log('removing road', roads.length);
            roads.splice(i,1)
           //  console.log('removing road', roads.length);
           reFill('editGraph')
          }
        
      });
  }
function printGraph(nodes, roads){
  var msg = '['
  roads.forEach(node => {
    msg = msg + node + '],\n ['
  });
  console.log(msg)
  msg  = '['
  nodes.forEach(node => {
    msg = msg + node + '],\n ['
  });
  msg.substring
  console.log(msg)
  console.log([roads,nodes])

}