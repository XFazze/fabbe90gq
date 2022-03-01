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

}

function checkDoubles(roads){
    for (let i = roads.length-1; i > -1 ; i--) {
        const road = roads[i];
        let reverse = [...road]
        if(roads.includes(reverse)){
            return true
            
        }
    }
    return false
}
function formatSolutions(paths){
    let weighted = []
    paths.forEach(path => {
        let w = countWeight(path)
        weighted.push(w)
    });
    let sorted = sortFirstElement(paths, weighted)
    return sorted
}

function countWeight(path){
    let w = 0
    path.forEach(road => {
        w += road[2]
    });
    return w
}
function sortFirstElement(paths, weighted){
    res = []
    paths.sort(function(a, b){  
        return weighted.indexOf(a) - weighted.indexOf(b);
      });
    weighted.sort()
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        res.push(weighted[i], path)
    }
    return res

}