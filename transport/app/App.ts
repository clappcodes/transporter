import type { RouteModule } from "./Route.ts";
import { Router } from "./Router.ts";

export type AppOptions = Omit<RouteModule, "method" | "fetch">;

export class App extends Router {}

export function tapp(
  options?: AppOptions,
) {
  return new App(options);
}
