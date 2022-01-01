import { findByProps, findByDisplayName, findByDisplayNameAll } from "webpackModules";

const ModalComponents = findByProps("ModalCloseButton");
const Header = findByDisplayNameAll('Header')[1];
const Flex = findByDisplayName('Flex');
const { openModal } = findByProps("openModal", "openModalLazy");
import { ErrorBoundary } from "components";

function showPluginSettings(pluginName, settings) {
  openModal((e) => {
    return (
      
      <ModalComponents.ModalRoot
        transitionState={e.transitionState}
        size="large"
        className="cumcord-settings-modal"
      >
        <ErrorBoundary>
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
            {typeof settings === "function" ? React.createElement(settings) : settings}
          </ModalComponents.ModalContent>
        </ErrorBoundary>
      </ModalComponents.ModalRoot>
    );
  });
}

export { showPluginSettings };