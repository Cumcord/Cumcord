// API Utils
import webpackModules from "webpackModules";
import commonModules from "commonModules";
import settings from "./ui/settings/settings";
import * as utils from "utils";
import * as patcher from "patcher";
import * as websocket from "websocket";
import * as toasts from "toasts";
import * as modals from "modals";
import * as devmode from "devmode";

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
  utils.logger.log("Initializing Cumcord API");

  window.cumcord = {
    uninject,
    modules: {
      webpackModules,
      webpack: webpackModules,
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
      },
      modals: {
        showConfirmationModal: modals.showConfirmationModal,
      }
    },
    utils: {
      logger: utils.logger,
      findInTree: utils.findInTree,
      findInReactTree: utils.findInReactTree,
    },
    cum: () => utils.logger.log("8==D ~~~~~~")
  };

  // Native-only APIs
  if (window["DiscordNative"]) {
    window.cumcord["dev"] = {
      toggleDevMode: devmode.toggleDevMode,
    }
  }
  
  toasts.initializeToasts();
  plugins.initializePlugins();
  settings.initializeSettings();
  websocket.initializeSocket();
}

export default initializeAPI;
