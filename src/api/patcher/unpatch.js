import { INJECTION_KEY, patches } from "./shared";

export function unpatch(patchId, hookId, type) {
  const patch = patches.get(patchId);

  if (!patch) return false;

  const hooks = patch.hooks;

  if (!hooks[type].has(hookId)) return false;

  hooks[type].delete(hookId);

  // If there are no more hooks for every type, remove the patch
  const types = Object.keys(hooks);
  if (types.every((type) => hooks[type].size == 0)) {
    
    Object.defineProperty(patch.functionParent, patch.functionName, {
      value: patch.originalFunction,
      writable: true,
      configurable: true,
    });

    patch.functionParent[INJECTION_KEY].delete(patch.functionName);
    patches.delete(patchId);
  }

  if (patch.functionParent[INJECTION_KEY].size == 0)
    delete patch.functionParent[INJECTION_KEY];

  return true;
}

export function unpatchAll() {
  for (const [patch, patchHook] of patches.entries())
    for (const type in patchHook.hooks) {
      if (!patches.has(patch)) continue;

      const hooks = patches.get(patch)?.hooks[type];

      for (const hook of hooks.keys()) unpatch(patch, hook, type);
    }
}
