/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
export class HashState{static parse(t,e){decodeURIComponent(t).replace(/#?([^=&]+)=([^=&]+)/gm,function(t,s,r){let a,o=e;for(;(a=s.indexOf("."))>-1;)o[s.substr(0,a)]=o[s.substr(0,a)]||{},o=o[s.substr(0,a)],s=s.substr(a+1);"true"==r||"false"==r?r="true"==r:isNaN(r)||(r=Number(r)),o[s]=r})}static save(t){const e={},s=(t,r)=>{if(Object(t)!==t)e[r]=t;else{let a=!0;for(const e in t)Object.prototype.hasOwnProperty.call(t,e)&&(a=!1,s(t[e],r?r+"."+e:e));a&&""!=r&&(e[r]={})}};return s(t,""),Object.keys(e).map(t=>`${t}=${e[t]}`).join("&")}}