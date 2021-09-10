import findInTree from "./findInTree.js";
import logger from "./logger.js";

function findInReactTree(tree, filter) {
  return findInTree(tree, filter, { walkable: ["props", "children", "child", "sibling"] })
}

export { findInTree, findInReactTree, logger };