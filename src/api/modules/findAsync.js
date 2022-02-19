import { before, after } from "patcher";

export default function (filter, legacycompat = true) {
  let foundModule = filter();
  
  if (foundModule) {
    if (legacycompat) {
      return Promise.resolve(foundModule);
    }

    return [foundModule, () => {}];
  }

  const patches = [];

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
      () => {
        for (const unpatch of patches) unpatch();
      },
    ];
  }
}
