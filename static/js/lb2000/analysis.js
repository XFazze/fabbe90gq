
$(function () {
  // on load
  //WR();
  //FIXME this is not wokring
});

$(function () {
  $("#checkProgress").bind("click", function () {
    $("#analysisButtons").children().removeClass("bg-gray-600");
    $("#checkProgress").addClass("bg-gray-600");
    $.getJSON(
      $SCRIPT_ROOT + "progress",
      {
        puuid: summoner["puuid"],
      },
      function (data) {
        if (data != "0") {
          $("#analysisContent").children().hide();
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
        } else {
          noData();
        }
      }
    );
    return "false";
  });
});

$(function () {
  $("#winrates").bind("click", function () {
    $("#analysisButtons").children().removeClass("bg-gray-600");
    $("#winrates").addClass("bg-gray-600");
    WR();
    $("#analysisContent").children().hide();
    $("#wr").css("display", "flex");
  });
});

$(function () {
  $("#timeOfDay").bind("click", function () {
    $("#analysisButtons").children().removeClass("bg-gray-600");
    $("#timeOfDay").addClass("bg-gray-600");
    WR();
    $("#analysisContent").children().hide();
    $("#timeOfDayDiv").css("display", "flex");
  });
});


function noData() {
  $("#analysisContent").children().hide();
  console.log("there was no data");
  $("#noData").css("display", "flex");
}

function WR() {
  if ($("#wrDone").text() == "1") {
    console.log("data loaded");
    return;
  }
  $.getJSON(
    $SCRIPT_ROOT + "wr",
    {
      puuid: summoner["puuid"],
    },
    function (data) {
      if (data != "0") {
        queueWR(data);
        roleWR(data);
        champWR(data);
        timeOfDay(data);
        $("#wrDone").text("1");
      } else {
        noData();
      }
    }
  );
}

function queueWR(data) {
  // wr in different queueid
  $("#queueWR > .totalWR").html(`
    <th class="bg-blue-100 border text-left px-2 py-1">Total</th>
    <th class="bg-blue-100 border text-left px-2 py-1">${data.wr.wins}/${
    data.wr.losses
  }</th>
    <th class="bg-blue-100 border text-left px-2 py-1">${
      Math.round((data.wr.wins * 10000) / (data.wr.losses + data.wr.wins)) / 100
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
}

function roleWR(data) {
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
      res[akey]["wins"] += value[akey]["wins"];
      res[akey]["losses"] += value[akey]["losses"];
      res[akey]["total"] += value[akey]["total"];
    }
  }

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

function champWR(data) {
  res = {};
  var champs = [
    "Qiyana",
    "MonkeyKing",
    "Jax",
    "Kayn",
    "Yuumi",
    "Shaco",
    "Warwick",
    "Xayah",
    "Sylas",
    "Nidalee",
    "Zyra",
    "Kled",
    "Brand",
    "Rammus",
    "Illaoi",
    "Corki",
    "Braum",
    "Darius",
    "Tryndamere",
    "MissFortune",
    "Yorick",
    "Xerath",
    "Sivir",
    "Riven",
    "Orianna",
    "Sejuani",
    "Viego",
    "Gangplank",
    "Sett",
    "Malphite",
    "Vex",
    "Seraphine",
    "Poppy",
    "Gwen",
    "Kaisa",
    "Jayce",
    "Gnar",
    "Blitzcrank",
    "Trundle",
    "Karthus",
    "Zoe",
    "Graves",
    "Lucian",
    "Akshan",
    "Lux",
    "Shyvana",
    "Renekton",
    "Rell",
    "Fiora",
    "Jinx",
    "Kalista",
    "Fizz",
    "Kassadin",
    "Sona",
    "Vladimir",
    "Viktor",
    "Rakan",
    "Samira",
    "Kindred",
    "Cassiopeia",
    "Maokai",
    "Ornn",
    "Thresh",
    "Kayle",
    "Hecarim",
    "Khazix",
    "Olaf",
    "Ziggs",
    "Syndra",
    "DrMundo",
    "Karma",
    "Annie",
    "Akali",
    "Leona",
    "Yasuo",
    "Kennen",
    "Rengar",
    "Ryze",
    "Shen",
    "Zac",
    "Pantheon",
    "Neeko",
    "Bard",
    "Sion",
    "Vayne",
    "Nasus",
    "FiddleSticks",
    "TwistedFate",
    "Chogath",
    "Udyr",
    "Morgana",
    "Ivern",
    "Volibear",
    "Caitlyn",
    "Anivia",
    "Nocturne",
    "Rumble",
    "Zilean",
    "Azir",
    "Diana",
    "Skarner",
    "Teemo",
    "Urgot",
    "Amumu",
    "Galio",
    "Heimerdinger",
    "Ashe",
    "Velkoz",
    "Singed",
    "Taliyah",
    "Senna",
    "Varus",
    "Twitch",
    "Garen",
    "Yone",
    "Nunu",
    "MasterYi",
    "Pyke",
    "Elise",
    "Alistar",
    "Katarina",
    "Ekko",
    "Mordekaiser",
    "KogMaw",
    "Camille",
    "Aatrox",
    "Draven",
    "TahmKench",
    "Talon",
    "XinZhao",
    "Swain",
    "AurelionSol",
    "LeeSin",
    "Aphelios",
    "Taric",
    "Malzahar",
    "Lissandra",
    "Tristana",
    "RekSai",
    "Irelia",
    "JarvanIV",
    "Nami",
    "Jhin",
    "Lillia",
    "Soraka",
    "Veigar",
    "Janna",
    "Nautilus",
    "Evelynn",
    "Gragas",
    "Zed",
    "Vi",
    "Lulu",
    "Ahri",
    "Quinn",
    "Leblanc",
    "Ezreal",
  ];
  champs.forEach((champ) => {
    res[champ] = {
      wins: 0,
      losses: 0,
      total: 0,
    };
  });
  for (const [key, gamemode] of Object.entries(data["wr"])) {
    // loops throught every game mode
    if (typeof gamemode == "number") {
      continue;
    }
    for (const [key, role] of Object.entries(gamemode)) {
      // loops throught every game mode
      if (typeof role == "number") {
        continue;
      }
      for (const [champ, value] of Object.entries(role)) {
        // loops throught every game mode
        if (typeof value == "number") {
          continue;
        }
        res[champ]["losses"] += value["losses"];
        res[champ]["wins"] += value["wins"];
        res[champ]["total"] += value["total"];
      }
    }
  }
  other = {
    wins: 0,
    losses: 0,
    total: 0,
  };
  for (const [champ, value] of Object.entries(res)) {
    // loops throught every game mode
    if (value["total"] < 10) {
      other["losses"] += value["losses"];
      other["wins"] += value["wins"];
      other["total"] += value["total"];
      delete res[champ];
    }
  }
  var sorted = Object.keys(res).map(function (key) {
    return [key, res[key]];
  });
  sorted.sort(function (first, second) {
    return second[1]["total"] - first[1]["total"];
  });
  sorted.forEach((element) => {
    $("#champWR").append(`
          <tr id='${element[0]}' class='shadow-lg bg-white'>
              <th class="bg-blue-100 border text-left px-2 py-1">${
                element[0]
              }</th>
              <th class="bg-blue-100 border text-left px-2 py-1">${
                element[1].wins
              }/${element[1].losses}</th>
              <th class="bg-blue-100 border text-left px-2 py-1">${
                Math.round((element[1].wins * 10000) / element[1].total) / 100
              }</th>
          </tr>
          `);
  });
  $("#champWR").append(`
        <tr id='Other' class='shadow-lg bg-white'>
            <th class="bg-blue-100 border text-left px-2 py-1">Other</th>
            <th class="bg-blue-100 border text-left px-2 py-1">${
              other["wins"]
            }/${other["losses"]}</th>
            <th class="bg-blue-100 border text-left px-2 py-1">${
              Math.round((other["wins"] * 10000) / other["total"]) / 100
            }</th>
        </tr>
        `);
}

function timeOfDay(data){//FIXME all hours are the same
  for (let index = 0; index < 24; index++) {
    var total = 0;
    var wins = 0;
    var losses = 0;
    for (const [gamemode, value] of Object.entries(data['timeOfDay'])) {
      if (typeof value == "number") {
        continue;
      }
      // loops throught every game mode
      losses += value[index]["losses"];
      wins += value[index]["wins"];
      total += value[index]["wins"]+value[index]["losses"];
    }
    $("#timeOfDayTable").append(`
        <tr id='hour${index}' class='shadow-lg bg-white'>
            <th class="bg-blue-100 border text-left px-2 py-1">${
              index
            }</th>
            <th class="bg-blue-100 border text-left px-2 py-1">${
              wins
            }/${losses}</th>
            <th class="bg-blue-100 border text-left px-2 py-1">${
              Math.round(
                (wins * 10000) /
                  (losses + wins)
              ) / 100
            }</th>
        </tr>
        `);
    res.append
    
  }
}