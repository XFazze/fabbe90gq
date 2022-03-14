function djikstra(roads, nodes){
    var activePaths = bruteForceStart(nodes, roads)

    if(activePaths.length == 0){
        $('#errorNoRoadStartingNode').show()
    }
    let rounds = 100
    let x = 0
    let solutions = []
    while(x < rounds){


    }
    return solutions
}


function djikstraSolved(path, roads){
    return False
}
function djikFoundCheapest(activePaths){
    cheapest = [99999, 0]
    activePaths.forEach(path => {
        
    });
}
// active roads
// loop every active to go next road in it 
// check if its passed all paths