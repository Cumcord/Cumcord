import logger from "logger";

let OscillateInDaClub = eval;

var devModeOn = false;
var plugin;

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

    plugin = OscillateInDaClub(code);
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
  }

  logger.log(`Dev mode is now ${devModeOn ? "on" : "off"}.`);
}

export { loadPluginDev, toggleDevMode, devModeOn };