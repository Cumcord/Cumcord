import { i18n } from "@commonModules";

import fallback from "./default.json";

import enGB from "./en-GB.json";

const langs = {
  "en-GB": enGB,
};

const consts = new Proxy(fallback, {
  get: (_, prop) => langs[i18n._requestedLocale]?.[prop] ?? fallback[prop],
});
export default consts;

export const i18nfmt = (fmt, ...vals) => {
  let i = 0;
  return consts[fmt].replaceAll("{}", () => vals[i++]);
};
