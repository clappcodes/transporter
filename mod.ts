// shims
import "./shims.ts";

// funcs
export * from "./readable/mod.ts";
export * from "./writeable/mod.ts";
export * from "./transform/mod.ts";

export * as readable from "./readable/mod.ts";
export * as writable from "./writeable/mod.ts";
export * as transform from "./transform/mod.ts";

// types
export type * from "./types.ts";

export { default as pkg } from "./deno.json" with { type: "json" };
