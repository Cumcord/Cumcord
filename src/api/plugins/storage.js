import { set } from "idb-keyval";

export default {
  getPlugin: (pluginId) => {
    return window.cumcord.pluginStore[pluginId]
  },

  removePlugin: (pluginId) => {
    delete window.cumcord.pluginStore[pluginId]
    set("CumcordStore", window.cumcord.pluginStore)
  },

  setPlugin: (pluginId, pluginData) => {
    window.cumcord.pluginStore[pluginId] = pluginData
    set("CumcordStore", window.cumcord.pluginStore)
  },
}