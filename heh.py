import datetime
from datetime import datetime as dt
x = 1621522932
x = dt.fromtimestamp(x)
x = x.stftime('%h/%d/%m')
print(x)