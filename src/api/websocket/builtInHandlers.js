import { loadPluginDev, devModeOn } from "devmode";
import { importPlugin } from "plugins";
import { showConfirmationModal } from "modals";

export default {
  get_info: (_msg, { ok }) => ok(),

  update_plugin_dev: (_msg, { ok, error }) => {
    if (!devModeOn) return error("Dev mode is not enabled.");
    loadPluginDev();
    ok();
  },

  install_plugin: (msg, { ok, error }) => {
    if (!msg.url) {
      error("No URL provided.");
      return;
    }

    if (!msg.url.match(/^(http|https):\/\/[^ "]+$/)) {
      error("Invalid URL.");
      return;
    }

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
        if (res) {
          importPlugin(parsed.url);
          ok();
        } else error("Plugin installation cancelled.");
      },
    );
  },
};
