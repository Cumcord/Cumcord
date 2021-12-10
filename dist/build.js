(()=>{var Bt=Object.create;var he=Object.defineProperty;var jt=Object.getOwnPropertyDescriptor;var At=Object.getOwnPropertyNames;var zt=Object.getPrototypeOf,Lt=Object.prototype.hasOwnProperty;var Ut=e=>he(e,"__esModule",{value:!0});var w=(e,t)=>()=>(e&&(t=e(e=0)),t);var Y=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var Ft=(e,t,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of At(t))!Lt.call(e,r)&&r!=="default"&&he(e,r,{get:()=>t[r],enumerable:!(n=jt(t,r))||n.enumerable});return e},$=e=>Ft(Ut(he(e!=null?Bt(zt(e)):{},"default",e&&e.__esModule&&"default"in e?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);function D(e,t,{walkable:n=null,ignore:r=[],limit:a=100}={}){let i=0;function l(c,u,{walkable:f=null,ignore:d=[]}={}){if(i+=1,i>a)return null;if(typeof u=="string"){if(c.hasOwnProperty(u))return c[u]}else if(u(c))return c;if(c){if(Array.isArray(c))for(let h of c){let B=l(h,u,{walkable:f,ignore:d});if(B)return B}else if(typeof c=="object")for(let h of Object.keys(c)){if(f!=null&&!f.includes(h)||d.includes(h))continue;let B=l(c[h],u,{walkable:f,ignore:d});if(B)return B}}}return l(e,t,{walkable:n,ignore:r})}var ye=w(()=>{s()});function X(e,t){return D(e,t,{walkable:["props","children","child","sibling"]})}var Ae=w(()=>{s();ye()});function we(e,t,n){console[n]("%cCumcord%c",`background-color: ${t}; color: white; border-radius: 4px; padding: 0px 6px 0px 6px; font-weight: bold`,"",...e)}var Ht,y,ze=w(()=>{s();Ht={log:(...e)=>{we(e,"#7289da","log")},error:(...e)=>{we(e,"red","error")},warn:(...e)=>{we(e,"#debf18","warn")}},y=Ht});var Ce=Y(ve=>{s();"use strict";Object.defineProperty(ve,"__esModule",{value:!0});ve.default=Object.freeze({GET:"GET",SET:"SET",DELETE:"DELETE",UPDATE:"UPDATE"})});var Fe=Y(G=>{s();"use strict";var $t=G&&G.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(G,"__esModule",{value:!0});var Le=$t(Ce()),Ue=class{constructor(){this.listeners=Object.values(Le.default).reduce((t,n)=>(t[n]=new Set,t),{}),this.on=function(t,n){if(this.listeners[t].has(n))throw Error(`This listener on ${t} already exists.`);this.listeners[t].add(n)},this.once=function(t,n){let r=(a,i)=>{this.off(a,r),n(a,i)};this.on(t,r)},this.off=function(t,n){this.listeners[t].delete(n)},this.emit=function(t,n){for(let r of this.listeners[t])r(t,n)};for(let t of Object.values(Le.default))this[t.toLowerCase()]=n=>{this.emit(t,n)}}};G.default=Ue});var He=Y(q=>{s();"use strict";var Rt=q&&q.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(q,"__esModule",{value:!0});var Jt=Rt(Fe());function Kt(e,{nestArrays:t=!0}={}){let n=new Jt.default;function r(a,i=e,l=[]){return new Proxy(a,{get(c,u){let f=[...l,u],d=c[u];return d!=null?(n.get({path:f,value:d}),!t&&Array.isArray(d)?d:typeof d=="object"?r(d,i,f):d):r(c[u]={},i,f)},set(c,u,f){return c[u]=f,n.set({path:[...l,u],value:f}),!0},deleteProperty(c,u){return delete c[u]?(n.delete({path:[...l,u]}),!0):!1},has(c,u){return typeof c[u]=="object"&&Object.keys(c[u]).length===0?!1:u in c}})}return Object.assign({store:r(e),ghost:e},n)}q.default=Kt});var j=Y(P=>{s();"use strict";var $e=P&&P.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(P,"__esModule",{value:!0});P.make=P.Events=void 0;var Vt=Ce();Object.defineProperty(P,"Events",{enumerable:!0,get:function(){return $e(Vt).default}});var Gt=He();Object.defineProperty(P,"make",{enumerable:!0,get:function(){return $e(Gt).default}})});function S(e,t=!1,n=()=>!0){let r=o.useRef(e.ghost),[,a]=o.useReducer(i=>~i,0);o.useEffect(()=>{function i(l,c){n(l,c)&&a()}return e.on(z.Events.UPDATE,i),t||(e.on(z.Events.SET,i),e.on(z.Events.DELETE,i)),()=>{e.off(z.Events.UPDATE,i),t||(e.off(z.Events.SET,i),e.off(z.Events.DELETE,i))}},[])}var z,Re=w(()=>{s();A();z=$(j())});function R(e){window.DiscordNative?DiscordNative.clipboard.copy(e):navigator.clipboard.writeText(e).then(()=>{},()=>{let t=document.createElement("textarea");t.style.visibility="hidden",t.style.position="fixed",t.style.top="0",t.style.left="0",document.body.appendChild(t),t.focus(),t.select();try{document.execCommand("copy")}catch(n){console.error(n)}document.body.removeChild(t)})}var Je=w(()=>{s()});function J(e){return e.__reactFiber$}var xe=w(()=>{s()});function ee(e){for(let t=J(e);t;t=t.return){let n=t.stateNode;if(n&&n.forceUpdate)return n}}var Ke=w(()=>{s();xe()});function te(e){return new Promise(t=>setTimeout(t,e))}var Ve=w(()=>{s()});var T=w(()=>{s();ye();Ae();ze();Re();Je();xe();Ke();Ve()});function qt(){let e;return webpackChunkdiscord_app.push([[Math.random().toString(36)],{},t=>{e=t}]),e.c}function Ge(e,t,n=!1){let r=[];for(let a in e)if(e.hasOwnProperty(a)){let i=e[a].exports;i&&(i.default&&i.__esModule&&t(i.default)&&r.push(i.default),t(i)&&r.push(i))}return r}var m,qe,qn,Wn,v,Zn,Qn,ne,oe,Yn,Xn,p,C=w(()=>{s();T();m={modules:qt(),find:e=>Ge(m.modules,e)[0],findAll:e=>Ge(m.modules,e),getModule:e=>{for(let t in m.modules){let n=m.modules[t]?.exports;if(n===e||n?.default===e)return n}},findByProps:(...e)=>m.find(t=>e.every(n=>t[n]!==void 0)),findByPropsAll:(...e)=>m.findAll(t=>e.every(n=>t[n]!==void 0)),findByPrototypes:(...e)=>m.find(t=>t.prototype&&e.every(n=>t.prototype[n]!==void 0)),findByDisplayName:(e,t=!0)=>t?m.find(n=>n.displayName===e):m.find(n=>n?.default?.displayName===e),findByDisplayNameAll:e=>m.findAll(t=>t.displayName===e),findByStrings:(...e)=>m.find(t=>{if(typeof t=="function"){if(e.every(n=>t.toString().includes(n)))return!0}else return D(t,n=>{if(n){for(let r of Object.values(n))if(typeof r=="function"&&e.every(a=>r.toString().includes(a)))return!0}})}),findByKeywordAll:(...e)=>m.findAll(t=>e.every(n=>Object.keys(t).some(r=>r.toLowerCase().includes(n.toLowerCase()))==!0))},qe=m.find,qn=m.findAll,Wn=m.getModule,v=m.findByProps,Zn=m.findByPropsAll,Qn=m.findByPrototypes,ne=m.findByDisplayName,oe=m.findByDisplayNameAll,Yn=m.findByStrings,Xn=m.findByKeywordAll,p=m});var b,o,be,no,oo,ro,io,so,ao,lo,Se,We,A=w(()=>{s();C();b={constants:p.findByProps("API_HOST","APP_URL_PREFIX"),channels:p.findByProps("getChannelId","getVoiceChannelId"),Flux:p.findByProps("CachedStore","Store","connectStores"),FluxDispatcher:p.findByProps("_currentDispatchActionType","_subscriptions","_waitQueue"),i18n:p.findByPropsAll("Messages","_requestedLocale")[1],React:p.findByProps("__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED","createElement"),ReactDOM:p.findByProps("__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED","hydrate"),Redux:p.findByProps("createStore","__DO_NOT_USE__ActionTypes"),zustand:p.find(e=>{if(typeof e=="function"&&e.toString().includes("[useStore, api] = create() is deprecated and will be removed in v4"))return e}),uuid:{v4:p.findByProps("v4","v1")}},o=b.React,be=b.ReactDOM,no=b.Flux,oo=b.FluxDispatcher,ro=b.Redux,io=b.constants,so=b.channels,ao=b.i18n,lo=b.zustand,Se=b.uuid,We=b});var s=w(()=>{A()});s();s();C();A();s();var Ye=$(j());s();s();function Wt(){if(!(!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent))||!indexedDB.databases)return Promise.resolve();let t;return new Promise(n=>{let r=()=>indexedDB.databases().finally(n);t=setInterval(r,100),r()}).finally(()=>clearInterval(t))}var Ze=Wt;function re(e){return new Promise((t,n)=>{e.oncomplete=e.onsuccess=()=>t(e.result),e.onabort=e.onerror=()=>n(e.error)})}function Zt(e,t){let n=Ze().then(()=>{let r=indexedDB.open(e);return r.onupgradeneeded=()=>r.result.createObjectStore(t),re(r)});return(r,a)=>n.then(i=>a(i.transaction(t,r).objectStore(t)))}var Me;function Ee(){return Me||(Me=Zt("keyval-store","keyval")),Me}function ie(e,t=Ee()){return t("readonly",n=>re(n.get(e)))}function se(e,t,n=Ee()){return n("readwrite",r=>(r.put(t,e),re(r.transaction)))}function Qe(e,t=Ee()){return t("readwrite",n=>(n.delete(e),re(n.transaction)))}var Xe={nests:Ye.default,idbKeyval:{get:ie,set:se}};s();C();s();C();A();var M=[];function L(e){let t=document.createElement("style");return t.className="CUMCORD_INJECTED_CSS",t.textContent=e,document.head.appendChild(t),n=>{typeof n=="undefined"?t.remove():t.textContent=n}}function et(){for(let e of document.querySelectorAll(".CUMCORD_INJECTED_CSS"))e.remove()}var U=Symbol("_CUMCORD_INJECTIONS");function ke(e,t,n,r){if(!(r=="before"||r=="instead"||r=="after"))throw new Error("Go fuck yourself.");if(typeof t[e]!="function")throw new Error(`${e} is not a function in ${t.constructor.name}`);if(Object.hasOwnProperty.bind(t)(U)||(t[U]={}),!t[U].hasOwnProperty(e)){let l=Se.v4();t[U][e]=l}let a=t[U][e];if(!M[a]){let l=t[e];M[a]={originalFunction:l,functionParent:t,functionName:e,hooks:{before:{},instead:{},after:{}}},t[e]=function(){return Qt(a,arguments,this)};let c=l.toString();Object.assign(t[e],l),t[e].toString=()=>c}let i=Se.v4();return M[a].hooks[r][i]=n,()=>nt(a,i,r)}function Qt(e,t,n){let r=M[e],a=r.hooks,i=t;for(let f in a.before){let h=a.before[f].apply(n,[i]);Array.isArray(h)&&(i=h)}let l,c=Object.values(a.instead);function u(f){return r.originalFunction.apply(n,f)}if(c.length>0){let f=d=>c[0].apply(n,[d,u]);for(let d of c.slice(1)){let h=f;f=B=>d.apply(n,[B,h])}l=f(i)}else l=u(i);for(let f in a.after){let h=a.after[f].apply(n,[i,l]);typeof h!="undefined"&&(l=h)}return l}function tt(e,t,n){return ke(e,t,n,"before")}function ae(e,t,n){return ke(e,t,n,"instead")}function F(e,t,n){return ke(e,t,n,"after")}function nt(e,t,n){let r=M[e];if(r){let a=r.hooks;if(a[n][t])return delete a[n][t],delete r.functionParent[U][r.functionName],Object.keys(a).every(l=>Object.values(a[l]).length==0)&&(r.functionParent[r.functionName]=r.originalFunction,delete r.functionParent[U],delete M[e]),!0}return!1}function ot(){for(let e in M)for(let t of Object.keys(M[e].hooks)){if(!M[e])continue;let n=M[e].hooks[t];for(let r in n)nt(e,r,t)}}s();s();C();s();C();s();s();A();var k=class extends o.Component{constructor(t){super(t);this.state={hasError:!1}}static getDerivedStateFromError(t){return{hasError:!0,error:t}}render(){return this.state.hasError?o.createElement("div",{className:"cumcord-error-handler"},o.createElement("h1",{className:"cumcord-error-handler-title"},"Oops, we had a fucky wucky. (Cumcord)"),o.createElement("code",{className:"cumcord-error-handler-code"},`${this.state.error}`)):this.props.children}};var le=v("ModalCloseButton"),rt=oe("Header")[1],it=ne("Flex"),{openModal:Yt}=v("openModal","openModalLazy");function ce(e,t){Yt(n=>o.createElement(le.ModalRoot,{transitionState:n.transitionState,size:"large",className:"cumcord-settings-modal"},o.createElement(k,null,o.createElement(le.ModalHeader,{separator:!1},o.createElement(it.Child,{basis:"auto",grow:1,shrink:1,wrap:!1},o.createElement(rt,{tag:"h2",size:rt.Sizes.SIZE_20},e)),o.createElement(it.Child,{basis:"auto",grow:0,shrink:1,wrap:!1},o.createElement(le.ModalCloseButton,{onClick:n.onClose}))),o.createElement(le.ModalContent,null,t))))}T();s();C();var{openModal:Xt}=v("openModal","openModalLazy"),_e=v("button","colorRed"),en=ne("ConfirmModal"),tn=oe("Markdown")[1];async function K({header:e="Are you sure?",confirmText:t="Confirm",cancelText:n="Cancel",content:r="Are you sure you want to do that?",type:a="neutral"}={},i=()=>{}){return new Promise(l=>{var c,u=!1;switch(a.toLowerCase()){case"danger":c=_e.colorRed;break;case"confirm":c=_e.colorGreen;break;default:c=_e.colorBrandNew;break}function f(d){u||(u=!0,i(d),l(d))}Xt(d=>(d.transitionState===3&&f(!1),o.createElement(en,{header:e,confirmText:t,cancelText:n,transitionState:d.transitionState,confirmButtonColor:c,onClose:()=>{f(!1)},onCancel:()=>{f(!1),d.onClose()},onConfirm:()=>{f(!0),d.onClose()}},o.createElement(tn,{editable:!1},r))))})}s();A();s();C();var nn=p.findByDisplayNameAll("Header")[1],st=p.findByDisplayName("Text"),at=e=>o.createElement("div",{onClick:e.onClick,className:"cumcord-toast"+(e.className?` ${e.className}`:"")},e.title?o.createElement(nn,{className:"cumcord-toast-title"},e.title):null,e.content?o.createElement("div",{className:"cumcord-toast-content"},o.createElement(st,{size:st.Sizes.SIZE_16},e.content)):null);s();T();s();var lt=$(j()),_=lt.make({toasts:[]});var ct=()=>(S(_),o.createElement(o.Fragment,null,_.ghost.toasts.map(e=>e())));var W=document.createElement("div");function ut(){L("@keyframes cumcord-fadeIn{0%{opacity:0}100%{opacity:1}}.cumcord-toast-container{position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;display:flex;flex-direction:column-reverse;align-items:flex-end;z-index:999999}.cumcord-toast{background-color:var(--background-floating);padding:18px;margin-right:10px;margin-bottom:10px;display:flex;flex-direction:column;justify-content:center;gap:14px;align-content:center;pointer-events:all;border-radius:5px;box-shadow:var(--elevation-high);animation:cumcord-fadeIn .3s;max-width:400px;overflow-wrap:anywhere}.cumcord-toast-title{font-size:22px;line-height:1}"),W.className="cumcord-toast-container",document.getElementById("app-mount").prepend(W),be.render(o.createElement(ct,null),W)}function dt(){be.unmountComponentAtNode(W),W.remove()}function V({title:e,content:t,onClick:n=()=>{},className:r,duration:a=3e3}){let i=()=>o.createElement(at,{onClick:n,className:r,title:e,content:t});_.ghost.toasts.push(i),_.update();function l(){let c=_.ghost.toasts.indexOf(i);c>-1&&(_.ghost.toasts.splice(c,1),_.update())}return a!=1/0&&setTimeout(l,a),l}s();s();var Z=$(j());async function De(e){let t=await ie(`${e}_CUMCORD_STORE`)||{},n=Z.make(t),r=()=>se(`${e}_CUMCORD_STORE`,{...n.ghost});return n.on(Z.Events.SET,r),n.on(Z.Events.DELETE,r),n}var ft=$(j()),pt={cache:"no-store"},x=ft.make({}),g={},on=window.eval;function Pe(e,t){let n=Object.assign({},cumcord);n.pluginData=t;let r=new URL(t.id),a=`(cumcord)=>{return ${e}}`+atob("Ci8v")+`# sourceURL=${r.hostname}${r.pathname}`,i=on(a)(n),l=i;return typeof i=="function"&&(l=i(t)),l}async function ue(e){let t=g.ghost[e];if(!t)throw new Error(`Plugin ${e} not found`);if(x.ghost[e])throw new Error(`Plugin ${e} already loaded`);let n=Pe(t.js,{persist:await De(e),id:e});try{n.onLoad&&n.onLoad()}catch{}x.store[e]=n}function Te(e){let t=x.ghost[e];if(!t)throw new Error(`Plugin ${e} not found`);if(!x.ghost[e])throw new Error(`Plugin ${e} isn't loaded`);try{t.onUnload()}catch{}delete x.store[e]}function de(e){let t=g.store[e];if(!g.ghost[e])throw new Error(`Plugin ${e} not found`);t.enabled?(Te(e),t.enabled=!1):(ue(e),t.enabled=!0)}async function H(e){let t=e.replace(/\/?$/,"/"),n=new URL("plugin.json",t),r=new URL("plugin.js",t),a=g.ghost[t],i;a&&(i=g.store[t]);let l=a?a?.enabled:!0,c=a?a?.update:!0;a?.update==null&&a&&(i.update=!0,c=!0);let u;try{let h=await fetch(n,pt);if(u=await h.json(),h.status!=200&&!a)throw new Error("Plugin manifest not returning success")}catch{if(!a)throw new Error("Plugin manifest cannot be parsed")}if(a)if(u&&c){if(i.manifest.hash==u.hash){i.manifest!=u&&(i.manifest=u),l&&ue(t);return}}else{l&&ue(t);return}let f=await await fetch(r,pt);if(f.status!=200)throw new Error("Plugin not returning success");let d=await f.text();g.store[t]={manifest:u,js:d,enabled:l,update:c},l&&await ue(t)}function fe(e){try{Te(e)}catch{}delete g.store[e]}async function mt(){g=await De("PLUGIN_CACHE")}async function gt(){for(let e of Object.keys(g.ghost))H(e)}function ht(){for(let e of Object.keys(g.ghost))try{Te(e)}catch{}}var rn=p.findByDisplayName("Card"),sn=p.findByDisplayNameAll("Header")[1],an=p.findByDisplayName("Text"),Ne=p.findByDisplayName("Flex"),ln=p.findByDisplayNameAll("Markdown")[1],cn=p.findByDisplayName("Switch"),Oe=e=>{let t=g.ghost[e.pluginId],n=g;if(!t.manifest)return null;S(x,!1,(a,i)=>{if(i.path[0]==e.pluginId)return!0});let r=null;return x.ghost[e.pluginId]&&x.ghost[e.pluginId].settings&&(r=o.createElement("svg",{onClick:()=>{ce(t.manifest.name,x.ghost[e.pluginId].settings)},className:"cumcord-card-settings",xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px"},o.createElement("g",null,o.createElement("path",{d:"M0,0h24v24H0V0z",fill:"none"}),o.createElement("path",{d:"M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"})))),o.createElement(rn,{className:"cumcord-plugin-card",type:"cardPrimary",outline:!1,editable:!1},o.createElement(Ne,{justify:Ne.Justify.BETWEEN,align:Ne.Align.CENTER},o.createElement("div",{className:"cumcord-card-header"},o.createElement(sn,{className:"cumcord-card-title"},t.manifest.name),o.createElement(an,{className:"cumcord-card-author",tag:"h5"}," ","by ",o.createElement("strong",null,t.manifest.author))),o.createElement("div",{className:"cumcord-card-right"},o.createElement("div",{className:"cumcord-card-buttons"},r,o.createElement("svg",{onClick:()=>{V({content:"Copied plugin URL to clipboard.",duration:1300}),R(e.pluginId)},className:"cumcord-card-copy",xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px",fill:"none"},o.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),o.createElement("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"})),t.update?o.createElement("svg",{xmlns:"http://www.w3.org/2000/svg","enable-background":"new 0 0 24 24",height:"24px",viewBox:"0 0 24 24",width:"24px",onClick:()=>{n.store[e.pluginId].update=!1}},o.createElement("g",null,o.createElement("rect",{fill:"none",height:"24",width:"24",x:"0"})),o.createElement("g",null,o.createElement("g",null,o.createElement("g",null,o.createElement("path",{d:"M21,10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-0.1c-2.73,2.71-2.73,7.08,0,9.79s7.15,2.71,9.88,0 C18.32,15.65,19,14.08,19,12.1h2c0,1.98-0.88,4.55-2.64,6.29c-3.51,3.48-9.21,3.48-12.72,0c-3.5-3.47-3.53-9.11-0.02-12.58 s9.14-3.47,12.65,0L21,3V10.12z M12.5,8v4.25l3.5,2.08l-0.72,1.21L11,13V8H12.5z"}))))):o.createElement("svg",{xmlns:"http://www.w3.org/2000/svg","enable-background":"new 0 0 24 24",height:"24px",viewBox:"0 0 24 24",width:"24px",onClick:()=>{n.store[e.pluginId].update=!0}},o.createElement("g",null,o.createElement("rect",{fill:"none",height:"24",width:"24"})),o.createElement("path",{d:"M8.67,5.84L7.22,4.39C8.6,3.51,10.24,3,12,3c2.74,0,5.19,1.23,6.84,3.16L21,4v6h-6l2.41-2.41C16.12,6.02,14.18,5,12,5 C10.8,5,9.66,5.31,8.67,5.84z M13,7h-2v1.17l2,2V7z M19.78,22.61l-3-3C15.39,20.48,13.76,21,12,21c-4.97,0-9-4.03-9-9 c0-1.76,0.51-3.4,1.39-4.78L1.39,4.22l1.41-1.41l18.38,18.38L19.78,22.61z M15.32,18.15L5.84,8.67C5.31,9.66,5,10.8,5,12 c0,3.86,3.14,7,7,7C13.2,19,14.34,18.69,15.32,18.15z M20.94,13h-2.02c-0.12,0.83-0.39,1.61-0.77,2.32l1.47,1.47 C20.32,15.67,20.79,14.38,20.94,13z"})),o.createElement("svg",{onClick:()=>{K({header:"Do you want to remove this plugin?",content:`All of ${t.manifest.name}'s data will be deleted and cannot be recovered.`,type:"danger",confirmText:"Delete"},a=>{a&&(fe(e.pluginId),Qe(`${e.pluginId}_CUMCORD_STORE`))})},className:"cumcord-card-delete",xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px"},o.createElement("path",{d:"M0 0h24v24H0z",fill:"none"}),o.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none"}),o.createElement("path",{d:"M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"}))),o.createElement(cn,{checked:t.enabled,onChange:()=>{try{de(e.pluginId)}catch{}}}))),o.createElement(ln,{className:"cumcord-card-description"},t.manifest.description))};C();T();var yt=o.useState,un=p.findByDisplayName("FormTitle"),dn=p.findByDisplayName("FormSection"),fn=p.findByDisplayName("Flex"),pn=p.findByDisplayName("TextInput"),Ie=p.findByProps("Sizes","Colors","Looks","DropdownSizes"),mn=p.findByDisplayName("FormDivider"),wt=p.findByDisplayName("SearchBar");function vt(e,t){return e.toLowerCase().split(t.toLowerCase()).length-1}var Ct=()=>{let[e,t]=yt(""),[n,r]=yt("");function a(){r(""),H(n).then(()=>{}).catch(i=>V({title:"Failed to import plugin",content:i.message,duration:3e3}))}return S(g),o.createElement(k,null,o.createElement(dn,null,o.createElement(un,{tag:"h1"},"Plugins"),o.createElement(fn,{basis:"auto",grow:1,shrink:1},o.createElement(pn,{className:"cumcord-plugin-import",placeholder:"https://example.com/plugin",type:"text",value:n,onChange:i=>r(i),onKeyDown:i=>{i.key==="Enter"&&a()}}),o.createElement(Ie,{color:Ie.Colors.BRAND,size:Ie.Sizes.MEDIUM,onClick:a},"Add plugin")),o.createElement(wt,{className:"cumcord-plugin-search",query:e,onQueryChange:i=>{t(i)},placeholder:"Search...",size:wt.Sizes.MEDIUM}),o.createElement(mn,{className:"cumcord-plugin-divider"}),e?Object.keys(g.ghost).sort((i,l)=>{let c=Object.values(g.ghost[i].manifest).join(""),u=Object.values(g.ghost[l].manifest).join("");return vt(u,e)-vt(c,e)}).map(i=>o.createElement(Oe,{pluginId:i})):Object.keys(g.ghost).map(i=>o.createElement(Oe,{pluginId:i}))))};var xt={initializeSettings:function(){L(".cumcord-plugin-card{padding:16px;margin-bottom:10px}.cumcord-plugin-import{flex-grow:1;margin-right:20px}.cumcord-plugin-divider{margin-top:10px;margin-bottom:10px}.cumcord-plugin-search{margin-top:10px}.cumcord-card-header{display:inline-block}.cumcord-card-author,.cumcord-card-title{display:inline}.cumcord-card-right{display:flex}.cumcord-card-buttons{display:flex;margin-right:4px}.cumcord-card-buttons>*{fill:var(--interactive-normal);cursor:pointer;width:20px}.cumcord-card-buttons>*:hover{fill:var(--interactive-hover)}.cumcord-card-description{padding-top:3px;overflow-wrap:break-word}.cumcord-card-copy{width:18px}");let e=p.findByDisplayName("SettingsView");F("getPredicateSections",e.prototype,(t,n)=>{let r=n.findIndex(i=>i.section=="changelog")-1;if(r<0)return n;let a=[{section:"DIVIDER"},{section:"HEADER",label:"Cumcord"},{section:"CUMCORD_PLUGINS",label:"Plugins",element:Ct}];return n.splice(r,0,...a),n})}};T();s();C();s();s();T();var Be=$(j()),N=!1,E,bt=Be.make({});async function St(){if(N){if(E){y.log("Unloading previous plugin version...");try{E.onUnload()}catch(e){y.error("Failed to unload:",e)}}y.log("Loading new plugin version...");try{let e=await(await fetch("http://127.0.0.1:42069")).text();E=Pe(e,{persist:bt,id:"https://FAKE_PLUGIN_ID"}),E.onLoad&&E.onLoad()}catch(e){y.error("Failed to load:",e)}}}function Mt(){N=!N,N==!1&&(E.onUnload(),E=void 0,bt=Be.make({})),y.log(`Dev mode is now ${N?"on":"off"}.`)}function Et(){N?E?E.settings?ce("Fake Dev Plugin",E.settings):y.log("No settings for this plugin."):y.error("No plugin loaded!"):y.error("Dev mode is off!")}function je(e,t){var n;try{n=JSON.parse(e)}catch{return}switch(n.action.toLowerCase()){case"get_info":t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:n.uuid||Math.random(),status:"OK"}));return;case"install_plugin":if(n.url){if(!n.url.match(/^(http|https):\/\/[^ "]+$/)){t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:n.uuid||Math.random(),status:"ERROR",error:"Invalid URL."}));return}DiscordNative.window.focus(),K({header:"Do you want to install this plugin?",content:`Cumcord plugins can run code on your computer and can be potentially dangerous. Only click confirm if you trust the plugin from \`${n.url}\`.`,confirmText:"Install",cancelText:"Cancel",type:"danger"},r=>{if(r){H(n.url),t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:n.uuid||Math.random(),status:"OK"}));return}else{t.send(JSON.stringify({name:"CUMCORD_WEBSOCKET",uuid:n.uuid||Math.random(),status:"ERROR",error:"Plugin installation cancelled."}));return}})}else{t.send(JSON.stringify({uuid:n.uuid||Math.random(),status:"ERROR",error:"No URL provided."}));return}return;case"update_plugin_dev":N?(St(),t.send(JSON.stringify({uuid:n.uuid||Math.random(),status:"OK"}))):t.send(JSON.stringify({uuid:n.uuid||Math.random(),status:"ERROR",message:"Dev mode not enabled."}));return;default:return}}var pe=[];function kt(){window.DiscordNative&&ae("handleConnection",qe(e=>e.Z?.__proto__?.handleConnection).Z,(e,t)=>{let n=e[0];if(n.upgradeReq().url=="/cumcord")pe.push(n),n.on("message",r=>je(r,n)),n.on("close",()=>{pe.splice(pe.indexOf(n),1)});else return t(...e)})}function _t(){if(window.DiscordNative)for(let e of pe)e.close()}s();C();T();var Q=v("BUILT_IN_COMMANDS","BUILT_IN_SECTIONS"),gn=v("useApplicationCommandsDiscoveryState"),{sendMessage:Dt}=v("sendMessage"),{createBotMessage:hn}=v("createBotMessage"),{receiveMessage:yn}=v("receiveMessage"),O="917806991081099275",wn="2d179b0c17f137125df3f01949cb0e5f",vn="f76f807bfc5692f3f14d1935f063d64b",me={id:O,icon:wn,name:"Cumcord",type:1},I=[],Pt={string:{val:3,handle:e=>e.text},bool:{val:5,handle:e=>e.text=="True"},user:{val:6,handle:e=>e.userId},channel:{val:7,handle:e=>e.channelId},role:{val:8,handle(e){switch(e.type){case"textMention":return e.text;case"roleMention":return e.roleId}}}};function Tt(){F("getBuiltInCommands",Q,(e,t)=>[...t,...I]),F("useApplicationCommandsDiscoveryState",gn,(e,t)=>{if(t.applicationCommandSections.find(r=>r==me)||I.length==0)return;let n={...t};return n.discoveryCommands=[...n.discoveryCommands,...I],n.discoverySections.push({data:I,section:me,key:O}),n.applicationCommandSections.push(me),n})}function Nt(){delete Q.BUILT_IN_SECTIONS[O]}function Ot({name:e,description:t,args:n,handler:r}){Q.BUILT_IN_SECTIONS[O]||(Q.BUILT_IN_SECTIONS[O]=me);let a={applicationId:O,type:0,target:1,description:t,name:e,id:`-${Math.random().toString().split(".")[1].substring(0,5)}`};return n&&(a.options=n.map(i=>{i.type||(i.type="string");let l={...i};return l.type=Pt[i.type].val,l.required=l.required===void 0?!0:l.required,l})),a.execute=async(i,l)=>{if(!r)return;let c={};if(n)for(let u in i){let f=i[u][0];c[u]=Pt[n.find(d=>d.name==u).type].handle(f)}try{let u=await r({args:c,...l},f=>{let d=hn(l.channel.id);d.author.username="Cumcord",d.author.avatar=vn,d.author.id=O,typeof f=="string"?d.content=f:d={...d,...f},yn(d.channel_id,d)});u&&(typeof u=="string"?Dt(l.channel.id,{content:u}):Dt(l.channel.id,u))}catch(u){y.error(u)}},I.push(a),()=>{let i=I.indexOf(a);i>-1&&I.splice(i,1),I.length===0&&delete Q.BUILT_IN_SECTIONS[O]}}function Cn(){ht(),_t(),ot(),dt(),et();try{Nt()}catch{}return window.cumcord=void 0,delete window.cumcord,!0}var ge=[];async function xn(){y.log("Initializing Cumcord API"),window.cumcord={uninject:Cn,modules:{webpackModules:p,webpack:p,common:We,internal:Xe},plugins:{importPlugin:H,removePlugin:fe,togglePlugin:de},patcher:{before:tt,after:F,instead:ae,injectCSS:L},ui:{toasts:{showToast:V},modals:{showConfirmationModal:K},components:{ErrorBoundary:k}},utils:{logger:y,findInTree:D,findInReactTree:X,getReactInstance:J,getOwnerInstance:ee,sleep:te,useNest:S,copyText:R},commands:{addCommand:Ot},cum:()=>Array.isArray(ge)?new Promise(e=>{ge.push(e)}):"8==D ~~~~~~"},window.DiscordNative&&(window.cumcord.dev={toggleDevMode:Mt,showSettings:Et}),L(".cumcord-error-handler{font-family: var(--font-display);color:var(--text-normal);padding:16px}.cumcord-error-handler-title{margin-bottom:7px;font-weight:bold;font-size:24px}.cumcord-error-handler-code{background-color:var(--background-secondary);font-family:var(--font-code);user-select:text}"),ut(),await mt(),xt.initializeSettings(),window.cumcord.plugins.installed=g,window.cumcord.plugins.loaded=x;try{Tt()}catch{}await gt(),kt(),y.log("Cumcord is injected!");for(let e of ge)e("8==D ~~~~~~");ge=void 0}var It=xn;if(window.cumcord)throw new Error("Cumcord is already injected");It();})();
//# sourceURL=Cumcord