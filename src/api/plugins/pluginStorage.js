import * as nests from "nests";
import internalModules from "internalModules";

// This function returns an object that will automatically be saved to indexeddb on modification
async function createPersistentNest(prefix) {
  const cached = (await internalModules.idbKeyval.get(`${prefix}_CUMCORD_STORE`)) || {};
  const nest = nests.make(cached);

  let save = () => internalModules.idbKeyval.set(`${prefix}_CUMCORD_STORE`, { ...nest.ghost });

  nest.on(nests.Events.SET, save);
  nest.on(nests.Events.DELETE, save);

  return nest;
}

export { createPersistentNest };
