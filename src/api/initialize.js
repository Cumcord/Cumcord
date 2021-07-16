import logger from "../util/logger";
import webpackModules from "webpackModules";
import commonModules from "commonModules";
import patcher from "./patcher/patch";
import { startPlugin, stopPlugin, togglePlugin, importPlugin } from "./plugins/pluginHandler";
import { get, set } from "idb-keyval";
import storage from "./plugins/storage";

function uninject() {
  delete window.cumcord;
  logger.log("Uninjecting Cumcord");
  patcher.unpatchAll();
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
      startPlugin,
      stopPlugin,
      togglePlugin,
      importPlugin,
    },
    patcher,
    storage
  };

  let plugins = await get("CumcordStore");

  if (plugins) {
    window.cumcord.pluginStore = plugins;
  } else {
    await set("CumcordStore", {});
    window.cumcord.pluginStore = {};
  }

  for (let plugin of Object.keys(window.cumcord.pluginStore)) {
    importPlugin(plugin);
  }
}

export default initializeAPI;
