import json, math, copy, random
from system.mass_consume import *

def calculate_consumed(avg_water, avg_food, avg_electric, nv):
    keys = ["water", "food", "electric"]
    consumed = {
        "water": -avg_water,
        "food": -avg_food,
        "electric": -avg_electric
    }
    for key in keys:
        consumed[key] = round(consumed[key]*random.normalvariate(1,nv))

    return consumed
