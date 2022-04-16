import webpackModules from "webpackModules";
import { showPluginSettings } from "pluginSettings";
import { useNest, copyText } from "utils";
import { showConfirmationModal } from "modals";
import { showToast } from "toasts";
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
  const pluginCache = plugins.pluginCache;

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
              plugins.loadedPlugins.ghost[props.pluginId].settings,
            );
          }}
          className="cumcord-card-settings"
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px">
          <g>
            <path d="M0,0h24v24H0V0z" fill="none" />
            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
          </g>
        </svg>
      );
    }
  }

  return (
    <Card className="cumcord-plugin-card" type="cardPrimary" outline={false} editable={false}>
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

            {/* Copy button */}
            <svg
              onClick={() => {
                showToast({
                  content: "Copied plugin URL to clipboard.",
                  duration: 1300,
                });
                copyText(props.pluginId);
              }}
              className="cumcord-card-copy"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="none">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4l6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z" />
            </svg>

            {
              // Update button
              plugin.update ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  onClick={() => {
                    pluginCache.store[props.pluginId].update = false;
                  }}>
                  <g>
                    <rect fill="none" height="24" width="24" x="0" />
                  </g>
                  <g>
                    <g>
                      <g>
                        <path d="M21,10.12h-6.78l2.74-2.82c-2.73-2.7-7.15-2.8-9.88-0.1c-2.73,2.71-2.73,7.08,0,9.79s7.15,2.71,9.88,0 C18.32,15.65,19,14.08,19,12.1h2c0,1.98-0.88,4.55-2.64,6.29c-3.51,3.48-9.21,3.48-12.72,0c-3.5-3.47-3.53-9.11-0.02-12.58 s9.14-3.47,12.65,0L21,3V10.12z M12.5,8v4.25l3.5,2.08l-0.72,1.21L11,13V8H12.5z" />
                      </g>
                    </g>
                  </g>
                </svg>
              ) : (
                // Updates disabled button
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                  onClick={() => {
                    pluginCache.store[props.pluginId].update = true;
                  }}>
                  <g>
                    <rect fill="none" height="24" width="24" />
                  </g>
                  <path d="M8.67,5.84L7.22,4.39C8.6,3.51,10.24,3,12,3c2.74,0,5.19,1.23,6.84,3.16L21,4v6h-6l2.41-2.41C16.12,6.02,14.18,5,12,5 C10.8,5,9.66,5.31,8.67,5.84z M13,7h-2v1.17l2,2V7z M19.78,22.61l-3-3C15.39,20.48,13.76,21,12,21c-4.97,0-9-4.03-9-9 c0-1.76,0.51-3.4,1.39-4.78L1.39,4.22l1.41-1.41l18.38,18.38L19.78,22.61z M15.32,18.15L5.84,8.67C5.31,9.66,5,10.8,5,12 c0,3.86,3.14,7,7,7C13.2,19,14.34,18.69,15.32,18.15z M20.94,13h-2.02c-0.12,0.83-0.39,1.61-0.77,2.32l1.47,1.47 C20.32,15.67,20.79,14.38,20.94,13z" />
                </svg>
              )
            }
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
                  },
                );
              }}
              className="cumcord-card-delete"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px">
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
      <Markdown className="cumcord-card-description">{plugin.manifest.description}</Markdown>
    </Card>
  );
};
