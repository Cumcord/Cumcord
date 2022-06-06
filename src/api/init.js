import getApi from "./api";
// things to init
import { injectCSS } from "@patcher";
import { initializeToasts } from "@toasts";
import { initializePlugins, initializePluginStore, pluginCache, loadedPlugins } from "@plugins";
import { initializeSocket } from "@websocket";
import { initializeCommands } from "@commands";
// things to uninit
import { unpatchAll, unpatchAllCss } from "@patcher";
import { unloadAllPlugins } from "@plugins";
import { uninitializeSocket } from "@websocket";
import { uninitializeToasts } from "@toasts";

let resolveQueue = [];

export default async (extraInit, extraUninit) => {
  const api = getApi(
    // uninject
    () => {
      unloadAllPlugins();
      uninitializeSocket();
      unpatchAll();
      uninitializeToasts();
      unpatchAllCss();
      // UI stuff if necessary
      extraUninit?.();

      return true;
    },
    // cumcord.cum()
    (length = 2, shotStrength = 6) => {
      const cock = `8${"=".repeat(length)}D ${"~".repeat(shotStrength)}`;

      return Array.isArray(resolveQueue)
        ? new Promise((resolve) => resolveQueue.push(() => resolve(cock)))
        : cock;
    },
  );

  injectCSS(
    `.cumcord-error-handler{font-family: var(--font-display);color:var(--text-normal);padding:16px}.cumcord-error-handler-title{margin-bottom:7px;font-weight:bold;font-size:24px}.cumcord-error-handler-code{background-color:var(--background-secondary);font-family:var(--font-code);user-select:text}`,
  );

  initializeToasts();
  initializeSocket();
  await initializePluginStore();
  api.plugins.installed = pluginCache;
  api.plugins.loaded = loadedPlugins;

  // intense patching, so catch errors
  try {
    initializeCommands();
  } catch {}

  // UI stuff if necessary
  await extraInit?.();

  // plugins are meant to be loaded last.
  // which seems obvious in hindsight but apparently not for my monke brain
  await initializePlugins(api);

  resolveQueue.forEach((r) => r());
  resolveQueue = undefined;

  return api;
};
