import { colors } from "../utils.ts";
import { STREAM_ID_KEY } from "./contstants.ts";
import { duplexHandler } from "./duplexHandler.ts";

route.handler = (...h: RouteHandler[]): RouteHandler => route.stack(...h);

route.cors = () =>
  route.handler((_req, ctx) => {
    ctx.headers.set("cache-control", "no-cache");
    ctx.headers.set("access-control-allow-origin", "*");
    ctx.headers.set("access-control-allow-methods", "*");
    ctx.headers.set("access-control-allow-headers", "*");
    ctx.headers.set("access-control-max-age", "100");
  }, (req, ctx) => {
    if (req.method === "OPTIONS") {
      return new Response(null, ctx);
    }
  });

route.notFound = () =>
  route.handler((req) =>
    new Response(`404 - Not Found\n${req.method} ${req.url}`, { status: 404 })
  );

route.logger = (tag: string = "") =>
  route.handler((req, ctx) => {
    console.log(
      `${colors.dim(tag)} ${ctx.base ? "----" : "--"} >> [${
        colors.blue(req.method)
      }] ${colors.dim(req.url)} ${
        ctx.duplexId ? colors.bgWhite(ctx.duplexId) : ""
      }`,
    );

    ctx.handled.promise.then((response) => {
      console.log(
        `${colors.dim(tag)} << ${ctx.base ? "----" : "--"} [${
          colors.yellow(req.method)
        }] ${colors.dim(req.url)}`,
        response.headers,
      );
    });
  });

export type HandlerResponse =
  | Response
  | ReadableStream
  | object
  | string
  | null
  | void;

export interface RouteHandler {
  (
    request: Request,
    context: Context,
  ): HandlerResponse | Promise<HandlerResponse>;
}

export interface FetchHandler {
  (request: Request, context?: Context | object): Response | Promise<Response>;
}

export type Method =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "OPTIONS"
  | "PATCH"
  | "*";

export type Route = {
  base: string;
  path: string;
  method: Method;
  handler: RouteHandler;
  pattern: URLPattern;
};

export interface Context {
  body?: string | object | ReadableStream<Uint8Array>;
  response?: Response;
  route?: Route;
  match?: URLPatternComponentResult;
  url: URL;
  status: number;
  headers: Headers;
  params: Record<string, string | undefined>;
  method: Method;
  routes: Route[];
  base?: Context;
  duplexId?: string | null;
  handled: PromiseWithResolvers<Response>;
}

export class Context {
  constructor(init?: Partial<Context>) {
    Object.assign(this, init);
  }
}

export function handle(
  request: Request,
  baseCtx: Context | undefined,
  routes: Route[],
): Promise<Response> {
  // create context

  const context = new Context({
    base: baseCtx instanceof Context ? baseCtx : undefined,
    url: new URL(request.url),
    method: request.method as Method,
    duplexId: request.headers.get(STREAM_ID_KEY),
    headers: new Headers(baseCtx?.headers),
    status: baseCtx?.status || 200,
    params: {},
    routes: [],
    handled: Promise.withResolvers<Response>(),
  });

  async function res() {
    // find matched routes
    for (const layer of routes) {
      const match = (layer.method === "*" || request.method === layer.method) &&
        layer.pattern.exec(request.url);

      if (match) {
        context.routes.push(layer);
        context.route = layer;
        context.match = match.pathname;
        context.params = match.pathname.groups;

        const result = await layer.handler(request, context);
        if (typeof result === "undefined") continue;

        const responseInit = {
          status: context.status,
          headers: context.headers,
        };

        if (result instanceof Response) {
          return result;
        }

        if (
          typeof result === "string" || result instanceof ReadableStream ||
          result === null
        ) {
          return new Response(result, responseInit);
        }

        if (typeof result === "object") {
          return Response.json(result, responseInit);
        }
      }
    }

    return new Response(`404 - Unhandled Request`, { status: 404 });
  }

  return res()
    .then((res) => {
      context.handled.resolve(res);
      return context.handled.promise;
    }).then((res) => {
      if (context.base) {
        context.base.handled.resolve(res);
        return context.base.handled.promise;
      }
      return res;
    });
}

export type RouteApi =
  & FetchHandler
  & {
    routes: Route[];
    //
    base: (path: string) => RouteApi;
    //

    route(method: Method, path: string, handler: RouteHandler): RouteApi;
    route(path: string, handler: RouteHandler): RouteApi;
    route(handler: RouteHandler): RouteApi;
    // route(routes: Route[]): RouteApi;
    // route(): RouteApi;

    use(path: string, ...handlers: RouteHandler[]): RouteApi;
    use(...handlers: RouteHandler[]): RouteApi;

    get: (path: string, handler: RouteHandler) => RouteApi;
    put: (path: string, handler: RouteHandler) => RouteApi;
    head: (path: string, handler: RouteHandler) => RouteApi;
    post: (path: string, handler: RouteHandler) => RouteApi;
    patch: (path: string, handler: RouteHandler) => RouteApi;
    delete: (path: string, handler: RouteHandler) => RouteApi;
    options: (path: string, handler: RouteHandler) => RouteApi;
    //fetch: (request: Request, context?: Context | object) => Promise<Response>;
  };

export function route(): RouteApi;
export function route(routes: Route[]): RouteApi;
export function route(handler: RouteHandler, routes?: Route[]): RouteApi;
export function route(
  path: string,
  handler: RouteHandler,
  routes?: Route[],
): RouteApi;

export function route(
  method: Method,
  path: string,
  handler: RouteHandler,
  routes?: Route[],
): RouteApi;

export function route(
  method?: Method | RouteHandler | RouteApi | string | Route[],
  path?: string | RouteHandler | RouteApi | Route[],
  handler?: RouteHandler | RouteApi | Route[],
  routes?: Route[],
): RouteApi {
  if (
    typeof method === "function" &&
    (typeof path === "undefined" || typeof path === "object")
  ) {
    routes = path || [];
    routes.push({
      base: "/",
      method: "*",
      path: "*",
      handler: method,
      pattern: new URLPattern({ pathname: "*" }),
    });
  } else if (
    typeof method === "string" && typeof path === "function" &&
    typeof handler !== "function"
  ) {
    routes = handler || [];
    handler = path;
    path = method;
    method = "*" as Method;

    if ("routes" in handler) {
      console.log("Handler is sub route", path);
      handler = handler.base(path);
      path = `${path}*`; // mergePath(path, "*");
    }

    routes.push({
      method: method as Method,
      base: "/",
      path,
      handler,
      pattern: new URLPattern({ pathname: path }),
    });
  } else if (
    typeof method === "string" && typeof path === "string" &&
    typeof handler === "function"
  ) {
    routes = routes || [];

    if ("routes" in handler) {
      console.log("Handler is sub route", path);
      handler = handler.base(path);
      path = `${path}*`; // mergePath(path, "*");
    }

    routes.push({
      method: method as Method,
      base: "/",
      path,
      handler,
      pattern: new URLPattern({ pathname: path }),
    });
  } else if (typeof method === "object" || typeof method === "undefined") {
    routes = method || [];
  }

  function base(path: string) {
    routes = routes || [];

    return route(
      routes.map((route) => {
        return {
          ...route,
          base: path,
          pattern: new URLPattern({
            pathname: `${path}${route.path}`, //mergePath(path, route.path),
          }),
        };
      }),
    );
  }

  const fetch = duplexHandler(
    (request: Request, context?: Context | object) => {
      const baseCtx = context instanceof Context ? context : undefined;

      routes = routes || [];

      return handle(request, baseCtx, routes);
    },
  );

  routes = routes || [];

  const api = Object.assign(fetch, {
    routes,
    base,
    route(
      method: Method | RouteHandler | string,
      path?: string | RouteHandler,
      handler?: RouteHandler,
    ) {
      if (typeof method === "function") {
        return route(method, routes);
      } else if (typeof method === "string" && typeof path === "function") {
        return route(method, path, routes);
      } else if (
        typeof method === "string" && typeof path === "string" &&
        typeof handler === "function"
      ) {
        return route(method as Method, path, handler, routes);
      }

      return route(
        method as Method,
        path as string,
        handler as RouteHandler,
        routes,
      );
    },
    // use
    use: (path: string | RouteHandler, ...handlers: RouteHandler[]) =>
      typeof path === "function"
        ? route("*", "*", route.stack(path, ...handlers), routes)
        : route("*", path, route.stack(...handlers), routes),
    // methods
    get: (path: string, handler: RouteHandler) =>
      route("GET", path, handler, routes),
    put: (path: string, handler: RouteHandler) =>
      route("PUT", path, handler, routes),
    head: (path: string, handler: RouteHandler) =>
      route("HEAD", path, handler, routes),
    post: (path: string, handler: RouteHandler) =>
      route("POST", path, handler, routes),
    patch: (path: string, handler: RouteHandler) =>
      route("PATCH", path, handler, routes),
    delete: (path: string, handler: RouteHandler) =>
      route("DELETE", path, handler, routes),
    options: (path: string, handler: RouteHandler) =>
      route("OPTIONS", path, handler, routes),
  });

  return api;
}

route.stack =
  (...handlers: RouteHandler[]): RouteHandler => async (req, ctx) => {
    for (const handler of handlers) {
      const res = await handler(req, ctx);
      if (typeof res !== "undefined") {
        return res;
      }
    }
  };

route.duplex = duplexHandler;
