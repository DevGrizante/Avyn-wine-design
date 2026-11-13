from palette import *
def auto(anchor):
    L,_,_=to_oklch(anchor); step=min(STEPS,key=lambda s:abs(LS[s]-L)); return scale(anchor,step), step
def neutral(hue, chroma):
    out={}
    for s in STEPS:
        L=LS[s]; C=chroma*(0.6 if L>0.9 else 1)
        out[s]=rgb2hex(from_oklch(L,C,hue))
    return out
D={}
# 1 Luxury Wine
D['luxury']=dict(anchors=dict(wine='#5B1024',gold='#B08D57',noir='#0D0A0B',ivory='#F3EEE6'), neutral=neutral(20,0.010))
# 2 Modern Minimal
D['minimal']=dict(anchors=dict(wine='#7A1E33',gold='#A8884F',noir='#111111',ivory='#FFFFFF'), neutral=neutral(60,0.002))
# 3 Warm & Friendly Premium
D['warm']=dict(anchors=dict(wine='#7E2236',gold='#C29A5B',noir='#16110F',ivory='#F8F3EC'), neutral=neutral(45,0.012))
for k,d in D.items():
    d['wine'],d['wine_step']=auto(d['anchors']['wine'])
    d['gold'],d['gold_step']=auto(d['anchors']['gold'])
json.dump(D,open('scales.json','w'),indent=1)
for k,d in D.items():
    print('==',k,'wine@',d['wine_step'],'gold@',d['gold_step'])
    for n in ('wine','gold','neutral'): print(' ',n,' '.join(f"{s}:{d[n][s]}" for s in STEPS))
