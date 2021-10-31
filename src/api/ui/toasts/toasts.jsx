import { ReactDOM } from "commonModules";
import { injectCSS } from "patcher";
import Toast from "./components/Toast.jsx";
import ToastContainer from "./components/ToastContainer.jsx";
import toastStore from "./store.js";

let toastDiv = document.createElement("div");

function initializeToasts() {
  injectCSS(`@keyframes cumcord-fadeIn{0%{opacity:0}100%{opacity:1}}.cumcord-toast-container{position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;display:flex;flex-direction:column-reverse;align-items:flex-end;z-index:999999}.cumcord-toast{background-color:var(--background-floating);min-width:260px;min-height:88px;padding:12px;margin-right:10px;margin-bottom:10px;display:flex;flex-direction:column;justify-content:center;gap:8px;text-align:center;align-items:center;align-content:center;pointer-events:all;border-radius:5px;box-shadow:var(--elevation-high);animation:cumcord-fadeIn .3s}.cumcord-toast-title{font-size:30px;top:0;bottom:0;left:0;right:0}.cumcord-toast-content{width:189px}`);
  toastDiv.className = "cumcord-toast-container";
  document.getElementById("app-mount").prepend(toastDiv);
  ReactDOM.render(<ToastContainer />, toastDiv);
}

function uninitializeToasts() {
  ReactDOM.unmountComponentAtNode(toastDiv);
  toastDiv.remove();
}

function showToast({title, content, duration = 3000}) {
  const toast = () => <Toast title={title} content={content}></Toast>;
  toastStore.store.toasts.push(toast);

  function removeFunc() {
    let index = toastStore.ghost.toasts.indexOf(toast);

    if (index > -1) {
      toastStore.store.toasts.splice(index, 1);
    }
  };

  if (duration != Infinity) {
    setTimeout(removeFunc, duration);
  }

  return removeFunc;
}

export { initializeToasts, uninitializeToasts, showToast };