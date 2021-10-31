import webpackModules from "webpackModules";
const Header = webpackModules.findByDisplayNameAll("Header")[1];
const Text = webpackModules.findByDisplayName("Text");

export default ({ title, content }) => {
  return (
    <div className="cumcord-toast">
      {title ? (
        <div className="cumcord-toast-header">
          <Header tag="h3" className="cumcord-toast-title">{title}</Header>
        </div>
      ) : null}
      <div className="cumcord-toast-content">
        <Text size={Text.Sizes.SIZE_16}>{content}</Text>
      </div>
    </div>
  );
};
