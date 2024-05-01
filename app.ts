import * as colors from "./colors.ts";
import { getCachedModuleInfo } from "./.tools/mod.ts";
import { existsSync } from "jsr:@std/fs@^0.223.0/exists";
import { isDebug } from "./utils.ts";

console.log(
  colors.green("(app) DEBUG") + "=" + colors.white(String(isDebug())),
);

export type Handler = {
  route: string;
  fetch: (
    request: Request,
    info?: Deno.ServeHandlerInfo,
  ) => Response | Promise<Response | undefined> | undefined;
  method?: "GET" | "POST" | "PUT" | "HEAD" | "OPTIONS" | "DELETE";
};

function notFoundHandler(request: Request): Response {
  return new Response(
    `
    <h1>404 - Not Found!!</h1>
    <code>${request.url}</code>`,
    {
      status: 404,
      headers: {
        "content-type": "text/html",
      },
    },
  );
}

function staticHandler(
  path?: string,
  options?: { index?: string },
): Handler["fetch"] {
  return async function staticHandler(
    request: Request,
  ): Promise<Response | undefined> {
    // @ts-ignore ?
    const url = new URL(request.currentUrl); // , import.meta.url

    path = path || ".";
    options = options || {};
    options.index = options?.index || "index.html";

    // console.log("staticHandler", url.pathname, path, options?.index);

    const headers = {
      "cache-control": "no-cache",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "*",
      "access-control-allow-headers": "*",
      "access-control-max-age": "100",
    };

    const jsHeaders = {
      ...headers,
      "content-type": "application/javascript",
    };

    if (url.pathname === "/") {
      return Deno.readFile(path + "/" + options.index)
        .then((res) => new Response(res))
        .catch((err) => new Response(err));
    } else if (
      url.pathname.endsWith(".ts") ||
      url.pathname.startsWith("/@") ||
      url.pathname.startsWith("/jsr:") ||
      url.pathname.startsWith("/npm:")
    ) {
      // TS transform
      const modUrl = url.pathname.endsWith(".ts")
        ? new URL(path + url.pathname, import.meta.url)
        : import.meta.resolve(url.pathname.slice(1));

      await import(modUrl + "");
      const res = await getCachedModuleInfo(modUrl);

      if (res.emit) {
        const content = await Deno.readFile(res.emit);
        return new Response(content, {
          status: 200,
          headers: jsHeaders,
        });
      }

      return new Response("Module not found: " + modUrl, {
        status: 404,
      });
    } else if (existsSync(path + url.pathname, { isFile: true })) {
      return Deno.readFile(path + url.pathname)
        .then((res) =>
          new Response(res, {
            headers: {
              ...headers,
              "content-type":
                url.pathname.endsWith(".js") || url.pathname.endsWith(".map")
                  ? "application/javascript"
                  : url.pathname.endsWith(".css")
                  ? "text/css"
                  : url.pathname.endsWith(".html")
                  ? "text/html"
                  : url.pathname.endsWith(".json")
                  ? "application/json"
                  : url.pathname.endsWith(".ico")
                  ? "image/x-icon"
                  : "text/plain",
            },
          })
        )
        .catch((err) => new Response(err));
    } else {
      if (url.pathname.endsWith(".ico")) {
        return new Response(":(", {
          status: 404,
        });
      }
    }
  };
}

function createServer(
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
    if (isDebug()) {
      console.log(
        colors.blue(`[${request.method}] `) + colors.gray(request.url),
      );
    }

    return onRequest(request, info);
  });
}

export class App {
  static static = staticHandler;
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
    return this;
  };

  get = (route: Handler["route"], fetch: Handler["fetch"]): App => {
    this.stack.unshift({ route, fetch, method: "GET" });
    return this;
  };

  post = (route: Handler["route"], fetch: Handler["fetch"]): App => {
    this.stack.unshift({ route, fetch, method: "POST" });
    return this;
  };

  fetch = async (
    request: Request,
    info?: Deno.ServeHandlerInfo,
  ): Promise<Response> => {
    const url = new URL(request.url);
    const path = url.pathname; //url.pathname.endsWith("/") ? url.pathname : url.pathname + "/";

    for (const layer of this.stack) {
      if (
        path.startsWith(layer.route) &&
        (!layer.method || layer.method === request.method)
      ) {
        // @ts-ignore ?
        request.currentUrl = request.url.replace(layer.route, "");

        if (isDebug()) {
          console.log(
            // @ts-ignore ?
            colors.yellow("(LAYER)") + " " + request.currentUrl + " " +
              colors.green("MATCH") + " " + path +
              " > " +
              colors.white(layer.route) + " " +
              colors.magenta(layer.fetch.name),
          );
        }

        const res = await Promise.resolve(layer.fetch(request, info));

        if (res instanceof Response) {
          return res;
        }
      }
    }

    return notFoundHandler(request); // new Response(`404 - Not Found\n${url.pathname}`);
  };

  // static = (route: string, path: string, opts: { index?: string } = {}) =>
  //   app.use(route, staticHandler({ path, ...opts }));

  serve = (options?: Partial<Deno.ServeTlsOptions>): Deno.HttpServer =>
    createServer(this.fetch, options);
}

// export const app: App = new App();
