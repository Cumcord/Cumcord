// My implmementation is 1:1 compatible with GooseMod's own API, but is implemented differently
import { findInTree } from "utils";
import wpRequire from "wpRequire";
import { after } from "patcher";

function filterModules(moduleList, filter, defaults = false) {
  let modules = [];

  for (const mod in moduleList) {
    if (moduleList.hasOwnProperty(mod)) {
      const module = moduleList[mod].exports;
      if (module) {
        if (module.default && module.__esModule && filter(module.default)) {
          modules.push(module.default);
        }

        if (filter(module)) modules.push(module);
      }
    }
  }

  return modules;
}

const webpackModules = {
  modules: wpRequire.c,

  findAsync(callback) {
    if (typeof callback != "function") {
      throw new Error("asyncFind requires a callback function");
    }

    const found = callback();
    if (found != undefined) return found;

    return new Promise((resolve) => {
      const unpatch = after("push", window.webpackChunkdiscord_app, ([args]) => {
        /*\
        |*| force load all modules in the chunk
        |*| shouldnt be too slow since the chunk is already here
        |*| but noteworthy that we do this 
        |*| this shouldnt cause an issue for the code that
        |*| will later actually use these modules
        \*/
        const moduleIds = Object.keys(args[1]);

        for (m of moduleIds) {
          wpRequire(parseInt(m))
        };

        const found = callback();
        if (found != undefined) {
          resolve(found);
          unpatch();
        }
      })
    })
  },

  find(filter) {
    return filterModules(webpackModules.modules, filter)[0];
  },

  findAll(filter) {
    return filterModules(webpackModules.modules, filter);
  },

  getModule(module) {
    for (const modId in webpackModules.modules) {
      const mod = webpackModules.modules[modId]?.exports;

      if (mod === module || mod?.default === module) {
        return mod;
      }
    }
  },

  findByProps: (...propNames) =>
    webpackModules.find((module) =>
      propNames.every((prop) => module[prop] !== undefined)
    ),

  findByPropsAll: (...propNames) =>
    webpackModules.findAll((module) =>
      propNames.every((prop) => module[prop] !== undefined)
    ),

  findByPrototypes: (...protoNames) =>
    webpackModules.find(
      (module) =>
        module.prototype &&
        protoNames.every(
          (protoProp) => module.prototype[protoProp] !== undefined
        )
    ),

  findByDisplayName(displayName, defaultExport = true) {
    return defaultExport
      ? webpackModules.find((module) => module.displayName === displayName)
      : webpackModules.find(
          (module) => module?.default?.displayName === displayName
        );
  },

  findByDisplayNameAll: (displayName) =>
    webpackModules.findAll((module) => module.displayName === displayName),

  // HELL.
  findByStrings: (...searchStrings) =>
    webpackModules.find((module) => {
      if (typeof module === "function") {
        if (
          searchStrings.every((searchString) =>
            module.toString().includes(searchString)
          )
        ) {
          return true;
        }
      } else {
        return findInTree(module, (obj) => {
          if (obj) {
            for (const item of Object.values(obj)) {
              if (typeof item === "function") {
                if (
                  searchStrings.every((searchString) =>
                    item.toString().includes(searchString)
                  )
                ) {
                  return true;
                }
              }
            }
          }
        });
      }
    }),

  // THIS IS NOT PERFORMANT. This function is exclusively to be used by those searching for modules to later fetch with other parts of Cumcord's webpackModules API.
  findByKeywordAll: (...searchStrings) =>
    webpackModules.findAll((module) =>
      searchStrings.every(
        (searchString) =>
          Object.keys(module).some((key) =>
            key.toLowerCase().includes(searchString.toLowerCase())
          ) == true
      )
    ),
};

// export webpackModules;
export const find = webpackModules.find;
export const findAll = webpackModules.findAll;
export const getModule = webpackModules.getModule;
export const findByProps = webpackModules.findByProps;
export const findByPropsAll = webpackModules.findByPropsAll;
export const findByPrototypes = webpackModules.findByPrototypes;
export const findByDisplayName = webpackModules.findByDisplayName;
export const findByDisplayNameAll = webpackModules.findByDisplayNameAll;
export const findByStrings = webpackModules.findByStrings;
export const findByKeywordAll = webpackModules.findByKeywordAll;
export const findAsync = webpackModules.findAsync;

export default webpackModules;
