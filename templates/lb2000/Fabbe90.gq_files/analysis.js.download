$(function () {
  $("#checkProgress").bind("click", function () {
    $.getJSON(
      $SCRIPT_ROOT + "progress",
      {
        puuid: summoner["puuid"],
      },
      function (data) {
        $("#progressDiv").show();
        $("#analazyedMatchesAmount").text(
          "Analyzed games: " + data.analazyedMatchesAmount
        );
        $("#downloadedMatchesAmount").text(
          "Downloaded games: " + data.downloadedMatchesAmount
        );
        $("#totalMatchesAmount").text(
          "Total games: " + data.totalMatchesAmount
        );
      }
    );
    return "false";
  });
});

$(function () {
  $.getJSON(
    $SCRIPT_ROOT + "wr",
    {
      puuid: summoner["puuid"],
    },
    function (data) {
      if (data) {
        // wr in different queueid
        $("#wr").css('display', 'flex');
        $("#queueWR > .totalWR").html(`
            <th class="bg-blue-100 border text-left px-2 py-1">Total</th>
            <th class="bg-blue-100 border text-left px-2 py-1">${
              data.wr.wins
            }/${data.wr.losses}</th>
            <th class="bg-blue-100 border text-left px-2 py-1">${
              Math.round(
                (data.wr.wins * 10000) / (data.wr.losses + data.wr.wins)
              ) / 100
            }</th>
        `);
        var sorted = Object.keys(data.wr).map(function (key) {
          return [key, data.wr[key]];
        });
        sorted.sort(function (first, second) {
          return second[1]["total"] - first[1]["total"];
        });
        sorted.forEach((element) => {
          if (["wins", "losses", "total"].includes(element[0])) {
          } else {
            $("#queueWR").append(`
                <tr id='${element[0]}' class='shadow-lg bg-white'>
                    <th class="bg-blue-100 border text-left px-2 py-1">${
                      element[0]
                    }</th>
                    <th class="bg-blue-100 border text-left px-2 py-1">${
                      element[1].wins
                    }/${element[1].losses}</th>
                    <th class="bg-blue-100 border text-left px-2 py-1">${
                      Math.round(
                        (element[1].wins * 10000) /
                          (element[1].losses + element[1].wins)
                      ) / 100
                    }</th>
                </tr>
                `);
          }
        });
        // wr in different roles
        var res = {
          TOP: {
            wins: 0,
            losses: 0,
            total: 0,
          },
          JUNGLE: {
            wins: 0,
            losses: 0,
            total: 0,
          },
          MIDDLE: {
            wins: 0,
            losses: 0,
            total: 0,
          },
          BOTTOM: {
            wins: 0,
            losses: 0,
            total: 0,
          },
          UTILITY: {
            wins: 0,
            losses: 0,
            total: 0,
          },
        };
        for (const [key, value] of Object.entries(data["wr"])) {
          if (typeof value == "number") {
            continue;
          }
          for (const [akey, avalue] of Object.entries(res)) {
            console.log(value["MIDDLE"]["total"]);
            res[akey]["wins"] += value[akey]["wins"];
            res[akey]["losses"] += value[akey]["losses"];
            res[akey]["total"] += value[akey]["total"];
          }
        }
        console.log(res);
        
        var sorted = Object.keys(res).map(function (key) {
          return [key, res[key]];
        });
        sorted.sort(function (first, second) {
          return second[1]["total"] - first[1]["total"];
        });
        sorted.forEach((element) => {
            $("#roleWR").append(`
            <tr id='${element[0]}' class='shadow-lg bg-white'>
                <th class="bg-blue-100 border text-left px-2 py-1">${
                  element[0]
                }</th>
                <th class="bg-blue-100 border text-left px-2 py-1">${
                  element[1].wins
                }/${element[1].losses}</th>
                <th class="bg-blue-100 border text-left px-2 py-1">${
                  Math.round(
                    (element[1].wins * 10000) /
                      (element[1].losses + element[1].wins)
                  ) / 100
                }</th>
            </tr>
            `);
          
        });
      }
    }
  );
  return "false";
});
