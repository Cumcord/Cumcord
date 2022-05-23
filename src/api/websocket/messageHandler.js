import { uuid } from "commonModules";

let commands = {};

const wsSend = (ws, incoming) => (outgoing) => {
  outgoing.name = "CUMCORD_WEBSOCKET";
  outgoing.uuid = incoming.uuid ?? uuid.v4();
  ws.send(JSON.stringify(outgoing));
};

const wsStatus = (ws, incoming, status) => (message) =>
  wsSend(
    ws,
    incoming,
  )({
    status,
    message,
  });

export default (ws) => (msg) => {
  let parsed;
  try {
    parsed = JSON.parse(msg);
  } catch {
    return wsStatus(ws, {}, "ERROR")("Did not receive valid JSON");
  }

  const wsModules = {
    raw: wsSend(ws, parsed),
    ok: wsStatus(ws, parsed, "OK"),
    error: wsStatus(ws, parsed, "ERROR"),
  };

  if (typeof parsed.action !== "string") return wsModules.error("No action provided.");

  const command = commands[parsed.action.toLowerCase()];
  if (!command) return wsModules.error(`Unknown action: ${parsed.action}`);

  command(parsed, wsModules);
};

export function addHandler(name, callback) {
  if (commands[name]) throw new Error(`Command ${name} already registered.`);

  commands[name] = callback;

  return () => delete commands[name];
}

export function removeAllHandlers() {
  commands = {};
}
