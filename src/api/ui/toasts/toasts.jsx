import { ReactDOM } from 'commonModules';
import { injectCSS } from "patcher";
import Toast from './components/Toast.jsx';
import ToastContainer from "./components/ToastContainer.jsx";
import { addToast, removeToast } from "./store.js";

let toastDiv = document.createElement('div');
let toastArray = [];

function initializeToasts() {
  injectCSS(`.cumcord-toast-container{position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;display:flex;flex-direction:column-reverse;align-items:flex-end;z-index:999999}.cumcord-toast{min-width:120px;min-height:50px;padding:5px;margin-right:10px;margin-bottom:10px;display:flex;justify-content:center;align-items:center;align-content:center;pointer-events:all}.cumcord-toast-title{font-size:30px;top:0;bottom:0;left:0;right:0}`);
  toastDiv.className = 'cumcord-toast-container';
  document.getElementById('app-mount').prepend(toastDiv);
  ReactDOM.render(<ToastContainer />, toastDiv);
}

function uninitializeToasts() {
  ReactDOM.unmountComponentAtNode(toastDiv);
  toastDiv.remove();
}

function showToast(config) {
  const toast = <Toast>{config["title"]}</Toast>;
  addToast(toast);

  const removeFunc = () => {
    removeToast(toast);
  }

  // SETTIMEOUT BULLSHIT GOES HERE
  let timer = setTimeout(() => { removeFunc(); clearTimeout(timer) }, config.duration);

  return removeFunc;
}

export { initializeToasts, uninitializeToasts, showToast };