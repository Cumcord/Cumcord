import PluginCard from "./PluginCard.jsx";
import { findByDisplayName, findByProps } from "@webpackModules";
import { importPlugin, pluginCache } from "@plugins";
import { showToast } from "@toasts";
import { useNest } from "@utils";
import { ErrorBoundary } from "@components";

const FormTitle = findByDisplayName("FormTitle");
const FormSection = findByDisplayName("FormSection");
const Flex = findByDisplayName("Flex");
const TextInput = findByDisplayName("TextInput");
const Button = findByProps("Sizes", "Colors", "Looks", "DropdownSizes");
const FormDivider = findByDisplayName("FormDivider");
const SearchBar = findByDisplayName("SearchBar");

const filterCount = (str, filter) => str.toLowerCase().split(filter.toLowerCase()).length - 1;

export default () => {
  const [searchFilter, setFilter] = React.useState("");
  const [input, setInput] = React.useState("");

  useNest(pluginCache);

  const handleImport = () =>
    importPlugin(input).then(
      () => setInput(""),
      (err) =>
        showToast({
          title: "Failed to import plugin",
          content: err.message,
          duration: 3000,
        }),
    );

  const pluginIds = Object.keys(pluginCache.ghost);
  const filteredPlugins = !searchFilter
    ? pluginIds
    : pluginIds.sort((a, b) => {
        const pluginA = Object.values(pluginCache.ghost[a].manifest).join("");
        const pluginB = Object.values(pluginCache.ghost[b].manifest).join("");

        return filterCount(pluginB, searchFilter) - filterCount(pluginA, searchFilter);
      });

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
            onChange={setInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleImport();
            }}
          />
          <Button color={Button.Colors.BRAND} size={Button.Sizes.MEDIUM} onClick={handleImport}>
            Add plugin
          </Button>
        </Flex>
        <SearchBar
          className="cumcord-plugin-search"
          query={searchFilter}
          onQueryChange={setFilter}
          placeholder="Search..."
          size={SearchBar.Sizes.MEDIUM}
        />
        <FormDivider className="cumcord-plugin-divider" />
        {filteredPlugins.map((p) => (
          <PluginCard pluginId={p} />
        ))}
      </FormSection>
    </ErrorBoundary>
  );
};
