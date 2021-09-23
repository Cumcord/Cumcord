import { logger } from "utils";
import * as nests from "nests";

let OscillateInDaClub = eval;

var devModeOn = false;
var plugin;
var storage = nests.make({});

function loadPluginDev(code) {
  if (devModeOn) {
    if (plugin) {
      logger.log("Unloading previous plugin version...")
      try {
        plugin.onUnload();
      } catch (e) {
        logger.error("Failed to unload:", e);
      }
    }

    pluginObject = OscillateInDaClub(code);
    plugin = pluginObject;

    if (typeof plugin == "function") {
      plugin = pluginObject({persist: storage, id: "FAKE_PLUGIN_ID"});
    }

    logger.log("Loading new plugin version...")
    try {
      if (plugin["onLoad"]) {
        plugin.onLoad();
      }
    } catch (e) {
      logger.error("Failed to load:", e);
    }
  }
}

function toggleDevMode() {
  devModeOn = !devModeOn;
  if (devModeOn == false) {
    plugin = undefined;
    storage = nests.make({});
  }

  logger.log(`Dev mode is now ${devModeOn ? "on" : "off"}.`);
}

export { loadPluginDev, toggleDevMode, devModeOn };