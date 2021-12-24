import webpackModules from "webpackModules";
import { after, injectCSS } from "patcher";
import PluginEmbed from "./components/PluginEmbed";

const defaultParse = webpackModules.findByProps("defaultRules", "astParserFor");
const regex = /^https:\/\/cumcordplugins\.github\.io\/Condom\/(.+?)\/(.+?)+$/i;

function isModuleUrl(input) {
  return regex.test(input);
}

export default {
  initializePluginEmbeds() {
    injectCSS(`.cumcord-plugembeds-alerttext{margin:0;}`);
    after("react", defaultParse.defaultRules.link, (args) => {
      if (isModuleUrl(args[0].target)) {
        if (!args[0].target.endsWith("/")) args[0].target += "/";
        return <PluginEmbed url={args[0].target} />;
      }
    });
  },
};
