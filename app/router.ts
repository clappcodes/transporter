import { blue, yellow } from "../colors.ts";
import type { Context } from "../types.ts";
import type { Serve } from "../transport/types.ts";

export default {
  async fetch(request: Request, context: Context) {
    const matched = this.route?.filter((layer) => {
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
    }) || [];

    let response: Response | undefined | void;

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
          response = await layer.fetch(request, context);
          context.response = response;
          break;
          //   console.log({
          //     url: context.url.toString(),
          //     path: context.path,
          //     route: context.route,
          //     param: context.param,
          //     error: context.error,
          //     layer: layer,
          //     response: context.response,
          //   });
        } catch (e) {
          context.error = e;

          //   console.log({
          //     url: context.url.toString(),
          //     path: context.path,
          //     route: context.route,
          //     param: context.param,
          //     error: context.error,
          //     layer: layer,
          //     response: context.response,
          //   });

          console.groupEnd();
          throw e;
        }
      }
    }
    // console.log(context);
    console.groupEnd();

    if (response instanceof Response) {
      return response;
    }
  },
  onError(error: Error) {
    console.log("(onError)", error);
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
  onListen(addr) {
    console.log("(onListen)", addr);
  },
} as Serve;
