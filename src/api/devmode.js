import { logger } from "./utils";
import showPluginSettings from "./ui/showPluginSettings";
import { evalPlugin } from "./plugins";
import { nests } from "./modules/internalModules";

let isEnabled = false;
let plugin;
let storage = nests.make({});

export function showSettings() {
  if (!isEnabled) return logger.error("Dev mode is off!");
  if (!plugin) return logger.error("No plugin loaded!");
  if (!plugin.settings) return logger.warn("No settings for this plugin.");

  showPluginSettings("Fake Dev Plugin", plugin.settings);
}

// if loadPluginDev is run before it finishes loading the previous,
// it can result in more than one copy of FAKE_DEV_PLUGIN running,
// which this mutex avoids -- sink
let loadPluginMutex = false;

export async function loadPluginDev() {
  if (loadPluginMutex || !isEnabled) return;

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
    const code = await fetch("http://127.0.0.1:42069").then((r) => r.text());

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

    plugin.onLoad?.();
  } catch (e) {
    logger.error("Failed to load:", e);
  } finally {
    loadPluginMutex = false;
  }
}

export function toggleDevMode() {
  isEnabled = !isEnabled;
  if (!isEnabled) {
    plugin.onUnload();
    plugin = undefined;
    storage = nests.make({});
  }

  logger.log(`Dev mode is now ${isEnabled ? "on" : "off"}.`);
}

export function getStorage() {
  if (!isEnabled) return logger.error("Dev mode is off!");
  if (!plugin) return logger.error("No plugin loaded!");

  return storage;
}

export const isDevModeOn = () => isEnabled;
