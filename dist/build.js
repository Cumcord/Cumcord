(()=>{function fe(){let e=window.webpackJsonp.push([[],{cum:(t,n,o)=>t.exports=o},[["cum"]]]);return e.m.cum=void 0,delete e.m.cum,e.c.cum=void 0,delete e.c.cum,e.c}function J(e,t){let n=[];for(let o in e)if(e.hasOwnProperty(o)){let r=e[o].exports;r&&(r.default&&r.__esModule&&t(r.default)&&n.push(r.default),t(r)&&n.push(r))}return n}var c={modules:fe(),find:e=>J(c.modules,e)[0],findAll:e=>J(c.modules,e),findByProps:(...e)=>c.find(t=>e.every(n=>t[n]!==void 0)),findByPropsAll:(...e)=>c.findAll(t=>e.every(n=>t[n]!==void 0)),findByPrototypes:(...e)=>c.find(t=>t.prototype&&e.every(n=>t.prototype[n]!==void 0)),findByDisplayName:e=>c.find(t=>t.displayName===e),findByStringInPropsAll:(...e)=>c.findAll(t=>e.every(n=>Object.keys(t).some(o=>o.toLowerCase().includes(n.toLowerCase()))==!0))},je=c.find,Fe=c.findAll,ze=c.findByProps,Ue=c.findByPropsAll,Le=c.findByPrototypes,Re=c.findByDisplayName,Je=c.findByStringInPropsAll,s=c;var g={constants:s.findByProps("API_HOST","APP_URL_PREFIX"),channels:s.findByProps("getChannelId","getVoiceChannelId"),Flux:s.findByProps("CachedStore","Store","connectStores"),FluxDispatcher:s.findByProps("_currentDispatchActionType","_subscriptions","_waitQueue"),i18n:s.findByProps("Messages","_requestedLocale"),React:s.findByProps("__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED","createElement"),ReactDOM:s.findByProps("__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED","hydrate")},i=g.React,A=g.ReactDOM,Ve=g.Flux,Ge=g.FluxDispatcher,We=g.constants,Ye=g.channels,qe=g.i18n,H=g;var me={log:e=>{console.log(`%cCumcord%c ${e}`,"background-color: #7289da; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold","")}},I=me;var $=s.findByProps("v4").v4,p=[];function x(e){let t=document.createElement("style");return t.className="CUMCORD_INJECTED_CSS",t.textContent=e,document.head.appendChild(t),()=>{t.remove()}}function V(){for(let e of document.querySelectorAll(".CUMCORD_INJECTED_CSS"))e.remove()}function j(e,t,n,o){if(!(o=="before"||o=="instead"||o=="after"))throw new Error("Go fuck yourself.");if(typeof t[e]!="function")throw new Error(`${e} is not a function in ${t.constructor.name}`);if(Object.hasOwnProperty.bind(t)("CUMCORD_INJECTIONS")||(t.CUMCORD_INJECTIONS={}),!t.CUMCORD_INJECTIONS.hasOwnProperty(e)){let u=$();t.CUMCORD_INJECTIONS[e]=u}let r=t.CUMCORD_INJECTIONS[e];if(!p[r]){let u=Object.assign({},t)[e];p[r]={originalFunction:u,functionParent:t,functionName:e,hooks:{before:{},instead:{},after:{}}},t[e]=function(...f){return ge(r,f,this)}}let a=$();return p[r].hooks[o][a]=n,()=>W(r,a,o)}function ge(e,t,n){let o=p[e],r=o.hooks,a=t;for(let d in r.before){let w=r.before[d].call(n,a);Array.isArray(w)&&(a=w)}let u,f=Object.values(r.instead),m=(...d)=>o.originalFunction.call(n,...d);if(f.length>0){let d=y=>f[0].call(n,y,m);for(let y of f.slice(1)){let w=d;d=pe=>y.call(n,pe,w)}u=d(a)}else u=m(...a);for(let d in r.after){let w=r.after[d].call(n,a,u);typeof w!="undefined"&&(u=w)}return u}function G(e,t,n){return j(e,t,n,"before")}function k(e,t,n){return j(e,t,n,"instead")}function S(e,t,n){return j(e,t,n,"after")}function W(e,t,n){let o=p[e];if(o){let r=o.hooks;if(r[n][t])return delete r[n][t],o.functionParent.CUMCORD_INJECTIONS[o.functionName]=void 0,delete o.functionParent.CUMCORD_INJECTIONS[o.functionName],Object.keys(r).every(u=>Object.values(r[u]).length==0)&&(o.functionParent[o.functionName]=o.originalFunction,delete o.functionParent.CUMCORD_INJECTIONS,p[e]=void 0,delete p[e]),!0}return!1}function Y(){for(let e in p)for(let t of Object.keys(p[e].hooks)){if(!p[e])return;let n=p[e].hooks[t];for(let o in n)W(e,o,t)}}function he(){if(!(!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent))||!indexedDB.databases)return Promise.resolve();let t;return new Promise(n=>{let o=()=>indexedDB.databases().finally(n);t=setInterval(o,100),o()}).finally(()=>clearInterval(t))}var q=he;function F(e){return new Promise((t,n)=>{e.oncomplete=e.onsuccess=()=>t(e.result),e.onabort=e.onerror=()=>n(e.error)})}function ye(e,t){let n=q().then(()=>{let o=indexedDB.open(e);return o.onupgradeneeded=()=>o.result.createObjectStore(t),F(o)});return(o,r)=>n.then(a=>r(a.transaction(t,o).objectStore(t)))}var z;function Q(){return z||(z=ye("keyval-store","keyval")),z}function X(e,t=Q()){return t("readonly",n=>F(n.get(e)))}function v(e,t,n=Q()){return n("readwrite",o=>(o.put(t,e),F(o.transaction)))}var we=eval,D={cache:"no-store"},K="https://cors.bridged.cc/",h={},l={};function Z(){for(let e of Object.keys(l))try{B(e)}catch{}}function b(e){return l[e]}function N(e,t){l[e]=t,v("CumcordCache",l)}function M(e){let t=b(e);if(!t)throw new Error(`Plugin ${e} not found`);if(h[e])throw new Error(`Plugin ${e} already loaded`);let n=we(t.js);h[e]=n;try{n.onLoad()}catch{}}function B(e){if(!b(e))throw new Error(`Plugin ${e} not found`);let n=h[e];if(n)n.onUnload(),h[e]=void 0,delete h[e];else throw new Error(`Plugin ${e} not loaded`)}function E(e){try{B(e)}catch{}l[e]=void 0,delete l[e],v("CumcordCache",l)}async function ee(){let e=await X("CumcordCache");h={},e?l=e:(await v("CumcordCache",{}),l={});for(let t of Object.keys(l))C(t)}function xe(e){let t=b(e);h[e]&&B(e),M(e),t.enabled||(t.enabled=!0,N(e,t))}function be(e){let t=b(e);h[e]&&B(e),t.enabled&&(t.enabled=!1,N(e,t))}function O(e){b(e).enabled?be(e):xe(e)}async function C(e){let t=e.replace(/\/?$/,"/"),n=new URL("plugin.json",t),o=new URL("plugin.js",t),r=!0,a=b(t),u=!1,f,m;try{f=await fetch(n,D)}catch{u=!0,f=await fetch(K+n,D)}if(f.status!=200&&!a)throw new Error("Plugin manifest not returning success");try{m=await f.json()}catch{if(!a)throw new Error("Plugin manifest cannot be parsed")}if(a)if(r=a.enabled,m){if(a.manifest.hash==m.hash&&(a.manifest!=m&&(a.manifest=m,N(t,a)),r)){M(t);return}}else{r&&M(t);return}let d;if(u?d=await await fetch(K+o,D):d=await await fetch(o,D),d.status!=200)throw new Error("Plugin not returning success");let y=await d.text();N(t,{manifest:m,js:y,enabled:r}),r&&M(t)}var Ce=i.useState,Pe=s.findByDisplayName("Card"),ke=s.findByDisplayName("Header"),Se=s.findByDisplayName("Text"),U=s.findByDisplayName("Flex"),ve=s.findByDisplayName("Markdown"),De=s.findByDisplayName("Switch"),{Separator:lt}=s.findByProps("Separator"),te=e=>{let t=l[e.pluginId],[n,o]=Ce(t.enabled);return i.createElement(Pe,{className:"cumcord-plugin-card",type:"cardPrimary",outline:!1,editable:!1},i.createElement(U,{justify:U.Justify.BETWEEN,align:U.Align.CENTER},i.createElement("div",{className:"cumcord-card-header"},i.createElement(ke,{className:"cumcord-card-title"},t.manifest.name),i.createElement(Se,{className:"cumcord-card-author",tag:"h5"}," ","by ",i.createElement("strong",null,t.manifest.author))),i.createElement("div",{className:"cumcord-card-right"},i.createElement("div",{className:"cumcord-card-buttons"},i.createElement("svg",{onClick:()=>{E(e.pluginId),e.updatePlugins()},className:"cumcord-card-delete",xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px"},i.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),i.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none"}),i.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"}))),i.createElement(De,{checked:n,onChange:()=>{try{O(e.pluginId),o(t.enabled)}catch{}}}))),i.createElement(ve,null,t.manifest.description))};var ne=i.useState,Ne=s.findByDisplayName("FormTitle"),Me=s.findByDisplayName("FormSection"),Be=s.findByDisplayName("Flex"),Ee=s.findByDisplayName("TextInput"),L=s.findByProps("Sizes","Colors","Looks","DropdownSizes"),Oe=s.findByDisplayName("FormDivider"),oe=()=>{let[e,t]=ne(""),[n,o]=ne(Object.keys(l)),r=()=>{o(Object.keys(l))};return i.createElement(Me,null,i.createElement(Ne,{tag:"h1"},"Plugins"),i.createElement(Be,{basis:"auto",grow:1,shrink:1},i.createElement(Ee,{className:"cumcord-plugin-import",placeholder:"https://example.com/plugin",type:"text",value:e,onChange:a=>t(a)}),i.createElement(L,{color:L.Colors.BRAND,size:L.Sizes.MEDIUM,onClick:()=>{t(""),C(e).then(()=>{r()})}},"Add plugin")),i.createElement(Oe,{className:"cumcord-plugin-divider"}),n.map(a=>i.createElement(te,{updatePlugins:r,pluginId:a})))};var ie={initializeSettings:function(){x(".cumcord-plugin-card{padding:16px;margin-bottom:10px}.cumcord-plugin-import{flex-grow:1;margin-right:20px}.cumcord-plugin-divider{margin-top:20px;margin-bottom:20px}.cumcord-card-header{display:inline-block}.cumcord-card-author,.cumcord-card-title{display:inline}.cumcord-card-right{display:flex}.cumcord-card-delete{fill:var(--interactive-normal);cursor:pointer;width:20px}.cumcord-card-delete:hover{fill:var(--interactive-hover)}.cumcord-card-buttons{display:flex;margin-right:4px}");let e=s.findByDisplayName("SettingsView");S("getPredicateSections",e.prototype,(t,n)=>{let o=n.findIndex(a=>a.section=="changelog")-1;if(o<0)return n;let r=[{section:"DIVIDER"},{section:"HEADER",label:"Cumcord"},{section:"CUMCORD_PLUGINS",label:"Plugins",element:oe}];return n.splice(o,0,...r),n})}};var _=[];function re(){window.DiscordNative&&k("handleConnection",s.findByProps("handleConnection").__proto__,(e,t)=>{let n=e[0];if(n.upgradeReq().url=="/cumcord")_.push(n),n.send("Welcome to the Cumcord websocket API :D"),n.on("message",o=>{n.send(`You said: ${o}`)}),n.on("close",()=>{_.splice(_.indexOf(n),1)});else return t(...e)})}function se(){if(window.DiscordNative)for(let e of _)e.close()}var _e=s.findByDisplayName("Card"),Te=s.findByDisplayName("Header"),kt=s.findByDisplayName("Text"),St=s.findByDisplayName("Markdown"),ae=e=>i.createElement(_e,{className:"cumcord-toast",type:"cardPrimary",outline:!1,editable:!1},i.createElement("div",{className:"cumcord-toast-header"},i.createElement(Te,{className:"cumcord-toast-title"},e.children)));var P=document.createElement("div"),T=[];function R(){A.render(i.createElement("div",null,T),P)}function ce(){x(".cumcord-toast-container{position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;display:flex;flex-direction:column-reverse;align-items:flex-end;z-index:999999}.cumcord-toast{min-width:120px;min-height:50px;padding:5px;margin-right:10px;margin-bottom:10px;display:flex;justify-content:center;align-items:center;align-content:center;pointer-events:all}.cumcord-toast-title{font-size:30px;top:0;bottom:0;left:0;right:0}"),P.className="cumcord-toast-container",document.getElementById("app-mount").prepend(P),R()}function le(){A.unmountComponentAtNode(P),P.remove()}function ue(e){let t=i.createElement(ae,null,e.title);T.push(t),R();let n=()=>{T.splice(T.indexOf(t),1),R()},o=setTimeout(()=>{n(),clearTimeout(o)},e.duration);return n}function Ae(){return Z(),se(),Y(),le(),V(),window.cumcord=void 0,delete window.cumcord,!0}async function Ie(){I.log("Initializing Cumcord API"),window.cumcord={uninject:Ae,modules:{webpackModules:s,common:H},plugins:{importPlugin:C,removePlugin:E,togglePlugin:O},patcher:{before:G,after:S,instead:k,injectCSS:x},ui:{toasts:{showToast:ue}},cum:()=>I.log("8==D ~~~")},ce(),ee(),ie.initializeSettings(),re()}var de=Ie;if(window.cumcord)throw new Error("Cumcord is already injected");de();})();
