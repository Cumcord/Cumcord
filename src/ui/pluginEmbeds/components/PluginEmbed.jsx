import { importPlugin, pluginCache } from "@plugins";
import { useNest, useFetchModule } from "../../../api/utils";
import { findByDisplayName, findByProps, findAsync } from "../../../api/modules/webpack";
import getPluginEmbedIcon from "./PluginEmbedIcon";
import getCopyLink from "./CopyLink";

// Components
// todo: let discord remove this and then cry about it when it breaks (WONTFIX)
let LegacyText = findByDisplayName("LegacyText");

// epically violating the STD, mainly because i don't want to hold back updates for something so small. when it gets merged i'll nuke this into oblivion
if (!LegacyText) LegacyText = findByDisplayName("Text");

const Button = findByProps("BorderColors", "Colors");
const Alert = findByDisplayName("Alert");
const ModalApi = findByProps("openModal", "useModalsStore");

// SVGs
const InfoFilled = findByDisplayName("InfoFilled");

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
  } = await findAsync(() => findByProps("titleRegion"));
  const CopyLink = await getCopyLink();
  const PluginEmbedIcon = await getPluginEmbedIcon();

  return function PluginEmbed({ url }) {
    useNest(pluginCache);
    const data = useFetchModule(url + "/plugin.json");
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
