(()=>{function v(e,t,{walkable:n=null,ignore:o=[],limit:i=100}={}){let a=0;function u(l,d,{walkable:c=null,ignore:f=[]}={}){if(a+=1,a>i)return null;if(typeof d=="string"){if(l.hasOwnProperty(d))return l[d]}else if(d(l))return l;if(l){if(Array.isArray(l))for(let g of l){let x=u(g,d,{walkable:c,ignore:f});if(x)return x}else if(typeof l=="object")for(let g of Object.keys(l)){if(c!=null&&!c.includes(g)||f.includes(g))continue;let x=u(l[g],d,{walkable:c,ignore:f});if(x)return x}}}return u(e,t,{walkable:n,ignore:o})}function L(e,t,n){console[n]("%cCumcord%c",`background-color: ${t}; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold`,"",...e)}var De={log:(...e)=>{L(e,"#7289da","log")},error:(...e)=>{L(e,"red","error")},warn:(...e)=>{L(e,"red","warn")}},h=De;function Q(e,t){return v(e,t,{walkable:["props","children","child","sibling"]})}function Ne(){let e=window.webpackJsonp.push([[],{cum:(t,n,o)=>t.exports=o},[["cum"]]]);return e.m.cum=void 0,delete e.m.cum,e.c.cum=void 0,delete e.c.cum,e.c}function X(e,t){let n=[];for(let o in e)if(e.hasOwnProperty(o)){let i=e[o].exports;i&&(i.default&&i.__esModule&&t(i.default)&&n.push(i.default),t(i)&&n.push(i))}return n}var p={modules:Ne(),find:e=>X(p.modules,e)[0],findAll:e=>X(p.modules,e),findByProps:(...e)=>p.find(t=>e.every(n=>t[n]!==void 0)),findByPropsAll:(...e)=>p.findAll(t=>e.every(n=>t[n]!==void 0)),findByPrototypes:(...e)=>p.find(t=>t.prototype&&e.every(n=>t.prototype[n]!==void 0)),findByDisplayName:e=>p.find(t=>t.displayName===e),findByStrings:(...e)=>p.find(t=>{if(typeof t=="function"){if(e.every(n=>t.toString().includes(n)))return!0}else return v(t,n=>{if(n){for(let o of Object.values(n))if(typeof o=="function"&&e.every(i=>o.toString().includes(i)))return!0}})}),findByKeywordAll:(...e)=>p.findAll(t=>e.every(n=>Object.keys(t).some(o=>o.toLowerCase().includes(n.toLowerCase()))==!0))},at=p.find,lt=p.findAll,k=p.findByProps,ct=p.findByPropsAll,ut=p.findByPrototypes,J=p.findByDisplayName,dt=p.findByStrings,ft=p.findByKeywordAll,s=p;var w={constants:s.findByProps("API_HOST","APP_URL_PREFIX"),channels:s.findByProps("getChannelId","getVoiceChannelId"),Flux:s.findByProps("CachedStore","Store","connectStores"),FluxDispatcher:s.findByProps("_currentDispatchActionType","_subscriptions","_waitQueue"),i18n:s.findByProps("Messages","_requestedLocale"),React:s.findByProps("__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED","createElement"),ReactDOM:s.findByProps("__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED","hydrate"),Redux:s.findByProps("createStore","__DO_NOT_USE__ActionTypes"),zustand:s.find(e=>{if(typeof e=="function"&&e.toString().includes("[useStore, api] = create() is deprecated and will be removed in v4"))return e})},r=w.React,H=w.ReactDOM,gt=w.Flux,ht=w.FluxDispatcher,yt=w.Redux,wt=w.constants,Ct=w.channels,xt=w.i18n,Z=w.zustand,ee=w;var te=s.findByProps("v4").v4,y=[];function M(e){let t=document.createElement("style");return t.className="CUMCORD_INJECTED_CSS",t.textContent=e,document.head.appendChild(t),()=>{t.remove()}}function ne(){for(let e of document.querySelectorAll(".CUMCORD_INJECTED_CSS"))e.remove()}function $(e,t,n,o){if(!(o=="before"||o=="instead"||o=="after"))throw new Error("Go fuck yourself.");if(typeof t[e]!="function")throw new Error(`${e} is not a function in ${t.constructor.name}`);if(Object.hasOwnProperty.bind(t)("CUMCORD_INJECTIONS")||(t.CUMCORD_INJECTIONS={}),!t.CUMCORD_INJECTIONS.hasOwnProperty(e)){let u=te();t.CUMCORD_INJECTIONS[e]=u}let i=t.CUMCORD_INJECTIONS[e];if(!y[i]){let u=t[e];y[i]={originalFunction:u,functionParent:t,functionName:e,hooks:{before:{},instead:{},after:{}}},t[e]=function(...l){return Te(i,l,this)}}let a=te();return y[i].hooks[o][a]=n,()=>re(i,a,o)}function Te(e,t,n){let o=y[e],i=o.hooks,a=t;for(let c in i.before){let g=i.before[c].call(n,a);Array.isArray(g)&&(a=g)}let u,l=Object.values(i.instead),d=(...c)=>o.originalFunction.call(n,...c);if(l.length>0){let c=f=>l[0].call(n,f,d);for(let f of l.slice(1)){let g=c;c=x=>f.call(n,x,g)}u=c(a)}else u=d(...a);for(let c in i.after){let g=i.after[c].call(n,a,u);typeof g!="undefined"&&(u=g)}return u}function oe(e,t,n){return $(e,t,n,"before")}function T(e,t,n){return $(e,t,n,"instead")}function B(e,t,n){return $(e,t,n,"after")}function re(e,t,n){let o=y[e];if(o){let i=o.hooks;if(i[n][t])return delete i[n][t],o.functionParent.CUMCORD_INJECTIONS[o.functionName]=void 0,delete o.functionParent.CUMCORD_INJECTIONS[o.functionName],Object.keys(i).every(u=>Object.values(i[u]).length==0)&&(o.functionParent[o.functionName]=o.originalFunction,delete o.functionParent.CUMCORD_INJECTIONS,y[e]=void 0,delete y[e]),!0}return!1}function ie(){for(let e in y)for(let t of Object.keys(y[e].hooks)){if(!y[e])return;let n=y[e].hooks[t];for(let o in n)re(e,o,t)}}function Be(){if(!(!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent))||!indexedDB.databases)return Promise.resolve();let t;return new Promise(n=>{let o=()=>indexedDB.databases().finally(n);t=setInterval(o,100),o()}).finally(()=>clearInterval(t))}var se=Be;function K(e){return new Promise((t,n)=>{e.oncomplete=e.onsuccess=()=>t(e.result),e.onabort=e.onerror=()=>n(e.error)})}function Ee(e,t){let n=se().then(()=>{let o=indexedDB.open(e);return o.onupgradeneeded=()=>o.result.createObjectStore(t),K(o)});return(o,i)=>n.then(a=>i(a.transaction(t,o).objectStore(t)))}var W;function ae(){return W||(W=Ee("keyval-store","keyval")),W}function le(e,t=ae()){return t("readonly",n=>K(n.get(e)))}function E(e,t,n=ae()){return n("readwrite",o=>(o.put(t,e),K(o.transaction)))}var _e=eval,_={cache:"no-store"},ce="https://cors.bridged.cc/",C={},m={};function ue(){for(let e of Object.keys(m))try{R(e)}catch{}}function P(e){return m[e]}function I(e,t){m[e]=t,E("CumcordCache",m)}function A(e){let t=P(e);if(!t)throw new Error(`Plugin ${e} not found`);if(C[e])throw new Error(`Plugin ${e} already loaded`);let n=_e(t.js);C[e]=n;try{n.onLoad()}catch{}}function R(e){if(!P(e))throw new Error(`Plugin ${e} not found`);let n=C[e];if(n)n.onUnload(),C[e]=void 0,delete C[e];else throw new Error(`Plugin ${e} not loaded`)}function j(e){try{R(e)}catch{}m[e]=void 0,delete m[e],E("CumcordCache",m)}async function de(){let e=await le("CumcordCache");C={},e?m=e:(await E("CumcordCache",{}),m={});for(let t of Object.keys(m))b(t)}function Ie(e){let t=P(e);C[e]&&R(e),A(e),t.enabled||(t.enabled=!0,I(e,t))}function Ae(e){let t=P(e);C[e]&&R(e),t.enabled&&(t.enabled=!1,I(e,t))}function U(e){P(e).enabled?Ae(e):Ie(e)}async function b(e){let t=e.replace(/\/?$/,"/"),n=new URL("plugin.json",t),o=new URL("plugin.js",t),i=!0,a=P(t),u=!1,l,d;try{l=await fetch(n,_)}catch{u=!0,l=await fetch(ce+n,_)}if(l.status!=200&&!a)throw new Error("Plugin manifest not returning success");try{d=await l.json()}catch{if(!a)throw new Error("Plugin manifest cannot be parsed")}if(a)if(i=a.enabled,d){if(a.manifest.hash==d.hash&&(a.manifest!=d&&(a.manifest=d,I(t,a)),i)){A(t);return}}else{i&&A(t);return}let c;if(u?c=await await fetch(ce+o,_):c=await await fetch(o,_),c.status!=200)throw new Error("Plugin not returning success");let f=await c.text();I(t,{manifest:d,js:f,enabled:i}),i&&A(t)}var Re=r.useState,je=s.findByDisplayName("Card"),Ue=s.findByDisplayName("Header"),ze=s.findByDisplayName("Text"),V=s.findByDisplayName("Flex"),Fe=s.findByDisplayName("Markdown"),Le=s.findByDisplayName("Switch"),{Separator:_t}=s.findByProps("Separator"),fe=e=>{let t=m[e.pluginId],[n,o]=Re(t.enabled);return r.createElement(je,{className:"cumcord-plugin-card",type:"cardPrimary",outline:!1,editable:!1},r.createElement(V,{justify:V.Justify.BETWEEN,align:V.Align.CENTER},r.createElement("div",{className:"cumcord-card-header"},r.createElement(Ue,{className:"cumcord-card-title"},t.manifest.name),r.createElement(ze,{className:"cumcord-card-author",tag:"h5"}," ","by ",r.createElement("strong",null,t.manifest.author))),r.createElement("div",{className:"cumcord-card-right"},r.createElement("div",{className:"cumcord-card-buttons"},r.createElement("svg",{onClick:()=>{j(e.pluginId),e.updatePlugins()},className:"cumcord-card-delete",xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px"},r.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),r.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none"}),r.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"}))),r.createElement(Le,{checked:n,onChange:()=>{try{U(e.pluginId),o(t.enabled)}catch{}}}))),r.createElement(Fe,null,t.manifest.description))};var pe=r.useState,Je=s.findByDisplayName("FormTitle"),He=s.findByDisplayName("FormSection"),$e=s.findByDisplayName("Flex"),Ke=s.findByDisplayName("TextInput"),G=s.findByProps("Sizes","Colors","Looks","DropdownSizes"),We=s.findByDisplayName("FormDivider"),me=()=>{let[e,t]=pe(""),[n,o]=pe(Object.keys(m)),i=()=>{o(Object.keys(m))};return r.createElement(He,null,r.createElement(Je,{tag:"h1"},"Plugins"),r.createElement($e,{basis:"auto",grow:1,shrink:1},r.createElement(Ke,{className:"cumcord-plugin-import",placeholder:"https://example.com/plugin",type:"text",value:e,onChange:a=>t(a)}),r.createElement(G,{color:G.Colors.BRAND,size:G.Sizes.MEDIUM,onClick:()=>{t(""),b(e).then(()=>{i()})}},"Add plugin")),r.createElement(We,{className:"cumcord-plugin-divider"}),n.map(a=>r.createElement(fe,{updatePlugins:i,pluginId:a})))};var ge={initializeSettings:function(){M(".cumcord-plugin-card{padding:16px;margin-bottom:10px}.cumcord-plugin-import{flex-grow:1;margin-right:20px}.cumcord-plugin-divider{margin-top:20px;margin-bottom:20px}.cumcord-card-header{display:inline-block}.cumcord-card-author,.cumcord-card-title{display:inline}.cumcord-card-right{display:flex}.cumcord-card-delete{fill:var(--interactive-normal);cursor:pointer;width:20px}.cumcord-card-delete:hover{fill:var(--interactive-hover)}.cumcord-card-buttons{display:flex;margin-right:4px}");let e=s.findByDisplayName("SettingsView");B("getPredicateSections",e.prototype,(t,n)=>{let o=n.findIndex(a=>a.section=="changelog")-1;if(o<0)return n;let i=[{section:"DIVIDER"},{section:"HEADER",label:"Cumcord"},{section:"CUMCORD_PLUGINS",label:"Plugins",element:me}];return n.splice(o,0,...i),n})}};var Ve=eval,S=!1,D;function he(e){if(S){if(D){h.log("Unloading previous plugin version...");try{D.onUnload()}catch(t){h.error("Failed to unload:",t)}}D=Ve(e),h.log("Loading new plugin version...");try{D.onLoad()}catch(t){h.error("Failed to load:",t)}}}function ye(){S=!S,S==!1&&(D=void 0),h.log(`Dev mode is now ${S?"on":"off"}.`)}var Ge=k("openModal").openModal,Y=k("button","colorRed"),Ye=J("ConfirmModal"),qe=J("Markdown");async function z({header:e="Are you sure?",confirmText:t="Confirm",cancelText:n="Cancel",content:o="Are you sure you want to do that?",type:i="neutral"}={},a=()=>{}){return new Promise(u=>{var l,d=!1;switch(i.toLowerCase()){case"danger":l=Y.colorRed;break;case"confirm":l=Y.colorGreen;break;default:l=Y.colorBrandNew;break}function c(f){d||(d=!0,a(f),u(f))}Ge(f=>(f.transitionState===3&&c(!1),r.createElement(Ye,{header:e,confirmText:t,cancelText:n,transitionState:f.transitionState,confirmButtonColor:l,onClose:()=>{c(!1)},onCancel:()=>{c(!1),f.onClose()},onConfirm:()=>{c(!0),f.onClose()}},r.createElement(qe,{editable:!1},o))))})}function q(e,t){var n;try{n=JSON.parse(e)}catch{return}switch(n.action.toLowerCase()){case"get_info":t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:n.uuid||Math.random(),status:"OK"}));return;case"install_plugin":if(n.url){if(!n.url.match(/^(http|https):\/\/[^ "]+$/)){t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:n.uuid||Math.random(),status:"ERROR",error:"Invalid URL."}));return}DiscordNative.window.focus(),z({header:"Do you want to install this plugin?",content:`Cumcord plugins can run code on your computer and can be potentially dangerous. Only click confirm if you trust the plugin from \`${n.url}\`.`,confirmText:"Install",cancelText:"Cancel",type:"danger"},o=>{if(o){b(n.url),t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:n.uuid||Math.random(),status:"OK"}));return}else{t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:n.uuid||Math.random(),status:"ERROR",error:"Plugin installation cancelled."}));return}})}else{t.send(JSON.stringify({uuid:n.uuid||Math.random(),status:"ERROR",error:"No URL provided."}));return}return;case"install_plugin_dev":S?n.code?(he(n.code),t.send(JSON.stringify({uuid:n.uuid||Math.random(),status:"OK"}))):t.send(JSON.stringify({uuid:n.uuid||Math.random(),status:"ERROR",message:"No code provided."})):t.send(JSON.stringify({uuid:n.uuid||Math.random(),status:"ERROR",message:"Dev mode not enabled."}));return;default:return}}var F=[];function we(){window.DiscordNative&&T("handleConnection",k("handleConnection").__proto__,(e,t)=>{let n=e[0];if(n.upgradeReq().url=="/cumcord")F.push(n),n.on("message",o=>q(o,n)),n.on("close",()=>{F.splice(F.indexOf(n),1)});else return t(...e)})}function Ce(){if(window.DiscordNative)for(let e of F)e.close()}var Qe=s.findByDisplayName("Card"),Xe=s.findByDisplayName("Header"),nn=s.findByDisplayName("Text"),on=s.findByDisplayName("Markdown"),xe=e=>r.createElement(Qe,{className:"cumcord-toast",type:"cardPrimary",outline:!1,editable:!1},r.createElement("div",{className:"cumcord-toast-header"},r.createElement(Xe,{className:"cumcord-toast-title"},e.children)));var O=Z(e=>({toasts:[]}));function ve(e){let t=O.getState();O.setState({toasts:[...t.toasts,e]})}function be(e){let t=O.getState(),n=t.toasts.indexOf(e);n>-1&&O.setState({toasts:t.toasts.filter((o,i)=>i!==n)})}var Se=()=>{let e=O(t=>t.toasts);return r.createElement(r.Fragment,null,e)};var N=document.createElement("div");function Me(){M(".cumcord-toast-container{position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;display:flex;flex-direction:column-reverse;align-items:flex-end;z-index:999999}.cumcord-toast{min-width:120px;min-height:50px;padding:5px;margin-right:10px;margin-bottom:10px;display:flex;justify-content:center;align-items:center;align-content:center;pointer-events:all}.cumcord-toast-title{font-size:30px;top:0;bottom:0;left:0;right:0}"),N.className="cumcord-toast-container",document.getElementById("app-mount").prepend(N),H.render(r.createElement(Se,null),N)}function Pe(){H.unmountComponentAtNode(N),N.remove()}function Oe(e){let t=r.createElement(xe,null,e.title);ve(t);let n=()=>{be(t)},o=setTimeout(()=>{n(),clearTimeout(o)},e.duration);return n}function Ze(){return ue(),Ce(),ie(),Pe(),ne(),window.cumcord=void 0,delete window.cumcord,!0}async function et(){h.log("Initializing Cumcord API"),window.cumcord={uninject:Ze,modules:{webpackModules:s,common:ee},plugins:{importPlugin:b,removePlugin:j,togglePlugin:U},patcher:{before:oe,after:B,instead:T,injectCSS:M},ui:{toasts:{showToast:Oe},modals:{showConfirmationModal:z}},utils:{logger:h,findInTree:v,findInReactTree:Q},cum:()=>h.log("8==D ~~~")},window.DiscordNative&&(window.cumcord.dev={toggleDevMode:ye}),Me(),de(),ge.initializeSettings(),we()}var ke=et;if(window.cumcord)throw new Error("Cumcord is already injected");ke();})();
