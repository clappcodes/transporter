import type { Route } from "./app/Route.ts";
import type { Context, Request, ServeHandlerReturn } from "./types.ts";

export type URLPatternResultParams = { [key: string]: string | undefined };

export enum METHOD {
  GET = "GET",
  HEAD = "HEAD",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  OPTIONS = "OPTIONS",
  PATCH = "PATCH",
  ANY = "ANY",
}

export const METHOD_ARR = Object.entries(METHOD).map(
  ([, value]) => value,
);

export type METHOD_MAP = {
  [M in METHOD]: M;
};

export type RouteFactoryMethods = Lowercase<keyof typeof METHOD>;

export type RouteMethod = METHOD;
// export type RouteHandler = TApp.Handler;

export type RouteFetch<C = {}> = (
  request: Request & C,
  context: Context & C,
) => ServeHandlerReturn | Promise<ServeHandlerReturn>;

export type RouterEvents = {
  onRequest?: RouteFetch;
  onMatch?: RouteFetch;
  onResponse?: RouteFetch;
};

export type RouteArr = [
  Route["method"],
  Route["path"],
  Route["fetch"],
];

export type RoutesInit = Route[] | RouteArr[] | string;
export type RouteMeta = {
  import?: string;
  module?: Partial<TApp.Serve>;
};
