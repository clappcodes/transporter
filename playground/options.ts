import type { AppOptions } from "../transport/mod.ts";

export const options: AppOptions = {
  tls: typeof Deno !== "undefined"
    ? {
      key: Deno.env.get("KEY"),
      cert: Deno.env.get("CERT"),
    }
    : {},
};
