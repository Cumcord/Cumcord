import wpRequire from "@wpRequire";
import filters from "./filters";
import { logger } from "@utils";

export { default as findAsync } from "./findAsync";
export { default as batchFind } from "./batchFind";

export const modules = wpRequire.c;

export const getModule = (module) => {
  for (const modId in modules) {
    const mod = modules[modId];

    if (mod?.exports === module) return mod;
    if (mod?.exports?.__esModule && mod?.exports?.default === module) return mod?.exports;
  }
};

export const find = filters.filterModules(modules, true);
export const findAll = filters.filterModules(modules);

export const findByProps = (...propNames) => find(filters.byProps(propNames));
export const findByPropsAll = (...propNames) => findAll(filters.byProps(propNames));
export const findByPrototypes = (...protoNames) => find(filters.byProtos(protoNames));
export const findByPrototypesAll = (...protoNames) => findAll(filters.byProtos(protoNames));

export const findByDisplayName = (displayName, defaultExport = true) =>
  find(filters.byDisplayName(displayName, defaultExport));

export const findByDisplayNameAll = (displayName, defaultExport = true) =>
  findAll(filters.byDisplayName(displayName, defaultExport));

export const findByStrings = (...searchStrings) => {
  logger.warn(
    "findByStrings is not performant and should NOT be used in production code. The reason it is still in Cumcord is for development uses. Manually making a .toString searcher using webpack.find is far more performant.",
  );
  return find(filters.byStrings(searchStrings));
};

export const findByStringsAll = (...searchStrings) => {
  logger.warn(
    "findByStrings is not performant and should NOT be used in production code. The reason it is still in Cumcord is for development uses. Manually making a .toString searcher using webpack.find is far more performant.",
  );
  return findAll(filters.byStrings(searchStrings));
};

// THIS IS NOT PERFORMANT. This function is exclusively to be used by those searching for modules to later fetch with other parts of Cumcord's webpackModules API.
export const findByKeywordAll = (...searchStrings) => findAll(filters.byKeyword(searchStrings));
export const findByDispNameDeep = (n, d = true) => find(filters.byDispNameDeep(n, d));
export const findByDispNameDeepAll = (n, d = true) => findAll(filters.byDispNameDeep(n, d));
