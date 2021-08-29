import { ReactDOM } from 'commonModules';
import { injectCSS } from "patcher";
import Toast from './components/Toast.jsx';

let toastContainer = document.createElement('div');
let toastArray = [];

function forceRender() {
  ReactDOM.render(<div>{toastArray}</div>, toastContainer);
}


function initializeToasts() {
  injectCSS(`.cumcord-toast-container{position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;display:flex;flex-direction:column-reverse;align-items:flex-end;z-index:999999}.cumcord-toast{min-width:120px;min-height:50px;padding:5px;margin-right:10px;margin-bottom:10px;display:flex;justify-content:center;align-items:center;align-content:center;pointer-events:all}.cumcord-toast-title{font-size:30px;top:0;bottom:0;left:0;right:0}`);
  toastContainer.className = 'cumcord-toast-container';
  document.getElementById('app-mount').prepend(toastContainer);
  forceRender();
}

function uninitializeToasts() {
  ReactDOM.unmountComponentAtNode(toastContainer);
  toastContainer.remove();
}


function showToast(config) {
  const toast = <Toast>{config["title"]}</Toast>;
  toastArray.push(toast);
  forceRender();

  const removeFunc = () => {
    toastArray.splice(toastArray.indexOf(toast), 1);
    forceRender();
  }

  // SETTIMEOUT BULLSHIT GOES HERE
  let timer = setTimeout(() => { removeFunc(); clearTimeout(timer) }, config.duration);

  return removeFunc;
}

export { initializeToasts, uninitializeToasts, showToast };