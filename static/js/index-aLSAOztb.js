import{j as e}from"./rainbowkit-BcTAhX6n.js";import{T as N,a as b,b as j,I as v,C as y}from"./index-BkF5PQb_.js";import{r as a}from"./react-C2rEAUWD.js";import{B as g}from"./button-DfoouaiR.js";import{g as S}from"./index-JdwNkxeA.js";import{c as T,d as k}from"./index-B8vWYRGz.js";import{F as C}from"./Table-pp1ooiZ-.js";import"./index-DquHUFai.js";import"./index-D9EjzMJp.js";import"./index-Dn7b6sWu.js";import"./index-DcpIboP0.js";import"./index-BqCa3ItR.js";var u=(s=>(s.active="active",s.upcoming="upcoming",s.completed="completed",s))(u||{});const I=[{title:"Token",dataIndex:"name",key:"name",render:(s,n)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{src:"",alt:"",className:"w-[84px] h-[84px] rounded-full mr-5"}),e.jsx("span",{className:"font-404px font-bold text-lg mr-2",children:s}),e.jsx("span",{className:"font-404px font-normal text-sm ",children:n.symbol})]})},{title:"IDO Date",dataIndex:"date",key:"date",sorter:!0,render:s=>e.jsx("div",{className:"font-404px font-semibold text-lg ",children:s})},{title:"Total Raissed",dataIndex:"totalRaised",key:"totalRaised",sorter:!0,render:s=>e.jsxs("span",{className:"font-404px font-semibold text-lg",children:[s,"E"]})},{title:"Action",key:"action",render:()=>e.jsx(g,{variant:"default",className:"w-[136px] h-[50px] uppercase font-404px font-bold text-lg",children:"airdrop"})}];function R({type:s="light",title:n,step:t,children:o}){const[r,m]=a.useState(0),l=a.useRef(0),c=a.useRef(0);a.useEffect(()=>{o&&(c.current=document.querySelector(".swipe-card")?.clientWidth||0,l.current=document.querySelector(".swipe-container")?.clientWidth||0)},[o]);const x=()=>{d||m(r-t)},p=a.useMemo(()=>r===0,[r]),d=a.useMemo(()=>c.current-r>l.current,[r]),h=()=>{r!==0&&m(r+t)},i=a.useMemo(()=>s==="dark"?T:k,[s]);return e.jsxs("div",{className:S("swipe-card",s==="light"?"swipe-card-light":"swipe-card-dark"),children:[e.jsxs("div",{className:"swipe-header w-full flex items-center justify-between",children:[e.jsx("p",{className:"title",children:n}),e.jsxs("div",{className:"swipe-icons flex items-center",children:[e.jsx(i,{className:`w-10 h-10 curose-pointer mr-3  ${d?"cursor-not-allowed":"cursor-pointer"} `,onClick:x}),e.jsx(i,{className:`w-10 h-10 rotate-180 ${p?"cursor-not-allowed":"cursor-pointer"} `,onClick:h})]})]}),e.jsx("div",{className:"swipe-content",children:e.jsx("div",{className:"swipe-container",style:{transform:`translateX(${r}px)`,transition:"transform 0.3s ease-in-out"},children:o})})]})}const A=()=>{const[s,n]=a.useState([]);return a.useEffect(()=>{const t=new Array(10).fill(void 0).map(o=>({id:"dogwifhat",name:"DogWifHat",symbol:"WIF",logo:"",date:"04 Sep 2024",totalRaised:2.3,target:3,status:u.active,roi:20.2}));n(t)},[]),e.jsx(R,{title:"Active IDO",step:360,children:e.jsx("div",{className:"flex items-center overflow-hidden",children:s.map(t=>e.jsxs("div",{className:"flex flex-col w-[390px] bg-[#131522]  px-11 py-6 mr-8 rounded-lg",children:[e.jsx("img",{src:"",alt:"",className:"w-20 h-20 mb-2 rounded-full"}),e.jsx("p",{className:"font-OCR text-white text-lg mb-[64px]",children:t.name}),e.jsxs("div",{className:"ido-info-item",children:[e.jsx("img",{src:"./dashboard/icon-roi.svg",alt:"",className:"w-5 h-5 mr-1"}),e.jsx("span",{children:"Ticker"}),e.jsx("span",{children:t.symbol})]}),e.jsxs("div",{className:"ido-info-item",children:[e.jsx("img",{src:"./dashboard/icon-ido-symbol.svg",alt:"",className:"w-5 h-5 mr-1"}),e.jsx("span",{children:"Ticker"}),e.jsx("span",{children:t.symbol})]}),e.jsxs("div",{className:"ido-info-item",children:[e.jsx("img",{src:"./dashboard/icon-raised-target.svg",alt:"",className:"w-5 h-5 mr-1"}),e.jsx("span",{children:"Total Raised"}),e.jsxs("span",{children:[t.symbol,"/",t.target," ETH"]})]}),e.jsx(g,{variant:"secondary",className:"font-404px text-lg  w-full h-[50px] uppercase mt-[74px]",children:"Hunt for airdrops"})]},t.id))})})},D=()=>{const[s,n]=a.useState([]);return a.useEffect(()=>{const t=new Array(20).fill(void 0).map((o,r)=>({id:r,address:"Rg7GG...kf9Lj7",desc:"has participated in WIF airdrop"}));n(t)},[]),e.jsx("div",{className:"flex air-drop",children:s.map(t=>e.jsxs("div",{className:"air-drop-item mr-2 flex overflow items-center px-[10px] py-[5px]",children:[e.jsx("img",{className:"w-10 mr-2",src:"./temp/cow.png",alt:""}),e.jsxs("span",{children:[" ",t.address]})]},t.id))})};function $(){const[s,n]=a.useState("imo"),[t,o]=a.useState([]),[r,m]=a.useState(!1),[l,c]=a.useState({current:1,pageSize:10,total:30}),[x,p]=a.useState([]),d=async()=>{const i=new Array(20).fill(void 0).map((w,f)=>({id:"dogwifhat",name:"DogWifHat",symbol:"WIF",logo:"",date:"04 Sep 2024",totalRaised:2.3,status:u.upcoming,target:2,roi:20.2}));o(i)};a.useEffect(()=>{d()},[l,x]);const h=(i,w,f)=>{c(i),p(f)};return e.jsxs("div",{className:"page pb-[70px]",children:[e.jsx(D,{}),e.jsxs("div",{className:"base-container",children:[e.jsx("div",{className:"header-banner-bg",children:e.jsxs("div",{className:"header-banner-content",children:[e.jsxs("div",{className:"header-banner-left flex  flex-col",children:[e.jsxs("p",{className:"left-text",children:[e.jsx("span",{children:" Memoo Launchpad."})," ",e.jsx("br",{}),e.jsx("span",{children:" Your Ticket to Memo Stardom."})]}),e.jsx("p",{className:"left-sub-text",children:"Get in on the Action with the Hottest Meme Project Picks."})]}),e.jsx("div",{children:e.jsx("img",{className:"w-[363px] h-[392px]",src:"./dashboard/img-banner-right.png",alt:""})})]})}),e.jsx("div",{className:"flex items-center justify-between my-[70px]",children:e.jsx(N,{value:s,onValueChange:i=>n(i),children:e.jsxs(b,{children:[e.jsx(j,{value:"imo",className:"text-[38px]",children:"Imo"}),e.jsx(j,{value:"airdrop",className:"text-[38px]",children:"Airdrop"})]})})}),e.jsx(C,{columns:I,dataSource:t,pagination:!1,loading:r,onChange:h,className:"mb-[58px]"}),e.jsx(v,{currentPage:l.current??0,total:l.total??0,onChangePageNumber:i=>{c({...l,current:i})}}),e.jsx(A,{}),e.jsx(y,{title:"Supercharge Your Meme Creation.",desc:"Create Your Very Own Meme Token Now.",link:"/",linkText:"BE A CREATOR"})]})]})}export{$ as default};
