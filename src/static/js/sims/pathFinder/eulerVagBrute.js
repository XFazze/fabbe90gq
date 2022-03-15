function eulerVagBruteForce(roads, nodes){
    var activePaths = bruteForceStart(nodes, roads)

    if(activePaths.length == 0){
        $('#errorNoRoadStartingNode').show()
    }
    let rounds = 100
    let x = 0
    let solutions = []
    let notPrio = []
    let slower = false
    while(x < rounds){
        console.log(`round: ${x} activePaths: ${activePaths.length}`)

        x += 1
        let r = eulerVagBruteForceRound(nodes, roads, activePaths)
        activePaths = r.newActiveRoads
        solutions = solutions.concat(r.solutions)
        if(solutions.length){
            showSolutions(solutions, nodes,roads)
        }
        if(!slower){
            let r2 = sortPriority(activePaths)
            activePaths = r2.notDoubles
            notPrio.concat(r2.doubles)
        }
        
        if(activePaths.length == 0 && slower){
            break
        }else if(activePaths.length == 0){
            activePaths= notPrio
            slower = true
            console.log('slower is activated')
            $('#slowerModeEnables').show()

        }
    }
    return solutions
}


function eulerVagBruteForceRound(nodes, roads, activePaths){
    let newActiveRoads = []
    let solutions = []
    activePaths.forEach(path => {
        if(hasLoop(path)){
            return
        }
        if(eulerVagSolved(path, roads)){
            solutions.push(path)
            return
        }


        // TODO add setup function that checks if loop has been achieved
        // check if this node has been stepped on before and check if the loop between is same

        roads.forEach(road => {
            let clonePath = [...path];
            if(betterInclude(path, road) || betterInclude(path,[road[1], road[0], road[2]])){
                return
            }
            if(road[0] == path[path.length - 1][1]){
                    clonePath.push(road)
                newActiveRoads.push(clonePath)
            }
        });
    });
    return {newActiveRoads, solutions}
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