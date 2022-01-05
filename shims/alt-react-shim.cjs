import getModules from "getModules";

const React = Object.values(getModules()).find(x => x.exports?.useState).exports;

module.exports = React;