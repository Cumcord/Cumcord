import { batchFind } from "webpackModules";

const [{ openModal }, Colors, ConfirmModal, [, Markdown]] = batchFind(
  ({ findByProps, findByDisplayName, findByDisplayNameAll }) => {
    findByProps("openModalLazy");
    findByProps("button", "colorRed");
    findByDisplayName("ConfirmModal");
    findByDisplayNameAll("Markdown");
  },
);

export default async (
  {
    header = "Are you sure?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    content = "Are you sure you want to do that?",
    type = "neutral",
  } = {},
  callback = () => {},
) =>
  new Promise((resolve) => {
    let confirmed = false;

    // js sorely missing an expression switch moment
    const buttonColor =
      {
        danger: Colors.colorRed,
        confirm: Colors.colorGreen,
      }[type.toLowerCase()] ?? Colors.colorBrandNew;

    function handleConfirm(value) {
      if (confirmed) return;
      confirmed = true;
      callback(value);
      resolve(value);
    }

    openModal((e) => {
      if (e.transitionState === 3) handleConfirm(false);

      return (
        <ConfirmModal
          {...{
            header,
            confirmText,
            cancelText,
          }}
          transitionState={e.transitionState}
          confirmButtonColor={buttonColor}
          onClose={() => handleConfirm(false)}
          onCancel={() => {
            handleConfirm(false);
            e.onClose();
          }}
          onConfirm={() => {
            handleConfirm(true);
            e.onClose();
          }}>
          <Markdown editable={false}>{content}</Markdown>
        </ConfirmModal>
      );
    });
  });
