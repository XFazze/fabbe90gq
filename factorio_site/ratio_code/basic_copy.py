import json
import math


items = json.load(open('/home/pi/website/factorio_site/ratio_code/items.json', 'r'))


def get_components(item, amount, smelter, assembler):
    result = {}
    produce_per_sek = 1.0/float(items[item]["time"])
    result["ratio"] = amount/(produce_per_sek*items[item]["output"])
    if not items[item]["raw"]:
        for first in items[item]["materials"]:
            result[first["name"]] = get_components(first["name"], first["amount"]*result["ratio"], smelter, assembler)
    return result


def stage(json, lvl, all_output):
    del json["ratio"]
    if not json:
        return
    for items in json.keys():
        if len(json[items]) > 1:
            output = spaces(lvl)+ items + " ratio: "+ str(math.ceil(json[items]["ratio"]))
            all_output.append(output)
            stage(json[items], lvl+1, all_output)
        else:
            output = spaces(lvl)+ items + " ratio: "+str(math.ceil(json[items]["ratio"]))
            all_output.append(output)
            all_output.append(False)
    if lvl == 1:
        return all_output


def nicing(item, ratio, smelter, assembler):
    json = get_components(item, ratio)
    print("Want item", item, "at", ratio,
          "per secoind which needs ratio",  math.ceil(json["ratio"]), "\n")
    stage(json, 1)



def spaces(lvl):
    space = " |---| "
    newspace = ""
    for _ in range(lvl):
        newspace = newspace + space
    return str(newspace+">")

print(stage(get_components("transport-belt",1, 1, 1), 1, []))
json = {'ratio': 0.25,
        'iron-gear-wheel': {'ratio': 0.125,
                            'iron-plate': {'ratio': 0.875,
                                           'iron-ore': {'ratio': 2.8}}},
        'iron-plate': {'ratio': 0.875,
                       'iron-ore': {'ratio': 2.8}}}
