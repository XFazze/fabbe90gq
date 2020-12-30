import json
import copy


def calculate_storage(consumed, produce):
    keys = ["water", "food", "electric"]
    storage = json.load(
        open('//home/pi/moin/Rasp/flaskwebsite/secondsite/system/storage.json', 'r'))

    for key in keys:
        storage[7][key] = copy.deepcopy(storage[6][key])
        storage[6][key] = copy.deepcopy(storage[5][key])
        storage[5][key] = copy.deepcopy(storage[4][key])
        storage[4][key] = copy.deepcopy(storage[3][key])
        storage[3][key] = copy.deepcopy(storage[2][key])
        storage[2][key] = copy.deepcopy(storage[1][key])
        storage[1][key] = copy.deepcopy(storage[0][key])

        storage[0][key] = storage[0][key]+produce[key]+consumed[key]
        if storage[0][key] < 0.0:
            print("storage.py not enough ", key, "in storage by ", storage[0][key])
            storage[0][key] = 0
    with open('/home/pi/moin/Rasp/flaskwebsite/secondsite/system/storage.json', 'w') as file:
        json.dump(storage, file, indent=4)
    return storage
