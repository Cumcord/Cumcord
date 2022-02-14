/*
 * patches the context menus lazily.
 * THIS CODE IS REFACTORED FROM
 * https://github.com/swishs-client-mod-plugins/cumcord-plugins/blob/5f81c10857b20741272a8d7b6becec3cc29f0520/plugins/pronoun-bio-scraper/apis/Patcher.js
 * -- sink
 */

import { before } from "./patcher";
import { findByDisplayName, findByProps } from "webpackModules";

let patches = [];

const curriedPatch = (lazyModule) => (displayName, patch) => {
  // used in unpatch logic
  const id = Symbol();
  let cancelPatch = false;

  const module = findByDisplayName(displayName, false);

  // if the webpack module already exists, just patch it
  if (module != undefined) {
    return patch(module);
  }

  // patch the module that lazily loads what we want
  const unpatchLazyPatch = before(
    lazyModule,
    findByProps(lazyModule),
    (args) => {
      // modify the lazy render to run the desired patch, and remove this one
      const lazyRender = args[1];
      args[1] = async () => {
        const render = await lazyRender(args[0]);

        return (config) => {
          const menu = render(config);

          if (menu?.type?.displayName === displayName && patch) {
            unpatchLazyPatch();
            if (!cancelPatch)
              patches.push([id, patch(findByDisplayName(displayName, false))]);
            patch = false;
          }

          return menu;
        };
      };
      return args;
    }
  );

  return () => {
    // remove patch and call it too
    patches = patches.filter((p) => (p[0] === id ? (p[1](), false) : true));
    // if unpatching before the module is lazy loaded
    // this makes it not patch in the first place
    // else we'd be too late by unpatching it here
    cancelPatch = true;
  };
};

const patchContextMenu = curriedPatch("openContextMenuLazy");
const patchModal = curriedPatch("openModalLazy");

export { patchModal, patchContextMenu, curriedPatch as getLazyPatchFunc };
