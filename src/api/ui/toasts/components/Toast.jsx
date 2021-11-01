import webpackModules from "webpackModules";
const Header = webpackModules.findByDisplayNameAll("Header")[1];
const Text = webpackModules.findByDisplayName("Text");

export default ({ title, content }) => {
  return (
    <div className="cumcord-toast">
      {title ? <Header className="cumcord-toast-title">{title}</Header> : null}
      {content ? (
        <div className="cumcord-toast-content">
          <Text size={Text.Sizes.SIZE_16}>{content}</Text>
        </div>
      ) : null}
    </div>
  );
};
