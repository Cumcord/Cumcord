import { v4 as uuidv4 } from "uuid";
import logger from "../../util/logger";
let patches = {};

function hook(patchId, args) {
  var iterationDone = false;
  var previousResponse;

  for (const hook of patches[patchId]["hooks"]) {
    if (hook.runInstead) {
      previousResponse = hook.callback(args);
      iterationDone = true;
    } else {
      if (!iterationDone) {
        previousResponse = patches[patchId].originalFunction(...args);
        iterationDone = true;
      }

      hook.callback(args, previousResponse);
    }
  }

  return previousResponse;
}

function unpatch(patchId, hookId) {
  const patch = patches[patchId];
  var unpatched = false;

  if (patch) {
    const hooks = patch["hooks"];

    for (const hook in hooks) {
      if (hooks[hook].id == hookId) {
        patch.functionParent[patch.functionName] = patch.originalFunction;
        delete hooks[hook];
        unpatched = true;
      }
    }

    if (!patch.hooks[0]) delete patches[patchId];
  }

  return unpatched;
}

function unpatchAll() {
  logger.log(
    "If you're a plugin developer and you ran this because you're curious as to what it does, I highly recommend you refresh your client because unfortunately everything that relies on the patcher has been unpatched."
  );
  for (const patch in patches) {
    const hooks = patches[patch]["hooks"];
    for (const hook in hooks) {
      unpatch(patch, hooks[hook].id);
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
        hooks: [],
      };

      functionParent[functionName] = (...args) => hook(injectionId, args);
    }

    const hookId = uuidv4();
    patches[injectionId].hooks.push({
      id: hookId,
      instead: runInstead,
      callback,
    });

    return () => unpatch(injectionId, hookId);
  },
  unpatchAll,
  patches,
};

export default patcher;
