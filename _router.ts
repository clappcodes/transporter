import { walk } from "jsr:@std/fs/walk";
import type { RequestMethod } from "./types.ts";
import { $fetch } from "./transport/_fetch.ts";
import "./transport/global.ts";

type Layer = {
  path?: string;
  route?: string;
  method?: RequestMethod;
  fetch?: Deno.ServeHandler;
};

export async function routerFromPath(root: string | URL) {
  const stack: [...Layer[]] = [];

  for await (const dirEntry of walk(root, { exts: ["ts"] })) {
    if (dirEntry.isFile) {
      const a = dirEntry.name.split(".");
      const method = a.length > 2
        ? a.shift()?.toUpperCase() as RequestMethod
        : undefined;
      const route = "/" + dirEntry.path.slice(0, -3);
      const path = import.meta.resolve("./" + dirEntry.path);

      stack.push({
        path,
        route,
        method,
      });
    }
  }

  return stack;
}

export function resolve(input: string, stack: Layer[]) {
  //   const stack = await router("./app");
  const url = new URL(input, "https://localhost");
  const _urlPath = url.pathname.endsWith("/")
    ? url.pathname
    : url.pathname + "/";

  return stack.find((layer) => {
    const _layerPath = layer.route?.endsWith("/")
      ? layer.route!
      : layer.route! + "/";

    return _urlPath.startsWith(_layerPath);
  });
}

export const routes = await routerFromPath("./app");

export async function serve(
  request: Request,
  info: Deno.ServeHandlerInfo,
): Promise<Response> {
  Object.assign($fetch, { base: request.url });

  const layer = resolve(request.url, routes);

  if (layer) {
    const mod = (await import(layer.path!)).default as TransportApp;
    // request.url = request.url.replace(layer.route!, "");
    const r = new Request(request.url.replace(layer.route!, ""), request);

    const response = await mod.fetch(r, info);
    // response.headers.set("content-type", "text/event-stream");

    return response;
  }

  return new Response("Not Found\n" + request.url, { status: 404 });
}

const options: Deno.ServeTlsOptions = {
  key: Deno.env.get("KEY"),
  cert: Deno.env.get("CERT"),
  port: Number(Deno.env.get("PORT")) || 8000,
  hostname: Deno.env.get("HOSTNAME") || "0.0.0.0",
};

if (Deno.mainModule) {
  Deno.serve(options, serve);
}

Object.assign(globalThis, { resolve, routerFromPath, routes });
