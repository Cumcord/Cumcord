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
    var confirmed = false;

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

    function handleConfirm(value) {
      if (!confirmed) {
        confirmed = true;
        callback(value);
        resolve(value);
      }
    }

    openModal((props) => {
      if (props.transitionState === 3) {
        handleConfirm(false);
      }

      return (
        <ConfirmModal
          header={header}
          confirmText={confirmText}
          cancelText={cancelText}
          transitionState={props.transitionState}
          confirmButtonColor={buttonColor}

          onClose = {() => {
            handleConfirm(false);
          }}

          onCancel = {() => {
            handleConfirm(false);
            props.onClose();
          }}

          onConfirm = {() => {
            handleConfirm(true);
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