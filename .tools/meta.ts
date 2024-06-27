import type { BuildOptions } from "https://deno.land/x/dnt@0.40.0/mod.ts";

export const makeOptions = (version: string): BuildOptions => ({
  test: false,
  shims: { undici: "dev" },
  compilerOptions: {
    lib: ["ESNext", "DOM", "DOM.Iterable"],
  },
  typeCheck: false,
  declaration: "separate",
  scriptModule: false, // "umd",
  esModule: true,
  entryPoints: [
    "./mod.node.ts",
    // "./server.ts",
    // "./app.ts",
    // "./handlers.ts",
  ],
  importMap: "./deno.json",
  outDir: "./.npm",

  mappings: {},

  package: {
    name: "@clappcodes/transporter",
    version,
    description: "Transport Web Stream",
    license: "MIT",
    homepage: "https://github.com/clappcodes/transporter",
    repository: {
      type: "git",
      url: "git+https://github.com/clappcodes/transporter.git",
    },
    bugs: {
      url: "https://github.com/clappcodes/transporter/issues",
    },
    sideEffects: false,
    type: "module",
    publishConfig: {
      access: "public",
    },
  },
  packageManager: "pnpm",
});
