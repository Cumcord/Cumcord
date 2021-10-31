import findInTree from "./findInTree.js";

export default function findInReactTree(tree, filter) {
  return findInTree(tree, filter, { walkable: ["props", "children", "child", "sibling"] })
}