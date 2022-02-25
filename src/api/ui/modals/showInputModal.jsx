import { React } from "commonModules";
import { findByProps, findByDisplayName } from "webpackModules";

const { openModal } = findByProps("openModal", "openModalLazy");

const Button = findByProps("DropdownSizes");
const Modal = findByProps("ModalCloseButton");
const FormTitle = findByDisplayName("FormTitle");
const TextInput = findByDisplayName("TextInput");

export default async ({
  titleText = "Input Modal",
  headerText = "Input Text",
  buttonText = "Submit",
  placeholder = "rape LMAO",
} = {}) => {
  return new Promise((resolve) => {
    openModal((event) => {
      return <InputModal
        event={event}
        resolve={resolve}
        options={{
          titleText,
          headerText,
          buttonText,
          placeholder,
        }} />;
    });
  });
};

const InputModal = ({ event, options, resolve }) => {
  const [input, _setInput] = React.useState("");

  // shove state into an object so memoized funcs can read it
  const inputRef = React.useRef();
  const setInput = (data) => {
    inputRef.current = data;
    _setInput(data);
  };

  const onEnter = (keyPressEvent) => {
    if (keyPressEvent.key !== "Enter") return;

    resolve(inputRef.current);
    event.onClose();
  };

  React.useEffect(() => {
    document.addEventListener("keydown", onEnter);
    return () => document.removeEventListener("keydown", onEnter);
  }, []);

  return (
    <Modal.ModalRoot transitionState={event.transitionState} size={Modal.ModalSize.SMALL}>
      <Modal.ModalHeader>
        <FormTitle tag="h3">{options.titleText}</FormTitle>
        <Modal.ModalCloseButton onClick={event.onClose} />
      </Modal.ModalHeader>
      <div style={{ marginTop: "10px" }} />
      <Modal.ModalContent>
        <FormTitle>{options.headerText}</FormTitle>
        <TextInput
          hideBorder={true}
          value={input}
          onChange={setInput}
          placeholder={options.placeholder}
          style={{ marginBottom: "10px" }} />
      </Modal.ModalContent>
      <Modal.ModalFooter>
        <Button
          onClick={() => {
            resolve(input);
            event.onClose();
          }}
          color={Button.Colors.GREEN}>
          {options.buttonText}
        </Button>
        <Button
          onClick={event.onClose}
          look={Button.Looks.LINK}
          color={Button.Colors.TRANSPARENT}>
          Cancel
        </Button>
      </Modal.ModalFooter>
    </Modal.ModalRoot>
  );
};