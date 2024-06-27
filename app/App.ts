import type { RouteModule } from "./Route.ts";
import { Router } from "./Router.ts";
import { Context } from "./types.ts";

export type AppOptions = Omit<RouteModule, "method" | "fetch">;

export class App<C extends {}> extends Router<Context & C> {}
