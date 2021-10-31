import { React } from "commonModules";
import { useNest } from "utils";
import toastStore from "../store.js";

export default () => {
  useNest(toastStore);
  return <>{toastStore.ghost.toasts.map((toast) => toast())}</>;
};
