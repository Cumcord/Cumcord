import { nodeResolve } from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import { babel } from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.js",
  context: "this",
  plugins: [
    nodeResolve(),
    alias({
      entries: [
        {
          find: "commonModules",
          replacement: "./src/api/modules/commonModules.js",
        },
        {
          find: "webpackModules",
          replacement: "./src/api/modules/webpackModules.js",
        },
      ],
    }),
    babel({
      babelHelpers: "bundled",
      extensions: [".jsx"],
      presets: [["@babel/preset-react"]],
    }),
  ],
  output: {
    file: "dist/build.js",
    format: "iife",
    compact: true,
    plugins: [
      terser({
        mangle: true,
        compress: true,
        toplevel: true,
        keep_classnames: false,
      }),
    ],
  },
};
