import logger from "../util/logger";
import webpackModules from "webpackModules";
import commonModules from "commonModules";
import patcher from "./patcher/patch";
import database from "./plugins/database.js";

function uninject() {
  delete window.cumcord;
  logger.log("Uninjecting Cumcord");
  patcher.unpatchAll();
  return true;
}

// plugin list data structure:
const pluginList = {
  "https://plugin.github.io/dist/": {
    manifest: {
      name: "test-plugin",
      description: "test-description",
      author: "creatable",
      hash: "1234567890abcdef",
      license: "MIT",
    },
    cache: "bundleContentsGoHere()",
  },
};

async function importPlugin(baseUrl) {
  const baseUrlTrailing = new URL("", baseUrl).href;
  const manifestUrl = new URL("plugin.json", baseUrlTrailing).href;
  const pluginUrl = new URL("plugin.js", baseUrlTrailing).href;

  // fetch manifest and parse it as json and if it doesn't return 200 fail
  const manifestJson = await fetch(manifestUrl).then((res) => res.json());

  if (manifestJson.status !== 200) {
    throw new Error("Cannot load plugin manifest");
  }
}

function initializeAPI() {
  logger.log("Initializing Cumcord API");

  window.cumcord = {
    uninject,
    modules: {
      webpackModules,
      common: commonModules,
    },
    patcher,
    database,
  };
}

export default initializeAPI;
