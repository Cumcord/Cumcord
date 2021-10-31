import findInTree from "./findInTree.js";
import logger from "./logger.js";
import useNest from "./useNest.js";
import copyText from "./copyText.js";
import getReactInstance from "./getReactInstance.js";

function findInReactTree(tree, filter) {
  return findInTree(tree, filter, { walkable: ["props", "children", "child", "sibling"] })
}

export { findInTree, findInReactTree, logger, useNest, copyText, getReactInstance };