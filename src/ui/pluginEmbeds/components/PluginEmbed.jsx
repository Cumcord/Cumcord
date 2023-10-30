import { importPlugin, pluginCache } from "@plugins";
import { useNest, useFetchModule } from "@utils";
import { find, findByProps, findByCode, findAsync } from "@webpackModules";
import getPluginEmbedIcon from "./PluginEmbedIcon";
import getCopyLink from "./CopyLink";
import i18n from "@i18n";

// Components
// todo: we love using legacy components
const LegacyText = find((m) => m?.default?.Colors?.STANDARD).default;

const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");
const Alert = findByCode(".minorContainer").default;
const { Tooltip } = findByProps("Tooltip");
const ModalApi = findByProps("openModal", "useModalsStore");

// SVGs
const InfoFilled = findByCode(
  "M6 1C3.243 1 1 3.244 1 6c0 2.758 2.243 5 5 5s5-2.242 5-5c0-2.756-2.243-5-5-5zm0 2.376a.625.625 0 110 1.25.625.625 0 010-1.25zM7.5 8.5h-3v-1h1V6H5V5h1a.5.5 0 01.5.5v2h1v1z",
).default; // OWW OW PAINFUL OW WHY OW

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
        {/* <LegacyText size={LegacyText.Sizes.SIZE_12} className={titleRegion}>
          <strong className={title}>{data.author}</strong>
          <a
            className={infoLink}
            onClick={() => {
              ModalApi.openModal((props) => (
                <Alert
                  {...props}
                  title={i18n.WHAT_IS_THIS}
                  body={<p className="cumcord-plugembeds-alerttext">{i18n.EMBEDS_WHATIS}</p>}
                />
              ));
            }}
            target="_blank">
            <InfoFilled className={infoIcon} />
          </a>
          <CopyLink url={url} />
        </LegacyText> */}
        <div className={content}>
          <PluginEmbedIcon className={icon} />
          <div className={buildInfo}>
            <LegacyText size={LegacyText.Sizes.SIZE_14} className={subHead}>
              {data.name}
            </LegacyText>
            <Tooltip position="top" text={data.description}>
              {(tooltipProps) => (
                <LegacyText
                  {...tooltipProps}
                  size={LegacyText.Sizes.SIZE_16}
                  className={buildDetails}
                  style={{ maxWidth: "215px" }}>
                  {data.description}
                </LegacyText>
              )}
            </Tooltip>
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
            {data.invalid ? i18n.INVALID : isInstalled ? i18n.INSTALLED : i18n.INSTALL}
          </Button>
        </div>
      </div>
    );
  };
}
