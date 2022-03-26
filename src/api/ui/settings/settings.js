import { findAsync, findByDisplayName } from "webpackModules";
import { after, injectCSS } from "patcher";
import Plugins from "./components/Plugins.jsx";

export default {
  async initializeSettings() {
    // All patcher.injectCSS calls are uninjected when cumcord.uninject() is called, so this is never changed
    injectCSS(
      `.cumcord-plugin-card{padding:16px;margin-bottom:10px}.cumcord-plugin-import{flex-grow:1;margin-right:20px}.cumcord-plugin-divider{margin-top:10px;margin-bottom:10px}.cumcord-plugin-search{margin-top:10px}.cumcord-card-header{display:inline-block}.cumcord-card-author,.cumcord-card-title{display:inline}.cumcord-card-right{display:flex}.cumcord-card-buttons{display:flex;margin-right:4px}.cumcord-card-buttons>*{fill:var(--interactive-normal);cursor:pointer;width:20px}.cumcord-card-buttons>*:hover{fill:var(--interactive-hover)}.cumcord-card-description{padding-top:3px;overflow-wrap:break-word}.cumcord-card-copy{width:18px}`,
    );

    const SettingsView = await findAsync(() => findByDisplayName("SettingsView"));

    after("getPredicateSections", SettingsView.prototype, (args, items) => {
      const position =
        items.findIndex((item) => {
          return item.section == "changelog";
        }) - 1;

      // Check if we're in the user settings menu, if not, fuck off
      if (position < 0) return items;

      const cumcordSettings = [
        { section: "DIVIDER" },
        { section: "HEADER", label: "Cumcord" },
        { section: "CUMCORD_PLUGINS", label: "Plugins", element: Plugins },
      ];
      items.splice(position, 0, ...cumcordSettings);

      return items;
    });
  },
};
