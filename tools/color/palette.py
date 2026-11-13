import json, math, sys
sys.stdout.reconfigure(encoding='utf-8')
def srgb_to_lin(c): return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def lin_to_srgb(c): return 12.92*c if c<=0.0031308 else 1.055*(c**(1/2.4))-0.055
def hex2rgb(h): h=h.lstrip('#'); return [int(h[i:i+2],16)/255 for i in (0,2,4)]
def rgb2hex(r): return '#'+''.join(f'{max(0,min(255,round(x*255))):02X}' for x in r)
def to_oklch(h):
    r,g,b=[srgb_to_lin(x) for x in hex2rgb(h)]
    l=0.4122214708*r+0.5363325363*g+0.0514459929*b
    m=0.2119034982*r+0.6806995451*g+0.1073969566*b
    s=0.0883024619*r+0.2817188376*g+0.6299787005*b
    l,m,s=[x**(1/3) if x>=0 else -((-x)**(1/3)) for x in (l,m,s)]
    L=0.2104542553*l+0.7936177850*m-0.0040720468*s
    a=1.9779984951*l-2.4285922050*m+0.4505937099*s
    bb=0.0259040371*l+0.7827717662*m-0.8086757660*s
    return L, math.hypot(a,bb), math.degrees(math.atan2(bb,a))%360
def from_oklch(L,C,H):
    a=C*math.cos(math.radians(H)); b=C*math.sin(math.radians(H))
    l=(L+0.3963377774*a+0.2158037573*b)**3
    m=(L-0.1055613458*a-0.0638541728*b)**3
    s=(L-0.0894841775*a-1.2914855480*b)**3
    r=4.0767416621*l-3.3077115913*m+0.2309699292*s
    g=-1.2684380046*l+2.6097574011*m-0.3413193965*s
    bb=-0.0041960863*l-0.7034186147*m+1.7076147010*s
    return [lin_to_srgb(max(0,min(1,x))) for x in (r,g,bb)]
def in_gamut(L,C,H):
    a=C*math.cos(math.radians(H)); b=C*math.sin(math.radians(H))
    l=(L+0.3963377774*a+0.2158037573*b)**3; m=(L-0.1055613458*a-0.0638541728*b)**3; s=(L-0.0894841775*a-1.2914855480*b)**3
    r=4.0767416621*l-3.3077115913*m+0.2309699292*s; g=-1.2684380046*l+2.6097574011*m-0.3413193965*s; bb=-0.0041960863*l-0.7034186147*m+1.7076147010*s
    return all(-1e-4<=x<=1+1e-4 for x in (r,g,bb))
def lum(h):
    r,g,b=[srgb_to_lin(x) for x in hex2rgb(h)]; return 0.2126*r+0.7152*g+0.0722*b
def cr(a,b):
    a,b=lum(a),lum(b); return round((max(a,b)+0.05)/(min(a,b)+0.05),2)
STEPS=[50,100,200,300,400,500,600,700,800,900,950]
LS={50:0.975,100:0.94,200:0.88,300:0.80,400:0.70,500:0.60,600:0.51,700:0.43,800:0.36,900:0.28,950:0.20}
def scale(anchor, anchor_step, chroma_curve=None, Ls=LS):
    L0,C0,H0=to_oklch(anchor)
    out={}
    for s in STEPS:
        if s==anchor_step: out[s]=anchor.upper(); continue
        L=Ls[s]
        # chroma tapers toward extremes
        t=abs(L-L0)
        k = (max(0.10, 1-0.55*t-1.6*max(0,L-0.82)) if L>L0 else max(0.45,1-0.9*t))
        C=C0*k
        while C>0 and not in_gamut(L,C,H0): C-=0.002
        out[s]=rgb2hex(from_oklch(L,C,H0))
    return out
