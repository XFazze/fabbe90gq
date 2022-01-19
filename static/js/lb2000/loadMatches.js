//TODO load 10 recent matches
//TODO scroll/click to load more
//TODO select what date it should load

$(function(){
    var matchTracking = getMatchHistory();
    loadTen(matchTracking['matches'].splice(0,10));
});


function getMatchHistory(){
    let url = {{ url_for(ajax_newMatchHistory)|tojson }};
    $.ajax({
        type: 'GET', 
        data: { 
            puuid: summoner['puuid']
        },
        url: url,
        cache: false,
        async: false,
        success: function(data) {
            return data
        },
    });
}


function loadTen(matches){
    matches.forEach(matchId => {
        var matchDiv = loadOne(matchId);
        $('#match_history').append(matchDiv)  
    });
                                                                           
}
function loadOne(matchId){
    $.ajax({
        type: 'GET', 
        data: { 
            id: matchId
        },
        url: $SCRIPT_ROOT + "newMatch",
        cache: false,
        async: false,
        success: function(data) {
            return createMatchDiv(data)
        },
    });
}
function createMatchDiv(match){
    let matchDiv = $('<div></div>').addClass('flex flex-col')
    let meta = $('<div></div>').addClass('flex flex-row');
    let players = $('<div></div>').addClass('flex flex-row');

    let date = toDateTime(match['info']['gameCreation'])
    meta.append(date)


    matchDiv.append(meta)
    matchDiv.append(players)
    return matchDiv
}

function toDateTime(secs) {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}

// meta data
// date, length, queueid, win, gameversion

// matchups
// top

// participant
// summoner name
// champ icon
// champ lvl
// spells
// runes
// items
// kda
// kp
// gold diff
// objectives
//