import { ReactDOM } from "@commonModules";
import { injectCSS } from "@patcher";
import Toast from "./components/Toast.jsx";
import ToastContainer from "./components/ToastContainer.jsx";
import toastStore from "./store.js";

const toastDiv = document.createElement("div");
toastDiv.className = "cumcord-toast-container";

export function initializeToasts() {
  injectCSS(
    `@keyframes cumcord-fadeIn{0%{opacity:0}100%{opacity:1}}.cumcord-toast-container{position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;display:flex;flex-direction:column-reverse;align-items:flex-end;z-index:999999}.cumcord-toast{background-color:var(--background-floating);padding:18px;margin-right:10px;margin-bottom:10px;display:flex;flex-direction:column;justify-content:center;gap:14px;align-content:center;pointer-events:all;border-radius:5px;box-shadow:var(--elevation-high);animation:cumcord-fadeIn .3s;max-width:400px;overflow-wrap:anywhere}.cumcord-toast-title{font-size:22px;line-height:1}`,
  );
  document.getElementById("app-mount").prepend(toastDiv);
  ReactDOM.render(<ToastContainer />, toastDiv);
}

export function uninitializeToasts() {
  ReactDOM.unmountComponentAtNode(toastDiv);
  toastDiv.remove();
}

export function showToast({ title, content, onClick = () => {}, className, duration = 3000 }) {
  const toast = () => <Toast {...{ onClick, className, title, content }} />;

  toastStore.ghost.toasts.push(toast);
  toastStore.update();

  function removeFunc() {
    const index = toastStore.ghost.toasts.indexOf(toast);

    if (index > -1) {
      toastStore.ghost.toasts.splice(index, 1);
      toastStore.update();
    }
  }

  if (duration !== Infinity) setTimeout(removeFunc, duration);

  return removeFunc;
}
