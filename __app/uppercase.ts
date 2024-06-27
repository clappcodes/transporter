import type { ts2js } from "../.tools/transform.ts";
import { transform } from "../mod.ts";
import { duplexHandler, type TextTStream, type TStream } from "../transport/mod.ts";
import type { RequestHandler } from "../types.ts";

const routes: {
  route?: string | URLPattern;
  fetch: string | RequestHandler;
}[] = [
  {
    route: "/upper",
    fetch: (request) => new Response(request.url),
  },
  {
    route: "/lower",
    fetch: (request) => new Response(request.url),
  },
  {
    fetch(request) {
      const layer = routes.find((layer) => {
        if (layer.route) {
          const route = layer.route instanceof URLPattern
            ? layer.route
            : new URLPattern({ pathname: layer.route });
          return route.exec(request.url);
        }
      });
      if (layer) {
        if (typeof layer.fetch === "function") {
          return layer.fetch(request);
        }
        return import(layer.fetch).then((module) => {
          if (typeof module.default.fetch === "function") {
            return module.default.fetch(request);
          }
          if (typeof module.default === "function") {
            return module.default(request);
          }
          if (typeof module.fetch === "function") {
            return module.fetch(request);
          }
        });
      }
      return new Response(`No route matched ${request.url}`, {
        status: 404,
      });
    },
  },
];

export default {
  fetch: duplexHandler((request) => {
    return new Response(
      request.body!.pipeThrough(transform.decode())
        .pipeThrough(transform.log("uppercase"))
        .pipeThrough(transform.toUpperCase())
        .pipeThrough(transform.encode()),
      // .pipeThrough(
      //   new TStream((request) => {
      //     return new Response(
      //       request.bodym
      //         ?.pipeThrough(transform.decode())
      //         .pipeThrough(transform.lowerCase())
      //         .pipeThrough(transform.encode()),
      //     );
      //   }),
      // ),
    );
    // }

    // return index(request);
  }),
};
