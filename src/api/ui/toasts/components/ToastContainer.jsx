import { React } from "commonModules";
import useStore from "../store.js";

export default () => {
  const toasts = useStore(state => state.toasts);
  return <>a {toasts}</>;
}