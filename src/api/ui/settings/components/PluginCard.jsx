import webpackModules from "webpackModules";
import { showPluginSettings } from "pluginSettings";
import { useNest } from "utils";
import { showConfirmationModal } from "modals";
import { del } from "idb-keyval";
import * as plugins from "plugins";

const Card = webpackModules.findByDisplayName("Card");
const Header = webpackModules.findByDisplayNameAll("Header")[1];
const Text = webpackModules.findByDisplayName("Text");
const Flex = webpackModules.findByDisplayName("Flex");
const Markdown = webpackModules.findByDisplayNameAll("Markdown")[1];
const Switch = webpackModules.findByDisplayName("Switch");

export default (props) => {
  const plugin = plugins.pluginCache.ghost[props.pluginId];
  // Nests can be confusing. The plugin just might not exist yet so we return null until the component rerenders.
  if (!plugin.manifest) return null;

  useNest(plugins.loadedPlugins, false, (type, data) => {
    if (data.path[0] == props.pluginId) {
      return true;
    }
  });

  // Have to check if the plugin is actually loaded before showing the settings button
  let settings = null;
  if (plugins.loadedPlugins.ghost[props.pluginId]) {
    if (plugins.loadedPlugins.ghost[props.pluginId].settings) {
      settings = (
        <svg
          onClick={() => {
            showPluginSettings(
              plugin.manifest.name,
              plugins.loadedPlugins.ghost[props.pluginId].settings
            );
          }}
          className="cumcord-card-settings"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <g>
            <path d="M0,0h24v24H0V0z" fill="none" />
            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
          </g>
        </svg>
      );
    }
  }

  return (
    <Card
      className="cumcord-plugin-card"
      type="cardPrimary"
      outline={false}
      editable={false}
    >
      <Flex justify={Flex.Justify.BETWEEN} align={Flex.Align.CENTER}>
        <div className="cumcord-card-header">
          <Header className="cumcord-card-title">{plugin.manifest.name}</Header>
          <Text className="cumcord-card-author" tag="h5">
            {" "}
            by <strong>{plugin.manifest.author}</strong>
          </Text>
        </div>
        <div className="cumcord-card-right">
          <div className="cumcord-card-buttons">
            {settings}
            {/* Delete button */}
            <svg
              onClick={() => {
                showConfirmationModal(
                  {
                    header: "Do you want to remove this plugin?",
                    content: `All of ${plugin.manifest.name}'s data will be deleted and cannot be recovered.`,
                    type: "danger",
                    confirmText: "Delete",
                  },
                  (conf) => {
                    if (conf) {
                      plugins.removePlugin(props.pluginId);
                      del(`${props.pluginId}_CUMCORD_STORE`);
                    }
                  }
                );
              }}
              className="cumcord-card-delete"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
          </div>
          <Switch
            checked={plugin.enabled}
            onChange={() => {
              try {
                plugins.togglePlugin(props.pluginId);
              } catch {}
            }}
          />
        </div>
      </Flex>
      <Markdown className="cumcord-card-description">
        {plugin.manifest.description}
      </Markdown>
    </Card>
  );
};
