import{j as e}from"./rainbowkit-WX_Pm88x.js";import{M as S,C as E}from"./index-C8W-xti9.js";import{r as n,u as N,f as D}from"./react-DYnGVO3U.js";import{c as P}from"./index-Dr4Eb_c_.js";import{e as y,c as A}from"./index-Dkcav_zk.js";import{B as b,b as I}from"./button-BPwpYE1P.js";import{h as u,p as g}from"./index-OzS_pd0Z.js";import{E as w,I as R,F as O,S as k,B,L,a as M,M as $}from"./memoogecko-D0Qpc9-Q.js";import{P as z,C as K}from"./countdown-B055jHc5.js";import{P as F}from"./progress-B6Bw9Cb3.js";import{B as H}from"./index-BbExrO9r.js";import{T as q}from"./index-m1LQWhbo.js";import"./index-BWSZ70jF.js";import"./common-Cz6ycjqB.js";import"./CheckCircleFilled-Bagltj-4.js";function G({type:a="light",title:s,step:c,children:r}){const[o,t]=n.useState(0),i=n.useRef(0),d=n.useRef(0);n.useEffect(()=>{r&&(d.current=document.querySelector(".swipe-card")?.clientWidth||0,i.current=document.querySelector(".swipe-container")?.clientWidth||0)},[r]);const p=()=>{h||t(o-c)},m=n.useMemo(()=>o===0,[o]),h=n.useMemo(()=>d.current-o>i.current,[o]),f=()=>{o!==0&&t(o+c)},j=n.useMemo(()=>a==="dark"?y:y,[a]);return e.jsxs("div",{className:P("swipe-card",a==="light"?"swipe-card-light":"swipe-card-dark"),children:[e.jsxs("div",{className:"swipe-header w-full flex items-center justify-between",children:[e.jsx("p",{className:"title font-404px",children:s}),e.jsxs("div",{className:"swipe-icons flex items-center",children:[e.jsx(j,{className:`w-10 h-10 curose-pointer mr-3  ${h?"cursor-not-allowed":"cursor-pointer"} `,onClick:p}),e.jsx(j,{className:`w-10 h-10 rotate-180 ${m?"cursor-not-allowed":"cursor-pointer"} `,onClick:f})]})]}),e.jsx("div",{className:"swipe-content",children:e.jsx("div",{className:"swipe-container",style:{transform:`translateX(${o}px)`,transition:"transform 0.3s ease-in-out"},children:r})})]})}const W=a=>u.get(`${g}/web-unauthorized/imo`,{params:a}),_=a=>u.get(`${g}/web-unauthorized/airdrop`,{params:a}),Y=a=>u.get(`${g}/web-unauthorized/ido-completed`,{params:a}),V=()=>u.get(`${g}/web-unauthorized/pv-card`),X=()=>u.get(`${g}/web-unauthorized/airdrop-card`),U=()=>{const[a,s]=n.useState([]),c=N();return n.useEffect(()=>{(async()=>{try{const{data:r}=await Y({pageNumber:1,pageSize:10});s(r.records??[])}catch(r){console.error("Error fetching data:",r)}})()},[]),e.jsx(G,{title:"COMPLETED IMO",step:360,children:a&&a.length<0?e.jsx("div",{className:"flex items-center overflow-hidden",children:a.map(r=>e.jsxs("div",{className:"flex flex-col w-[390px] bg-[#131522]  px-11 py-6 mr-8 rounded-lg",children:[e.jsx("img",{src:r.icon,alt:"",className:"w-20 h-20 mb-2 rounded-full"}),e.jsx("p",{className:"font-OCR text-white text-lg mb-[64px]",children:r.tokenName}),e.jsxs("div",{className:"ido-info-item",children:[e.jsx("img",{src:"./dashboard/icon-roi.svg",alt:"",className:"w-5 h-5 mr-1"}),e.jsx("span",{children:"ATH ROI"}),e.jsx("span",{children:r.athRoi})]}),e.jsxs("div",{className:"ido-info-item",children:[e.jsx("img",{src:"./dashboard/icon-ido-symbol.svg",alt:"",className:"w-5 h-5 mr-1"}),e.jsx("span",{children:"Ticker"}),e.jsx("span",{children:r.ticker})]}),e.jsxs("div",{className:"ido-info-item",children:[e.jsx("img",{src:"./dashboard/icon-raised-target.svg",alt:"",className:"w-5 h-5 mr-1"}),e.jsx("span",{className:"whitespace-nowrap",children:"Total Raised"}),e.jsxs("span",{className:"overflow-hidden whitespace-nowrap text-ellipsis",children:[r.totalRaised," ETH"]})]}),e.jsx(b,{variant:"second",className:"font-404px text-lg  w-full h-[50px] uppercase mt-[74px]",onClick:()=>{c(`/airdrop/${r.ticker}`)},children:"Buy"})]},r.ticker))}):e.jsx("div",{className:"w-[1262px]",children:e.jsx(w,{className:"w-[100%]"})})})},J="/static/png/gecko-banner-bg-Cu9-ukgI.png",C="/static/png/airdrops-C4LM6bHO.png",Q="/static/png/create-token-DYpxRUDo.png",Z="/static/png/launchpad-TvIcq0KT.png",ee="/static/png/kings-icon-ba7zbydG.png",te="/static/png/kings-bg-COP3OqKi.png",se="/static/png/card-bg-CDiSfD1m.png",ae=({className:a="",showInfo:s=!1,percent:c=50})=>e.jsx(F,{className:`${a} memoo_progress`,showInfo:s,percent:c}),T=({btnText:a="Airdrop",btnType:s="",path:c="airdrop",data:r})=>{const o=N();return e.jsxs("div",{className:"w-[100%] pb-[81px]",style:{background:`url(${te}) no-repeat`,backgroundSize:"cover"},children:[e.jsxs("div",{className:"flex items-center my-[42px]",children:[e.jsx("span",{className:"font-404px text-green text-[24px] mr-[20px]",children:"KINGS OF THE LAND"}),e.jsx("img",{className:"w-[121px] h-[106px]",src:ee,alt:""})]}),e.jsx("div",{className:"kings-cards flex items-center gap-[22px] justify-between",children:r&&r.length>0?r.slice(0,3).map(t=>e.jsxs("div",{className:"kings-cards-item flex flex-col",style:{background:`url(${se}) no-repeat`,backgroundSize:"cover"},children:[e.jsx("div",{className:"kings-cards-item-banner",children:e.jsx("img",{className:"w-[100%] h-[158px] rounded-tl-[15px] rounded-tr-[15px] ",src:t?.banners[0]?t.banners[0]:z,alt:""})}),e.jsxs("div",{className:"p-[25px]",children:[e.jsxs("div",{className:"flex items-center  box-border",children:[e.jsx("img",{className:"w-[87px] h-[84px] rounded-[50%] mr-[12px]",src:t.icon,alt:""}),e.jsxs("div",{children:[e.jsx("h5",{className:"font-OCR text-[18px] text-[#fff]",children:t.tokenName}),e.jsx("h5",{className:"font-OCR text-[12px] text-green",children:t.ticker})]})]}),e.jsx("p",{className:"my-[26px] font-OCR text-[14px] border_b text-[#7D83B5] h-[48px]",children:t.description}),e.jsxs("div",{className:"py-[24px]",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("div",{className:"font-OCR text-[14px] text-[#7D83B5] line-[13px]",children:"Ends in"}),e.jsx("div",{className:"text-right",children:e.jsx(K,{className:" flex gap-x-2 mt-5 font-OCR text-[18px] text-[#fff] line-[13px]",timefragments:"timefragments-kings",format:([i,d,p,m])=>[e.jsxs("div",{children:[e.jsx("time",{children:d}),e.jsx("span",{children:"H"})]},"hours"),e.jsxs("div",{children:[e.jsx("time",{children:p}),e.jsx("span",{children:"M"})]},"minutes"),e.jsxs("div",{children:[e.jsx("time",{children:m}),e.jsx("span",{children:"S"})]},"seconds")],instant:(t.endsIn||t.airdropEndsIn*1e3)??0,onEnded:i=>{},symbol:""})})]}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("div",{className:"font-OCR text-[14px] text-[#7D83B5] line-[13px]",children:"Total Raised"}),e.jsx(ae,{className:"w-[83px]",percent:t.contributed/t.maxContributed*100}),e.jsxs("div",{className:"font-OCR text-[18px] text-[#fff] line-[13px]  text-right",children:[t.contributed,"/",t.maxContributed," ETH"]})]})]}),e.jsx(H,{className:`memoo_button w-[100%] h-[56px] rounded-[7px] ${s}`,onClick:()=>o(`/${c}/${t.ticker}`),children:a})]})]},t.ticker)):e.jsx("div",{className:"w-[100%]",children:e.jsx(w,{})})})]})},ne=a=>[{title:"Token",dataIndex:"tokenName",key:"tokenName",width:"387px",render:(s,c)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{src:c.icon,alt:"",className:"w-[84px] h-[84px] rounded-full mr-5"}),e.jsx("span",{className:"font-OCR font-normal text-lg mr-2 text-[#ffffff]",children:s}),e.jsx("span",{className:"font-OCR font-normal text-[12px] text-[#07E993] mt-2",children:c.ticker})]})},{title:"Ends In",dataIndex:"endsIn",key:"endsIn",sorter:!1,render:s=>e.jsx("div",{className:"font-OCR font-normal text-lg ",children:s?I(s??0):""})},{title:"Total Raised",dataIndex:"totalRaised",key:"totalRaised",sorter:!1,render:s=>e.jsxs("span",{className:"font-OCR font-norma text-lg",children:[s,"E"]})},{title:"Action",key:"action",width:"150px",render:s=>e.jsx(b,{variant:"secondary",className:" h-[50px] uppercase font-404px font-bold text-lg px-2",onClick:()=>a(`/airdrop/${s.ticker}`),children:"PARTICIPATE"})}],re=a=>[{title:"Token",dataIndex:"tokenName",key:"tokenName",render:(s,c)=>e.jsxs("div",{className:"flex items-center",children:[e.jsx("img",{src:c.icon,alt:"",className:"w-[84px] h-[84px] rounded-full mr-5"}),e.jsx("span",{className:"font-OCR font-bold text-lg mr-2",children:s}),e.jsx("span",{className:"font-OCR font-normal text-[12px] text-[#07E993] mt-2",children:c.ticker})]})},{title:"IDO Date",dataIndex:"idoDate",key:"idoDate",sorter:!1,render:s=>e.jsx("div",{className:"font-OCR font-normal text-lg ",children:s?I(s??0):""})},{title:"Participants",dataIndex:"participants",key:"participants",sorter:!1,render:s=>e.jsxs("span",{className:"font-OCR font-normal text-lg",children:[s,"E"]})},{title:"Action",key:"action",width:"150px",render:s=>e.jsx(b,{variant:"default",className:"w-[136px] h-[50px] uppercase font-404px font-bold text-lg",onClick:()=>a(`/airdrop/${s.ticker}`),children:"airdrop"})}],ce=[{key:"endsIn",label:"Ends in"},{key:"totalRaised",label:"ToTal Raised"}],ie=[{key:"idoDate",label:"IDO Date"},{key:"participants",label:"Participants"}],oe=()=>{const a=N(),[s,c]=n.useState(""),[r,o]=n.useState("desc"),[t,i]=n.useState({current:1,pageSize:10,total:30}),[d,p]=n.useState([]),[m,h]=n.useState([]),[f,j]=n.useState(!1),v=async()=>{let l={pageNumber:t.current??1,pageSize:t.pageSize??10};const{data:x}=await W(l);x&&(p(x.records??[]),i({...t,total:x.total_record??0}))};return n.useEffect(()=>{v()},[t.current,s,r]),n.useEffect(()=>{(async()=>{const{data:l}=await V();h(l)})()},[]),e.jsxs("div",{className:"launchpad-imo",children:[e.jsx(T,{btnText:"PARTICIPATE",btnType:"reverse",data:m}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("div",{}),e.jsx(R,{options:ce,onSelectChange:(l,x)=>{c(l),o(x)}})]}),e.jsx(O,{columns:ne(a),dataSource:d,pagination:!1,loading:f,className:"mb-[58px]",locale:{emptyText:e.jsx(w,{showBorder:!1})}}),e.jsx(S,{currentPage:t.current??0,total:t.total??0,pageSize:t.pageSize,onChangePageNumber:l=>{i({...t,current:l})}})]})},le=oe,de=()=>{const a=N(),[s,c]=n.useState(""),[r,o]=n.useState("desc"),[t,i]=n.useState({current:1,pageSize:10,total:30}),[d,p]=n.useState([]),[m,h]=n.useState([]),[f,j]=n.useState(!1),v=async()=>{let l={pageNumber:t.current??1,pageSize:t.pageSize??10};const{data:x}=await _(l);x&&(p(x.records??[]),i({...t,total:x.total_record??0}))};return n.useEffect(()=>{v()},[t.current,s,r]),n.useEffect(()=>{(async()=>{const{data:l}=await X();h(l)})()},[]),e.jsxs("div",{className:"w-[100%] launchpad-airdrop",children:[e.jsx(T,{btnText:"AIRDROP",btnType:"",data:m}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("div",{}),e.jsx(R,{options:ie,onSelectChange:(l,x)=>{c(l),o(x)}})]}),e.jsx(O,{columns:re(a),dataSource:d,pagination:!1,loading:f,className:"mb-[58px]",locale:{emptyText:e.jsx(w,{showBorder:!1})}}),e.jsx(S,{currentPage:t.current??0,total:t.total??0,pageSize:t.pageSize,onChangePageNumber:l=>{i({...t,current:l})}})]})},xe=de;function Ie(){const[a,s]=n.useState("imo"),c=D();n.useEffect(()=>{const d=new URLSearchParams(c.search).get("type");d&&s(d)},[c.search]);const r=[{key:"imo",label:"IMO",children:e.jsx(le,{})},{key:"airdrop",label:"Airdrop",children:e.jsx(xe,{})}],o=[{icon:$,text:"Memoogecko"},{icon:C,text:"Airdrops"},{icon:Q,text:"Create Tokens"},{icon:Z,text:"Launchpad"}],t=i=>{s(i)};return e.jsx("div",{className:"page",children:e.jsxs("div",{className:"base-container",children:[e.jsx(k,{direction:"left"}),e.jsxs("div",{className:"flex justify-between mt-[21px]",children:[e.jsx("div",{className:"w-[835px] h-[469px]",children:e.jsx(B,{background:a==="imo"?J:L,title:"MEMOOGECKO",children:a==="imo"?e.jsxs("div",{className:"pt-[60px] flex items-center flex-col",children:[e.jsx("img",{className:"w-[159px] h-[159px]",src:"/logo.svg",alt:""}),e.jsx("h3",{className:"font-Kitty mt-[13px] banner-title text-[40px]",children:"Welcome to Memoo."}),e.jsx("h3",{className:"font-Kitty mt-[13px] banner-title text-[40px]",children:"Trade, Hunt, Create, Launch."}),e.jsx("div",{className:"flex items-center justify-center gap-[41px]",children:o.map(i=>e.jsxs("div",{className:"flex flex-col font-404px items-center justify-center",children:[e.jsx("img",{className:"w-[106px] h-[100px]",src:i.icon,alt:""}),e.jsx("p",{className:"text-[16px] text-[#fff] font-OCR",children:i.text})]},i.text))})]}):e.jsxs("div",{className:" flex items-start flex-col",children:[e.jsx("img",{className:"w-[309px] h-[292px]",src:C,alt:""}),e.jsxs("div",{className:"ml-[52px]",children:[e.jsx("h3",{className:"font-Kitty mt-[13px] banner-title text-[40px]",children:"Hunt For"}),e.jsx("h3",{className:"font-Kitty mt-[13px] banner-title text-[40px]",children:"Meme Token Airdrops."}),e.jsx("p",{className:"font-OCR text-[20px] text-[#FFFFFF]",children:"Collect Airdrops That Just Might 1000x."})]})]})})}),e.jsx("div",{className:"w-[406px] h-[470px]",children:e.jsx(M,{title:"POWERED ON",children:e.jsxs("div",{className:"flex flex-col items-center w-[338px]",children:[e.jsxs("div",{className:"flex justify-center items-center w-[100%] mb-[11px]",children:[e.jsx(A,{className:"mr-[7px]"}),e.jsx("span",{className:"font-404px text-[16px] text-green",children:"LIVE DEGEN ACTIVITY"})]}),e.jsx(k,{})]})})})]}),e.jsx("div",{className:"flex items-center justify-between my-[70px]",children:e.jsx(q,{activeKey:a,onChange:t,items:r})}),e.jsx(U,{}),e.jsx(E,{title:"Supercharge Your Meme Creation.",desc:"Create Your Very Own Meme Token Now.",link:"/create_token",linkText:"BE A CREATOR"})]})})}export{Ie as default};
