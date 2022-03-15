function djikstra(roads, nodes){
    let queue = bruteForceStart(nodes, roads)

    if(queue.length == 0){
        $('#errorNoRoadStartingNode').show()
    }
    let rounds = 100
    let x = 0
    let solutions = []
    let solutionsLen = solutions.length
    let dead = []
    while(x < rounds){
        x += 1
        //console.log('dijkstra roud', x )
        r = dijkRound(queue, nodes, roads, solutions,dead)
        //logPaths(queue)
        queue = r.queue
        solutions = r.asolutions
        dead = r.dead

        if(solutions.length != solutionsLen){
            showSolutions(solutions)
            solutionsLen = solutions.length
        }

        if(!queue.length){
            break
        }


    }
    return solutions
}


function dijkRemoveSlowPaths(queue, solutions){
    if(!solutions.length){
        return queue
    }
    solutionsCheap = getPathValue(solutions[0])  
    for (let i = queue.length-1; i > -1; i--) {
        const path = queue[i];
        if(getPathValue(path) > solutionsCheap){
            queue.splice(i, 1)
        }
    }
    return queue
}

function dijkFindCheapest(activePaths){
    let cheapest = [99999, 0]
    for (let i = 0; i < activePaths.length; i++) {
        const path = activePaths[i];
        let pathCost = getPathValue(path)
        if(pathCost < cheapest[0]){
            cheapest = [pathCost, i]
        }
    }
    return [activePaths[cheapest[1]], cheapest[1]]
}

function dijkRound(queue, nodes, roads, solutions, dead){
    let [cheapest, i] = dijkFindCheapest(queue)
    //console.log('cheapest', cheapest)
    queue.splice(i,1)
    dead.push(cheapest[cheapest.length-1][1])
    queue = dijkCheckNeighbors(cheapest, queue, roads, dead)
    let [aqueue, asolutions] = dijkRemoveSolutions(queue,solutions)
    queue = dijkRemoveSlowPaths(aqueue,asolutions)
    return {queue, asolutions, dead}
}

function dijkRemoveSolutions(queue, solutions){
    for (let i = 0; i < queue.length; i++) {
        const path = queue[i];
        if(path[path.length-1][1] == 'E'){
            queue.splice(i,1)
            if(!solutions.length){
                solutions.push(path)
            }else if(getPathValue(solutions[0]) > getPathValue(path[0])){
                solutions.unshift(path)
            }else{
                solutions.push(path)
            }
            return [queue, solutions]
        }
    }
    return [queue, solutions]
}

function dijkCheckNeighbors(cheapest, queue, roads, dead){
    let lastNode = cheapest[cheapest.length-1]

    let connectingRoads = []
    roads.forEach(road => {
        if(road[0] == lastNode[1] && road[1] != lastNode[0]){
            //console.log('road,', lastNode,road)
            let temp = [...cheapest]
            temp.push(road)
            connectingRoads.push(temp)
        }
    });
    queue = dijkRemoveBadRoads(connectingRoads, queue, dead)
    return queue
}

function dijkRemoveBadRoads(connectingRoads, queue,dead){
    for (let i = connectingRoads.length-1; i > -1; i--) {
        const path = connectingRoads[i];
        queue = dijkQueueCheck(path, queue, dead)
    }
    return queue
}

function dijkQueueCheck(path, queue, dead){
    //console.log('checkign on', path)
    for (let i = queue.length-1; i >-1; i--){
        const qPath = queue[i];
        //console.log('dead', dead, path[path.length-1][1])
        if(betterInclude(dead, path[path.length-1][1])){
            //console.log('dead node', path[path.length-1][1], path, dead)
            return queue
        }
        if(qPath[qPath.length-1][1] != path[path.length-1][1]){
            //console.log('first', qPath[qPath.length-1][1], 'second',path[path.length-1][1] )
            continue
        }
        if(getPathValue(qPath) > getPathValue(path)){
            queue.splice(i, 1)
            queue.push(path)
            //console.log('found better path', path)
        }
        //console.log('worse path', path)
        return queue
        
    }
    queue.push(path)
    //console.log('no interfernec', path)
    return queue
}
// active roads
// loop every active to go next road in it 
// check if its passed all paths