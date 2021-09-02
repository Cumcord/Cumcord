const esbuild = require("esbuild");
const alias = require('esbuild-plugin-alias');
const path = require("path");

esbuild.build({
  entryPoints: ["./src/index.js"],
  outfile: "./dist/build.js",
  minify: true,
  bundle: true,
  format: "iife",
  inject: ["react-shim.js"],
  plugins: [
    alias({
      "commonModules": path.resolve("./src/api/modules/commonModules.js"),
      "webpackModules": path.resolve("./src/api/modules/webpackModules.js"),
      "patcher": path.resolve("./src/api/patcher/patcher.js"),
      "websocket": path.resolve("./src/api/websocket/websocket.js"),
      "plugins": path.resolve("./src/api/plugins/plugins.js"),
      "toasts": path.resolve("./src/api/ui/toasts/toasts.jsx"),
      "modals": path.resolve("./src/api/ui/modals/modals.jsx")
    })
  ],
});