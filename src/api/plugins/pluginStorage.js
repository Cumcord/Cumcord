import * as nests from "nests";
import { get, set } from "idb-keyval";

// This function returns an object that will automatically be saved to indexeddb on modification
async function createStore(prefix) {
  const cached = await get(`${prefix}_CUMCORD_STORE`) || {};
  const store = nests.make(cached);

  store.on(nests.Events.SET, () => {
    set(`${prefix}_CUMCORD_STORE`, { ...store.ghost });
  })

  return store.store;
}

export { createStore };