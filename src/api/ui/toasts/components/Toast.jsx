import { find, findByCode } from "@webpackModules";

const Header = findByCode(".uppercase]").default; // :C TODO: i am putting todo here simply so i can find this later.
const FormText = find((m) => m?.default?.Colors?.STANDARD).default;

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
