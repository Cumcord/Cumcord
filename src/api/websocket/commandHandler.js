// This file is a basic websocket command handler.

import { loadPluginDev, devModeOn } from "devmode";
import { importPlugin } from "plugins";
import { showConfirmationModal } from "modals";

export default function commandHandler(msg, ws) {
  var parsed;
  try {
    parsed = JSON.parse(msg);
  } catch {
    return;
  }

  switch (parsed["action"].toLowerCase()) {
    case "get_info":
      ws.send(JSON.stringify({
        "name": "CUMCORD_WEBSOCKET",
        "uuid": parsed["uuid"] || Math.random(),
        "status": "OK",
      }))
      return;
    case "install_plugin":
      if (parsed["url"]) {
        // Check if the URL is a valid URL.
        if (!parsed["url"].match(/^(http|https):\/\/[^ "]+$/)) {
          ws.send(JSON.stringify({
            "name": "CUMCORD_WEBSOCKET",
            "uuid": parsed["uuid"] || Math.random(),
            "status": "ERROR",
            "error": "Invalid URL.",
          }))
          return;
        }

        if (window["DiscordNative"]) {
          // Focus the window to make sure the modal is visible.
          DiscordNative.window.focus();
        }

        showConfirmationModal({header: "Do you want to install this plugin?", content: `Cumcord plugins can run code on your computer and can be potentially dangerous. Only click confirm if you trust the plugin from \`${parsed["url"]}\`.`, confirmText: "Install", cancelText: "Cancel", type: "danger"}, (result) => {
          if (result) {
            importPlugin(parsed["url"]);
            return;
          } else {
            ws.send(JSON.stringify({
              "name": "CUMCORD_WEBSOCKET",
              "uuid": parsed["uuid"] || Math.random(),
              "status": "ERROR",
              "error": "Plugin installation cancelled.",
            }))
            return;
          }
        })
      } else {
        ws.send(JSON.stringify({
          "uuid": parsed["uuid"] || Math.random(),
          "status": "ERROR",
          "error": "No URL provided.",
        }))
        // Unnecessary but cleaner.
        return;
      }
      return;
    case "install_plugin_dev":
      if (devModeOn) {
        if (parsed["code"]) {
          loadPluginDev(parsed["code"]);
          ws.send(JSON.stringify({
            "uuid": parsed["uuid"] || Math.random(),
            "status": "OK",
          }))
        } else {
          ws.send(JSON.stringify({
            "uuid": parsed["uuid"] || Math.random(),
            "status": "ERROR",
            "message": "No code provided.",
          }))
        }
      } else {
        ws.send(JSON.stringify({
          "uuid": parsed["uuid"] || Math.random(),
          "status": "ERROR",
          "message": "Dev mode not enabled.",
        }))
      }
      return;
    default:
      return;
  }
}