import webpackModules from 'webpackModules';

const Card = webpackModules.findByDisplayName('Card');
const Header = webpackModules.findByDisplayName('Header');
const Text = webpackModules.findByDisplayName('Text');
const Markdown = webpackModules.findByDisplayNameAll('Markdown')[1];

export default (props) => {
  return (
    <Card className="cumcord-toast" type="cardPrimary" outline={false} editable={false}>
      <div className="cumcord-toast-header">
        <Header className="cumcord-toast-title">{props.children}</Header>
      </div>
    </Card>
  );
};
