import type { Route } from "./app/Route.ts";
import type { Router } from "./app/Router.ts";

export type Context<X extends string = "/"> = {
  base?: string;
  router?: Router;
  url?: URL;
  method?: RequestMethod;
  pattern?: URLPattern;
  handled?: boolean;
  response?: Response;
  responseRaw?: ServeHandlerReturn;
  responseInit: ResponseInit;
  route?: Route;
  match?: URLPatternResult;
  params?: Record<string, unknown>;
  module?: string;
  // TODO: env specific
  info?: Deno.ServeHandlerInfo;
  // [x: string]: unknown;
};

export type RequestHandler<R = Request, C = Context> = (
  request: R,
  context: C,
) => Response | Promise<Response | undefined> | undefined;

export type IOFunction<I, O> = (input: I) => O | Promise<O>;

export type RequestMethod =
  | "OPTIONS"
  | "HEAD"
  | "POST"
  | "GET"
  | "PUT"
  | "PATCH"
  | "DELETE";

export type ServeHandlerReturn =
  | Response
  | ReadableStream
  | TransformStream
  | AsyncGenerator
  | Generator
  | Record<PropertyKey, unknown>
  | unknown[]
  | string
  | undefined
  | void;

export interface Request extends globalThis.Request {
  params: Record<string, unknown>;
  context: Context;
}

export type ServeHandler<R = Request, C = Context> = (
  request: R,
  context: C,
) => ServeHandlerReturn | Promise<ServeHandlerReturn>;

export interface Serve {
  fetch: ServeHandler;
  onRequest?: ServeHandler;
  onResponse?: ServeHandler;
  onError?: Deno.ServeTlsOptions["onError"];
  onListen?: Deno.ServeTlsOptions["onListen"];

  tls?: {
    key?: string;
    cert?: string;
  };

  port?: number;
  hostname?: string;
  // [x: PropertyKey]: unknown;
}

export type MergePath<A extends string, B extends string> = B extends ""
  ? MergePath<A, "/">
  : A extends "" ? B
  : A extends "/" ? B
  : A extends `${infer P}/` ? B extends `/${infer Q}` ? `${P}/${Q}`
    : `${P}/${B}`
  : B extends `/${infer Q}` ? Q extends "" ? A
    : `${A}/${Q}`
  : `${A}/${B}`;
