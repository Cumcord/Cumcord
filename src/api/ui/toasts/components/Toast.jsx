import webpackModules from "webpackModules";
const Header = webpackModules.findByDisplayNameAll("Header")[1];
const Text = webpackModules.findByDisplayName("Text");

export default (props) => {
  return (
    <div onClick={props.onClick} className={"cumcord-toast" + (props.className ? ` ${props.className}` : "")}>
      {props.title ? <Header className="cumcord-toast-title">{props.title}</Header> : null}
      {props.content ? (
        <div className="cumcord-toast-content">
          <Text size={Text.Sizes.SIZE_16}>{props.content}</Text>
        </div>
      ) : null}
    </div>
  );
};
