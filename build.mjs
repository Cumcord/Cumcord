import esbuild from "esbuild";
import alias from "esbuild-plugin-alias";
import path from "path";
import fs from "fs/promises";

import jsconfig from "./jsconfig.json" assert {type: "json"};

// converts jsconfig paths to esbuild aliases
const aliases = Object.fromEntries(
	Object.entries(jsconfig.compilerOptions.paths)
		.map(([alias, [target]]) => [alias, path.resolve(target)])
);

try {
	await esbuild.build({
		entryPoints: ["./src/index.js"],
		outfile: "./dist/new-build.js",
		minify: true,
		bundle: true,
		format: "iife",
		inject: ["./shims/react-shim.js"],
		external: ["react"],
		plugins: [
			{
				name: "external-react",
				setup(build) {
					build.onResolve({filter: /^react$/}, () => ({
						path: path.resolve("./shims/alt-react-shim.cjs"),
					}));
				},
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
