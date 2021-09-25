import { logger } from "utils";
import { showPluginSettings } from "pluginSettings";
import { evalPlugin } from "../plugins/plugins";
import * as nests from "nests";

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
    };

    logger.log("Loading new plugin version...")
    
    try {
      plugin = evalPlugin(code, {persist: storage, id: "FAKE_PLUGIN_ID"});
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

function showSettings() {
  if (devModeOn) {
    if (plugin) {
      if (plugin.settings) {
        showPluginSettings("Fake Dev Plugin", plugin.settings);
      } else {
        logger.log("No settings for this plugin.");
      }
    } else {
      logger.error("No plugin loaded!");
    }
  } else {
    logger.error("Dev mode is off!");
  }
}

export { loadPluginDev, toggleDevMode, devModeOn, showSettings };