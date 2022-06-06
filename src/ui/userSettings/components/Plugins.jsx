import PluginCard from "./PluginCard.jsx";
import { findByDisplayName, findByProps } from "@webpackModules";
import { importPlugin, pluginCache } from "@plugins";
import { showToast } from "@toasts";
import { useNest } from "@utils";
import { ErrorBoundary } from "@components";
import i18n from "@i18n";

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
          title: i18n.FAILED_PLUGIN_IMPORT,
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
            placeholder={i18n.PLUGIN_URL_PLACEHOLDER}
            type="text"
            value={input}
            onChange={setInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleImport();
            }}
          />
          <Button color={Button.Colors.BRAND} size={Button.Sizes.MEDIUM} onClick={handleImport}>
            {i18n.ADD_PLUGIN}
          </Button>
        </Flex>
        <SearchBar
          className="cumcord-plugin-search"
          query={searchFilter}
          onQueryChange={setFilter}
          placeholder={i18n.SEARCH}
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
