function showSolutions(solutions, nodes, roads, createNodeNameToCoords) {
	$('#solutions').show();
	$('#solutionList tr').remove();
	solutions.forEach((solution) => {
		addSolutionToList(solution, nodes, roads);
	});

	$('#solutionList tr').click(function () {
		$(this).addClass('bg-slate-600').siblings().removeClass('bg-slate-600');
		var passedNodes = $(this).find('td');
		let solution = [];
		for (let i = 1; i < passedNodes.length; i++) {
			const node = passedNodes[i];
			solution.push(node.innerHTML);
		}
		drawSolution(nodes, roads, solution, createNodeNameToCoords);
	});
}

function addSolutionToList(solution, nodes, roads) {
    console.log('addtolist', solution)
	res = ``;
	solution[1].forEach((node) => {
		res = res + `<td>${node[0]}</td>`;
	});
	console.log('reees', res);
	$('#solutionList').append(`<tr class='w-full'>
    <td class=''>${solution[0]}</td>
    ${res}<td>E</td></tr>`); // this is if it isnt rdjik
	$('#solutionList tr:even').addClass('bg-slate-100');
}

function formatSolutions(paths) {
	let weighted = [];
	paths.forEach((path) => {
		let w = countWeight(path);
		weighted.push(w);
	});
	let sorted = sortFirstElement(paths, weighted);
	return sorted;
}

function countWeight(path) {
	let w = 0;
	path.forEach((road) => {
		w += parseInt(road[2]);
	});
	return w;
}

function sortFirstElement(paths, weighted) {
	res = [];
	paths.sort(function (a, b) {
		return weighted.indexOf(a) - weighted.indexOf(b);
	});
	weighted.sort();
	for (let i = 0; i < paths.length; i++) {
		const path = paths[i];
		res.push(weighted[i], path);
	}
	return res;
}

async function drawSolution(nodes, roads, solution, createNodeNameToCoords) {
	await reFill('solutionGraph', roads, nodes);
	await markSolution(nodes, roads, solution, createNodeNameToCoords);
}
function convertPathToNodes(path){
    console.log('pconvert', path)
    var res = ['S']
    for (let i = 0; i < path.length; i++) {
        const pp = path[i];
        res.push(pp[1])
    }
    return res
}