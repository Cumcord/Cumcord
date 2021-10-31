(()=>{var pt=Object.create;var re=Object.defineProperty;var mt=Object.getOwnPropertyDescriptor;var gt=Object.getOwnPropertyNames;var ht=Object.getPrototypeOf,yt=Object.prototype.hasOwnProperty;var wt=e=>re(e,"__esModule",{value:!0});var M=(e,t)=>()=>(e&&(t=e(e=0)),t);var J=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var vt=(e,t,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of gt(t))!yt.call(e,r)&&r!=="default"&&re(e,r,{get:()=>t[r],enumerable:!(o=mt(t,r))||o.enumerable});return e},z=e=>vt(wt(re(e!=null?pt(ht(e)):{},"default",e&&e.__esModule&&"default"in e?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);function N(e,t,{walkable:o=null,ignore:r=[],limit:a=100}={}){let s=0;function c(l,d,{walkable:p=null,ignore:f=[]}={}){if(s+=1,s>a)return null;if(typeof d=="string"){if(l.hasOwnProperty(d))return l[d]}else if(d(l))return l;if(l){if(Array.isArray(l))for(let y of l){let k=c(y,d,{walkable:p,ignore:f});if(k)return k}else if(typeof l=="object")for(let y of Object.keys(l)){if(p!=null&&!p.includes(y)||f.includes(y))continue;let k=c(l[y],d,{walkable:p,ignore:f});if(k)return k}}}return c(e,t,{walkable:o,ignore:r})}var xe=M(()=>{i()});function ie(e,t,o){console[o]("%cCumcord%c",`background-color: ${t}; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold`,"",...e)}var Ct,h,be=M(()=>{i();Ct={log:(...e)=>{ie(e,"#7289da","log")},error:(...e)=>{ie(e,"red","error")},warn:(...e)=>{ie(e,"#debf18","warn")}},h=Ct});var ae=J(se=>{i();"use strict";Object.defineProperty(se,"__esModule",{value:!0});se.default=Object.freeze({GET:"GET",SET:"SET",DELETE:"DELETE",UPDATE:"UPDATE"})});var Me=J(L=>{i();"use strict";var xt=L&&L.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(L,"__esModule",{value:!0});var Ee=xt(ae()),Se=class{constructor(){this.listeners=Object.values(Ee.default).reduce((t,o)=>(t[o]=new Set,t),{}),this.on=function(t,o){if(this.listeners[t].has(o))throw Error(`This listener on ${t} already exists.`);this.listeners[t].add(o)},this.once=function(t,o){let r=(a,s)=>{this.off(a,r),o(a,s)};this.on(t,r)},this.off=function(t,o){this.listeners[t].delete(o)},this.emit=function(t,o){for(let r of this.listeners[t])r(t,o)};for(let t of Object.values(Ee.default))this[t.toLowerCase()]=o=>{this.emit(t,o)}}};L.default=Se});var De=J(F=>{i();"use strict";var bt=F&&F.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(F,"__esModule",{value:!0});var Et=bt(Me());function St(e,{nestArrays:t=!0}={}){let o=new Et.default;function r(a,s=e,c=[]){return new Proxy(a,{get(l,d){let p=[...c,d],f=l[d];return f!=null?(o.get({path:p,value:f}),!t&&Array.isArray(f)?f:typeof f=="object"?r(f,s,p):f):r(l[d]={},s,p)},set(l,d,p){return l[d]=p,o.set({path:[...c,d],value:p}),!0},deleteProperty(l,d){return delete l[d]?(o.delete({path:[...c,d]}),!0):!1},has(l,d){return typeof l[d]=="object"&&Object.keys(l[d]).length===0?!1:d in l}})}return Object.assign({store:r(e),ghost:e},o)}F.default=St});var A=J(D=>{i();"use strict";var Pe=D&&D.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(D,"__esModule",{value:!0});D.make=D.Events=void 0;var Mt=ae();Object.defineProperty(D,"Events",{enumerable:!0,get:function(){return Pe(Mt).default}});var Dt=De();Object.defineProperty(D,"make",{enumerable:!0,get:function(){return Pe(Dt).default}})});function P(e,t=!1,o=()=>!0){let r=n.useRef(e.ghost),[,a]=n.useReducer(s=>~s,0);n.useEffect(()=>{function s(c,l){o(c,l)&&a()}return e.on(O.Events.UPDATE,s),t||(e.on(O.Events.SET,s),e.on(O.Events.DELETE,s)),()=>{e.off(O.Events.UPDATE,s),t||(e.off(O.Events.SET,s),e.off(O.Events.DELETE,s))}},[])}var O,_e=M(()=>{i();E();O=z(A())});function $(e){window.DiscordNative?DiscordNative.clipboard.copy(e):navigator.clipboard.writeText(e).then(()=>{},()=>{let t=document.createElement("textarea");t.style.visibility="hidden",t.style.position="fixed",t.style.top="0",t.style.left="0",document.body.appendChild(t),t.focus(),t.select();try{document.execCommand("copy")}catch(o){console.error(o)}document.body.removeChild(t)})}var ke=M(()=>{i()});function Ne(e,t){return N(e,t,{walkable:["props","children","child","sibling"]})}var j=M(()=>{i();xe();be();_e();ke()});function Pt(){let e;return webpackChunkdiscord_app.push([[Math.random().toString(36)],{},t=>{e=t}]),e.c}function Oe(e,t,o=!1){let r=[];for(let a in e)if(e.hasOwnProperty(a)){let s=e[a].exports;s&&(s.default&&s.__esModule&&t(s.default)&&(o?r.push(s):r.push(s.default)),t(s)&&r.push(s))}return r}var m,Te,mo,I,go,ho,K,G,yo,wo,u,v=M(()=>{i();j();m={modules:Pt(),find:(e,t)=>Oe(m.modules,e,t)[0],findAll:(e,t)=>Oe(m.modules,e,t),findByProps:(...e)=>m.find(t=>e.every(o=>t[o]!==void 0)),findByPropsAll:(...e)=>m.findAll(t=>e.every(o=>t[o]!==void 0)),findByPrototypes:(...e)=>m.find(t=>t.prototype&&e.every(o=>t.prototype[o]!==void 0)),findByDisplayName:e=>m.find(t=>t.displayName===e),findByDisplayNameAll:e=>m.findAll(t=>t.displayName===e),findByStrings:(...e)=>m.find(t=>{if(typeof t=="function"){if(e.every(o=>t.toString().includes(o)))return!0}else return N(t,o=>{if(o){for(let r of Object.values(o))if(typeof r=="function"&&e.every(a=>r.toString().includes(a)))return!0}})}),findByKeywordAll:(...e)=>m.findAll(t=>e.every(o=>Object.keys(t).some(r=>r.toLowerCase().includes(o.toLowerCase()))==!0))},Te=m.find,mo=m.findAll,I=m.findByProps,go=m.findByPropsAll,ho=m.findByPrototypes,K=m.findByDisplayName,G=m.findByDisplayNameAll,yo=m.findByStrings,wo=m.findByKeywordAll,u=m});var C,n,le,xo,bo,Eo,So,Mo,Do,Be,ue,Ae,E=M(()=>{i();v();C={constants:u.findByProps("API_HOST","APP_URL_PREFIX"),channels:u.findByProps("getChannelId","getVoiceChannelId"),Flux:u.findByProps("CachedStore","Store","connectStores"),FluxDispatcher:u.findByProps("_currentDispatchActionType","_subscriptions","_waitQueue"),i18n:u.findByProps("Messages","_requestedLocale"),React:u.findByProps("__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED","createElement"),ReactDOM:u.findByProps("__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED","hydrate"),Redux:u.findByProps("createStore","__DO_NOT_USE__ActionTypes"),zustand:u.find(e=>{if(typeof e=="function"&&e.toString().includes("[useStore, api] = create() is deprecated and will be removed in v4"))return e}),uuid:{v4:u.findByProps("v4","v1")}},n=C.React,le=C.ReactDOM,xo=C.Flux,bo=C.FluxDispatcher,Eo=C.Redux,So=C.constants,Mo=C.channels,Do=C.i18n,Be=C.zustand,ue=C.uuid,Ae=C});var i=M(()=>{E()});i();i();v();E();i();var Ue=z(A());i();i();function _t(){if(!(!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent))||!indexedDB.databases)return Promise.resolve();let t;return new Promise(o=>{let r=()=>indexedDB.databases().finally(o);t=setInterval(r,100),r()}).finally(()=>clearInterval(t))}var je=_t;function ce(e){return new Promise((t,o)=>{e.oncomplete=e.onsuccess=()=>t(e.result),e.onabort=e.onerror=()=>o(e.error)})}function kt(e,t){let o=je().then(()=>{let r=indexedDB.open(e);return r.onupgradeneeded=()=>r.result.createObjectStore(t),ce(r)});return(r,a)=>o.then(s=>a(s.transaction(t,r).objectStore(t)))}var de;function Ie(){return de||(de=kt("keyval-store","keyval")),de}function V(e,t=Ie()){return t("readonly",o=>ce(o.get(e)))}function W(e,t,o=Ie()){return o("readwrite",r=>(r.put(t,e),ce(r.transaction)))}var ze={nests:Ue.default,idbKeyval:{get:V,set:W}};i();v();i();v();E();var x=[];function T(e){let t=document.createElement("style");return t.className="CUMCORD_INJECTED_CSS",t.textContent=e,document.head.appendChild(t),o=>{typeof o=="undefined"?t.remove():t.textContent=o}}function Le(){for(let e of document.querySelectorAll(".CUMCORD_INJECTED_CSS"))e.remove()}function fe(e,t,o,r){if(!(r=="before"||r=="instead"||r=="after"))throw new Error("Go fuck yourself.");if(typeof t[e]!="function")throw new Error(`${e} is not a function in ${t.constructor.name}`);if(Object.hasOwnProperty.bind(t)("CUMCORD_INJECTIONS")||(t.CUMCORD_INJECTIONS={}),!t.CUMCORD_INJECTIONS.hasOwnProperty(e)){let c=ue.v4();t.CUMCORD_INJECTIONS[e]=c}let a=t.CUMCORD_INJECTIONS[e];if(!x[a]){let c=t[e];x[a]={originalFunction:c,functionParent:t,functionName:e,hooks:{before:{},instead:{},after:{}}},t[e]=function(...l){return Nt(a,l,this)},Object.assign(t[e],c),t[e].toString=c.toString}let s=ue.v4();return x[a].hooks[r][s]=o,()=>Re(a,s,r)}function Nt(e,t,o){let r=x[e],a=r.hooks,s=t;for(let p in a.before){let y=a.before[p].call(o,s);Array.isArray(y)&&(s=y)}let c,l=Object.values(a.instead),d=(...p)=>r.originalFunction.call(o,...p);if(l.length>0){let p=f=>l[0].call(o,f,d);for(let f of l.slice(1)){let y=p;p=k=>f.call(o,k,y)}c=p(s)}else c=d(...s);for(let p in a.after){let y=a.after[p].call(o,s,c);typeof y!="undefined"&&(c=y)}return c}function Fe(e,t,o){return fe(e,t,o,"before")}function q(e,t,o){return fe(e,t,o,"instead")}function Z(e,t,o){return fe(e,t,o,"after")}function Re(e,t,o){let r=x[e];if(r){let a=r.hooks;if(a[o][t])return delete a[o][t],r.functionParent.CUMCORD_INJECTIONS[r.functionName]=void 0,delete r.functionParent.CUMCORD_INJECTIONS[r.functionName],Object.keys(a).every(c=>Object.values(a[c]).length==0)&&(r.functionParent[r.functionName]=r.originalFunction,delete r.functionParent.CUMCORD_INJECTIONS,x[e]=void 0,delete x[e]),!0}return!1}function He(){for(let e in x)for(let t of Object.keys(x[e].hooks)){if(!x[e])return;let o=x[e].hooks[t];for(let r in o)Re(e,r,t)}}i();v();j();i();v();i();v();i();i();E();var S=class extends n.Component{constructor(t){super(t);this.state={hasError:!1}}static getDerivedStateFromError(t){return{hasError:!0,error:t}}render(){return this.state.hasError?n.createElement("div",{className:"cumcord-error-handler"},n.createElement("h1",{className:"cumcord-error-handler-title"},"Oops, we had a fucky wucky. (Cumcord)"),n.createElement("code",{className:"cumcord-error-handler-code"},`${this.state.error}`)):this.props.children}};var Y=I("ModalCloseButton"),Je=G("Header")[1],$e=K("Flex"),{openModal:Ot}=I("openModal","openModalLazy");function Q(e,t){Ot(o=>n.createElement(Y.ModalRoot,{transitionState:o.transitionState,size:"large",className:"cumcord-settings-modal"},n.createElement(S,null,n.createElement(Y.ModalHeader,{separator:!1},n.createElement($e.Child,{basis:"auto",grow:1,shrink:1,wrap:!1},n.createElement(Je,{tag:"h2",size:Je.Sizes.SIZE_20},e)),n.createElement($e.Child,{basis:"auto",grow:0,shrink:1,wrap:!1},n.createElement(Y.ModalCloseButton,{onClick:o.onClose}))),n.createElement(Y.ModalContent,null,t))))}j();i();i();var R=z(A());async function pe(e){let t=await V(`${e}_CUMCORD_STORE`)||{},o=R.make(t),r=()=>W(`${e}_CUMCORD_STORE`,{...o.ghost});return o.on(R.Events.SET,r),o.on(R.Events.DELETE,r),o}var Ke=z(A()),Tt=eval,Ge={cache:"no-store"},w=Ke.make({}),g={};function me(e,t){let o=Tt(e+`
//# sourceURL=${t.id}`),r=o;return typeof o=="function"&&(r=o(t)),r}async function X(e){let t=g.ghost[e];if(!t)throw new Error(`Plugin ${e} not found`);if(w.ghost[e])throw new Error(`Plugin ${e} already loaded`);let o=me(t.js,{persist:await pe(e),id:e});try{o.onLoad&&o.onLoad()}catch{}w.store[e]=o}function ge(e){let t=w.ghost[e];if(!t)throw new Error(`Plugin ${e} not found`);if(!w.ghost[e])throw new Error(`Plugin ${e} isn't loaded`);try{t.onUnload()}catch{}delete w.store[e]}function ee(e){let t=g.store[e];if(!g.ghost[e])throw new Error(`Plugin ${e} not found`);t.enabled?(ge(e),t.enabled=!1):(X(e),t.enabled=!0)}async function B(e){let t=e.replace(/\/?$/,"/"),o=new URL("plugin.json",t),r=new URL("plugin.js",t),a=g.ghost[t],s=g.store[t],c=a?s.enabled:!0,l;try{let f=await fetch(o,Ge);if(l=await f.json(),f.status!=200&&!a)throw new Error("Plugin manifest not returning success")}catch{if(!a)throw new Error("Plugin manifest cannot be parsed")}if(a)if(l){if(s.manifest.hash==l.hash){s.manifest!=l&&(s.manifest=l),c&&X(t);return}}else{c&&X(t);return}let d=await await fetch(r,Ge);if(d.status!=200)throw new Error("Plugin not returning success");let p=await d.text();g.store[t]={manifest:l,js:p,enabled:c},c&&await X(t)}function te(e){try{ge(e)}catch{}delete g.store[e]}async function Ve(){g=await pe("PLUGIN_CACHE")}async function We(){for(let e of Object.keys(g.ghost))B(e)}function qe(){for(let e of Object.keys(g.ghost))try{ge(e)}catch{}}var Bt=u.findByDisplayName("Card"),At=u.findByDisplayNameAll("Header")[1],jt=u.findByDisplayName("Text"),he=u.findByDisplayName("Flex"),It=u.findByDisplayNameAll("Markdown")[1],Ut=u.findByDisplayName("Switch"),Ze=e=>{let t=g.ghost[e.pluginId];if(!t.manifest)return null;P(w);let o=null;return w.ghost[e.pluginId]&&w.ghost[e.pluginId].settings&&(o=n.createElement("svg",{onClick:()=>{Q(t.manifest.name,w.ghost[e.pluginId].settings)},className:"cumcord-card-settings",xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px"},n.createElement("g",null,n.createElement("path",{d:"M0,0h24v24H0V0z",fill:"none"}),n.createElement("path",{d:"M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"})))),n.createElement(Bt,{className:"cumcord-plugin-card",type:"cardPrimary",outline:!1,editable:!1},n.createElement(he,{justify:he.Justify.BETWEEN,align:he.Align.CENTER},n.createElement("div",{className:"cumcord-card-header"},n.createElement(At,{className:"cumcord-card-title"},t.manifest.name),n.createElement(jt,{className:"cumcord-card-author",tag:"h5"}," ","by ",n.createElement("strong",null,t.manifest.author))),n.createElement("div",{className:"cumcord-card-right"},n.createElement("div",{className:"cumcord-card-buttons"},o,n.createElement("svg",{onClick:()=>{te(e.pluginId)},className:"cumcord-card-delete",xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px"},n.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),n.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none"}),n.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"}))),n.createElement(Ut,{checked:t.enabled,onChange:()=>{try{ee(e.pluginId)}catch{}}}))),n.createElement(It,{className:"cumcord-card-description"},t.manifest.description))};var zt=n.useState,Lt=u.findByDisplayName("FormTitle"),Ft=u.findByDisplayName("FormSection"),Rt=u.findByDisplayName("Flex"),Ht=u.findByDisplayName("TextInput"),ye=u.findByProps("Sizes","Colors","Looks","DropdownSizes"),Jt=u.findByDisplayName("FormDivider"),Ye=()=>{let[e,t]=zt("");return P(g),n.createElement(S,null,n.createElement(Ft,null,n.createElement(Lt,{tag:"h1"},"Plugins"),n.createElement(Rt,{basis:"auto",grow:1,shrink:1},n.createElement(Ht,{className:"cumcord-plugin-import",placeholder:"https://example.com/plugin",type:"text",value:e,onChange:o=>t(o)}),n.createElement(ye,{color:ye.Colors.BRAND,size:ye.Sizes.MEDIUM,onClick:()=>{t(""),B(e)}},"Add plugin")),n.createElement(Jt,{className:"cumcord-plugin-divider"}),Object.keys(g.ghost).map(o=>n.createElement(Ze,{pluginId:o}))))};var Qe={initializeSettings:function(){T(".cumcord-plugin-card{padding:16px;margin-bottom:10px;border-style: none}.cumcord-plugin-import{flex-grow:1;margin-right:20px}.cumcord-plugin-divider{margin-top:20px;margin-bottom:20px}.cumcord-card-header{display:inline-block}.cumcord-card-author,.cumcord-card-title{display:inline}.cumcord-card-right{display:flex}.cumcord-card-buttons{display:flex;margin-right:4px}.cumcord-card-buttons>*{fill:var(--interactive-normal);cursor:pointer;width:20px}.cumcord-card-buttons>*:hover{fill:var(--interactive-hover)}.cumcord-card-description{padding-top:3px;overflow-wrap:break-word}");let e=u.findByDisplayName("SettingsView");Z("getPredicateSections",e.prototype,(t,o)=>{let r=o.findIndex(s=>s.section=="changelog")-1;if(r<0)return o;let a=[{section:"DIVIDER"},{section:"HEADER",label:"Cumcord"},{section:"CUMCORD_PLUGINS",label:"Plugins",element:Ye}];return o.splice(r,0,...a),o})}};j();i();v();i();i();j();var we=z(A()),_=!1,b,Xe=we.make({});function et(e){if(_){if(b){h.log("Unloading previous plugin version...");try{b.onUnload()}catch(t){h.error("Failed to unload:",t)}}h.log("Loading new plugin version...");try{b=me(e,{persist:Xe,id:"FAKE_PLUGIN_ID"}),b.onLoad&&b.onLoad()}catch(t){h.error("Failed to load:",t)}}}function tt(){_=!_,_==!1&&(b.onUnload(),b=void 0,Xe=we.make({})),h.log(`Dev mode is now ${_?"on":"off"}.`)}function ot(){_?b?b.settings?Q("Fake Dev Plugin",b.settings):h.log("No settings for this plugin."):h.error("No plugin loaded!"):h.error("Dev mode is off!")}i();v();var{openModal:$t}=I("openModal","openModalLazy"),ve=I("button","colorRed"),Kt=K("ConfirmModal"),Gt=G("Markdown")[1];async function oe({header:e="Are you sure?",confirmText:t="Confirm",cancelText:o="Cancel",content:r="Are you sure you want to do that?",type:a="neutral"}={},s=()=>{}){return new Promise(c=>{var l,d=!1;switch(a.toLowerCase()){case"danger":l=ve.colorRed;break;case"confirm":l=ve.colorGreen;break;default:l=ve.colorBrandNew;break}function p(f){d||(d=!0,s(f),c(f))}$t(f=>(f.transitionState===3&&p(!1),n.createElement(Kt,{header:e,confirmText:t,cancelText:o,transitionState:f.transitionState,confirmButtonColor:l,onClose:()=>{p(!1)},onCancel:()=>{p(!1),f.onClose()},onConfirm:()=>{p(!0),f.onClose()}},n.createElement(Gt,{editable:!1},r))))})}function Ce(e,t){var o;try{o=JSON.parse(e)}catch{return}switch(o.action.toLowerCase()){case"get_info":t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:o.uuid||Math.random(),status:"OK"}));return;case"install_plugin":if(o.url){if(!o.url.match(/^(http|https):\/\/[^ "]+$/)){t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:o.uuid||Math.random(),status:"ERROR",error:"Invalid URL."}));return}DiscordNative.window.focus(),oe({header:"Do you want to install this plugin?",content:`Cumcord plugins can run code on your computer and can be potentially dangerous. Only click confirm if you trust the plugin from \`${o.url}\`.`,confirmText:"Install",cancelText:"Cancel",type:"danger"},r=>{if(r){B(o.url),t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:o.uuid||Math.random(),status:"OK"}));return}else{t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:o.uuid||Math.random(),status:"ERROR",error:"Plugin installation cancelled."}));return}})}else{t.send(JSON.stringify({uuid:o.uuid||Math.random(),status:"ERROR",error:"No URL provided."}));return}return;case"install_plugin_dev":_?o.code?(et(o.code),t.send(JSON.stringify({uuid:o.uuid||Math.random(),status:"OK"}))):t.send(JSON.stringify({uuid:o.uuid||Math.random(),status:"ERROR",message:"No code provided."})):t.send(JSON.stringify({uuid:o.uuid||Math.random(),status:"ERROR",message:"Dev mode not enabled."}));return;default:return}}var ne=[];function nt(){window.DiscordNative&&q("handleConnection",Te(e=>e.Z?.__proto__?.handleConnection).Z,(e,t)=>{let o=e[0];if(o.upgradeReq().url=="/cumcord")ne.push(o),o.on("message",r=>Ce(r,o)),o.on("close",()=>{ne.splice(ne.indexOf(o),1)});else return t(...e)})}function rt(){if(window.DiscordNative)for(let e of ne)e.close()}i();E();i();v();var Vt=u.findByDisplayName("Card"),Wt=u.findByDisplayName("Header"),Pn=u.findByDisplayName("Text"),_n=u.findByDisplayNameAll("Markdown")[1],it=e=>n.createElement(Vt,{className:"cumcord-toast",type:"cardPrimary",outline:!1,editable:!1},n.createElement("div",{className:"cumcord-toast-header"},n.createElement(Wt,{className:"cumcord-toast-title"},e.children)));i();E();i();E();var U=Be(e=>({toasts:[]}));function st(e){let t=U.getState();U.setState({toasts:[...t.toasts,e]})}function at(e){let t=U.getState(),o=t.toasts.indexOf(e);o>-1&&U.setState({toasts:t.toasts.filter((r,a)=>a!==o)})}var lt=()=>{let e=U(t=>t.toasts);return n.createElement(n.Fragment,null,e)};var H=document.createElement("div");function ut(){T(".cumcord-toast-container{position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;display:flex;flex-direction:column-reverse;align-items:flex-end;z-index:999999}.cumcord-toast{min-width:120px;min-height:50px;padding:5px;margin-right:10px;margin-bottom:10px;display:flex;justify-content:center;align-items:center;align-content:center;pointer-events:all}.cumcord-toast-title{font-size:30px;top:0;bottom:0;left:0;right:0}"),H.className="cumcord-toast-container",document.getElementById("app-mount").prepend(H),le.render(n.createElement(lt,null),H)}function ct(){le.unmountComponentAtNode(H),H.remove()}function dt(e){let t=n.createElement(it,null,e.title);st(t);let o=()=>{at(t)},r=setTimeout(()=>{o(),clearTimeout(r)},e.duration);return o}function qt(){return qe(),rt(),He(),ct(),Le(),window.cumcord=void 0,delete window.cumcord,!0}async function Zt(){h.log("Initializing Cumcord API"),window.cumcord={uninject:qt,modules:{webpackModules:u,webpack:u,common:Ae,internal:ze},plugins:{importPlugin:B,removePlugin:te,togglePlugin:ee},patcher:{before:Fe,after:Z,instead:q,injectCSS:T},ui:{toasts:{showToast:dt},modals:{showConfirmationModal:oe},components:{ErrorBoundary:S}},utils:{logger:h,findInTree:N,findInReactTree:Ne,useNest:P,copyText:$},cum:()=>h.log("8==D ~~~~~~")},window.DiscordNative&&(window.cumcord.dev={toggleDevMode:tt,showSettings:ot}),T(".cumcord-error-handler{font-family: var(--font-display);color:var(--text-normal);padding:16px}.cumcord-error-handler-title{margin-bottom:7px;font-weight:bold;font-size:24px}.cumcord-error-handler-code{background-color:var(--background-secondary);font-family:var(--font-code);user-select:text}"),ut(),await Ve(),Qe.initializeSettings(),window.cumcord.plugins.installed=g,window.cumcord.plugins.loaded=w,await We(),nt(),h.log("Cumcord is injected!")}var ft=Zt;if(window.cumcord)throw new Error("Cumcord is already injected");ft();})();
//# sourceURL=Cumcord