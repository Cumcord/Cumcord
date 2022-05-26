import { findByDisplayName } from "@webpackModules";

const Header = findByDisplayName("LegacyHeader");
const FormText = findByDisplayName("LegacyText");

export default (props) => (
  <div onClick={props.onClick} className={"cumcord-toast " + (props.className ?? "")}>
    {props.title && <Header className="cumcord-toast-title">{props.title}</Header>}
    {props.content && (
      <div className="cumcord-toast-content">
        <FormText size={FormText.Sizes.SIZE_16}>{props.content}</FormText>
      </div>
    )}
  </div>
);
