import { loadPluginDev, devModeOn } from "devmode";

// This file is a basic websocket command handler.

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