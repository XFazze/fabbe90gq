function createLetters(){
    let gigaFreeLetters = []
    let freeLetters = 'SEabcdefghijklmnopqrstuvwxyz'.split('') //ABCDEFGHIJKLMNOPQRSTUVWYZ
    freeLetters.forEach(letter => {
      freeLetters.forEach(letter2 => {
        gigaFreeLetters.push(letter+letter2)
      })
    });
    freeLetters = freeLetters.concat(gigaFreeLetters)
    return freeLetters
  }
function getNodes(roads){
    var nodes = []
    roads.forEach(road => {
        if(!nodes.includes(road[0])){
            nodes.append(road[0])
        }
        if(!nodes.includes(road[1])){
            nodes.append(road[1])
        }
    });
    return nodes;
}
  
  
  function fillPreset(btn){
      var presets = {};
      presets['preset1'] = [
        [
        ['S', 'a', 2],
        ['S', 'b', 3],
        ['a', 'b', 2],
        ['a', 'E', 4],
        ['b', 'E', 4],
      ], [
        ['S', 200,300],
        ['a', 300,200],
        ['b', 300,400],
        ['E', 400,300],
      ]
      ]
      presets['preset2'] = [
        [
      ['S', 'cc', 1],
      ['S', 'A', 6],
      ['S', 'c', 16],
      ['cc', 'b', 8],
      ['A', 'b', 7],
      ['A', 'c', 17],
      ['c', 'o', 25],
      ['c', 'd', 24],
      ['d', 'e', 28],
      ['b', 'o', 18],
      ['e', 'f', 29],
      ['o', 'f', 26],
      ['b', 'cd', 9],
      ['cd', 'i', 10],
      ['cd', 'cv', 2],
      ['i', 'u', 23],
      ['u', 'f', 27],
      ['f', 'h', 30],
      ['h', 'E', 31],
      ['p', 'E', 21],
      ['p', 'h', 20],
      ['y', 'u', 19],
      ['cv', 'y', 11],
      ['ce', 'y', 12],
      ['cd', 'ce', 3],
      ['ce', '5', 4],
      ['5', '6', 5],
      ['5', 'p', 13],
      ['6', 'j', 15],
      ['6', 'p', 14],
      ['j', 'E', 22],
      ['y', 'p', 0],
      ['p', 'j', 0]
      ],[
    ['S', 40, 600],
    ['c', 70, 300],
    ['d', 120, 100],
    ['A',   200, 400],
    ['cc',   300, 600],
    ['b',   350, 300],
    ['o',   300, 200],
    ['e',   250, 100],
    ['cd',   400, 600],
    ['i',   400, 200],
    ['cv',   500, 550],
    ['ce',   580, 600],
    ['y',   500, 300],
    ['u',   500, 200],
    ['f',   450, 100],
    ['5',   680, 600],
    ['p',   650, 300],
    ['h',   650, 100],
    ['6',   850, 600],
    ['j',   850, 300],
    ['E',   850, 100]
      ]
      ]
      presets['preset3'] = [
       [['S', 'E', 10]],[
        ['S', 300, 300],
        ['E', 600, 600],]
      ]
      presets['preset4'] = [
    [
        [
            "S",
            "c",
            2
        ],
        [
            "S",
            "D",
            3
        ],
        [
            "c",
            "D",
            2
        ],
        [
            "c",
            "E",
            10
        ],
        [
            "E",
            "b",
            10
        ],
        [
            "b",
            "a",
            10
        ],
        [
            "a",
            "D",
            10
        ],
        [
            "D",
            "E",
            10
        ]
    ],
    [
        [
            "S",
            200,
            300
        ],
        [
            "c",
            300,
            200
        ],
        [
            "D",
            300,
            400
        ],
        [
            "a",
            424,
            437
        ],
        [
            "b",
            516,
            342
        ],
        [
            "E",
            421,
            214
        ]
    ]
      ]
      presets['preset5'] = [
        [
            [
                "S",
                "c",
                2
            ],
            [
                "S",
                "G",
                3
            ],
            [
                "c",
                "F",
                4
            ],
            [
                "G",
                "F",
                4
            ],
            [
                "c",
                "b",
                10
            ],
            [
                "b",
                "a",
                10
            ],
            [
                "a",
                "c",
                10
            ],
            [
                "F",
                "c",
                10
            ],
            [
                "c",
                "d",
                10
            ],
            [
                "d",
                "E",
                10
            ],
            [
                "E",
                "b",
                10
            ]
        ],
        [
            [
                "S",
                200,
                300
            ],
            [
                "G",
                300,
                400
            ],
            [
                "F",
                400,
                300
            ],
            [
                "a",
                212,
                171
            ],
            [
                "b",
                351,
                164
            ],
            [
                "c",
                301,
                284
            ],
            [
                "d",
                664,
                182
            ],
            [
                "E",
                591,
                94
            ]
        ]
      ]
     presets['preset6'] = [[['S', 'a', 2],
     ['S', 'b', 3],
     ['a', 'b', 2],
     ['a', 'c', 10],
     ['b', 'f', 10],
     ['e', 'd', 10],
     ['b', 'e', 7],
     ['f', 'd', 14],
     ['f', 'g', 10],
     ['g', 'h', 10],
     ['h', 'E', 10],
     ['a', 'i', 10],
     ['i', 'c', 3],
     ['i', 'j', 10],
     ['j', 'e', 10],
     ['b', 'j', 10],
     ['j', 'k', 10],
     ['k', 'E', 76],
     ['d', 'E', 13],
     ['S', 'm', 10],
     ['m', 'l', 10],
     ['l', 'n', 10],
     ['n', 'c', 10],
     ['r', 'a', 10],
     ['c', 'r', 10],
     ['c', 's', 10],
     ['s', 't', 10],
     ['r', 't', 10],
     ['t', 'E', 10],
     ], [['c', 468, 154],
     ['S', 64, 322],
     ['b', 174, 553],
     ['d', 646, 600],
     ['E', 825, 328],
     ['e', 482, 523],
     ['f', 369, 624],
     ['h', 770, 602],
     ['g', 597, 657],
     ['j', 433, 402],
     ['k', 534, 363],
     ['l', 229, 72],
     ['m', 144, 182],
     ['n', 338, 100],
     ['i', 361, 300],
     ['a', 295, 193],
     ['s', 580, 193],
     ['t', 663, 250],
     ['r', 523, 264],
     ]]
     presets['preset7']=[[['a', 'b', 2],
     ['a', 'c', 10],
     ['b', 'f', 10],
     ['e', 'd', 10],
     ['b', 'e', 7],
     ['f', 'g', 10],
     ['j', 'e', 10],
     ['n', 'c', 10],
     ['r', 'a', 10],
     ['c', 'r', 10],
     ['c', 'o', 10],
     ['o', 'n', 10],
     ['p', 'e', 10],
     ['d', 'p', 10],
     ['d', 'E', 24],
     ['S', 'b', 32],
     ['S', 'a', 26],
     ['S', 'm', 1],
     ['m', 'l', 1],
     ['l', 'n', 0],
     ['t', 'E', 922],
     ['e', 'u', 10],
     ['u', 'p', 10],
     ['p', 'v', 10],
     ['v', 'E', 10],
     ['w', 'E', 10],
     ['g', 'w', 11],
     ['o', 'h', 10],
     ['z', 'x', 10],
     ['h', 'z', 10],
     ['z', 'y', 10],
     ['x', 'E', 12],
     ['n', 'aa', 10],
     ['ab', 'h', 10],
     ['aa', 'ab', 1],
     ['h', 'ac', 10],
     ['ac', 'x', 10],
     ['y', 'E', 10],
     ['n', 'a', 10],
     ['a', 'j', 10],
     ['j', 'i', 24],
     ['i', 'k', 24],
     ['k', 'E', 20],
     ['j', 'ad', 10],
     ['ad', 'k', 30],
     ['S', 'q', 10],
     ['q', 'a', 10],
     ['b', 'ae', 10],
     ['ae', 'j', 10],
     ['d', 'ag', 10],
     ['ag', 'g', 10],
     ['af', 'f', 11],
     ['ag', 'af', 14],
     ['c', 's', 14],
     ['s', 't', 50],
     ['r', 't', 20],
     ['ae', 'ah', 10],
     ['ah', 'ad', 10],
     ['n', 'm', 10],
     ], [['c', 468, 154],
     ['S', 64, 322],
     ['e', 482, 523],
     ['g', 597, 657],
     ['j', 433, 402],
     ['a', 295, 193],
     ['s', 580, 193],
     ['t', 663, 250],
     ['r', 523, 264],
     ['p', 663, 456],
     ['u', 569, 421],
     ['v', 712, 401],
     ['E', 866, 318],
     ['w', 836, 530],
     ['x', 866, 120],
     ['y', 792, 192],
     ['z', 713, 126],
     ['h', 682, 36],
     ['l', 163, 55],
     ['m', 96, 165],
     ['n', 256, 69],
     ['aa', 360, 19],
     ['ab', 484, 8],
     ['o', 509, 79],
     ['ac', 816, 27],
     ['i', 506, 374],
     ['k', 651, 347],
     ['ad', 489, 306],
     ['q', 143, 346],
     ['b', 88, 594],
     ['ae', 247, 424],
     ['f', 231, 638],
     ['d', 715, 564],
     ['af', 489, 597],
     ['ag', 577, 591],
     ['ah', 286, 336],
     ]]
     presets['preset8'] = [[['S', 'bu', 10],
     ['bu', 'S', 10],
     ['bu', 'S', 10],
     ['S', 'bu', 10],
     ['bu', 'b', 10],
     ['b', 'bu', 10],
     ['b', 'bu', 10],
     ['bu', 'b', 10],
     ['b', 'bv', 10],
     ['bv', 'b', 10],
     ['bv', 'b', 10],
     ['b', 'bv', 10],
     ['bv', 'c', 10],
     ['c', 'bv', 10],
     ['c', 'bv', 10],
     ['bv', 'c', 10],
     ['c', 'ay', 10],
     ['ay', 'c', 10],
     ['ay', 'c', 10],
     ['c', 'ay', 10],
     ['ay', 'av', 10],
     ['av', 'ay', 10],
     ['av', 'ay', 10],
     ['ay', 'av', 10],
     ['e', 'bg', 10],
     ['bg', 'e', 10],
     ['bg', 'e', 10],
     ['e', 'bg', 10],
     ['j', 'at', 10],
     ['at', 'j', 10],
     ['at', 'j', 10],
     ['j', 'at', 10],
     ['j', 'as', 10],
     ['as', 'j', 10],
     ['as', 'j', 10],
     ['j', 'as', 10],
     ['as', 'i', 10],
     ['i', 'as', 10],
     ['i', 'as', 10],
     ['as', 'i', 10],
     ['i', 'h', 10],
     ['h', 'i', 10],
     ['h', 'i', 10],
     ['i', 'h', 10],
     ['h', 'g', 10],
     ['g', 'h', 10],
     ['g', 'h', 10],
     ['h', 'g', 10],
     ['g', 'bh', 10],
     ['bh', 'g', 10],
     ['bh', 'g', 10],
     ['g', 'bh', 10],
     ['q', 'ao', 10],
     ['ao', 'q', 10],
     ['ao', 'q', 10],
     ['q', 'ao', 10],
     ['bg', 'at', 20],
     ['at', 'bg', 20],
     ['at', 'bg', 20],
     ['bg', 'at', 20],
     ['at', 'bx', 10],
     ['bx', 'at', 10],
     ['bx', 'at', 10],
     ['at', 'bx', 10],
     ['bx', 'by', 10],
     ['by', 'bx', 10],
     ['by', 'bx', 10],
     ['bx', 'by', 10],
     ['by', 'ad', 10],
     ['ad', 'by', 10],
     ['ad', 'by', 10],
     ['by', 'ad', 10],
     ['ad', 'af', 10],
     ['af', 'ad', 10],
     ['af', 'ad', 10],
     ['ad', 'af', 10],
     ['af', 'ae', 10],
     ['ae', 'af', 10],
     ['ae', 'af', 10],
     ['af', 'ae', 10],
     ['ae', 'bs', 10],
     ['bs', 'ae', 10],
     ['bs', 'ae', 10],
     ['ae', 'bs', 10],
     ['bs', 't', 10],
     ['t', 'bs', 10],
     ['t', 'bs', 10],
     ['bs', 't', 10],
     ['t', 'l', 10],
     ['l', 't', 10],
     ['l', 'ba', 10],
     ['ba', 'l', 10],
     ['ba', 'l', 10],
     ['l', 'ba', 10],
     ['ba', 'az', 10],
     ['az', 'ba', 10],
     ['az', 'ba', 10],
     ['ba', 'az', 10],
     ['az', 'S', 10],
     ['S', 'az', 10],
     ['S', 'az', 10],
     ['az', 'S', 10],
     ['bb', 'az', 10],
     ['az', 'bb', 10],
     ['az', 'bb', 10],
     ['bb', 'az', 10],
     ['bb', 'w', 10],
     ['w', 'bb', 10],
     ['w', 'bb', 10],
     ['bb', 'w', 10],
     ['w', 'v', 10],
     ['v', 'w', 10],
     ['v', 'w', 10],
     ['w', 'v', 10],
     ['y', 'v', 10],
     ['v', 'y', 10],
     ['v', 'y', 10],
     ['y', 'v', 10],
     ['aa', 'ab', 10],
     ['ab', 'aa', 10],
     ['ab', 'aa', 10],
     ['aa', 'ab', 10],
     ['a', 'bc', 10],
     ['bc', 'a', 10],
     ['bc', 'a', 10],
     ['a', 'bc', 10],
     ['S', 'a', 10],
     ['a', 'S', 10],
     ['a', 'S', 10],
     ['S', 'a', 10],
     ['bc', 'ax', 10],
     ['ax', 'bc', 10],
     ['ax', 'bc', 10],
     ['bc', 'ax', 10],
     ['aw', 'a', 10],
     ['a', 'aw', 10],
     ['a', 'aw', 10],
     ['aw', 'a', 10],
     ['f', 'd', 10],
     ['d', 'f', 10],
     ['d', 'f', 10],
     ['f', 'd', 10],
     ['d', 'bw', 10],
     ['bw', 'd', 10],
     ['bw', 'd', 10],
     ['d', 'bw', 10],
     ['bw', 'ar', 10],
     ['ar', 'bw', 10],
     ['ar', 'bw', 10],
     ['bw', 'ar', 10],
     ['ar', 'bi', 10],
     ['bi', 'ar', 10],
     ['bi', 'ar', 10],
     ['ar', 'bi', 10],
     ['bi', 'aq', 10],
     ['aq', 'bi', 10],
     ['aq', 'bi', 10],
     ['bi', 'aq', 10],
     ['bj', 'ap', 10],
     ['ap', 'bj', 10],
     ['ap', 'bj', 10],
     ['bj', 'ap', 10],
     ['aq', 'bj', 10],
     ['bj', 'aq', 10],
     ['bj', 'aq', 10],
     ['aq', 'bj', 10],
     ['bj', 'bk', 10],
     ['bk', 'bj', 10],
     ['bk', 'bj', 10],
     ['bj', 'bk', 10],
     ['bk', 'bl', 10],
     ['bl', 'bk', 10],
     ['bl', 'bk', 10],
     ['bk', 'bl', 10],
     ['bl', 'an', 10],
     ['an', 'bl', 10],
     ['an', 'bl', 10],
     ['bl', 'an', 10],
     ['an', 'am', 10],
     ['am', 'an', 10],
     ['am', 'an', 10],
     ['an', 'am', 10],
     ['an', 'E', 10],
     ['E', 'an', 10],
     ['E', 'an', 10],
     ['an', 'E', 10],
     ['bm', 'an', 10],
     ['an', 'bm', 10],
     ['an', 'bm', 10],
     ['bm', 'an', 10],
     ['bn', 'bq', 10],
     ['bq', 'bn', 10],
     ['bq', 'bn', 10],
     ['bn', 'bq', 10],
     ['bq', 'ak', 10],
     ['ak', 'bq', 10],
     ['ak', 'bq', 10],
     ['bq', 'ak', 10],
     ['bm', 'bn', 50],
     ['bn', 'bm', 50],
     ['bn', 'bm', 50],
     ['bm', 'bn', 50],
     ['an', 'r', 99],
     ['r', 'an', 99],
     ['r', 'an', 99],
     ['an', 'r', 99],
     ['r', 'ak', 55],
     ['ak', 'r', 55],
     ['ak', 'r', 55],
     ['r', 'ak', 55],
     ['ak', 'bn', 20],
     ['bn', 'ak', 20],
     ['bn', 'ak', 20],
     ['ak', 'bn', 20],
     ['bp', 'ak', 10],
     ['ak', 'bp', 10],
     ['ak', 'bp', 10],
     ['bp', 'ak', 10],
     ['bp', 'ai', 10],
     ['ai', 'bp', 10],
     ['ai', 'bp', 10],
     ['bp', 'ai', 10],
     ['ai', 'be', 10],
     ['be', 'ai', 10],
     ['be', 'ai', 10],
     ['ai', 'be', 10],
     ['be', 'ah', 10],
     ['ah', 'be', 10],
     ['ah', 'be', 10],
     ['be', 'ah', 10],
     ['ah', 'bd', 10],
     ['bd', 'ah', 10],
     ['bd', 'ah', 10],
     ['ah', 'bd', 10],
     ['u', 'z', 10],
     ['z', 'u', 10],
     ['z', 'u', 10],
     ['u', 'z', 10],
     ['bd', 'u', 30],
     ['u', 'bd', 30],
     ['u', 'bd', 30],
     ['bd', 'u', 30],
     ['z', 'aa', 40],
     ['aa', 'z', 40],
     ['aa', 'z', 40],
     ['z', 'aa', 40],
     ['x', 'z', 2],
     ['z', 'x', 2],
     ['z', 'x', 2],
     ['x', 'z', 2],
     ['x', 'v', 15],
     ['v', 'x', 15],
     ['v', 'x', 15],
     ['x', 'v', 15],
     ['az', 'y', 23],
     ['y', 'az', 23],
     ['y', 'az', 23],
     ['az', 'y', 23],
     ['ab', 'a', 6],
     ['a', 'ab', 6],
     ['a', 'ab', 6],
     ['ab', 'a', 6],
     ['ar', 'ap', 2],
     ['ap', 'ar', 2],
     ['ap', 'ar', 2],
     ['ar', 'ap', 2],
     ['ap', 'bz', 10],
     ['bz', 'ap', 10],
     ['bz', 'ap', 10],
     ['ap', 'bz', 10],
     ['bz', 'p', 10],
     ['p', 'bz', 10],
     ['p', 'bz', 10],
     ['bz', 'p', 10],
     ['am', 'p', 10],
     ['p', 'am', 10],
     ['p', 'am', 10],
     ['am', 'p', 10],
     ['au', 'p', 10],
     ['p', 'au', 10],
     ['p', 'au', 10],
     ['au', 'p', 10],
     ['o', 'bo', 10],
     ['bo', 'o', 10],
     ['bo', 'o', 10],
     ['o', 'bo', 10],
     ['al', 'ai', 10],
     ['ai', 'al', 10],
     ['ai', 'al', 10],
     ['al', 'ai', 10],
     ['aj', 'o', 10],
     ['o', 'aj', 10],
     ['o', 'aj', 10],
     ['aj', 'o', 10],
     ['o', 'au', 10],
     ['au', 'o', 10],
     ['au', 'o', 10],
     ['o', 'au', 10],
     ['bo', 'al', 90],
     ['al', 'bo', 90],
     ['al', 'bo', 90],
     ['bo', 'al', 90],
     ['bo', 'am', 90],
     ['am', 'bo', 90],
     ['am', 'bo', 90],
     ['bo', 'am', 90],
     ['aj', 'br', 10],
     ['br', 'aj', 10],
     ['br', 'aj', 10],
     ['aj', 'br', 10],
     ['br', 'm', 10],
     ['m', 'br', 10],
     ['m', 'br', 10],
     ['br', 'm', 10],
     ['n', 'm', 10],
     ['m', 'n', 10],
     ['m', 'n', 10],
     ['n', 'm', 10],
     ['n', 'ag', 10],
     ['ag', 'n', 10],
     ['ag', 'n', 10],
     ['n', 'ag', 10],
     ['ag', 'bs', 10],
     ['bs', 'ag', 10],
     ['bs', 'ag', 10],
     ['ag', 'bs', 10],
     ['bt', 'ac', 10],
     ['ac', 'bt', 10],
     ['ac', 'bt', 10],
     ['bt', 'ac', 10],
     ['ac', 'k', 10],
     ['k', 'ac', 10],
     ['k', 'ac', 10],
     ['ac', 'k', 10],
     ['bw', 'k', 10],
     ['k', 'bw', 10],
     ['k', 'bw', 10],
     ['bw', 'k', 10],
     ['f', 'ar', 10],
     ['ar', 'f', 10],
     ['ar', 'f', 10],
     ['f', 'ar', 10],
     ['s', 'as', 10],
     ['as', 's', 10],
     ['as', 's', 10],
     ['s', 'as', 10],
     ['s', 'o', 10],
     ['o', 's', 10],
     ['o', 's', 10],
     ['s', 'o', 10],
     ['aa', 'u', 10],
     ['u', 'aa', 10],
     ['u', 'aa', 10],
     ['aa', 'u', 10],
     ['ab', 'bv', 10],
     ['bv', 'ab', 10],
     ['bv', 'ab', 10],
     ['ab', 'bv', 10],
     ['ax', 'f', 70],
     ['f', 'ax', 70],
     ['f', 'ax', 70],
     ['ax', 'f', 70],
     ['ao', 'SS', 10],
     ['SS', 'ao', 10],
     ['SS', 'ao', 10],
     ['ao', 'SS', 10],
     ['ao', 'E', 70],
     ['E', 'ao', 70],
     ['E', 'ao', 70],
     ['ao', 'E', 70],
     ['SS', 'E', 30],
     ['E', 'SS', 30],
     ['E', 'SS', 30],
     ['SS', 'E', 30],
     ['SE', 'bh', 10],
     ['bh', 'SE', 10],
     ['bh', 'SE', 10],
     ['SE', 'bh', 10],
     ['SE', 'q', 40],
     ['q', 'SE', 40],
     ['q', 'SE', 40],
     ['SE', 'q', 40],
     ['av', 'e', 30],
     ['e', 'av', 30],
     ['e', 'av', 30],
     ['av', 'e', 30],
     ['ax', 'aw', 10],
     ['aw', 'ax', 10],
     ['aw', 'ax', 10],
     ['ax', 'aw', 10],
     ['av', 'ax', 10],
     ['ax', 'av', 10],
     ['ax', 'av', 10],
     ['av', 'ax', 10],
     ['aw', 'av', 33],
     ['av', 'aw', 33],
     ['av', 'aw', 33],
     ['aw', 'av', 33],
     ['az', 'l', 20],
     ['l', 'az', 20],
     ['l', 'az', 20],
     ['az', 'l', 20],
     ['l', 't', 88],
     ['t', 'l', 88],
     ['l', 'Sa', 10],
     ['Sa', 'l', 10],
     ['Sa', 't', 10],
     ['t', 'Sa', 10],
     ['l', 'Sb', 10],
     ['Sb', 'l', 10],
     ['Sb', 'ae', 20],
     ['ae', 'Sb', 20],
     ['z', 'Sc', 10],
     ['Sc', 'z', 10],
     ['Sc', 'ah', 80],
     ['ah', 'Sc', 80],
     ['Sd', 'Sc', 10],
     ['Sc', 'Sd', 10],
     ['be', 'Se', 10],
     ['Se', 'be', 10],
     ['Se', 'bp', 10],
     ['bp', 'Se', 10],
     ['Sd', 'n', 70],
     ['n', 'Sd', 70],
     ], [['S', 65, 365],
     ['E', 827, 340],
     ['a', 96, 233],
     ['c', 224, 222],
     ['d', 276, 153],
     ['e', 318, 85],
     ['f', 364, 49],
     ['g', 540, 73],
     ['h', 568, 175],
     ['i', 514, 227],
     ['k', 327, 274],
     ['n', 508, 598],
     ['p', 637, 291],
     ['q', 771, 137],
     ['r', 777, 469],
     ['u', 283, 590],
     ['v', 118, 580],
     ['w', 82, 497],
     ['x', 63, 634],
     ['y', 144, 503],
     ['z', 232, 656],
     ['aa', 233, 505],
     ['ab', 239, 346],
     ['ac', 326, 335],
     ['ag', 442, 576],
     ['ah', 426, 672],
     ['ai', 639, 629],
     ['aj', 618, 530],
     ['ak', 755, 628],
     ['am', 698, 373],
     ['an', 733, 329],
     ['ao', 785, 241],
     ['ap', 648, 170],
     ['aq', 703, 46],
     ['as', 527, 304],
     ['at', 393, 285],
     ['au', 576, 381],
     ['aw', 107, 169],
     ['ax', 35, 46],
     ['ay', 183, 150],
     ['az', 161, 417],
     ['bb', 65, 430],
     ['bc', 46, 266],
     ['bd', 357, 599],
     ['be', 510, 670],
     ['bf', 456, 181],
     ['bi', 617, 114],
     ['bj', 851, 60],
     ['bk', 857, 177],
     ['bl', 698, 221],
     ['bm', 851, 447],
     ['bn', 857, 598],
     ['bo', 668, 467],
     ['bq', 832, 686],
     ['br', 560, 569],
     ['bs', 448, 516],
     ['bt', 357, 406],
     ['bu', 156, 340],
     ['bv', 221, 285],
     ['bw', 307, 203],
     ['bg', 382, 170],
     ['j', 447, 257],
     ['bx', 390, 334],
     ['by', 439, 318],
     ['ad', 422, 382],
     ['ar', 483, 103],
     ['al', 687, 540],
     ['bp', 714, 670],
     ['b', 115, 301],
     ['bz', 607, 211],
     ['o', 530, 459],
     ['m', 527, 524],
     ['s', 508, 375],
     ['bh', 597, 31],
     ['av', 163, 85],
     ['SS', 850, 245],
     ['SE', 683, 101],
     ['Sa', 286, 503],
     ['l', 298, 424],
     ['ba', 218, 459],
     ['t', 358, 536],
     ['Sb', 352, 446],
     ['ae', 429, 449],
     ['af', 492, 418],
     ['Sc', 308, 668],
     ['Sd', 345, 641],
     ['Se', 627, 679],
     ]]
     nodes = presets[btn][1]
      roads = presets[btn][0]
      reFill('editGraph', roads, nodes)
      return {nodes, roads, nodeNameToCoords}
  }
  

  
  async function checkHitNode(mouseX, mouseY, nodes){
    let res = 0
    hitNode = undefined
    roadOrigin = undefined
    nodes.forEach(node => {
      if (Math.abs(mouseX- node[1]) < 20 && Math.abs(mouseY- node[2]) < 20){
        res = 1
        hitNode= node
      
  
    }});
    return hitNode
    
  }
  
  async function checkHitRoadWeight(roads,nodeNameToCoords,mouseX,mouseY){
    let res = 0
    roads.forEach(road => {
      let begiCoords = nodeNameToCoords[road[0]]
      let endCoords = nodeNameToCoords[road[1]]
      middleCoords = [(begiCoords[0]+endCoords[0])/2, (begiCoords[1]+endCoords[1])/2]
      if (Math.abs(mouseX- middleCoords[0]) < 20 && Math.abs(mouseY- middleCoords[1]) < 20){
        
        res = {road, middleCoords}
  
    }
      
    });
    return res
  
  }
  
  async function removeOldEditRoadWeight(){
    let canvasChildren = $('#canvasDiv').children()
    for (let i = 0; i < canvasChildren.length; i++) {
      const element = canvasChildren[i];
      if(element.tagName == 'INPUT'){
        $('#canvasDiv')[0].removeChild(element);
      }
      
    }
  
  
  }
  
  function findFreeLetters(letters, nodes){
    let freeLetters = [...letters]
    nodes.forEach(node => {
      if(freeLetters.includes(node[0])){
        let i = freeLetters.indexOf(node[0])
        freeLetters.splice(i, 1)
      }
    });
    return freeLetters

  }
  async function createNode(coords, letters, nodes){
    let freeLetters = findFreeLetters(letters, nodes)
    nodes.push([freeLetters[0], coords[0], coords[1]])
    console.log('created node')
    return nodes;
  }
  
  async function moveNode(){
    let i = nodes.indexOf(hitNode)
    nodes.splice(i,1)
    hitNode[1] = mouseX;
    hitNode[2] = mouseY;
    await nodes.push(hitNode)
  
  
  }
  
  async function chechNodeOrRoad(mouseX,mouseY, nodes, roads, hitNode){
    let createdRoad = false
    nodes.forEach(node => {
      if (Math.abs(mouseX- node[1]) < 20 && Math.abs(mouseY- node[2]) < 20){
        if(hitNode[0] != node[0]){
          roads.push([hitNode[0], node[0], 10])
          createdRoad = true
          return
        }
      }
    });
    if(!createdRoad){
      nodes = moveNode()
    }
    return roads
  
  
  }

  function deleteSomething(mousePosition, roads, nodes){
    nodes.forEach(node => {
        if (Math.abs(mousePosition.x- node[1]) < 20 && Math.abs(mousePosition.y- node[2]) < 20){
            let i = nodes.indexOf(node)
            nodes.splice(i,1)
            for (let index = roads.length-1; index >= 0; index--) {
              const road = roads[index];
              
              if(road[1] == node[0] || road[0] == node[0]){
                let i = roads.indexOf(road)
                roads.splice(i,1)
    
              }
            };      

    
      }});

      roads.forEach(road => {
        let begiCoords = nodeNameToCoords[road[0]]
        let endCoords = nodeNameToCoords[road[1]]
        middleCoords = [(begiCoords[0]+endCoords[0])/2, (begiCoords[1]+endCoords[1])/2]
        if (Math.abs(mousePosition.x- middleCoords[0]) < 20 && Math.abs(mousePosition.y- middleCoords[1]) < 20){
          
           //  console.log('removing road', road);
            let i = roads.indexOf(road)
           //  console.log('removing road', roads.length);
            roads.splice(i,1)
           //  console.log('removing road', roads.length);
          }
        
      });
      reFill('editGraph', roads, nodes)
  }

function printGraph(nodes, roads){
  var copyText = document.createElement("textarea");
  document.body.appendChild(copyText);
  var msg = '[['
  roads.forEach(node => {
    msg += `['${node[0]}', '${node[1]}', ${node[2]}],\n`
  });
  msg += '], ['
  nodes.forEach(node => {
    msg += `['${node[0]}', ${node[1]}, ${node[2]}],\n`
  });
  msg += ']]'
  console.log(msg)
  copyText.value = msg;
  copyText.select();
  document.execCommand("copy");
  document.body.removeChild(copyText);

}