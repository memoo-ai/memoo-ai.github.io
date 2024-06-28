import{r as b}from"./react-CJmdbff5.js";var Ue=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,Ae=Math.ceil,X=Math.floor,F="[BigNumber Error] ",be=F+"Number primitive has more than 15 significant digits: ",Y=1e14,_=14,_e=9007199254740991,Te=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],te=1e7,L=1e9;function Ce(n){var p,g,E,h=m.prototype={constructor:m,toString:null,valueOf:null},w=new m(1),x=20,O=4,N=-7,A=21,R=-1e7,M=1e7,B=!1,U=1,q=0,Ee={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},ne="0123456789abcdefghijklmnopqrstuvwxyz",Oe=!0;function m(e,t){var r,f,o,a,u,i,s,c,l=this;if(!(l instanceof m))return new m(e,t);if(t==null){if(e&&e._isBigNumber===!0){l.s=e.s,!e.c||e.e>M?l.c=l.e=null:e.e<R?l.c=[l.e=0]:(l.e=e.e,l.c=e.c.slice());return}if((i=typeof e=="number")&&e*0==0){if(l.s=1/e<0?(e=-e,-1):1,e===~~e){for(a=0,u=e;u>=10;u/=10,a++);a>M?l.c=l.e=null:(l.e=a,l.c=[e]);return}c=String(e)}else{if(!Ue.test(c=String(e)))return E(l,c,i);l.s=c.charCodeAt(0)==45?(c=c.slice(1),-1):1}(a=c.indexOf("."))>-1&&(c=c.replace(".","")),(u=c.search(/e/i))>0?(a<0&&(a=u),a+=+c.slice(u+1),c=c.substring(0,u)):a<0&&(a=c.length)}else{if(D(t,2,ne.length,"Base"),t==10&&Oe)return l=new m(e),H(l,x+l.e+1,O);if(c=String(e),i=typeof e=="number"){if(e*0!=0)return E(l,c,i,t);if(l.s=1/e<0?(c=c.slice(1),-1):1,m.DEBUG&&c.replace(/^0\.0*|\./,"").length>15)throw Error(be+e)}else l.s=c.charCodeAt(0)===45?(c=c.slice(1),-1):1;for(r=ne.slice(0,t),a=u=0,s=c.length;u<s;u++)if(r.indexOf(f=c.charAt(u))<0){if(f=="."){if(u>a){a=s;continue}}else if(!o&&(c==c.toUpperCase()&&(c=c.toLowerCase())||c==c.toLowerCase()&&(c=c.toUpperCase()))){o=!0,u=-1,a=0;continue}return E(l,String(e),i,t)}i=!1,c=g(c,t,10,l.s),(a=c.indexOf("."))>-1?c=c.replace(".",""):a=c.length}for(u=0;c.charCodeAt(u)===48;u++);for(s=c.length;c.charCodeAt(--s)===48;);if(c=c.slice(u,++s)){if(s-=u,i&&m.DEBUG&&s>15&&(e>_e||e!==X(e)))throw Error(be+l.s*e);if((a=a-u-1)>M)l.c=l.e=null;else if(a<R)l.c=[l.e=0];else{if(l.e=a,l.c=[],u=(a+1)%_,a<0&&(u+=_),u<s){for(u&&l.c.push(+c.slice(0,u)),s-=_;u<s;)l.c.push(+c.slice(u,u+=_));u=_-(c=c.slice(u)).length}else u-=s;for(;u--;c+="0");l.c.push(+c)}}else l.c=[l.e=0]}m.clone=Ce,m.ROUND_UP=0,m.ROUND_DOWN=1,m.ROUND_CEIL=2,m.ROUND_FLOOR=3,m.ROUND_HALF_UP=4,m.ROUND_HALF_DOWN=5,m.ROUND_HALF_EVEN=6,m.ROUND_HALF_CEIL=7,m.ROUND_HALF_FLOOR=8,m.EUCLID=9,m.config=m.set=function(e){var t,r;if(e!=null)if(typeof e=="object"){if(e.hasOwnProperty(t="DECIMAL_PLACES")&&(r=e[t],D(r,0,L,t),x=r),e.hasOwnProperty(t="ROUNDING_MODE")&&(r=e[t],D(r,0,8,t),O=r),e.hasOwnProperty(t="EXPONENTIAL_AT")&&(r=e[t],r&&r.pop?(D(r[0],-L,0,t),D(r[1],0,L,t),N=r[0],A=r[1]):(D(r,-L,L,t),N=-(A=r<0?-r:r))),e.hasOwnProperty(t="RANGE"))if(r=e[t],r&&r.pop)D(r[0],-L,-1,t),D(r[1],1,L,t),R=r[0],M=r[1];else if(D(r,-L,L,t),r)R=-(M=r<0?-r:r);else throw Error(F+t+" cannot be zero: "+r);if(e.hasOwnProperty(t="CRYPTO"))if(r=e[t],r===!!r)if(r)if(typeof crypto<"u"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))B=r;else throw B=!r,Error(F+"crypto unavailable");else B=r;else throw Error(F+t+" not true or false: "+r);if(e.hasOwnProperty(t="MODULO_MODE")&&(r=e[t],D(r,0,9,t),U=r),e.hasOwnProperty(t="POW_PRECISION")&&(r=e[t],D(r,0,L,t),q=r),e.hasOwnProperty(t="FORMAT"))if(r=e[t],typeof r=="object")Ee=r;else throw Error(F+t+" not an object: "+r);if(e.hasOwnProperty(t="ALPHABET"))if(r=e[t],typeof r=="string"&&!/^.?$|[+\-.\s]|(.).*\1/.test(r))Oe=r.slice(0,10)=="0123456789",ne=r;else throw Error(F+t+" invalid: "+r)}else throw Error(F+"Object expected: "+e);return{DECIMAL_PLACES:x,ROUNDING_MODE:O,EXPONENTIAL_AT:[N,A],RANGE:[R,M],CRYPTO:B,MODULO_MODE:U,POW_PRECISION:q,FORMAT:Ee,ALPHABET:ne}},m.isBigNumber=function(e){if(!e||e._isBigNumber!==!0)return!1;if(!m.DEBUG)return!0;var t,r,f=e.c,o=e.e,a=e.s;e:if({}.toString.call(f)=="[object Array]"){if((a===1||a===-1)&&o>=-L&&o<=L&&o===X(o)){if(f[0]===0){if(o===0&&f.length===1)return!0;break e}if(t=(o+1)%_,t<1&&(t+=_),String(f[0]).length==t){for(t=0;t<f.length;t++)if(r=f[t],r<0||r>=Y||r!==X(r))break e;if(r!==0)return!0}}}else if(f===null&&o===null&&(a===null||a===1||a===-1))return!0;throw Error(F+"Invalid BigNumber: "+e)},m.maximum=m.max=function(){return De(arguments,-1)},m.minimum=m.min=function(){return De(arguments,1)},m.random=function(){var e=9007199254740992,t=Math.random()*e&2097151?function(){return X(Math.random()*e)}:function(){return(Math.random()*1073741824|0)*8388608+(Math.random()*8388608|0)};return function(r){var f,o,a,u,i,s=0,c=[],l=new m(w);if(r==null?r=x:D(r,0,L),u=Ae(r/_),B)if(crypto.getRandomValues){for(f=crypto.getRandomValues(new Uint32Array(u*=2));s<u;)i=f[s]*131072+(f[s+1]>>>11),i>=9e15?(o=crypto.getRandomValues(new Uint32Array(2)),f[s]=o[0],f[s+1]=o[1]):(c.push(i%1e14),s+=2);s=u/2}else if(crypto.randomBytes){for(f=crypto.randomBytes(u*=7);s<u;)i=(f[s]&31)*281474976710656+f[s+1]*1099511627776+f[s+2]*4294967296+f[s+3]*16777216+(f[s+4]<<16)+(f[s+5]<<8)+f[s+6],i>=9e15?crypto.randomBytes(7).copy(f,s):(c.push(i%1e14),s+=7);s=u/7}else throw B=!1,Error(F+"crypto unavailable");if(!B)for(;s<u;)i=t(),i<9e15&&(c[s++]=i%1e14);for(u=c[--s],r%=_,u&&r&&(i=Te[_-r],c[s]=X(u/i)*i);c[s]===0;c.pop(),s--);if(s<0)c=[a=0];else{for(a=-1;c[0]===0;c.splice(0,1),a-=_);for(s=1,i=c[0];i>=10;i/=10,s++);s<_&&(a-=_-s)}return l.e=a,l.c=c,l}}(),m.sum=function(){for(var e=1,t=arguments,r=new m(t[0]);e<t.length;)r=r.plus(t[e++]);return r},g=function(){var e="0123456789";function t(r,f,o,a){for(var u,i=[0],s,c=0,l=r.length;c<l;){for(s=i.length;s--;i[s]*=f);for(i[0]+=a.indexOf(r.charAt(c++)),u=0;u<i.length;u++)i[u]>o-1&&(i[u+1]==null&&(i[u+1]=0),i[u+1]+=i[u]/o|0,i[u]%=o)}return i.reverse()}return function(r,f,o,a,u){var i,s,c,l,d,v,y,S,P=r.indexOf("."),k=x,T=O;for(P>=0&&(l=q,q=0,r=r.replace(".",""),S=new m(f),v=S.pow(r.length-P),q=l,S.c=t(Q(j(v.c),v.e,"0"),10,o,e),S.e=S.c.length),y=t(r,f,o,u?(i=ne,e):(i=e,ne)),c=l=y.length;y[--l]==0;y.pop());if(!y[0])return i.charAt(0);if(P<0?--c:(v.c=y,v.e=c,v.s=a,v=p(v,S,k,T,o),y=v.c,d=v.r,c=v.e),s=c+k+1,P=y[s],l=o/2,d=d||s<0||y[s+1]!=null,d=T<4?(P!=null||d)&&(T==0||T==(v.s<0?3:2)):P>l||P==l&&(T==4||d||T==6&&y[s-1]&1||T==(v.s<0?8:7)),s<1||!y[0])r=d?Q(i.charAt(1),-k,i.charAt(0)):i.charAt(0);else{if(y.length=s,d)for(--o;++y[--s]>o;)y[s]=0,s||(++c,y=[1].concat(y));for(l=y.length;!y[--l];);for(P=0,r="";P<=l;r+=i.charAt(y[P++]));r=Q(r,c,i.charAt(0))}return r}}(),p=function(){function e(f,o,a){var u,i,s,c,l=0,d=f.length,v=o%te,y=o/te|0;for(f=f.slice();d--;)s=f[d]%te,c=f[d]/te|0,u=y*s+c*v,i=v*s+u%te*te+l,l=(i/a|0)+(u/te|0)+y*c,f[d]=i%a;return l&&(f=[l].concat(f)),f}function t(f,o,a,u){var i,s;if(a!=u)s=a>u?1:-1;else for(i=s=0;i<a;i++)if(f[i]!=o[i]){s=f[i]>o[i]?1:-1;break}return s}function r(f,o,a,u){for(var i=0;a--;)f[a]-=i,i=f[a]<o[a]?1:0,f[a]=i*u+f[a]-o[a];for(;!f[0]&&f.length>1;f.splice(0,1));}return function(f,o,a,u,i){var s,c,l,d,v,y,S,P,k,T,I,$,fe,ye,Ne,Z,ae,W=f.s==o.s?1:-1,G=f.c,C=o.c;if(!G||!G[0]||!C||!C[0])return new m(!f.s||!o.s||(G?C&&G[0]==C[0]:!C)?NaN:G&&G[0]==0||!C?W*0:W/0);for(P=new m(W),k=P.c=[],c=f.e-o.e,W=a+c+1,i||(i=Y,c=V(f.e/_)-V(o.e/_),W=W/_|0),l=0;C[l]==(G[l]||0);l++);if(C[l]>(G[l]||0)&&c--,W<0)k.push(1),d=!0;else{for(ye=G.length,Z=C.length,l=0,W+=2,v=X(i/(C[0]+1)),v>1&&(C=e(C,v,i),G=e(G,v,i),Z=C.length,ye=G.length),fe=Z,T=G.slice(0,Z),I=T.length;I<Z;T[I++]=0);ae=C.slice(),ae=[0].concat(ae),Ne=C[0],C[1]>=i/2&&Ne++;do{if(v=0,s=t(C,T,Z,I),s<0){if($=T[0],Z!=I&&($=$*i+(T[1]||0)),v=X($/Ne),v>1)for(v>=i&&(v=i-1),y=e(C,v,i),S=y.length,I=T.length;t(y,T,S,I)==1;)v--,r(y,Z<S?ae:C,S,i),S=y.length,s=1;else v==0&&(s=v=1),y=C.slice(),S=y.length;if(S<I&&(y=[0].concat(y)),r(T,y,I,i),I=T.length,s==-1)for(;t(C,T,Z,I)<1;)v++,r(T,Z<I?ae:C,I,i),I=T.length}else s===0&&(v++,T=[0]);k[l++]=v,T[0]?T[I++]=G[fe]||0:(T=[G[fe]],I=1)}while((fe++<ye||T[0]!=null)&&W--);d=T[0]!=null,k[0]||k.splice(0,1)}if(i==Y){for(l=1,W=k[0];W>=10;W/=10,l++);H(P,a+(P.e=l+c*_-1)+1,u,d)}else P.e=c,P.r=+d;return P}}();function xe(e,t,r,f){var o,a,u,i,s;if(r==null?r=O:D(r,0,8),!e.c)return e.toString();if(o=e.c[0],u=e.e,t==null)s=j(e.c),s=f==1||f==2&&(u<=N||u>=A)?ue(s,u):Q(s,u,"0");else if(e=H(new m(e),t,r),a=e.e,s=j(e.c),i=s.length,f==1||f==2&&(t<=a||a<=N)){for(;i<t;s+="0",i++);s=ue(s,a)}else if(t-=u,s=Q(s,a,"0"),a+1>i){if(--t>0)for(s+=".";t--;s+="0");}else if(t+=a-i,t>0)for(a+1==i&&(s+=".");t--;s+="0");return e.s<0&&o?"-"+s:s}function De(e,t){for(var r,f,o=1,a=new m(e[0]);o<e.length;o++)f=new m(e[o]),(!f.s||(r=oe(a,f))===t||r===0&&a.s===t)&&(a=f);return a}function ve(e,t,r){for(var f=1,o=t.length;!t[--o];t.pop());for(o=t[0];o>=10;o/=10,f++);return(r=f+r*_-1)>M?e.c=e.e=null:r<R?e.c=[e.e=0]:(e.e=r,e.c=t),e}E=function(){var e=/^(-?)0([xbo])(?=\w[\w.]*$)/i,t=/^([^.]+)\.$/,r=/^\.([^.]+)$/,f=/^-?(Infinity|NaN)$/,o=/^\s*\+(?=[\w.])|^\s+|\s+$/g;return function(a,u,i,s){var c,l=i?u:u.replace(o,"");if(f.test(l))a.s=isNaN(l)?null:l<0?-1:1;else{if(!i&&(l=l.replace(e,function(d,v,y){return c=(y=y.toLowerCase())=="x"?16:y=="b"?2:8,!s||s==c?v:d}),s&&(c=s,l=l.replace(t,"$1").replace(r,"0.$1")),u!=l))return new m(l,c);if(m.DEBUG)throw Error(F+"Not a"+(s?" base "+s:"")+" number: "+u);a.s=null}a.c=a.e=null}}();function H(e,t,r,f){var o,a,u,i,s,c,l,d=e.c,v=Te;if(d){e:{for(o=1,i=d[0];i>=10;i/=10,o++);if(a=t-o,a<0)a+=_,u=t,s=d[c=0],l=X(s/v[o-u-1]%10);else if(c=Ae((a+1)/_),c>=d.length)if(f){for(;d.length<=c;d.push(0));s=l=0,o=1,a%=_,u=a-_+1}else break e;else{for(s=i=d[c],o=1;i>=10;i/=10,o++);a%=_,u=a-_+o,l=u<0?0:X(s/v[o-u-1]%10)}if(f=f||t<0||d[c+1]!=null||(u<0?s:s%v[o-u-1]),f=r<4?(l||f)&&(r==0||r==(e.s<0?3:2)):l>5||l==5&&(r==4||f||r==6&&(a>0?u>0?s/v[o-u]:0:d[c-1])%10&1||r==(e.s<0?8:7)),t<1||!d[0])return d.length=0,f?(t-=e.e+1,d[0]=v[(_-t%_)%_],e.e=-t||0):d[0]=e.e=0,e;if(a==0?(d.length=c,i=1,c--):(d.length=c+1,i=v[_-a],d[c]=u>0?X(s/v[o-u]%v[u])*i:0),f)for(;;)if(c==0){for(a=1,u=d[0];u>=10;u/=10,a++);for(u=d[0]+=i,i=1;u>=10;u/=10,i++);a!=i&&(e.e++,d[0]==Y&&(d[0]=1));break}else{if(d[c]+=i,d[c]!=Y)break;d[c--]=0,i=1}for(a=d.length;d[--a]===0;d.pop());}e.e>M?e.c=e.e=null:e.e<R&&(e.c=[e.e=0])}return e}function J(e){var t,r=e.e;return r===null?e.toString():(t=j(e.c),t=r<=N||r>=A?ue(t,r):Q(t,r,"0"),e.s<0?"-"+t:t)}return h.absoluteValue=h.abs=function(){var e=new m(this);return e.s<0&&(e.s=1),e},h.comparedTo=function(e,t){return oe(this,new m(e,t))},h.decimalPlaces=h.dp=function(e,t){var r,f,o,a=this;if(e!=null)return D(e,0,L),t==null?t=O:D(t,0,8),H(new m(a),e+a.e+1,t);if(!(r=a.c))return null;if(f=((o=r.length-1)-V(this.e/_))*_,o=r[o])for(;o%10==0;o/=10,f--);return f<0&&(f=0),f},h.dividedBy=h.div=function(e,t){return p(this,new m(e,t),x,O)},h.dividedToIntegerBy=h.idiv=function(e,t){return p(this,new m(e,t),0,1)},h.exponentiatedBy=h.pow=function(e,t){var r,f,o,a,u,i,s,c,l,d=this;if(e=new m(e),e.c&&!e.isInteger())throw Error(F+"Exponent not an integer: "+J(e));if(t!=null&&(t=new m(t)),i=e.e>14,!d.c||!d.c[0]||d.c[0]==1&&!d.e&&d.c.length==1||!e.c||!e.c[0])return l=new m(Math.pow(+J(d),i?e.s*(2-ce(e)):+J(e))),t?l.mod(t):l;if(s=e.s<0,t){if(t.c?!t.c[0]:!t.s)return new m(NaN);f=!s&&d.isInteger()&&t.isInteger(),f&&(d=d.mod(t))}else{if(e.e>9&&(d.e>0||d.e<-1||(d.e==0?d.c[0]>1||i&&d.c[1]>=24e7:d.c[0]<8e13||i&&d.c[0]<=9999975e7)))return a=d.s<0&&ce(e)?-0:0,d.e>-1&&(a=1/a),new m(s?1/a:a);q&&(a=Ae(q/_+2))}for(i?(r=new m(.5),s&&(e.s=1),c=ce(e)):(o=Math.abs(+J(e)),c=o%2),l=new m(w);;){if(c){if(l=l.times(d),!l.c)break;a?l.c.length>a&&(l.c.length=a):f&&(l=l.mod(t))}if(o){if(o=X(o/2),o===0)break;c=o%2}else if(e=e.times(r),H(e,e.e+1,1),e.e>14)c=ce(e);else{if(o=+J(e),o===0)break;c=o%2}d=d.times(d),a?d.c&&d.c.length>a&&(d.c.length=a):f&&(d=d.mod(t))}return f?l:(s&&(l=w.div(l)),t?l.mod(t):a?H(l,q,O,u):l)},h.integerValue=function(e){var t=new m(this);return e==null?e=O:D(e,0,8),H(t,t.e+1,e)},h.isEqualTo=h.eq=function(e,t){return oe(this,new m(e,t))===0},h.isFinite=function(){return!!this.c},h.isGreaterThan=h.gt=function(e,t){return oe(this,new m(e,t))>0},h.isGreaterThanOrEqualTo=h.gte=function(e,t){return(t=oe(this,new m(e,t)))===1||t===0},h.isInteger=function(){return!!this.c&&V(this.e/_)>this.c.length-2},h.isLessThan=h.lt=function(e,t){return oe(this,new m(e,t))<0},h.isLessThanOrEqualTo=h.lte=function(e,t){return(t=oe(this,new m(e,t)))===-1||t===0},h.isNaN=function(){return!this.s},h.isNegative=function(){return this.s<0},h.isPositive=function(){return this.s>0},h.isZero=function(){return!!this.c&&this.c[0]==0},h.minus=function(e,t){var r,f,o,a,u=this,i=u.s;if(e=new m(e,t),t=e.s,!i||!t)return new m(NaN);if(i!=t)return e.s=-t,u.plus(e);var s=u.e/_,c=e.e/_,l=u.c,d=e.c;if(!s||!c){if(!l||!d)return l?(e.s=-t,e):new m(d?u:NaN);if(!l[0]||!d[0])return d[0]?(e.s=-t,e):new m(l[0]?u:O==3?-0:0)}if(s=V(s),c=V(c),l=l.slice(),i=s-c){for((a=i<0)?(i=-i,o=l):(c=s,o=d),o.reverse(),t=i;t--;o.push(0));o.reverse()}else for(f=(a=(i=l.length)<(t=d.length))?i:t,i=t=0;t<f;t++)if(l[t]!=d[t]){a=l[t]<d[t];break}if(a&&(o=l,l=d,d=o,e.s=-e.s),t=(f=d.length)-(r=l.length),t>0)for(;t--;l[r++]=0);for(t=Y-1;f>i;){if(l[--f]<d[f]){for(r=f;r&&!l[--r];l[r]=t);--l[r],l[f]+=Y}l[f]-=d[f]}for(;l[0]==0;l.splice(0,1),--c);return l[0]?ve(e,l,c):(e.s=O==3?-1:1,e.c=[e.e=0],e)},h.modulo=h.mod=function(e,t){var r,f,o=this;return e=new m(e,t),!o.c||!e.s||e.c&&!e.c[0]?new m(NaN):!e.c||o.c&&!o.c[0]?new m(o):(U==9?(f=e.s,e.s=1,r=p(o,e,0,3),e.s=f,r.s*=f):r=p(o,e,0,U),e=o.minus(r.times(e)),!e.c[0]&&U==1&&(e.s=o.s),e)},h.multipliedBy=h.times=function(e,t){var r,f,o,a,u,i,s,c,l,d,v,y,S,P,k,T=this,I=T.c,$=(e=new m(e,t)).c;if(!I||!$||!I[0]||!$[0])return!T.s||!e.s||I&&!I[0]&&!$||$&&!$[0]&&!I?e.c=e.e=e.s=null:(e.s*=T.s,!I||!$?e.c=e.e=null:(e.c=[0],e.e=0)),e;for(f=V(T.e/_)+V(e.e/_),e.s*=T.s,s=I.length,d=$.length,s<d&&(S=I,I=$,$=S,o=s,s=d,d=o),o=s+d,S=[];o--;S.push(0));for(P=Y,k=te,o=d;--o>=0;){for(r=0,v=$[o]%k,y=$[o]/k|0,u=s,a=o+u;a>o;)c=I[--u]%k,l=I[u]/k|0,i=y*c+l*v,c=v*c+i%k*k+S[a]+r,r=(c/P|0)+(i/k|0)+y*l,S[a--]=c%P;S[a]=r}return r?++f:S.splice(0,1),ve(e,S,f)},h.negated=function(){var e=new m(this);return e.s=-e.s||null,e},h.plus=function(e,t){var r,f=this,o=f.s;if(e=new m(e,t),t=e.s,!o||!t)return new m(NaN);if(o!=t)return e.s=-t,f.minus(e);var a=f.e/_,u=e.e/_,i=f.c,s=e.c;if(!a||!u){if(!i||!s)return new m(o/0);if(!i[0]||!s[0])return s[0]?e:new m(i[0]?f:o*0)}if(a=V(a),u=V(u),i=i.slice(),o=a-u){for(o>0?(u=a,r=s):(o=-o,r=i),r.reverse();o--;r.push(0));r.reverse()}for(o=i.length,t=s.length,o-t<0&&(r=s,s=i,i=r,t=o),o=0;t;)o=(i[--t]=i[t]+s[t]+o)/Y|0,i[t]=Y===i[t]?0:i[t]%Y;return o&&(i=[o].concat(i),++u),ve(e,i,u)},h.precision=h.sd=function(e,t){var r,f,o,a=this;if(e!=null&&e!==!!e)return D(e,1,L),t==null?t=O:D(t,0,8),H(new m(a),e,t);if(!(r=a.c))return null;if(o=r.length-1,f=o*_+1,o=r[o]){for(;o%10==0;o/=10,f--);for(o=r[0];o>=10;o/=10,f++);}return e&&a.e+1>f&&(f=a.e+1),f},h.shiftedBy=function(e){return D(e,-_e,_e),this.times("1e"+e)},h.squareRoot=h.sqrt=function(){var e,t,r,f,o,a=this,u=a.c,i=a.s,s=a.e,c=x+4,l=new m("0.5");if(i!==1||!u||!u[0])return new m(!i||i<0&&(!u||u[0])?NaN:u?a:1/0);if(i=Math.sqrt(+J(a)),i==0||i==1/0?(t=j(u),(t.length+s)%2==0&&(t+="0"),i=Math.sqrt(+t),s=V((s+1)/2)-(s<0||s%2),i==1/0?t="5e"+s:(t=i.toExponential(),t=t.slice(0,t.indexOf("e")+1)+s),r=new m(t)):r=new m(i+""),r.c[0]){for(s=r.e,i=s+c,i<3&&(i=0);;)if(o=r,r=l.times(o.plus(p(a,o,c,1))),j(o.c).slice(0,i)===(t=j(r.c)).slice(0,i))if(r.e<s&&--i,t=t.slice(i-3,i+1),t=="9999"||!f&&t=="4999"){if(!f&&(H(o,o.e+x+2,0),o.times(o).eq(a))){r=o;break}c+=4,i+=4,f=1}else{(!+t||!+t.slice(1)&&t.charAt(0)=="5")&&(H(r,r.e+x+2,1),e=!r.times(r).eq(a));break}}return H(r,r.e+x+1,O,e)},h.toExponential=function(e,t){return e!=null&&(D(e,0,L),e++),xe(this,e,t,1)},h.toFixed=function(e,t){return e!=null&&(D(e,0,L),e=e+this.e+1),xe(this,e,t)},h.toFormat=function(e,t,r){var f,o=this;if(r==null)e!=null&&t&&typeof t=="object"?(r=t,t=null):e&&typeof e=="object"?(r=e,e=t=null):r=Ee;else if(typeof r!="object")throw Error(F+"Argument not an object: "+r);if(f=o.toFixed(e,t),o.c){var a,u=f.split("."),i=+r.groupSize,s=+r.secondaryGroupSize,c=r.groupSeparator||"",l=u[0],d=u[1],v=o.s<0,y=v?l.slice(1):l,S=y.length;if(s&&(a=i,i=s,s=a,S-=a),i>0&&S>0){for(a=S%i||i,l=y.substr(0,a);a<S;a+=i)l+=c+y.substr(a,i);s>0&&(l+=c+y.slice(a)),v&&(l="-"+l)}f=d?l+(r.decimalSeparator||"")+((s=+r.fractionGroupSize)?d.replace(new RegExp("\\d{"+s+"}\\B","g"),"$&"+(r.fractionGroupSeparator||"")):d):l}return(r.prefix||"")+f+(r.suffix||"")},h.toFraction=function(e){var t,r,f,o,a,u,i,s,c,l,d,v,y=this,S=y.c;if(e!=null&&(i=new m(e),!i.isInteger()&&(i.c||i.s!==1)||i.lt(w)))throw Error(F+"Argument "+(i.isInteger()?"out of range: ":"not an integer: ")+J(i));if(!S)return new m(y);for(t=new m(w),c=r=new m(w),f=s=new m(w),v=j(S),a=t.e=v.length-y.e-1,t.c[0]=Te[(u=a%_)<0?_+u:u],e=!e||i.comparedTo(t)>0?a>0?t:c:i,u=M,M=1/0,i=new m(v),s.c[0]=0;l=p(i,t,0,1),o=r.plus(l.times(f)),o.comparedTo(e)!=1;)r=f,f=o,c=s.plus(l.times(o=c)),s=o,t=i.minus(l.times(o=t)),i=o;return o=p(e.minus(r),f,0,1),s=s.plus(o.times(c)),r=r.plus(o.times(f)),s.s=c.s=y.s,a=a*2,d=p(c,f,a,O).minus(y).abs().comparedTo(p(s,r,a,O).minus(y).abs())<1?[c,f]:[s,r],M=u,d},h.toNumber=function(){return+J(this)},h.toPrecision=function(e,t){return e!=null&&D(e,1,L),xe(this,e,t,2)},h.toString=function(e){var t,r=this,f=r.s,o=r.e;return o===null?f?(t="Infinity",f<0&&(t="-"+t)):t="NaN":(e==null?t=o<=N||o>=A?ue(j(r.c),o):Q(j(r.c),o,"0"):e===10&&Oe?(r=H(new m(r),x+o+1,O),t=Q(j(r.c),r.e,"0")):(D(e,2,ne.length,"Base"),t=g(Q(j(r.c),o,"0"),10,e,f,!0)),f<0&&r.c[0]&&(t="-"+t)),t},h.valueOf=h.toJSON=function(){return J(this)},h._isBigNumber=!0,h[Symbol.toStringTag]="BigNumber",h[Symbol.for("nodejs.util.inspect.custom")]=h.valueOf,n!=null&&m.set(n),m}function V(n){var p=n|0;return n>0||n===p?p:p-1}function j(n){for(var p,g,E=1,h=n.length,w=n[0]+"";E<h;){for(p=n[E++]+"",g=_-p.length;g--;p="0"+p);w+=p}for(h=w.length;w.charCodeAt(--h)===48;);return w.slice(0,h+1||1)}function oe(n,p){var g,E,h=n.c,w=p.c,x=n.s,O=p.s,N=n.e,A=p.e;if(!x||!O)return null;if(g=h&&!h[0],E=w&&!w[0],g||E)return g?E?0:-O:x;if(x!=O)return x;if(g=x<0,E=N==A,!h||!w)return E?0:!h^g?1:-1;if(!E)return N>A^g?1:-1;for(O=(N=h.length)<(A=w.length)?N:A,x=0;x<O;x++)if(h[x]!=w[x])return h[x]>w[x]^g?1:-1;return N==A?0:N>A^g?1:-1}function D(n,p,g,E){if(n<p||n>g||n!==X(n))throw Error(F+(E||"Argument")+(typeof n=="number"?n<p||n>g?" out of range: ":" not an integer: ":" not a primitive number: ")+String(n))}function ce(n){var p=n.c.length-1;return V(n.e/_)==p&&n.c[p]%2!=0}function ue(n,p){return(n.length>1?n.charAt(0)+"."+n.slice(1):n)+(p<0?"e":"e+")+p}function Q(n,p,g){var E,h;if(p<0){for(h=g+".";++p;h+=g);n=h+n}else if(E=n.length,++p>E){for(h=g,p-=E;--p;h+=g);n+=h}else p<E&&(n=n.slice(0,p)+"."+n.slice(p));return n}var $e=Ce();const Ge=$e,Fe="1123",Mt=Number(Fe),Pt=`0x${String(0).repeat(40)}`,Ct=new Ge(0),Bt=100,kt="REQUEST_FOLLOWING_STORAGE",Lt="MEMOO_TOKEN_STORAGE",Ut="UPDATE_PROJECT_TWITTER_STORAGE",$t="EDIT_INFO_STORAGE";let ze={data:""},qe=n=>typeof window=="object"?((n?n.querySelector("#_goober"):window._goober)||Object.assign((n||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:n||ze,He=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,We=/\/\*[^]*?\*\/|  +/g,Me=/\n+/g,re=(n,p)=>{let g="",E="",h="";for(let w in n){let x=n[w];w[0]=="@"?w[1]=="i"?g=w+" "+x+";":E+=w[1]=="f"?re(x,w):w+"{"+re(x,w[1]=="k"?"":p)+"}":typeof x=="object"?E+=re(x,p?p.replace(/([^,])+/g,O=>w.replace(/(^:.*)|([^,])+/g,N=>/&/.test(N)?N.replace(/&/g,O):O?O+" "+N:N)):w):x!=null&&(w=/^--/.test(w)?w:w.replace(/[A-Z]/g,"-$&").toLowerCase(),h+=re.p?re.p(w,x):w+":"+x+";")}return g+(p&&h?p+"{"+h+"}":h)+E},K={},Be=n=>{if(typeof n=="object"){let p="";for(let g in n)p+=g+Be(n[g]);return p}return n},je=(n,p,g,E,h)=>{let w=Be(n),x=K[w]||(K[w]=(N=>{let A=0,R=11;for(;A<N.length;)R=101*R+N.charCodeAt(A++)>>>0;return"go"+R})(w));if(!K[x]){let N=w!==n?n:(A=>{let R,M,B=[{}];for(;R=He.exec(A.replace(We,""));)R[4]?B.shift():R[3]?(M=R[3].replace(Me," ").trim(),B.unshift(B[0][M]=B[0][M]||{})):B[0][R[1]]=R[2].replace(Me," ").trim();return B[0]})(n);K[x]=re(h?{["@keyframes "+x]:N}:N,g?"":"."+x)}let O=g&&K.g?K.g:null;return g&&(K.g=K[x]),((N,A,R,M)=>{M?A.data=A.data.replace(M,N):A.data.indexOf(N)===-1&&(A.data=R?N+A.data:A.data+N)})(K[x],p,E,O),x},Xe=(n,p,g)=>n.reduce((E,h,w)=>{let x=p[w];if(x&&x.call){let O=x(g),N=O&&O.props&&O.props.className||/^go/.test(O)&&O;x=N?"."+N:O&&typeof O=="object"?O.props?"":re(O,""):O===!1?"":O}return E+h+(x??"")},"");function we(n){let p=this||{},g=n.call?n(p.p):n;return je(g.unshift?g.raw?Xe(g,[].slice.call(arguments,1),p.p):g.reduce((E,h)=>Object.assign(E,h&&h.call?h(p.p):h),{}):g,qe(p.target),p.g,p.o,p.k)}let ke,Se,Ie;we.bind({g:1});let ee=we.bind({k:1});function Ve(n,p,g,E){re.p=p,ke=n,Se=g,Ie=E}function ie(n,p){let g=this||{};return function(){let E=arguments;function h(w,x){let O=Object.assign({},w),N=O.className||h.className;g.p=Object.assign({theme:Se&&Se()},O),g.o=/ *go\d+/.test(N),O.className=we.apply(g,E)+(N?" "+N:"");let A=n;return n[0]&&(A=O.as||n,delete O.as),Ie&&A[0]&&Ie(O),ke(A,O)}return h}}var Ye=n=>typeof n=="function",me=(n,p)=>Ye(n)?n(p):n,Ze=(()=>{let n=0;return()=>(++n).toString()})(),Le=(()=>{let n;return()=>{if(n===void 0&&typeof window<"u"){let p=matchMedia("(prefers-reduced-motion: reduce)");n=!p||p.matches}return n}})(),Je=20,he=new Map,Qe=1e3,Pe=n=>{if(he.has(n))return;let p=setTimeout(()=>{he.delete(n),se({type:4,toastId:n})},Qe);he.set(n,p)},Ke=n=>{let p=he.get(n);p&&clearTimeout(p)},Re=(n,p)=>{switch(p.type){case 0:return{...n,toasts:[p.toast,...n.toasts].slice(0,Je)};case 1:return p.toast.id&&Ke(p.toast.id),{...n,toasts:n.toasts.map(w=>w.id===p.toast.id?{...w,...p.toast}:w)};case 2:let{toast:g}=p;return n.toasts.find(w=>w.id===g.id)?Re(n,{type:1,toast:g}):Re(n,{type:0,toast:g});case 3:let{toastId:E}=p;return E?Pe(E):n.toasts.forEach(w=>{Pe(w.id)}),{...n,toasts:n.toasts.map(w=>w.id===E||E===void 0?{...w,visible:!1}:w)};case 4:return p.toastId===void 0?{...n,toasts:[]}:{...n,toasts:n.toasts.filter(w=>w.id!==p.toastId)};case 5:return{...n,pausedAt:p.time};case 6:let h=p.time-(n.pausedAt||0);return{...n,pausedAt:void 0,toasts:n.toasts.map(w=>({...w,pauseDuration:w.pauseDuration+h}))}}},de=[],ge={toasts:[],pausedAt:void 0},se=n=>{ge=Re(ge,n),de.forEach(p=>{p(ge)})},et={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},tt=(n={})=>{let[p,g]=b.useState(ge);b.useEffect(()=>(de.push(g),()=>{let h=de.indexOf(g);h>-1&&de.splice(h,1)}),[p]);let E=p.toasts.map(h=>{var w,x;return{...n,...n[h.type],...h,duration:h.duration||((w=n[h.type])==null?void 0:w.duration)||n?.duration||et[h.type],style:{...n.style,...(x=n[h.type])==null?void 0:x.style,...h.style}}});return{...p,toasts:E}},rt=(n,p="blank",g)=>({createdAt:Date.now(),visible:!0,type:p,ariaProps:{role:"status","aria-live":"polite"},message:n,pauseDuration:0,...g,id:g?.id||Ze()}),le=n=>(p,g)=>{let E=rt(p,n,g);return se({type:2,toast:E}),E.id},z=(n,p)=>le("blank")(n,p);z.error=le("error");z.success=le("success");z.loading=le("loading");z.custom=le("custom");z.dismiss=n=>{se({type:3,toastId:n})};z.remove=n=>se({type:4,toastId:n});z.promise=(n,p,g)=>{let E=z.loading(p.loading,{...g,...g?.loading});return n.then(h=>(z.success(me(p.success,h),{id:E,...g,...g?.success}),h)).catch(h=>{z.error(me(p.error,h),{id:E,...g,...g?.error})}),n};var it=(n,p)=>{se({type:1,toast:{id:n,height:p}})},nt=()=>{se({type:5,time:Date.now()})},ot=n=>{let{toasts:p,pausedAt:g}=tt(n);b.useEffect(()=>{if(g)return;let w=Date.now(),x=p.map(O=>{if(O.duration===1/0)return;let N=(O.duration||0)+O.pauseDuration-(w-O.createdAt);if(N<0){O.visible&&z.dismiss(O.id);return}return setTimeout(()=>z.dismiss(O.id),N)});return()=>{x.forEach(O=>O&&clearTimeout(O))}},[p,g]);let E=b.useCallback(()=>{g&&se({type:6,time:Date.now()})},[g]),h=b.useCallback((w,x)=>{let{reverseOrder:O=!1,gutter:N=8,defaultPosition:A}=x||{},R=p.filter(U=>(U.position||A)===(w.position||A)&&U.height),M=R.findIndex(U=>U.id===w.id),B=R.filter((U,q)=>q<M&&U.visible).length;return R.filter(U=>U.visible).slice(...O?[B+1]:[0,B]).reduce((U,q)=>U+(q.height||0)+N,0)},[p]);return{toasts:p,handlers:{updateHeight:it,startPause:nt,endPause:E,calculateOffset:h}}},st=ee`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,at=ee`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,lt=ee`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,ft=ie("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${n=>n.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${st} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${at} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${n=>n.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${lt} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,ct=ee`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ut=ie("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${n=>n.secondary||"#e0e0e0"};
  border-right-color: ${n=>n.primary||"#616161"};
  animation: ${ct} 1s linear infinite;
`,pt=ee`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ht=ee`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,dt=ie("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${n=>n.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${pt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ht} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${n=>n.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,gt=ie("div")`
  position: absolute;
`,mt=ie("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,wt=ee`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Et=ie("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${wt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Ot=({toast:n})=>{let{icon:p,type:g,iconTheme:E}=n;return p!==void 0?typeof p=="string"?b.createElement(Et,null,p):p:g==="blank"?null:b.createElement(mt,null,b.createElement(ut,{...E}),g!=="loading"&&b.createElement(gt,null,g==="error"?b.createElement(ft,{...E}):b.createElement(dt,{...E})))},xt=n=>`
0% {transform: translate3d(0,${n*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,vt=n=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${n*-150}%,-1px) scale(.6); opacity:0;}
`,yt="0%{opacity:0;} 100%{opacity:1;}",Nt="0%{opacity:1;} 100%{opacity:0;}",At=ie("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,_t=ie("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Tt=(n,p)=>{let g=n.includes("top")?1:-1,[E,h]=Le()?[yt,Nt]:[xt(g),vt(g)];return{animation:p?`${ee(E)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${ee(h)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},St=b.memo(({toast:n,position:p,style:g,children:E})=>{let h=n.height?Tt(n.position||p||"top-center",n.visible):{opacity:0},w=b.createElement(Ot,{toast:n}),x=b.createElement(_t,{...n.ariaProps},me(n.message,n));return b.createElement(At,{className:n.className,style:{...h,...g,...n.style}},typeof E=="function"?E({icon:w,message:x}):b.createElement(b.Fragment,null,w,x))});Ve(b.createElement);var It=({id:n,className:p,style:g,onHeightUpdate:E,children:h})=>{let w=b.useCallback(x=>{if(x){let O=()=>{let N=x.getBoundingClientRect().height;E(n,N)};O(),new MutationObserver(O).observe(x,{subtree:!0,childList:!0,characterData:!0})}},[n,E]);return b.createElement("div",{ref:w,className:p,style:g},h)},Rt=(n,p)=>{let g=n.includes("top"),E=g?{top:0}:{bottom:0},h=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Le()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${p*(g?1:-1)}px)`,...E,...h}},Dt=we`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,pe=16,Gt=({reverseOrder:n,position:p="top-center",toastOptions:g,gutter:E,children:h,containerStyle:w,containerClassName:x})=>{let{toasts:O,handlers:N}=ot(g);return b.createElement("div",{style:{position:"fixed",zIndex:9999,top:pe,left:pe,right:pe,bottom:pe,pointerEvents:"none",...w},className:x,onMouseEnter:N.startPause,onMouseLeave:N.endPause},O.map(A=>{let R=A.position||p,M=N.calculateOffset(A,{reverseOrder:n,gutter:E,defaultPosition:p}),B=Rt(R,M);return b.createElement(It,{id:A.id,key:A.id,onHeightUpdate:N.updateHeight,className:A.visible?Dt:"",style:B},A.type==="custom"?me(A.message,A):h?h(A):b.createElement(St,{toast:A,position:R}))}))},Ft=z;export{Ge as B,Mt as C,Bt as D,$t as E,Gt as I,Lt as M,kt as R,Ut as U,Pt as Z,Ft as _,Ct as z};
