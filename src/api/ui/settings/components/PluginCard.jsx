import webpackModules from "webpackModules";
import * as plugins from "plugins";

const useState = React.useState;
const Card = webpackModules.findByDisplayName("Card");
const Header = webpackModules.findByDisplayName("Header");
const Text = webpackModules.findByDisplayName("Text");
const Flex = webpackModules.findByDisplayName("Flex");
const Markdown = webpackModules.findByDisplayName("Markdown");
const Switch = webpackModules.findByDisplayName("Switch");
const { Separator } = webpackModules.findByProps("Separator");

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
            <svg onClick={
              () => {
                plugins.removePlugin(props.pluginId);
                props.updatePlugins();
              }} className="cumcord-card-delete" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          </div>
          <Switch checked={enabled} onChange={
              () => {
                try {
                  plugins.togglePlugin(props.pluginId);
                  setEnabled(plugin.enabled);
                } catch { }
              }
            } />
        </div>
      </Flex>
      {/* <Separator margin="10px" /> */}
      <Markdown>{plugin.manifest.description}</Markdown>
    </Card>
  )
};
