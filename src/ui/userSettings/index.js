import { injectCSS } from "@patcher";
import { registerSection } from "@userSettings";
import Plugins from "./components/Plugins";
import i18n from "@i18n";

export default () => {
  injectCSS(
    `.cumcord-plugin-card{padding:16px;margin-bottom:10px}.cumcord-plugin-import{flex-grow:1;margin-right:20px}.cumcord-plugin-divider{margin-top:10px;margin-bottom:10px}.cumcord-plugin-search{margin-top:10px}.cumcord-card-header{display:inline-block}.cumcord-card-author,.cumcord-card-title{display:inline}.cumcord-card-right{display:flex}.cumcord-card-buttons{display:flex;margin-right:4px}.cumcord-card-buttons>*{fill:var(--interactive-normal);cursor:pointer;width:24px}.cumcord-card-buttons>*:hover{fill:var(--interactive-hover)}.cumcord-card-description{padding-top:3px;overflow-wrap:break-word}.cumcord-card-copy{width:20px}`,
  );

  registerSection("CUMCORD_PLUGINS", i18n.PLUGINS, Plugins);
};
