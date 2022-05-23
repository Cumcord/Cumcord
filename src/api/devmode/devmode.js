import { logger } from "utils";
import { showPluginSettings } from "pluginSettings";
import { evalPlugin } from "../plugins/plugins";
import * as nests from "nests";

let devModeOn = false;
let plugin;
let storage = nests.make({});

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

// if loadPluginDev is run before it finishes loading the previous,
// it can result in more than one copy of FAKE_DEV_PLUGIN running,
// which this mutex avoids -- sink
let loadPluginMutex = false;

async function loadPluginDev() {
  if (loadPluginMutex) return; // RIP any calls while this on LMAO

  if (devModeOn) {
    if (plugin) {
      logger.log("Unloading previous plugin version...");
      try {
        plugin.onUnload();
      } catch (e) {
        logger.error("Failed to unload:", e);
      }
    }

    logger.log("Loading new plugin version...");
    loadPluginMutex = true;

    try {
      const code = await (await fetch("http://127.0.0.1:42069")).text();
      plugin = evalPlugin(code, {
        persist: storage,
        id: "https://FAKE_PLUGIN_ID",
        manifest: {
          name: "Fake Dev Plugin",
          description: "A fake plugin for development purposes.",
          author: "You",
          hash: "FAKE_PLUGIN_HASH",
          license: "Unlicensed",
        },
        showSettings,
      });
      if (plugin["onLoad"]) {
        plugin.onLoad();
      }
    } catch (e) {
      logger.error("Failed to load:", e);
    } finally {
      loadPluginMutex = false;
    }
  }
}

function toggleDevMode() {
  devModeOn = !devModeOn;
  if (devModeOn == false) {
    plugin.onUnload();
    plugin = undefined;
    storage = nests.make({});
  }

  logger.log(`Dev mode is now ${devModeOn ? "on" : "off"}.`);
}

const getStorage = () => {
  if (devModeOn) {
    if (plugin) return storage;
    else logger.error("No plugin loaded!");
  } else logger.error("Dev mode is off!");
};

export { loadPluginDev, toggleDevMode, devModeOn, showSettings, getStorage };
