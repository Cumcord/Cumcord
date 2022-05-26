import { findByDisplayName, findByDisplayNameAll } from "../modules/webpack";

const proxy = (func) => new Proxy({}, { get: (_, prop) => func(prop) });

// deez nuts getter
export const DNGetter = proxy(findByDisplayName);
export const DNGetterAll = proxy(findByDisplayNameAll);
