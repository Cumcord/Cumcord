// API Utils
import logger from "../util/logger";
import webpackModules from "webpackModules";
import commonModules from "commonModules";
import settings from "./ui/settings/settings";
import * as patcher from "patcher";
import * as websocket from "websocket";
import * as toasts from "toasts";

// Plugin management
import * as plugins from "plugins";

function uninject() {
  plugins.unloadAllPlugins();
  websocket.uninitializeSocket();
  patcher.unpatchAll();
  toasts.uninitializeToasts();
  patcher.unpatchAllCss();

  window.cumcord = undefined;
  delete window.cumcord;
  return true;
}

async function initializeAPI() {
  logger.log("Initializing Cumcord API");

  window.cumcord = {
    uninject,
    modules: {
      webpackModules,
      common: commonModules,
    },
    plugins: {
      importPlugin: plugins.importPlugin,
      removePlugin: plugins.removePlugin,
      togglePlugin: plugins.togglePlugin,
    },
    patcher: {
      before: patcher.before,
      after: patcher.after,
      instead: patcher.instead,
      injectCSS: patcher.injectCSS,
    },
    ui: {
      toasts: {
        showToast: toasts.showToast,
      }
    },
    cum: () => logger.log("8==D ~~~")
  };

  toasts.initializeToasts();
  plugins.initializePlugins();
  settings.initializeSettings();
  websocket.initializeSocket();
}

export default initializeAPI;
