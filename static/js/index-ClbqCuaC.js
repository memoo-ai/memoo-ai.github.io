import{j as e}from"./rainbowkit-B6LI3oRE.js";import{M as S,C as w}from"./index-avbdthc-.js";import{T as M,a as I,b as x}from"./tabs-Crxo3j04.js";import{d as C,r as a}from"./react-BsXufuJW.js";import{I as E}from"./index-BgiOXRyG.js";import{f as m}from"./button-DDUFQLdi.js";import{h,p as f}from"./index-Od2dpICF.js";import{S as p,B,L as P,M as F,a as O,I as D,F as H,E as L}from"./memoogecko-Dmpyra1j.js";import{d as $}from"./index-B__JBvhA.js";import"./index-x_pRhTFa.js";import"./index-DjVH9DRt.js";import"./index-YHh1o6lU.js";import"./progress-OA-XCKqz.js";import"./common-CQWe0QzQ.js";const R=[{title:"#",dataIndex:"index",key:"index",width:20,render:(t,i,o)=>e.jsx("div",{className:"flex items-center text-[#fff]",children:o+1})},{title:"Token",dataIndex:"tokenName",key:"tokenName",render:(t,i)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{src:i.icon,alt:"",className:"w-[84px] h-[84px] rounded-full mr-5"}),e.jsx("span",{className:"font-bold text-lg mr-2",children:t}),e.jsx("span",{className:"font-normal text-sm text-[#07E993]",children:i.ticker})]})},{title:"Price",dataIndex:"price",key:"price",sorter:!1,render:t=>e.jsxs("div",{className:"font-semibold text-lg ",children:["SOL ",m(t)]})},{title:"1h",dataIndex:"increase1H",key:"increase1H",sorter:!1,render:t=>e.jsx("span",{className:`font-semibold text-lg ${t<0?"text-red":"text-green"}`,children:t})},{title:"6h",dataIndex:"increase24H",key:"increase24H",sorter:!1,render:t=>e.jsx("span",{className:`font-semibold text-lg ${t<0?"text-red":"text-green"}`,children:t})},{title:"24h Volume",dataIndex:"volume24H",key:"volume24H",sorter:!1,render:t=>e.jsxs("div",{className:"font-semibold text-lg ",children:["$",t]})},{title:"Market Cap",dataIndex:"marketCap",key:"marketCap",render:t=>e.jsxs("div",{className:"font-semibold text-lg ",children:["$",m(t)]})},{title:"Memoo Score",dataIndex:"meMooScore",key:"meMooScore",sorter:!1,render:t=>e.jsxs("div",{className:"flex flex-col justify-end items-end",children:[e.jsx("span",{children:t??0}),e.jsx(E,{percent:t})]})}],V=[{key:"price",label:"price"},{key:"1h",label:"1h"},{key:"24h",label:"24h"},{key:"24hVolume",label:"24H Volume"},{key:"marketCap",label:"MarketCap"}],z=t=>h.get(`${f}/web-unauthorized/trending-tokens`,{params:t}),A=t=>h.get(`${f}/web-unauthorized/top-tokens`,{params:t}),re=()=>{const t=C(),[i,o]=a.useState(""),[d,g]=a.useState("desc"),[l,j]=a.useState("trending"),[u,k]=a.useState([]),[N,G]=a.useState(!1),[n,c]=a.useState({current:1,pageSize:10,total:30}),[K,b]=a.useState([]),v=async()=>{let s={pageNumber:n.current??1,pageSize:n.pageSize??10,sortField:i,sortDirection:d};const{data:r}=l==="trending"?await z(s):await A(s);r&&(k(r.records??[]),c({...n,total:r.total_record??0}))};a.useEffect(()=>{v()},[n.current,i,l,d]);const y=(s,r,T)=>{c(s),b(T)};return e.jsxs("div",{className:"page",children:[e.jsx(p,{direction:"left"}),e.jsxs("div",{className:"flex justify-between mt-[21px]",children:[e.jsx("div",{className:"w-[835px] h-[469px]",children:e.jsx(B,{background:P,title:"MEMOOGECKO",children:e.jsxs("div",{className:" flex items-start flex-col",children:[e.jsx("img",{className:"w-[309px] h-[292px]",src:F,alt:""}),e.jsxs("div",{className:"ml-[52px]",children:[e.jsx("h3",{className:"font-Kitty mt-[13px] banner-title text-[40px]",children:"Memoogecko. "}),e.jsx("h3",{className:"font-Kitty mt-[13px] banner-title text-[40px]",children:"Your Ultimate Meme Archive."}),e.jsx("p",{className:"font-OCR text-[20px] text-[#FFFFFF]",children:"Meme Mania Unleashed. Join the Madness!"})]})]})})}),e.jsx("div",{className:"w-[406px] h-[470px]",children:e.jsx(O,{title:"POWERED ON",children:e.jsxs("div",{className:"flex flex-col items-center w-[338px]",children:[e.jsxs("div",{className:"flex justify-center items-center w-[100%] mb-[11px]",children:[e.jsx($,{className:"mr-[7px]"}),e.jsx("span",{className:"font-404px text-[16px] text-green",children:"LIVE DEGEN ACTIVITY"})]}),e.jsx(p,{})]})})})]}),e.jsxs("div",{className:"flex items-center justify-between my-[70px]",children:[e.jsx("p",{className:"font-404px text-green font-normal text-[38px]",children:"Token Ranking"}),e.jsx(M,{value:l,onValueChange:s=>j(s),children:e.jsxs(I,{children:[e.jsx(x,{value:"trending",children:"Trending"}),e.jsx(x,{value:"top",children:"Top"})]})})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("div",{}),e.jsx(D,{options:V,onSelectChange:(s,r)=>{o(s),g(r)}})]}),e.jsx(H,{className:"common-table mb-10",columns:R,dataSource:u,pagination:!1,loading:N,onChange:y,onRow:s=>({onClick:r=>{t(`/airdrop/${s.ticker}`)}}),locale:{emptyText:e.jsx(L,{showBorder:!1})}}),e.jsx(S,{currentPage:n.current??0,total:n.total??0,onChangePageNumber:s=>{c({...n,current:s})}}),e.jsx(w,{title:"Discover the Next Big Thing on MeMoo LaunchPad.",desc:"Get in on the Action with the Hottest Meme Project Picks.",link:"/",linkText:"launchpad"})]})};export{re as default};
