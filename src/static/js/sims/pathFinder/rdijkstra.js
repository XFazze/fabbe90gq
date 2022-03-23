function rdijkstra(roads, nodes) {
	console.log('ROADS', roads);
	let queue = [['S', 'S',0]];

	if (queue.length == 0) {
		$('#errorNoRoadStartingNode').show();
	}
	let rounds = 10;
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
            console.log('Solution', r.solution.path)
            return [r.solution.path]
        }
		queue = r.queue;
		dead = r.dead;


		if (!queue.length) {
			console.log('fouynd no solution')
			return [];
		}
	}
	return solutions;
}


function dijkFindCheapest(activePaths) {
	let cheapest = [9999999, 0];
	for (let i = 0; i < activePaths.length; i++) {
		const path = activePaths[i];
		if (path[2] < cheapest[0]) {
			cheapest = [path[2], i];
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
		console.log('sss', solution)
        return {queue, dead, solution}
    }
	dead.push(cheapest);
	queue = dijkExpand(cheapest, queue, roads, dead);
    let solution = false
	return { queue, dead, solution };
}

function backtrack(cheapest, dead){
	console.log('backteacking', cheapest)
    res = {'value': cheapest[2], 'path' : [cheapest]}
    var n = cheapest[1] // last node before E
    while (n!='S'){
		console.log('while not s',n, n != 'S')
        for (let i = 0; i < dead.length; i++) {
            const deadR = dead[i];
			console.log('maby',n,deadR)
            if(n==deadR[0]){
                n = deadR[1]
				console.log('yess', res.path)
                res.path.splice(0,0, deadR)
				console.log('yess11', res.path)
                break
            }
        }
    }
    return res
}
function dijkRemoveSolutions(queue, solutions) {
	for (let i = 0; i < queue.length; i++) {
		const path = queue[i];
		if (path[path.length - 1][2] == 'E') {
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
		//console.log('roqad,', lastNode, road, road[0]==lastNode , !deadNode(road[1],dead))
		if (road[0] == lastNode && !deadNode(road[2],dead)) {
			let newPath = [road[1], road[0], cheapest[2] + road[2]];
			//console.log('road,', newPath)
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
