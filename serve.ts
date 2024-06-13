import { resolve } from "https://deno.land/std@0.224.0/path/resolve.ts";
import "./global.ts";
import type { Context, Request } from "./transport/types.ts";
import isPlainObject from "./utils/is-plain-object.ts";
import { Route } from "./transport/app/Route.ts";

export async function serve(specifier: string) {
  const modPath = resolve(specifier);
  const mod = await import(modPath);

  Object.assign(globalThis, { serveMod: mod, modPath });

  const m = mod.default as TApp.Serve | Route;
  const module = m instanceof Route ? m.options : m;

  const options: Deno.ServeOptions | Deno.ServeTlsOptions = {
    port: module.port,
    hostname: module.hostname,
    key: module.tls?.key,
    cert: module.tls?.cert,
    onListen: module.onListen,
    onError: async (error) => {
      const response = module.onError
        ? await module.onError(error)
        : new Response(`(Serve Error)\n${error}`);

      response.headers.set("cache-control", "no-cache");
      response.headers.set("access-control-allow-origin", "*");
      response.headers.set("access-control-allow-methods", "*");
      response.headers.set("access-control-allow-headers", "*");
      response.headers.set("access-control-max-age", "100");

      return response;
    },
  };

  const handler: Deno.ServeHandler = async (_request, info) => {
    const context: Context = {
      url: new URL(_request.url),
      method: _request.method as Context["method"],
      module: modPath,
      responseInit: {},
      info,
    };

    const request = Object.assign(_request, { context }) as Request;

    if (module.onRequest) {
      await module.onRequest(request, context);
    }

    const responseRaw = await m.fetch(request, context);
    const handled = typeof responseRaw !== "undefined";
    const isResponse = handled && (responseRaw instanceof Response);

    context.handled = handled;
    context.responseRaw = responseRaw;
    context.response = !isResponse && typeof responseRaw !== "undefined"
      ? new Response(
        readable.from(
          isPlainObject(responseRaw)
            ? Object.entries(responseRaw)
            : responseRaw,
        )
          // .pipeThrough(transform.map((c) => c + "\n"))
          .pipeThrough(transform.toUint8Array())
          .pipeThrough(
            transform.check(
              (c) => c instanceof Uint8Array,
              `Response readable required Uint8Array`,
            ),
          ),
        context.responseInit,
      )
      : responseRaw;

    if (handled && module.onResponse) {
      await module.onResponse(request, context);
    }

    if (handled && context.response) {
      context.response.headers.set("serve-module", context.module || specifier);
    }

    return handled && context.response ? context.response : new Response(
      `400 - Unhandled Request\n${request.method} ${request.url}\n${specifier}`,
      {
        status: 400,
      },
    );
  };

  console.log(`\n(serve) ${specifier}\n${modPath}\n\n`);

  return { options, handler };
}

if (import.meta.main) {
  const specifier = Deno.args.at(0);
  if (!specifier) {
    throw new TypeError(`Module specifier missing`);
  }

  serve(specifier)
    .then(({ options, handler }) => Deno.serve(options, handler))
    .catch((err) => {
      console.warn(`(serve) error`, err);
    });
}
