import{j as e}from"./rainbowkit-DehMzq6P.js";import{T as N,a as v,b as c,I as T,C as w}from"./index-CqqVWE4a.js";import{u as S,r}from"./react-Dusg2Zfy.js";import{f as l}from"./button-CJjuNPWa.js";import{h as d,p as m}from"./index-DCKrgIM1.js";import{F as C}from"./Table-BvNhlHzo.js";import"./index-DD5yRryd.js";import"./index-CxD1d7ty.js";import"./index-BYoETR51.js";import"./index-CyCYjTZL.js";import"./index-ad0g3xMY.js";import"./index-cNo2zPcz.js";const y=[{title:"Token",dataIndex:"tokenName",key:"tokenName",render:(t,n)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{src:n.icon,alt:"",className:"w-[84px] h-[84px] rounded-full mr-5"}),e.jsx("span",{className:"font-bold text-lg mr-2",children:t}),e.jsx("span",{className:"font-normal text-sm text-[#07E993]",children:n.ticker})]})},{title:"Price",dataIndex:"price",key:"price",sorter:!0,render:t=>e.jsxs("div",{className:"font-semibold text-lg ",children:["$",l(t)]})},{title:"1h",dataIndex:"increase1H",key:"increase1H",sorter:!0,render:t=>e.jsx("span",{className:`font-semibold text-lg ${t<0?"text-red":"text-green"}`,children:t})},{title:"24h",dataIndex:"increase24H",key:"increase24H",sorter:!0,render:t=>e.jsx("span",{className:`font-semibold text-lg ${t<0?"text-red":"text-green"}`,children:t})},{title:"24h Volume",dataIndex:"volume24H",key:"volume24H",sorter:!0,render:t=>e.jsxs("div",{className:"font-semibold text-lg ",children:["$",t]})},{title:"Market Cap",dataIndex:"marketCap",key:"marketCap",render:t=>e.jsxs("div",{className:"font-semibold text-lg ",children:["$",l(t)]})}],$=t=>d.get(`${m}/web-unauthorized/trending-tokens`,{params:t}),I=t=>d.get(`${m}/web-unauthorized/top-tokens`,{params:t}),P="/static/png/header-banner-bg-DSgC4JYw.png",Y=()=>{const t=S(),[n,x]=r.useState("trending"),[g,p]=r.useState([]),[h,z]=r.useState(!1),[s,i]=r.useState({current:1,pageSize:10,total:30}),[u,f]=r.useState([]),k=async()=>{let a={pageNumber:s.current??1,pageSize:s.pageSize??10};const{data:o}=n==="trending"?await $(a):await I(a);o&&(p(o.records??[]),i({...s,total:o.total_record??0}))};r.useEffect(()=>{k()},[s.current,u,n]);const b=(a,o,j)=>{i(a),f(j)};return e.jsxs("div",{className:"page",children:[e.jsx("div",{className:"gecko-header-banner-bg",style:{background:`url(${P}) no-repeat`,backgroundSize:"cover"},children:e.jsxs("div",{className:"header-banner-content",children:[e.jsxs("div",{className:"header-banner-left flex  flex-col",children:[e.jsx("img",{className:"mb-[49px] w-[680px] h-[144px]",src:"./gecko/img-left-desc.png",alt:""}),e.jsx("img",{className:"w-[304px] h-[80px]",src:"./gecko/img-left-gecko.png",alt:""})]}),e.jsx("div",{children:e.jsx("img",{className:"w-[420px] h-[355px]",src:"./gecko/img-right-gecko.png",alt:""})})]})}),e.jsxs("div",{className:"flex items-center justify-between my-[70px]",children:[e.jsx("p",{className:"font-404px text-green font-normal text-[38px]",children:"Token Ranking"}),e.jsx(N,{value:n,onValueChange:a=>x(a),children:e.jsxs(v,{children:[e.jsx(c,{value:"trending",children:"Trending"}),e.jsx(c,{value:"top",children:"Top"})]})})]}),e.jsx(C,{className:"common-table mb-10",columns:y,dataSource:g,pagination:!1,loading:h,onChange:b,onRow:a=>({onClick:o=>{t(`/airdrop/${a.ticker}`)}})}),e.jsx(T,{currentPage:s.current??0,total:s.total??0,onChangePageNumber:a=>{i({...s,current:a})}}),e.jsx(w,{title:"Discover the Next Big Thing on MeMoo LaunchPad.",desc:"Get in on the Action with the Hottest Meme Project Picks.",link:"/",linkText:"launchpad"})]})};export{Y as default};
