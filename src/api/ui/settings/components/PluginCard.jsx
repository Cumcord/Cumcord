import { React } from "commonModules";
import webpackModules from "webpackModules";

const useState = React.useState;
const Card = webpackModules.findByDisplayName("Card");
const Header = webpackModules.findByDisplayName("Header");
const Text = webpackModules.findByDisplayName("Text");
const Flex = webpackModules.findByDisplayName("Flex");
const Markdown = webpackModules.findByDisplayName("Markdown");
const Switch = webpackModules.findByDisplayName("Switch");
const { Separator } = webpackModules.findByProps("Separator");


export default (props) => {
  const plugin = window.cumcord.plugins.pluginCache[props.pluginId];
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
        <Switch checked={enabled} onChange={
            () => {
              try {
                window.cumcord.plugins.togglePlugin(props.pluginId);
                setEnabled(plugin.enabled);
              } catch { }
            }
          } />
      </Flex>
      {/* <Separator margin="10px" /> */}
      <Markdown>{plugin.manifest.description}</Markdown>
    </Card>
  )
};
