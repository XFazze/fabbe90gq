v = 5
y = 0
g = -10
t = 0
def p(t, y, v, ):
    t += 00.1
    v = v+-10*t
    y = y+v*t
    print(t, v, y)
    return v, y,t 


for i in range(50):
    v, y,t = p(t, y, v)
