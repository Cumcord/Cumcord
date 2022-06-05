import { find } from "@webpackModules";
import messageHandler, { addHandler, removeAllHandlers } from "./messageHandler";
import { instead } from "@patcher";
import builtInHandlers from "./builtInHandlers";

let connectedSockets = new Set();

export function initializeSocket() {
  for (const [name, cb] of Object.entries(builtInHandlers)) addHandler(name, cb);

  if (!window.DiscordNative) return;

  const wsModule = find((m) => m.Z?.__proto__?.handleConnection).Z;

  instead("handleConnection", wsModule, (args, orig) => {
    const ws = args[0];
    if (ws.upgradeReq().url !== "/cumcord") return orig(...args);

    connectedSockets.add(ws);

    ws.on("message", messageHandler(ws.send));

    ws.on("close", () => connectedSockets.delete(ws));
  });
}

export function uninitializeSocket() {
  if (window.DiscordNative) {
    for (const client of connectedSockets) client.close();
    connectedSockets.clear();
    removeAllHandlers();
  }
}

export const triggerHandler = (msg, callback) => messageHandler(callback)(msg);

export { addHandler };
