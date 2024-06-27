import type { NetAddr, Route, RouteModule } from "./Route.ts";
import type { Router } from "./Router.ts";
import type { METHOD } from "./RoutesInit.ts";

export interface Context {
  status?: number;
  headers: Headers;
  base?: string;
  url?: URL;
  method?: METHOD | string;
  router?: Router;
  // pattern?: URLPattern;
  handled?: boolean;
  response?: Response;
  // responseRaw?: ServeHandlerReturn;
  route?: Route;
  // match?: URLPatternResult;
  params?: Record<string, unknown>;
  // module?: string;
  // TODO: env specific
  info?: { remoteAddr: NetAddr };
  // [x: string]: unknown;
}

export class Context {
  base?: string;
  method?: METHOD | string;
  response?: Response;
  route?: Route;
  router?: Router;
  url?: URL;
  handled?: boolean;
  params?: Record<string, unknown>;

  status?: number;
  headers: Headers;

  constructor(init?: Partial<Context>) {
    Object.assign(this, init);
    this.status = init?.status || 200;
    this.headers = new Headers(init?.headers);
  }
}

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
  // | TransformStream
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

export interface Serve extends RouteModule {}

export type MergePath<A extends string, B extends string> = B extends ""
  ? MergePath<A, "/">
  : A extends "" ? B
  : A extends "/" ? B
  : A extends `${infer P}/` ? B extends `/${infer Q}` ? `${P}/${Q}`
    : `${P}/${B}`
  : B extends `/${infer Q}` ? Q extends "" ? A
    : `${A}/${Q}`
  : `${A}/${B}`;
