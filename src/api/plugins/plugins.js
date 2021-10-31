import { createPersistentNest } from "pluginStorage";
import * as nests from "nests";

const evalPtTwoTheEvalening = eval;

const noStore = { cache: "no-store" };

let loadedPlugins = nests.make({});
// Placeholder before initialization
let pluginCache = {};

// This can be used to make other implementations of plugin loading (e.g dev mode)
function evalPlugin(pluginCode, data) {
  const pluginObject = evalPtTwoTheEvalening(pluginCode + `\n//# sourceURL=${data.id}`);
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
      evaledPlugin.onLoad();
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

  let manifestJson;

  try {
    // Attempt to download the manifest
    let manifestData = await fetch(manifestUrl, noStore);
    manifestJson = await manifestData.json();

    // The server *must* return a success
    if (manifestData.status != 200) {
      if (!pluginExists) throw new Error("Plugin manifest not returning success");
    }

  } catch {
    // If this errors out then there's a problem with the manifest
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
  let pluginReq = await (await fetch(pluginUrl, noStore))

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

async function initializePluginStore() {
  pluginCache = await createPersistentNest("PLUGIN_CACHE");
}

async function initializePlugins() {
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
  initializePluginStore,
  initializePlugins,
  unloadAllPlugins,
  pluginCache,
  loadedPlugins
}