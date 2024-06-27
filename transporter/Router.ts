import { colors, delay } from "../utils.ts";
import { BroadcastStream } from "./BroadcastStream.ts";
import { DuplexRequest } from "./DuplexRequest.ts";
import { TransportStream } from "./TransportStream.ts";
import { METHOD, STREAM_ID_KEY } from "./contstants.ts";
import { duplexHandler } from "./duplexHandler.ts";

export type Method =
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "OPTIONS"
  | "PATCH"
  | "*";

export type MethodNames =
  | "get"
  | "head"
  | "post"
  | "put"
  | "delete"
  | "options"
  | "patch"
  | "any";

export interface Context {
  body?: string | object | ReadableStream<Uint8Array>;
  response?: Response;
  route?: Route;
  match?: {
    params: Record<string, string | undefined>;
    path: string;
  };
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

export type HandlerResponse =
  | Response
  | ReadableStream
  | undefined
  | object
  | string
  | null
  | void;

export type RouteHandler = (
  request: Request,
  context: Context,
) => HandlerResponse | Promise<HandlerResponse>;

export type RouterHandler = (
  request: Request,
  context?: Context | object,
) => Response | Promise<Response>;

export type Handler = RouteHandler | Route | Router;

export interface RouteInit {
  method?: Method;
  path?: string;
  handler?: Handler;
}

export interface RouterMethod {
  (...handlers: Handler[]): Router;
  (path: string, ...handlers: Handler[]): Router;
  (path: string[], ...handlers: Handler[]): Router;
}

export interface RouteMethod {
  (
    path: string | RouteInit | RouteHandler,
    init?: RouteInit | RouteHandler,
  ): Route;
}

export class Route {
  method: Method;
  path: string;

  pattern: URLPattern;
  handler: RouteHandler | Router;
  declare basePath: string;

  static create = (method: METHOD): RouteMethod =>
  (
    path: string | RouteInit | RouteHandler,
    init?: RouteInit | RouteHandler,
  ) =>
    path && typeof path !== "string"
      ? new Route(Object.assign(path, { method }))
      : new Route(path, Object.assign(init || {}, { method }));

  static any: RouteMethod = this.create(METHOD.ANY);
  static get: RouteMethod = this.create(METHOD.GET);
  static put: RouteMethod = this.create(METHOD.PUT);
  static post: RouteMethod = this.create(METHOD.POST);
  static head: RouteMethod = this.create(METHOD.HEAD);
  static patch: RouteMethod = this.create(METHOD.PATCH);
  static delete: RouteMethod = this.create(METHOD.DELETE);
  static options: RouteMethod = this.create(METHOD.OPTIONS);

  constructor(
    routeInit?: RouteInit | RouteHandler,
  );
  constructor(
    path?: string,
    routeInit?: RouteInit | RouteHandler,
  );
  constructor(
    path?: string | RouteInit | RouteHandler,
    routeInit?: RouteInit | RouteHandler,
  ) {
    if (typeof path !== "undefined" && typeof path !== "string") {
      routeInit = path;
      path = undefined;
    }

    path = path || "";
    routeInit = routeInit || {};

    if (routeInit instanceof Route) {
      // Route
      const _routeInit = routeInit;
      this.basePath = _routeInit.basePath || "";
      const handler = _routeInit.handler instanceof Router
        ? _routeInit.handler.base(path.replaceAll("/*", ""))
        : _routeInit.handler;

      path = path + _routeInit.path;
      const method = _routeInit.method || "*";

      routeInit = { handler, method };
      //
    } else if (routeInit instanceof Router) {
      // Router
      const _routeInit = routeInit.base(path);
      this.basePath = _routeInit.basePath; //path + (routeInit.basePath || "");
      path = this.basePath ? this.basePath + "/*" : "*";
      const method = "*";
      routeInit = { handler: _routeInit, method };
    } else if (typeof routeInit === "function") {
      // Raw Handler Func
      // @ts-ignore .
      const method = routeInit.method || "*";
      routeInit = { handler: routeInit, method };
    }

    routeInit.handler = routeInit.handler || (() => `Handler Placeholder`);

    this.path = path || "*";
    this.method = routeInit?.method || "*";
    this.handler = routeInit.handler as RouteHandler;
    this.pattern = new URLPattern({ pathname: this.path });
  }

  base(path?: string): Route {
    return new Route(path, this);
  }

  match(request: Request): {
    params: Record<string, string | undefined>;
    path: string;
    route: Route;
  } | null {
    const match = (this.method === "*" || request.method === this.method) &&
      this.pattern.exec(request.url);

    return match
      ? {
        params: match.pathname.groups,
        path: match.pathname.input,
        route: this,
      }
      : null;
  }

  toString(i = ""): string {
    const type = this.handler instanceof Router || this.handler instanceof Route
      ? this.handler.constructor.name
      : this.handler?.name ||
        String(this.handler).split("\n")[0].replace("=> {", "=> { ... }")
          .replace("=>{", "=>{...}");

    const routes = this.handler instanceof Router
      ? colors.magenta(` [${this.handler.stack.length}]`)
      : ``;
    return this.handler instanceof Router || this.handler instanceof Route
      ? [
        i,
        colors.brightBlue(`[${this.method}]`),
        colors.brightBlue(this.path),
        "",
        colors.yellow(type + routes),
      ]
        .join(" ") +
        "\n" +
        this.handler.toString(i + "    ")
      : [
        i,
        colors.white(`[${this.method}]`),
        colors.brightWhite(this.path),
        "",
        colors.gray(colors.italic(type)),
      ].join(
        " ",
      );
  }

  print() {
    console.log(this.toString());
  }
}

export class Router {
  Route = Route;
  Context = Context;

  constructor(public basePath: string = "", public stack: Route[] = []) {
    this.handler = duplexHandler(this.handler.bind(this));
    this.match = this.match.bind(this);
    this.base = this.base.bind(this);
    this.use = this.use.bind(this);
    this.toString = this.toString.bind(this);
  }

  async test(path: string): Promise<string> {
    const res = await this.handler(new DuplexRequest(path));
    return res.text();
  }

  base(path?: string): Router {
    if (path?.includes("*")) {
      throw new TypeError(`Base path contains invalid characters: ${path}`);
    }

    const router = new Router(
      (path || "") + this.basePath,
      this.stack.map((route) => new Route(path, route)),
    );

    return router;
  }

  add = (
    method: METHOD,
    path: string | string[] | Handler,
    handlers: Handler[],
  ): Router => {
    if (
      typeof path === "function" || path instanceof Route ||
      path instanceof Router
    ) {
      handlers = [path, ...handlers];
      path = "";
    }

    const paths = (typeof path === "object" ? [...path] : [path]).map((p) =>
      this.basePath + p
    );

    const prop = method.toLowerCase() as Lowercase<METHOD>;
    const methodFunc = prop === "*" ? Route["any"] : Route[prop];

    for (const path of paths) {
      for (const handler of handlers) {
        this.stack.push(methodFunc(path, handler));
      }
    }

    return this;
  };

  create = (method: METHOD): RouterMethod => (path, ...handlers): Router =>
    this.add(method, path, handlers);

  use: RouterMethod = this.create(METHOD.ANY);
  any: RouterMethod = this.create(METHOD.ANY);
  get: RouterMethod = this.create(METHOD.GET);
  put: RouterMethod = this.create(METHOD.PUT);
  post: RouterMethod = this.create(METHOD.POST);
  head: RouterMethod = this.create(METHOD.HEAD);
  patch: RouterMethod = this.create(METHOD.PATCH);
  delete: RouterMethod = this.create(METHOD.DELETE);
  options: RouterMethod = this.create(METHOD.OPTIONS);

  handler(
    request: Request,
  ): Promise<Response>;

  handler(
    request: Request,
    baseContext: Context,
  ): Promise<Response | undefined>;

  handler(
    request: Request,
    baseContext?: object,
  ): Promise<Response>;

  async handler(
    request: Request,
    baseContext?: Context | object,
  ): Promise<Response | undefined> {
    const hasBase = baseContext instanceof Context;
    const context = this.createContext(request, baseContext);

    try {
      const response = await handle(request, context, this.stack);
      if (response instanceof Response) {
        context.handled.resolve(response);

        return response;
      }

      if (!hasBase) {
        return new Response(`404 - Unhandled Request`, { status: 404 });
      }
    } catch (e) {
      context.handled.reject(e);

      return new Response(`500 - ${e.message}`, { status: 500 });
    }
  }

  createContext(request: Request, context?: Context | object): Context {
    if (context instanceof Context) {
      return context;
    }

    return new Context({
      url: new URL(request.url),
      method: request.method as Method,
      duplexId: request.headers.get(STREAM_ID_KEY),
      headers: new Headers(),
      status: 200,
      params: {},
      routes: [],
      handled: Promise.withResolvers<Response>(),
    });
  }

  async handleEvent(event: FetchEvent): Promise<Response | undefined> {
    const context = this.createContext(event.request);
    const response = await this.handler(event.request, context);
    if (response) {
      event.respondWith(response);
    }

    return response;
  }

  match(
    request: Request,
  ): (
    | { params: Record<string, string | undefined>; path: string; route: Route }
    | null
  )[] {
    return this.stack.map((route) => route.match(request));
  }

  toString(i = ""): string {
    return this.stack.map((route) => route.toString(i)).join("\n");
  }

  print() {
    console.log(this.toString());
  }
}

async function handle(request: Request, context: Context, stack: Route[]) {
  for (const layer of stack) {
    const match = layer.match(request);
    if (match) {
      context.params = match.params;
      context.route = layer;

      const handler = layer.handler instanceof Router
        ? layer.handler.handler!
        : layer.handler!;

      const result = await handler(request, context);

      if (typeof result === "undefined") {
        continue;
      }

      if (result instanceof Response) {
        return result;
      }

      const responseInit = {
        status: context.status,
        headers: context.headers,
      };

      if (
        (result instanceof ReadableStream) ||
        typeof result === "string" ||
        result === null
      ) {
        return new Response(result, responseInit);
      }

      if (typeof result === "object") {
        return Response.json(result, responseInit);
      }
    }
  }
}

route.Route = Route;
route.Router = Router;
route.Context = Context;

export function route(
  path: string | Handler,
  ...handlers: Handler[]
): Router {
  if (typeof path !== "string") {
    handlers = [path, ...handlers];
    path = "";
  }
  return new Router(path).use(...handlers);
}

route.test = async (): Promise<Router> => {
  const app = new Router();
  app.use("*", route.cors(), route.logger());
  app.use("/", () => "Home Page");
  app.use("/delay", () => delay(3000).then(() => "Done"));
  app.use("/about", () => "About Page");
  app.use("/echo", route.broadcastHandler);

  const blog = new Router("/ipress");
  blog.use("/", () => "Blog Home");
  blog.use("/post/:id", (_, ctx) => `Blog Post #${ctx.params.id}`);

  app.use(blog.base("/blog1"));
  app.use("/blog2", blog);

  app.use("/test", (_) => `Testtst`);

  const x = route("").use("/", () => "hi");
  const a = x.base("/a");
  const b = x.base("/b");
  const c = x.base("/c").use("/*", () => "xxc");

  app.use(a.use(b.use(c)));

  const request = new Request("https://localhost/blog1/ipress/");

  const result = await (await app.handler(request)).text();
  console.log(result);
  console.log(app.toString());

  Object.assign(globalThis, { app, blog, route });
  if (typeof Deno !== "undefined") {
    const server = route.serve(app);

    console.log(server);
  }
  return app;
};

route.serve = (
  handler: RouterHandler | Router,
): {} =>
  Deno.serve({
    port: 8001,
    key: Deno.env.get("KEY"),
    cert: Deno.env.get("CERT"),
  }, handler instanceof Router ? handler.handler : handler);

route.handler = (h: Handler): Handler => h;

route.cors = (): Handler =>
  route.handler((_req, ctx) => {
    ctx.headers.set("cache-control", "no-cache");
    ctx.headers.set("access-control-allow-origin", "*");
    ctx.headers.set("access-control-allow-methods", "*");
    ctx.headers.set("access-control-allow-headers", "*");
    ctx.headers.set("access-control-max-age", "100");
    if (_req.method === "OPTIONS") {
      return new Response(null, ctx);
    }
  });

route.broadcastHandler = (): Router =>
  route(
    route.cors(),
    (_, ctx) => {
      ctx.headers.set("content-type", "text/event-stream");
    },
    function broadcastStream(req) {
      const stream = new BroadcastStream();
      req.body?.pipeTo(stream.writable);

      return stream.readable;
    },
  );

// route.broadcastStdIO = () => {
//   const stream = new TransportStream("https://localhost:8001/echo/");

//   Deno.stdin.readable.pipeTo(stream.writable);
//   stream.readable.pipeTo(Deno.stdout.writable);
// };

route.notFound = (): Handler =>
  route.handler((req) =>
    new Response(`404 - Not Found\n${req.method} ${req.url}`, { status: 404 })
  );

route.logger = (tag: string = ""): Handler =>
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

route.test();

// export function handle(
//   request: Request,
//   baseCtx: Context | undefined,
//   routes: Route[],
// ): Promise<Response> {
//   // create context

//   const context = new Context({
//     base: baseCtx instanceof Context ? baseCtx : undefined,
//     url: new URL(request.url),
//     method: request.method as Method,
//     duplexId: request.headers.get(STREAM_ID_KEY),
//     headers: new Headers(baseCtx?.headers),
//     status: baseCtx?.status || 200,
//     params: {},
//     routes: [],
//     handled: Promise.withResolvers<Response>(),
//   });

//   async function res() {
//     // find matched routes
//     for (const layer of routes) {
//       const match = layer.match(request);
//       //  (layer.method === "*" || request.method === layer.method) &&
//       //   layer.pattern.exec(request.url);

//       if (match) {
//         context.routes.push(layer);
//         context.route = layer;
//         context.match = match;
//         context.params = match.params;

//         const result = await layer.handler(request, context);
//         if (typeof result === "undefined") continue;

//         const responseInit = {
//           status: context.status,
//           headers: context.headers,
//         };

//         if (result instanceof Response) {
//           return result;
//         }

//         if (
//           (result instanceof ReadableStream) ||
//           typeof result === "string" ||
//           result === null
//         ) {
//           return new Response(result, responseInit);
//         }

//         if (typeof result === "object") {
//           return Response.json(result, responseInit);
//         }
//       }
//     }

//     return new Response(`404 - Unhandled Request`, { status: 404 });
//   }

//   return res()
//     .then((res) => {
//       context.handled.resolve(res);
//       return context.handled.promise;
//     }).then((res) => {
//       if (context.base) {
//         context.base.handled.resolve(res);
//         return context.base.handled.promise;
//       }
//       return res;
//     });
// }
