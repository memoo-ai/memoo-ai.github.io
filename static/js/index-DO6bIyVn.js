import{j as e}from"./rainbowkit-B-LFFTlx.js";import{T as E,a as D,b,I as M,C as L}from"./index-D9nHcZvn.js";import{r as a,u as N,f as P}from"./react-DYnGVO3U.js";import{b as y,B as k,g as j}from"./button-BcIjlBfk.js";import{c as G}from"./index-Dq4ulJdJ.js";import{d as C,e as Q}from"./index-CPIdDh4J.js";import{h as w,p as v}from"./index-D7wyKSDE.js";import{F as R}from"./Table-DHbElrIM.js";import"./index-BSNjVbmI.js";import"./index-CeGUkixi.js";import"./index-aCSMkeoQ.js";import"./index-WZo9pz0H.js";import"./index-DfG3Zkfc.js";const z=s=>[{title:"Token",dataIndex:"tokenName",key:"tokenName",width:"387px",render:(t,c)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{src:c.icon,alt:"",className:"w-[84px] h-[84px] rounded-full mr-5"}),e.jsx("span",{className:"font-OCR font-normal text-lg mr-2 text-[#ffffff]",children:t}),e.jsx("span",{className:"font-OCR font-normal text-[12px] text-[#07E993] mt-2",children:c.ticker})]})},{title:"Ends In",dataIndex:"endsIn",key:"endsIn",sorter:!0,render:t=>e.jsx("div",{className:"font-OCR font-normal text-lg ",children:t?y(t??0):""})},{title:"Total Raissed",dataIndex:"totalRaised",key:"totalRaised",sorter:!0,render:t=>e.jsxs("span",{className:"font-OCR font-norma text-lg",children:[t,"E"]})},{title:"Action",key:"action",width:"150px",render:t=>e.jsx(k,{variant:"secondary",className:" h-[50px] uppercase font-404px font-bold text-lg px-2",onClick:()=>s(`/airdrop/${t.ticker}`),children:"PARTICIPATE"})}],J=s=>[{title:"Token",dataIndex:"tokenName",key:"tokenName",render:(t,c)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{src:c.icon,alt:"",className:"w-[84px] h-[84px] rounded-full mr-5"}),e.jsx("span",{className:"font-OCR font-bold text-lg mr-2",children:t}),e.jsx("span",{className:"font-OCR font-normal text-[12px] text-[#07E993] mt-2",children:c.ticker})]})},{title:"IDO Date",dataIndex:"idoDate",key:"idoDate",sorter:!0,render:t=>e.jsx("div",{className:"font-OCR font-normal text-lg ",children:t?y(t??0):""})},{title:"Participants",dataIndex:"participants",key:"participants",sorter:!0,render:t=>e.jsxs("span",{className:"font-OCR font-normal text-lg",children:[t,"E"]})},{title:"Action",key:"action",width:"150px",render:t=>e.jsx(k,{variant:"default",className:"w-[136px] h-[50px] uppercase font-404px font-bold text-lg",onClick:()=>s(`/airdrop/${t.ticker}`),children:"airdrop"})}];function U({type:s="light",title:t,step:c,children:n}){const[i,p]=a.useState(0),x=a.useRef(0),f=a.useRef(0);a.useEffect(()=>{n&&(f.current=document.querySelector(".swipe-card")?.clientWidth||0,x.current=document.querySelector(".swipe-container")?.clientWidth||0)},[n]);const l=()=>{m||p(i-c)},o=a.useMemo(()=>i===0,[i]),m=a.useMemo(()=>f.current-i>x.current,[i]),u=()=>{i!==0&&p(i+c)},h=a.useMemo(()=>s==="dark"?C:C,[s]);return e.jsxs("div",{className:G("swipe-card",s==="light"?"swipe-card-light":"swipe-card-dark"),children:[e.jsxs("div",{className:"swipe-header w-full flex items-center justify-between",children:[e.jsx("p",{className:"title font-404px",children:t}),e.jsxs("div",{className:"swipe-icons flex items-center",children:[e.jsx(h,{className:`w-10 h-10 curose-pointer mr-3  ${m?"cursor-not-allowed":"cursor-pointer"} `,onClick:l}),e.jsx(h,{className:`w-10 h-10 rotate-180 ${o?"cursor-not-allowed":"cursor-pointer"} `,onClick:u})]})]}),e.jsx("div",{className:"swipe-content",children:e.jsx("div",{className:"swipe-container",style:{transform:`translateX(${i}px)`,transition:"transform 0.3s ease-in-out"},children:n})})]})}const Y=s=>w.get(`${v}/web-unauthorized/imo`,{params:s}),X=s=>w.get(`${v}/web-unauthorized/airdrop`,{params:s}),q=s=>w.get(`${v}/web-unauthorized/ido-completed`,{params:s}),V=()=>{const[s,t]=a.useState([]),c=N();return a.useEffect(()=>{(async()=>{try{const{data:n}=await q({pageNumber:1,pageSize:10});t(n.records??[])}catch(n){console.error("Error fetching data:",n)}})()},[]),e.jsx(U,{title:"COMPLETED IMO",step:360,children:e.jsx("div",{className:"flex items-center overflow-hidden",children:s.map(n=>e.jsxs("div",{className:"flex flex-col w-[390px] bg-[#131522]  px-11 py-6 mr-8 rounded-lg",children:[e.jsx("img",{src:n.icon,alt:"",className:"w-20 h-20 mb-2 rounded-full"}),e.jsx("p",{className:"font-OCR text-white text-lg mb-[64px]",children:n.tokenName}),e.jsxs("div",{className:"ido-info-item",children:[e.jsx("img",{src:"./dashboard/icon-roi.svg",alt:"",className:"w-5 h-5 mr-1"}),e.jsx("span",{children:"ATH ROI"}),e.jsx("span",{children:n.athRoi})]}),e.jsxs("div",{className:"ido-info-item",children:[e.jsx("img",{src:"./dashboard/icon-ido-symbol.svg",alt:"",className:"w-5 h-5 mr-1"}),e.jsx("span",{children:"Ticker"}),e.jsx("span",{children:n.ticker})]}),e.jsxs("div",{className:"ido-info-item",children:[e.jsx("img",{src:"./dashboard/icon-raised-target.svg",alt:"",className:"w-5 h-5 mr-1"}),e.jsx("span",{className:"whitespace-nowrap",children:"Total Raised"}),e.jsxs("span",{className:"overflow-hidden whitespace-nowrap text-ellipsis",children:[n.totalRaised," ETH"]})]}),e.jsx(k,{variant:"second",className:"font-404px text-lg  w-full h-[50px] uppercase mt-[74px]",onClick:()=>{c(`/airdrop/${n.ticker}`)},children:"Buy"})]},n.ticker))})})},H=()=>{const[s,t]=a.useState([]),c=a.useRef(null),n=a.useRef(!1),i=a.useRef(null),p=N();a.useEffect(()=>(f(),l(),()=>{clearInterval(i.current)}),[]);const x=()=>{const o=["BTC","ETH","XRP","LTC","ADA"];return o[Math.floor(Math.random()*o.length)]},f=a.useCallback(async()=>{try{if(n.current)return;const o=new Array(15).fill(void 0).map((m,u)=>({id:u,address:"Rg7GG...kf9Lj7"+u,tokenName:x(),ticker:"Tick"}));t(o)}catch(o){console.error("Error fetching data:",o)}},[]),l=()=>{i.current=setInterval(()=>{f()},5e3)};return e.jsx("div",{className:"carousel-container",children:e.jsx("div",{className:"carousel-track",ref:c,onMouseMove:()=>n.current=!0,onMouseLeave:()=>n.current=!1,children:s.map((o,m)=>e.jsxs("div",{className:"carousel-item mr-2 flex overflow items-center justify-between px-[10px] py-[5px]  cursor-pointer",onClick:()=>p(`/airdrop/${o.ticker}`),children:[e.jsxs("span",{className:" font-404px text-[12px] mr-[10px]",children:[" ",e.jsxs("span",{className:"mr-[10px]",style:{color:j()},children:[o.address," "]})," ","created"," ",e.jsx("span",{className:"mx-[10px]",style:{color:j()},children:o.tokenName})]}),e.jsx("img",{className:"w-10 mr-2",src:"./temp/cow.png",alt:""})]},m))})})},K=H,W="/static/png/powered-bg-BVCcQmp5.png",F="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAAAOCAYAAABNaxCaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARPSURBVHgB7VhPbxtFFH8zszaxk6jmBqeu+ADU+QBVHE5IIOqIG39aB65IhDuKXcSJCtQcQEIg4koc4JTkC5DkxomQI6e6J44xUtQg784Mv7c7ay2Ld8dJUVRVfcnb2Zl9897sb96899aCHG38/OsPakn35FJMYCEXNcl6TBRoq5QWFMRWBlqASWCMBP4Frd1r3D6i53QhCvjy4Te/bdG56RncW1ysBaIGkC4LK0mSsYQrCcNIk0iuqq4/udd4vxRwa+0NNG2P/ZEQ4sjJt9Dc8sgfQv5RQf9UR8VafLrH4N9zuovyU7vueYhmledhfH9OG1M9wUdbf/Sjs6gfmyhF1QJ3ODEZ6OH+Mln1AqErALwQeGaFEXe/ar2zTeUvGfJLkJ+G4AywHXDXNwG6Ow5klh0UdJTRMTj0yIygewW6eQN2wZ3cM36XlVz/urM7Au+7sQOaw8nYRhD8rU6MNB8IjEyAOgnJL0YafS001YOADJBWCwrOz9DXTrdfemvfo/zj3GKrwD/ki/OSDPBhiWzbcY/8IE8JutkjQ0q9ea9ErOtk2tmacutL7LKeshPlnCwDfOix4TsNlyMsYsem1J9TPnTytkKm70R2ZvUr5q06uYcVMg+dTMf1D1z/Ts7ObpnOOdc/1Rl8+u6fB7oRX4+QOKPFCBxT1JiQXoyFaGprG5oTK6klQ3IZIahpxkJF61+/8sYj8lPoPG0WjfJx8ikmDqOb4C6fSBd+nogCFCMb4rx2jOR5jWyyI7jUONpwLk12ziJ3xoQqBkLKxAC+trd5vLt2f2W9bAFZSOk5nkmwNcBL3KWroVbFyWuVTWKQMe+Q0vDAYbNyvRU2wuwmGPz08uiz90474pwOAHGLOKwbwemSYv7TaTXD4dxgHPekbNy2jcVfAPxrJcA/oDTGdaicQvAACrfpaoiBHdDl6D6loLPH+5xk4HmeloxbP754AuDXzGPbtRLVokxKFLQoGIVyfSRY1I1SIbEq7IwiOm82OIv/B3R3BDeqDOfi3zW6GvIl0ipvP8Jy+fS2K8JlRkOfjSAbYeDRnNCzS1xTz3QEl0Bbnvm8YXx6B1ThzRU2QnInfwr652+f3kFMX9USBbrUpGtaTJYiGzddgm1GSK6aDFrCGOFeLcTb375+82SGgT7Nf5T/Ksy1Hvlxoe1hSq9ENqT/j7KE2qF/l5UXpgT0L26d3TZGD03y6YMEijhiYytqj4M0t6ZB3iahR0juWZLmwffdm096MgZZNcBJlfwbNaI0vjJx3mAQQroCcgl1kLPPtEeXIPHlm2c3ELiPGVCNOI4PInz742M0uQfX4fGNyCalZMLw+Kbe/27z1fUype5jx3dcx8XyyzcP8qMZtkKffCYza35Bx9iBm61j1hrDov45bUx1BqQkvI2OUBVS4taJgE5+b1ESY5GiOiuTiQQ/HC9MJpVJ0i30wvXsZeaVveRFZIrPq9ZRpmsOG1Od/wAVcJNleS6hugAAAABJRU5ErkJggg==",Z="/static/png/alert 1-ogiZgdMB.png",$=({children:s,background:t=W,title:c,icon:n=F,infoIcon:i=Z})=>e.jsxs("div",{className:"banner-right-box",style:{background:`url(${t}) no-repeat`,backgroundSize:"cover"},children:[e.jsxs("div",{className:"banner-right-box-top flex flex-col items-center",children:[e.jsx("h5",{className:"font-404px text-[#07E993] text-[12px]",children:c}),e.jsx("img",{src:n,alt:""})]}),e.jsx("img",{className:"info-icon",src:i,alt:""}),e.jsx("div",{className:"banner-right-box-slot",children:s})]}),_=$,ee=({children:s,background:t,title:c})=>e.jsxs("div",{className:"banner-box",style:{background:`url(${t}) no-repeat`,backgroundSize:"cover"},children:[e.jsx("h5",{className:"banner-box-title font-404px text-[#07E993] text-[16px]",children:c}),s]}),te=ee,se="/static/png/gecko-banner-bg-Cu9-ukgI.png",ae="/static/png/memoogecko-CZ0yWp6D.png",ne="/static/png/airdrops-DxRSV72h.png",re="/static/png/create-token-DYpxRUDo.png",ce="/static/png/launchpad-TvIcq0KT.png";function ke(){const[s,t]=a.useState("imo"),[c,n]=a.useState([]);a.useState(0);const[i,p]=a.useState(1),[x,f]=a.useState(!1),[l,o]=a.useState({current:1,pageSize:10,total:30}),[m,u]=a.useState([]),h=P(),g=N();a.useEffect(()=>{const d=new URLSearchParams(h.search).get("type");d&&t(d)},[h.search]);const T=async()=>{let r={pageNumber:l.current??1,pageSize:l.pageSize??10};const{data:d}=s==="imo"?await Y(r):await X(r);d&&(n(d.records??[]),o({...l,total:d.total_record??0}))};a.useEffect(()=>{T()},[l.current,m,s]);const A=(r,d,B)=>{u(B)},I=[{icon:ae,text:"Memoogecko"},{icon:ne,text:"Airdrops"},{icon:re,text:"Create Tokens"},{icon:ce,text:"Launchpad"}],O=()=>{const r=["BTC","ETH","XRP","LTC","ADA"];return r[Math.floor(Math.random()*r.length)]},S=new Array(5).fill(void 0).map((r,d)=>({id:d,address:"Rg7GG...kf9Lj7"+d,tokenName:O(),ticker:"Tick"}));return e.jsx("div",{className:"page",children:e.jsxs("div",{className:"base-container",children:[e.jsx(K,{}),e.jsxs("div",{className:"flex justify-between mt-[21px]",children:[e.jsx("div",{className:"w-[835px] h-[469px]",children:e.jsx(te,{background:se,title:"MEMOOGECKO",children:e.jsxs("div",{className:"pt-[60px] flex items-center flex-col",children:[e.jsx("img",{className:"w-[159px] h-[159px]",src:"/logo.svg",alt:""}),e.jsx("h3",{className:"font-Kitty mt-[13px] banner-title text-[40px]",children:"Welcome to Memoo."}),e.jsx("h3",{className:"font-Kitty mt-[13px] banner-title text-[40px]",children:"Trade, Hunt, Create, Launch."}),e.jsx("div",{className:"flex items-center justify-center gap-[41px]",children:I.map(r=>e.jsxs("div",{className:"flex flex-col font-404px items-center justify-center",children:[e.jsx("img",{className:"w-[106px] h-[100px]",src:r.icon,alt:""}),e.jsx("p",{className:"text-[16px] text-[#fff] font-OCR",children:r.text})]},r.text))})]})})}),e.jsx("div",{className:"w-[406px] h-[470px]",children:e.jsx(_,{title:"POWERED ON",children:e.jsxs("div",{className:"flex flex-col items-center w-[338px]",children:[e.jsxs("div",{className:"flex justify-center items-center w-[100%] mb-[11px]",children:[e.jsx(Q,{className:"mr-[7px]"}),e.jsx("span",{className:"font-404px text-[16px] text-green",children:"LIVE DEGEN ACTIVITY"})]}),S.map(r=>e.jsxs("div",{className:"w-[100%] bg-[#2B526E] rounded-sm mb-[2px] px-[9px] py-[6px] flex items-center  cursor-pointer",onClick:()=>g(`/airdrop/${r.ticker}`),children:[e.jsx("img",{className:"w-[30px]",src:"./temp/1.png",alt:""})," ",e.jsx("span",{className:"font-404px ml-[5px] text-[#fff] text-[12px]",style:{color:j()},children:r.address})]},r.id))]})})})]}),e.jsx("div",{className:"flex items-center justify-between my-[70px]",children:e.jsx(E,{value:s,onValueChange:r=>{t(r),p(1)},children:e.jsxs(D,{children:[e.jsx(b,{value:"imo",className:"text-[38px]",children:"Imo"}),e.jsx(b,{value:"airdrop",className:"text-[38px]",children:"Airdrop"})]})})}),s==="imo"?e.jsx(R,{columns:z(g),dataSource:c,pagination:!1,loading:x,onChange:A,className:"mb-[58px]"}):e.jsx(R,{columns:J(g),dataSource:c,pagination:!1,loading:x,onChange:A,className:"mb-[58px]"}),e.jsx(M,{currentPage:l.current??0,total:l.total??0,pageSize:l.pageSize,onChangePageNumber:r=>{o({...l,current:r})}}),e.jsx(V,{}),e.jsx(L,{title:"Supercharge Your Meme Creation.",desc:"Create Your Very Own Meme Token Now.",link:"/create_token",linkText:"BE A CREATOR"})]})})}export{ke as default};
