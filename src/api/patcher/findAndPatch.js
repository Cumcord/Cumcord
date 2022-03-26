import { findAsync } from "webpackModules";

export default function (moduleFinder, patchCallback) {
  let cancelled = false;
  let unpatch;

  const [modPromise, webpackUnpatch] = findAsync(moduleFinder, false);

  modPromise.then((mod) => {
    if (cancelled) return;
    unpatch = patchCallback(mod);
  });

  return () => {
    cancelled = true;
    webpackUnpatch?.();
    unpatch?.();
  };
}
