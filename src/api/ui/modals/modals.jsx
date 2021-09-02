import { findByProps, findByDisplayName } from "webpackModules";

const openModal = findByProps("openModal").openModal;

const Colors = findByProps('button', 'colorRed');
const ConfirmModal = findByDisplayName("ConfirmModal");
const Markdown = findByDisplayName("Markdown");

async function showConfirmationModal({
  header = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  content = "Are you sure you want to do that?",
  type = "neutral",
} = {}, callback = () => {}) {
  return new Promise((resolve) => {
    var buttonColor;

    switch (type.toLowerCase()) {
      case "danger":
        buttonColor = Colors.colorRed;
        break;
      case "confirm":
        buttonColor = Colors.colorGreen;
        break;
      default:
        buttonColor = Colors.colorBrandNew;
        break;
    }

    openModal((props) => {
      if (props.transitionState === 3) {
        callback(false);
        resolve(false);
      }

      return (
        <ConfirmModal
          header={header}
          confirmText={confirmText}
          cancelText={cancelText}
          transitionState={props.transitionState}
          confirmButtonColor={buttonColor}

          onClose = {() => {
            callback(false);
            resolve(false);
          }}

          onCancel = {() => {
            callback(false);
            resolve(false);
            props.onClose();
          }}

          onConfirm = {() => {
            callback(true);
            resolve(true);
            props.onClose();
          }}
        >
          <Markdown editable={false}>{content}</Markdown>
        </ConfirmModal>
      );
    })
  })
}

export { showConfirmationModal };