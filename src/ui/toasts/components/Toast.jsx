import webpackModules from "webpackModules";
const Header = webpackModules.findByDisplayName("LegacyHeader");
const FormText = webpackModules.findByDisplayName("LegacyText");

export default (props) => {
  return (
    <div
      onClick={props.onClick}
      className={"cumcord-toast" + (props.className ? ` ${props.className}` : "")}>
      {props.title ? <Header className="cumcord-toast-title">{props.title}</Header> : null}
      {props.content ? (
        <div className="cumcord-toast-content">
          <FormText size={FormText.Sizes.SIZE_16}>{props.content}</FormText>
        </div>
      ) : null}
    </div>
  );
};
