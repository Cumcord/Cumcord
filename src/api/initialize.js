// API Utils
import webpackModules from "webpackModules";
import commonModules from "commonModules";
import internalModules from "internalModules";
import settings from "./ui/settings/settings";
import pluginEmbeds from "./ui/pluginEmbeds/pluginEmbeds";
import * as utils from "utils";
import * as patcher from "patcher";
import * as websocket from "websocket";
import * as toasts from "toasts";
import * as modals from "modals";
import * as devmode from "devmode";
import * as components from "components";
import * as commands from "commands";
import * as lamivudine from "./lamivudine";

// Plugin management
import * as plugins from "plugins";

function uninject() {
  plugins.unloadAllPlugins();
  lamivudine.uninitializeLamivudine();
  websocket.uninitializeSocket();
  patcher.unpatchAll();
  toasts.uninitializeToasts();
  patcher.unpatchAllCss();
  window.cumcord = undefined;
  delete window.cumcord;
  return true;
}

let resolveQueue = [];

async function initializeAPI() {
  utils.logger.log("Initializing Cumcord API");

  window.cumcord = {
    uninject,
    modules: {
      webpackModules,
      webpack: webpackModules,
      common: commonModules,
      internal: internalModules,
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
      findAndPatch: patcher.findAndPatch,
      injectCSS: patcher.injectCSS,
    },
    ui: {
      toasts: {
        showToast: toasts.showToast,
      },
      modals: {
        showConfirmationModal: modals.showConfirmationModal,
      },
      components: {
        ErrorBoundary: components.ErrorBoundary,
      },
    },
    utils: {
      logger: utils.logger,
      findInTree: utils.findInTree,
      findInReactTree: utils.findInReactTree,
      getReactInstance: utils.getReactInstance,
      getOwnerInstance: utils.getOwnerInstance,
      sleep: utils.sleep,
      useNest: utils.useNest,
      copyText: utils.copyText,
      findByDomNode: utils.findByDomNode,
    },
    commands: {
      addCommand: commands.addCommand,
    },
    cum: (cockSize = 2, cumshotStrength = 6) => {
      const cock = `8${"=".repeat(cockSize)}D ${"~".repeat(cumshotStrength)}`;

      if (Array.isArray(resolveQueue)) {
        return new Promise((resolve) => {
          resolveQueue.push(() => resolve(cock));
        });
      } else {
        return cock;
      }
    },
  };

  // Native-only APIs
  if (window["DiscordNative"]) {
    window.cumcord.dev = {
      toggleDevMode: devmode.toggleDevMode,
      showSettings: devmode.showSettings,
    };
    Object.defineProperty(window.cumcord.dev, "storage", {
      configurable: true,
      enumerable: true,
      get: devmode.getStorage,
    });
    Object.defineProperty(window.cumcord.dev, "isEnabled", {
      configurable: true,
      enumerable: true,
      get: () => devmode.devModeOn,
    });
  }

  // Inject error boundary CSS
  patcher.injectCSS(
    `.cumcord-error-handler{font-family: var(--font-display);color:var(--text-normal);padding:16px}.cumcord-error-handler-title{margin-bottom:7px;font-weight:bold;font-size:24px}.cumcord-error-handler-code{background-color:var(--background-secondary);font-family:var(--font-code);user-select:text}`,
  );

  toasts.initializeToasts();
  await plugins.initializePluginStore();
  settings.initializeSettings();
  window.cumcord.plugins.installed = plugins.pluginCache;
  window.cumcord.plugins.loaded = plugins.loadedPlugins;
  try {
    commands.initializeCommands();
  } catch {} // intense patching is done here, could explode and break everything
  await plugins.initializePlugins();
  try {
    lamivudine.initializeLamivudine();
    pluginEmbeds.initializePluginEmbeds();
  } catch {}
  websocket.initializeSocket();
  utils.logger.log("Cumcord is injected!");

  for (let resolve of resolveQueue) {
    resolve();
  }

  // Clean up queue
  resolveQueue = undefined;
}

export default initializeAPI;
