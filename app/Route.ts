// deno-lint-ignore-file no-explicit-any
import { colors } from "../utils.ts";
import { mergePath } from "../utils/app.ts";
import { METHOD, type RouteFetch, type RouteMethod } from "./RoutesInit.ts";
import { duplexHandler } from "../transporter/duplexHandler.ts";
import { Context, type ServeHandlerReturn } from "./types.ts";
import { transform } from "../mod.ts";

export interface NetAddr {
  transport: "tcp" | "udp";
  hostname: string;
  port: number;
}

export interface RouteModule {
  path?: string;
  method?: string | METHOD;

  fetch: RouteFetch;

  onError?: ((error: unknown) => Response | Promise<Response>) | undefined;
  onListen?: ((localAddr: NetAddr) => void) | undefined;

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

  static from(module: RouteModule): Route<METHOD, string, RouteFetch> {
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
    // @ts-ignore .
    this.fetch = duplexHandler(fetch);

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

  route<B extends string>(path: B): this & { path: `${B}/${P}` } {
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
  ):
    | string
    | void
    | Response
    | unknown[]
    | ReadableStream<any>
    | TransformStream<any, any>
    | AsyncGenerator<unknown, any, unknown>
    | Generator<unknown, any, unknown>
    | Record<PropertyKey, unknown>
    | Promise<ServeHandlerReturn> {
    if (input instanceof Request) {
      if (init !== undefined) {
        input = new Request(input, init);
      }

      return this.fetch(input, new Context());
    }

    input = input.toString();
    const path = /^https?:\/\//.test(input)
      ? input
      : `http://localhost${mergePath("/", input)}`;

    init = init || {};
    init.method = init.method || this.method;
    const match = init.method === this.method && this.match(init.method, path);

    if (match) {
      const request = new Request(path, init);

      return this.fetch(request, new Context({ params: match }));
    }
  }
}
