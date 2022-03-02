function eulerVagBruteForce(roads){
    var activePaths = bruteForceStart(nodes, roads)

    if(activePaths.length == 0){
        $('#errorNoRoadStartingNode').show()
    }
    let rounds = 10
    let x = 0
    let solutions = []
    while(x < rounds){
        console.log('round', x)
        x += 1
        let r = eulerVagBruteForceRound(nodes, roads, activePaths)
        activePaths = r.newActiveRoads
        solutions = solutions.concat(r.solutions)
        
        if(activePaths.length == 0){
            break
        }
    }
    return solutions
}


function eulerVagBruteForceRound(nodes, roads, activePaths){
    let newActiveRoads = []
    let solutions = []
    activePaths.forEach(path => {
        if(didTrippleBack(path)){
            return
        }
        if(eulerVagSolved(path, roads)){
            solutions.push(path)
            return
        }

        roads.forEach(road => {
            let clonePath = [...path];
            if(road[0] == path[path.length - 1][1]){
                    clonePath.push(road)
                newActiveRoads.push(clonePath)
            }
        });
    });
    return {newActiveRoads, solutions}
}

function didTrippleBack(path){ // checks if it goes over, back and over again. 
    if(path.length < 2){
        return false
    }
    if(path[path.length - 1][0] == path[path.length - 2][1] && path[path.length - 1][1] == path[path.length - 2][0]){
        return true
    }
    return false
}

function eulerVagSolved(path, roads){
    let cloneRoads = [...roads]
    for (let i = cloneRoads.length-1; i > -1 ; i--) {
        const road = cloneRoads[i];
        if(path.includes(road)){
            let ii = cloneRoads.indexOf(road)
            cloneRoads.splice(ii, 1)
        }
    }
    return checkNotDoubles(cloneRoads)
}
// active roads
// loop every active to go next road in it 
// check if its passed all paths