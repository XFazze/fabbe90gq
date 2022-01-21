// start loop increasing progressbar


$(document).ready(function(){
    matchDownloadProgress()
});
async function matchDownloadProgress(){ 
    let progress = await checkProgress(summoner['puuid'])
    if(progress['downloaded'] == progress['totalAmount']){
        console.log('all matches are downloaded returning')
        return
    }
    console.log(progress)
    let size = 500
    let process = $(`<p class='absolute whitespace-nowrap left-7 top-1/4' id='processText'>Match Download Progress: ${progress["downloaded"]}/${progress["totalAmount"]}</p>`)
    $('#processText').replaceWith(process)
    $('#processDone').width(size*progress['downloaded']/progress['totalAmount'])
    $('#processLeft').width(size*(1-progress['downloaded']/progress['totalAmount']))

    setTimeout(() => {
        matchDownloadProgress()
    }, 1000*10);
}
async function checkProgress(puuid){
    return $.ajax({
        type: 'GET', 
        data: { 
            puuid: puuid
        },
        url: $SCRIPT_ROOT + "progress",
        cache: false,
        async: false,
        tryCount : 0,
        retryLimit : 10,
        error : function(xhr, textStatus, errorThrown ) {
            if (textStatus == 'match not found') {
                console.log('awas told to ret')
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    console.log('trying')
                    //try again
                    $.ajax(this);
                    return;
                }            
                return;
            }
        }
    });
}