import{j as o}from"./rainbowkit-Bj2Ip1yQ.js";import{c as S}from"./index-BYyKIRMV.js";import{r as i}from"./react-wd_tNA35.js";const N="/static/png/profile-banner-bg-BAV99unl.png",f=({instant:e,onEnded:s,format:c,className:g,timefragments:u="timefragments",symbol:x=":"})=>{const[h,d]=i.useState(0),m=i.useMemo(()=>{if(!e)return[];const r=Date.now(),t=e-r;if(t<=0)return s?.(!0),[0,0,0,0];const a=Math.floor(t/(1e3*60*60*24)),n=Math.floor(t%(1e3*60*60*24)/(1e3*60*60)),l=Math.floor(t%(1e3*60*60)/(1e3*60)),p=Math.floor(t%(1e3*60)/1e3);return c?c([a,n,l,p]):[`${String(a).padStart(2,"0")}`,`${String(n).padStart(2,"0")}`,`${String(l).padStart(2,"0")}`,`${String(p).padStart(2,"0")}`]},[e,h,s]);return i.useEffect(()=>{const r=Date.now();if(e-r>0){s?.(!1);const a=setInterval(()=>{d(n=>n+1)},1e3);return()=>{clearInterval(a)}}},[e,s]),o.jsx("div",{className:S("countdown",g),children:m.map((r,t)=>o.jsxs(i.Fragment,{children:[o.jsx("span",{className:`${u} text-lg text-white font-404px`,children:r}),t<m.length-1&&o.jsx("span",{className:"splitor text-lg text-white font-404px",children:x})]},t))})};f.displayName=f.name;export{f as C,N as P};
