import webpackModules from "webpackModules";
import { showPluginSettings } from "pluginSettings";
import * as plugins from "plugins";

const useState = React.useState;
const Card = webpackModules.findByDisplayName("Card");
const Header = webpackModules.findByDisplayName("Header");
const Text = webpackModules.findByDisplayName("Text");
const Flex = webpackModules.findByDisplayName("Flex");
const Markdown = webpackModules.findByDisplayName("Markdown");
const Switch = webpackModules.findByDisplayName("Switch");

export default (props) => {
  const plugin = plugins.pluginCache[props.pluginId];
  const [enabled, setEnabled] = useState(plugin.enabled);

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
            {/* Settings button */}
            {(() => {
              if (enabled) {
                // Have to check if the plugin is actually loaded before showing the settings button
                if (plugins.loadedPlugins[props.pluginId]) {
                  if (plugins.loadedPlugins[props.pluginId].settings) {
                    return (
                      <svg
                        onClick={() => {
                          showPluginSettings(
                            plugin.manifest.name,
                            plugins.loadedPlugins[props.pluginId].settings
                          )
                        }}
                        className="cumcord-card-settings"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px" viewBox="0 0 24 24" width="24px"
                      >
                        <path d="M0 0h24v24H0V0z" fill="none" /><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                      </svg>
                    );
                  }
                }
              }
            })()}

            {/* Delete button */}
            <svg
              onClick={() => {
                plugins.removePlugin(props.pluginId);
                props.updatePlugins();
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
            checked={enabled}
            onChange={() => {
              try {
                plugins.togglePlugin(props.pluginId);
                setEnabled(plugin.enabled);
              } catch { }
            }}
          />
        </div>
      </Flex>
      <Markdown>{plugin.manifest.description}</Markdown>
    </Card>
  );
};
