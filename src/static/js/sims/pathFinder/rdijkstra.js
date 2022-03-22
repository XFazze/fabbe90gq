function rdijkstra(roads, nodes) {
	console.log('ROADS', roads);
	let queue = [['S',0, 'S']];

	if (queue.length == 0) {
		$('#errorNoRoadStartingNode').show();
	}
	let rounds = 1000;
	let x = 0;
	let solutions = [];
	let solutionsLen = solutions.length;
	let dead = [];
	while (x < rounds) {
		x += 1;
		console.log('dijkstra roud', x);
		r = dijkRound(queue, nodes, roads, solutions, dead);
		//logPaths(queue)
        if(r.solution){
            console.log('Solution', r.solution)
            return solutions
        }
		queue = r.queue;
		dead = r.dead;


		if (!queue.length) {
			return [];
		}
	}
	return solutions;
}


function dijkFindCheapest(activePaths) {
	let cheapest = [9999999, 0];
	for (let i = 0; i < activePaths.length; i++) {
		const path = activePaths[i];
		if (path[1] < cheapest[0]) {
			cheapest = [path[1], i];
		}
	}
	return [activePaths[cheapest[1]], cheapest[1]];
}

function dijkRound(queue, nodes, roads, dead) {
    console.log('qq,', queue)
	let [cheapest, i] = dijkFindCheapest(queue);
	console.log('cheapest', cheapest);

	queue.splice(i, 1);
    if(cheapest[0] == 'E'){
        let solution = backtrack(cheapest, dead)
        return {queue, dead, solution}
    }
	dead.push(cheapest);
	queue = dijkExpand(cheapest, queue, roads, dead);
    let solution = false
	return { queue, dead, solution };
}

function backtrack(cheapest, dead){
    res = {'value': cheapest[1], 'path' : [cheapest]}
    n = cheapest[1] // last node before E
    while (n!='S'){
        for (let i = 0; i < dead.length; i++) {
            const deadR = dead[i];
            if(n==deadR[0]){
                n = deadR[2]
                res.path.push(deadR)
                continue
            }
        }
    }
    return res
}
function dijkRemoveSolutions(queue, solutions) {
	for (let i = 0; i < queue.length; i++) {
		const path = queue[i];
		if (path[path.length - 1][1] == 'E') {
			queue.splice(i, 1);
			if (!solutions.length) {
				solutions.push(path);
			} else if (getPathValue(solutions[0]) > getPathValue(path[0])) {
				solutions.unshift(path);
			} else {
				solutions.push(path);
			}
			return [queue, solutions];
		}
	}
	return [queue, solutions];
}

function dijkExpand(cheapest, queue, roads, dead) {
	let lastNode = cheapest[0];

	//console.log('roads', roads)
	roads.forEach((road) => {
		console.log('roqad,', lastNode, road, road[0] == lastNode[1] , !deadNode(road[1],dead))
		if (road[0] == lastNode[1] && !deadNode(road[1],dead)) {
			let newPath = [road[1], cheapest[1] + road[2], road[0]];
			console.log('road,', newPath)
			queue.push(newPath);
		}
	});
	return queue;
}

function deadNode(node, dead){
    for (let i = 0; i < dead.length; i++) {
        const deadN = dead[i];
        if(deadN[0] == node) {
            return true;
        }
    }
    return false

}

function dijkRemoveBadRoads(connectingRoads, queue, dead) {
	for (let i = connectingRoads.length - 1; i > -1; i--) {
		const path = connectingRoads[i];
		queue = dijkQueueCheck(path, queue, dead);
	}
	return queue;
}

function dijkQueueCheck(path, queue, dead) {
	//console.log('checkign on', path)
	for (let i = queue.length - 1; i > -1; i--) {
		const qPath = queue[i];
		//console.log('dead', dead, path[path.length-1][1])
		if (betterInclude(dead, path[path.length - 1][1])) {
			//console.log('dead node', path[path.length-1][1], path, dead)
			return queue;
		}

		if (path[path.length - 1][1] == 'Sa') {
			console.log('we made it', path);
		}
		if (qPath[qPath.length - 1][1] != path[path.length - 1][1]) {
			//console.log('first', qPath[qPath.length-1][1], 'second',path[path.length-1][1] )
			continue;
		}
		if (getPathValue(qPath) > getPathValue(path)) {
			console.log('cheaper path found');

			queue.splice(i, 1);
			queue.push(path);
			//console.log('found better path', path)
		}
		//console.log('worse path', path)
		return queue;
	}
	queue.push(path);
	//console.log('no interfernec', path)
	return queue;
}
// active roads
// loop every active to go next road in it
// check if its passed all paths
