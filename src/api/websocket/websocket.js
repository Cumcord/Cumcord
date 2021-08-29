import webpackModules from "webpackModules";
import { instead } from "patcher";

let connectedClients = [];

function initializeSocket() {
  if (window["DiscordNative"]) {
    // Todo: Add proper websocket API
    instead("handleConnection", webpackModules.findByProps("handleConnection").__proto__, (args, orig) => {
      let ws = args[0];
      if ((ws.upgradeReq()).url == "/cumcord") {
        connectedClients.push(ws);
        ws.send("Welcome to the Cumcord websocket API :D");

        ws.on("message", (msg) => {
          ws.send(`You said: ${msg}`);
        });

        ws.on("close", () => {
          connectedClients.splice(connectedClients.indexOf(ws), 1);
        });
      } else {
        return orig(...args);
      }
    })
  }
}

function uninitializeSocket() {
  if (window["DiscordNative"]) {
    for (let client of connectedClients) {
      client.close();
    }
  }
}

export { initializeSocket, uninitializeSocket };