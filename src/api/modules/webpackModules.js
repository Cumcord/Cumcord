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

// TODO: Replace this with ANYTHING ELSE.
function findInTree(
  tree,
  filter,
  {
    walkable = [],
    exclude = [],
    maxStack = 100,
  } = {}
) {
  try {
    JSON.stringify(tree);
  } catch {
    return false;
  }
  if (tree === null || tree === undefined) return null;
  if (typeof tree !== "object") return null;

  if (typeof filter === "string") return tree[filter];

  const stack = [tree];
  while (stack.length) {
    const node = stack.pop();
    try {
      if (filter(node)) return node;
    } catch { }
    if (stack.length >= maxStack) continue;
    if (Array.isArray(node)) {
      stack.push(...node);
    } else if (typeof node === "object" && node !== null) {
      if (walkable.length > 0) {
        stack.push(
          ...Object.entries(node)
            .filter(
              ([key, value]) =>
                walkable.indexOf(key) !== -1 && exclude.indexOf(key) === -1
            )
            .map(([key, value]) => value)
        );
      } else {
        stack.push(
          ...Object.values(node).filter(
            (key) => exclude.indexOf(key) === -1 && node
          )
        );
      }
    }
  }
  return null;
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

  findByStrings: (...searchStrings) =>
    webpackModules.find((module) => {
      return findInTree(module, (obj) => {
        if (typeof obj == "function") {
          return searchStrings.every((str) => obj.toString().includes(str));
        }
      })
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
    )
}


// export webpackModules;
export const find = webpackModules.find;
export const findAll = webpackModules.findAll;
export const findByProps = webpackModules.findByProps;
export const findByPropsAll = webpackModules.findByPropsAll;
export const findByPrototypes = webpackModules.findByPrototypes;
export const findByDisplayName = webpackModules.findByDisplayName;
export const findByStrings = webpackModules.findByStrings;
export const findByKeywordAll = webpackModules.findByKeywordAll;

export default webpackModules;
