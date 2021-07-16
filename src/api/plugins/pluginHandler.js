import storage from "./storage";

/* Example plugin pre-bundle

export default {
  // Toggle code
  onLoad: () => { },

  // Cleanup code
  onUnload: () => { },

  // Data to store
  stores: {
    API_URL: "https://example.com/api"
  },

  settings: (REACT COMPONENT WITH SETTINGS)
}
*/
const noStore = { cache: "no-store" }
const corsProxyUrl = "https://cors.bridged.cc/"

export function startPlugin(baseUrl) {
  let plugin = storage.getPlugin(baseUrl);
  plugin.enabled = true;

  storage.setPlugin(baseUrl, plugin)
  const pluginJs = eval(plugin.plugin);
  pluginJs.onLoad();
}

export function stopPlugin(baseUrl) {
  let plugin = storage.getPlugin(baseUrl);
  plugin.enabled = false;

  storage.setPlugin(baseUrl, plugin)
  const pluginJs = eval(plugin.plugin);
  pluginJs.onUnload();
}

export function togglePlugin(baseUrl) {
  let plugin = storage.getPlugin(baseUrl);

  if (plugin.enabled) {
    stopPlugin(baseUrl);
  }
  else {
    startPlugin(baseUrl);
  }
}
export async function importPlugin(baseUrl) {
  // Create standardized versions of the URL with a trailing / to prevent the ability to load plugins multiple times by removing a slash
  const baseUrlTrailing = new URL("", baseUrl).href;
  const manifestUrl = new URL("plugin.json", baseUrlTrailing).href;
  const pluginUrl = new URL("plugin.js", baseUrlTrailing).href;

  // Disable the cors proxy by default
  let corsMode = false;
  let manifestData;

  try {
    // Attempt to download the manifest
    manifestData = await fetch(manifestUrl, noStore);
  } catch {
    // If it fails, enable cors mode and attempt to download the manifest through the proxy
    corsMode = true;
    try {
      manifestData = await fetch(corsProxyUrl + manifestUrl, noStore);
    } catch (err) {
      throw err
    }
  }

  // Check if the server is returning a success
  if (manifestData.status != 200) {
    throw new Error("Plugin manifest not returning success");
  }

  let manifestJson;

  try {
    // Attempt to parse the manifest
    manifestJson = await manifestData.json();
  } catch {
    throw new Error("Plugin manifest cannot be parsed");
  }

  // Get the plugin if it is already downloaded
  const existingPlugin = storage.getPlugin(baseUrlTrailing);

  // By default, the plugin will be "enabled" and started when imported
  let enabled = true;

  // If the plugin is already downloaded, we check if it is cached, and if it is, we start it if it's enabled
  if (existingPlugin) {
    enabled = existingPlugin.enabled;
    if ((existingPlugin.manifest.hash == manifestJson.hash)) {
      if (enabled) {
        startPlugin(baseUrlTrailing)
      }

      // Plugin is already loaded and has the same hash as the manifest so we can skip the download
      return;
    }
  }

  // TODO.
  /* Prompt user before running startPlugin on a new plugin because it is unsafe as it uses eval.
  else {
    const continueImport = await confirmInstallation("CAUTION: Importing plugins is potentially dangerous. Would you like to continue?")
    if (!continueImport) {
      return;
    }
  }*/

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
  const plugin = await pluginReq.text();

  // Add the plugin to persistent storage
  storage.setPlugin(baseUrlTrailing, {
    manifest: manifestJson,
    plugin,
    enabled
  });

  // Start it if it's enabled
  if (enabled) {
    startPlugin(baseUrlTrailing);
  }

  return true
}
