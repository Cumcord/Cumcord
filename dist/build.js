(()=>{var ft=Object.create;var re=Object.defineProperty;var mt=Object.getOwnPropertyDescriptor;var pt=Object.getOwnPropertyNames;var gt=Object.getPrototypeOf,ht=Object.prototype.hasOwnProperty;var yt=e=>re(e,"__esModule",{value:!0});var M=(e,t)=>()=>(e&&(t=e(e=0)),t);var $=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var wt=(e,t,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of pt(t))!ht.call(e,r)&&r!=="default"&&re(e,r,{get:()=>t[r],enumerable:!(o=mt(t,r))||o.enumerable});return e},L=e=>wt(yt(re(e!=null?ft(gt(e)):{},"default",e&&e.__esModule&&"default"in e?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);function O(e,t,{walkable:o=null,ignore:r=[],limit:s=100}={}){let a=0;function m(l,d,{walkable:c=null,ignore:f=[]}={}){if(a+=1,a>s)return null;if(typeof d=="string"){if(l.hasOwnProperty(d))return l[d]}else if(d(l))return l;if(l){if(Array.isArray(l))for(let h of l){let N=m(h,d,{walkable:c,ignore:f});if(N)return N}else if(typeof l=="object")for(let h of Object.keys(l)){if(c!=null&&!c.includes(h)||f.includes(h))continue;let N=m(l[h],d,{walkable:c,ignore:f});if(N)return N}}}return m(e,t,{walkable:o,ignore:r})}var xe=M(()=>{i()});function ie(e,t,o){console[o]("%cCumcord%c",`background-color: ${t}; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold`,"",...e)}var vt,y,be=M(()=>{i();vt={log:(...e)=>{ie(e,"#7289da","log")},error:(...e)=>{ie(e,"red","error")},warn:(...e)=>{ie(e,"red","warn")}},y=vt});var ae=$(se=>{i();"use strict";Object.defineProperty(se,"__esModule",{value:!0});se.default=Object.freeze({GET:"GET",SET:"SET",DELETE:"DELETE",UPDATE:"UPDATE"})});var Me=$(F=>{i();"use strict";var Ct=F&&F.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(F,"__esModule",{value:!0});var Ee=Ct(ae()),Se=class{constructor(){this.listeners=Object.values(Ee.default).reduce((t,o)=>(t[o]=new Set,t),{}),this.on=function(t,o){if(this.listeners[t].has(o))throw Error(`This listener on ${t} already exists.`);this.listeners[t].add(o)},this.once=function(t,o){let r=(s,a)=>{this.off(s,r),o(s,a)};this.on(t,r)},this.off=function(t,o){this.listeners[t].delete(o)},this.emit=function(t,o){for(let r of this.listeners[t])r(t,o)};for(let t of Object.values(Ee.default))this[t.toLowerCase()]=o=>{this.emit(t,o)}}};F.default=Se});var Pe=$(R=>{i();"use strict";var xt=R&&R.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(R,"__esModule",{value:!0});var bt=xt(Me());function Et(e,{nestArrays:t=!0}={}){let o=new bt.default;function r(s,a=e,m=[]){return new Proxy(s,{get(l,d){let c=[...m,d],f=l[d];return f!=null?(o.get({path:c,value:f}),!t&&Array.isArray(f)?f:typeof f=="object"?r(f,a,c):f):r(l[d]={},a,c)},set(l,d,c){return l[d]=c,o.set({path:[...m,d],value:c}),!0},deleteProperty(l,d){return delete l[d]?(o.delete({path:[...m,d]}),!0):!1},has(l,d){return typeof l[d]=="object"&&Object.keys(l[d]).length===0?!1:d in l}})}return Object.assign({store:r(e),ghost:e},o)}R.default=Et});var I=$(P=>{i();"use strict";var De=P&&P.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(P,"__esModule",{value:!0});P.make=P.Events=void 0;var St=ae();Object.defineProperty(P,"Events",{enumerable:!0,get:function(){return De(St).default}});var Mt=Pe();Object.defineProperty(P,"make",{enumerable:!0,get:function(){return De(Mt).default}})});function D(e,t=!1,o=()=>!0){let r=n.useRef(e.ghost),[,s]=n.useReducer(a=>~a,0);n.useEffect(()=>{function a(m,l){o(m,l)&&s()}return e.on(T.Events.UPDATE,a),t||(e.on(T.Events.SET,a),e.on(T.Events.DELETE,a)),()=>{e.off(T.Events.UPDATE,a),t||(e.off(T.Events.SET,a),e.off(T.Events.DELETE,a))}},[])}var T,_e=M(()=>{i();E();T=L(I())});function K(e){window.DiscordNative?DiscordNative.clipboard.copy(e):navigator.clipboard.writeText(e).then(()=>{},()=>{let t=document.createElement("textarea");t.style.visibility="hidden",t.style.position="fixed",t.style.top="0",t.style.left="0",document.body.appendChild(t),t.focus(),t.select();try{document.execCommand("copy")}catch(o){console.error(o)}document.body.removeChild(t)})}var ke=M(()=>{i()});function Ne(e,t){return O(e,t,{walkable:["props","children","child","sibling"]})}var A=M(()=>{i();xe();be();_e();ke()});function Pt(){let e=window.webpackJsonp.push([[],{cum:(t,o,r)=>t.exports=r},[["cum"]]]);return e.m.cum=void 0,delete e.m.cum,e.c.cum=void 0,delete e.c.cum,e.c}function Oe(e,t){let o=[];for(let r in e)if(e.hasOwnProperty(r)){let s=e[r].exports;s&&(s.default&&s.__esModule&&t(s.default)&&o.push(s.default),t(s)&&o.push(s))}return o}var p,mo,po,_,go,ho,U,yo,wo,u,w=M(()=>{i();A();p={modules:Pt(),find:e=>Oe(p.modules,e)[0],findAll:e=>Oe(p.modules,e),findByProps:(...e)=>p.find(t=>e.every(o=>t[o]!==void 0)),findByPropsAll:(...e)=>p.findAll(t=>e.every(o=>t[o]!==void 0)),findByPrototypes:(...e)=>p.find(t=>t.prototype&&e.every(o=>t.prototype[o]!==void 0)),findByDisplayName:e=>p.find(t=>t.displayName===e),findByStrings:(...e)=>p.find(t=>{if(typeof t=="function"){if(e.every(o=>t.toString().includes(o)))return!0}else return O(t,o=>{if(o){for(let r of Object.values(o))if(typeof r=="function"&&e.every(s=>r.toString().includes(s)))return!0}})}),findByKeywordAll:(...e)=>p.findAll(t=>e.every(o=>Object.keys(t).some(r=>r.toLowerCase().includes(o.toLowerCase()))==!0))},mo=p.find,po=p.findAll,_=p.findByProps,go=p.findByPropsAll,ho=p.findByPrototypes,U=p.findByDisplayName,yo=p.findByStrings,wo=p.findByKeywordAll,u=p});var v,n,le,xo,bo,Eo,So,Mo,Po,Te,ue,Be,E=M(()=>{i();w();v={constants:u.findByProps("API_HOST","APP_URL_PREFIX"),channels:u.findByProps("getChannelId","getVoiceChannelId"),Flux:u.findByProps("CachedStore","Store","connectStores"),FluxDispatcher:u.findByProps("_currentDispatchActionType","_subscriptions","_waitQueue"),i18n:u.findByProps("Messages","_requestedLocale"),React:u.findByProps("__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED","createElement"),ReactDOM:u.findByProps("__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED","hydrate"),Redux:u.findByProps("createStore","__DO_NOT_USE__ActionTypes"),zustand:u.find(e=>{if(typeof e=="function"&&e.toString().includes("[useStore, api] = create() is deprecated and will be removed in v4"))return e}),uuid:{v4:u.findByProps("v4").v4}},n=v.React,le=v.ReactDOM,xo=v.Flux,bo=v.FluxDispatcher,Eo=v.Redux,So=v.constants,Mo=v.channels,Po=v.i18n,Te=v.zustand,ue=v.uuid,Be=v});var i=M(()=>{E()});i();i();w();E();i();var Ae=L(I());i();i();function Dt(){if(!(!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent))||!indexedDB.databases)return Promise.resolve();let t;return new Promise(o=>{let r=()=>indexedDB.databases().finally(o);t=setInterval(r,100),r()}).finally(()=>clearInterval(t))}var je=Dt;function ce(e){return new Promise((t,o)=>{e.oncomplete=e.onsuccess=()=>t(e.result),e.onabort=e.onerror=()=>o(e.error)})}function _t(e,t){let o=je().then(()=>{let r=indexedDB.open(e);return r.onupgradeneeded=()=>r.result.createObjectStore(t),ce(r)});return(r,s)=>o.then(a=>s(a.transaction(t,r).objectStore(t)))}var de;function Ie(){return de||(de=_t("keyval-store","keyval")),de}function G(e,t=Ie()){return t("readonly",o=>ce(o.get(e)))}function V(e,t,o=Ie()){return o("readwrite",r=>(r.put(t,e),ce(r.transaction)))}var Ue={nests:Ae.default,idbKeyval:{get:G,set:V}};i();w();i();w();E();var C=[];function B(e){let t=document.createElement("style");return t.className="CUMCORD_INJECTED_CSS",t.textContent=e,document.head.appendChild(t),o=>{typeof o=="undefined"?t.remove():t.textContent=o}}function ze(){for(let e of document.querySelectorAll(".CUMCORD_INJECTED_CSS"))e.remove()}function fe(e,t,o,r){if(!(r=="before"||r=="instead"||r=="after"))throw new Error("Go fuck yourself.");if(typeof t[e]!="function")throw new Error(`${e} is not a function in ${t.constructor.name}`);if(Object.hasOwnProperty.bind(t)("CUMCORD_INJECTIONS")||(t.CUMCORD_INJECTIONS={}),!t.CUMCORD_INJECTIONS.hasOwnProperty(e)){let m=ue.v4();t.CUMCORD_INJECTIONS[e]=m}let s=t.CUMCORD_INJECTIONS[e];if(!C[s]){let m=t[e];C[s]={originalFunction:m,functionParent:t,functionName:e,hooks:{before:{},instead:{},after:{}}},t[e]=function(...l){return kt(s,l,this)}}let a=ue.v4();return C[s].hooks[r][a]=o,()=>Fe(s,a,r)}function kt(e,t,o){let r=C[e],s=r.hooks,a=t;for(let c in s.before){let h=s.before[c].call(o,a);Array.isArray(h)&&(a=h)}let m,l=Object.values(s.instead),d=(...c)=>r.originalFunction.call(o,...c);if(l.length>0){let c=f=>l[0].call(o,f,d);for(let f of l.slice(1)){let h=c;c=N=>f.call(o,N,h)}m=c(a)}else m=d(...a);for(let c in s.after){let h=s.after[c].call(o,a,m);typeof h!="undefined"&&(m=h)}return m}function Le(e,t,o){return fe(e,t,o,"before")}function W(e,t,o){return fe(e,t,o,"instead")}function q(e,t,o){return fe(e,t,o,"after")}function Fe(e,t,o){let r=C[e];if(r){let s=r.hooks;if(s[o][t])return delete s[o][t],r.functionParent.CUMCORD_INJECTIONS[r.functionName]=void 0,delete r.functionParent.CUMCORD_INJECTIONS[r.functionName],Object.keys(s).every(m=>Object.values(s[m]).length==0)&&(r.functionParent[r.functionName]=r.originalFunction,delete r.functionParent.CUMCORD_INJECTIONS,C[e]=void 0,delete C[e]),!0}return!1}function Re(){for(let e in C)for(let t of Object.keys(C[e].hooks)){if(!C[e])return;let o=C[e].hooks[t];for(let r in o)Fe(e,r,t)}}i();w();A();i();w();i();w();i();i();E();var S=class extends n.Component{constructor(t){super(t);this.state={hasError:!1}}static getDerivedStateFromError(t){return{hasError:!0,error:t}}render(){return this.state.hasError?n.createElement("div",{className:"cumcord-error-handler"},n.createElement("h1",{className:"cumcord-error-handler-title"},"Oops, we had a fucky wucky. (Cumcord)"),n.createElement("code",{className:"cumcord-error-handler-code"},`${this.state.error}`)):this.props.children}};var Y=_("ModalCloseButton"),He=U("Header"),Je=U("Flex"),{openModal:Nt}=_("openModal");function Q(e,t){Nt(o=>n.createElement(Y.ModalRoot,{transitionState:o.transitionState,size:"large",className:"cumcord-settings-modal"},n.createElement(S,null,n.createElement(Y.ModalHeader,{separator:!1},n.createElement(Je.Child,{basis:"auto",grow:1,shrink:1,wrap:!1},n.createElement(He,{tag:"h2",size:He.Sizes.SIZE_20},e)),n.createElement(Je.Child,{basis:"auto",grow:0,shrink:1,wrap:!1},n.createElement(Y.ModalCloseButton,{onClick:o.onClose}))),n.createElement(Y.ModalContent,null,t))))}A();i();i();var H=L(I());async function me(e){let t=await G(`${e}_CUMCORD_STORE`)||{},o=H.make(t),r=()=>V(`${e}_CUMCORD_STORE`,{...o.ghost});return o.on(H.Events.SET,r),o.on(H.Events.DELETE,r),o}var $e=L(I()),Ot=eval,X={cache:"no-store"},Ke="https://cors.bridged.cc/",x=$e.make({}),g={};function pe(e,t){let o=Ot(e),r=o;return typeof o=="function"&&(r=o(t)),r}async function Z(e){let t=g.ghost[e];if(!t)throw new Error(`Plugin ${e} not found`);if(x.ghost[e])throw new Error(`Plugin ${e} already loaded`);let o=pe(t.js,{persist:await me(e),id:e});try{o.onLoad&&o.onLoad()}catch{}x.store[e]=o}function ge(e){let t=x.ghost[e];if(!t)throw new Error(`Plugin ${e} not found`);if(!x.ghost[e])throw new Error(`Plugin ${e} isn't loaded`);try{t.onUnload()}catch{}delete x.store[e]}function ee(e){let t=g.store[e];if(!g.ghost[e])throw new Error(`Plugin ${e} not found`);t.enabled?(ge(e),t.enabled=!1):(Z(e),t.enabled=!0)}async function j(e){let t=e.replace(/\/?$/,"/"),o=new URL("plugin.json",t),r=new URL("plugin.js",t),s=g.ghost[t],a=g.store[t],m=s?a.enabled:!0,l=!1,d,c;try{d=await fetch(o,X)}catch{l=!0,d=await fetch(Ke+o,X)}if(d.status!=200&&!s)throw new Error("Plugin manifest not returning success");try{c=await d.json()}catch{if(!s)throw new Error("Plugin manifest cannot be parsed")}if(s)if(c){if(a.manifest.hash==c.hash){a.manifest!=c&&(a.manifest=c),m&&Z(t);return}}else{m&&Z(t);return}let f;if(l?f=await await fetch(Ke+r,X):f=await await fetch(r,X),f.status!=200)throw new Error("Plugin not returning success");let h=await f.text();g.store[t]={manifest:c,js:h,enabled:m},m&&await Z(t)}function te(e){try{ge(e)}catch{}delete g.store[e]}async function Ge(){g=await me("PLUGIN_CACHE")}async function Ve(){for(let e of Object.keys(g.ghost))j(e)}function We(){for(let e of Object.keys(g.ghost))try{ge(e)}catch{}}var Tt=u.findByDisplayName("Card"),Bt=u.findByDisplayName("Header"),jt=u.findByDisplayName("Text"),he=u.findByDisplayName("Flex"),It=u.findByDisplayName("Markdown"),At=u.findByDisplayName("Switch"),qe=e=>{let t=g.ghost[e.pluginId];if(!t.manifest)return null;D(x);let o=null;return x.ghost[e.pluginId]&&x.ghost[e.pluginId].settings&&(o=n.createElement("svg",{onClick:()=>{Q(t.manifest.name,x.ghost[e.pluginId].settings)},className:"cumcord-card-settings",xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px"},n.createElement("g",null,n.createElement("path",{d:"M0,0h24v24H0V0z",fill:"none"}),n.createElement("path",{d:"M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"})))),n.createElement(Tt,{className:"cumcord-plugin-card",type:"cardPrimary",outline:!1,editable:!1},n.createElement(he,{justify:he.Justify.BETWEEN,align:he.Align.CENTER},n.createElement("div",{className:"cumcord-card-header"},n.createElement(Bt,{className:"cumcord-card-title"},t.manifest.name),n.createElement(jt,{className:"cumcord-card-author",tag:"h5"}," ","by ",n.createElement("strong",null,t.manifest.author))),n.createElement("div",{className:"cumcord-card-right"},n.createElement("div",{className:"cumcord-card-buttons"},o,n.createElement("svg",{onClick:()=>{te(e.pluginId)},className:"cumcord-card-delete",xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px"},n.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),n.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none"}),n.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"}))),n.createElement(At,{checked:t.enabled,onChange:()=>{try{ee(e.pluginId)}catch{}}}))),n.createElement(It,{className:"cumcord-card-description"},t.manifest.description))};var Ut=n.useState,zt=u.findByDisplayName("FormTitle"),Lt=u.findByDisplayName("FormSection"),Ft=u.findByDisplayName("Flex"),Rt=u.findByDisplayName("TextInput"),ye=u.findByProps("Sizes","Colors","Looks","DropdownSizes"),Ht=u.findByDisplayName("FormDivider"),Ye=()=>{let[e,t]=Ut("");return D(g),n.createElement(S,null,n.createElement(Lt,null,n.createElement(zt,{tag:"h1"},"Plugins"),n.createElement(Ft,{basis:"auto",grow:1,shrink:1},n.createElement(Rt,{className:"cumcord-plugin-import",placeholder:"https://example.com/plugin",type:"text",value:e,onChange:o=>t(o)}),n.createElement(ye,{color:ye.Colors.BRAND,size:ye.Sizes.MEDIUM,onClick:()=>{t(""),j(e)}},"Add plugin")),n.createElement(Ht,{className:"cumcord-plugin-divider"}),Object.keys(g.ghost).map(o=>n.createElement(qe,{pluginId:o}))))};var Qe={initializeSettings:function(){B(".cumcord-plugin-card{padding:16px;margin-bottom:10px;border-style: none}.cumcord-plugin-import{flex-grow:1;margin-right:20px}.cumcord-plugin-divider{margin-top:20px;margin-bottom:20px}.cumcord-card-header{display:inline-block}.cumcord-card-author,.cumcord-card-title{display:inline}.cumcord-card-right{display:flex}.cumcord-card-buttons{display:flex;margin-right:4px}.cumcord-card-buttons>*{fill:var(--interactive-normal);cursor:pointer;width:20px}.cumcord-card-buttons>*:hover{fill:var(--interactive-hover)}.cumcord-card-description{padding-top:3px;overflow-wrap:break-word}");let e=u.findByDisplayName("SettingsView");q("getPredicateSections",e.prototype,(t,o)=>{let r=o.findIndex(a=>a.section=="changelog")-1;if(r<0)return o;let s=[{section:"DIVIDER"},{section:"HEADER",label:"Cumcord"},{section:"CUMCORD_PLUGINS",label:"Plugins",element:Ye}];return o.splice(r,0,...s),o})}};A();i();w();i();i();A();var we=L(I()),k=!1,b,Xe=we.make({});function Ze(e){if(k){if(b){y.log("Unloading previous plugin version...");try{b.onUnload()}catch(t){y.error("Failed to unload:",t)}}y.log("Loading new plugin version...");try{b=pe(e,{persist:Xe,id:"FAKE_PLUGIN_ID"}),b.onLoad&&b.onLoad()}catch(t){y.error("Failed to load:",t)}}}function et(){k=!k,k==!1&&(b.onUnload(),b=void 0,Xe=we.make({})),y.log(`Dev mode is now ${k?"on":"off"}.`)}function tt(){k?b?b.settings?Q("Fake Dev Plugin",b.settings):y.log("No settings for this plugin."):y.error("No plugin loaded!"):y.error("Dev mode is off!")}i();w();var Jt=_("openModal").openModal,ve=_("button","colorRed"),$t=U("ConfirmModal"),Kt=U("Markdown");async function oe({header:e="Are you sure?",confirmText:t="Confirm",cancelText:o="Cancel",content:r="Are you sure you want to do that?",type:s="neutral"}={},a=()=>{}){return new Promise(m=>{var l,d=!1;switch(s.toLowerCase()){case"danger":l=ve.colorRed;break;case"confirm":l=ve.colorGreen;break;default:l=ve.colorBrandNew;break}function c(f){d||(d=!0,a(f),m(f))}Jt(f=>(f.transitionState===3&&c(!1),n.createElement($t,{header:e,confirmText:t,cancelText:o,transitionState:f.transitionState,confirmButtonColor:l,onClose:()=>{c(!1)},onCancel:()=>{c(!1),f.onClose()},onConfirm:()=>{c(!0),f.onClose()}},n.createElement(Kt,{editable:!1},r))))})}function Ce(e,t){var o;try{o=JSON.parse(e)}catch{return}switch(o.action.toLowerCase()){case"get_info":t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:o.uuid||Math.random(),status:"OK"}));return;case"install_plugin":if(o.url){if(!o.url.match(/^(http|https):\/\/[^ "]+$/)){t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:o.uuid||Math.random(),status:"ERROR",error:"Invalid URL."}));return}DiscordNative.window.focus(),oe({header:"Do you want to install this plugin?",content:`Cumcord plugins can run code on your computer and can be potentially dangerous. Only click confirm if you trust the plugin from \`${o.url}\`.`,confirmText:"Install",cancelText:"Cancel",type:"danger"},r=>{if(r){j(o.url),t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:o.uuid||Math.random(),status:"OK"}));return}else{t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:o.uuid||Math.random(),status:"ERROR",error:"Plugin installation cancelled."}));return}})}else{t.send(JSON.stringify({uuid:o.uuid||Math.random(),status:"ERROR",error:"No URL provided."}));return}return;case"install_plugin_dev":k?o.code?(Ze(o.code),t.send(JSON.stringify({uuid:o.uuid||Math.random(),status:"OK"}))):t.send(JSON.stringify({uuid:o.uuid||Math.random(),status:"ERROR",message:"No code provided."})):t.send(JSON.stringify({uuid:o.uuid||Math.random(),status:"ERROR",message:"Dev mode not enabled."}));return;default:return}}var ne=[];function ot(){window.DiscordNative&&W("handleConnection",_("handleConnection").__proto__,(e,t)=>{let o=e[0];if(o.upgradeReq().url=="/cumcord")ne.push(o),o.on("message",r=>Ce(r,o)),o.on("close",()=>{ne.splice(ne.indexOf(o),1)});else return t(...e)})}function nt(){if(window.DiscordNative)for(let e of ne)e.close()}i();E();i();w();var Gt=u.findByDisplayName("Card"),Vt=u.findByDisplayName("Header"),Dn=u.findByDisplayName("Text"),_n=u.findByDisplayName("Markdown"),rt=e=>n.createElement(Gt,{className:"cumcord-toast",type:"cardPrimary",outline:!1,editable:!1},n.createElement("div",{className:"cumcord-toast-header"},n.createElement(Vt,{className:"cumcord-toast-title"},e.children)));i();E();i();E();var z=Te(e=>({toasts:[]}));function it(e){let t=z.getState();z.setState({toasts:[...t.toasts,e]})}function st(e){let t=z.getState(),o=t.toasts.indexOf(e);o>-1&&z.setState({toasts:t.toasts.filter((r,s)=>s!==o)})}var at=()=>{let e=z(t=>t.toasts);return n.createElement(n.Fragment,null,e)};var J=document.createElement("div");function lt(){B(".cumcord-toast-container{position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;display:flex;flex-direction:column-reverse;align-items:flex-end;z-index:999999}.cumcord-toast{min-width:120px;min-height:50px;padding:5px;margin-right:10px;margin-bottom:10px;display:flex;justify-content:center;align-items:center;align-content:center;pointer-events:all}.cumcord-toast-title{font-size:30px;top:0;bottom:0;left:0;right:0}"),J.className="cumcord-toast-container",document.getElementById("app-mount").prepend(J),le.render(n.createElement(at,null),J)}function ut(){le.unmountComponentAtNode(J),J.remove()}function ct(e){let t=n.createElement(rt,null,e.title);it(t);let o=()=>{st(t)},r=setTimeout(()=>{o(),clearTimeout(r)},e.duration);return o}function Wt(){return We(),nt(),Re(),ut(),ze(),window.cumcord=void 0,delete window.cumcord,!0}async function qt(){y.log("Initializing Cumcord API"),window.cumcord={uninject:Wt,modules:{webpackModules:u,webpack:u,common:Be,internal:Ue},plugins:{importPlugin:j,removePlugin:te,togglePlugin:ee},patcher:{before:Le,after:q,instead:W,injectCSS:B},ui:{toasts:{showToast:ct},modals:{showConfirmationModal:oe},components:{ErrorBoundary:S}},utils:{logger:y,findInTree:O,findInReactTree:Ne,useNest:D,copyText:K},cum:()=>y.log("8==D ~~~~~~")},window.DiscordNative&&(window.cumcord.dev={toggleDevMode:et,showSettings:tt}),B(".cumcord-error-handler{font-family: var(--font-display);color:var(--text-normal);padding:16px}.cumcord-error-handler-title{margin-bottom:7px;font-weight:bold;font-size:24px}.cumcord-error-handler-code{background-color:var(--background-secondary);font-family:var(--font-code);user-select:text}"),lt(),await Ge(),Qe.initializeSettings(),window.cumcord.plugins.installed=g,await Ve(),ot(),y.log("Cumcord is injected!")}var dt=qt;if(window.cumcord)throw new Error("Cumcord is already injected");dt();})();
