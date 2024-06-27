import { blue, yellow } from "../colors.ts";
import type { Context } from "../types.ts";
import type { Serve } from "../transport/types.ts";

export default {
  serve: {
    key: Deno.env.get("KEY"),
    cert: Deno.env.get("CERT"),
    port: 3652,
  },
  route: [
    {
      route: {
        protocol: "http{s}?",
        hostname: "clapp.local",
        port: ":port(80|443|3652)",
        pathname: "/error",
      },
      fetch: () => {
        throw new Error("woops!");
      },
      method: "post",
    },
    {
      route: "/favicon.ico",
      fetch: () => new Response(null, { status: 404 }),
    },
    {
      route: "/upper/*/{:id}",
      fetch: (request, context) =>
        new Response(request.url + "\n" + JSON.stringify(context, null, 4)),
    },
    {
      fetch: ({ url, method }) =>
        new Response(`404 - Not Found\n${method} ${url}`, { status: 404 }),
    },
    {
      route: "/lower",
      fetch: (request) => new Response(request.url),
    },
  ],
  async fetch(request: Request) {
    const context = {
      url: new URL(request.url),
      method: request.method.toLowerCase(),
    } as Context;

    const matched = this.route.filter((layer) => {
      if (layer.method && context.method !== layer.method.toLowerCase()) {
        return false;
      }

      layer.route = layer.route || {
        pathname: "*",
        search: "*",
      };

      const pattern = typeof layer.route === "string"
        ? new URLPattern(layer.route, request.url)
        : layer.route instanceof URLPattern
        ? layer.route
        : new URLPattern(layer.route);

      const match = pattern.exec(context.url);

      return layer.match = match || undefined;
    });

    let response: Response | undefined;

    console.groupCollapsed(
      "[" + blue(request.method) + "] " + yellow(request.url),
    );

    for (const layer of matched) {
      if (response instanceof Response) {
        break;
      }

      if (typeof layer.fetch === "function") {
        context.path = layer.match?.pathname.input;
        context.param = layer.match?.pathname.groups!;
        context.route = layer.route;

        try {
          response = context.response = await layer.fetch(request, context);
          console.log({
            url: context.url.toString(),
            path: context.path,
            route: context.route,
            param: context.param,
            error: context.error,
            layer: layer,
            response: context.response,
          });
        } catch (e) {
          context.error = e;

          console.log({
            url: context.url.toString(),
            path: context.path,
            route: context.route,
            param: context.param,
            error: context.error,
            layer: layer,
            response: context.response,
          });

          console.groupEnd();
          throw e;
        }
      }
    }
    console.log(context);
    console.groupEnd();

    if (response instanceof Response) {
      return response;
    }
  },
  error(error: Error) {
    return new Response(
      `<pre style="margin: 10%;font-size:16px">${error.stack}</pre>`,
      {
        headers: {
          "Content-Type": "text/html",
        },
        status: 500,
      },
    );
  },
  start(addr) {
    console.log("Started", addr);
  },
} as Serve;

if (import.meta.main) {
  console.log("main");

  import(import.meta.url).then((module) => {
    Object.assign(globalThis, { mod: module });

    return module.default as Serve;
  })
    .then((module) => {
      Deno.serve({
        ...module.serve,
        onError: module.error,
        //   onListen: module.start,
      }, async (request, info) => {
        const response = await module.fetch(request, { info });
        if (response instanceof Response) {
          return response;
        }

        return new Response(
          `400 - Unhandled Request\n${request.method} ${request.url}`,
          {
            status: 400,
          },
        );
      });
    });
}
