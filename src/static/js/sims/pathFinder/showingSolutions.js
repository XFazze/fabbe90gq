function showSolutions(solutions){
    $('#solutions').show()
    solutions.forEach(solution => {
        addSolutionToList(solution)
        
    });
    // TODO click on row and show visually
    // TODO show one solution visually fully
    // TODO show one solution visually step by step 
}

function addSolutionToList(solution){
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
