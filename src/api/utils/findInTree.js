/*
DISCLAIMER:
This code is very similar to this code: https://github.com/rauenzi/BDPluginLibrary/blob/2b69190ec2f304a977669ee23b2ec8ed19e8ce0c/src/modules/utilities.js#L140-L166
I read through the code and made my own implementation that is fairly similar to the original. I did not steal it, I only used it as a reference.

I feel I need to make this very clear: Cumcord's code is original and I'm not claiming anything that isn't original as my own.
We share, we don't steal.
*/

export default function findInTree(tree, searchFilter, { walkable = null, ignore = [], limit = 100 } = {}) {
  let iteration = 0;

  function doSearch(tree, searchFilter, { walkable = null, ignore = [] } = {}) {
    iteration += 1;
    if (iteration > limit) return null;

    if (typeof searchFilter === "string") {
      if (tree.hasOwnProperty(searchFilter)) return tree[searchFilter];
    } else if (searchFilter(tree)) return tree;
  
    if (tree) {
      if (Array.isArray(tree)) {
        for (const item of tree) {
          const found = doSearch(item, searchFilter, { walkable, ignore });
          if (found) return found;
        }
      } else if (typeof tree === "object") {
        for (const key of Object.keys(tree)) {
          if (walkable != null) {
            if (!walkable.includes(key)) continue;
          }
  
          if (ignore.includes(key)) continue;
          const found = doSearch(tree[key], searchFilter, { walkable, ignore });
          if (found) return found;
        }
      }
    };
  }

  return doSearch(tree, searchFilter, { walkable, ignore });
}