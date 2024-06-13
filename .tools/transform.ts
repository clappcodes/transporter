import * as esbuild from "npm:esbuild@0.20.2";

// Import the WASM build on platforms where running subprocesses is not
// permitted, such as Deno Deploy, or when running without `--allow-run`.
// import * as esbuild from "https://deno.land/x/esbuild@0.20.2/wasm.js";

import { denoPlugins } from "jsr:@luca/esbuild-deno-loader@^0.10.3";

export async function ts2js(file: string) {
  let bundle = false;
  let minify = false;
  let cache = false;
  let src = false;

  let sourcemap:
    | boolean
    | "inline"
    | "external"
    | "linked"
    | "both"
    | undefined = "inline";

  if (file.includes("://")) {
    const url = new URL(file);
    file = "." + url.pathname;
    minify = url.searchParams.has("minify");
    bundle = url.searchParams.has("bundle");
    cache = url.searchParams.has("cache");
    src = url.searchParams.has("src") || url.searchParams.has("source");

    sourcemap = url.searchParams.get("sourcemap") as typeof sourcemap ||
        bundle
      ? "linked"
      : "inline";
  }
  const outfile = src ? file : "./.bundle/" + file;

  try {
    if (!src && Deno.env.get("BUNDLE") === "true" && !cache) {
      await esbuild.build({
        plugins: [...denoPlugins({ configPath: Deno.cwd() + "/deno.json" })],
        entryPoints: [file],
        outfile,
        sourcemap,
        minify,
        bundle,
        format: "esm",
        write: true,
        platform: "neutral",
        target: "esnext",
        keepNames: true,
      });
    }

    // esbuild.stop();
    // return result.outputFiles.at(0)?.contents;

    const _file = await Deno.open(outfile, { read: true });

    return _file.readable;
  } catch (e) {
    await esbuild.stop();
    console.log(e);
    throw e; // new TypeError(e);
    // console.log(e);
    // return String(e);
  }
}
