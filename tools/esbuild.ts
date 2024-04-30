import * as esbuild from "npm:esbuild@0.20.2";
import { emptyDir } from "https://deno.land/x/dnt@0.40.0/mod.ts";

// Import the WASM build on platforms where running subprocesses is not
// permitted, such as Deno Deploy, or when running without `--allow-run`.
// import * as esbuild from "https://deno.land/x/esbuild@0.20.2/wasm.js";

import { denoPlugins } from "jsr:@luca/esbuild-deno-loader@^0.10.3";

await emptyDir("./bundle");

const result = await esbuild.build({
  plugins: [...denoPlugins()],
  // entryPoints: ["https://deno.land/std@0.185.0/bytes/mod.ts"],
  entryPoints: [
    "./transporter.ts",
    "./utils.ts",
  ],
  outdir: "./bundle",
  // outfile: "./dist/transporter.js",
  sourcemap: "linked",
  bundle: true,
  format: "iife",
  platform: "neutral",
  globalName: "Transporter",
  keepNames: true,
  target: ["esnext"],
  define: { "Transporter": "Transporter" },
});

console.log(result.outputFiles);

esbuild.stop();
