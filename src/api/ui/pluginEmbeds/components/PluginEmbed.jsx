import { importPlugin, pluginCache } from "plugins";
import { useNest, useFetchPlugin } from "utils";
import webpackModules from "webpackModules";
import PluginEmbedIcon from "./PluginEmbedIcon";
import CopyLink from "./CopyLink";

// Components
const Text = webpackModules.findByDisplayName("Text");
const Button = webpackModules.findByProps("BorderColors", "Colors");
const Alert = webpackModules.findByDisplayName("Alert");
const ModalApi = webpackModules.findByProps("openModal", "useModalsStore");

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
} = webpackModules.findByProps("titleRegion");

// SVGs
const InfoFilled = webpackModules.findByDisplayName("InfoFilled");

export default function PluginEmbed({ url }) {
  useNest(pluginCache);
  const data = useFetchPlugin(url + "/plugin.json");
  const isInstalled = pluginCache.ghost[url];

  return (
    <div className={wrapper}>
      <Text size={Text.Sizes.SIZE_12} className={titleRegion}>
        <strong className={title}>{data.author}</strong>
        <a
          className={infoLink}
          onClick={() => {
            ModalApi.openModal((props) => (
              <Alert
                {...props}
                title="What is this?"
                body={
                  <p id="cumcord-plugembeds-alerttext">
                    This is a Cumcord feature. It allows you to install plugins straight from chat.
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
      </Text>
      <div className={content}>
        <PluginEmbedIcon className={icon} />
        <div className={buildInfo}>
          <Text size={Text.Sizes.SIZE_14} className={subHead}>
            {data.name}
          </Text>
          <Text size={Text.Sizes.SIZE_16} className={buildDetails}>
            {data.description}
          </Text>
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
}
