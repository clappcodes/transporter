import { colors } from "../../utils.ts";
import { mergePath } from "../../utils/app.ts";
import { METHOD } from "../RoutesInit.ts";
import type { RouteFetch, RouteMethod } from "../RoutesInit.ts";
import { duplex } from "../handle.ts";
import type { Context, Request, RequestHandler } from "../types.ts";

export interface RouteModule {
  path?: string;
  method?: string | METHOD;
  fetch: RouteFetch;

  onError?: Deno.ServeTlsOptions["onError"];
  onListen?: Deno.ServeTlsOptions["onListen"];

  //
  onRequest?: RouteFetch;
  onResponse?: RouteFetch;

  tls?: {
    key?: string;
    cert?: string;
  };

  port?: number;
  hostname?: string;
}

export class Route<
  M extends RouteMethod = RouteMethod,
  P extends string = string,
  F extends RouteFetch = RouteFetch,
> {
  static ANY: METHOD.ANY = METHOD.ANY;
  static GET: METHOD.GET = METHOD.GET;
  static POST: METHOD.POST = METHOD.POST;
  static PUT: METHOD.PUT = METHOD.PUT;
  static PATCH: METHOD.PATCH = METHOD.PATCH;
  static DELETE: METHOD.DELETE = METHOD.DELETE;
  static OPTIONS: METHOD.OPTIONS = METHOD.OPTIONS;
  static HEAD: METHOD.HEAD = METHOD.HEAD;

  method: METHOD;
  path: string | P;
  fetch: F;

  static from(module: RouteModule) {
    const { path, method, fetch, ...options } = module;
    return new this(
      (method || Route.ANY) as METHOD,
      path || "*",
      fetch,
      options,
    );
  }

  declare options: Omit<RouteModule, "method" | "path" | "fetch">;

  constructor(
    method: M,
    path: P,
    fetch: F,
    options?: Omit<RouteModule, "method" | "path" | "fetch">,
  ) {
    this.method = method || METHOD.ANY;
    this.path = path || "*";
    this.fetch = duplex(fetch as RequestHandler, fetch as RequestHandler) as F;

    if (options) {
      this.options = options;
    }
  }

  private get [Symbol.toStringTag]() {
    return `[${this.method}] ${this.path}`;
  }

  private toString() {
    return `[${this.method}] ${this.path}`;
  }

  private [Symbol.iterator]() {
    return [this.method, this.path, this.fetch].values();
  }

  route<B extends string>(path: B) {
    const instance = Reflect.construct(
      this.constructor,
      [],
      this.constructor,
    ) as typeof this;

    const result = Object.assign(instance, { ...this }, {
      path: mergePath(path, this.path) as `${B}/${P}`,
    });

    console.log("instance", path, result);

    return result;
  }

  match(
    method: METHOD,
    input: string,
    base?: string,
  ): Record<string, unknown> | undefined {
    const baseURL = /^https?:\/\//.test(input) ? undefined : `http://localhost`;

    const res = new URLPattern({
      pathname: mergePath(base || "", this.path),
    }).exec(input, baseURL)?.pathname.groups;

    if (res) {
      console.log(
        `${colors.brightWhite(this.method.toLowerCase())}(${
          colors.yellow(base || "")
        }${colors.green(this.path)})  [${colors.cyan(method)}] ${
          colors.brightBlue(new URL(input).pathname)
        }`,
      );
    }
    // console.log([...this]);

    return res;
  }

  request(
    input: URL | RequestInfo,
    init?: RequestInit | undefined,
  ) {
    if (input instanceof Request) {
      if (init !== undefined) {
        input = new Request(input, init) as Request;
      }

      const context = {
        url: new URL(input.url),
        method: input.method as METHOD,
        responseInit: {},
      } as Context;

      Object.assign(input, { context });

      return this.fetch(input as Request, context);
    }

    input = input.toString();
    const path = /^https?:\/\//.test(input)
      ? input
      : `http://localhost${mergePath("/", input)}`;

    init = init || {};
    init.method = init.method || this.method;
    const match = init.method === this.method && this.match(init.method, path);

    if (match) {
      const request = new Request(path, init) as Request;

      const context = {
        url: new URL(request.url),
        method: request.method as METHOD,
        params: match,
        responseInit: {},
      } as Context;

      Object.assign(request, { context });

      const response = this.fetch(request, context);
      if (response instanceof ReadableStream) {
        return new Response(response.pipeThrough(transform.toUint8Array()));
      }

      if (response instanceof Response) {
        return response;
      }

      if (response) {
        return new Response(response as any);
      }
    }
  }
}

// static create<
// M extends RouteMethod,
// P extends string,
// H extends RouteFetch | Route,
// >(
// method: M,
// path: RoutePath<P>,
// handle: H,
// meta?: RouteMeta,
// ): H extends Route ? Route<H["method"], MergePath<P, H["path"]>, H["fetch"]>
// : H extends RouteFetch ? Route<M, P, H>
// : unknown {
// if (handle instanceof Route) {
//   // @ts-ignore .
//   return handle.route(path);
// }
// // @ts-ignore .
// return new Route(method, path, handle, meta);
// }

// static any<P extends string = `/`, H extends RouteFetch = RouteFetch>(
//   path: P,
//   handler: H,
// ): Route<METHOD.ANY, P, H> {
//   return new Route(Route.ANY, path, handler);
// }

// static get<P extends string = `/`, H extends RouteFetch = RouteFetch>(
//   path: P,
//   handler: H,
// ): Route<METHOD.GET, P, H> {
//   return new Route(Route.GET, path, handler);
// }

// static factory<B extends string>(
//   basePath: `${B}` = `/` as `${B}`,
//   // extend?: X,
// ) {
//   const routes: Array<Route> = [];

//   function base<X extends string>(basePath: `${X}`) {
//     const newPath = mergePath(basePath, api.basePath) as `${MergePath<X, B>}`; //as MergePath<B, X>;
//     const newApi = Route.factory(newPath);

//     routes.forEach(({ method, path, fetch }) => {
//       newApi.use(new Route(method, mergePath(newPath, path), fetch));
//     });

//     return newApi;
//   }

//   function request<X = B>(
//     input: URL | RequestInfo,
//     init?: RequestInit | undefined,
//   ) {
//     if (input instanceof Request) {
//       if (init !== undefined) {
//         input = new Request(input, init) as Request;
//       }

//       const context = {
//         url: new URL(input.url),
//         method: input.method as Context["method"],
//         responseInit: {},
//       } as TApp.Context;

//       Object.assign(input, { context });

//       return api.fetch(input as Request, context);
//     }

//     input = input.toString();
//     const path = /^https?:\/\//.test(input)
//       ? input
//       : `http://localhost${mergePath("/", input)}`;
//     const request = new Request(path, init) as TApp.Request;

//     const context = {
//       url: new URL(request.url),
//       method: request.method as Context["method"],
//       responseInit: {},
//     } as TApp.Context;

//     Object.assign(request, { context });

//     return api.fetch(request, context);
//   }

//   // Object.assign(fetch, { basePath, api });
//   async function fetch<X = B>(request: Request, context: Context) {
//     request.context = request.context || context ||
//       Object.create({
//         constructor: function Context() {
//           console.log("Context croe", this);
//         },
//       });
//     context = request.context;

//     for (const route of api.routes) {
//       if (route.method === METHOD.ANY || request.method === route.method) {
//         const match = route.match(request.url);

//         if (match) {
//           context.params = request.params = match;
//           context.route = route;

//           const response = context.responseRaw = await route.fetch(
//             request,
//             context,
//           );

//           if (typeof response !== "undefined") {
//             return response;
//           }
//         }
//       }
//     }
//   }

//   function use<P extends string, H extends RouteFetch | Route>(
//     path: P | H,
//     handle?: H,
//   ) {
//     if (typeof path === "string" && handle) {
//       const route = (handle instanceof Route)
//         ? handle.route(mergePath(basePath, path))
//         : new Route(
//           Route.ANY,
//           basePath ? mergePath(basePath, path) as MergePath<B, P> : path,
//           handle,
//         );

//       routes.push(route);
//     } else if (!handle && typeof path !== "string") {
//       handle = path;
//       if (handle instanceof Route) {
//         routes.push(handle.route(mergePath(basePath, "*")));
//       } else {
//         routes.push(new Route(METHOD.ANY, mergePath(basePath, "*"), handle));
//       }
//     }

//     return api;
//   }

//   type RouteApi<B extends string> =
//     & { basePath: `${B}` }
//     & {
//       [M in METHOD as Lowercase<M>]: <
//         X extends B = B,
//         P extends string = ``,
//         F extends RouteFetch = RouteFetch,
//       >(
//         path: P,
//         fetch: F,
//       ) => RouteApi<X>; // Route<METHOD_MAP[M], MergePath<B, P>, H>;
//     }
//     & {
//       get routes(): Array<Route>;
//       basePath: typeof basePath;
//       fetch: typeof fetch;
//       request: typeof request;
//       base: typeof base;

//       use<X extends B = B, F extends Route = Route>(
//         route: F,
//       ): RouteApi<X>; // Route<METHOD.ANY, MergePath<B, H["path"]>, H["handler"]>;

//       use<X extends B = B, H extends RouteFetch = RouteFetch>(
//         handle: H,
//       ): RouteApi<X>; // Route<METHOD.ANY, MergePath<B, "/*">, H>;
//       use<
//         X extends B = B,
//         P extends string = string,
//         H extends RouteFetch | Route = RouteFetch,
//       >(
//         path: P,
//         handle: H,
//       ): RouteApi<X>;
//     };

//   const api: RouteApi<B> = Object.create(Object.assign({
//     routes,
//     use,
//     fetch,
//     request,
//     base,
//     basePath,
//   }));

//   const methods = Object.keys(METHOD) as [(keyof typeof METHOD)];

//   for (const key of methods) {
//     Object.assign(api, {
//       [key.toLowerCase()]: function <
//         P extends string,
//         H extends RouteFetch,
//       >(
//         path: P,
//         handler: H,
//       ) {
//         if (typeof path === "undefined") {
//           throw new TypeError(
//             `Method "${key.toLowerCase()}" require at least one argument`,
//           );
//         }
//         const route = new Route(
//           METHOD[key],
//           basePath ? mergePath(basePath, path) as MergePath<B, P> : path,
//           handler,
//         );

//         routes.push(route);

//         return api;
//       },
//     });
//   }

//   return api;
// }

// static use<P extends string, H extends RouteFetch | Route>(
//   path: P,
//   handle: H,
// ): H extends RouteFetch ? Route<METHOD.ANY, P, H>
//   : H extends Route ? Route<H["method"], MergePath<P, H["path"]>, H["fetch"]>
//   : never {
//   const route = (handle instanceof Route)
//     ? handle.route(path as `/${P}`)
//     : new Route(
//       Route.ANY,
//       path,
//       handle,
//     );
//   // @ts-ignore .
//   return route;
// }

// #pattern?: URLPattern;
