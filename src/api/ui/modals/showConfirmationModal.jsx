import { batchFind } from "@webpackModules";
import i18n from "@i18n";

const [{ openModal }, Colors, { ConfirmModal }, Markdown] = batchFind(({ find, findByProps }) => {
  findByProps("openModalLazy");
  findByProps("button", "colorRed");
  findByProps("ConfirmModal");
  find((m) => m?.defaultProps?.parser); // Markdown
});

export default async (
  {
    header = i18n.ARE_YOU_SURE,
    confirmText = i18n.CONFIRM,
    cancelText = i18n.CANCEL,
    content = i18n.MODAL_DEFAULT,
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
