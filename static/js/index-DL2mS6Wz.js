import{j as e}from"./rainbowkit-DMDxvN7g.js";import{T as k,a as b,b as l,I as N,C as T}from"./index-BgQQY4Cn.js";import{r as n}from"./react-Dusg2Zfy.js";import{h as c,p as d}from"./index-BCvUxpAE.js";import{F as v}from"./Table-ChafhKwE.js";import"./index-UpR_hllg.js";import"./button-isTPQN6p.js";import"./index-BuTSY06v.js";import"./index-Cc5Oi6Rk.js";import"./index-Cgy-qjKU.js";import"./index-wfEc1Es3.js";const w=[{title:"Token",dataIndex:"tokenName",key:"tokenName",render:(t,r)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{src:r.icon,alt:"",className:"w-[84px] h-[84px] rounded-full mr-5"}),e.jsx("span",{className:"font-bold text-lg mr-2",children:t}),e.jsx("span",{className:"font-normal text-sm text-[#07E993]",children:r.ticker})]})},{title:"Price",dataIndex:"price",key:"price",sorter:!0,render:t=>e.jsxs("div",{className:"font-semibold text-lg ",children:["$",t]})},{title:"1h",dataIndex:"increase1H",key:"increase1H",sorter:!0,render:t=>e.jsxs("span",{className:`font-semibold text-lg ${t<0?"text-red":"text-green"}`,children:[t>0?"+":"",t*100,"%"]})},{title:"24h",dataIndex:"increase24H",key:"increase24H",sorter:!0,render:t=>e.jsxs("span",{className:`font-semibold text-lg ${t<0?"text-red":"text-green"}`,children:[t>0?"+":"",t*100,"%"]})},{title:"24h Volume",dataIndex:"volume24H",key:"volume24H",sorter:!0,render:t=>e.jsxs("div",{className:"font-semibold text-lg ",children:["$",t]})},{title:"Market Cap",dataIndex:"marketCap",key:"marketCap",render:t=>e.jsxs("div",{className:"font-semibold text-lg ",children:["$",t]})}],S=t=>c.get(`${d}/web-unauthorized/trending-tokens`,{params:t}),y=t=>c.get(`${d}/web-unauthorized/top-tokens`,{params:t}),G=()=>{const[t,r]=n.useState("trending"),[m,x]=n.useState([]),[g,C]=n.useState(!1),[s,i]=n.useState({current:1,pageSize:10,total:30}),[p,h]=n.useState([]),u=async()=>{let a={pageNumber:s.current??1,pageSize:s.pageSize??10};const{data:o}=t==="trending"?await S(a):await y(a);o&&(x(o.records),i({...s,total:o.total_record}))};n.useEffect(()=>{u()},[s.current,p,t]);const f=(a,o,j)=>{i(a),h(j)};return e.jsxs("div",{className:"page pb-[70px]",children:[e.jsx("div",{className:"header-banner-bg",children:e.jsxs("div",{className:"header-banner-content",children:[e.jsxs("div",{className:"header-banner-left flex  flex-col",children:[e.jsx("img",{className:"mb-[49px] w-[680px] h-[144px]",src:"./gecko/img-left-desc.png",alt:""}),e.jsx("img",{className:"w-[304px] h-[80px]",src:"./gecko/img-left-gecko.png",alt:""})]}),e.jsx("div",{children:e.jsx("img",{className:"w-[420px] h-[355px]",src:"./gecko/img-right-gecko.png",alt:""})})]})}),e.jsxs("div",{className:"flex items-center justify-between my-[70px]",children:[e.jsx("p",{className:"font-404px text-green font-normal text-[38px]",children:"Token Ranking"}),e.jsx(k,{value:t,onValueChange:a=>r(a),children:e.jsxs(b,{children:[e.jsx(l,{value:"trending",children:"Trending"}),e.jsx(l,{value:"top",children:"Top"})]})})]}),e.jsx(v,{className:"common-table mb-10",columns:w,dataSource:m,pagination:!1,loading:g,onChange:f}),e.jsx(N,{currentPage:s.current??0,total:s.total??0,onChangePageNumber:a=>{i({...s,current:a})}}),e.jsx(T,{title:"Discover the Next Big Thing on MeMoo LaunchPad.",desc:"Get in on the Action with the Hottest Meme Project Picks.",link:"/",linkText:"launchpad"})]})};export{G as default};
