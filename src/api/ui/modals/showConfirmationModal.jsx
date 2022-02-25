import { findByProps, findByDisplayName, findByDisplayNameAll } from "webpackModules";

const { openModal } = findByProps("openModal", "openModalLazy");

const Colors = findByProps("button", "colorRed");
const ConfirmModal = findByDisplayName("ConfirmModal");
const Markdown = findByDisplayNameAll("Markdown")[1];

export default async function showConfirmationModal({
  header = "Are you sure?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  content = "Are you sure you want to do that?",
  type = "neutral",
} = {}, callback = () => { }) {
  return new Promise((resolve) => {
    let buttonColor;
    let confirmed = false;

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

          onClose={() => {
            handleConfirm(false);
          }}

          onCancel={() => {
            handleConfirm(false);
            props.onClose();
          }}

          onConfirm={() => {
            handleConfirm(true);
            props.onClose();
          }}
        >
          <Markdown editable={false}>{content}</Markdown>
        </ConfirmModal>
      );
    });
  });
}