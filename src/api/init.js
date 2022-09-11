import getApi from "./api";
// things to init
import { injectCSS } from "@patcher";
import { initializeToasts } from "@toasts";
import { initializePlugins, initializePluginStore, pluginCache, loadedPlugins } from "@plugins";
import { initializeSocket } from "@websocket";
import { initializeCommands } from "@commands";
import { initUserSettings } from "@userSettings";
// things to uninit
import { unpatchAll, unpatchAllCss } from "@patcher";
import { unloadAllPlugins } from "@plugins";
import { uninitializeSocket } from "@websocket";
import { uninitializeToasts } from "@toasts";

let resolveQueue = [];

export default async (extraInit, extraUninit, apiSyncEscape) => {
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

  // synchronously gets the api out ASAP
  // assuming the object reference remains intact once escaped plugin stuff will assign onto it just fine
  apiSyncEscape?.(api);

  injectCSS(
    `.cumcord-error-handler{font-family:var(--font-display);color:var(--text-normal);padding:16px}.cumcord-error-handler-title{margin-bottom:7px;font-weight:700;font-size:24px}.cumcord-error-handler-code{background-color:var(--background-secondary);font-family:var(--font-code);user-select:text}.cumcord-error-handler-btn{color:var(--text-danger);background:0 0;border:1px solid var(--text-danger);border-radius:3px;transition-property:color,background-color,border-color;transition-duration:.17s;transition-timing-function:ease;display:block;padding:.1rem .5rem}.cumcord-error-handler-btn:hover{color:var(--button-outline-danger-text-hover);background:var(--text-danger)}`,
  );

  initializeToasts();
  initializeSocket();
  initUserSettings();
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
