import storage from "./storage";

const noStore = { cache: "no-store" }
const corsProxyUrl = "https://cors.bridged.cc/"

// These functions handle the loading and unloading of plugins without modifying whether or not they start with Discord.
export function loadPlugin(pluginId) {
  const plugin = storage.getPlugin(pluginId);

  if (!plugin) {
    throw new Error(`Plugin ${pluginId} not found`);
  }

  if (window.cumcord.plugins.loadedPlugins[pluginId]) {
    throw new Error(`Plugin ${pluginId} already loaded`);
  }

  const pluginObject = eval(plugin.js);

  window.cumcord.plugins.loadedPlugins[pluginId] = pluginObject;

  pluginObject.onLoad();
}

export function unloadPlugin(pluginId) {
  const plugin = storage.getPlugin(pluginId);

  if (!plugin) {
    throw new Error(`Plugin ${pluginId} not found`);
  }

  const pluginObject = window.cumcord.plugins.loadedPlugins[pluginId];

  if (pluginObject) {
    pluginObject.onUnload();
    delete window.cumcord.plugins.loadedPlugins[pluginId];
  } else {
    throw new Error(`Plugin ${pluginId} not loaded`);
  }
}

// These functions handle the enabling and disabling of plugins at startup.
export function enablePlugin(pluginId) {
  const plugin = storage.getPlugin(pluginId);
  const loaded = window.cumcord.plugins.loadedPlugins[pluginId];

  if (loaded) {
    unloadPlugin(pluginId);
  }

  loadPlugin(pluginId);

  if (!plugin.enabled) {
    plugin.enabled = true;
    storage.setPlugin(pluginId, plugin);
  }
}

export function disablePlugin(pluginId) {
  const plugin = storage.getPlugin(pluginId);

  if (loaded) {
    unloadPlugin(pluginId);
  }

  if (plugin.enabled) {
    plugin.enabled = false;
    storage.setPlugin(pluginId, plugin);
  }
}

export function togglePlugin(pluginId) {
  const plugin = storage.getPlugin(pluginId);

  if (plugin.enabled) {
    disablePlugin(pluginId);
  } else {
    enablePlugin(pluginId);
  }
}

// TODO: DO NOT FUCKING EXPORT THIS FUNCTION TO THE USER. WRAP THIS IN A FUNCTION THAT SHOWS A MODAL TO MAKE THE DECISION.
export async function importPlugin(baseUrl) {
  // Create standardized versions of the URL with a trailing / to prevent the ability to load plugins multiple times by removing a slash
  const baseUrlTrailing = baseUrl.replace(/\/?$/, '/');
  const manifestUrl = new URL("plugin.json", baseUrlTrailing);
  const pluginUrl = new URL("plugin.js", baseUrlTrailing);

  // By default, the plugin will be "enabled" and started when imported
  let enabled = true;
  const existingPlugin = storage.getPlugin(baseUrlTrailing);

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
    if (!existingPlugin) throw new Error("Plugin manifest not returning success");
  }

  try {
    // Attempt to parse the manifest
    manifestJson = await manifestData.json();
  } catch {
    if (!existingPlugin) throw new Error("Plugin manifest cannot be parsed");
  }

  // If the plugin is already downloaded, we check if it is cached, and if it is, we start it if it's enabled
  if (existingPlugin) {
    enabled = existingPlugin.enabled;
    if (manifestJson) {
      if (existingPlugin.manifest.hash == manifestJson.hash) {
        // Update manifest if it's changed
        if (existingPlugin.manifest != manifestJson) {
          existingPlugin.manifest = manifestJson;
          storage.setPlugin(baseUrlTrailing, existingPlugin)
        }

        if (enabled) {
          loadPlugin(baseUrlTrailing)

          return;
        }
      }
      // Always load if server is not accessible
    } else {
      if (enabled) {
        loadPlugin(baseUrlTrailing)

        return;
      }
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
  storage.setPlugin(baseUrlTrailing, {
    manifest: manifestJson,
    js,
    enabled
  });

  // Start it if it's enabled
  if (enabled) {
    loadPlugin(baseUrlTrailing);
  }

  return true
}
