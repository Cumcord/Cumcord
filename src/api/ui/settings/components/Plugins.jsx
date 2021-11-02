import PluginCard from "./PluginCard.jsx";
import webpackModules from "webpackModules";
import * as plugins from "plugins";
import { showToast } from "toasts";
import { useNest } from "utils";
import { ErrorBoundary } from "components";

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

  function handleImport() {
    setInput("");
    plugins
      .importPlugin(input)
      .then(() => {})
      .catch((err) =>
        showToast({
          title: "Failed to import plugin",
          content: err.message,
          duration: 3000,
        })
      );
  }

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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImport();
              }
            }}
          ></TextInput>
          <Button
            color={Button.Colors.BRAND}
            size={Button.Sizes.MEDIUM}
            onClick={handleImport}
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
