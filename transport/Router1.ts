// deno-lint-ignore-file
import { delay } from "../utils.ts";
import { Promised } from "../utils/Promised.ts";
import { mergePath } from "../utils/app.ts";
import { Route } from "./app/Route.ts";
import {
  METHOD,
  RouteArr,
  RouteMethod,
  RouterEvents,
  RoutesInit,
} from "./RoutesInit.ts";
import { routerFromPath } from "./routerFromPath.ts";
import type { Context, MergePath, Request } from "./types.ts";

export class Router<
  R extends RoutesInit = [],
  B extends string = "/",
> {
  routes: Route[] = [];
  ready = new Promised<Router<R, B>>();
  #base: `${B}`;
  #events: RouterEvents = {};

  onRequest(listener: RouterEvents["onRequest"]) {
    this.#events.onRequest = listener;
  }

  onMatch(listener: RouterEvents["onMatch"]) {
    this.#events.onMatch = listener;
  }

  onResponse(listener: RouterEvents["onResponse"]) {
    this.#events.onResponse = listener;
  }

  constructor(
    routes: R,
    base: `${B}` = "/" as `${B}`,
  ) {
    this.#base = base as `${B}`;
    this.fetch = this.fetch.bind(this);

    if (routes) {
      this.load(routes);
    }
  }

  private load(routes: RoutesInit) {
    if (typeof routes === "string") {
      routerFromPath(routes)
        .then((routes) => {
          for (const route of routes) {
            this.add(...route);
          }
          this.ready.resolve(this);
          return this;
        });
    } else {
      for (const route of routes) {
        this.add(...route as RouteArr);
      }
      this.ready.resolve(this);
    }

    return this.ready;
  }

  public add<M extends RouteMethod, P extends string, H extends RouteHandler>(
    method: M,
    path: P,
    handler: H,
    meta?: Route["meta"],
  ) {
    const route = new Route(
      method,
      mergePath(this.#base, path) as MergePath<B, P>,
      handler,
      meta,
    );
    this.routes.push(route);

    return this;
  }

  public use<P extends string, H extends RouteHandler | Route>(
    path: P,
    handle: H,
  ) {
    if (handle instanceof Route) {
      const route = handle.route(path);
      this.routes.push(route);

      return route;
    }

    const route = new Route(
      Route.ANY,
      mergePath(this.#base, path) as MergePath<B, P>,
      handle,
    );

    this.routes.push(route);

    return this;
  }

  public base<B extends string>(base: `${B}`) {
    return new Router(this.routes, base);
  }

  async fetch(request: TApp.Request, context: TApp.Context) {
    if (!request.context) {
      request.context = context || {};
    }
    context = context || request.contexfetch; // onRequest
    this.#events?.onRequest &&
      await this.#events?.onRequest?.call(this, request, context);

    for (const route of this.routes) {
      if (route.method === METHOD.ANY || request.method === route.method) {
        const match = route.match(request.url);

        if (match) {
          context.params = match;
          context.route = route;

          // onMatch
          await this.#events?.onMatch?.call(this, request, context);

          const response = context.responseRaw = await route.fetch(
            request,
            context,
          );

          if (typeof response !== "undefined") {
            // onResponse
            await this.#events?.onResponse?.call(this, request, context);

            return response;
          }
        }
      }
    }
  }

  [Symbol.iterator]() {
    return this.routes.map((route) => Array.from(route)).values();
  }
}

// const app = new Router([]).base("/hello-world").add(
//   Route.GET,
//   "/:name?",
//   async function* (req) {
//     yield `Hello, `;
//     await delay(1000);
//     yield req.context.params?.name || `World`;
//   },
// );

// console.log({ app });
// Object.assign(globalThis, { app, Router });
