import type { RequestMethod } from "../types.ts";
import { Promised } from "../utils/Promised.ts";

export type RequestHandlerRoute =
  | string
  | Readonly<URLPatternInit & { method?: RequestMethod }>;

export type RequestHandlerFetch = (
  request: Request,
  context: Context,
) => Response | Promise<Response>;

export type RequestHandlerInit = {
  route: RequestHandlerRoute;
  fetch: RequestHandlerFetch;
};

export class Env {
  get isDeno() {
    // @ts-ignore .
    return typeof globalThis.Deno !== "undefined";
  }
  get isBun() {
    // @ts-ignore .
    return typeof globalThis.Bun !== "undefined";
  }
  get isBrowser() {
    return typeof globalThis.document !== "undefined";
  }
  constructor(init?: Record<string, string | number | boolean>) {
    return Object.assign(this, init ?? {});
  }
}

export type ContextInit = {
  env?: Record<string, string | number | boolean>;
  info?: Deno.ServeHandlerInfo;
  match?: URLPatternResult;
};

export class Context {
  url: URL;
  env: Env;
  info?: Deno.ServeHandlerInfo;
  error?: Error;
  layers: RequestHandler[] = [];
  #request: Request;
  #response: Response | Promise<Response> | undefined;
  declare match: URLPatternResult | null;

  get request() {
    return this.#request;
  }
  get response() {
    return this.#response;
  }

  constructor(request: Request, init?: ContextInit) {
    this.#request = request;

    this.url = new URL(request.url);
    this.env = new Env(init?.env);

    this.info = init?.info;
  }
}

export class RequestHandler<
  R extends RequestHandlerRoute,
  F extends RequestHandlerFetch,
> {
  #pattern: URLPattern;
  #method: string;

  canHandle(request: Request) {
    return this.#pattern.test(request.url);
  }

  handle(request: Request, context: Context) {
    const match = this.#pattern.exec(request.url);

    if (match) {
      context = context || new Context(request, { match });
      return this.fetch(request, context);
    }
  }

  setRoute(route: R) {
    this.#pattern = new URLPattern(route);
    return this;
  }

  setMethod(method: RequestMethod) {
    this.#method = method;
    return this;
  }

  constructor(
    public route: R,
    public fetch: F,
  ) {
    this.#pattern = new URLPattern(route);
  }
}

export function defineRequestHandler(
  route: RequestHandlerRoute,
  fetch: RequestHandlerFetch,
) {
  return new RequestHandler(route, fetch);
}

export function route<I extends URLPatternInput>(
  route: I,
  fetch: RequestHandlerFetch,
) {
  const pattern = new URLPattern(
    typeof route === "string" ? { pathname: route } : route,
  );
  return {
    get pattern() {
      return pattern;
    },
    route: route as `${I extends string ? I : "<URLPatternInit>"}`,
    fetch(request: Request, context: Context) {
      context = context || new Context(request);
      return ((context.match = pattern.exec(request.url)) &&
        fetch(request, context)) ?? undefined;
    },
  };
}

export function method<T extends RequestMethod>(
  method: T,
  fetch: RequestHandlerFetch,
) {
  return {
    get method() {
      return method;
    },
    fetch: ((req: Request, ctx: Context) => {
      if (req.method.toLowerCase() === method) {
        const res = fetch(req, ctx);
        console.log(req.method.toLowerCase(), method, res);

        return res;
      }
    }),
  };
}

// export const hello = route(
//   "/hello",
//   (request) => new Response(`Hello ${request.url}`),
// );
