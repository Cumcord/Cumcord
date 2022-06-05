import findInTree from "./findInTree.js";

export default (tree, filter) =>
  findInTree(tree, filter, { walkable: ["props", "children", "child", "sibling"] });
