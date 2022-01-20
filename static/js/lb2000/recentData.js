$(document).ready(function () {
  start();
  $GAME_VERSION = "12.1.1";
});

async function start() {
  console.log("starteed");
  data = await getRecentData(summoner["puuid"]);
  console.log(data["420"]);
  let soloqtable = $(`<table></table>`).addClass('soloqTable')
  soloqtable.append(createTableRecentData(data["420"]["24h"], '24h'));
  soloqtable.append(createTableRecentData(data["420"]["3d"], '3d'));
  soloqtable.append(createTableRecentData(data["420"]["7d"], '7d'));
  soloqtable.append(createTableRecentData(data["420"]["30d"], '30d'));
  soloqtable.append(createTableRecentData(data["420"]["lifetime"], 'lifetime'));

  let aramTable = $(`<table></table>`).addClass('hidden aramTable')
  aramTable.append(createTableRecentData(data["450"]["24h"], '24h'));
  aramTable.append(createTableRecentData(data["450"]["3d"], '3d'));
  aramTable.append(createTableRecentData(data["450"]["7d"], '7d'));
  aramTable.append(createTableRecentData(data["450"]["30d"], '30d'));
  aramTable.append(createTableRecentData(data["450"]["lifetime"], 'lifetime'));

  let allTable = $(`<table></table>`).addClass('hidden allTable')
  allTable.append(createTableRecentData(data["total"]["24h"], '24h'));
  allTable.append(createTableRecentData(data["total"]["3d"], '3d'));
  allTable.append(createTableRecentData(data["total"]["7d"], '7d'));
  allTable.append(createTableRecentData(data["total"]["30d"], '30d'));
  allTable.append(createTableRecentData(data["total"]["lifetime"], 'lifetime'));
  
  
  $("#recentDataTables").append(soloqtable);
  $("#recentDataTables").append(aramTable);
  $("#recentDataTables").append(allTable);
}


$(function () {$('#soloduoRecentData').bind("click", function () {
    $('.recentDataButtons').children().removeClass("bg-gray-600")
    $('#soloduoRecentData').addClass("bg-gray-600")

    $('#recentDataTables').children().addClass("hidden")
    $('.soloqTable').removeClass("hidden")

  });});
$(function () {$('#aramRecentData').bind("click", function () {
    $('.recentDataButtons').children().removeClass("bg-gray-600")
    $('#aramRecentData').addClass("bg-gray-600")

    $('#recentDataTables').children().addClass("hidden")
    $('.aramTable').removeClass("hidden")

});});
$(function () {$('#recentDataAll').bind("click", function () {
    $('.recentDataButtons').children().removeClass("bg-gray-600")
    $('#recentDataAll').addClass("bg-gray-600")

    $('#recentDataTables').children().addClass("hidden")
    $('.allTable').removeClass("hidden")

});});
async function getRecentData(puuid) {
  return $.ajax({
    type: "GET",
    data: {
      puuid: puuid,
    },
    url: $SCRIPT_ROOT + "recentData",
    cache: false,
    async: false,
    tryCount: 0,
    retryLimit: 10,
    error: function (xhr, textStatus, errorThrown) {
      if (textStatus == "match not found") {
        console.log("awas told to ret");
        this.tryCount++;
        if (this.tryCount <= this.retryLimit) {
          console.log("trying");
          //try again
          $.ajax(this);
          return;
        }
        return;
      }
    },
  });
}

function createTableRecentData(value, key) {
  if (value["total"] == 0) {
    return $(`<tr>
        <th class='w-24'>
            ${key}
        </th>
        <th class='w-18'>
            NO
        </th>
        <th class='w-18'>
            MATCHES
        </th>
        </tr>`);
  } else {
    return $(`<tr>
    <th class='w-24'>
        ${key}
        </th>
        <th class='w-14'>
            ${Math.floor((1000 * value["wins"]) / value["total"]) / 10}%
        </th>
        <th class='w-14'>
            ${value["wins"]}/${value["losses"]}
        </th>
        </tr>`);
  }
}
