// core APIs
import * as modules from "./modules";
import * as patcher from "@patcher";
import { importPlugin, removePlugin, togglePlugin } from "@plugins";
import * as utils from "@utils";
import * as devmode from "@devmode";
import { addCommand } from "@commands";
import * as websocket from "@websocket";
// UI APIs
import { showToast } from "./ui/toasts";
import showConfirmationModal from "./ui/showConfirmationModal";
import * as components from "./ui/components";
import * as DNGetters from "./ui/dngetter";

export default (uninject, cum) => {
  const api = {
    uninject,
    cum,
    modules,
    plugins: {
      importPlugin,
      removePlugin,
      togglePlugin,
    },
    patcher: {
      before: patcher.before,
      after: patcher.after,
      instead: patcher.instead,
      findAndPatch: patcher.findAndPatch,
      injectCSS: patcher.injectCSS,
    },
    ui: {
      toasts: { showToast },
      modals: { showConfirmationModal },
      components,
      ...DNGetters,
    },
    utils,
    commands: { addCommand },
    websocket: {
      addHandler: websocket.addHandler,
      triggerHandler: websocket.triggerHandler,
    },
  };

  if (window.DiscordNative) {
    api.dev = {
      toggleDevMode: devmode.toggleDevMode,
      showSettings: devmode.showSettings,
    };

    Object.defineProperties(api.dev, {
      storage: { configurable: true, enumerable: true, get: devmode.getStorage },
      isEnabled: { configurable: true, enumerable: true, get: devmode.isDevModeOn },
    });
  }

  return api;
};
