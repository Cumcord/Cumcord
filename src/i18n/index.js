import { i18n } from "@commonModules";

import fallback from "./default.json";

import de from "./de.json";
import el from "./el.json";
import gb from "./en-GB.json";
import fr from "./fr.json";
import hi from "./hi.json";
import hu from "./hu.json";
import it from "./it.json";
import nl from "./nl.json";
import pl from "./pl.json";
import ru from "./ru.json";
import tr from "./tr.json";
import vi from "./vi.json";

const langs = {
  de,
  el,
  "en-GB": gb,
  fr,
  hi,
  hu,
  it,
  nl,
  pl,
  ru,
  tr,
  vi,
};

const consts = new Proxy(fallback, {
  get: (_, prop) => langs[i18n._requestedLocale]?.[prop] ?? fallback[prop],
});
export default consts;

export const i18nfmt = (fmt, ...vals) => {
  let i = -1;
  return consts[fmt].replaceAll(/{(\d+)?}/g, (_, cap) => {
    i++;
    return vals[cap ?? i];
  });
};

export const i18nfmtSplit = (fmt, ...vals) => {
  const parts = [];
  let working = "";
  let matchedI = 0;
  for (let i = 0; i < consts[fmt].length; i++) {
    working += consts[fmt][i];
    const match = working.match(/{(\d+)?}/);
    if (match) {
      if (match.index !== 0) parts.push([-1, working.slice(0, match.index)]);
      const thisMatchI = parseInt(match[1] ?? matchedI);
      parts.push([thisMatchI, vals[thisMatchI]]);
      matchedI++;
      working = "";
    }
  }
  parts.push([-1, working]);

  return parts;
};
