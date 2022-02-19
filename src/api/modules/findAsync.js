import { before, after } from "patcher";

export default function (filter, legacycompat = true) {
  let foundModule = filter();

  if (foundModule !== undefined) {
    if (legacycompat) {
      return Promise.resolve(foundModule);
    }

    return [foundModule, () => {}];
  }

  const patches = [];

  function unpatchAll() {
    for (const unpatch of patches) unpatch();
  }

  const modulePromise = new Promise((resolve) => {
    patches.push(
      before("push", window.webpackChunkdiscord_app, ([[, modules]]) => {
        for (const moduleId in modules) {
          patches.push(
            after(
              moduleId,
              modules,
              () => {
                if (foundModule !== undefined) return;

                foundModule = filter();
                if (foundModule !== undefined) {
                  unpatchAll();
                  resolve(foundModule);
                }
              },
              true
            )
          );
        }
      })
    );
  });

  if (legacycompat) {
    return modulePromise;
  } else {
    return [
      modulePromise,
      unpatchAll
    ];
  }
}
