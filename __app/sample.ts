import { duplexHandler } from "../transport/mod.ts";
import type { Serve } from "../transport/types.ts";
import type { defineStreamHandler } from "./defineStreamHandler.ts";
import _static from "./static.ts";

export default {
  route: [
    {
      route: "/error",
      fetch: () => {
        throw new Error("woops!");
      },
    },
    {
      route: "/favicon.ico",
      fetch: () => new Response(null, { status: 404 }),
    },
    {
      route: "/echo",
      fetch: duplexHandler(({ body }) => new Response(body)),
    },
    {
      route: "/upper/*/{:id}",
      fetch: (request, context) =>
        new Response(request.url + "\n" + JSON.stringify(context, null, 4)),
    },
    {
      route: "/lower",
      fetch: (request, context) =>
        new Response(request.method + " " + request.url + " " + context.route),
    },
    _static,
    {
      fetch: ({ url, method }) =>
        new Response(`404 - Not Found\n${method} ${url}`, { status: 404 }),
    },
  ],
} as Serve;
