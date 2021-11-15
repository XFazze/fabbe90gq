def c(g, H):
    return (g*H)**0.5
def E(p,g,A):
    return p*g*(A**2)/2
en = E(998,9.82,0.5)
cp = c(9.82,5000)

print((2*(100000/(998*9.82)))**0.5)
