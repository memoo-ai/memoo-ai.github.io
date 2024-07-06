import{r as P}from"./react-wd_tNA35.js";var Le=/^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,Ae=Math.ceil,V=Math.floor,G="[BigNumber Error] ",Pe=G+"Number primitive has more than 15 significant digits: ",Y=1e14,b=14,be=9007199254740991,_e=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9,1e10,1e11,1e12,1e13],te=1e7,$=1e9;function Me(n){var p,g,x,h=m.prototype={constructor:m,toString:null,valueOf:null},w=new m(1),y=20,v=4,O=-7,A=21,D=-1e7,k=1e7,C=!1,L=1,q=0,xe={prefix:"",groupSize:3,secondaryGroupSize:0,groupSeparator:",",decimalSeparator:".",fractionGroupSize:0,fractionGroupSeparator:" ",suffix:""},ne="0123456789abcdefghijklmnopqrstuvwxyz",ve=!0;function m(e,t){var r,f,o,l,u,i,s,c,a=this;if(!(a instanceof m))return new m(e,t);if(t==null){if(e&&e._isBigNumber===!0){a.s=e.s,!e.c||e.e>k?a.c=a.e=null:e.e<D?a.c=[a.e=0]:(a.e=e.e,a.c=e.c.slice());return}if((i=typeof e=="number")&&e*0==0){if(a.s=1/e<0?(e=-e,-1):1,e===~~e){for(l=0,u=e;u>=10;u/=10,l++);l>k?a.c=a.e=null:(a.e=l,a.c=[e]);return}c=String(e)}else{if(!Le.test(c=String(e)))return x(a,c,i);a.s=c.charCodeAt(0)==45?(c=c.slice(1),-1):1}(l=c.indexOf("."))>-1&&(c=c.replace(".","")),(u=c.search(/e/i))>0?(l<0&&(l=u),l+=+c.slice(u+1),c=c.substring(0,u)):l<0&&(l=c.length)}else{if(T(t,2,ne.length,"Base"),t==10&&ve)return a=new m(e),H(a,y+a.e+1,v);if(c=String(e),i=typeof e=="number"){if(e*0!=0)return x(a,c,i,t);if(a.s=1/e<0?(c=c.slice(1),-1):1,m.DEBUG&&c.replace(/^0\.0*|\./,"").length>15)throw Error(Pe+e)}else a.s=c.charCodeAt(0)===45?(c=c.slice(1),-1):1;for(r=ne.slice(0,t),l=u=0,s=c.length;u<s;u++)if(r.indexOf(f=c.charAt(u))<0){if(f=="."){if(u>l){l=s;continue}}else if(!o&&(c==c.toUpperCase()&&(c=c.toLowerCase())||c==c.toLowerCase()&&(c=c.toUpperCase()))){o=!0,u=-1,l=0;continue}return x(a,String(e),i,t)}i=!1,c=g(c,t,10,a.s),(l=c.indexOf("."))>-1?c=c.replace(".",""):l=c.length}for(u=0;c.charCodeAt(u)===48;u++);for(s=c.length;c.charCodeAt(--s)===48;);if(c=c.slice(u,++s)){if(s-=u,i&&m.DEBUG&&s>15&&(e>be||e!==V(e)))throw Error(Pe+a.s*e);if((l=l-u-1)>k)a.c=a.e=null;else if(l<D)a.c=[a.e=0];else{if(a.e=l,a.c=[],u=(l+1)%b,l<0&&(u+=b),u<s){for(u&&a.c.push(+c.slice(0,u)),s-=b;u<s;)a.c.push(+c.slice(u,u+=b));u=b-(c=c.slice(u)).length}else u-=s;for(;u--;c+="0");a.c.push(+c)}}else a.c=[a.e=0]}m.clone=Me,m.ROUND_UP=0,m.ROUND_DOWN=1,m.ROUND_CEIL=2,m.ROUND_FLOOR=3,m.ROUND_HALF_UP=4,m.ROUND_HALF_DOWN=5,m.ROUND_HALF_EVEN=6,m.ROUND_HALF_CEIL=7,m.ROUND_HALF_FLOOR=8,m.EUCLID=9,m.config=m.set=function(e){var t,r;if(e!=null)if(typeof e=="object"){if(e.hasOwnProperty(t="DECIMAL_PLACES")&&(r=e[t],T(r,0,$,t),y=r),e.hasOwnProperty(t="ROUNDING_MODE")&&(r=e[t],T(r,0,8,t),v=r),e.hasOwnProperty(t="EXPONENTIAL_AT")&&(r=e[t],r&&r.pop?(T(r[0],-$,0,t),T(r[1],0,$,t),O=r[0],A=r[1]):(T(r,-$,$,t),O=-(A=r<0?-r:r))),e.hasOwnProperty(t="RANGE"))if(r=e[t],r&&r.pop)T(r[0],-$,-1,t),T(r[1],1,$,t),D=r[0],k=r[1];else if(T(r,-$,$,t),r)D=-(k=r<0?-r:r);else throw Error(G+t+" cannot be zero: "+r);if(e.hasOwnProperty(t="CRYPTO"))if(r=e[t],r===!!r)if(r)if(typeof crypto<"u"&&crypto&&(crypto.getRandomValues||crypto.randomBytes))C=r;else throw C=!r,Error(G+"crypto unavailable");else C=r;else throw Error(G+t+" not true or false: "+r);if(e.hasOwnProperty(t="MODULO_MODE")&&(r=e[t],T(r,0,9,t),L=r),e.hasOwnProperty(t="POW_PRECISION")&&(r=e[t],T(r,0,$,t),q=r),e.hasOwnProperty(t="FORMAT"))if(r=e[t],typeof r=="object")xe=r;else throw Error(G+t+" not an object: "+r);if(e.hasOwnProperty(t="ALPHABET"))if(r=e[t],typeof r=="string"&&!/^.?$|[+\-.\s]|(.).*\1/.test(r))ve=r.slice(0,10)=="0123456789",ne=r;else throw Error(G+t+" invalid: "+r)}else throw Error(G+"Object expected: "+e);return{DECIMAL_PLACES:y,ROUNDING_MODE:v,EXPONENTIAL_AT:[O,A],RANGE:[D,k],CRYPTO:C,MODULO_MODE:L,POW_PRECISION:q,FORMAT:xe,ALPHABET:ne}},m.isBigNumber=function(e){if(!e||e._isBigNumber!==!0)return!1;if(!m.DEBUG)return!0;var t,r,f=e.c,o=e.e,l=e.s;e:if({}.toString.call(f)=="[object Array]"){if((l===1||l===-1)&&o>=-$&&o<=$&&o===V(o)){if(f[0]===0){if(o===0&&f.length===1)return!0;break e}if(t=(o+1)%b,t<1&&(t+=b),String(f[0]).length==t){for(t=0;t<f.length;t++)if(r=f[t],r<0||r>=Y||r!==V(r))break e;if(r!==0)return!0}}}else if(f===null&&o===null&&(l===null||l===1||l===-1))return!0;throw Error(G+"Invalid BigNumber: "+e)},m.maximum=m.max=function(){return Te(arguments,-1)},m.minimum=m.min=function(){return Te(arguments,1)},m.random=function(){var e=9007199254740992,t=Math.random()*e&2097151?function(){return V(Math.random()*e)}:function(){return(Math.random()*1073741824|0)*8388608+(Math.random()*8388608|0)};return function(r){var f,o,l,u,i,s=0,c=[],a=new m(w);if(r==null?r=y:T(r,0,$),u=Ae(r/b),C)if(crypto.getRandomValues){for(f=crypto.getRandomValues(new Uint32Array(u*=2));s<u;)i=f[s]*131072+(f[s+1]>>>11),i>=9e15?(o=crypto.getRandomValues(new Uint32Array(2)),f[s]=o[0],f[s+1]=o[1]):(c.push(i%1e14),s+=2);s=u/2}else if(crypto.randomBytes){for(f=crypto.randomBytes(u*=7);s<u;)i=(f[s]&31)*281474976710656+f[s+1]*1099511627776+f[s+2]*4294967296+f[s+3]*16777216+(f[s+4]<<16)+(f[s+5]<<8)+f[s+6],i>=9e15?crypto.randomBytes(7).copy(f,s):(c.push(i%1e14),s+=7);s=u/7}else throw C=!1,Error(G+"crypto unavailable");if(!C)for(;s<u;)i=t(),i<9e15&&(c[s++]=i%1e14);for(u=c[--s],r%=b,u&&r&&(i=_e[b-r],c[s]=V(u/i)*i);c[s]===0;c.pop(),s--);if(s<0)c=[l=0];else{for(l=-1;c[0]===0;c.splice(0,1),l-=b);for(s=1,i=c[0];i>=10;i/=10,s++);s<b&&(l-=b-s)}return a.e=l,a.c=c,a}}(),m.sum=function(){for(var e=1,t=arguments,r=new m(t[0]);e<t.length;)r=r.plus(t[e++]);return r},g=function(){var e="0123456789";function t(r,f,o,l){for(var u,i=[0],s,c=0,a=r.length;c<a;){for(s=i.length;s--;i[s]*=f);for(i[0]+=l.indexOf(r.charAt(c++)),u=0;u<i.length;u++)i[u]>o-1&&(i[u+1]==null&&(i[u+1]=0),i[u+1]+=i[u]/o|0,i[u]%=o)}return i.reverse()}return function(r,f,o,l,u){var i,s,c,a,d,E,N,S,B=r.indexOf("."),R=y,_=v;for(B>=0&&(a=q,q=0,r=r.replace(".",""),S=new m(f),E=S.pow(r.length-B),q=a,S.c=t(Q(X(E.c),E.e,"0"),10,o,e),S.e=S.c.length),N=t(r,f,o,u?(i=ne,e):(i=e,ne)),c=a=N.length;N[--a]==0;N.pop());if(!N[0])return i.charAt(0);if(B<0?--c:(E.c=N,E.e=c,E.s=l,E=p(E,S,R,_,o),N=E.c,d=E.r,c=E.e),s=c+R+1,B=N[s],a=o/2,d=d||s<0||N[s+1]!=null,d=_<4?(B!=null||d)&&(_==0||_==(E.s<0?3:2)):B>a||B==a&&(_==4||d||_==6&&N[s-1]&1||_==(E.s<0?8:7)),s<1||!N[0])r=d?Q(i.charAt(1),-R,i.charAt(0)):i.charAt(0);else{if(N.length=s,d)for(--o;++N[--s]>o;)N[s]=0,s||(++c,N=[1].concat(N));for(a=N.length;!N[--a];);for(B=0,r="";B<=a;r+=i.charAt(N[B++]));r=Q(r,c,i.charAt(0))}return r}}(),p=function(){function e(f,o,l){var u,i,s,c,a=0,d=f.length,E=o%te,N=o/te|0;for(f=f.slice();d--;)s=f[d]%te,c=f[d]/te|0,u=N*s+c*E,i=E*s+u%te*te+a,a=(i/l|0)+(u/te|0)+N*c,f[d]=i%l;return a&&(f=[a].concat(f)),f}function t(f,o,l,u){var i,s;if(l!=u)s=l>u?1:-1;else for(i=s=0;i<l;i++)if(f[i]!=o[i]){s=f[i]>o[i]?1:-1;break}return s}function r(f,o,l,u){for(var i=0;l--;)f[l]-=i,i=f[l]<o[l]?1:0,f[l]=i*u+f[l]-o[l];for(;!f[0]&&f.length>1;f.splice(0,1));}return function(f,o,l,u,i){var s,c,a,d,E,N,S,B,R,_,I,U,fe,Ne,Oe,Z,le,j=f.s==o.s?1:-1,F=f.c,M=o.c;if(!F||!F[0]||!M||!M[0])return new m(!f.s||!o.s||(F?M&&F[0]==M[0]:!M)?NaN:F&&F[0]==0||!M?j*0:j/0);for(B=new m(j),R=B.c=[],c=f.e-o.e,j=l+c+1,i||(i=Y,c=W(f.e/b)-W(o.e/b),j=j/b|0),a=0;M[a]==(F[a]||0);a++);if(M[a]>(F[a]||0)&&c--,j<0)R.push(1),d=!0;else{for(Ne=F.length,Z=M.length,a=0,j+=2,E=V(i/(M[0]+1)),E>1&&(M=e(M,E,i),F=e(F,E,i),Z=M.length,Ne=F.length),fe=Z,_=F.slice(0,Z),I=_.length;I<Z;_[I++]=0);le=M.slice(),le=[0].concat(le),Oe=M[0],M[1]>=i/2&&Oe++;do{if(E=0,s=t(M,_,Z,I),s<0){if(U=_[0],Z!=I&&(U=U*i+(_[1]||0)),E=V(U/Oe),E>1)for(E>=i&&(E=i-1),N=e(M,E,i),S=N.length,I=_.length;t(N,_,S,I)==1;)E--,r(N,Z<S?le:M,S,i),S=N.length,s=1;else E==0&&(s=E=1),N=M.slice(),S=N.length;if(S<I&&(N=[0].concat(N)),r(_,N,I,i),I=_.length,s==-1)for(;t(M,_,Z,I)<1;)E++,r(_,Z<I?le:M,I,i),I=_.length}else s===0&&(E++,_=[0]);R[a++]=E,_[0]?_[I++]=F[fe]||0:(_=[F[fe]],I=1)}while((fe++<Ne||_[0]!=null)&&j--);d=_[0]!=null,R[0]||R.splice(0,1)}if(i==Y){for(a=1,j=R[0];j>=10;j/=10,a++);H(B,l+(B.e=a+c*b-1)+1,u,d)}else B.e=c,B.r=+d;return B}}();function ye(e,t,r,f){var o,l,u,i,s;if(r==null?r=v:T(r,0,8),!e.c)return e.toString();if(o=e.c[0],u=e.e,t==null)s=X(e.c),s=f==1||f==2&&(u<=O||u>=A)?ue(s,u):Q(s,u,"0");else if(e=H(new m(e),t,r),l=e.e,s=X(e.c),i=s.length,f==1||f==2&&(t<=l||l<=O)){for(;i<t;s+="0",i++);s=ue(s,l)}else if(t-=u,s=Q(s,l,"0"),l+1>i){if(--t>0)for(s+=".";t--;s+="0");}else if(t+=l-i,t>0)for(l+1==i&&(s+=".");t--;s+="0");return e.s<0&&o?"-"+s:s}function Te(e,t){for(var r,f,o=1,l=new m(e[0]);o<e.length;o++)f=new m(e[o]),(!f.s||(r=oe(l,f))===t||r===0&&l.s===t)&&(l=f);return l}function Ee(e,t,r){for(var f=1,o=t.length;!t[--o];t.pop());for(o=t[0];o>=10;o/=10,f++);return(r=f+r*b-1)>k?e.c=e.e=null:r<D?e.c=[e.e=0]:(e.e=r,e.c=t),e}x=function(){var e=/^(-?)0([xbo])(?=\w[\w.]*$)/i,t=/^([^.]+)\.$/,r=/^\.([^.]+)$/,f=/^-?(Infinity|NaN)$/,o=/^\s*\+(?=[\w.])|^\s+|\s+$/g;return function(l,u,i,s){var c,a=i?u:u.replace(o,"");if(f.test(a))l.s=isNaN(a)?null:a<0?-1:1;else{if(!i&&(a=a.replace(e,function(d,E,N){return c=(N=N.toLowerCase())=="x"?16:N=="b"?2:8,!s||s==c?E:d}),s&&(c=s,a=a.replace(t,"$1").replace(r,"0.$1")),u!=a))return new m(a,c);if(m.DEBUG)throw Error(G+"Not a"+(s?" base "+s:"")+" number: "+u);l.s=null}l.c=l.e=null}}();function H(e,t,r,f){var o,l,u,i,s,c,a,d=e.c,E=_e;if(d){e:{for(o=1,i=d[0];i>=10;i/=10,o++);if(l=t-o,l<0)l+=b,u=t,s=d[c=0],a=V(s/E[o-u-1]%10);else if(c=Ae((l+1)/b),c>=d.length)if(f){for(;d.length<=c;d.push(0));s=a=0,o=1,l%=b,u=l-b+1}else break e;else{for(s=i=d[c],o=1;i>=10;i/=10,o++);l%=b,u=l-b+o,a=u<0?0:V(s/E[o-u-1]%10)}if(f=f||t<0||d[c+1]!=null||(u<0?s:s%E[o-u-1]),f=r<4?(a||f)&&(r==0||r==(e.s<0?3:2)):a>5||a==5&&(r==4||f||r==6&&(l>0?u>0?s/E[o-u]:0:d[c-1])%10&1||r==(e.s<0?8:7)),t<1||!d[0])return d.length=0,f?(t-=e.e+1,d[0]=E[(b-t%b)%b],e.e=-t||0):d[0]=e.e=0,e;if(l==0?(d.length=c,i=1,c--):(d.length=c+1,i=E[b-l],d[c]=u>0?V(s/E[o-u]%E[u])*i:0),f)for(;;)if(c==0){for(l=1,u=d[0];u>=10;u/=10,l++);for(u=d[0]+=i,i=1;u>=10;u/=10,i++);l!=i&&(e.e++,d[0]==Y&&(d[0]=1));break}else{if(d[c]+=i,d[c]!=Y)break;d[c--]=0,i=1}for(l=d.length;d[--l]===0;d.pop());}e.e>k?e.c=e.e=null:e.e<D&&(e.c=[e.e=0])}return e}function J(e){var t,r=e.e;return r===null?e.toString():(t=X(e.c),t=r<=O||r>=A?ue(t,r):Q(t,r,"0"),e.s<0?"-"+t:t)}return h.absoluteValue=h.abs=function(){var e=new m(this);return e.s<0&&(e.s=1),e},h.comparedTo=function(e,t){return oe(this,new m(e,t))},h.decimalPlaces=h.dp=function(e,t){var r,f,o,l=this;if(e!=null)return T(e,0,$),t==null?t=v:T(t,0,8),H(new m(l),e+l.e+1,t);if(!(r=l.c))return null;if(f=((o=r.length-1)-W(this.e/b))*b,o=r[o])for(;o%10==0;o/=10,f--);return f<0&&(f=0),f},h.dividedBy=h.div=function(e,t){return p(this,new m(e,t),y,v)},h.dividedToIntegerBy=h.idiv=function(e,t){return p(this,new m(e,t),0,1)},h.exponentiatedBy=h.pow=function(e,t){var r,f,o,l,u,i,s,c,a,d=this;if(e=new m(e),e.c&&!e.isInteger())throw Error(G+"Exponent not an integer: "+J(e));if(t!=null&&(t=new m(t)),i=e.e>14,!d.c||!d.c[0]||d.c[0]==1&&!d.e&&d.c.length==1||!e.c||!e.c[0])return a=new m(Math.pow(+J(d),i?e.s*(2-ce(e)):+J(e))),t?a.mod(t):a;if(s=e.s<0,t){if(t.c?!t.c[0]:!t.s)return new m(NaN);f=!s&&d.isInteger()&&t.isInteger(),f&&(d=d.mod(t))}else{if(e.e>9&&(d.e>0||d.e<-1||(d.e==0?d.c[0]>1||i&&d.c[1]>=24e7:d.c[0]<8e13||i&&d.c[0]<=9999975e7)))return l=d.s<0&&ce(e)?-0:0,d.e>-1&&(l=1/l),new m(s?1/l:l);q&&(l=Ae(q/b+2))}for(i?(r=new m(.5),s&&(e.s=1),c=ce(e)):(o=Math.abs(+J(e)),c=o%2),a=new m(w);;){if(c){if(a=a.times(d),!a.c)break;l?a.c.length>l&&(a.c.length=l):f&&(a=a.mod(t))}if(o){if(o=V(o/2),o===0)break;c=o%2}else if(e=e.times(r),H(e,e.e+1,1),e.e>14)c=ce(e);else{if(o=+J(e),o===0)break;c=o%2}d=d.times(d),l?d.c&&d.c.length>l&&(d.c.length=l):f&&(d=d.mod(t))}return f?a:(s&&(a=w.div(a)),t?a.mod(t):l?H(a,q,v,u):a)},h.integerValue=function(e){var t=new m(this);return e==null?e=v:T(e,0,8),H(t,t.e+1,e)},h.isEqualTo=h.eq=function(e,t){return oe(this,new m(e,t))===0},h.isFinite=function(){return!!this.c},h.isGreaterThan=h.gt=function(e,t){return oe(this,new m(e,t))>0},h.isGreaterThanOrEqualTo=h.gte=function(e,t){return(t=oe(this,new m(e,t)))===1||t===0},h.isInteger=function(){return!!this.c&&W(this.e/b)>this.c.length-2},h.isLessThan=h.lt=function(e,t){return oe(this,new m(e,t))<0},h.isLessThanOrEqualTo=h.lte=function(e,t){return(t=oe(this,new m(e,t)))===-1||t===0},h.isNaN=function(){return!this.s},h.isNegative=function(){return this.s<0},h.isPositive=function(){return this.s>0},h.isZero=function(){return!!this.c&&this.c[0]==0},h.minus=function(e,t){var r,f,o,l,u=this,i=u.s;if(e=new m(e,t),t=e.s,!i||!t)return new m(NaN);if(i!=t)return e.s=-t,u.plus(e);var s=u.e/b,c=e.e/b,a=u.c,d=e.c;if(!s||!c){if(!a||!d)return a?(e.s=-t,e):new m(d?u:NaN);if(!a[0]||!d[0])return d[0]?(e.s=-t,e):new m(a[0]?u:v==3?-0:0)}if(s=W(s),c=W(c),a=a.slice(),i=s-c){for((l=i<0)?(i=-i,o=a):(c=s,o=d),o.reverse(),t=i;t--;o.push(0));o.reverse()}else for(f=(l=(i=a.length)<(t=d.length))?i:t,i=t=0;t<f;t++)if(a[t]!=d[t]){l=a[t]<d[t];break}if(l&&(o=a,a=d,d=o,e.s=-e.s),t=(f=d.length)-(r=a.length),t>0)for(;t--;a[r++]=0);for(t=Y-1;f>i;){if(a[--f]<d[f]){for(r=f;r&&!a[--r];a[r]=t);--a[r],a[f]+=Y}a[f]-=d[f]}for(;a[0]==0;a.splice(0,1),--c);return a[0]?Ee(e,a,c):(e.s=v==3?-1:1,e.c=[e.e=0],e)},h.modulo=h.mod=function(e,t){var r,f,o=this;return e=new m(e,t),!o.c||!e.s||e.c&&!e.c[0]?new m(NaN):!e.c||o.c&&!o.c[0]?new m(o):(L==9?(f=e.s,e.s=1,r=p(o,e,0,3),e.s=f,r.s*=f):r=p(o,e,0,L),e=o.minus(r.times(e)),!e.c[0]&&L==1&&(e.s=o.s),e)},h.multipliedBy=h.times=function(e,t){var r,f,o,l,u,i,s,c,a,d,E,N,S,B,R,_=this,I=_.c,U=(e=new m(e,t)).c;if(!I||!U||!I[0]||!U[0])return!_.s||!e.s||I&&!I[0]&&!U||U&&!U[0]&&!I?e.c=e.e=e.s=null:(e.s*=_.s,!I||!U?e.c=e.e=null:(e.c=[0],e.e=0)),e;for(f=W(_.e/b)+W(e.e/b),e.s*=_.s,s=I.length,d=U.length,s<d&&(S=I,I=U,U=S,o=s,s=d,d=o),o=s+d,S=[];o--;S.push(0));for(B=Y,R=te,o=d;--o>=0;){for(r=0,E=U[o]%R,N=U[o]/R|0,u=s,l=o+u;l>o;)c=I[--u]%R,a=I[u]/R|0,i=N*c+a*E,c=E*c+i%R*R+S[l]+r,r=(c/B|0)+(i/R|0)+N*a,S[l--]=c%B;S[l]=r}return r?++f:S.splice(0,1),Ee(e,S,f)},h.negated=function(){var e=new m(this);return e.s=-e.s||null,e},h.plus=function(e,t){var r,f=this,o=f.s;if(e=new m(e,t),t=e.s,!o||!t)return new m(NaN);if(o!=t)return e.s=-t,f.minus(e);var l=f.e/b,u=e.e/b,i=f.c,s=e.c;if(!l||!u){if(!i||!s)return new m(o/0);if(!i[0]||!s[0])return s[0]?e:new m(i[0]?f:o*0)}if(l=W(l),u=W(u),i=i.slice(),o=l-u){for(o>0?(u=l,r=s):(o=-o,r=i),r.reverse();o--;r.push(0));r.reverse()}for(o=i.length,t=s.length,o-t<0&&(r=s,s=i,i=r,t=o),o=0;t;)o=(i[--t]=i[t]+s[t]+o)/Y|0,i[t]=Y===i[t]?0:i[t]%Y;return o&&(i=[o].concat(i),++u),Ee(e,i,u)},h.precision=h.sd=function(e,t){var r,f,o,l=this;if(e!=null&&e!==!!e)return T(e,1,$),t==null?t=v:T(t,0,8),H(new m(l),e,t);if(!(r=l.c))return null;if(o=r.length-1,f=o*b+1,o=r[o]){for(;o%10==0;o/=10,f--);for(o=r[0];o>=10;o/=10,f++);}return e&&l.e+1>f&&(f=l.e+1),f},h.shiftedBy=function(e){return T(e,-be,be),this.times("1e"+e)},h.squareRoot=h.sqrt=function(){var e,t,r,f,o,l=this,u=l.c,i=l.s,s=l.e,c=y+4,a=new m("0.5");if(i!==1||!u||!u[0])return new m(!i||i<0&&(!u||u[0])?NaN:u?l:1/0);if(i=Math.sqrt(+J(l)),i==0||i==1/0?(t=X(u),(t.length+s)%2==0&&(t+="0"),i=Math.sqrt(+t),s=W((s+1)/2)-(s<0||s%2),i==1/0?t="5e"+s:(t=i.toExponential(),t=t.slice(0,t.indexOf("e")+1)+s),r=new m(t)):r=new m(i+""),r.c[0]){for(s=r.e,i=s+c,i<3&&(i=0);;)if(o=r,r=a.times(o.plus(p(l,o,c,1))),X(o.c).slice(0,i)===(t=X(r.c)).slice(0,i))if(r.e<s&&--i,t=t.slice(i-3,i+1),t=="9999"||!f&&t=="4999"){if(!f&&(H(o,o.e+y+2,0),o.times(o).eq(l))){r=o;break}c+=4,i+=4,f=1}else{(!+t||!+t.slice(1)&&t.charAt(0)=="5")&&(H(r,r.e+y+2,1),e=!r.times(r).eq(l));break}}return H(r,r.e+y+1,v,e)},h.toExponential=function(e,t){return e!=null&&(T(e,0,$),e++),ye(this,e,t,1)},h.toFixed=function(e,t){return e!=null&&(T(e,0,$),e=e+this.e+1),ye(this,e,t)},h.toFormat=function(e,t,r){var f,o=this;if(r==null)e!=null&&t&&typeof t=="object"?(r=t,t=null):e&&typeof e=="object"?(r=e,e=t=null):r=xe;else if(typeof r!="object")throw Error(G+"Argument not an object: "+r);if(f=o.toFixed(e,t),o.c){var l,u=f.split("."),i=+r.groupSize,s=+r.secondaryGroupSize,c=r.groupSeparator||"",a=u[0],d=u[1],E=o.s<0,N=E?a.slice(1):a,S=N.length;if(s&&(l=i,i=s,s=l,S-=l),i>0&&S>0){for(l=S%i||i,a=N.substr(0,l);l<S;l+=i)a+=c+N.substr(l,i);s>0&&(a+=c+N.slice(l)),E&&(a="-"+a)}f=d?a+(r.decimalSeparator||"")+((s=+r.fractionGroupSize)?d.replace(new RegExp("\\d{"+s+"}\\B","g"),"$&"+(r.fractionGroupSeparator||"")):d):a}return(r.prefix||"")+f+(r.suffix||"")},h.toFraction=function(e){var t,r,f,o,l,u,i,s,c,a,d,E,N=this,S=N.c;if(e!=null&&(i=new m(e),!i.isInteger()&&(i.c||i.s!==1)||i.lt(w)))throw Error(G+"Argument "+(i.isInteger()?"out of range: ":"not an integer: ")+J(i));if(!S)return new m(N);for(t=new m(w),c=r=new m(w),f=s=new m(w),E=X(S),l=t.e=E.length-N.e-1,t.c[0]=_e[(u=l%b)<0?b+u:u],e=!e||i.comparedTo(t)>0?l>0?t:c:i,u=k,k=1/0,i=new m(E),s.c[0]=0;a=p(i,t,0,1),o=r.plus(a.times(f)),o.comparedTo(e)!=1;)r=f,f=o,c=s.plus(a.times(o=c)),s=o,t=i.minus(a.times(o=t)),i=o;return o=p(e.minus(r),f,0,1),s=s.plus(o.times(c)),r=r.plus(o.times(f)),s.s=c.s=N.s,l=l*2,d=p(c,f,l,v).minus(N).abs().comparedTo(p(s,r,l,v).minus(N).abs())<1?[c,f]:[s,r],k=u,d},h.toNumber=function(){return+J(this)},h.toPrecision=function(e,t){return e!=null&&T(e,1,$),ye(this,e,t,2)},h.toString=function(e){var t,r=this,f=r.s,o=r.e;return o===null?f?(t="Infinity",f<0&&(t="-"+t)):t="NaN":(e==null?t=o<=O||o>=A?ue(X(r.c),o):Q(X(r.c),o,"0"):e===10&&ve?(r=H(new m(r),y+o+1,v),t=Q(X(r.c),r.e,"0")):(T(e,2,ne.length,"Base"),t=g(Q(X(r.c),o,"0"),10,e,f,!0)),f<0&&r.c[0]&&(t="-"+t)),t},h.valueOf=h.toJSON=function(){return J(this)},h._isBigNumber=!0,h[Symbol.toStringTag]="BigNumber",h[Symbol.for("nodejs.util.inspect.custom")]=h.valueOf,n!=null&&m.set(n),m}function W(n){var p=n|0;return n>0||n===p?p:p-1}function X(n){for(var p,g,x=1,h=n.length,w=n[0]+"";x<h;){for(p=n[x++]+"",g=b-p.length;g--;p="0"+p);w+=p}for(h=w.length;w.charCodeAt(--h)===48;);return w.slice(0,h+1||1)}function oe(n,p){var g,x,h=n.c,w=p.c,y=n.s,v=p.s,O=n.e,A=p.e;if(!y||!v)return null;if(g=h&&!h[0],x=w&&!w[0],g||x)return g?x?0:-v:y;if(y!=v)return y;if(g=y<0,x=O==A,!h||!w)return x?0:!h^g?1:-1;if(!x)return O>A^g?1:-1;for(v=(O=h.length)<(A=w.length)?O:A,y=0;y<v;y++)if(h[y]!=w[y])return h[y]>w[y]^g?1:-1;return O==A?0:O>A^g?1:-1}function T(n,p,g,x){if(n<p||n>g||n!==V(n))throw Error(G+(x||"Argument")+(typeof n=="number"?n<p||n>g?" out of range: ":" not an integer: ":" not a primitive number: ")+String(n))}function ce(n){var p=n.c.length-1;return W(n.e/b)==p&&n.c[p]%2!=0}function ue(n,p){return(n.length>1?n.charAt(0)+"."+n.slice(1):n)+(p<0?"e":"e+")+p}function Q(n,p,g){var x,h;if(p<0){for(h=g+".";++p;h+=g);n=h+n}else if(x=n.length,++p>x){for(h=g,p-=x;--p;h+=g);n+=h}else p<x&&(n=n.slice(0,p)+"."+n.slice(p));return n}var Ue=Me();const Tt=Ue;let Fe={data:""},Ge=n=>typeof window=="object"?((n?n.querySelector("#_goober"):window._goober)||Object.assign((n||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:n||Fe,ze=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,qe=/\/\*[^]*?\*\/|  +/g,ke=/\n+/g,re=(n,p)=>{let g="",x="",h="";for(let w in n){let y=n[w];w[0]=="@"?w[1]=="i"?g=w+" "+y+";":x+=w[1]=="f"?re(y,w):w+"{"+re(y,w[1]=="k"?"":p)+"}":typeof y=="object"?x+=re(y,p?p.replace(/([^,])+/g,v=>w.replace(/(^:.*)|([^,])+/g,O=>/&/.test(O)?O.replace(/&/g,v):v?v+" "+O:O)):w):y!=null&&(w=/^--/.test(w)?w:w.replace(/[A-Z]/g,"-$&").toLowerCase(),h+=re.p?re.p(w,y):w+":"+y+";")}return g+(p&&h?p+"{"+h+"}":h)+x},K={},Ce=n=>{if(typeof n=="object"){let p="";for(let g in n)p+=g+Ce(n[g]);return p}return n},He=(n,p,g,x,h)=>{let w=Ce(n),y=K[w]||(K[w]=(O=>{let A=0,D=11;for(;A<O.length;)D=101*D+O.charCodeAt(A++)>>>0;return"go"+D})(w));if(!K[y]){let O=w!==n?n:(A=>{let D,k,C=[{}];for(;D=ze.exec(A.replace(qe,""));)D[4]?C.shift():D[3]?(k=D[3].replace(ke," ").trim(),C.unshift(C[0][k]=C[0][k]||{})):C[0][D[1]]=D[2].replace(ke," ").trim();return C[0]})(n);K[y]=re(h?{["@keyframes "+y]:O}:O,g?"":"."+y)}let v=g&&K.g?K.g:null;return g&&(K.g=K[y]),((O,A,D,k)=>{k?A.data=A.data.replace(k,O):A.data.indexOf(O)===-1&&(A.data=D?O+A.data:A.data+O)})(K[y],p,x,v),y},je=(n,p,g)=>n.reduce((x,h,w)=>{let y=p[w];if(y&&y.call){let v=y(g),O=v&&v.props&&v.props.className||/^go/.test(v)&&v;y=O?"."+O:v&&typeof v=="object"?v.props?"":re(v,""):v===!1?"":v}return x+h+(y??"")},"");function we(n){let p=this||{},g=n.call?n(p.p):n;return He(g.unshift?g.raw?je(g,[].slice.call(arguments,1),p.p):g.reduce((x,h)=>Object.assign(x,h&&h.call?h(p.p):h),{}):g,Ge(p.target),p.g,p.o,p.k)}let Re,Se,Ie;we.bind({g:1});let ee=we.bind({k:1});function Xe(n,p,g,x){re.p=p,Re=n,Se=g,Ie=x}function ie(n,p){let g=this||{};return function(){let x=arguments;function h(w,y){let v=Object.assign({},w),O=v.className||h.className;g.p=Object.assign({theme:Se&&Se()},v),g.o=/ *go\d+/.test(O),v.className=we.apply(g,x)+(O?" "+O:"");let A=n;return n[0]&&(A=v.as||n,delete v.as),Ie&&A[0]&&Ie(v),Re(A,v)}return h}}var Ve=n=>typeof n=="function",me=(n,p)=>Ve(n)?n(p):n,We=(()=>{let n=0;return()=>(++n).toString()})(),$e=(()=>{let n;return()=>{if(n===void 0&&typeof window<"u"){let p=matchMedia("(prefers-reduced-motion: reduce)");n=!p||p.matches}return n}})(),Ye=20,he=new Map,Ze=1e3,Be=n=>{if(he.has(n))return;let p=setTimeout(()=>{he.delete(n),se({type:4,toastId:n})},Ze);he.set(n,p)},Je=n=>{let p=he.get(n);p&&clearTimeout(p)},De=(n,p)=>{switch(p.type){case 0:return{...n,toasts:[p.toast,...n.toasts].slice(0,Ye)};case 1:return p.toast.id&&Je(p.toast.id),{...n,toasts:n.toasts.map(w=>w.id===p.toast.id?{...w,...p.toast}:w)};case 2:let{toast:g}=p;return n.toasts.find(w=>w.id===g.id)?De(n,{type:1,toast:g}):De(n,{type:0,toast:g});case 3:let{toastId:x}=p;return x?Be(x):n.toasts.forEach(w=>{Be(w.id)}),{...n,toasts:n.toasts.map(w=>w.id===x||x===void 0?{...w,visible:!1}:w)};case 4:return p.toastId===void 0?{...n,toasts:[]}:{...n,toasts:n.toasts.filter(w=>w.id!==p.toastId)};case 5:return{...n,pausedAt:p.time};case 6:let h=p.time-(n.pausedAt||0);return{...n,pausedAt:void 0,toasts:n.toasts.map(w=>({...w,pauseDuration:w.pauseDuration+h}))}}},de=[],ge={toasts:[],pausedAt:void 0},se=n=>{ge=De(ge,n),de.forEach(p=>{p(ge)})},Qe={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},Ke=(n={})=>{let[p,g]=P.useState(ge);P.useEffect(()=>(de.push(g),()=>{let h=de.indexOf(g);h>-1&&de.splice(h,1)}),[p]);let x=p.toasts.map(h=>{var w,y;return{...n,...n[h.type],...h,duration:h.duration||((w=n[h.type])==null?void 0:w.duration)||n?.duration||Qe[h.type],style:{...n.style,...(y=n[h.type])==null?void 0:y.style,...h.style}}});return{...p,toasts:x}},et=(n,p="blank",g)=>({createdAt:Date.now(),visible:!0,type:p,ariaProps:{role:"status","aria-live":"polite"},message:n,pauseDuration:0,...g,id:g?.id||We()}),ae=n=>(p,g)=>{let x=et(p,n,g);return se({type:2,toast:x}),x.id},z=(n,p)=>ae("blank")(n,p);z.error=ae("error");z.success=ae("success");z.loading=ae("loading");z.custom=ae("custom");z.dismiss=n=>{se({type:3,toastId:n})};z.remove=n=>se({type:4,toastId:n});z.promise=(n,p,g)=>{let x=z.loading(p.loading,{...g,...g?.loading});return n.then(h=>(z.success(me(p.success,h),{id:x,...g,...g?.success}),h)).catch(h=>{z.error(me(p.error,h),{id:x,...g,...g?.error})}),n};var tt=(n,p)=>{se({type:1,toast:{id:n,height:p}})},rt=()=>{se({type:5,time:Date.now()})},it=n=>{let{toasts:p,pausedAt:g}=Ke(n);P.useEffect(()=>{if(g)return;let w=Date.now(),y=p.map(v=>{if(v.duration===1/0)return;let O=(v.duration||0)+v.pauseDuration-(w-v.createdAt);if(O<0){v.visible&&z.dismiss(v.id);return}return setTimeout(()=>z.dismiss(v.id),O)});return()=>{y.forEach(v=>v&&clearTimeout(v))}},[p,g]);let x=P.useCallback(()=>{g&&se({type:6,time:Date.now()})},[g]),h=P.useCallback((w,y)=>{let{reverseOrder:v=!1,gutter:O=8,defaultPosition:A}=y||{},D=p.filter(L=>(L.position||A)===(w.position||A)&&L.height),k=D.findIndex(L=>L.id===w.id),C=D.filter((L,q)=>q<k&&L.visible).length;return D.filter(L=>L.visible).slice(...v?[C+1]:[0,C]).reduce((L,q)=>L+(q.height||0)+O,0)},[p]);return{toasts:p,handlers:{updateHeight:tt,startPause:rt,endPause:x,calculateOffset:h}}},nt=ee`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,ot=ee`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,st=ee`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,lt=ie("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${n=>n.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${nt} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${ot} 0.15s ease-out forwards;
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
    animation: ${st} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,at=ee`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,ft=ie("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${n=>n.secondary||"#e0e0e0"};
  border-right-color: ${n=>n.primary||"#616161"};
  animation: ${at} 1s linear infinite;
`,ct=ee`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,ut=ee`
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
}`,pt=ie("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${n=>n.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ct} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${ut} 0.2s ease-out forwards;
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
`,ht=ie("div")`
  position: absolute;
`,dt=ie("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,gt=ee`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,mt=ie("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${gt} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,wt=({toast:n})=>{let{icon:p,type:g,iconTheme:x}=n;return p!==void 0?typeof p=="string"?P.createElement(mt,null,p):p:g==="blank"?null:P.createElement(dt,null,P.createElement(ft,{...x}),g!=="loading"&&P.createElement(ht,null,g==="error"?P.createElement(lt,{...x}):P.createElement(pt,{...x})))},xt=n=>`
0% {transform: translate3d(0,${n*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,vt=n=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${n*-150}%,-1px) scale(.6); opacity:0;}
`,yt="0%{opacity:0;} 100%{opacity:1;}",Et="0%{opacity:1;} 100%{opacity:0;}",Nt=ie("div")`
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
`,Ot=ie("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,At=(n,p)=>{let g=n.includes("top")?1:-1,[x,h]=$e()?[yt,Et]:[xt(g),vt(g)];return{animation:p?`${ee(x)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${ee(h)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},bt=P.memo(({toast:n,position:p,style:g,children:x})=>{let h=n.height?At(n.position||p||"top-center",n.visible):{opacity:0},w=P.createElement(wt,{toast:n}),y=P.createElement(Ot,{...n.ariaProps},me(n.message,n));return P.createElement(Nt,{className:n.className,style:{...h,...g,...n.style}},typeof x=="function"?x({icon:w,message:y}):P.createElement(P.Fragment,null,w,y))});Xe(P.createElement);var _t=({id:n,className:p,style:g,onHeightUpdate:x,children:h})=>{let w=P.useCallback(y=>{if(y){let v=()=>{let O=y.getBoundingClientRect().height;x(n,O)};v(),new MutationObserver(v).observe(y,{subtree:!0,childList:!0,characterData:!0})}},[n,x]);return P.createElement("div",{ref:w,className:p,style:g},h)},St=(n,p)=>{let g=n.includes("top"),x=g?{top:0}:{bottom:0},h=n.includes("center")?{justifyContent:"center"}:n.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:$e()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${p*(g?1:-1)}px)`,...x,...h}},It=we`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,pe=16,Pt=({reverseOrder:n,position:p="top-center",toastOptions:g,gutter:x,children:h,containerStyle:w,containerClassName:y})=>{let{toasts:v,handlers:O}=it(g);return P.createElement("div",{style:{position:"fixed",zIndex:9999,top:pe,left:pe,right:pe,bottom:pe,pointerEvents:"none",...w},className:y,onMouseEnter:O.startPause,onMouseLeave:O.endPause},v.map(A=>{let D=A.position||p,k=O.calculateOffset(A,{reverseOrder:n,gutter:x,defaultPosition:p}),C=St(D,k);return P.createElement(_t,{id:A.id,key:A.id,onHeightUpdate:O.updateHeight,className:A.visible?It:"",style:C},A.type==="custom"?me(A.message,A):h?h(A):P.createElement(bt,{toast:A,position:D}))}))},kt=z;export{Tt as B,Pt as I,kt as _};
