import { logger } from "utils";

let OscillateInDaClub = eval;

var devModeOn = false;
var plugin;
var storage = {};

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
    var plugin = pluginObject;

    if (typeof plugin == "function") {
      plugin = pluginObject(storage);
    }

    logger.log("Loading new plugin version...")
    try {
      plugin.onLoad();
    } catch (e) {
      logger.error("Failed to load:", e);
    }
  }
}

function toggleDevMode() {
  devModeOn = !devModeOn;
  if (devModeOn == false) {
    plugin = undefined;
    storage = {};
  }

  logger.log(`Dev mode is now ${devModeOn ? "on" : "off"}.`);
}

export { loadPluginDev, toggleDevMode, devModeOn };