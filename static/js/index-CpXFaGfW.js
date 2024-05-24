import{j as e}from"./rainbowkit-BTRXFmLI.js";import{r as o}from"./react-zxVSF9uU.js";import{g}from"./index-D04my92X.js";import{g as V,m as q,j as K,r as L,k as G,P as Y,l as X,n as Z,C as _,q as J,s as Q,T as ee,t as te,v as se}from"./index-D11hpnio.js";import{K as ne,B as M}from"./button-BVvid0Gv.js";import{P as re}from"./progress-BR4Z7GEK.js";import"./CheckCircleFilled-BnfmYzlg.js";const y=t=>t?typeof t=="function"?t():t:null,ae=t=>{const{componentCls:s,popoverColor:r,titleMinWidth:n,fontWeightStrong:a,innerPadding:l,boxShadowSecondary:p,colorTextHeading:c,borderRadiusLG:i,zIndexPopup:x,titleMarginBottom:d,colorBgElevated:f,popoverBg:u,titleBorderBottom:h,innerContentPadding:v,titlePadding:j}=t;return[{[s]:Object.assign(Object.assign({},L(t)),{position:"absolute",top:0,left:{_skip_check_:!0,value:0},zIndex:x,fontWeight:"normal",whiteSpace:"normal",textAlign:"start",cursor:"auto",userSelect:"text",transformOrigin:"var(--arrow-x, 50%) var(--arrow-y, 50%)","--antd-arrow-background-color":f,width:"max-content",maxWidth:"100vw","&-rtl":{direction:"rtl"},"&-hidden":{display:"none"},[`${s}-content`]:{position:"relative"},[`${s}-inner`]:{backgroundColor:u,backgroundClip:"padding-box",borderRadius:i,boxShadow:p,padding:l},[`${s}-title`]:{minWidth:n,marginBottom:d,color:c,fontWeight:a,borderBottom:h,padding:j},[`${s}-inner-content`]:{color:r,padding:v}})},G(t,"var(--antd-arrow-background-color)"),{[`${s}-pure`]:{position:"relative",maxWidth:"none",margin:t.sizePopupArrow,display:"inline-block",[`${s}-content`]:{display:"inline-block"}}}]},oe=t=>{const{componentCls:s}=t;return{[s]:Y.map(r=>{const n=t[`${r}6`];return{[`&${s}-${r}`]:{"--antd-arrow-background-color":n,[`${s}-inner`]:{backgroundColor:n},[`${s}-arrow`]:{background:"transparent"}}}})}},le=t=>{const{lineWidth:s,controlHeight:r,fontHeight:n,padding:a,wireframe:l,zIndexPopupBase:p,borderRadiusLG:c,marginXS:i,lineType:x,colorSplit:d,paddingSM:f}=t,u=r-n,h=u/2,v=u/2-s,j=a;return Object.assign(Object.assign(Object.assign({titleMinWidth:177,zIndexPopup:p+30},X(t)),Z({contentRadius:c,limitVerticalRadius:!0})),{innerPadding:l?0:12,titleMarginBottom:l?0:i,titlePadding:l?`${h}px ${j}px ${v}px`:0,titleBorderBottom:l?`${s}px ${x} ${d}`:"none",innerContentPadding:l?`${f}px ${j}px`:0})},E=V("Popover",t=>{const{colorBgElevated:s,colorText:r}=t,n=q(t,{popoverBg:s,popoverColor:r});return[ae(n),oe(n),K(n,"zoom-big")]},le,{resetStyle:!1,deprecatedTokens:[["width","titleMinWidth"],["minWidth","titleMinWidth"]]});var ie=function(t,s){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&s.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)s.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r};const ce=(t,s,r)=>!s&&!r?null:o.createElement(o.Fragment,null,s&&o.createElement("div",{className:`${t}-title`},y(s)),o.createElement("div",{className:`${t}-inner-content`},y(r))),de=t=>{const{hashId:s,prefixCls:r,className:n,style:a,placement:l="top",title:p,content:c,children:i}=t;return o.createElement("div",{className:g(s,r,`${r}-pure`,`${r}-placement-${l}`,n),style:a},o.createElement("div",{className:`${r}-arrow`}),o.createElement(J,Object.assign({},t,{className:s,prefixCls:r}),i||ce(r,p,c)))},pe=t=>{const{prefixCls:s,className:r}=t,n=ie(t,["prefixCls","className"]),{getPrefixCls:a}=o.useContext(_),l=a("popover",s),[p,c,i]=E(l);return p(o.createElement(de,Object.assign({},n,{prefixCls:l,hashId:c,className:g(r,i)})))},me=pe;var xe=function(t,s){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&s.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)s.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r};const ue=t=>{let{title:s,content:r,prefixCls:n}=t;return o.createElement(o.Fragment,null,s&&o.createElement("div",{className:`${n}-title`},y(s)),o.createElement("div",{className:`${n}-inner-content`},y(r)))},fe=o.forwardRef((t,s)=>{var r,n;const{prefixCls:a,title:l,content:p,overlayClassName:c,placement:i="top",trigger:x="hover",children:d,mouseEnterDelay:f=.1,mouseLeaveDelay:u=.1,onOpenChange:h,overlayStyle:v={}}=t,j=xe(t,["prefixCls","title","content","overlayClassName","placement","trigger","children","mouseEnterDelay","mouseLeaveDelay","onOpenChange","overlayStyle"]),{getPrefixCls:k}=o.useContext(_),N=k("popover",a),[I,R,D]=E(N),W=k(),z=g(c,R,D),[H,A]=Q(!1,{value:(r=t.open)!==null&&r!==void 0?r:t.visible,defaultValue:(n=t.defaultOpen)!==null&&n!==void 0?n:t.defaultVisible}),$=(m,w)=>{A(m,!0),h?.(m,w)},F=m=>{m.keyCode===ne.ESC&&$(!1,m)},U=m=>{$(m)};return I(o.createElement(ee,Object.assign({placement:i,trigger:x,mouseEnterDelay:f,mouseLeaveDelay:u,overlayStyle:v},j,{prefixCls:N,overlayClassName:z,ref:s,open:H,onOpenChange:U,overlay:l||p?o.createElement(ue,{prefixCls:N,title:l,content:p}):null,transitionName:te(W,"zoom-big",j.transitionName),"data-popover-inject":!0}),se(d,{onKeyDown:m=>{var w,b;o.isValidElement(d)&&((b=d==null?void 0:(w=d.props).onKeyDown)===null||b===void 0||b.call(w,m)),F(m)}})))}),T=fe;T._InternalPanelDoNotUseOrYouWillBeFired=me;const S=T,C=({instant:t,onEnded:s,format:r,className:n})=>{const[a,l]=o.useState(0),p=o.useMemo(()=>{if(!t)return[];const c=Date.now(),i=t-c;if(i<=0)return s?.(!0),[0,0,0,0];const x=Math.floor(i/(1e3*60*60*24)),d=Math.floor(i%(1e3*60*60*24)/(1e3*60*60)),f=Math.floor(i%(1e3*60*60)/(1e3*60)),u=Math.floor(i%(1e3*60)/1e3);return r?r([x,d,f,u]):[`${String(d).padStart(2,"0")}`,`${String(f).padStart(2,"0")}`,`${String(u).padStart(2,"0")}`]},[t,a,s]);return o.useEffect(()=>{const c=Date.now();if(t-c>0){s?.(!1);const x=setInterval(()=>{l(d=>d+1)},1e3);return()=>{clearInterval(x)}}},[t,s]),e.jsx("div",{className:g("countdown",n),children:p.map((c,i)=>e.jsxs(o.Fragment,{children:[e.jsx("span",{className:"timefragments text-lg text-white font-404px",children:c}),i<p.length-1&&e.jsx("span",{className:"splitor text-lg text-white font-404px",children:":"})]},i))})};C.displayName=C.name;const P=C;function ge(){const{stage:t}=o.useContext(B),s=o.useMemo(()=>[{user:"dogekiller",link:"",followed:!1},{user:"MeMoo.ai",link:"",followed:!0}],[]),r=o.useMemo(()=>t==="in-queue",[t]),n=o.useMemo(()=>t==="imo",[t]),a=o.useMemo(()=>t==="launch"||t==="1st-claim"||t==="2st-claim",[t]);return e.jsxs("div",{className:"airdrop_claim px-5 pt-9 pb-5",children:[e.jsxs("div",{className:"head flex justify-between",children:[e.jsxs("h3",{className:"flex items-center gap-x-2 font-404px text-green text text-lg",children:["airdrop"," ",e.jsx(S,{children:e.jsx("img",{src:"/create/tip.png"})})]}),r&&e.jsx("span",{className:"endsin font-OCR text-white",children:"Ends in"})]}),e.jsxs("div",{className:"in_queue flex justify-between",children:[e.jsxs("p",{className:"text-deep-green text-xs whitespace-pre-wrap",children:["Complete tasks to be",`
`,"eligible for token airdrop."," "]}),r&&e.jsx(P,{instant:Date.now()+24*60*60*1e3})]}),e.jsx("ul",{className:"follow_list flex flex-col gap-y-2 mt-4",children:s.map(l=>e.jsxs("li",{className:"follow_list_item flex items-center w-full justify-between px-3 py-3.5",children:[e.jsxs("p",{className:g("leading-5 font-OCR whitespace-pre-wrap",{"text-white":r||n,"text-deep-green":a}),children:["Follow @dogekiller",`
`,"on twitter"]}),e.jsx("img",{className:g("w-5",{"cursor-pointer":!l.followed,"opacity-30":a}),src:`/create/icon-${l.followed?"followed":"outlink-media"}.png`})]},l.user))}),n&&e.jsxs("div",{className:"mt-5 airdrop-unlock flex flex-col items-center gap-y-2",children:[e.jsxs("div",{className:"flex gap-x-3.5",children:[e.jsx("img",{className:"w-5 object-contain",src:"/create/icon-airdrop-lock.png"}),e.jsx(P,{instant:Date.now()+24*60*60*1e3})]}),e.jsx("p",{className:"text-white font-OCR leading-20 text-sm",children:"Wait for your airdrop to unlock."})]}),a&&e.jsxs("div",{className:"mt-5 airdrop-unlock flex flex-col items-center gap-y-2",children:[e.jsx("img",{className:"w-5 object-contain",src:"/create/icon-airdrop-unlock.png"}),e.jsx("p",{className:"text-white font-404px leading-20 text-2xl",children:"2,000,000 WIF"})]}),e.jsx(M,{disabled:r||n,className:g("uppercase w-full claim_btn h-12 font–404px",{"mt-20":r,"mt-5":n||a}),children:"claim"})]})}const O=()=>{const t=o.useMemo(()=>[{key:"Price",value:"$0.00003",tip:null},{key:"Total Raised",value:"1.82/2.3 ETH",tip:"1"},{key:"Contributed",value:"0.066 ETH",tip:"1"}],[]);return e.jsxs("div",{className:"imo_participate px-5 pt-9 pb-5",children:[e.jsx("div",{className:"head",children:e.jsx("h3",{className:"flex items-center gap-x-2 font-404px text-green text text-lg uppercase",children:"imo"})}),e.jsxs("div",{className:"content flex flex-col items-center",children:[e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("span",{className:"font-OCR text-sm text-white",children:"Ends in"}),e.jsx(P,{className:"imo_countdown flex gap-x-2 mt-5",format:([s,r,n,a])=>[e.jsxs("div",{children:[e.jsx("time",{children:s}),e.jsx("span",{children:"D"})]},"days"),e.jsxs("div",{children:[e.jsx("time",{children:r}),e.jsx("span",{children:"H"})]},"hours"),e.jsxs("div",{children:[e.jsx("time",{children:n}),e.jsx("span",{children:"H"})]},"minutes"),e.jsxs("div",{children:[e.jsx("time",{children:a}),e.jsx("span",{children:"S"})]},"seconds")],instant:Date.now()+24*60*60*1e3}),e.jsx("p",{className:"mt-3 text-white font-OCR leading-5 text-sm",children:"Fair Distribution Policy"}),e.jsx("p",{className:"text-deep-green text-center font-OCR leading-14 text-xs",children:"Wallet capped at 1% token supply per address."})]}),e.jsx("ul",{className:"mt-6 params_list flex flex-col gap-y-6 w-full",children:t.map(s=>e.jsxs("li",{className:"flex justify-between",children:[e.jsxs("label",{className:"text-white text-xs font-OCR leading-4 flex items-center gap-x-1.5",children:["Price"," ",s.tip&&e.jsx(S,{content:s.tip,children:e.jsx("img",{src:"/public/create/tip.png"})})]}),e.jsx("var",{className:"text-white text-lg font-OCR leading-5",children:s.value})]},s.key))}),e.jsx(M,{className:g("mt-5 uppercase w-full participate_btn h-12 font–404px",{}),children:"participate"})]})]})};O.displayName=O.name;const he=O;function je(){const[t,s]=o.useState("in-queue");return e.jsxs("div",{className:"status w-full flex flex-col",children:[e.jsxs("div",{className:"status_head flex items-center justify-between",children:[e.jsx("span",{children:"Status"}),e.jsxs("div",{className:"status_process flex items-center",children:[e.jsx("span",{children:t?.split("-").join(" ").toUpperCase()}),e.jsx("img",{src:"/create/icon-upcoming.png"})]})]}),e.jsxs("div",{className:"status_memo_score",children:[e.jsx("img",{className:"bot",src:"/create/icon-bot.png"}),e.jsxs("div",{className:"status_process_detail flex flex-col items-start",children:[e.jsxs("h3",{className:"flex items-center gap-x-1",children:["memo score"," ",e.jsx(S,{children:e.jsx("img",{className:"mb-1",src:"/create/tip.png"})})]}),e.jsxs("div",{className:"flex items-end mt-3 mb-4",children:[e.jsx("span",{className:"numerator",children:"70"}),e.jsx("span",{className:"denominator",children:"/100"})]}),e.jsx(re,{className:"status_memo_score_bar",showInfo:!1,percent:70})]})]}),e.jsxs("p",{className:"mt-3 consider",children:["Might consider",`
`,"adding it to my wishlist."]}),e.jsxs("div",{className:"mt-4 intend flex justify-between",children:[e.jsxs("p",{children:["MeMoo Score is an indicative metric.",`
`,"Users are advised to DYOR."]}),e.jsx("img",{className:"outlink",src:"/create/icon-outlink.png"})]})]})}const B=o.createContext({stage:"in-queue"});function Oe(){const[t,s]=o.useState("launch"),r=o.useMemo(()=>({stage:t}),[t]);return e.jsxs("div",{className:"airdrop",children:[e.jsx("div",{className:"airdrop_left flex flex-col gap-y-3.5",children:e.jsxs(B.Provider,{value:r,children:[e.jsx(je,{}),t==="imo"&&e.jsx(he,{}),e.jsx(ge,{})]})}),e.jsx("div",{className:"airdrop_right flex flex-col",children:"22"})]})}export{B as AirdropContext,Oe as default};
