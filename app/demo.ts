import * as api from "../transport/api.ts";
import cors from "./cors.ts";
import router from "./router.ts";
import sample from "./sample.ts";

// console.log(apiRoutes);

import * as sample2 from "./sample2.ts";
Object.assign(globalThis, sample2, api, api.api, { api });

export default {
  serve: typeof Deno !== "undefined"
    ? {
      key: Deno.env.get("KEY"),
      cert: Deno.env.get("CERT"),
      port: 5050,
    }
    : undefined,
  ...sample,
  ...router,
  ...cors,
};
