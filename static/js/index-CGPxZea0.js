import{j as e}from"./rainbowkit-ZaMAlka6.js";import{S as c}from"./useManageContract-DKkd6uHn.js";const p=({min:l=5,max:i=35,step:t,value:a=0,minPrice:o=0,maxPrice:m=0,defaultValue:n=0,onChange:r})=>{const d=s=>{const x=s/100;r&&r(x)};return e.jsxs("div",{className:"flex-1 flex items-center progress",children:[e.jsxs("div",{className:"mr-[14px]",children:[o,"ETH"]})," ",e.jsx(c,{className:"flex-1 progress_slider",min:l*100,max:i*100,step:t,value:a*100,defaultValue:n*100,onChange:d,tipFormatter:s=>`${s}%`,tooltip:{open:!0}}),e.jsxs("div",{className:"ml-[14px]",children:[m," ETH"]})]})},u=p;export{u as M};