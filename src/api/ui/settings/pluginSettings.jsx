import { findByProps, findByDisplayName } from "webpackModules";

const ModalComponents = findByProps("ModalCloseButton");
const Header = findByDisplayName('Header');
const Flex = findByDisplayName('Flex');
const { openModal } = findByProps("openModal");

function showPluginSettings(pluginName, settings) {
  openModal((e) => {
    return (
      <ModalComponents.ModalRoot
        transitionState={e.transitionState}
        size="large"
      >
        <ModalComponents.ModalHeader separator={false}>
          <Flex.Child basis="auto" grow={1} shrink={1} wrap={false}>
            <Header tag="h2" size={Header.Sizes.SIZE_20}>
              {pluginName}
            </Header>
          </Flex.Child>
          <Flex.Child basis="auto" grow={0} shrink={1} wrap={false}>
            <ModalComponents.ModalCloseButton onClick={e.onClose} />
          </Flex.Child>
        </ModalComponents.ModalHeader>
        <ModalComponents.ModalContent>
          {settings}
        </ModalComponents.ModalContent>
      </ModalComponents.ModalRoot>
    );
  });
}

export { showPluginSettings };