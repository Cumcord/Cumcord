import initPluginEmbeds from "./ui/pluginEmbeds";
import { initializeLamivudine, uninitializeLamivudine } from "./ui/lamivudine.js";
import init from "./api/init";

if (window.cumcord) throw new Error("Cumcord is already injected");

init(
  () => {
    try {
      initializeLamivudine();
      initPluginEmbeds();
    } catch {}
  },
  () => {
    uninitializeLamivudine();
    delete window.cumcord;
  },
).then((api) => (window.cumcord = api));
