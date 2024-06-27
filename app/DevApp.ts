import Static from "./handlers/static.ts";
import { App, type AppOptions } from "./App.ts";
import notFound from "./handlers/notFound.ts";

export const options: AppOptions = {
  tls: {
    key: Deno.env.get("KEY"),
    cert: Deno.env.get("CERT"),
  },
  port: 8000,
  onListen(addr) {
    const { hostname, port } = addr;
    const location = `https://${hostname}:${port}` as const;

    Object.assign(globalThis, { location });
    Object.assign(options, { location });

    console.log("onListen", location);
  },
};

export class DevApp extends App {
  constructor() {
    super(options);

    this.use(new Static());
    this.use("/favicon.ico", notFound);

    Object.assign(globalThis, { devApp: this });
  }
}
