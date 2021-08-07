import { get, set } from "idb-keyval";
import { importPlugin, unloadPlugin, enablePlugin, disablePlugin, togglePlugin } from "./pluginHandler";

function removePlugin(pluginId) {
  unloadPlugin(pluginId);

  delete window.cumcord.plugins.pluginCache[pluginId]
  window.cumcord.plugins.pluginCache[pluginId] = undefined;
  set("CumcordCache", window.cumcord.plugins.pluginCache)
}

export default {
  initializePlugins: async () => {
    let plugins = await get("CumcordCache");

    window.cumcord.plugins.loadedPlugins = {};
    if (plugins) {
      window.cumcord.plugins.pluginCache = plugins;
    } else {
      await set("CumcordCache", {});
      window.cumcord.plugins.pluginCache = {};
    }

    for (let plugin of Object.keys(window.cumcord.plugins.pluginCache)) {
      importPlugin(plugin);
    }

    window.cumcord.plugins.importPlugin = importPlugin;
    window.cumcord.plugins.removePlugin = removePlugin;
    window.cumcord.plugins.enablePlugin = enablePlugin;
    window.cumcord.plugins.disablePlugin = disablePlugin;
    window.cumcord.plugins.togglePlugin = togglePlugin;
  },

  getPlugin: (pluginId) => {
    return window.cumcord.plugins.pluginCache[pluginId]
  },

  setPlugin: (pluginId, pluginData) => {
    window.cumcord.plugins.pluginCache[pluginId] = pluginData
    set("CumcordCache", window.cumcord.plugins.pluginCache)
  },

  removePlugin
}