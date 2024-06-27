// shims
import "./shims.ts";

export * as readable from "./readable/mod.ts";
export * as writable from "./writable/mod.ts";
export * as transform from "./transform/mod.ts";
export * from "./transporter/mod.ts";
export { route, Router } from "./transporter/Router.ts";
export { pipe } from "./transporter/pipe.ts";

// export { default as package } from "./deno.json" with { type: "json" };
