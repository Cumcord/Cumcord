import filters from "./filters";
import wpRequire from "wpRequire";

const batchFilterModules = (filterList) => {
  const results = [];

  const checkModule = (mod) => {
    for (let i = 0; i < filterList.length; i++) {
      if (!filterList[i][0](mod)) continue;

      // all find
      if (filterList[i][1])
        if (results[i]) results[i].push(mod);
        else results[i] = [mod];
      // single find, only find the first
      else if (!results[i]) results[i] = mod;
    }
  };

  for (const k in wpRequire.c) {
    if (!wpRequire.c.hasOwnProperty(k)) continue;
    const module = wpRequire.c[k].exports;
    if (!module) continue;

    if (module.default && module.__esModule) checkModule(module.default);

    checkModule(module);
  }

  return results;
};

// [filter, all]
const makeFakeWp = (filterList) => ({
  find: (f) => filterList.push([f, false]),
  findAll: (f) => filterList.push([f, true]),

  findByProps: (...p) => filterList.push([filters.byProps(p), false]),
  findByPropsAll: (...p) => filterList.push([filters.byProps(p), true]),

  findByPrototypes: (...p) => filterList.push([filters.byProtos(p), false]),
  findByPrototypesAll: (...p) => filterList.push([filters.byProtos(p), true]),

  findByDisplayName: (name, defaultExp = true) =>
    filterList.push([filters.byDisplayName(name, defaultExp), false]),
  findByDisplayNameAll: (name, defaultExp = true) =>
    filterList.push([filters.byDisplayName(name, defaultExp), true]),

  findByStrings: (...s) => filterList.push([filters.byStrings(s), false]),
  findByStringsAll: (...s) => filterList.push([filters.byStrings(s), true]),

  findByKeywordAll: (...s) => filterList.push([filters.byKeyword(s), true]),

  findByDispNameDeep: (n, d = true) => filterList.push([filters.byDispNameDeep(n, d), false]),
  findByDispNameDeepAll: (n, d = true) => filterList.push([filters.byDispNameDeep(n, d), true]),
});

export default (callback) => {
  const filterList = [];
  const fakeWebpack = makeFakeWp(filterList);

  callback(fakeWebpack);

  return batchFilterModules(filterList);
};
