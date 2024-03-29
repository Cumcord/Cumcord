import esbuild from "esbuild";
import alias from "esbuild-plugin-alias";
import path from "path";
import fs from "fs/promises";

// import jsconfig from "./jsconfig.json" assert {type: "json"};
const jsconfig = JSON.parse(await fs.readFile("./jsconfig.json"));

// converts jsconfig paths to esbuild aliases
const aliases = Object.fromEntries(
  Object.entries(jsconfig.compilerOptions.paths).map(([alias, [target]]) => [
    alias,
    path.resolve(target),
  ]),
);

try {
  await esbuild.build({
    entryPoints: ["./src/index.js"],
    outfile: "./dist/new-build.js",
    minify: true,
    bundle: true,
    format: "iife",
    // injects the `React` global into our bundle (for JSX)
    inject: ["./shims/global-react.js"],
    external: ["react"],
    plugins: [
      {
        // injects our React whenever "react" is imported
        name: "external-react",
        setup: (build) =>
          build.onResolve({ filter: /^react$/ }, () => ({
            path: path.resolve("./shims/import-react.cjs"),
          })),
      },
      alias(aliases),
    ],
    target: ["esnext"],
  });

  await fs.appendFile("./dist/new-build.js", `//# sourceURL=Cumcord`);
  console.log("Build successful!");
} catch (err) {
  console.error(err);
  process.exit(1);
}

// copy i18n files
try {
  await fs.mkdir("./dist/i18n");
} catch {}
for (const file of await fs.readdir("./src/i18n"))
  if (/^(.{2}[-_])?.{2}\.json/.test(file))
    await fs.copyFile(path.resolve("./src/i18n", file), path.join("./dist/i18n", file));
