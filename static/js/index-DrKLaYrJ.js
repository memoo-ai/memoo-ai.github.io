import{j as e}from"./rainbowkit-Bq_2o-KK.js";import{M as b,C as R}from"./index-B2iQAqB9.js";import{r as a,u as f,h as I}from"./react-wd_tNA35.js";import{c as O}from"./index-yMz7JYTS.js";import{i as v,j as T}from"./index-vtkfobDW.js";import{B as j,j as g,b as k}from"./button-D0T0tNF6.js";import{h as u,p as h}from"./index-DwUyMUcZ.js";import{b as E,c as S}from"./common-DVbpk-qr.js";import{F as C,E as y}from"./index-DEaLBoBS.js";import{P as B,C as D}from"./countdown-v9cQqEjr.js";import{P}from"./progress-CDDutlqo.js";import{B as M}from"./index-DzBHhzwZ.js";import{T as L}from"./index-cfy0Kqlq.js";import"./index-Duwr4dHU.js";import"./index-oFP5Oo9g.js";import"./index-ZhNYCb6Q.js";import"./CheckCircleFilled-DVUCFmw4.js";function z({type:s="light",title:t,step:r,children:n}){const[o,i]=a.useState(0),l=a.useRef(0),x=a.useRef(0);a.useEffect(()=>{n&&(x.current=document.querySelector(".swipe-card")?.clientWidth||0,l.current=document.querySelector(".swipe-container")?.clientWidth||0)},[n]);const c=()=>{d||i(o-r)},p=a.useMemo(()=>o===0,[o]),d=a.useMemo(()=>x.current-o>l.current,[o]),m=()=>{o!==0&&i(o+r)},N=a.useMemo(()=>s==="dark"?v:v,[s]);return e.jsxs("div",{className:O("swipe-card",s==="light"?"swipe-card-light":"swipe-card-dark"),children:[e.jsxs("div",{className:"swipe-header w-full flex items-center justify-between",children:[e.jsx("p",{className:"title font-404px",children:t}),e.jsxs("div",{className:"swipe-icons flex items-center",children:[e.jsx(N,{className:`w-10 h-10 curose-pointer mr-3  ${d?"cursor-not-allowed":"cursor-pointer"} `,onClick:c}),e.jsx(N,{className:`w-10 h-10 rotate-180 ${p?"cursor-not-allowed":"cursor-pointer"} `,onClick:m})]})]}),e.jsx("div",{className:"swipe-content",children:e.jsx("div",{className:"swipe-container",style:{transform:`translateX(${o}px)`,transition:"transform 0.3s ease-in-out"},children:n})})]})}const G=s=>u.get(`${h}/web-unauthorized/imo`,{params:s}),Q=s=>u.get(`${h}/web-unauthorized/airdrop`,{params:s}),K=s=>u.get(`${h}/web-unauthorized/ido-completed`,{params:s}),J=()=>u.get(`${h}/web-unauthorized/pv-card`),F=()=>u.get(`${h}/web-unauthorized/airdrop-card`),H=()=>{const[s,t]=a.useState([]),r=f();return a.useEffect(()=>{(async()=>{try{const{data:n}=await K({pageNumber:1,pageSize:10});t(n.records??[])}catch(n){console.error("Error fetching data:",n)}})()},[]),e.jsx(z,{title:"COMPLETED IMO",step:360,children:e.jsx("div",{className:"flex items-center overflow-hidden",children:s.map(n=>e.jsxs("div",{className:"flex flex-col w-[390px] bg-[#131522]  px-11 py-6 mr-8 rounded-lg",children:[e.jsx("img",{src:n.icon,alt:"",className:"w-20 h-20 mb-2 rounded-full"}),e.jsx("p",{className:"font-OCR text-white text-lg mb-[64px]",children:n.tokenName}),e.jsxs("div",{className:"ido-info-item",children:[e.jsx("img",{src:"./dashboard/icon-roi.svg",alt:"",className:"w-5 h-5 mr-1"}),e.jsx("span",{children:"ATH ROI"}),e.jsx("span",{children:n.athRoi})]}),e.jsxs("div",{className:"ido-info-item",children:[e.jsx("img",{src:"./dashboard/icon-ido-symbol.svg",alt:"",className:"w-5 h-5 mr-1"}),e.jsx("span",{children:"Ticker"}),e.jsx("span",{children:n.ticker})]}),e.jsxs("div",{className:"ido-info-item",children:[e.jsx("img",{src:"./dashboard/icon-raised-target.svg",alt:"",className:"w-5 h-5 mr-1"}),e.jsx("span",{className:"whitespace-nowrap",children:"Total Raised"}),e.jsxs("span",{className:"overflow-hidden whitespace-nowrap text-ellipsis",children:[n.totalRaised," ETH"]})]}),e.jsx(j,{variant:"second",className:"font-404px text-lg  w-full h-[50px] uppercase mt-[74px]",onClick:()=>{r(`/airdrop/${n.ticker}`)},children:"Buy"})]},n.ticker))})})},$=()=>{const[s,t]=a.useState([]),r=a.useRef(null),n=a.useRef(!1),o=a.useRef(null),i=f();a.useEffect(()=>(l(),x(),()=>{clearInterval(o.current)}),[]);const l=a.useCallback(async()=>{try{if(n.current)return;const{data:c}=await E();t(c)}catch(c){console.error("Error fetching data:",c)}},[]),x=()=>{o.current=setInterval(()=>{l()},5e3)};return e.jsx("div",{className:"carousel-container",children:e.jsx("div",{className:"carousel-track",ref:r,onMouseMove:()=>n.current=!0,onMouseLeave:()=>n.current=!1,children:s?s.map((c,p)=>e.jsxs("div",{className:"carousel-item mr-2 flex overflow items-center justify-between px-[10px] py-[5px]  cursor-pointer",onClick:()=>i(`/airdrop/${c.ticker}`),children:[e.jsxs("span",{className:" font-404px text-[12px] mr-[10px]",children:[" ",e.jsxs("span",{className:"mr-[10px]",style:{color:g()},children:[c.address.slice(0,6),"...",c.address.slice(-4)]})," ","created"," ",e.jsx("span",{className:"mx-[10px]",style:{color:g()},children:c.ticker})]}),e.jsx("img",{className:"w-[30px] h-[30px] mr-2 rounded-[50%]",src:c.icon,alt:""})]},p)):""})})},U=$,Y=()=>{const[s,t]=a.useState([]),r=a.useRef(null),n=a.useRef(!1),o=a.useRef(null),i=f();a.useEffect(()=>(l(),x(),()=>{clearInterval(o.current)}),[]);const l=async()=>{try{if(n.current)return;console.log("fetchData");const{data:c}=await S();t(c)}catch(c){console.error("Error fetching data:",c)}},x=()=>{o.current=setInterval(()=>{l()},5e3)};return e.jsx("div",{className:"carousel-column-container",children:e.jsx("div",{className:"carousel-column-track",ref:r,onMouseMove:()=>n.current=!0,onMouseLeave:()=>n.current=!1,children:s.map((c,p)=>e.jsxs("div",{className:"carousel-column-item w-[100%] bg-[#2B526E] rounded-sm mb-[2px] px-[9px] py-[6px] flex items-center  cursor-pointer",onClick:()=>i(`/airdrop/${c.ticker}`),children:[e.jsx("img",{className:"w-[30px]",src:c.icon,alt:""})," ",e.jsxs("span",{className:"font-404px ml-[5px] text-[#fff] text-[12px]",style:{color:g()},children:[c.address.slice(0,6),"...",c.address.slice(-4)]}),e.jsx("span",{className:"font-404px ml-[5px] text-[#fff] text-[12px]",children:c.tradeType}),e.jsx("span",{className:"font-404px ml-[5px] text-[#fff] text-[12px]",children:c.tradeType==="airdrop"?"in":"of"}),e.jsx("span",{className:"font-404px ml-[5px] text-[#fff] text-[12px]",style:{color:g()},children:c.ticker}),e.jsx("span",{className:"font-404px ml-[5px] text-[#fff] text-[12px]",children:c.tradeType==="airdrop"?"airdrop":""})]},c.id))})})},q=Y,X="/static/png/powered-bg-BVCcQmp5.png",V="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAAAOCAYAAABNaxCaAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARPSURBVHgB7VhPbxtFFH8zszaxk6jmBqeu+ADU+QBVHE5IIOqIG39aB65IhDuKXcSJCtQcQEIg4koc4JTkC5DkxomQI6e6J44xUtQg784Mv7c7ay2Ld8dJUVRVfcnb2Zl9897sb96899aCHG38/OsPakn35FJMYCEXNcl6TBRoq5QWFMRWBlqASWCMBP4Frd1r3D6i53QhCvjy4Te/bdG56RncW1ysBaIGkC4LK0mSsYQrCcNIk0iuqq4/udd4vxRwa+0NNG2P/ZEQ4sjJt9Dc8sgfQv5RQf9UR8VafLrH4N9zuovyU7vueYhmledhfH9OG1M9wUdbf/Sjs6gfmyhF1QJ3ODEZ6OH+Mln1AqErALwQeGaFEXe/ar2zTeUvGfJLkJ+G4AywHXDXNwG6Ow5klh0UdJTRMTj0yIygewW6eQN2wZ3cM36XlVz/urM7Au+7sQOaw8nYRhD8rU6MNB8IjEyAOgnJL0YafS001YOADJBWCwrOz9DXTrdfemvfo/zj3GKrwD/ki/OSDPBhiWzbcY/8IE8JutkjQ0q9ea9ErOtk2tmacutL7LKeshPlnCwDfOix4TsNlyMsYsem1J9TPnTytkKm70R2ZvUr5q06uYcVMg+dTMf1D1z/Ts7ObpnOOdc/1Rl8+u6fB7oRX4+QOKPFCBxT1JiQXoyFaGprG5oTK6klQ3IZIahpxkJF61+/8sYj8lPoPG0WjfJx8ikmDqOb4C6fSBd+nogCFCMb4rx2jOR5jWyyI7jUONpwLk12ziJ3xoQqBkLKxAC+trd5vLt2f2W9bAFZSOk5nkmwNcBL3KWroVbFyWuVTWKQMe+Q0vDAYbNyvRU2wuwmGPz08uiz90474pwOAHGLOKwbwemSYv7TaTXD4dxgHPekbNy2jcVfAPxrJcA/oDTGdaicQvAACrfpaoiBHdDl6D6loLPH+5xk4HmeloxbP754AuDXzGPbtRLVokxKFLQoGIVyfSRY1I1SIbEq7IwiOm82OIv/B3R3BDeqDOfi3zW6GvIl0ipvP8Jy+fS2K8JlRkOfjSAbYeDRnNCzS1xTz3QEl0Bbnvm8YXx6B1ThzRU2QnInfwr652+f3kFMX9USBbrUpGtaTJYiGzddgm1GSK6aDFrCGOFeLcTb375+82SGgT7Nf5T/Ksy1Hvlxoe1hSq9ENqT/j7KE2qF/l5UXpgT0L26d3TZGD03y6YMEijhiYytqj4M0t6ZB3iahR0juWZLmwffdm096MgZZNcBJlfwbNaI0vjJx3mAQQroCcgl1kLPPtEeXIPHlm2c3ELiPGVCNOI4PInz742M0uQfX4fGNyCalZMLw+Kbe/27z1fUype5jx3dcx8XyyzcP8qMZtkKffCYza35Bx9iBm61j1hrDov45bUx1BqQkvI2OUBVS4taJgE5+b1ESY5GiOiuTiQQ/HC9MJpVJ0i30wvXsZeaVveRFZIrPq9ZRpmsOG1Od/wAVcJNleS6hugAAAABJRU5ErkJggg==",W="/static/png/alert 1-ogiZgdMB.png",Z=({children:s,background:t=X,title:r,icon:n=V,infoIcon:o=W})=>e.jsxs("div",{className:"banner-right-box",style:{background:`url(${t}) no-repeat`,backgroundSize:"cover"},children:[e.jsxs("div",{className:"banner-right-box-top flex flex-col items-center",children:[e.jsx("h5",{className:"font-404px text-[#07E993] text-[12px]",children:r}),e.jsx("img",{src:n,alt:""})]}),e.jsx("img",{className:"info-icon",src:o,alt:""}),e.jsx("div",{className:"banner-right-box-slot",children:s})]}),_=Z,ee=({children:s,background:t,title:r})=>e.jsxs("div",{className:"banner-box",style:{background:`url(${t}) no-repeat`,backgroundSize:"cover"},children:[e.jsx("h5",{className:"banner-box-title font-404px text-[#07E993] text-[16px]",children:r}),s]}),te=ee,se="/static/png/gecko-banner-bg-Cu9-ukgI.png",ae="/static/png/launchpad-airdrop-bg-CEhHHB_Q.png",ne="/static/png/memoogecko-CZ0yWp6D.png",w="/static/png/airdrops-C4LM6bHO.png",re="/static/png/create-token-DYpxRUDo.png",ce="/static/png/launchpad-TvIcq0KT.png",oe="/static/png/kings-icon-ba7zbydG.png",ie="/static/png/kings-bg-COP3OqKi.png",le="/static/png/card-bg-CDiSfD1m.png",xe=({className:s="",showInfo:t=!1,percent:r=50})=>e.jsx(P,{className:`${s} memoo_progress`,showInfo:t,percent:r}),A=({btnText:s="Airdrop",btnType:t="",path:r="airdrop",data:n})=>{const o=f();return e.jsxs("div",{className:"w-[100%] pb-[81px]",style:{background:`url(${ie}) no-repeat`,backgroundSize:"cover"},children:[e.jsxs("div",{className:"flex items-center my-[42px]",children:[e.jsx("span",{className:"font-404px text-green text-[24px] mr-[20px]",children:"KINGS OF THE LAND"}),e.jsx("img",{className:"w-[121px] h-[106px]",src:oe,alt:""})]}),e.jsx("div",{className:"kings-cards flex items-center gap-[22px] justify-center",children:n.slice(0,3).map(i=>e.jsxs("div",{className:"kings-cards-item flex flex-col",style:{background:`url(${le}) no-repeat`,backgroundSize:"cover"},children:[e.jsx("div",{className:"kings-cards-item-banner",children:e.jsx("img",{className:"w-[100%] rounded-tl-[15px] rounded-tr-[15px] ",src:i.banners?i.banners[0]:B,alt:""})}),e.jsxs("div",{className:"p-[25px]",children:[e.jsxs("div",{className:"flex items-center  box-border",children:[e.jsx("img",{className:"w-[87px] h-[84px] rounded-[50%] mr-[12px]",src:i.icon,alt:""}),e.jsxs("div",{children:[e.jsx("h5",{className:"font-OCR text-[18px] text-[#fff]",children:i.tokenName}),e.jsx("h5",{className:"font-OCR text-[12px] text-green",children:i.ticker})]})]}),e.jsx("p",{className:"py-[26px] font-OCR text-[14px] border_b text-[#7D83B5]",children:i.description}),e.jsxs("div",{className:"py-[24px]",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("div",{className:"font-OCR text-[14px] text-[#7D83B5] line-[13px]",children:"Ends in"}),e.jsx("div",{className:" w-[153px] text-right",children:e.jsx(D,{className:" flex gap-x-2 mt-5 font-OCR text-[18px] text-[#fff] line-[13px]",format:([l,x,c,p])=>[e.jsxs("div",{children:[e.jsx("time",{children:x}),e.jsx("span",{children:"H"})]},"hours"),e.jsxs("div",{children:[e.jsx("time",{children:c}),e.jsx("span",{children:"M"})]},"minutes"),e.jsxs("div",{children:[e.jsx("time",{children:p}),e.jsx("span",{children:"S"})]},"seconds")],instant:(i.endsIn||i.airdropEndsIn*1e3)??0,onEnded:l=>{},symbol:""})})]}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("div",{className:"font-OCR text-[14px] text-[#7D83B5] line-[13px]",children:"Total Raised"}),e.jsx(xe,{className:"w-[83px]"}),e.jsx("div",{className:"font-OCR text-[18px] text-[#fff] line-[13px] w-[153px] text-right",children:"1.82/2.3 ETH"})]})]}),e.jsx(M,{className:`memoo_button w-[100%] h-[56px] rounded-[7px] ${t}`,onClick:()=>o(`/${r}/${i.ticker}`),children:s})]})]},i.ticker))})]})},de=s=>[{title:"Token",dataIndex:"tokenName",key:"tokenName",width:"387px",render:(t,r)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{src:r.icon,alt:"",className:"w-[84px] h-[84px] rounded-full mr-5"}),e.jsx("span",{className:"font-OCR font-normal text-lg mr-2 text-[#ffffff]",children:t}),e.jsx("span",{className:"font-OCR font-normal text-[12px] text-[#07E993] mt-2",children:r.ticker})]})},{title:"Ends In",dataIndex:"endsIn",key:"endsIn",sorter:!0,render:t=>e.jsx("div",{className:"font-OCR font-normal text-lg ",children:t?k(t??0):""})},{title:"Total Raissed",dataIndex:"totalRaised",key:"totalRaised",sorter:!0,render:t=>e.jsxs("span",{className:"font-OCR font-norma text-lg",children:[t,"E"]})},{title:"Action",key:"action",width:"150px",render:t=>e.jsx(j,{variant:"secondary",className:" h-[50px] uppercase font-404px font-bold text-lg px-2",onClick:()=>s(`/airdrop/${t.ticker}`),children:"PARTICIPATE"})}],pe=s=>[{title:"Token",dataIndex:"tokenName",key:"tokenName",render:(t,r)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{src:r.icon,alt:"",className:"w-[84px] h-[84px] rounded-full mr-5"}),e.jsx("span",{className:"font-OCR font-bold text-lg mr-2",children:t}),e.jsx("span",{className:"font-OCR font-normal text-[12px] text-[#07E993] mt-2",children:r.ticker})]})},{title:"IDO Date",dataIndex:"idoDate",key:"idoDate",sorter:!0,render:t=>e.jsx("div",{className:"font-OCR font-normal text-lg ",children:t?k(t??0):""})},{title:"Participants",dataIndex:"participants",key:"participants",sorter:!0,render:t=>e.jsxs("span",{className:"font-OCR font-normal text-lg",children:[t,"E"]})},{title:"Action",key:"action",width:"150px",render:t=>e.jsx(j,{variant:"default",className:"w-[136px] h-[50px] uppercase font-404px font-bold text-lg",onClick:()=>s(`/airdrop/${t.ticker}`),children:"airdrop"})}],me=()=>{const s=f(),[t,r]=a.useState({current:1,pageSize:10,total:30}),[n,o]=a.useState([]),[i,l]=a.useState([]),[x,c]=a.useState(!1),p=async()=>{let d={pageNumber:t.current??1,pageSize:t.pageSize??10};const{data:m}=await G(d);m&&(o(m.records??[]),r({...t,total:m.total_record??0}))};return a.useEffect(()=>{p()},[t.current]),a.useEffect(()=>{(async()=>{const{data:d}=await J();l(d)})()},[]),e.jsxs("div",{className:"launchpad-imo",children:[e.jsx(A,{btnText:"PARTICIPATE",btnType:"reverse",data:i}),e.jsx(C,{columns:de(s),dataSource:n,pagination:!1,loading:x,className:"mb-[58px]",locale:{emptyText:e.jsx(y,{})}}),e.jsx(b,{currentPage:t.current??0,total:t.total??0,pageSize:t.pageSize,onChangePageNumber:d=>{r({...t,current:d})}})]})},fe=me,ue=()=>{const s=f(),[t,r]=a.useState({current:1,pageSize:10,total:30}),[n,o]=a.useState([]),[i,l]=a.useState([]),[x,c]=a.useState(!1),p=async()=>{let d={pageNumber:t.current??1,pageSize:t.pageSize??10};const{data:m}=await Q(d);m&&(o(m.records??[]),r({...t,total:m.total_record??0}))};return a.useEffect(()=>{p()},[t.current]),a.useEffect(()=>{(async()=>{const{data:d}=await F();l(d)})()},[]),e.jsxs("div",{className:"w-[100%] launchpad-airdrop",children:[e.jsx(A,{btnText:"AIRDROP",btnType:"",data:i}),e.jsx(C,{columns:pe(s),dataSource:n,pagination:!1,loading:x,className:"mb-[58px]",locale:{emptyText:e.jsx(y,{})}}),e.jsx(b,{currentPage:t.current??0,total:t.total??0,pageSize:t.pageSize,onChangePageNumber:d=>{r({...t,current:d})}})]})},he=ue;function De(){const[s,t]=a.useState("imo"),r=I();a.useEffect(()=>{const x=new URLSearchParams(r.search).get("type");x&&t(x)},[r.search]);const n=[{key:"imo",label:"IMO",children:e.jsx(fe,{})},{key:"airdrop",label:"Airdrop",children:e.jsx(he,{})}],o=[{icon:ne,text:"Memoogecko"},{icon:w,text:"Airdrops"},{icon:re,text:"Create Tokens"},{icon:ce,text:"Launchpad"}],i=l=>{t(l)};return e.jsx("div",{className:"page",children:e.jsxs("div",{className:"base-container",children:[e.jsx(U,{}),e.jsxs("div",{className:"flex justify-between mt-[21px]",children:[e.jsx("div",{className:"w-[835px] h-[469px]",children:e.jsx(te,{background:s==="imo"?se:ae,title:"MEMOOGECKO",children:s==="imo"?e.jsxs("div",{className:"pt-[60px] flex items-center flex-col",children:[e.jsx("img",{className:"w-[159px] h-[159px]",src:"/logo.svg",alt:""}),e.jsx("h3",{className:"font-Kitty mt-[13px] banner-title text-[40px]",children:"Welcome to Memoo."}),e.jsx("h3",{className:"font-Kitty mt-[13px] banner-title text-[40px]",children:"Trade, Hunt, Create, Launch."}),e.jsx("div",{className:"flex items-center justify-center gap-[41px]",children:o.map(l=>e.jsxs("div",{className:"flex flex-col font-404px items-center justify-center",children:[e.jsx("img",{className:"w-[106px] h-[100px]",src:l.icon,alt:""}),e.jsx("p",{className:"text-[16px] text-[#fff] font-OCR",children:l.text})]},l.text))})]}):e.jsxs("div",{className:" flex items-start flex-col",children:[e.jsx("img",{className:"w-[309px] h-[292px]",src:w,alt:""}),e.jsxs("div",{className:"ml-[52px]",children:[e.jsx("h3",{className:"font-Kitty mt-[13px] banner-title text-[40px]",children:"Hunt For"}),e.jsx("h3",{className:"font-Kitty mt-[13px] banner-title text-[40px]",children:"Meme Token Airdrops."}),e.jsx("p",{className:"font-OCR text-[20px] text-[#FFFFFF]",children:"Collect Airdrops That Just Might 1000x."})]})]})})}),e.jsx("div",{className:"w-[406px] h-[470px]",children:e.jsx(_,{title:"POWERED ON",children:e.jsxs("div",{className:"flex flex-col items-center w-[338px]",children:[e.jsxs("div",{className:"flex justify-center items-center w-[100%] mb-[11px]",children:[e.jsx(T,{className:"mr-[7px]"}),e.jsx("span",{className:"font-404px text-[16px] text-green",children:"LIVE DEGEN ACTIVITY"})]}),e.jsx(q,{})]})})})]}),e.jsx("div",{className:"flex items-center justify-between my-[70px]",children:e.jsx(L,{activeKey:s,onChange:i,items:n})}),e.jsx(H,{}),e.jsx(R,{title:"Supercharge Your Meme Creation.",desc:"Create Your Very Own Meme Token Now.",link:"/create_token",linkText:"BE A CREATOR"})]})})}export{De as default};
