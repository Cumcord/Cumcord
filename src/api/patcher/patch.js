import { v4 as uuidv4 } from "uuid";
import logger from "../../util/logger";
let patches = {};

function hook(patchId, args, context) {
  // I'm only using this because previousResponse can return undefined.
  var iterationDone = false;
  var previousResponse;

  const hooks = patches[patchId]["hooks"]
  for (const hookId in hooks) {
    const hook = hooks[hookId];
    if (hook.runInstead) {
      previousResponse = hook.callback.call(context, args);
      iterationDone = true;
    } else {
      if (!iterationDone) {
        previousResponse = patches[patchId].originalFunction.call(context, ...args);
        iterationDone = true;
      }

      let hookResponse = hook.callback.call(context, args, previousResponse);

      if (hookResponse !== undefined) {
        previousResponse = hookResponse;
      }
    }
  }

  return previousResponse;
}

function unpatch(patchId, hookId) {
  const patch = patches[patchId];
  var unpatched = false;

  if (patch) {
    const hooks = patch["hooks"];

    if (hooks[hookId]) {
      delete hooks[hookId];
      if (Object.keys(hooks).length == 0) {
        patch.functionParent[patch.functionName] = patch.originalFunction;
        delete patch.functionParent.CUMCORD_INJECTIONS[patch.functionName];
        delete patches[patchId];
      }

      return true;
    }
  }

  return false;
}

function unpatchAll() {
  logger.log(
    "If you're a plugin developer and you ran this because you're curious as to what it does, I highly recommend you refresh your client because unfortunately everything that relies on the patcher has been unpatched."
  );
  for (const patch in patches) {
    const hooks = patches[patch]["hooks"];
    for (const hook in hooks) {
      unpatch(patch, hook);
    }
  }
}

const patcher = {
  patch: (functionName, functionParent, callback, runInstead = false) => {
    if (typeof functionParent[functionName] !== "function") {
      throw new Error(
        `${functionName} is not a function in ${functionParent.constructor.name}`
      );
    }

    if (!functionParent.hasOwnProperty("CUMCORD_INJECTIONS")) {
      functionParent.CUMCORD_INJECTIONS = {};
    }

    if (!functionParent.CUMCORD_INJECTIONS.hasOwnProperty(functionName)) {
      const patchId = uuidv4();
      functionParent.CUMCORD_INJECTIONS[functionName] = patchId;
    }

    const injectionId = functionParent.CUMCORD_INJECTIONS[functionName];

    if (!patches[injectionId]) {
      const originalFunction = Object.assign({}, functionParent)[functionName];

      patches[injectionId] = {
        originalFunction,
        functionParent,
        functionName,
        hooks: {},
      };

      functionParent[functionName] = function (...args) { return hook(injectionId, args, this); };
    }

    const hookId = uuidv4();
    patches[injectionId].hooks[hookId] = {
      runInstead,
      callback,
    };

    return () => unpatch(injectionId, hookId);
  },
  unpatchAll,
  patches,
};

export default patcher;
