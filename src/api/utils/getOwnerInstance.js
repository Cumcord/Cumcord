import getReactInstance from "./getReactInstance.js";

export default function getOwnerInstance(node) {
  for (let el = getReactInstance(node); el; el = el.return) {
    const owner = el.stateNode;

    if (owner && owner.forceUpdate) {
      return owner;
    }
  }
}