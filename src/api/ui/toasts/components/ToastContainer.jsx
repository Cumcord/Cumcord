import { useNest } from "../../../utils";
import toastStore from "../store.js";

export default () => {
  useNest(toastStore);
  return <>{toastStore.ghost.toasts.map((t) => t())}</>;
};
