import { mergePath } from "../utils/app.ts";
import { METHOD, RouteArr } from "./RoutesInit.ts";
import { Route } from "./app/Route.ts";
import { Router } from "./Router1.ts";
import { type RouterEvents, RoutesInit } from "./RoutesInit.ts";
import type { Context, MergePath, Request, ServeHandler } from "./types.ts";

export interface TappOptions extends RouterEvents, Partial<TApp.Serve> {
  routes?: RoutesInit;
}

export class Tapp<
  T extends TappOptions = TappOptions,
  Base extends string = "/",
> implements TApp.Serve {
  port?: number | undefined;
  hostname?: string | undefined;
  tls?: { key?: string | undefined; cert?: string | undefined } | undefined;
  onError?: ((error: unknown) => Response | Promise<Response>) | undefined;
  onListen?: ((localAddr: Deno.NetAddr) => void) | undefined;
  onRequest?: ServeHandler<Request, Context> | undefined;
  onResponse?: ServeHandler<Request, Context> | undefined;
  router: Router;
  fetch: ServeHandler<Request, Context>;

  #base: string;
  #options: T;

  #add(method: METHOD, path: string, handler: TApp.Handler) {
    this.router.add(method, path as "/", handler);
    return this;
  }

  #create(method: METHOD) {
    const x = <P extends "/">(path: P, handler: TApp.Handler) =>
      this.#add(method, path, handler);
    Object.defineProperty(x, "name", { value: method.toLowerCase() });

    return x;
  }

  delete = this.#create(METHOD.DELETE);
  get = this.#create(METHOD.GET);
  head = this.#create(METHOD.HEAD);
  options = this.#create(METHOD.OPTIONS);
  patch = this.#create(METHOD.PATCH);
  post = this.#create(METHOD.POST);
  put = this.#create(METHOD.PUT);
  any = this.#create(METHOD.ANY);

  constructor(_options: T = {} as T, base?: Base) {
    const { onRequest, onMatch, onResponse, routes, ..._restOpts } = _options;
    const routerEvents = { onRequest, onMatch, onResponse };

    this.#options = _options;
    this.#base = base || "/";

    this.router = new Router(routes, base);
    Object.assign(this.router, routerEvents);

    this.fetch = this.router.fetch;

    Object.assign(this, _restOpts);
  }

  get routes() {
    return this.router.routes; //.map((r) => Array.from(r) as RouteArr);
  }

  set routes(routes: Route[]) {
    this.router.routes = routes;
    // routes.map((r) => this.router.add(...r));

    return;
  }

  #clone(): Tapp<T, Base> {
    const clone = new Tapp<T, Base>();
    clone.routes = this.routes;
    return clone;
  }

  base<SubPath extends string>(
    path: SubPath,
  ): Tapp<T, MergePath<Base, SubPath>> {
    const app = this.#clone();
    app.#base = mergePath(this.#base, path);
    app.router.base(app.#base);

    return app;
  }

  route<
    SubPath extends string,
    SubOptions extends TappOptions,
    SubBasePath extends string,
  >(
    path: SubPath,
    app: Tapp<SubOptions, SubBasePath>,
  ): Tapp<T, Base> {
    const subApp = this.base(path);

    if (!app) {
      return subApp;
    }

    for (const route of app.routes) {
      subApp.#add(route.method, route.path, route.fetch);
    }

    return this;
  }

  request(input: URL | RequestInfo, init?: RequestInit | undefined) {
    if (input instanceof Request) {
      if (init !== undefined) {
        input = new Request(input, init) as TApp.Request;
      }

      const context = {
        url: new URL(input.url),
        method: input.method as TApp.Context["method"],
        responseInit: {},
      } as TApp.Context;

      Object.assign(input, { context });

      return this.fetch(input as TApp.Request, context);
    }

    input = input.toString();
    const path = /^https?:\/\//.test(input)
      ? input
      : `http://localhost${mergePath("/", input)}`;
    const request = new Request(path, init) as TApp.Request;

    const context = {
      url: new URL(request.url),
      method: request.method as TApp.Context["method"],
      responseInit: {},
    } as TApp.Context;

    Object.assign(request, { context });

    return this.fetch(request, context);
  }
}

export function tapp<T extends TappOptions = {}, B extends string = "/">(
  options?: T,
  base?: B,
) {
  const app = new Tapp(options, base);

  return app;
}

// const app = tapp({}, '/root')

// app.base('/xxx').base("/dd")
