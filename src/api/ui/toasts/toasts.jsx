import { React, ReactDOM } from 'commonModules';
import patcher from 'patcher';
import Toast from './components/Toast.jsx';

let div = document.createElement('div');

export default {
  initializeToasts: function () {
    patcher.injectCSS(`
    .cum-toast {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      pointer-events: none;
      display: flex;
      flex-direction: column-reverse;
      align-items: flex-end;
      z-index: 999999;
    }
    .cumcord-toast {
      min-width: 120px;
      min-height: 50px;
      padding: 5px;
      margin-right: 10px;
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
    }
    .cumcord-toast-title {
      font-size: 30px;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
    `);
    div.className = 'cum-toast';
    document.getElementById('app-mount').prepend(div);
  },
  uninitializeToasts: function () {
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  },
  showToast: function (text) {
    ReactDOM.render(<Toast>{text}</Toast>, div);
  },
};
