import webpackModules from "webpackModules";
import { after, injectCSS } from "patcher";
import getPluginEmbed from "./components/PluginEmbed";
import { ErrorBoundary } from "components";

const regex = /^https:\/\/cumcordplugins\.github\.io\/Condom\/(.+?)\/(.+?)+$/i;

function isModuleUrl(input) {
  return regex.test(input);
}

export default async () => {
  const PluginEmbed = await getPluginEmbed();

  injectCSS(`.cumcord-plugembeds-alerttext{margin:0;}`);
  cumcord.patcher.findAndPatch(
    () => webpackModules.findByProps("defaultRules", "astParserFor"),
    (mod) =>
      after("react", mod.defaultRules.link, (args) => {
        if (isModuleUrl(args[0].target)) {
          if (!args[0].target.endsWith("/")) args[0].target += "/";
          return (
            <ErrorBoundary>
              <PluginEmbed url={args[0].target} />
            </ErrorBoundary>
          );
        }
      }),
  );
};
