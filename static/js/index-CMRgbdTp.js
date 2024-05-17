import{r as o,R as j}from"./react-t3YMvJiE.js";import{_ as ve,g as k}from"./index-DOrbLdba.js";import{a as We,b as Z,d as Se,_ as ne,h as je,i as Fe,o as Xe,j as Ce,C as ge,R as at,k as qe,l as we,D as Ue,n as Te,N as De,g as ot,m as rt,w as Ae,q as Le,I as Ge,s as ke,t as Ke,v as st}from"./index-DDuhrp9a.js";import{B as Ye,t as lt,r as ye,u as Me,F as me,a as Ve,b as Ze,N as He,g as _e,c as Be,i as it,d as ut,p as ct,e as dt,R as ft}from"./BaseInput-DDGRlleV.js";const Qt=e=>({[e.componentCls]:{[`${e.antCls}-motion-collapse-legacy`]:{overflow:"hidden","&-active":{transition:`height ${e.motionDurationMid} ${e.motionEaseInOut},
        opacity ${e.motionDurationMid} ${e.motionEaseInOut} !important`}},[`${e.antCls}-motion-collapse`]:{overflow:"hidden",transition:`height ${e.motionDurationMid} ${e.motionEaseInOut},
        opacity ${e.motionDurationMid} ${e.motionEaseInOut} !important`}}});var vt=["show"];function Qe(e,r){return o.useMemo(function(){var a={};r&&(a.show=We(r)==="object"&&r.formatter?r.formatter:!!r),a=Z(Z({},a),e);var t=a,n=t.show,d=Se(t,vt);return Z(Z({},d),{},{show:!!n,showFormatter:typeof n=="function"?n:void 0,strategy:d.strategy||function(l){return l.length}})},[e,r])}var mt=["autoComplete","onChange","onFocus","onBlur","onPressEnter","onKeyDown","prefixCls","disabled","htmlSize","className","maxLength","suffix","showCount","count","type","classes","classNames","styles","onCompositionStart","onCompositionEnd"],gt=o.forwardRef(function(e,r){var a=e.autoComplete,t=e.onChange,n=e.onFocus,d=e.onBlur,l=e.onPressEnter,i=e.onKeyDown,z=e.prefixCls,m=z===void 0?"rc-input":z,C=e.disabled,y=e.htmlSize,O=e.className,T=e.maxLength,S=e.suffix,$=e.showCount,K=e.count,M=e.type,N=M===void 0?"text":M,c=e.classes,I=e.classNames,B=e.styles,R=e.onCompositionStart,E=e.onCompositionEnd,p=Se(e,mt),g=o.useState(!1),F=ne(g,2),A=F[0],h=F[1],D=o.useRef(!1),w=o.useRef(null),V=function(b){w.current&&lt(w.current,b)},G=je(e.defaultValue,{value:e.value}),H=ne(G,2),W=H[0],X=H[1],x=W==null?"":String(W),s=o.useState(null),u=ne(s,2),v=u[0],_=u[1],f=Qe(K,$),Y=f.max||T,re=f.strategy(x),ce=!!Y&&re>Y;o.useImperativeHandle(r,function(){return{focus:V,blur:function(){var b;(b=w.current)===null||b===void 0||b.blur()},setSelectionRange:function(b,ee,de){var oe;(oe=w.current)===null||oe===void 0||oe.setSelectionRange(b,ee,de)},select:function(){var b;(b=w.current)===null||b===void 0||b.select()},input:w.current}}),o.useEffect(function(){h(function(L){return L&&C?!1:L})},[C]);var ie=function(b,ee,de){var oe=ee;if(!D.current&&f.exceedFormatter&&f.max&&f.strategy(ee)>f.max){if(oe=f.exceedFormatter(ee,{max:f.max}),ee!==oe){var fe,le;_([((fe=w.current)===null||fe===void 0?void 0:fe.selectionStart)||0,((le=w.current)===null||le===void 0?void 0:le.selectionEnd)||0])}}else if(de.source==="compositionEnd")return;X(oe),w.current&&ye(w.current,b,t,oe)};o.useEffect(function(){if(v){var L;(L=w.current)===null||L===void 0||L.setSelectionRange.apply(L,Fe(v))}},[v]);var pe=function(b){ie(b,b.target.value,{source:"change"})},q=function(b){D.current=!1,ie(b,b.currentTarget.value,{source:"compositionEnd"}),E?.(b)},ae=function(b){l&&b.key==="Enter"&&l(b),i?.(b)},J=function(b){h(!0),n?.(b)},se=function(b){h(!1),d?.(b)},ze=function(b){X(""),V(),w.current&&ye(w.current,b,t)},xe=ce&&"".concat(m,"-out-of-range"),Re=function(){var b=Xe(e,["prefixCls","onPressEnter","addonBefore","addonAfter","prefix","suffix","allowClear","defaultValue","showCount","count","classes","htmlSize","styles","classNames"]);return j.createElement("input",ve({autoComplete:a},b,{onChange:pe,onFocus:J,onBlur:se,onKeyDown:ae,className:k(m,Ce({},"".concat(m,"-disabled"),C),I?.input),style:B?.input,ref:w,size:y,type:N,onCompositionStart:function(de){D.current=!0,R?.(de)},onCompositionEnd:q}))},Oe=function(){var b=Number(Y)>0;if(S||f.show){var ee=f.showFormatter?f.showFormatter({value:x,count:re,maxLength:Y}):"".concat(re).concat(b?" / ".concat(Y):"");return j.createElement(j.Fragment,null,f.show&&j.createElement("span",{className:k("".concat(m,"-show-count-suffix"),Ce({},"".concat(m,"-show-count-has-suffix"),!!S),I?.count),style:Z({},B?.count)},ee),S)}return null};return j.createElement(Ye,ve({},p,{prefixCls:m,className:k(O,xe),handleReset:ze,value:x,focused:A,triggerFocus:V,suffix:Oe(),disabled:C,classes:c,classNames:I,styles:B}),Re())});const pt=e=>{const{getPrefixCls:r,direction:a}=o.useContext(ge),{prefixCls:t,className:n}=e,d=r("input-group",t),l=r("input"),[i,z]=Me(l),m=k(d,{[`${d}-lg`]:e.size==="large",[`${d}-sm`]:e.size==="small",[`${d}-compact`]:e.compact,[`${d}-rtl`]:a==="rtl"},z,n),C=o.useContext(me),y=o.useMemo(()=>Object.assign(Object.assign({},C),{isFormItemInput:!1}),[C]);return i(o.createElement("span",{className:m,style:e.style,onMouseEnter:e.onMouseEnter,onMouseLeave:e.onMouseLeave,onFocus:e.onFocus,onBlur:e.onBlur},o.createElement(me.Provider,{value:y},e.children)))},Je=e=>{let r;return typeof e=="object"&&e?.clearIcon?r=e:e&&(r={clearIcon:j.createElement(at,null)}),r};function et(e,r){const a=o.useRef([]),t=()=>{a.current.push(setTimeout(()=>{var n,d,l,i;!((n=e.current)===null||n===void 0)&&n.input&&((d=e.current)===null||d===void 0?void 0:d.input.getAttribute("type"))==="password"&&(!((l=e.current)===null||l===void 0)&&l.input.hasAttribute("value"))&&((i=e.current)===null||i===void 0||i.input.removeAttribute("value"))}))};return o.useEffect(()=>(r&&t(),()=>a.current.forEach(n=>{n&&clearTimeout(n)})),[]),t}function Ct(e){return!!(e.prefix||e.suffix||e.allowClear||e.showCount)}var ht=function(e,r){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)r.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(a[t[n]]=e[t[n]]);return a};function xt(e,r){if(!e)return;e.focus(r);const{cursor:a}=r||{};if(a){const t=e.value.length;switch(a){case"start":e.setSelectionRange(0,0);break;case"end":e.setSelectionRange(t,t);break;default:e.setSelectionRange(0,t);break}}}const Ee=o.forwardRef((e,r)=>{var a;const{prefixCls:t,bordered:n=!0,status:d,size:l,disabled:i,onBlur:z,onFocus:m,suffix:C,allowClear:y,addonAfter:O,addonBefore:T,className:S,style:$,styles:K,rootClassName:M,onChange:N,classNames:c,variant:I}=e,B=ht(e,["prefixCls","bordered","status","size","disabled","onBlur","onFocus","suffix","allowClear","addonAfter","addonBefore","className","style","styles","rootClassName","onChange","classNames","variant"]),{getPrefixCls:R,direction:E,input:p}=j.useContext(ge),g=R("input",t),F=o.useRef(null),A=Ve(g),[h,D,w]=Me(g,A),{compactSize:V,compactItemClassnames:G}=qe(g,E),H=we(J=>{var se;return(se=l??V)!==null&&se!==void 0?se:J}),W=j.useContext(Ue),X=i??W,{status:x,hasFeedback:s,feedbackIcon:u}=o.useContext(me),v=Be(x,d),_=Ct(e)||!!s;o.useRef(_);const f=et(F,!0),Y=J=>{f(),z?.(J)},re=J=>{f(),m?.(J)},ce=J=>{f(),N?.(J)},ie=(s||C)&&j.createElement(j.Fragment,null,C,s&&u),pe=Je(y??p?.allowClear),[q,ae]=Ze(I,n);return h(j.createElement(gt,Object.assign({ref:Te(r,F),prefixCls:g,autoComplete:p?.autoComplete},B,{disabled:X,onBlur:Y,onFocus:re,style:Object.assign(Object.assign({},p?.style),$),styles:Object.assign(Object.assign({},p?.styles),K),suffix:ie,allowClear:pe,className:k(S,M,w,A,G,p?.className),onChange:ce,addonAfter:O&&j.createElement(De,null,j.createElement(He,{override:!0,status:!0},O)),addonBefore:T&&j.createElement(De,null,j.createElement(He,{override:!0,status:!0},T)),classNames:Object.assign(Object.assign(Object.assign({},c),p?.classNames),{input:k({[`${g}-sm`]:H==="small",[`${g}-lg`]:H==="large",[`${g}-rtl`]:E==="rtl"},c?.input,(a=p?.classNames)===null||a===void 0?void 0:a.input,D),variant:k({[`${g}-${q}`]:ae},_e(g,v)),affixWrapper:k({[`${g}-affix-wrapper-sm`]:H==="small",[`${g}-affix-wrapper-lg`]:H==="large",[`${g}-affix-wrapper-rtl`]:E==="rtl"},D),wrapper:k({[`${g}-group-rtl`]:E==="rtl"},D),groupWrapper:k({[`${g}-group-wrapper-sm`]:H==="small",[`${g}-group-wrapper-lg`]:H==="large",[`${g}-group-wrapper-rtl`]:E==="rtl",[`${g}-group-wrapper-${q}`]:ae},_e(`${g}-group-wrapper`,v,s),D)})})))}),bt=e=>{const{componentCls:r,paddingXS:a}=e;return{[`${r}`]:{display:"inline-flex",alignItems:"center",flexWrap:"nowrap",columnGap:a,"&-rtl":{direction:"rtl"},[`${r}-input`]:{textAlign:"center",paddingInline:e.paddingXXS},[`&${r}-sm ${r}-input`]:{paddingInline:e.calc(e.paddingXXS).div(2).equal()},[`&${r}-lg ${r}-input`]:{paddingInline:e.paddingXS}}}},yt=ot(["Input","OTP"],e=>{const r=rt(e,it(e));return[bt(r)]},ut);var St=function(e,r){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)r.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(a[t[n]]=e[t[n]]);return a};const wt=o.forwardRef((e,r)=>{const{value:a,onChange:t,onActiveChange:n,index:d,mask:l}=e,i=St(e,["value","onChange","onActiveChange","index","mask"]),z=a&&typeof l=="string"?l:a,m=S=>{t(d,S.target.value)},C=o.useRef(null);o.useImperativeHandle(r,()=>C.current);const y=()=>{Ae(()=>{var S;const $=(S=C.current)===null||S===void 0?void 0:S.input;document.activeElement===$&&$&&$.select()})},O=S=>{let{key:$}=S;$==="ArrowLeft"?n(d-1):$==="ArrowRight"&&n(d+1),y()},T=S=>{S.key==="Backspace"&&!a&&n(d-1),y()};return o.createElement(Ee,Object.assign({},i,{ref:C,value:z,onInput:m,onFocus:y,onKeyDown:O,onKeyUp:T,onMouseDown:y,onMouseUp:y,type:l===!0?"password":"text"}))});var Et=function(e,r){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)r.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(a[t[n]]=e[t[n]]);return a};function be(e){return(e||"").split("")}const zt=o.forwardRef((e,r)=>{const{prefixCls:a,length:t=6,size:n,defaultValue:d,value:l,onChange:i,formatter:z,variant:m,disabled:C,status:y,autoFocus:O,mask:T}=e,S=Et(e,["prefixCls","length","size","defaultValue","value","onChange","formatter","variant","disabled","status","autoFocus","mask"]),{getPrefixCls:$,direction:K}=o.useContext(ge),M=$("otp",a),N=ct(S,{aria:!0,data:!0,attr:!0}),c=Ve(M),[I,B,R]=yt(M,c),E=we(s=>n??s),p=o.useContext(me),g=Be(p.status,y),F=o.useMemo(()=>Object.assign(Object.assign({},p),{status:g,hasFeedback:!1,feedbackIcon:null}),[p,g]),A=o.useRef(null),h=o.useRef({});o.useImperativeHandle(r,()=>({focus:()=>{var s;(s=h.current[0])===null||s===void 0||s.focus()},blur:()=>{var s;for(let u=0;u<t;u+=1)(s=h.current[u])===null||s===void 0||s.blur()},nativeElement:A.current}));const D=s=>z?z(s):s,[w,V]=o.useState(be(D(d||"")));o.useEffect(()=>{l!==void 0&&V(be(l))},[l]);const G=Le(s=>{V(s),i&&s.length===t&&s.every(u=>u)&&s.some((u,v)=>w[v]!==u)&&i(s.join(""))}),H=Le((s,u)=>{let v=Fe(w);for(let f=0;f<s;f+=1)v[f]||(v[f]="");u.length<=1?v[s]=u:v=v.slice(0,s).concat(be(u)),v=v.slice(0,t);for(let f=v.length-1;f>=0&&!v[f];f-=1)v.pop();const _=D(v.map(f=>f||" ").join(""));return v=be(_).map((f,Y)=>f===" "&&!v[Y]?v[Y]:f),v}),W=(s,u)=>{var v;const _=H(s,u),f=Math.min(s+u.length,t-1);f!==s&&((v=h.current[f])===null||v===void 0||v.focus()),G(_)},X=s=>{var u;(u=h.current[s])===null||u===void 0||u.focus()},x={variant:m,disabled:C,status:g,mask:T};return I(o.createElement("div",Object.assign({},N,{ref:A,className:k(M,{[`${M}-sm`]:E==="small",[`${M}-lg`]:E==="large",[`${M}-rtl`]:K==="rtl"},R,B)}),o.createElement(me.Provider,{value:F},Array.from({length:t}).map((s,u)=>{const v=`otp-${u}`,_=w[u]||"";return o.createElement(wt,Object.assign({ref:f=>{h.current[u]=f},key:v,index:u,size:E,htmlSize:1,className:`${M}-input`,onChange:W,value:_,onActiveChange:X,autoFocus:u===0&&O},x))}))))});var Rt={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2Q889.47 375.11 816.7 305l-50.88 50.88C807.31 395.53 843.45 447.4 874.7 512 791.5 684.2 673.4 766 512 766q-72.67 0-133.87-22.38L323 798.75Q408 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5zm-63.57-320.64L836 122.88a8 8 0 00-11.32 0L715.31 232.2Q624.86 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.69 119.4 136.5 191.41L112.48 835a8 8 0 000 11.31L155.17 889a8 8 0 0011.31 0l712.15-712.12a8 8 0 000-11.32zM149.3 512C232.6 339.8 350.7 258 512 258c54.54 0 104.13 9.36 149.12 28.39l-70.3 70.3a176 176 0 00-238.13 238.13l-83.42 83.42C223.1 637.49 183.3 582.28 149.3 512zm246.7 0a112.11 112.11 0 01146.2-106.69L401.31 546.2A112 112 0 01396 512z"}},{tag:"path",attrs:{d:"M508 624c-3.46 0-6.87-.16-10.25-.47l-52.82 52.82a176.09 176.09 0 00227.42-227.42l-52.82 52.82c.31 3.38.47 6.79.47 10.25a111.94 111.94 0 01-112 112z"}}]},name:"eye-invisible",theme:"outlined"},Ot=function(r,a){return o.createElement(Ge,ve({},r,{ref:a,icon:Rt}))},It=o.forwardRef(Ot),$t={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"}}]},name:"eye",theme:"outlined"},Pt=function(r,a){return o.createElement(Ge,ve({},r,{ref:a,icon:$t}))},Nt=o.forwardRef(Pt),At=function(e,r){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)r.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(a[t[n]]=e[t[n]]);return a};const _t=e=>e?o.createElement(Nt,null):o.createElement(It,null),jt={click:"onClick",hover:"onMouseOver"},Ft=o.forwardRef((e,r)=>{const{disabled:a,action:t="click",visibilityToggle:n=!0,iconRender:d=_t}=e,l=typeof n=="object"&&n.visible!==void 0,[i,z]=o.useState(()=>l?n.visible:!1),m=o.useRef(null);o.useEffect(()=>{l&&z(n.visible)},[l,n]);const C=et(m),y=()=>{a||(i&&C(),z(p=>{var g;const F=!p;return typeof n=="object"&&((g=n.onVisibleChange)===null||g===void 0||g.call(n,F)),F}))},O=p=>{const g=jt[t]||"",F=d(i),A={[g]:y,className:`${p}-icon`,key:"passwordIcon",onMouseDown:h=>{h.preventDefault()},onMouseUp:h=>{h.preventDefault()}};return o.cloneElement(o.isValidElement(F)?F:o.createElement("span",null,F),A)},{className:T,prefixCls:S,inputPrefixCls:$,size:K}=e,M=At(e,["className","prefixCls","inputPrefixCls","size"]),{getPrefixCls:N}=o.useContext(ge),c=N("input",$),I=N("input-password",S),B=n&&O(I),R=k(I,T,{[`${I}-${K}`]:!!K}),E=Object.assign(Object.assign({},Xe(M,["suffix","iconRender","visibilityToggle"])),{type:i?"text":"password",className:R,prefixCls:c,suffix:B});return K&&(E.size=K),o.createElement(Ee,Object.assign({ref:Te(r,m)},E))});var Tt=function(e,r){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)r.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(a[t[n]]=e[t[n]]);return a};const Mt=o.forwardRef((e,r)=>{const{prefixCls:a,inputPrefixCls:t,className:n,size:d,suffix:l,enterButton:i=!1,addonAfter:z,loading:m,disabled:C,onSearch:y,onChange:O,onCompositionStart:T,onCompositionEnd:S}=e,$=Tt(e,["prefixCls","inputPrefixCls","className","size","suffix","enterButton","addonAfter","loading","disabled","onSearch","onChange","onCompositionStart","onCompositionEnd"]),{getPrefixCls:K,direction:M}=o.useContext(ge),N=o.useRef(!1),c=K("input-search",a),I=K("input",t),{compactSize:B}=qe(c,M),R=we(x=>{var s;return(s=d??B)!==null&&s!==void 0?s:x}),E=o.useRef(null),p=x=>{x&&x.target&&x.type==="click"&&y&&y(x.target.value,x,{source:"clear"}),O&&O(x)},g=x=>{var s;document.activeElement===((s=E.current)===null||s===void 0?void 0:s.input)&&x.preventDefault()},F=x=>{var s,u;y&&y((u=(s=E.current)===null||s===void 0?void 0:s.input)===null||u===void 0?void 0:u.value,x,{source:"input"})},A=x=>{N.current||m||F(x)},h=typeof i=="boolean"?o.createElement(ft,null):null,D=`${c}-button`;let w;const V=i||{},G=V.type&&V.type.__ANT_BUTTON===!0;G||V.type==="button"?w=ke(V,Object.assign({onMouseDown:g,onClick:x=>{var s,u;(u=(s=V?.props)===null||s===void 0?void 0:s.onClick)===null||u===void 0||u.call(s,x),F(x)},key:"enterButton"},G?{className:D,size:R}:{})):w=o.createElement(dt,{className:D,type:i?"primary":void 0,size:R,disabled:C,key:"enterButton",onMouseDown:g,onClick:F,loading:m,icon:h},i),z&&(w=[w,ke(z,{key:"addonAfter"})]);const H=k(c,{[`${c}-rtl`]:M==="rtl",[`${c}-${R}`]:!!R,[`${c}-with-button`]:!!i},n),W=x=>{N.current=!0,T?.(x)},X=x=>{N.current=!1,S?.(x)};return o.createElement(Ee,Object.assign({ref:Te(E,r),onPressEnter:A},$,{size:R,onCompositionStart:W,onCompositionEnd:X,prefixCls:I,addonAfter:w,suffix:l,onChange:p,className:H,disabled:C}))});var Vt=`
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
  pointer-events: none !important;
`,Bt=["letter-spacing","line-height","padding-top","padding-bottom","font-family","font-weight","font-size","font-variant","text-rendering","text-transform","width","text-indent","padding-left","padding-right","border-width","box-sizing","word-break","white-space"],Ie={},Q;function Dt(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=e.getAttribute("id")||e.getAttribute("data-reactid")||e.getAttribute("name");if(r&&Ie[a])return Ie[a];var t=window.getComputedStyle(e),n=t.getPropertyValue("box-sizing")||t.getPropertyValue("-moz-box-sizing")||t.getPropertyValue("-webkit-box-sizing"),d=parseFloat(t.getPropertyValue("padding-bottom"))+parseFloat(t.getPropertyValue("padding-top")),l=parseFloat(t.getPropertyValue("border-bottom-width"))+parseFloat(t.getPropertyValue("border-top-width")),i=Bt.map(function(m){return"".concat(m,":").concat(t.getPropertyValue(m))}).join(";"),z={sizingStyle:i,paddingSize:d,borderSize:l,boxSizing:n};return r&&a&&(Ie[a]=z),z}function Lt(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:null,t=arguments.length>3&&arguments[3]!==void 0?arguments[3]:null;Q||(Q=document.createElement("textarea"),Q.setAttribute("tab-index","-1"),Q.setAttribute("aria-hidden","true"),document.body.appendChild(Q)),e.getAttribute("wrap")?Q.setAttribute("wrap",e.getAttribute("wrap")):Q.removeAttribute("wrap");var n=Dt(e,r),d=n.paddingSize,l=n.borderSize,i=n.boxSizing,z=n.sizingStyle;Q.setAttribute("style","".concat(z,";").concat(Vt)),Q.value=e.value||e.placeholder||"";var m=void 0,C=void 0,y,O=Q.scrollHeight;if(i==="border-box"?O+=l:i==="content-box"&&(O-=d),a!==null||t!==null){Q.value=" ";var T=Q.scrollHeight-d;a!==null&&(m=T*a,i==="border-box"&&(m=m+d+l),O=Math.max(m,O)),t!==null&&(C=T*t,i==="border-box"&&(C=C+d+l),y=O>C?"":"hidden",O=Math.min(C,O))}var S={height:O,overflowY:y,resize:"none"};return m&&(S.minHeight=m),C&&(S.maxHeight=C),S}var kt=["prefixCls","onPressEnter","defaultValue","value","autoSize","onResize","className","style","disabled","onChange","onInternalAutoSize"],$e=0,Pe=1,Ne=2,Kt=o.forwardRef(function(e,r){var a=e,t=a.prefixCls;a.onPressEnter;var n=a.defaultValue,d=a.value,l=a.autoSize,i=a.onResize,z=a.className,m=a.style,C=a.disabled,y=a.onChange;a.onInternalAutoSize;var O=Se(a,kt),T=je(n,{value:d,postState:function(_){return _??""}}),S=ne(T,2),$=S[0],K=S[1],M=function(_){K(_.target.value),y?.(_)},N=o.useRef();o.useImperativeHandle(r,function(){return{textArea:N.current}});var c=o.useMemo(function(){return l&&We(l)==="object"?[l.minRows,l.maxRows]:[]},[l]),I=ne(c,2),B=I[0],R=I[1],E=!!l,p=function(){try{if(document.activeElement===N.current){var _=N.current,f=_.selectionStart,Y=_.selectionEnd,re=_.scrollTop;N.current.setSelectionRange(f,Y),N.current.scrollTop=re}}catch{}},g=o.useState(Ne),F=ne(g,2),A=F[0],h=F[1],D=o.useState(),w=ne(D,2),V=w[0],G=w[1],H=function(){h($e)};Ke(function(){E&&H()},[d,B,R,E]),Ke(function(){if(A===$e)h(Pe);else if(A===Pe){var v=Lt(N.current,!1,B,R);h(Ne),G(v)}else p()},[A]);var W=o.useRef(),X=function(){Ae.cancel(W.current)},x=function(_){A===Ne&&(i?.(_),l&&(X(),W.current=Ae(function(){H()})))};o.useEffect(function(){return X},[]);var s=E?V:null,u=Z(Z({},m),s);return(A===$e||A===Pe)&&(u.overflowY="hidden",u.overflowX="hidden"),o.createElement(st,{onResize:x,disabled:!(l||i)},o.createElement("textarea",ve({},O,{ref:N,style:u,className:k(t,z,Ce({},"".concat(t,"-disabled"),C)),disabled:C,value:$,onChange:M})))}),Ht=["defaultValue","value","onFocus","onBlur","onChange","allowClear","maxLength","onCompositionStart","onCompositionEnd","suffix","prefixCls","showCount","count","className","style","disabled","hidden","classNames","styles","onResize"],Wt=j.forwardRef(function(e,r){var a,t,n=e.defaultValue,d=e.value,l=e.onFocus,i=e.onBlur,z=e.onChange,m=e.allowClear,C=e.maxLength,y=e.onCompositionStart,O=e.onCompositionEnd,T=e.suffix,S=e.prefixCls,$=S===void 0?"rc-textarea":S,K=e.showCount,M=e.count,N=e.className,c=e.style,I=e.disabled,B=e.hidden,R=e.classNames,E=e.styles,p=e.onResize,g=Se(e,Ht),F=je(n,{value:d,defaultValue:n}),A=ne(F,2),h=A[0],D=A[1],w=h==null?"":String(h),V=j.useState(!1),G=ne(V,2),H=G[0],W=G[1],X=j.useRef(!1),x=j.useState(null),s=ne(x,2),u=s[0],v=s[1],_=o.useRef(null),f=function(){var P;return(P=_.current)===null||P===void 0?void 0:P.textArea},Y=function(){f().focus()};o.useImperativeHandle(r,function(){return{resizableTextArea:_.current,focus:Y,blur:function(){f().blur()}}}),o.useEffect(function(){W(function(U){return!I&&U})},[I]);var re=j.useState(null),ce=ne(re,2),ie=ce[0],pe=ce[1];j.useEffect(function(){if(ie){var U;(U=f()).setSelectionRange.apply(U,Fe(ie))}},[ie]);var q=Qe(M,K),ae=(a=q.max)!==null&&a!==void 0?a:C,J=Number(ae)>0,se=q.strategy(w),ze=!!ae&&se>ae,xe=function(P,te){var ue=te;!X.current&&q.exceedFormatter&&q.max&&q.strategy(te)>q.max&&(ue=q.exceedFormatter(te,{max:q.max}),te!==ue&&pe([f().selectionStart||0,f().selectionEnd||0])),D(ue),ye(P.currentTarget,P,z,ue)},Re=function(P){X.current=!0,y?.(P)},Oe=function(P){X.current=!1,xe(P,P.currentTarget.value),O?.(P)},L=function(P){xe(P,P.target.value)},b=function(P){var te=g.onPressEnter,ue=g.onKeyDown;P.key==="Enter"&&te&&te(P),ue?.(P)},ee=function(P){W(!0),l?.(P)},de=function(P){W(!1),i?.(P)},oe=function(P){D(""),Y(),ye(f(),P,z)},fe=T,le;q.show&&(q.showFormatter?le=q.showFormatter({value:w,count:se,maxLength:ae}):le="".concat(se).concat(J?" / ".concat(ae):""),fe=j.createElement(j.Fragment,null,fe,j.createElement("span",{className:k("".concat($,"-data-count"),R?.count),style:E?.count},le)));var tt=function(P){var te;p?.(P),(te=f())!==null&&te!==void 0&&te.style.height&&v(!0)},nt=!g.autoSize&&!K&&!m;return j.createElement(Ye,{value:w,allowClear:m,handleReset:oe,suffix:fe,prefixCls:$,classNames:Z(Z({},R),{},{affixWrapper:k(R?.affixWrapper,(t={},Ce(t,"".concat($,"-show-count"),K),Ce(t,"".concat($,"-textarea-allow-clear"),m),t))}),disabled:I,focused:H,className:k(N,ze&&"".concat($,"-out-of-range")),style:Z(Z({},c),u&&!nt?{height:"auto"}:{}),dataAttrs:{affixWrapper:{"data-count":typeof le=="string"?le:void 0}},hidden:B},j.createElement(Kt,ve({},g,{maxLength:C,onKeyDown:b,onChange:L,onFocus:ee,onBlur:de,onCompositionStart:Re,onCompositionEnd:Oe,className:k(R?.textarea),style:Z(Z({},E?.textarea),{},{resize:c?.resize}),disabled:I,prefixCls:$,onResize:tt,ref:_})))}),Xt=function(e,r){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)r.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(a[t[n]]=e[t[n]]);return a};const qt=o.forwardRef((e,r)=>{var a,t;const{prefixCls:n,bordered:d=!0,size:l,disabled:i,status:z,allowClear:m,classNames:C,rootClassName:y,className:O,style:T,styles:S,variant:$}=e,K=Xt(e,["prefixCls","bordered","size","disabled","status","allowClear","classNames","rootClassName","className","style","styles","variant"]),{getPrefixCls:M,direction:N,textArea:c}=o.useContext(ge),I=we(l),B=o.useContext(Ue),R=i??B,{status:E,hasFeedback:p,feedbackIcon:g}=o.useContext(me),F=Be(E,z),A=o.useRef(null);o.useImperativeHandle(r,()=>{var x;return{resizableTextArea:(x=A.current)===null||x===void 0?void 0:x.resizableTextArea,focus:s=>{var u,v;xt((v=(u=A.current)===null||u===void 0?void 0:u.resizableTextArea)===null||v===void 0?void 0:v.textArea,s)},blur:()=>{var s;return(s=A.current)===null||s===void 0?void 0:s.blur()}}});const h=M("input",n),D=Ve(h),[w,V,G]=Me(h,D),[H,W]=Ze($,d),X=Je(m??c?.allowClear);return w(o.createElement(Wt,Object.assign({autoComplete:c?.autoComplete},K,{style:Object.assign(Object.assign({},c?.style),T),styles:Object.assign(Object.assign({},c?.styles),S),disabled:R,allowClear:X,className:k(G,D,O,y,c?.className),classNames:Object.assign(Object.assign(Object.assign({},C),c?.classNames),{textarea:k({[`${h}-sm`]:I==="small",[`${h}-lg`]:I==="large"},V,C?.textarea,(a=c?.classNames)===null||a===void 0?void 0:a.textarea),variant:k({[`${h}-${H}`]:W},_e(h,F)),affixWrapper:k(`${h}-textarea-affix-wrapper`,{[`${h}-affix-wrapper-rtl`]:N==="rtl",[`${h}-affix-wrapper-sm`]:I==="small",[`${h}-affix-wrapper-lg`]:I==="large",[`${h}-textarea-show-count`]:e.showCount||((t=e.count)===null||t===void 0?void 0:t.show)},V)}),prefixCls:h,suffix:p&&o.createElement("span",{className:`${h}-textarea-suffix`},g),ref:A})))}),he=Ee;he.Group=pt;he.Search=Mt;he.TextArea=qt;he.Password=Ft;he.OTP=zt;export{he as I,Nt as R,Qt as g};
