import { zustand as create } from "commonModules";

const store = create((set) => ({
  toasts: [],
}));

function addToast(toast) {
  const state = store.getState();
  store.setState({ toasts: [...state.toasts, toast] });
}

function removeToast(toast) {
  const state = store.getState();
  let index = state.toasts.indexOf(toast);
  if (index > -1) {
    store.setState({ toasts: state.toasts.filter((_, i) => i !== index) });
  }
}

export { store as default, addToast, removeToast };
