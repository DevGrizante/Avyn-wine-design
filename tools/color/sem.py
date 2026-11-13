from palette import cr
import json
D=json.load(open('scales.json'))
S={}
L=D['luxury'];w,g,n=L['wine'],L['gold'],L['neutral']
S['luxury']={'Light':dict(bg='#F3EEE6',grouped='#EAE3D8',surface='#FBF8F3',elevated='#FFFFFF',text=n['950'],text2=n['600'],sep=n['200'],primary=w['900'],onPrimary='#F3EEE6',primarySubtle=w['50'],accent=g['400'],accentInk=g['600']),
             'Dark':dict(bg='#0D0A0B',grouped='#0D0A0B',surface=n['950'],elevated='#251E20',text='#F3EEE6',text2=n['400'],sep=n['800'],primary=w['400'],onPrimary='#0D0A0B',primarySubtle=w['950'],accent=g['300'],accentInk=g['300'])}
M=D['minimal'];w,g,n=M['wine'],M['gold'],M['neutral']
S['minimal']={'Light':dict(bg='#FFFFFF',grouped=n['50'],surface='#FFFFFF',elevated='#FFFFFF',text='#111111',text2=n['600'],sep=n['200'],primary=w['800'],onPrimary='#FFFFFF',primarySubtle=w['50'],accent=g['500'],accentInk=g['600']),
              'Dark':dict(bg='#000000',grouped='#000000',surface='#1C1C1E',elevated='#2C2C2E',text='#F5F5F4',text2=n['400'],sep=n['800'],primary=w['400'],onPrimary='#000000',primarySubtle=w['950'],accent=g['300'],accentInk=g['300'])}
W=D['warm'];w,g,n=W['wine'],W['gold'],W['neutral']
S['warm']={'Light':dict(bg='#F8F3EC',grouped='#F1E9DF',surface='#FFFDF9',elevated='#FFFFFF',text='#221A17',text2=n['600'],sep=n['200'],primary=w['700'],onPrimary='#FFFDF9',primarySubtle=w['50'],accent=g['400'],accentInk=g['600']),
           'Dark':dict(bg='#16110F',grouped='#16110F',surface='#221A18',elevated='#2E2421',text='#F5EDE3',text2=n['400'],sep=n['800'],primary=w['400'],onPrimary='#16110F',primarySubtle=w['950'],accent=g['300'],accentInk=g['300'])}
json.dump(S,open('semantic.json','w'),indent=1)
for k,v in S.items():
  for m,s in v.items():
    print(k,m,'text/bg',cr(s['text'],s['bg']),'text2/bg',cr(s['text2'],s['bg']),'text2/surf',cr(s['text2'],s['surface']),'prim/bg',cr(s['primary'],s['bg']),'prim/surf',cr(s['primary'],s['surface']),'onPrim',cr(s['onPrimary'],s['primary']),'accent/bg',cr(s['accent'],s['bg']),'ink/surf',cr(s['accentInk'],s['surface']))
