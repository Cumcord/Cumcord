import { createPersistentNest } from "pluginStorage";
import * as nests from "nests";

const evalPtTwoTheEvalening = eval;

const noStore = { cache: "no-store" };
const corsProxyUrl = "https://cors.bridged.cc/";

let loadedPlugins = nests.make({});
// Placeholder before initialization
let pluginCache = {};

// This can be used to make other implementations of plugin loading (e.g dev mode)
function evalPlugin(pluginCode, data) {
  const pluginObject = evalPtTwoTheEvalening(pluginCode);
  let pluginData = pluginObject;

  if (typeof pluginObject == "function") {
    // Typically { persist: await createPersistentNest(pluginId), id: pluginId }
    pluginData = pluginObject(data);
  }

  return pluginData;
}

async function startPlugin(pluginId) {
  const plugin = pluginCache.ghost[pluginId];

  if (!plugin) {
    throw new Error(`Plugin ${pluginId} not found`);
  }

  if (loadedPlugins.ghost[pluginId]) {
    throw new Error(`Plugin ${pluginId} already loaded`);
  }

  const evaledPlugin = evalPlugin(plugin.js, { persist: await createPersistentNest(pluginId), id: pluginId });

  try {
    if (evaledPlugin["onLoad"]) {
      pluginData.onLoad();
    }
  } catch {}

  loadedPlugins.store[pluginId] = evaledPlugin;
}

function stopPlugin(pluginId) {
  const plugin = loadedPlugins.ghost[pluginId];

  if (!plugin) {
    throw new Error(`Plugin ${pluginId} not found`);
  }

  if (!loadedPlugins.ghost[pluginId]) {
    throw new Error(`Plugin ${pluginId} isn't loaded`);
  }

  try {
    plugin.onUnload();
  } catch {}

  delete loadedPlugins.store[pluginId];
}

function togglePlugin(pluginId) {
  const plugin = pluginCache.store[pluginId];

  if (!pluginCache.ghost[pluginId]) {
    throw new Error(`Plugin ${pluginId} not found`);
  }

  if (plugin.enabled) {
    stopPlugin(pluginId);
    plugin.enabled = false;
  } else {
    startPlugin(pluginId);
    plugin.enabled = true;
  }
}


async function importPlugin(baseUrl) {
  // Create standardized versions of the URL with a trailing / to prevent the ability to load plugins multiple times by removing a slash
  const baseUrlTrailing = baseUrl.replace(/\/?$/, '/');
  const manifestUrl = new URL("plugin.json", baseUrlTrailing);
  const pluginUrl = new URL("plugin.js", baseUrlTrailing);

  const pluginExists = pluginCache.ghost[baseUrlTrailing];
  const existingPlugin = pluginCache.store[baseUrlTrailing];

  // By default, the plugin will be "enabled" and started when imported
  let enabled = (pluginExists ? existingPlugin.enabled : true);

  // Disable the cors proxy by default
  let corsMode = false;
  let manifestData;
  let manifestJson;

  try {
    // Attempt to download the manifest
    manifestData = await fetch(manifestUrl, noStore);
  } catch {
    // If it fails, enable cors mode and attempt to download the manifest through the proxy
    corsMode = true;
    manifestData = await fetch(corsProxyUrl + manifestUrl, noStore);
  }

  // If the plugin already exists in the cache then even if we cannot fetch it we can use the cached version, and as such these errors will not apply
  // Check if the server is returning a success
  if (manifestData.status != 200) {
    if (!pluginExists) throw new Error("Plugin manifest not returning success");
  }

  try {
    // Attempt to parse the manifest
    manifestJson = await manifestData.json();
  } catch {
    if (!pluginExists) throw new Error("Plugin manifest cannot be parsed");
  }

  // If the plugin is already downloaded, we check if it is cached, and if it is, we start it if it's enabled
  if (pluginExists) {
    if (manifestJson) {
      if (existingPlugin.manifest.hash == manifestJson.hash) {
        // Update manifest if it's changed
        if (existingPlugin.manifest != manifestJson) {
          existingPlugin.manifest = manifestJson;
        }

        if (enabled) {
          startPlugin(baseUrlTrailing)
        }

        return;
      } // The plugin will load if the server is unreachable
    } else {
      if (enabled) {
        startPlugin(baseUrlTrailing)
      }

      return;
    }
  }

  // Initialize plugin request variable
  let pluginReq;

  // Download the plugin through the cors proxy if corsMode is enabled
  if (!corsMode) {
    pluginReq = await (await fetch(pluginUrl, noStore))
  } else {
    pluginReq = await (await fetch(corsProxyUrl + pluginUrl, noStore))
  }

  // Validate that the server returned a success
  if (pluginReq.status != 200) {
    throw new Error("Plugin not returning success");
  }

  // Get the plugin's JS code
  const js = await pluginReq.text();

  // Add the plugin to persistent storage
  pluginCache.store[baseUrlTrailing] = {
    manifest: manifestJson,
    js,
    enabled
  };

  // Start it if it's enabled
  if (enabled) {
    await startPlugin(baseUrlTrailing);
  }

  return;
}

function removePlugin(pluginId) {
  // I'd check if it's loaded before doing this, but unloadPlugin already checks if it's loaded so I just catch the error
  try {
    stopPlugin(pluginId);
  } catch {}

  delete pluginCache.store[pluginId];
}

async function initializePlugins() {
  // Initialize plugin cache
  pluginCache = await createPersistentNest("PLUGIN_CACHE");
  for (let plugin of Object.keys(pluginCache.ghost)) {
    importPlugin(plugin);
  }
}

function unloadAllPlugins() {
  for (let plugin of Object.keys(pluginCache.ghost)) {
    try {
      stopPlugin(plugin);
    } catch {}
  }
}

export {
  evalPlugin,
  startPlugin,
  stopPlugin,
  togglePlugin,
  importPlugin,
  removePlugin,
  initializePlugins,
  unloadAllPlugins,
  pluginCache,
  loadedPlugins
}