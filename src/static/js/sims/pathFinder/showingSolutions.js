function showSolutions(solutions, nodes,roads, createNodeNameToCoords){
    $('#solutions').show()
    $('#solutionList tr').remove(); 
    solutions.forEach(solution => {
        addSolutionToList(solution, nodes,roads)
        
    });

    $("#solutionList tr").click(function(){
        $(this).addClass('bg-slate-600').siblings().removeClass('bg-slate-600');    
        var passedNodes=$(this).find('td')
        let solution = []
        for (let i = 1; i < passedNodes.length; i++) {
            const node = passedNodes[i];
            solution.push(node.innerHTML)
        }
        drawSolution(nodes, roads, solution, createNodeNameToCoords)
  });
    // TODO click on row and show visually
    // TODO show one solution visually fully
    // TODO show one solution visually step by step 
}

function addSolutionToList(solution, nodes,roads){
    res = ``
    solution.forEach(node => {
        res = res + `<td>${node[1]}</td>`
    });
    $('#solutionList').append(`<tr class='w-full'>
    <td class=''>${countWeight(solution)}</td>
    <td>S</td>${res}</tr>`)
    $('#solutionList tr:even').addClass('bg-slate-100')
    
        
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
        w += parseInt(road[2])
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

async function drawSolution(nodes, roads, solution, createNodeNameToCoords){
    await reFill('solutionGraph', createNodeNameToCoords)
    await markSolution(nodes, roads, solution, createNodeNameToCoords)

}