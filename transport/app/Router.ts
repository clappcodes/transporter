import { mergePath } from "../../utils/app.ts";
import { Route, RouteModule } from "./Route.ts";
import { METHOD, type RouteFetch } from "../RoutesInit.ts";
import type { Context, MergePath, Request } from "../types.ts";
import { colors } from "../../utils.ts";

type Options = Omit<RouteModule, "method" | "fetch">;

export class Router<
  O extends Options = Options,
  P extends string & O["path"] = `${O["path"]}`,
> extends Route {
  routes: Route[] = [];

  constructor(
    options?: Omit<RouteModule, "method" | "fetch">,
  ) {
    const { path = "/", ...rest } = options || {};
    super(
      METHOD.ANY,
      path,
      (req) => this.#fetch(req, req.context),
      rest,
    );
  }

  base<B extends string>(path: B) {
    const mergedPath = mergePath(path, this.path) as `${MergePath<B, P>}`;
    const router = new Router({ ...this.options, path: mergedPath });

    for (const route of this.routes) {
      router.use(route);
    }

    return router;
  }

  request(
    input: URL | RequestInfo,
    init?: RequestInit | undefined,
  ) {
    if (input instanceof Request) {
      if (init !== undefined) {
        input = new Request(input, init) as Request;
      }

      const context = {
        url: new URL(input.url),
        method: input.method as METHOD,
        responseInit: {},
      } as Context;

      Object.assign(input, { context });

      return this.fetch(input as Request, context);
    }

    input = input.toString();
    const path = /^https?:\/\//.test(input)
      ? input
      : `http://localhost${mergePath("/", input)}`;
    const request = new Request(path, init) as Request;

    const context = {
      url: new URL(request.url),
      method: request.method as METHOD,
      responseInit: {},
    } as Context;

    Object.assign(request, { context });

    return this.fetch(request, context);
  }

  async #fetch(request: Request, context: Context) {
    request.context = request.context || context || Object.create(null);
    context = request.context;
    context.base = mergePath(context.base || "", context.router?.path || "");

    context.router = this;

    for (const route of this.routes) {
      if (route.method === METHOD.ANY || request.method === route.method) {
        const match = route.match(
          request.method as METHOD,
          request.url,
          mergePath(context.base || "", this.path),
        );

        if (match) {
          context.params = request.params = match;
          context.route = route;

          const response = context.responseRaw = await route.fetch(
            request,
            context,
          );

          if (typeof response !== "undefined") {
            return response;
          }
        }
      }
    }
  }

  use<X extends P = P, R extends Route | RouteModule = Route>(
    route: R,
  ): Router<O, X>;

  use<X extends P = P, F extends RouteFetch = RouteFetch>(
    fetch: F,
  ): Router<O, X>;

  // use<
  //   X extends P = P,
  //   Path extends string = string,
  //   H extends RouteFetch | Route = RouteFetch,
  // >(
  //   path: Path,
  //   handle: H,
  // ): Router<MergePath<X, Path>>;

  use<
    X extends P = P,
    Path extends string = string,
    H extends (RouteFetch | RouteModule | Route)[] = RouteFetch[],
  >(
    path: Path,
    ...handlers: H
  ): Router<O, X>;

  use<
    X extends P = P,
    H extends (RouteFetch | RouteModule | Route)[] = RouteFetch[],
  >(
    ...handlers: H
  ): Router<O, X>;

  use<X extends string, H extends RouteFetch | RouteModule | Route>(
    path: X | H,
    handle?: H,
  ) {
    if (typeof path === "string" && handle) {
      const route = (handle instanceof Router)
        ? handle.base(path)
        : (handle instanceof Route)
        ? handle.route(path)
        : typeof handle === "function"
        ? new Route(
          Route.ANY,
          path,
          handle,
        )
        : new Route(
          handle.method as METHOD || METHOD.ANY,
          handle.path || "*",
          handle.fetch,
        );

      this.routes.push(route);
    } else if (typeof path !== "string") {
      const handlers = Array.from(arguments) as H[];
      for (const handle of handlers) {
        // handle = path;
        if (handle instanceof Route) {
          this.routes.push(handle);
        } else {
          this.routes.push(
            typeof handle === "function"
              ? new Route(METHOD.ANY, "*", handle)
              : new Route(
                handle.method as METHOD || METHOD.ANY,
                handle.path || "*",
                handle.fetch,
              ),
          );
        }
      }
    }

    return this;
  }

  get<X extends string, H extends RouteFetch | Route>(
    path: X,
    handle: H,
  ): Router<O, P> {
    if (handle instanceof Route) {
      this.routes.push(handle.route(path));
    } else {
      this.routes.push(new Route(Route.GET, path, handle));
    }
    return this;
  }

  match(
    input: string,
    base?: string | undefined,
  ): Record<string, unknown> | undefined {
    const baseURL = /^https?:\/\//.test(input) ? undefined : `http://localhost`;

    // const res = this.#pattern.exec(input, baseURL)?.pathname.groups;
    const match = new URLPattern({
      pathname: mergePath(base || "", this.path, "/*"),
    }).exec(input, baseURL)?.pathname.groups;

    const ident = "\n     @ ";
    console.log(
      `${ident}${colors.blue(this.constructor.name)}( [${
        colors.gray(base || "/")
      }${colors.blue(this.path)}] ).match( ${input} ) =>`,
      match,
    );
    return match;
  }
}

// const logger = <T extends string>(tag: T): RouteFetch =>
//   function logger(req) {
//     console.log(
//       `(${tag})`,
//       req.url,
//       req.params,
//       //   "\n",
//       //   req.context.router,
//     );
//   };

// const user = new Router("/user")
//   .get("/", () => "User Home")
//   .get("/:id", (req) => `User id=${req.params.id}`)
//   .use(
//     "/x",
//     new Router("/posts").get(
//       "/:post_id",
//       (req) => "User Post " + req.url,
//     ),
//   )
//   .use("/y", new Route(Route.ANY, "/test", () => "y test"));

// const blog = new Router("/blog")
//   //   .use(logger("blog"))
//   .use(user)
//   .get("/posts", () => "Blog Posts")
//   .get("/post/:id", (req) => "Blog Post #" + req.params.id)
//   .use(user.base("/admin"));
// // .use();

// const app = new Router("/test")
//   .use(logger("test"))
//   .use("/about1", () => "Hola")
//   //   .base("/xxx")
//   .use("/about2", () => "Hola");
// //   .use("xx", blog);

// // const res = await blog.request("/test/xx/blog/posts");

// console.log("res", await blog.request("/blog/admin/user/y/test"));
