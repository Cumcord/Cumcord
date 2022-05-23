// modules
import webpackModules from "webpackModules";
import * as commonModules from "commonModules";
import * as internalModules from "internalModules";
// core apis
import * as patcher from "patcher";
import * as plugins from "plugins";
import * as utils from "utils";
import * as devmode from "devmode";
import * as commands from "commands";
import * as websocket from "websocket";
// UI apis
import * as toasts from "toasts";
import * as modals from "modals";
import * as components from "components";
import * as DNGetters from "./ui/dngetter";
// UI
import * as settings from "./ui/settings/settings";
import pluginEmbeds from "./ui/pluginEmbeds/pluginEmbeds";
import * as lamivudine from "./ui/lamivudine.js";

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
      webpackModules, // backwards compat
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
      ...DNGetters,
    },
    utils,
    commands: {
      addCommand: commands.addCommand,
    },
    websocket: {
      addHandler: websocket.addHandler,
      triggerHandler: websocket.triggerHandler,
    },
    cum: (cockSize = 2, cumshotStrength = 6) => {
      const cock = `8${"=".repeat(cockSize)}D ${"~".repeat(cumshotStrength)}`;

      return Array.isArray(resolveQueue)
        ? new Promise((resolve) => resolveQueue.push(() => resolve(cock)))
        : cock;
    },
  };

  // Native-only APIs
  if (window.DiscordNative) {
    window.cumcord.dev = {
      toggleDevMode: devmode.toggleDevMode,
      showSettings: devmode.showSettings,
    };

    Object.defineProperties(window.cumcord.dev, {
      storage: { configurable: true, enumerable: true, get: devmode.getStorage },
      isEnabled: { configurable: true, enumerable: true, get: devmode.isDevModeOn },
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

  resolveQueue.forEach((r) => r());

  resolveQueue = undefined;
}

if (window.cumcord) throw new Error("Cumcord is already injected");

initializeAPI();
