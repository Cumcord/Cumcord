import * as nests from "nests";
import { get, set } from "idb-keyval";

export default {
  nests: nests.default,
  idbKeyval: { get, set }
}