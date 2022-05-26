// My implmementation is compatible with GooseMod's API, but implemented differently
import wpRequire from "@wpRequire";
import findAsync from "./findAsync";
import filters from "./filters";
import batchFind from "./batchFind";
import { logger } from "@utils";

const webpackModules = {
  modules: wpRequire.c,

  findAsync,
  batchFind,

  // currying go brr
  find: filters.filterModules(wpRequire.c, true),
  findAll: filters.filterModules(wpRequire.c),

  getModule(module) {
    for (const modId in webpackModules.modules) {
      const mod = webpackModules.modules[modId];

      if (mod?.exports === module) return mod;
      if (mod?.exports?.__esModule && mod?.exports?.default === module) return mod?.exports;
    }
  },

  findByProps: (...propNames) => webpackModules.find(filters.byProps(propNames)),

  findByPropsAll: (...propNames) => webpackModules.findAll(filters.byProps(propNames)),

  findByPrototypes: (...protoNames) => webpackModules.find(filters.byProtos(protoNames)),

  findByPrototypesAll: (...protoNames) => webpackModules.findAll(filters.byProtos(protoNames)),

  findByDisplayName: (displayName, defaultExport = true) =>
    webpackModules.find(filters.byDisplayName(displayName, defaultExport)),

  findByDisplayNameAll: (displayName, defaultExport = true) =>
    webpackModules.findAll(filters.byDisplayName(displayName, defaultExport)),

  findByStrings: (...searchStrings) => {
    logger.warn(
      "findByStrings is not performant and should NOT be used in production code. The reason it is still in Cumcord is for development uses. Manually making a .toString searcher using webpack.find is far more performant.",
    );
    return webpackModules.find(filters.byStrings(searchStrings));
  },

  findByStringsAll: (...searchStrings) => webpackModules.findAll(filters.byStrings(searchStrings)),

  // THIS IS NOT PERFORMANT. This function is exclusively to be used by those searching for modules to later fetch with other parts of Cumcord's webpackModules API.
  findByKeywordAll: (...searchStrings) => webpackModules.findAll(filters.byKeyword(searchStrings)),

  findByDispNameDeep: (n, d = true) => webpackModules.find(filters.byDispNameDeep(n, d)),
  findByDispNameDeepAll: (n, d = true) => webpackModules.findAll(filters.byDispNameDeep(n, d)),
};

// export webpackModules;
export const find = webpackModules.find;
export const findAll = webpackModules.findAll;
export const getModule = webpackModules.getModule;
export const findByProps = webpackModules.findByProps;
export const findByPropsAll = webpackModules.findByPropsAll;
export const findByPrototypes = webpackModules.findByPrototypes;
export const findByPrototypesAll = webpackModules.findByPrototypesAll;
export const findByDisplayName = webpackModules.findByDisplayName;
export const findByDisplayNameAll = webpackModules.findByDisplayNameAll;
export const findByStrings = webpackModules.findByStrings;
export const findByStringsALl = webpackModules.findByStringsAll;
export const findByKeywordAll = webpackModules.findByKeywordAll;
export const findByDispNameDeep = webpackModules.findByDispNameDeep;
export const findByDispNameDeepAll = webpackModules.findByDispNameDeepAll;
export { findAsync, batchFind };

export default webpackModules;
