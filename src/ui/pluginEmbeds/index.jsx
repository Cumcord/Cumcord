import { findByProps } from "../../api/modules/webpack";
import { after, findAndPatch, injectCSS } from "../../api/patcher";
import getPluginEmbed from "./components/PluginEmbed";
import { ErrorBoundary } from "../../api/ui/components";

const regex = /^https:\/\/cumcordplugins\.github\.io\/Condom\/(.+?)\/(.+?)+$/i;

export default async () => {
  const PluginEmbed = await getPluginEmbed();

  injectCSS(`.cumcord-plugembeds-alerttext{margin:0;}`);
  findAndPatch(
    () => findByProps("defaultRules", "astParserFor"),
    (mod) =>
      after("react", mod.defaultRules.link, (args) => {
        if (!regex.test(args[0].target)) return;

        if (!args[0].target.endsWith("/")) args[0].target += "/";
        return (
          <ErrorBoundary>
            <PluginEmbed url={args[0].target} />
          </ErrorBoundary>
        );
      }),
  );
};
