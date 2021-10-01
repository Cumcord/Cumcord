import webpackModules from "webpackModules";
import { useNest } from "utils";
import PluginCard from "./PluginCard.jsx";
import { ErrorBoundary } from "components";
import * as plugins from "plugins";

const useState = React.useState;
const FormTitle = webpackModules.findByDisplayName("FormTitle");
const FormSection = webpackModules.findByDisplayName("FormSection");
const Flex = webpackModules.findByDisplayName("Flex");
const TextInput = webpackModules.findByDisplayName("TextInput");
const Button = webpackModules.findByProps(
  "Sizes",
  "Colors",
  "Looks",
  "DropdownSizes"
);
const FormDivider = webpackModules.findByDisplayName("FormDivider");

export default () => {
  const [input, setInput] = useState("");

  useNest(plugins.pluginCache);

  return (
    <ErrorBoundary>
      <FormSection>
        <FormTitle tag="h1">Plugins</FormTitle>
        <Flex basis="auto" grow={1} shrink={1}>
          <TextInput
            className="cumcord-plugin-import"
            placeholder="https://example.com/plugin"
            type="text"
            value={input}
            onChange={(e) => setInput(e)}
          ></TextInput>
          <Button
            color={Button.Colors.BRAND}
            size={Button.Sizes.MEDIUM}
            onClick={() => {
              setInput("");
              plugins.importPlugin(input);
            }}
          >
            Add plugin
          </Button>
        </Flex>
        <FormDivider className="cumcord-plugin-divider" />
        {Object.keys(plugins.pluginCache.ghost).map((plugin) => {
          return <PluginCard pluginId={plugin} />;
        })}
      </FormSection>
    </ErrorBoundary>
  );
};
