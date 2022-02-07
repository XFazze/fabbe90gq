import json
import math


items = json.load(open('/home/pi/website/ratio_code/items.json', 'r'))


def components(item, speed):
    #print("requesting", item, " at ", speed)
    #print(item)
    materials = {}
    for material in items[item]['materials']:
        print("this is material", material['name'], speed, material['amount'],items[item]['output'],speed*material['amount']/items[item]['output'])
        speed_calc = speed*material['amount']/items[item]['output']
        materials[material['name']] = components(material['name'], speed_calc)


    if items[item]['raw']:
        speed_calc = items[item]['output']
        materials = False
        #assemblers = False
    #else:
        #assemblers = items[item]['time']*speed_calc

    ret = {
        'materials' : materials,
        'bspeed' : speed_calc
       # 'assemblers' : assemblers
    }
    return ret


def make_components(item, speed):
    materials_etc = components(item, speed)
    print("\n\nrequested ", item, " at ", speed, " per second")
    print(json.dumps(materials_etc, indent=4, sort_keys=True))
    
    


make_components('transport-belt', 2)
#result = make_components('advanced-circuit' , 1)
# make_components('logistic-chest-active-provider')
# make_components('arithmetic-combinator')