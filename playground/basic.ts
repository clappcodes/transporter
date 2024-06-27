import "../global.ts";
import { duplexHandler } from "../transport/mod.ts";
import type { useCors } from "./useCors.ts";

Deno.serve(
  {
    key: Deno.env.get("KEY"),
    cert: Deno.env.get("CERT"),
    port: 8085,
  },
  duplexHandler(
    (req) => {
      const ts = new Transporter(req, [
        transform.decode(),
        transform.toUpperCase(),
        transform.tap(console.log),
        transform.encode(),
      ]);

      return ts;
    },
    (req) => {
      const ts = new Transporter(req, [
        transform.tap(console.warn),
        transform.encode(),
      ]);

      if (!ts.writable.locked) {
        ts.write(req.method + " " + req.url + "\n");
        ts.write("Stream closed\n");
        ts.close();
      }

      return ts;
    },
  ),
);
