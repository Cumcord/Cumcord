import { i18n } from "@commonModules";
import defaultStrings from "./default.json";

const BASE_URL = "https://raw.githubusercontent.com/Cumcord/builds/main/i18n/";

const languageList = [
  "ar",
  "de",
  "el",
  "es",
  "en-GB",
  "fr",
  "he",
  "hl",
  "hu",
  "it",
  "nl",
  "pl",
  "pt-BR",
  "ru",
  "tr",
  "vi",
];
const languageMap = { "pt-BR": "pt_BR" };

const langStrings = {};

const updateLangs = () => {
  const currentLocale = i18n._requestedLocale;
  if (langStrings[currentLocale] || !languageList.includes(currentLocale)) return;

  fetch(`${BASE_URL}${languageMap[currentLocale] ?? currentLocale}.json`).then(
    async (r) => (langStrings[currentLocale] = await r.json()),
  );
};

// initial run
updateLangs();

const consts = new Proxy(defaultStrings, {
  get: (_, prop) => {
    updateLangs();
    return langStrings[i18n._requestedLocale]?.[prop] ?? defaultStrings[prop];
  },
});
export default consts;

export const i18nfmt = (fmt, ...vals) => {
  let i = -1;
  return consts[fmt].replaceAll(/{(\d+)?}/g, (_, cap) => {
    i++;
    return vals[cap ?? i];
  });
};

// link: what??? what the fuck??? seriously dude??? ???? i am so concerned for your mental health
// kyza: hi
// simon: and me
// 沙々: use the kanji specifically
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
