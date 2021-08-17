import { React } from 'commonModules';
import webpackModules from 'webpackModules';

const Card = webpackModules.findByDisplayName('Card');
const Header = webpackModules.findByDisplayName('Header');
const Flex = webpackModules.findByDisplayName('Flex');
const Text = webpackModules.findByDisplayName('Text');
const Markdown = webpackModules.findByDisplayName('Markdown');

export default (props) => {
  return (
    <Card className="cumcord-toast" type="cardPrimary" outline={false} editable={false}>
      <Flex justify={Flex.Justify.BETWEEN} align={Flex.Align.CENTER}>
        <div className="cumcord-toast-header">
          <Header className="cumcord-toast-title">{props.children}</Header>
        </div>
      </Flex>
    </Card>
  );
};
