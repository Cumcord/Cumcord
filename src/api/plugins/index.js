import { createPersistentNest } from "pluginStorage";
import { showPluginSettings } from "pluginSettings";
import { nests } from "internalModules";

const noStore = { cache: "no-store" };

export const loadedPlugins = nests.make({});
// Placeholder before initialization
export let pluginCache = {};

const evalPartTwoTheEvalening = window.eval;

// This can be used to make other implementations of plugin loading (e.g dev mode)
export function evalPlugin(pluginCode, data) {
  const ccPluginEdition = Object.assign({ pluginData: data }, cumcord);

  // Add plugin URL to eval to make it easier to debug
  const pluginURL = new URL(data.id);

  /*
		I know it's sketchy to add an atob to the eval but JS tools like prettifiers
		freak out when there's a comment *in* the code. To back up this claim you can
		run previous Cumcord versions through de4js (https://lelinhtinh.github.io/de4js/)
		and see that halfway through the code cuts off.
	*/
  // `atob("Ci8v")` Turns into "\n//"
  const pluginString =
    `(cumcord)=>{return ${pluginCode}}` +
    atob("Ci8v") +
    `# sourceURL=${pluginURL.hostname}${pluginURL.pathname}`;

  const pluginRet = evalPartTwoTheEvalening(pluginString)(ccPluginEdition);

  return typeof pluginRet == "function" ? pluginRet(data) : pluginRet;
}

export async function startPlugin(pluginId) {
  const plugin = pluginCache.ghost[pluginId];

  if (!plugin) throw new Error(`Plugin ${pluginId} not found`);

  if (loadedPlugins.ghost[pluginId]) throw new Error(`Plugin ${pluginId} already loaded`);

  const evaledPlugin = evalPlugin(plugin.js, {
    persist: await createPersistentNest(pluginId),
    id: pluginId,
    manifest: plugin.manifest,
    showSettings() {
      showPluginSettings(plugin.manifest.name, loadedPlugins.ghost[pluginId].settings);
    },
  });

  try {
    evaledPlugin.onLoad?.();
  } catch {}

  loadedPlugins.store[pluginId] = evaledPlugin;
}

export function stopPlugin(pluginId) {
  const plugin = loadedPlugins.ghost[pluginId];

  if (!plugin) throw new Error(`Plugin ${pluginId} not found`);

  if (!loadedPlugins.ghost[pluginId]) throw new Error(`Plugin ${pluginId} isn't loaded`);

  try {
    plugin.onUnload();
  } catch {}

  delete loadedPlugins.store[pluginId];
}

export function togglePlugin(pluginId) {
  const plugin = pluginCache.store[pluginId];

  if (!pluginCache.ghost[pluginId]) throw new Error(`Plugin ${pluginId} not found`);

  if (plugin.enabled) {
    stopPlugin(pluginId);
    plugin.enabled = false;
  } else {
    startPlugin(pluginId);
    plugin.enabled = true;
  }
}

export async function importPlugin(baseUrl) {
  // Create standardized versions of the URL with a trailing / to prevent the ability to load plugins multiple times by removing a slash
  const baseUrlTrailing = baseUrl.replace(/\/?$/, "/");
  const manifestUrl = new URL("plugin.json", baseUrlTrailing).href;
  const pluginUrl = new URL("plugin.js", baseUrlTrailing).href;

  const pluginExists = pluginCache.ghost[baseUrlTrailing];

  const existingPlugin = !pluginExists ? undefined : pluginCache.store[baseUrlTrailing];

  // By default, the plugin will be "enabled" and started when imported
  const enabled = pluginExists?.enabled ?? true;
  let update = pluginExists?.update ?? true;

  // Resolution for people who used Cumcord before this update
  if (pluginExists?.update === undefined && pluginExists) {
    existingPlugin.update = true;
    update = true;
  }

  let manifestJson;

  try {
    // Attempt to download the manifest
    let manifestData = await fetch(manifestUrl, noStore);
    manifestJson = await manifestData.json();

    // The server *must* return 200
    if (manifestData.status !== 200 && !pluginExists)
      // noinspection ExceptionCaughtLocallyJS
      throw new Error("Plugin manifest not returning 200");
  } catch (e) {
    if (!pluginExists) throw new Error(`Plugin manifest cannot be parsed: ${e}`);
  }

  // If the plugin is already downloaded, we check if it is cached, and if it is, we start it if it's enabled
  if (pluginExists) {
    if (manifestJson && update) {
      if (existingPlugin.manifest.hash === manifestJson.hash) {
        // Update manifest if it's changed
        if (existingPlugin.manifest !== manifestJson) existingPlugin.manifest = manifestJson;
      } else return;
    }

    if (enabled) await startPlugin(baseUrlTrailing);

    return;
  }

  // Initialize plugin request variable
  let pluginReq = await fetch(pluginUrl, noStore);

  // Validate that the server returned a success
  if (pluginReq.status !== 200) throw new Error("Plugin not returning 200");

  // Get the plugin's JS code
  const js = await pluginReq.text();

  // Add the plugin to persistent storage
  pluginCache.store[baseUrlTrailing] = {
    manifest: manifestJson,
    js,
    enabled,
    update,
  };

  // Start it if it's enabled
  if (enabled) await startPlugin(baseUrlTrailing);
}

export function removePlugin(pluginId) {
  // I'd check if it's loaded before doing this, but unloadPlugin already checks if it's loaded so I just catch the error
  try {
    stopPlugin(pluginId);
  } catch {}

  delete pluginCache.store[pluginId];
}

export async function initializePluginStore() {
  pluginCache = await createPersistentNest("PLUGIN_CACHE");
}

export async function initializePlugins() {
  await Promise.allSettled(Object.keys(pluginCache.ghost).map(importPlugin));
}

export function unloadAllPlugins() {
  for (let plugin of Object.keys(pluginCache.ghost)) {
    try {
      stopPlugin(plugin);
    } catch {}
  }
}
