function doubleSidedRoads(roads){
    res = []
    roads.forEach(road => {
        res.push(road)
        res.push([road[1], road[0], road[2]])
    });
    return res
}

function bruteForceStart(nodes, roads){
    let activePaths = []
    s = 0
    nodes.forEach(node => {
        if(node[0] == 'S')
        s = node
        return
    });
    if(!s){
        s = nodes[0]
    }
    roads.forEach(road => {
        if(road[0] == s[0]){
            activePaths.push([road])
        }
    })
    return activePaths
}

function hideErrors(){
    $('#errorNoRoadStartingNode').hide()
    $('#slowerModeEnables').hide()
    $('#noSolutions').hide()

}

function arrayEquals(array1, array2){
    for (let i = 0; i < array1.length; i++) {
        if(Array.isArray(array1[i][0])){
            if(!arrayEquals(array1[i], array2[i])){
                return false    
            }
        }else{
            if(array1[i] != array2[i]){
                return false
            }
        }   
    }
    return true

}
function betterInclude(roads, reverse){
    let matches = 0
    for (let i = 0; i < roads.length; i++) {
        const road = roads[i];

        if(arrayEquals(road, reverse) && road.length == reverse.length){
            matches += 1
        }
    }
    return matches
}


function checkNotDoubles(roads){
    for (let i = roads.length-1; i > -1 ; i--) {
        const road = roads[i];
        let reverse = [...road]
        reverse = [reverse[1], reverse[0], reverse[2]]
        if(betterInclude(roads, reverse)){
            return false
            
        }
    }
    return true
}


function removeLoop(path){
    for (let i = 0; i < path.length; i++) {
        const road = path[i];
        var endloop;

        // check if there are two of same road
        if(betterInclude(road, path) > 1){
            continue
        }

        // checks how long the loop is
        for (let ii = i; ii < path.length; ii++) {
            const road2 = path[ii];
            if(road2[1] == road[0]){
                endloop = ii;
                break
            }
        }

        // finds other loops 
        path = removeOtherLoops(path, endloop, i)
    }
    return path
}
function removeOtherLoops(path, startIndex, startIndexOfRealLoop){
    for (let i = startIndex; i < path.length; i++) {
        const road2 = path[i];

        if(!arrayEquals(road2, path[startIndexOfRealLoop])){
            continue
        }
        let okLoop = true;
        for (let ii = 0; ii < startIndex-startIndexOfRealLoop; ii++) {
            const road3 = path[ii+i];
            if(ii+i > path.length-1){
                okLoop = false
                break
            }
            if(!arrayEquals(road3, path[ii+startIndexOfRealLoop])){
                okLoop = false
                break 
            }
        }
        if(okLoop){
            path.splice(i, startIndex-startIndexOfRealLoop)
        }
    }
    return path
}

function hasLoop(path){
    let pathWithoutLoops = removeLoop([...path])
    if(arrayEquals(path, pathWithoutLoops)){
        return false
    }
    return true

}

function sortPriority(paths){
    let notDoubles = []
    let doubles = []
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        let isDouble = false
        for (let ii = 0; ii < path.length; ii++) {
            const road = path[ii];
            if(betterInclude(path, road) > 1){
                doubles.push(path)
                isDouble = true
                break
            }
        }
        if(!isDouble){
            notDoubles.push(path)
        }
    }
    return {notDoubles, doubles}
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function getPathValue(path){
    res = 0
    path.forEach(road => {
        res += road[2]
    });
    return res
}
function logPaths(queue){
    queue.forEach(element => {
        console.log(element)
    });
}
function createNodeNameToCoords(nodes){
    console.log('creawnode indside', nodes)
  let ret = {};
  nodes.forEach(node => {
    ret[node[0]] = [node[1], node[2]]
  });
  return ret
}