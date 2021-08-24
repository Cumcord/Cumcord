// My implmementation is 1:1 compatible with GooseMod's own API, but is implemented differently

function getModules() {
  const modules = window.webpackJsonp.push([
    [],
    { cum: (module, _, req) => (module.exports = req) },
    [["cum"]],
  ]);

  modules.m.cum = undefined;
  delete modules.m.cum;
  modules.c.cum = undefined;
  delete modules.c.cum;

  return modules.c;
}

function filterModules(moduleList, filter) {
  let modules = [];

  for (const mod in moduleList) {
    if (moduleList.hasOwnProperty(mod)) {
      const module = moduleList[mod].exports;
      if (module) {
        if (module.default && module.__esModule && filter(module.default))
          modules.push(module.default);
        if (filter(module)) modules.push(module);
      }
    }
  }

  return modules;
}

const webpackModules = {
  modules: getModules(),

  find: (filter) => {
    return filterModules(webpackModules.modules, filter)[0];
  },

  findAll: (filter) => {
    return filterModules(webpackModules.modules, filter);
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

  findByDisplayName: (displayName) =>
    webpackModules.find((module) => module.displayName === displayName),

  // THIS IS NOT PERFORMANT. This function is exclusively to be used by those searching for modules to later fetch with other parts of Cumcord's webpackModules API.
  findByStringInPropsAll: (...searchStrings) =>
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
export const findByProps = webpackModules.findByProps;
export const findByPropsAll = webpackModules.findByPropsAll;
export const findByPrototypes = webpackModules.findByPrototypes;
export const findByDisplayName = webpackModules.findByDisplayName;
export const findByStringInPropsAll = webpackModules.findByStringInPropsAll;

export default webpackModules;
