// the function that is actually injected into patched functions

import { INJECTION_KEY, patches } from "./shared";

// calls all relevant patches
export default function (
  functionName,
  functionParent,
  patchId,
  originalArgs,
  context
) {
  let patch = patches.get(patchId);

  if (!patch) {
    try {
      patch = patches.get(functionParent[INJECTION_KEY].get(functionName));
    } catch {} // epic DRY code.
  }

  // This is in the event that this function is being called after all patches are removed.
  if (!patch) return functionParent[functionName].apply(context, originalArgs);

  const hooks = patch.hooks;
  let newArgs = originalArgs;

  // Before patches
  for (const hook of hooks.before.values()) {
    const maybeNewArgs = hook.call(context, newArgs);
    if (Array.isArray(maybeNewArgs)) newArgs = maybeNewArgs;
  }

  let workingRetVal;

  // Instead patches
  const insteadCallbacks = Array.from(hooks.instead.values());

  let insteadPatchedFunc = (...args) =>
    patch?.originalFunction.apply(context, args);

  for (const callback of insteadCallbacks)
    insteadPatchedFunc = (...args) =>
      callback.apply(context, [args, insteadPatchedFunc]);

  workingRetVal = insteadPatchedFunc(...newArgs);

  // After patches
  for (const hook of hooks.after.values()) {
    const maybeRet = hook.call(context, newArgs, workingRetVal);

    if (typeof maybeRet !== "undefined") workingRetVal = maybeRet;
  }

  return workingRetVal;
}
