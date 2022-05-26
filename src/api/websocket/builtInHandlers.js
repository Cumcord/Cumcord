import { loadPluginDev, isDevModeOn } from "../devmode";
import { importPlugin } from "../plugins";
import showConfirmationModal from "../ui/showConfirmationModal";

export default {
  get_info: (_msg, { ok }) => ok(),

  update_plugin_dev: (_msg, { ok, error }) => {
    if (!isDevModeOn()) return error("Dev mode is not enabled.");
    loadPluginDev();
    ok();
  },

  install_plugin: (msg, { ok, error }) => {
    if (!msg.url) return error("No URL provided.");

    if (!msg.url.match(/^(http|https):\/\/[^ "]+$/)) return error("Invalid URL.");

    // window.DiscordNative === undefined, DiscordNative = throw!
    // hence for optional chain must specify window.
    window.DiscordNative?.window.focus();

    showConfirmationModal(
      {
        header: "Do you want to install this plugin?",
        content: `Cumcord plugins can run code on your computer and can be potentially dangerous. Only click confirm if you trust the plugin from \`${msg.url}\`.`,
        confirmText: "Install",
        cancelText: "Cancel",
        type: "danger",
      },
      (res) => {
        if (!res) return error("Plugin installation cancelled.");
        importPlugin(msg.url);
        ok();
      },
    );
  },
};
