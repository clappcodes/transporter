import { colors } from "./deps.ts";

export type Handler = {
  route: string;
  fetch: (
    request: Request,
    info?: Deno.ServeHandlerInfo,
  ) => Response | Promise<Response | undefined> | undefined;
  method?: "GET" | "POST" | "PUT" | "HEAD" | "OPTIONS" | "DELETE";
};

console.log(
  colors.green("DEBUG") + "=" + colors.white(Deno.env.get("DEBUG") || "?"!),
);

export function createServer(
  onRequest: (
    request: Request,
    info?: Deno.ServeHandlerInfo,
  ) => Response | Promise<Response>,
  options?: Partial<Deno.ServeTlsOptions>,
): Deno.HttpServer {
  return Deno.serve({
    key: Deno.env.get("HTTPS_KEY"),
    cert: Deno.env.get("HTTPS_CERT"),
    port: Number(Deno.env.get("PORT")) || 8000,
    hostname: Deno.env.get("HOSTNAME") || "localhost",
    onListen({ port, hostname }) {
      const inner = "\n\t" + colors.underline(
        colors.gray(`https://${colors.brightWhite(hostname + ":" + port)}/`),
      ) + "\n";
      const url = inner;

      console.log(colors.green("\n\tServer listening on\n") + url, "\n");
    },
    onError(error) {
      console.log(
        colors.bgRed(colors.brightWhite((error as Error).stack as string)),
      );

      return new Response(String(error), { status: 400 });
    },
    ...options,
  }, function onFetch(request, info) {
    console.log(colors.blue(`[${request.method}] `) + colors.gray(request.url));

    return onRequest(request, info);
  });
}

export class App {
  stack: Handler[] = [];
  use = (
    route: Handler["route"] | Handler["fetch"],
    fetch?: Handler["fetch"],
  ): App => {
    if (typeof route === "function") {
      this.stack.push({ route: "/", fetch: route });
    } else if (typeof fetch === "function") {
      this.stack.push({ route, fetch });
    }
    return app;
  };
  get = (route: Handler["route"], fetch: Handler["fetch"]): App => {
    this.stack.unshift({ route, fetch, method: "GET" });
    return app;
  };
  post = (route: Handler["route"], fetch: Handler["fetch"]): App => {
    this.stack.unshift({ route, fetch, method: "POST" });
    return app;
  };
  fetch = async (
    request: Request,
    info?: Deno.ServeHandlerInfo,
  ): Promise<Response> => {
    const url = new URL(request.url);
    const path = url.pathname.endsWith("/") ? url.pathname : url.pathname + "/";
    for (const layer of this.stack) {
      if (
        path.startsWith(
          layer.route.endsWith("/") ? layer.route : layer.route + "/",
        ) && (!layer.method || layer.method === request.method)
      ) {
        const res = await Promise.resolve(layer.fetch(request, info));
        if (res instanceof Response) {
          return res;
        }
      }
    }

    return new Response(`404 - Not Found\n${url.pathname}`);
  };
  serve = (options?: Partial<Deno.ServeTlsOptions>): Deno.HttpServer =>
    createServer(this.fetch, options);
}

export const app: App = new App();
