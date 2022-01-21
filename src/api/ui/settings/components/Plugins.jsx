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
const SearchBar = webpackModules.findByDisplayName("SearchBar");

function filterCount(str, filter) {
  return str.toLowerCase().split(filter.toLowerCase()).length - 1;
}

export default () => {
  const [searchFilter, setFilter] = useState("");
  const [input, setInput] = useState("");

  function handleImport() {
    plugins
      .importPlugin(input)
      .then(() => setInput(""))
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
        <SearchBar
          className="cumcord-plugin-search"
          query={searchFilter}
          onQueryChange={(e) => {
            setFilter(e);
          }}
          placeholder="Search..."
          size={SearchBar.Sizes.MEDIUM}
        />
        <FormDivider className="cumcord-plugin-divider" />
        {searchFilter
          ? Object.keys(plugins.pluginCache.ghost)
              .sort((a, b) => {
                const pluginA = Object.values(
                  plugins.pluginCache.ghost[a].manifest
                ).join("");
                const pluginB = Object.values(
                  plugins.pluginCache.ghost[b].manifest
                ).join("");

                return (
                  filterCount(pluginB, searchFilter) -
                  filterCount(pluginA, searchFilter)
                );
              })
              .map((plugin) => {
                return <PluginCard pluginId={plugin} />;
              })
          : Object.keys(plugins.pluginCache.ghost).map((plugin) => {
              return <PluginCard pluginId={plugin} />;
            })}
      </FormSection>
    </ErrorBoundary>
  );
};
