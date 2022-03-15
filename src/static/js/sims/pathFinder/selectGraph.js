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
      ['S', 'A', 6],
      ['S', 'c', 16],
      ['cc', 'b', 8],
      ['A', 'b', 7],
      ['A', 'c', 17],
      ['c', 'o', 25],
      ['c', 'd', 24],
      ['d', 'e', 28],
      ['b', 'o', 18],
      ['e', 'f', 29],
      ['o', 'f', 26],
      ['b', 'cd', 9],
      ['cd', 'i', 10],
      ['cd', 'cv', 2],
      ['i', 'u', 23],
      ['u', 'f', 27],
      ['f', 'h', 30],
      ['h', 'E', 31],
      ['p', 'E', 21],
      ['p', 'h', 20],
      ['y', 'u', 19],
      ['cv', 'y', 11],
      ['ce', 'y', 12],
      ['cd', 'ce', 3],
      ['ce', '5', 4],
      ['5', '6', 5],
      ['5', 'p', 13],
      ['6', 'j', 15],
      ['6', 'p', 14],
      ['j', 'E', 22],
      ['y', 'p', 0],
      ['p', 'j', 0]
      ],[
    ['S', 40, 600],
    ['c', 70, 300],
    ['d', 120, 100],
    ['A',   200, 400],
    ['cc',   300, 600],
    ['b',   350, 300],
    ['o',   300, 200],
    ['e',   250, 100],
    ['cd',   400, 600],
    ['i',   400, 200],
    ['cv',   500, 550],
    ['ce',   580, 600],
    ['y',   500, 300],
    ['u',   500, 200],
    ['f',   450, 100],
    ['5',   680, 600],
    ['p',   650, 300],
    ['h',   650, 100],
    ['6',   850, 600],
    ['j',   850, 300],
    ['E',   850, 100]
      ]
      ]
      presets['preset3'] = [
        ['S', 'E', 10],[
        ['S', 300, 300],
        ['E', 600, 600],]
      ]
      presets['preset4'] = [
    [
        [
            "S",
            "c",
            2
        ],
        [
            "S",
            "D",
            3
        ],
        [
            "c",
            "D",
            2
        ],
        [
            "c",
            "E",
            10
        ],
        [
            "E",
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
            "D",
            10
        ],
        [
            "D",
            "E",
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
            "c",
            300,
            200
        ],
        [
            "D",
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
            "E",
            421,
            214
        ]
    ]
      ]
      presets['preset5'] = [
        [
            [
                "S",
                "c",
                2
            ],
            [
                "S",
                "G",
                3
            ],
            [
                "c",
                "F",
                4
            ],
            [
                "G",
                "F",
                4
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
                "c",
                10
            ],
            [
                "F",
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
                "E",
                10
            ],
            [
                "E",
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
                "G",
                300,
                400
            ],
            [
                "F",
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
                "c",
                301,
                284
            ],
            [
                "d",
                664,
                182
            ],
            [
                "E",
                591,
                94
            ]
        ]
      ]
     presets['preset6'] = [[['S', 'a', 2],
     ['S', 'b', 3],
     ['a', 'b', 2],
     ['a', 'c', 10],
     ['b', 'f', 10],
     ['e', 'd', 10],
     ['b', 'e', 7],
     ['f', 'd', 14],
     ['f', 'g', 10],
     ['g', 'h', 10],
     ['h', 'E', 10],
     ['a', 'i', 10],
     ['i', 'c', 3],
     ['i', 'j', 10],
     ['j', 'e', 10],
     ['b', 'j', 10],
     ['j', 'k', 10],
     ['k', 'E', 76],
     ['d', 'E', 13],
     ['S', 'm', 10],
     ['m', 'l', 10],
     ['l', 'n', 10],
     ['n', 'c', 10],
     ['r', 'a', 10],
     ['c', 'r', 10],
     ['c', 's', 10],
     ['s', 't', 10],
     ['r', 't', 10],
     ['t', 'E', 10],
     ], [['c', 468, 154],
     ['S', 64, 322],
     ['b', 174, 553],
     ['d', 646, 600],
     ['E', 825, 328],
     ['e', 482, 523],
     ['f', 369, 624],
     ['h', 770, 602],
     ['g', 597, 657],
     ['j', 433, 402],
     ['k', 534, 363],
     ['l', 229, 72],
     ['m', 144, 182],
     ['n', 338, 100],
     ['i', 361, 300],
     ['a', 295, 193],
     ['s', 580, 193],
     ['t', 663, 250],
     ['r', 523, 264],
     ]]
     presets['preset7']=[[['a', 'b', 2],
     ['a', 'c', 10],
     ['b', 'f', 10],
     ['e', 'd', 10],
     ['b', 'e', 7],
     ['f', 'g', 10],
     ['j', 'e', 10],
     ['n', 'c', 10],
     ['r', 'a', 10],
     ['c', 'r', 10],
     ['c', 'o', 10],
     ['o', 'n', 10],
     ['p', 'e', 10],
     ['d', 'p', 10],
     ['d', 'E', 24],
     ['S', 'b', 32],
     ['S', 'a', 26],
     ['S', 'm', 1],
     ['m', 'l', 1],
     ['l', 'n', 0],
     ['t', 'E', 922],
     ['e', 'u', 10],
     ['u', 'p', 10],
     ['p', 'v', 10],
     ['v', 'E', 10],
     ['w', 'E', 10],
     ['g', 'w', 11],
     ['o', 'h', 10],
     ['z', 'x', 10],
     ['h', 'z', 10],
     ['z', 'y', 10],
     ['x', 'E', 12],
     ['n', 'aa', 10],
     ['ab', 'h', 10],
     ['aa', 'ab', 1],
     ['h', 'ac', 10],
     ['ac', 'x', 10],
     ['y', 'E', 10],
     ['n', 'a', 10],
     ['a', 'j', 10],
     ['j', 'i', 24],
     ['i', 'k', 24],
     ['k', 'E', 20],
     ['j', 'ad', 10],
     ['ad', 'k', 30],
     ['S', 'q', 10],
     ['q', 'a', 10],
     ['b', 'ae', 10],
     ['ae', 'j', 10],
     ['d', 'ag', 10],
     ['ag', 'g', 10],
     ['af', 'f', 11],
     ['ag', 'af', 14],
     ['c', 's', 14],
     ['s', 't', 50],
     ['r', 't', 20],
     ['ae', 'ah', 10],
     ['ah', 'ad', 10],
     ['n', 'm', 10],
     ], [['c', 468, 154],
     ['S', 64, 322],
     ['e', 482, 523],
     ['g', 597, 657],
     ['j', 433, 402],
     ['a', 295, 193],
     ['s', 580, 193],
     ['t', 663, 250],
     ['r', 523, 264],
     ['p', 663, 456],
     ['u', 569, 421],
     ['v', 712, 401],
     ['E', 866, 318],
     ['w', 836, 530],
     ['x', 866, 120],
     ['y', 792, 192],
     ['z', 713, 126],
     ['h', 682, 36],
     ['l', 163, 55],
     ['m', 96, 165],
     ['n', 256, 69],
     ['aa', 360, 19],
     ['ab', 484, 8],
     ['o', 509, 79],
     ['ac', 816, 27],
     ['i', 506, 374],
     ['k', 651, 347],
     ['ad', 489, 306],
     ['q', 143, 346],
     ['b', 88, 594],
     ['ae', 247, 424],
     ['f', 231, 638],
     ['d', 715, 564],
     ['af', 489, 597],
     ['ag', 577, 591],
     ['ah', 286, 336],
     ]]
     nodes = presets[btn][1]
      roads = presets[btn][0]
      //console.log(nodes, roads)
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
  var copyText = document.createElement("textarea");
  document.body.appendChild(copyText);
  var msg = '[['
  roads.forEach(node => {
    msg += `['${node[0]}', '${node[1]}', ${node[2]}],\n`
  });
  msg += '], ['
  nodes.forEach(node => {
    msg += `['${node[0]}', ${node[1]}, ${node[2]}],\n`
  });
  msg += ']]'
  console.log(msg)
  copyText.value = msg;
  copyText.select();
  document.execCommand("copy");
  document.body.removeChild(copyText);

}