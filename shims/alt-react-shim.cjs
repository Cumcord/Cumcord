import wpRequire from "wpRequire";

const React = Object.values(wpRequire.c).find(x => x.exports?.useState).exports;

module.exports = React;