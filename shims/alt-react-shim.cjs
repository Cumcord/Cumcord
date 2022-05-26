import wpRequire from "wpRequire";

module.exports = Object.values(wpRequire.c).find((x) => x.exports?.useState).exports;
