function createLetters(){
    let gigaFreeLetters = []
    let freeLetters = 'SEabcdefghijklmnopqrstuvwxyz'.split('') //ABCDEFGHIJKLMNOPQRSTUVWYZ
    freeLetters.forEach(letter => {
      freeLetters.forEach(letter2 => {
        gigaFreeLetters.push(letter+letter2)
      })
    });
    freeLetters = freeLetters.concat(gigaFreeLetters)
    return freeLetters
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
     /*presets['preset6'] = [
        [[S,a,2],
      [S,b,3],
      [a,b,2],
      [a,E,999999999],
      [b,E,999999],
      [S,ap,10],
      [S,aw,10],
      [S,ax,10],
      [ax,av,10],
      [aw,av,10],
      [av,g,10],
      [aw,g,10],
      [g,at,10],
      [at,as,10],
      [as,ar,10],
      [ar,g,10],
      [x,ap,10],
      [aa,w,10],
      [ab,al,10],
      [ac,u,10],
      [e,u,10],
      [ak,u,10],
      [d,ak,10],
      [d,aj,10],
      [ak,ad,10],
      [e,ae,10],
      [o,f,10],
      [f,j,10],
      [j,i,10],
      [au,h,10],
      [au,av,10],
      [a,h,10],
      [h,n,10],
      [n,k,10],
      [k,m,10],
      [o,l,10],
      [p,q,10],
      [q,r,10],
      [E,s,10],
      [g,aq,8],
      [aq,x,6],
      [ap,ao,7],
      [ao,an,5],
      [an,y,4],
      [y,z,20],
      [z,aa,1],
      [am,v,0],
      [w,am,1],
      [v,ab,1],
      [al,ac,9],
      [ai,E,0],
      [t,E,20],
      [ae,t,2000],
      [ae,af,10],
      [af,ah,3],
      [af,ag,0],
      [r,E,99],
      [ah,r,10],
      [ag,r,10],
      [q,c,999],
      [p,l,20],
      [m,p,5],
      [ai,o,20]],
      [[S,200,300],
      [a,300,200],
      [b,300,400],
      [E,772,491],
      [c,531,340],
      [d,536,482],
      [e,380,508],
      [f,525,145],
      [g,137,126],
      [i,377,78],
      [j,571,81],
      [k,794,118],
      [l,762,254],
      [n,678,66],
      [o,613,238],
      [p,698,304],
      [q,768,402],
      [r,871,444],
      [t,664,603],
      [u,444,590],
      [v,230,585],
      [w,130,503],
      [x,77,263],
      [y,84,440],
      [z,47,554],
      [aa,110,634],
      [ab,255,667],
      [ac,370,658],
      [ad,519,662],
      [ae,624,672],
      [af,723,677],
      [ag,816,668],
      [ah,758,613],
      [aj,544,547],
      [ak,440,487],
      [al,323,567],
      [am,232,474],
      [an,123,379],
      [ao,49,325],
      [ap,126,264],
      [aq,61,180],
      [ar,16,86],
      [as,36,32],
      [at,163,34],
      [au,266,63],
      [av,255,122],
      [aw,199,179],
      [ax,217,278],
      [m,664,175],
      [s,340,319],
      [ai,634,518],
      [h,600,166]]
      ]*/
      nodes = presets[btn][1]
      roads = presets[btn][0]
      reFill('editGraph', roads, nodes)
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
    return nodes;
  }
  
  async function moveNode(){
    let i = nodes.indexOf(hitNode)
    nodes.splice(i,1)
    hitNode[1] = mouseX;
    hitNode[2] = mouseY;
    await nodes.push(hitNode)
  
  
  }
  
  async function chechNodeOrRoad(mouseX,mouseY, nodes, roads, hitNode){
    let createdRoad = false
    nodes.forEach(node => {
      if (Math.abs(mouseX- node[1]) < 20 && Math.abs(mouseY- node[2]) < 20){
        if(hitNode[0] != node[0]){
          roads.push([hitNode[0], node[0], 10])
          createdRoad = true
          return
        }
      }
    });
    if(!createdRoad){
      nodes = moveNode()
    }
    return roads
  
  
  }

  function deleteSomething(mousePosition){
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
          }
        
      });
      reFill('editGraph', roads, nodes)
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