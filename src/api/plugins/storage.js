import { set } from "idb-keyval";
import { stopPlugin } from "./pluginHandler"

export default {
  getPlugin: (pluginId) => {
    return window.cumcord.pluginStore[pluginId]
  },

  removePlugin: (pluginId) => {
    if (window.cumcord.pluginStore[pluginId].enabled) {
      stopPlugin(pluginId)
    }

    delete window.cumcord.pluginStore[pluginId]
    set("CumcordStore", window.cumcord.pluginStore)
  },

  setPlugin: (pluginId, pluginData) => {
    window.cumcord.pluginStore[pluginId] = pluginData
    set("CumcordStore", window.cumcord.pluginStore)
  },
}