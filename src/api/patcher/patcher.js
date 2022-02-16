let patches = [];

function injectCSS(css) {
  const style = document.createElement("style");
  style.className = "CUMCORD_INJECTED_CSS";
  style.textContent = css;
  document.head.appendChild(style);

  return (newCss) => {
    if (typeof newCss === "undefined") {
      style.remove();
    } else {
      style.textContent = newCss;
    }
  };
}

function unpatchAllCss() {
  for (const style of document.querySelectorAll(".CUMCORD_INJECTED_CSS")) {
    style.remove();
  }
}

const INJECTION_STRING = Symbol("_CUMCORD_INJECTIONS");

function patch(functionName, functionParent, callback, once, type) {
  // Unnecessary since this is a private function.
  if (!(type == "before" || type == "instead" || type == "after")) {
    throw new Error("Go fuck yourself.");
  }

  if (typeof functionParent[functionName] !== "function") {
    throw new Error(
      `${functionName} is not a function in ${functionParent.constructor.name}`
    );
  }

  if (!Object.hasOwnProperty.bind(functionParent)(INJECTION_STRING)) {
    functionParent[INJECTION_STRING] = {};
  }

  if (!functionParent[INJECTION_STRING].hasOwnProperty(functionName)) {
    const patchId = Symbol("CUMCORD_PATCH_ID");
    functionParent[INJECTION_STRING][functionName] = patchId;
  }

  const injectionId = functionParent[INJECTION_STRING][functionName];

  const unpatchFunc = () => unpatch(injectionId, hookId, type);

  if (!patches[injectionId]) {
    const originalFunction = functionParent[functionName];

    patches[injectionId] = {
      originalFunction,
      functionParent,
      functionName,
      hooks: {
        before: {},
        instead: {},
        after: {},
      },
    };

    functionParent[functionName] = function (...args) {
      const retVal = hook(functionName, functionParent, injectionId, args, this);

      if (once) {
        unpatchFunc();
      }

      return retVal;
    };

    const originalCode = originalFunction.toString();

    // Assign original props to the function
    Object.assign(functionParent[functionName], originalFunction);

    // Add original toString to the function for easier debugging
    functionParent[functionName].toString = () => originalCode;
  }

  const hookId = Symbol("CUMCORD_HOOK_ID");
  patches[injectionId].hooks[type][hookId] = callback;

  return unpatchFunc;
}

function hook(functionName, functionParent, patchId, originalArgs, context) {
  let patch = patches[patchId];

  try {
    if (!patch) {
      // This is in the event that the patch was removed and the old version of the hook is still being called.
      patch = patches[functionParent[INJECTION_STRING][functionName]];
    }
  } catch {} // epic DRY code.

  if (!patch) {
    // This is in the event that this function is being called after all patches are removed.
    return functionParent[functionName].apply(context, originalArgs);
  }

  const hooks = patch["hooks"];
  let args = originalArgs;

  // Before patches
  for (const hookId in hooks.before) {
    const hook = hooks.before[hookId];
    const response = hook.apply(context, [args]);
    if (Array.isArray(response)) {
      args = response;
    }
  }

  let response;

  // Instead patches
  let insteadCallbacks = Object.values(hooks.instead);

  function originalFunc(...args) {
    return patch.originalFunction.apply(context, args);
  }

  if (insteadCallbacks.length > 0) {
    let patchFunc = (...args) => {
      return insteadCallbacks[0].apply(context, [args, originalFunc]);
    };

    for (const callback of insteadCallbacks.slice(1)) {
      let oldPatchFunc = patchFunc;
      patchFunc = (...args) => {
        return callback.apply(context, [args, oldPatchFunc]);
      };
    }

    response = patchFunc(...args);
  } else {
    response = originalFunc(...args);
  }

  // After patches
  for (const hookId in hooks.after) {
    const hook = hooks.after[hookId];

    const hookResp = hook.apply(context, [args, response]);

    if (typeof hookResp !== "undefined") {
      response = hookResp;
    }
  }

  return response;
}

function before(functionName, functionParent, callback, once = false) {
  return patch(functionName, functionParent, callback, once, "before");
}

function instead(functionName, functionParent, callback, once = false) {
  return patch(functionName, functionParent, callback, once, "instead");
}

function after(functionName, functionParent, callback, once = false) {
  return patch(functionName, functionParent, callback, once, "after");
}

function unpatch(patchId, hookId, type) {
  const patch = patches[patchId];

  if (patch) {
    const hooks = patch["hooks"];
    if (hooks[type][hookId]) {
      delete hooks[type][hookId];

      // If there are no more hooks for every type, remove the patch
      const types = Object.keys(hooks);
      if (
        types.every((type) => {
          return Object.values(hooks[type]).length == 0;
        })
      ) {
        patch.functionParent[patch.functionName] = patch.originalFunction;
        delete patch.functionParent[INJECTION_STRING][patch.functionName];
        delete patches[patchId];
      }

      if (Object.keys(patch.functionParent[INJECTION_STRING]).length == 0) {
        delete patch.functionParent[INJECTION_STRING];
      }

      return true;
    }
  }

  return false;
}

function unpatchAll() {
  for (const patch in patches) {
    for (const type of Object.keys(patches[patch]["hooks"])) {
      if (!patches[patch]) {
        continue;
      }

      const hooks = patches[patch]["hooks"][type];
      for (const hook in hooks) {
        unpatch(patch, hook, type);
      }
    }
  }
}

export { instead, before, after, unpatchAll, unpatchAllCss, injectCSS };
