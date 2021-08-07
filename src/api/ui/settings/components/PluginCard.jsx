import { React } from "commonModules";
import webpackModules from "webpackModules";

const Card = webpackModules.findByDisplayName("Card");
const Header = webpackModules.findByDisplayName("Header");
const Text = webpackModules.findByDisplayName("Text");
const Flex = webpackModules.findByDisplayName("Flex");
const Markdown = webpackModules.findByDisplayName("Markdown");
const Switch = webpackModules.findByDisplayName("Switch");
const { Separator } = webpackModules.findByProps("Separator");


export default class PluginCard extends React.Component {
  constructor(props) {
    super(props);

    const plugin = window.cumcord.plugins.pluginCache[props.pluginId];
    this.state = {
      plugin,
      enabled: plugin.enabled,
    }
  }

  render() {
    const { plugin } = this.state;

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
          <Switch checked={this.state.enabled} onChange={
              () => {
                try {
                  window.cumcord.plugins.togglePlugin(this.props.pluginId);
                  // Unnecessary?
                  this.setState({ enabled: plugin.enabled });
                } catch { }
              }
            } />
        </Flex>
        {/* <Separator margin="10px" /> */}
        <Markdown>{plugin.manifest.description}</Markdown>
      </Card>
    )
  }
};
