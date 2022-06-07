import { i18n } from "@commonModules";

import fallback from "./default.json";

import gb from "./en-GB.json";
import de from "./de.json";
import fr from "./fr.json";
import hu from "./hu.json";
import it from "./it.json";
import nl from "./nl.json";
import pl from "./pl.json";
import ru from "./ru.json";

const langs = {
  "en-GB": gb,
  de,
  fr,
  hu,
  it,
  nl,
  pl,
  ru,
};

const consts = new Proxy(fallback, {
  get: (_, prop) => langs[i18n._requestedLocale]?.[prop] ?? fallback[prop],
});
export default consts;

export const i18nfmt = (fmt, ...vals) => {
  let i = 0;
  return consts[fmt].replaceAll("{}", () => vals[i++]);
};
