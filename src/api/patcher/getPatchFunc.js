// curried - getPatchFunc("before")(...)
// allows us to apply an argument while leaving the rest open much cleaner.
// functional programming strikes again! -- sink

import hook from "./hook";
import { INJECTION_KEY, patches } from "./shared";
import { unpatch } from "./unpatch";

// creates a hook if needed, else just adds one to the patches array
export default (patchType) =>
  (funcName, funcParent, callback, oneTimepatch = false) => {
    if (typeof funcParent[funcName] !== "function")
      throw new Error(`${funcName} is not a function in ${funcParent.constructor.name}`);

    if (!Object.hasOwnProperty.call(funcParent, INJECTION_KEY))
      funcParent[INJECTION_KEY] = new Map();

    const functionInjection = funcParent[INJECTION_KEY];

    if (!functionInjection.has(funcName))
      functionInjection.set(funcName, Symbol("CUMCORD_PATCH_ID"));

    const patchId = functionInjection.get(funcName);

    if (!patches.has(patchId)) {
      const originalFunction = funcParent[funcName];

      patches.set(patchId, {
        originalFunction,
        functionParent: funcParent,
        functionName: funcName,
        hooks: {
          before: new Map(),
          instead: new Map(),
          after: new Map(),
        },
      });

      // this will be assigned at the end of the function
      // but is up here so that it can be accessed by one-time-patches
      let unpatchThisPatch;

      const replaceProxy = new Proxy(originalFunction, {
        apply(_, thisArg, args) {
          const retVal = hook(funcName, funcParent, patchId, args, thisArg, false);

          if (oneTimepatch) unpatchThisPatch();

          return retVal;
        },

        construct(_, args) {
          const retVal = hook(funcName, funcParent, patchId, args, originalFunction, true);

          if (oneTimepatch) unpatchThisPatch();

          return retVal;
        },

        get(_, prop) {
          // yes it is weird to pass args to toString, but i figure we should accurately polyfill the behavior
          if (prop == "toString") return (...args) => originalFunction.toString(...args);

          return Reflect.get(...arguments);
        },
      });

      try {
        Object.defineProperty(funcParent, funcName, {
          value: replaceProxy,
          configurable: true,
          writable: true,
        });
      } catch {
        funcParent[funcName] = replaceProxy;
      }
    }

    const hookId = Symbol("CUMCORD_HOOK_ID");
    patches.get(patchId)?.hooks[patchType].set(hookId, callback);

    return (unpatchThisPatch = () => unpatch(patchId, hookId, patchType));
  };
