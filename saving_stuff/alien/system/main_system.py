import json, copy
from system.mass_consume import *
from system.produce import *
from system.storage import *


def run_period(input_water_consumption, input_food_consumption, input_electricity_consumption, nv):
    consumed = calculate_consumed(input_water_consumption, input_food_consumption, input_electricity_consumption, nv)

    history = json.load(open('/home/pi/moin/Rasp/flaskwebsite/secondsite/system/history.json', 'r'))

    history[0] = copy.deepcopy(history[1])
    history[1] = copy.deepcopy(history[2])
    history[2] = copy.deepcopy(history[3])
    history[3] = consumed

    with open('/home/pi/moin/Rasp/flaskwebsite/secondsite/system/history.json', 'w') as file:
        json.dump(history, file, indent = 4)

    produce = calculate_produced()
    storage = calculate_storage(consumed, produce)
    return [produce, consumed, storage]

#for _ in range(1):
run_period(100,1000,100, 1.02)


