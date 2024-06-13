import { mergePath } fr./app/Route.tsls/app.ts";
import { Route } from "./app/Route.ts";
import { METHOD, RouteFetch } from "./RoutesInit.ts";
import type { Context, MergePath, Request } from "./types.ts";

export function route<B extends string>(basePath: `${B}`) {
  const api = Route.factory(basePath);
  //   const api = Route.factory(basePath, { basePath, fetch, request, base });

  //   api.basePath = basePath;

  //   function base<X extends string>(basePath: `${X}`) {
  //     const fullPath = mergePath(api.basePath, basePath) as MergePath<B, X>;
  //     const newApi = route<string>(fullPath);
  //     newApi.routes = newApi.routes.map((r) =>
  //       new Route(r.method, mergePath(fullPath, r.path), r.handler)
  //     ) as Route<METHOD, string, RouteHandler>[];
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
  //       method: request.method as TApp.Context["method"],
  //       responseInit: {},
  //     } as TApp.Context;

  //     Object.assign(request, { context });

  //     return api.fetch(request, context);
  //   }

  //   Object.assign(fetch, { basePath, api });
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

  //           const response = context.responseRaw = await route.handler(
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

  return api; // Object.assign(api, { fetch })
}

const user = route("/user")
  .get(
    "/profile/:id",
    (req) => `User Profile: ${req.params?.id}`,
  );

const blog = route("/blog")
  .get("/", () => `Welcome to my blog!`)
  .get("/about", () => `About my blog`);

const app = route("/app");

app.use(
  "*",
  user.base(app.basePath).get(
    "/profile/:id/settings",
    (req) => `Profile #${req.params.id} settings`,
  ).fetch,
)
  .use("xxxx", blog.base(app.basePath).fetch)
  .use("ddd", Route.create(METHOD.ANY, "/testr", () => "Im route of route"));

app.use(console.log);

globalThis.myApp = app;
globalThis.blog = blog;
globalThis.user = user;

globalThis.route = route;

console.log("{{{{{app}}}}}", app, route);
