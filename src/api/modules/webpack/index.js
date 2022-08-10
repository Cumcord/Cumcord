import wpRequire from "@wpRequire";
import { createApi } from "@cumjar/websmack";

export { default as findAsync } from "./findAsync";

export const modules = wpRequire.c;

export { wpRequire };

export const getModule = (module) => {
  for (const modId in modules) {
    const mod = modules[modId];

    if (mod?.exports === module) return mod;
    if (mod?.exports?.__esModule && mod?.exports?.default === module) return mod?.exports;
  }
};

// esm export * no work on objects :(
export const {
  find,
  findAll,
  findByCode,
  findByCodeAll,
  findByDisplayName,
  findByDisplayNameAll,
  findByDispNameDeep,
  findByDispNameDeepAll,
  findByKeyword,
  findByKeywordAll,
  findByNestedProps,
  findByNestedPropsAll,
  findByProps,
  findByPropsAll,
  findByPrototypes,
  findByPrototypesAll,
  batchFind,
} = createApi([undefined, wpRequire.c, wpRequire]);
