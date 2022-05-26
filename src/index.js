import init from "./api/init";
import { logger } from "@utils";
// to init
import initPluginEmbeds from "./ui/pluginEmbeds";
import initUserSettings from "./ui/userSettings";
import { initializeLamivudine, uninitializeLamivudine } from "./ui/lamivudine.js";

if (window.cumcord) throw new Error("Cumcord is already injected");

init(
  () => {
    try {
      initializeLamivudine();
      initPluginEmbeds();
      initUserSettings();
    } catch {}
    logger.log("Cumcord is injected!");
  },
  () => {
    uninitializeLamivudine();
    delete window.cumcord;
  },
).then((api) => (window.cumcord = api));
