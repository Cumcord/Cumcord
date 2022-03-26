import { findInTree } from "utils";

export default {
  filterModules:
    (moduleList, single = false) =>
    (filter) => {
      let modules = [];

      for (const mod in moduleList) {
        if (moduleList.hasOwnProperty(mod)) {
          const module = moduleList[mod].exports;
          if (!module) continue;

          if (module.default && module.__esModule && filter(module.default)) {
            if (single) return module.default;
            modules.push(module.default);
          }

          if (filter(module))
            if (single) return module;
            else modules.push(module);
        }
      }

      return modules;
    },

  byProps: (props) => (m) => props.every((p) => m[p] !== undefined),

  byProtos: (protos) => (m) => m.prototype && protos.every((p) => m.prototype[p] !== undefined),

  byDisplayName: (name, defaultExp = true) =>
    defaultExp ? (m) => m.displayName === name : (m) => m?.default?.displayName === name,

  byKeyword: (strs) => (m) =>
    strs.every(
      (s) => Object.keys(m).some((k) => k.toLowerCase().includes(s.toLowerCase())) == true, // does this test have a purpose? -- sink
    ),

  // HELL.
  byStrings: (strs) => (m) => {
    if (typeof m === "function") {
      if (strs.every((s) => m.toString().includes(s))) return true;
    } else
      return findInTree(m, (obj) => {
        if (!obj) return;

        try {
          for (const v of Object.values(obj))
            if (typeof v === "function" && strs.every((s) => v.toString().includes(s))) return true;
        } catch {}
      });
  },
};
