from datetime import datetime
x = 1621522932
x = datetime.fromtimestamp(x).strftime("%H:%m[%d/%m]")
print(x)