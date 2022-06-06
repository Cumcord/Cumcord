import { loadPluginDev, isDevModeOn } from "@devmode";
import { importPlugin } from "@plugins";
import showConfirmationModal from "@modals";
import i18n, { i18nfmt } from "@i18n";

// responses from the WS are purposefully not subject to i18n to avoid breaking anyone's logic.

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
        header: i18n.INSTALL_PROMPT,
        content: i18nfmt("CAN_BE_DANGEROUS", msg.url),
        confirmText: i18n.INSTALL,
        type: "danger",
      },
      (res) => {
        if (!res) return error("Plugin installation cancelled.");
        importPlugin(msg.url).then(ok, error);
      },
    );
  },
};
