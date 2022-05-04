import { importPlugin, pluginCache } from "plugins";
import { useNest, useFetchPlugin } from "utils";
import webpackModules from "webpackModules";
import getPluginEmbedIcon from "./PluginEmbedIcon";
import getCopyLink from "./CopyLink";

// Components
// todo: let discord remove this and then cry about it when it breaks (WONTFIX)
let LegacyText = webpackModules.findByDisplayName("LegacyText");

// epically violating the STD, mainly because i don't want to hold back updates for something so small. when it gets merged i'll nuke this into oblivion
if (!LegacyText) LegacyText = webpackModules.findByDisplayName("Text");

const Button = webpackModules.findByProps("BorderColors", "Colors");
const Alert = webpackModules.findByDisplayName("Alert");
const ModalApi = webpackModules.findByProps("openModal", "useModalsStore");

// SVGs
const InfoFilled = webpackModules.findByDisplayName("InfoFilled");

export default async function getPluginEmbed() {
  // Classes
  const {
    wrapper,
    content,
    title,
    titleRegion,
    icon,
    infoLink,
    infoIcon,
    buildInfo,
    buildDetails,
    subHead,
  } = await webpackModules.findAsync(() => webpackModules.findByProps("titleRegion"));
  const CopyLink = await getCopyLink();
  const PluginEmbedIcon = await getPluginEmbedIcon();

  return function PluginEmbed({ url }) {
    useNest(pluginCache);
    const data = useFetchPlugin(url + "/plugin.json");
    const isInstalled = pluginCache.ghost[url];

    return (
      <div className={wrapper}>
        <LegacyText size={LegacyText.Sizes.SIZE_12} className={titleRegion}>
          <strong className={title}>{data.author}</strong>
          <a
            className={infoLink}
            onClick={() => {
              ModalApi.openModal((props) => (
                <Alert
                  {...props}
                  title="What is this?"
                  body={
                    <p className="cumcord-plugembeds-alerttext">
                      This is a Cumcord feature. It allows you to install plugins straight from
                      chat.
                      <br />
                      Simply hit the install button on the embed.
                    </p>
                  }
                />
              ));
            }}
            target="_blank">
            <InfoFilled className={infoIcon} />
          </a>
          <CopyLink url={url} />
        </LegacyText>
        <div className={content}>
          <PluginEmbedIcon className={icon} />
          <div className={buildInfo}>
            <LegacyText size={LegacyText.Sizes.SIZE_14} className={subHead}>
              {data.name}
            </LegacyText>
            <LegacyText size={LegacyText.Sizes.SIZE_16} className={buildDetails}>
              {data.description}
            </LegacyText>
          </div>
          <Button
            size={Button.Sizes.MEDIUM}
            color={
              data.invalid
                ? Button.Colors.GREY
                : isInstalled
                ? Button.Colors.BLUE
                : Button.Colors.GREEN
            }
            disabled={data.invalid || isInstalled}
            onClick={() => importPlugin(url)}>
            {data.invalid ? "Invalid" : isInstalled ? "Installed" : "Install"}
          </Button>
        </div>
      </div>
    );
  };
}
