function rdijkstra(roads, nodes) {
	console.log('ROADS', roads);
	let queue = [['S', 'S',0]];

	if (queue.length == 0) {
		$('#errorNoRoadStartingNode').show();
	}
	let rounds = 100000;
	let x = 0;
	let solutions = [];
	let dead = [];
	while (x < rounds) {
		x += 1;
		console.log('dijkstra roud', x);
		r = dijkRound(queue, nodes, roads, solutions, dead);
		//console.log('logapath')
		//logPaths(queue)
		//console.log('deadlog')
		//logPaths(dead)
        if(r.solution){
            //console.log('Solution', r.solution)
            return [r.solution]
        }
		queue = r.queue;
		dead = r.dead;


		if (!queue.length) {
			console.log('fouynd no solution')
			return [];
		}
	}
	console.log('found no solutions')
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
    let solution = false
	let [cheapest, i] = dijkFindCheapest(queue);
	queue.splice(i, 1);
	//console.log('cheapest', cheapest)
	if(alreadyCheapestWayToNode(cheapest, dead)){
		//console.log('already found cheapest')
		return { queue, dead, solution }
	}
	dead.push(cheapest);
    if(cheapest[1] == 'E'){
        let solution = backtrack(cheapest, dead)
        return {queue, dead, solution}
    }
	queue = dijkExpand(cheapest, queue, roads, dead);
	//console.log('dont return', solution)
	return { queue, dead, solution };
}

function backtrack(cheapest, dead){
	//console.log('backteacking', cheapest)
	//logPaths(dead)
    var res = []
    var n = cheapest[1] // last node before E
    while (n!='S'){
		//console.log('while not s',n, n != 'S')
        for (let i = 0; i < dead.length; i++) {
            const deadR = dead[i];
			//console.log('maby',n,deadR)
            if(n==deadR[1]){
				//console.log('yess',res,deadR)
                n = deadR[0]
                res.splice(0,0, deadR)
				//console.log('afters',res,deadR)
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
	let lastNode = cheapest[1];

	roads.forEach((road) => {
		//console.log('roqad,', lastNode, road, road[0]==lastNode , !deadNode(road[1],dead))
		if (road[0] == lastNode && !deadNode(road[1],dead)) {
			let newPath = [road[0], road[1], cheapest[2] + road[2]];
			//console.log('road,', newPath)
			queue.push(newPath);
		}
	});
	return queue;
}

function deadNode(node, dead){
    for (let i = 0; i < dead.length; i++) {
        const deadN = dead[i];
        if(deadN[1] == node) {
            return true;
        }
    }
    return false
}
function alreadyCheapestWayToNode(cheapest, dead){
	for (let i = 0; i < dead.length; i++) {
		const dd = dead[i];
		if(dd[1] == cheapest[1]){
			return true
		}
	}
	return false
}
