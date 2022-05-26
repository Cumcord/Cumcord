// core APIs
import * as webpack from "@webpackModules";
import * as common from "@commonModules";
import * as internal from "@internalModules";
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
    modules: {
      // due to esbuild weirdness, spreads are required to export actual objects instead of ones using defineProperty
      // this is only an issue because its really annoying in devtools. It's functionally fine without.
      webpack: { ...webpack },
      common: { ...common },
      internal: { ...internal },
    },
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
      // see above comment
      components: { ...components },
      ...DNGetters,
    },
    // see above comment
    utils: { ...utils },
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
