import { React } from "commonModules";
import webpackModules from "webpackModules";

import PluginCard from "./PluginCard.jsx";
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
  return (
    <FormSection>
      <FormTitle tag="h1">Plugins</FormTitle>
      <Flex basis="auto" grow={1} shrink={1}>
        <TextInput
          className="cumcord-plugin-import"
          placeholder="https://example.com/plugin"
          type="text"
        ></TextInput>
        <Button color={Button.Colors.BRAND} size={Button.Sizes.MEDIUM}>
          Add plugin
        </Button>
      </Flex>
      <FormDivider className="cumcord-plugin-divider" />
      { 
        Object.keys(window.cumcord.plugins.pluginCache).map(
          plugin => {
            return <PluginCard pluginId={plugin}/>;
          }
        )
      }
    </FormSection>
  );
};
