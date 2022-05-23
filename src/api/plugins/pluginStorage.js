import { nests, idbKeyval } from "internalModules";

// This function returns an object that will automatically be saved to indexeddb on modification
export async function createPersistentNest(prefix) {
  const cached = await idbKeyval.get(`${prefix}_CUMCORD_STORE`);
  const nest = nests.make(cached ?? {});

  const save = () => idbKeyval.set(`${prefix}_CUMCORD_STORE`, { ...nest.ghost });

  nest.on(nests.Events.SET, save);
  nest.on(nests.Events.DELETE, save);

  return nest;
}
