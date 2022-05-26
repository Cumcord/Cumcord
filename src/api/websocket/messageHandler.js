import { uuid } from "../modules/commonModules";

let commands = {};

const wsSend = (wsCb, incoming) => (outgoing) => {
  outgoing.name = "CUMCORD_WEBSOCKET";
  outgoing.uuid = incoming.uuid ?? uuid.v4();
  wsCb(JSON.stringify(outgoing));
};

const wsStatus = (wsCb, incoming, status) => (message) =>
  wsSend(
    wsCb,
    incoming,
  )({
    status,
    message,
  });

export default (wsCb) => (msg) => {
  let parsed;
  try {
    parsed = JSON.parse(msg);
  } catch {
    return wsStatus(wsCb, {}, "ERROR")("Did not receive valid JSON");
  }

  const wsModules = {
    raw: wsSend(wsCb, parsed),
    ok: wsStatus(wsCb, parsed, "OK"),
    error: wsStatus(wsCb, parsed, "ERROR"),
  };

  if (typeof parsed.action !== "string") return wsModules.error("No action provided.");

  const command = commands[parsed.action.toLowerCase()];
  if (!command) return wsModules.error(`Unknown action: ${parsed.action}`);

  command(parsed, wsModules);
};

export function addHandler(name, callback) {
  name = name.toLowerCase();
  if (commands[name]) throw new Error(`Command ${name} already registered.`);

  commands[name] = callback;

  return () => delete commands[name];
}

export function removeAllHandlers() {
  commands = {};
}
