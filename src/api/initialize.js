// API Utils
import logger from "../util/logger";
import webpackModules from "webpackModules";
import commonModules from "commonModules";
import patcher from "./patcher/patch";

// Plugin management
import storage from "./plugins/storage";
import { unloadPlugin } from "./plugins/pluginHandler";

function uninject() {
  for (let plugin of Object.keys(window.cumcord.plugins.pluginCache)) {
    try {
      unloadPlugin(plugin);
    } catch { }
  }

  patcher.unpatchAll();
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
    plugins: {},
    patcher,
  };

  await storage.initializePlugins();
}

export default initializeAPI;
