import numpy as np, json
def nap(p):
    G=json.load(open(p))
    def feat(xy,c,s):
        u=(xy[:,0]-c[0])/s; v=(xy[:,1]-c[1])/s
        return np.stack([np.ones_like(u),u,v,u*u,u*v,v*v,u**3,u*u*v,u*v*v,v**3],1)
    def ll2px(lon,lat):
        XY=np.stack([np.asarray(lon)*G['KX'],np.asarray(lat)*G['KY']],-1).reshape(-1,2)
        F=feat(XY,G['c0'],G['s']); return np.stack([F@G['cx'],F@G['cy']],1)
    def px2ll(x,y):
        P=np.stack([np.asarray(x,float),np.asarray(y,float)],-1).reshape(-1,2); F=feat(P,G['pc'],G['si'])
        return np.stack([F@G['ie']/G['KX'],F@G['in']/G['KY']],1)
    return ll2px, px2ll
