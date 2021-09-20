(()=>{var Ze=Object.create;var X=Object.defineProperty;var et=Object.getOwnPropertyDescriptor;var tt=Object.getOwnPropertyNames;var nt=Object.getPrototypeOf,ot=Object.prototype.hasOwnProperty;var rt=e=>X(e,"__esModule",{value:!0});var D=(e,t)=>()=>(e&&(t=e(e=0)),t);var z=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var it=(e,t,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of tt(t))!ot.call(e,o)&&o!=="default"&&X(e,o,{get:()=>t[o],enumerable:!(n=et(t,o))||n.enumerable});return e},me=e=>it(rt(X(e!=null?Ze(nt(e)):{},"default",e&&e.__esModule&&"default"in e?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);function O(e,t,{walkable:n=null,ignore:o=[],limit:s=100}={}){let u=0;function m(a,c,{walkable:d=null,ignore:f=[]}={}){if(u+=1,u>s)return null;if(typeof c=="string"){if(a.hasOwnProperty(c))return a[c]}else if(c(a))return a;if(a){if(Array.isArray(a))for(let h of a){let S=m(h,c,{walkable:d,ignore:f});if(S)return S}else if(typeof a=="object")for(let h of Object.keys(a)){if(d!=null&&!d.includes(h)||f.includes(h))continue;let S=m(a[h],c,{walkable:d,ignore:f});if(S)return S}}}return m(e,t,{walkable:n,ignore:o})}var pe=D(()=>{i()});function Z(e,t,n){console[n]("%cCumcord%c",`background-color: ${t}; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold`,"",...e)}var st,y,ge=D(()=>{i();st={log:(...e)=>{Z(e,"#7289da","log")},error:(...e)=>{Z(e,"red","error")},warn:(...e)=>{Z(e,"red","warn")}},y=st});function he(e,t){return O(e,t,{walkable:["props","children","child","sibling"]})}var F=D(()=>{i();pe();ge()});function at(){let e=window.webpackJsonp.push([[],{cum:(t,n,o)=>t.exports=o},[["cum"]]]);return e.m.cum=void 0,delete e.m.cum,e.c.cum=void 0,delete e.c.cum,e.c}function ye(e,t){let n=[];for(let o in e)if(e.hasOwnProperty(o)){let s=e[o].exports;s&&(s.default&&s.__esModule&&t(s.default)&&n.push(s.default),t(s)&&n.push(s))}return n}var p,Gt,Wt,j,Vt,qt,ee,Yt,Qt,l,C=D(()=>{i();F();p={modules:at(),find:e=>ye(p.modules,e)[0],findAll:e=>ye(p.modules,e),findByProps:(...e)=>p.find(t=>e.every(n=>t[n]!==void 0)),findByPropsAll:(...e)=>p.findAll(t=>e.every(n=>t[n]!==void 0)),findByPrototypes:(...e)=>p.find(t=>t.prototype&&e.every(n=>t.prototype[n]!==void 0)),findByDisplayName:e=>p.find(t=>t.displayName===e),findByStrings:(...e)=>p.find(t=>{if(typeof t=="function"){if(e.every(n=>t.toString().includes(n)))return!0}else return O(t,n=>{if(n){for(let o of Object.values(n))if(typeof o=="function"&&e.every(s=>o.toString().includes(s)))return!0}})}),findByKeywordAll:(...e)=>p.findAll(t=>e.every(n=>Object.keys(t).some(o=>o.toLowerCase().includes(n.toLowerCase()))==!0))},Gt=p.find,Wt=p.findAll,j=p.findByProps,Vt=p.findByPropsAll,qt=p.findByPrototypes,ee=p.findByDisplayName,Yt=p.findByStrings,Qt=p.findByKeywordAll,l=p});var v,r,te,en,tn,nn,on,rn,sn,we,Ce,E=D(()=>{i();C();v={constants:l.findByProps("API_HOST","APP_URL_PREFIX"),channels:l.findByProps("getChannelId","getVoiceChannelId"),Flux:l.findByProps("CachedStore","Store","connectStores"),FluxDispatcher:l.findByProps("_currentDispatchActionType","_subscriptions","_waitQueue"),i18n:l.findByProps("Messages","_requestedLocale"),React:l.findByProps("__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED","createElement"),ReactDOM:l.findByProps("__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED","hydrate"),Redux:l.findByProps("createStore","__DO_NOT_USE__ActionTypes"),zustand:l.find(e=>{if(typeof e=="function"&&e.toString().includes("[useStore, api] = create() is deprecated and will be removed in v4"))return e})},r=v.React,te=v.ReactDOM,en=v.Flux,tn=v.FluxDispatcher,nn=v.Redux,on=v.constants,rn=v.channels,sn=v.i18n,we=v.zustand,Ce=v});var i=D(()=>{E()});var se=z(ie=>{i();"use strict";Object.defineProperty(ie,"__esModule",{value:!0});ie.default=Object.freeze({GET:"GET",SET:"SET",DEL:"DEL",UPDATE:"UPDATE"})});var Ee=z(A=>{i();"use strict";var dt=A&&A.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(A,"__esModule",{value:!0});var Me=dt(se()),De=class{constructor(){this.listeners=Object.values(Me.default).reduce((t,n)=>(t[n]=new Set,t),{}),this.on=function(t,n){if(this.listeners[t].has(n))throw Error(`This listener on ${t} already exists.`);this.listeners[t].add(n)},this.once=function(t,n){let o=(s,u)=>{this.off(s,o),n(s,u)};this.on(t,o)},this.off=function(t,n){this.listeners[t].delete(n)},this.emit=function(t,n){for(let o of this.listeners[t])o(t,n)};for(let t of Object.values(Me.default))this[t.toLowerCase()]=n=>{this.emit(t,n)}}};A.default=De});var ke=z(I=>{i();"use strict";var ft=I&&I.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(I,"__esModule",{value:!0});var mt=ft(Ee());function pt(e,{nestArrays:t=!0}={}){let n=new mt.default;function o(s,u=e,m=[]){return new Proxy(s,{get(a,c){let d=[...m,c],f=a[c];return f!=null?(n.get({path:d,value:f}),!t&&Array.isArray(f)?f:typeof f=="object"?o(f,u,d):f):o(a[c]={},u,d)},set(a,c,d){return a[c]=d,n.set({path:[...m,c],value:d}),!0},deleteProperty(a,c){return delete a[c]?(n.del({path:[...m,c]}),!0):!1},has(a,c){return typeof a[c]=="object"&&Object.keys(a[c]).length===0?!1:c in a}})}return Object.assign({store:o(e),ghost:e},n)}I.default=pt});var ae=z(b=>{i();"use strict";var Te=b&&b.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(b,"__esModule",{value:!0});b.make=b.Events=void 0;var gt=se();Object.defineProperty(b,"Events",{enumerable:!0,get:function(){return Te(gt).default}});var ht=ke();Object.defineProperty(b,"make",{enumerable:!0,get:function(){return Te(ht).default}})});i();i();C();E();i();C();i();C();var ve=l.findByProps("v4").v4,w=[];function k(e){let t=document.createElement("style");return t.className="CUMCORD_INJECTED_CSS",t.textContent=e,document.head.appendChild(t),()=>{t.remove()}}function be(){for(let e of document.querySelectorAll(".CUMCORD_INJECTED_CSS"))e.remove()}function ne(e,t,n,o){if(!(o=="before"||o=="instead"||o=="after"))throw new Error("Go fuck yourself.");if(typeof t[e]!="function")throw new Error(`${e} is not a function in ${t.constructor.name}`);if(Object.hasOwnProperty.bind(t)("CUMCORD_INJECTIONS")||(t.CUMCORD_INJECTIONS={}),!t.CUMCORD_INJECTIONS.hasOwnProperty(e)){let m=ve();t.CUMCORD_INJECTIONS[e]=m}let s=t.CUMCORD_INJECTIONS[e];if(!w[s]){let m=t[e];w[s]={originalFunction:m,functionParent:t,functionName:e,hooks:{before:{},instead:{},after:{}}},t[e]=function(...a){return lt(s,a,this)}}let u=ve();return w[s].hooks[o][u]=n,()=>Se(s,u,o)}function lt(e,t,n){let o=w[e],s=o.hooks,u=t;for(let d in s.before){let h=s.before[d].call(n,u);Array.isArray(h)&&(u=h)}let m,a=Object.values(s.instead),c=(...d)=>o.originalFunction.call(n,...d);if(a.length>0){let d=f=>a[0].call(n,f,c);for(let f of a.slice(1)){let h=d;d=S=>f.call(n,S,h)}m=d(u)}else m=c(...u);for(let d in s.after){let h=s.after[d].call(n,u,m);typeof h!="undefined"&&(m=h)}return m}function xe(e,t,n){return ne(e,t,n,"before")}function L(e,t,n){return ne(e,t,n,"instead")}function J(e,t,n){return ne(e,t,n,"after")}function Se(e,t,n){let o=w[e];if(o){let s=o.hooks;if(s[n][t])return delete s[n][t],o.functionParent.CUMCORD_INJECTIONS[o.functionName]=void 0,delete o.functionParent.CUMCORD_INJECTIONS[o.functionName],Object.keys(s).every(m=>Object.values(s[m]).length==0)&&(o.functionParent[o.functionName]=o.originalFunction,delete o.functionParent.CUMCORD_INJECTIONS,w[e]=void 0,delete w[e]),!0}return!1}function Oe(){for(let e in w)for(let t of Object.keys(w[e].hooks)){if(!w[e])return;let n=w[e].hooks[t];for(let o in n)Se(e,o,t)}}i();C();i();C();i();i();i();function ut(){if(!(!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent))||!indexedDB.databases)return Promise.resolve();let t;return new Promise(n=>{let o=()=>indexedDB.databases().finally(n);t=setInterval(o,100),o()}).finally(()=>clearInterval(t))}var Pe=ut;function oe(e){return new Promise((t,n)=>{e.oncomplete=e.onsuccess=()=>t(e.result),e.onabort=e.onerror=()=>n(e.error)})}function ct(e,t){let n=Pe().then(()=>{let o=indexedDB.open(e);return o.onupgradeneeded=()=>o.result.createObjectStore(t),oe(o)});return(o,s)=>n.then(u=>s(u.transaction(t,o).objectStore(t)))}var re;function _e(){return re||(re=ct("keyval-store","keyval")),re}function H(e,t=_e()){return t("readonly",n=>oe(n.get(e)))}function T(e,t,n=_e()){return n("readwrite",o=>(o.put(t,e),oe(o.transaction)))}i();var R=me(ae());async function Ne(e){let t=await H(`${e}_CUMCORD_STORE`)||{},n=R.make(t),o=()=>T(`${e}_CUMCORD_STORE`,{...n.ghost});return n.on(R.Events.SET,o),n.on(R.Events.DEL,o),n}var yt=eval,$={cache:"no-store"},Be="https://cors.bridged.cc/",x={},g={};function je(){for(let e of Object.keys(g))try{W(e)}catch{}}function N(e){return g[e]}function K(e,t){g[e]=t,T("CumcordCache",g)}async function G(e){let t=N(e);if(!t)throw new Error(`Plugin ${e} not found`);if(x[e])throw new Error(`Plugin ${e} already loaded`);let n=yt(t.js),o=n;typeof n=="function"&&(o=n({persist:await Ne(e),id:e})),x[e]=o;try{o.onLoad()}catch{}}function W(e){if(!N(e))throw new Error(`Plugin ${e} not found`);let n=x[e];if(n)n.onUnload(),x[e]=void 0,delete x[e];else throw new Error(`Plugin ${e} not loaded`)}function V(e){try{W(e)}catch{}g[e]=void 0,delete g[e],T("CumcordCache",g)}async function Ae(){let e=await H("CumcordCache");x={},e?g=e:(await T("CumcordCache",{}),g={});for(let t of Object.keys(g))P(t)}function wt(e){let t=N(e);x[e]&&W(e),G(e),t.enabled||(t.enabled=!0,K(e,t))}function Ct(e){let t=N(e);x[e]&&W(e),t.enabled&&(t.enabled=!1,K(e,t))}function q(e){N(e).enabled?Ct(e):wt(e)}async function P(e){let t=e.replace(/\/?$/,"/"),n=new URL("plugin.json",t),o=new URL("plugin.js",t),s=!0,u=N(t),m=!1,a,c;try{a=await fetch(n,$)}catch{m=!0,a=await fetch(Be+n,$)}if(a.status!=200&&!u)throw new Error("Plugin manifest not returning success");try{c=await a.json()}catch{if(!u)throw new Error("Plugin manifest cannot be parsed")}if(u)if(s=u.enabled,c){if(u.manifest.hash==c.hash&&(u.manifest!=c&&(u.manifest=c,K(t,u)),s)){G(t);return}}else{s&&G(t);return}let d;if(m?d=await await fetch(Be+o,$):d=await await fetch(o,$),d.status!=200)throw new Error("Plugin not returning success");let f=await d.text();K(t,{manifest:c,js:f,enabled:s}),s&&G(t)}var vt=r.useState,bt=l.findByDisplayName("Card"),xt=l.findByDisplayName("Header"),St=l.findByDisplayName("Text"),le=l.findByDisplayName("Flex"),Ot=l.findByDisplayName("Markdown"),Pt=l.findByDisplayName("Switch"),{Separator:_n}=l.findByProps("Separator"),Ie=e=>{let t=g[e.pluginId],[n,o]=vt(t.enabled);return r.createElement(bt,{className:"cumcord-plugin-card",type:"cardPrimary",outline:!1,editable:!1},r.createElement(le,{justify:le.Justify.BETWEEN,align:le.Align.CENTER},r.createElement("div",{className:"cumcord-card-header"},r.createElement(xt,{className:"cumcord-card-title"},t.manifest.name),r.createElement(St,{className:"cumcord-card-author",tag:"h5"}," ","by ",r.createElement("strong",null,t.manifest.author))),r.createElement("div",{className:"cumcord-card-right"},r.createElement("div",{className:"cumcord-card-buttons"},r.createElement("svg",{onClick:()=>{V(e.pluginId),e.updatePlugins()},className:"cumcord-card-delete",xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px"},r.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),r.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none"}),r.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"}))),r.createElement(Pt,{checked:n,onChange:()=>{try{q(e.pluginId),o(t.enabled)}catch{}}}))),r.createElement(Ot,null,t.manifest.description))};var Re=r.useState,_t=l.findByDisplayName("FormTitle"),Mt=l.findByDisplayName("FormSection"),Dt=l.findByDisplayName("Flex"),Et=l.findByDisplayName("TextInput"),ue=l.findByProps("Sizes","Colors","Looks","DropdownSizes"),kt=l.findByDisplayName("FormDivider"),Ue=()=>{let[e,t]=Re(""),[n,o]=Re(Object.keys(g)),s=()=>{o(Object.keys(g))};return r.createElement(Mt,null,r.createElement(_t,{tag:"h1"},"Plugins"),r.createElement(Dt,{basis:"auto",grow:1,shrink:1},r.createElement(Et,{className:"cumcord-plugin-import",placeholder:"https://example.com/plugin",type:"text",value:e,onChange:u=>t(u)}),r.createElement(ue,{color:ue.Colors.BRAND,size:ue.Sizes.MEDIUM,onClick:()=>{t(""),P(e).then(()=>{s()})}},"Add plugin")),r.createElement(kt,{className:"cumcord-plugin-divider"}),n.map(u=>r.createElement(Ie,{updatePlugins:s,pluginId:u})))};var ze={initializeSettings:function(){k(".cumcord-plugin-card{padding:16px;margin-bottom:10px}.cumcord-plugin-import{flex-grow:1;margin-right:20px}.cumcord-plugin-divider{margin-top:20px;margin-bottom:20px}.cumcord-card-header{display:inline-block}.cumcord-card-author,.cumcord-card-title{display:inline}.cumcord-card-right{display:flex}.cumcord-card-delete{fill:var(--interactive-normal);cursor:pointer;width:20px}.cumcord-card-delete:hover{fill:var(--interactive-hover)}.cumcord-card-buttons{display:flex;margin-right:4px}");let e=l.findByDisplayName("SettingsView");J("getPredicateSections",e.prototype,(t,n)=>{let o=n.findIndex(u=>u.section=="changelog")-1;if(o<0)return n;let s=[{section:"DIVIDER"},{section:"HEADER",label:"Cumcord"},{section:"CUMCORD_PLUGINS",label:"Plugins",element:Ue}];return n.splice(o,0,...s),n})}};F();i();C();i();i();F();var ce=me(ae()),Tt=eval,_=!1,M,Fe=ce.make({});function Le(e){if(_){if(M){y.log("Unloading previous plugin version...");try{M.onUnload()}catch(t){y.error("Failed to unload:",t)}}pluginObject=Tt(e),M=pluginObject,typeof M=="function"&&(M=pluginObject({store:Fe,id:"FAKE_PLUGIN_ID"})),y.log("Loading new plugin version...");try{M.onLoad()}catch(t){y.error("Failed to load:",t)}}}function Je(){_=!_,_==!1&&(M=void 0,Fe=ce.make({})),y.log(`Dev mode is now ${_?"on":"off"}.`)}i();C();var Nt=j("openModal").openModal,de=j("button","colorRed"),Bt=ee("ConfirmModal"),jt=ee("Markdown");async function Y({header:e="Are you sure?",confirmText:t="Confirm",cancelText:n="Cancel",content:o="Are you sure you want to do that?",type:s="neutral"}={},u=()=>{}){return new Promise(m=>{var a,c=!1;switch(s.toLowerCase()){case"danger":a=de.colorRed;break;case"confirm":a=de.colorGreen;break;default:a=de.colorBrandNew;break}function d(f){c||(c=!0,u(f),m(f))}Nt(f=>(f.transitionState===3&&d(!1),r.createElement(Bt,{header:e,confirmText:t,cancelText:n,transitionState:f.transitionState,confirmButtonColor:a,onClose:()=>{d(!1)},onCancel:()=>{d(!1),f.onClose()},onConfirm:()=>{d(!0),f.onClose()}},r.createElement(jt,{editable:!1},o))))})}function fe(e,t){var n;try{n=JSON.parse(e)}catch{return}switch(n.action.toLowerCase()){case"get_info":t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:n.uuid||Math.random(),status:"OK"}));return;case"install_plugin":if(n.url){if(!n.url.match(/^(http|https):\/\/[^ "]+$/)){t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:n.uuid||Math.random(),status:"ERROR",error:"Invalid URL."}));return}DiscordNative.window.focus(),Y({header:"Do you want to install this plugin?",content:`Cumcord plugins can run code on your computer and can be potentially dangerous. Only click confirm if you trust the plugin from \`${n.url}\`.`,confirmText:"Install",cancelText:"Cancel",type:"danger"},o=>{if(o){P(n.url),t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:n.uuid||Math.random(),status:"OK"}));return}else{t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:n.uuid||Math.random(),status:"ERROR",error:"Plugin installation cancelled."}));return}})}else{t.send(JSON.stringify({uuid:n.uuid||Math.random(),status:"ERROR",error:"No URL provided."}));return}return;case"install_plugin_dev":_?n.code?(Le(n.code),t.send(JSON.stringify({uuid:n.uuid||Math.random(),status:"OK"}))):t.send(JSON.stringify({uuid:n.uuid||Math.random(),status:"ERROR",message:"No code provided."})):t.send(JSON.stringify({uuid:n.uuid||Math.random(),status:"ERROR",message:"Dev mode not enabled."}));return;default:return}}var Q=[];function He(){window.DiscordNative&&L("handleConnection",j("handleConnection").__proto__,(e,t)=>{let n=e[0];if(n.upgradeReq().url=="/cumcord")Q.push(n),n.on("message",o=>fe(o,n)),n.on("close",()=>{Q.splice(Q.indexOf(n),1)});else return t(...e)})}function $e(){if(window.DiscordNative)for(let e of Q)e.close()}i();E();i();C();var At=l.findByDisplayName("Card"),It=l.findByDisplayName("Header"),qn=l.findByDisplayName("Text"),Yn=l.findByDisplayName("Markdown"),Ke=e=>r.createElement(At,{className:"cumcord-toast",type:"cardPrimary",outline:!1,editable:!1},r.createElement("div",{className:"cumcord-toast-header"},r.createElement(It,{className:"cumcord-toast-title"},e.children)));i();E();i();E();var B=we(e=>({toasts:[]}));function Ge(e){let t=B.getState();B.setState({toasts:[...t.toasts,e]})}function We(e){let t=B.getState(),n=t.toasts.indexOf(e);n>-1&&B.setState({toasts:t.toasts.filter((o,s)=>s!==n)})}var Ve=()=>{let e=B(t=>t.toasts);return r.createElement(r.Fragment,null,e)};var U=document.createElement("div");function qe(){k(".cumcord-toast-container{position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;display:flex;flex-direction:column-reverse;align-items:flex-end;z-index:999999}.cumcord-toast{min-width:120px;min-height:50px;padding:5px;margin-right:10px;margin-bottom:10px;display:flex;justify-content:center;align-items:center;align-content:center;pointer-events:all}.cumcord-toast-title{font-size:30px;top:0;bottom:0;left:0;right:0}"),U.className="cumcord-toast-container",document.getElementById("app-mount").prepend(U),te.render(r.createElement(Ve,null),U)}function Ye(){te.unmountComponentAtNode(U),U.remove()}function Qe(e){let t=r.createElement(Ke,null,e.title);Ge(t);let n=()=>{We(t)},o=setTimeout(()=>{n(),clearTimeout(o)},e.duration);return n}function Rt(){return je(),$e(),Oe(),Ye(),be(),window.cumcord=void 0,delete window.cumcord,!0}async function Ut(){y.log("Initializing Cumcord API"),window.cumcord={uninject:Rt,modules:{webpackModules:l,webpack:l,common:Ce},plugins:{importPlugin:P,removePlugin:V,togglePlugin:q},patcher:{before:xe,after:J,instead:L,injectCSS:k},ui:{toasts:{showToast:Qe},modals:{showConfirmationModal:Y}},utils:{logger:y,findInTree:O,findInReactTree:he},cum:()=>y.log("8==D ~~~~~~")},window.DiscordNative&&(window.cumcord.dev={toggleDevMode:Je}),qe(),Ae(),ze.initializeSettings(),He()}var Xe=Ut;if(window.cumcord)throw new Error("Cumcord is already injected");Xe();})();
