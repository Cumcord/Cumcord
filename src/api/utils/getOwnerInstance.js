import getReactInstance from "./getReactInstance.js";

// I never knew what this did before, but it appears that what this code actually does is
// walk up a react fiber until it hits a class component (???) -- sink 2022-05-25
export default (node) => {
  for (let el = getReactInstance(node); el; el = el.return)
    if (el.stateNode?.forceUpdate) return el.stateNode;
};
