import { findByProps } from "webpackModules";
import commandHandler from "./commandHandler";
import { instead } from "patcher";

let connectedClients = [];

function initializeSocket() {
  if (window["DiscordNative"]) {
    // Todo: Add proper websocket API
    instead("handleConnection", findByProps("handleConnection").__proto__, (args, orig) => {
      let ws = args[0];
      if ((ws.upgradeReq()).url == "/cumcord") {
        connectedClients.push(ws);
        ws.send("Welcome to the Cumcord websocket API :D");

        ws.on("message", (msg) => {
          return commandHandler(msg, ws);
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