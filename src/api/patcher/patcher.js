import webpackModules from "webpackModules";
const uuidv4 = webpackModules.findByProps("v4").v4;
import logger from "../../util/logger";

const patcher = {
  instead,
  before,
  after,
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

function unpatchAllCss() {
  for (const style of document.querySelectorAll(".CUMCORD_INJECTED_CSS")) {
    style.remove();
  }
}

function patch(functionName, functionParent, callback, type) {
  // Unnecessary since this is a private function.
  if (!(type == "before" || type == "instead" || type == "after")) {
    throw new Error("Go fuck yourself.")
  }

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
      hooks: {
        before: {},
        instead: {},
        after: {}
      },
    };

    functionParent[functionName] = function (...args) { return hook(injectionId, args, this); };
  }

  const hookId = uuidv4();
  window.cumcord.patcher.patches[injectionId].hooks[type][hookId] = callback;

  return () => unpatch(injectionId, hookId, type);
}

function hook(patchId, originalArgs, context) {
  const patch = window.cumcord.patcher.patches[patchId];
  const hooks = patch["hooks"];
  let args = originalArgs;

  // Before patches
  for (const hookId in hooks.before) {
    const hook = hooks.before[hookId];
    const response = hook.call(context, args);
    if (Array.isArray(response)) {
      args = response;
    }
  }

  let response;

  // Instead patches
  let insteadCallbacks = Object.values(hooks.instead);
  let originalFunc = (...args) => { return patch.originalFunction.call(context, ...args) };
  if (insteadCallbacks.length > 0) {
    let patchFunc = (args) => { return insteadCallbacks[0].call(context, args, originalFunc) }

    for (const callback of insteadCallbacks.slice(1)) {
      let oldPatchFunc = patchFunc;
      patchFunc = (args) => { return callback.call(context, args, oldPatchFunc) }
    }

    response = patchFunc(args);
  } else {
    response = originalFunc(...args);
  }
  
  // After patches
  for (const hookId in hooks.after) {
    const hook = hooks.after[hookId];
    
    const hookResp = hook.call(context, args, response);

    if (typeof hookResp !== "undefined") {
      response = hookResp;
    }
  }
  
  return response;
}

function before(functionName, functionParent, callback) {
  return patch(functionName, functionParent, callback, "before");
}

function instead(functionName, functionParent, callback) {
  return patch(functionName, functionParent, callback, "instead");
}

function after(functionName, functionParent, callback) {
  return patch(functionName, functionParent, callback, "after");
}

function unpatch(patchId, hookId, type) {
  const patch = window.cumcord.patcher.patches[patchId];

  if (patch) {
    const hooks = patch["hooks"];
    if (hooks[type][hookId]) {
      delete hooks[type][hookId];

      patch.functionParent.CUMCORD_INJECTIONS[patch.functionName] = undefined;
      delete patch.functionParent.CUMCORD_INJECTIONS[patch.functionName];
      
      // If there are no more hooks for every type, remove the patch
      const types = Object.keys(hooks);
      if (types.every(type => { return Object.values(hooks[type]).length == 0 })) {
        patch.functionParent[patch.functionName] = patch.originalFunction;
        delete patch.functionParent.CUMCORD_INJECTIONS;
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
    for (const type of Object.keys(window.cumcord.patcher.patches[patch]["hooks"])) {
      if (!window.cumcord.patcher.patches[patch]) {
        return;
      }

      const hooks = window.cumcord.patcher.patches[patch]["hooks"][type];
      for (const hook in hooks) {
        unpatch(patch, hook, type);
      }
    }
  }
}



export default patcher;
