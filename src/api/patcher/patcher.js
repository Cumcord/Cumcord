import webpackModules from "webpackModules";
const uuidv4 = webpackModules.findByProps("v4").v4;
import logger from "../../util/logger";

const patcher = {
  patch,
  unpatchAll,
  unpatchAllCss,
  patches: {},
  injectCSS,
};

function injectCSS(css) {
  const style = document.createElement("style");
  style.className = "CUMCORD_INJECTED_CSS";
  style.textContent = css;
  document.head.appendChild(style);

  return () => { style.remove() }
}

function hook(patchId, args, context) {
  // I'm only using this because previousResponse can return undefined.
  var iterationDone = false;
  var previousResponse;

  const hooks = window.cumcord.patcher.patches[patchId]["hooks"]
  for (const hookId in hooks) {
    const hook = hooks[hookId];
    if (hook.runInstead) {
      previousResponse = hook.callback.call(context, args);
      iterationDone = true;
    } else {
      if (!iterationDone) {
        previousResponse = window.cumcord.patcher.patches[patchId].originalFunction.call(context, ...args);
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
  const patch = window.cumcord.patcher.patches[patchId];
  var unpatched = false;

  if (patch) {
    const hooks = patch["hooks"];

    if (hooks[hookId]) {
      delete hooks[hookId];
      if (Object.keys(hooks).length == 0) {
        patch.functionParent[patch.functionName] = patch.originalFunction;
        patch.functionParent.CUMCORD_INJECTIONS[patch.functionName] = undefined;
        delete patch.functionParent.CUMCORD_INJECTIONS[patch.functionName];
        window.cumcord.patcher.patches[patchId] = undefined;
        delete window.cumcord.patcher.patches[patchId];
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
  for (const patch in window.cumcord.patcher.patches) {
    const hooks = window.cumcord.patcher.patches[patch]["hooks"];
    for (const hook in hooks) {
      unpatch(patch, hook);
    }
  }
}

function unpatchAllCss() {
  for (const style of document.querySelectorAll(".CUMCORD_INJECTED_CSS")) {
    style.remove();
  }
}

function patch(functionName, functionParent, callback, runInstead = false) {
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

  if (!window.cumcord.patcher.patches[injectionId]) {
    const originalFunction = Object.assign({}, functionParent)[functionName];

    window.cumcord.patcher.patches[injectionId] = {
      originalFunction,
      functionParent,
      functionName,
      hooks: {},
    };

    functionParent[functionName] = function (...args) { return hook(injectionId, args, this); };
  }

  const hookId = uuidv4();
  window.cumcord.patcher.patches[injectionId].hooks[hookId] = {
    runInstead,
    callback,
  };

  return () => unpatch(injectionId, hookId);
}

export default patcher;
