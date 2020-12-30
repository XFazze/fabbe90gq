import json, math, numpy, statistics
from sklearn.linear_model import LinearRegression

def avg_of_list(list):
    return sum(list)/len(list)


def calculate_produced():
    # outputs to ds_produce_output an amount that is same as before with correction from prediction
    with open('/home/pi/moin/Rasp/flaskwebsite/secondsite/system/history.json', 'r') as file:
        consumed = json.load(file)
    keys = ["water", "food", "electric"]
    y = {"water" : [], "food" : [], "electric" : []}
    for period in consumed:
        y["water"].append(period["water"])
        y["food"].append(period["food"])
        y["electric"].append(period["electric"])
    
    
    predicted_consumption = {"water": 0, "food": 0, "electric" : 0}
    avg_consumed = {}
    stdev = {}
    for key in keys:
        stdev[key] = statistics.stdev(y[key])
        avg_consumed[key] = avg_of_list(y[key])
        x = numpy.array([1,2,3,4]).reshape((-1, 1))
        y_value = numpy.array(y[key])
        model = LinearRegression().fit(x, y_value)
        x = numpy.array([5]).reshape((-1, 1))
        predicted_consumption[key] =  model.predict(x).tolist()[0]

    storage = json.load(open('/home/pi/moin/Rasp/flaskwebsite/secondsite/system/storage.json', 'r'))

    produce = {"water": 0, "food": 0, "electric" : 0 }
    
    for key in keys:
        produce[key] = round(stdev[key]*1.3 - storage[0][key]  - predicted_consumption[key])
    return produce
   
