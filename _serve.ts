import { colors, isDebug } from "./utils.ts";
import "./global.ts";
import { ts2js } from "./.tools/transform.ts";
import { ResponseStream } from "./transport/TransportStream.ts";

export const handlers = new Map<string, ServeModule>();
Object.assign(globalThis, { ts2js, handlers });

export type ServeModule = {
  fetch(
    request: Request,
    info?: Deno.ServeHandlerInfo,
  ): Response | Promise<Response>;
  path?: string;
  serve?:
    | Deno.ServeTlsOptions
    | (Deno.ServeTlsOptions & Deno.TlsCertifiedKeyOptions);
};

export async function serve(modPath: string) {
  const filePath = modPath.at(0) !== "." && modPath.at(0) !== "/"
    ? "./" + modPath
    : modPath;

  const resolvedPath = import.meta.resolve(filePath);
  const serveModule: ServeModule = (await import(resolvedPath)).default;
  const serveOptions = serveModule.serve;
  serveModule.path = resolvedPath;

  const options = Object.assign({
    key: Deno.env.get("KEY"),
    cert: Deno.env.get("CERT"),
    port: Number(Deno.env.get("PORT")) || 8000,
    hostname: Deno.env.get("HOSTNAME") || "0.0.0.0",
  }, serveOptions);

  serveModule.serve = options;

  const server: Deno.HttpServer<Deno.NetAddr> = Deno.serve(
    options,
    async function onRequest(request, info) {
      if (request.url.endsWith("favicon.ico")) {
        return new Response(null, { status: 404 });
      }
      if (isDebug()) {
        console.log(
          colors.blue(`[${request.method}] `) + colors.gray(request.url),
        );
      }

      const response = await serveModule.fetch(request, info);
      if (response instanceof Response) {
        return response;
      }

      return index(request);
    },
  );

  handlers.set([server.addr.hostname, server.addr.port].join(":"), serveModule);

  return server;
}

if (Deno.mainModule) {
  if (typeof Deno.args.at(0) === "undefined") {
    throw new TypeError("Usage: serve server.ts");
  }

  await serve(Deno.args.at(0)!);
}

export async function index(request: Request): Promise<Response> {
  const url = new URL(request.url);

  if (url.pathname === "/") {
    return new ResponseStream(
      `<script type="module" src="/global.ts?bundle"></script>`,
      {
        headers: {
          "content-type": "html",
        },
      },
    );
  }

  try {
    if (url.pathname.endsWith(".ts")) {
      return new ResponseStream(await ts2js(request.url), {
        headers: {
          "content-type": "application/javascript",
          "cache-control": Deno.env.get("BUNDLE") === "true"
            ? "no-cache"
            : "cache",
        },
      });
    }

    if (url.pathname.endsWith(".map")) {
      const file = await Deno.open("./.bundle" + url.pathname, { read: true });

      return new ResponseStream(file.readable, {
        headers: {
          "content-type": "application/javascript",
        },
      });
    }

    const file = await Deno.open("." + url.pathname, { read: true });

    return new ResponseStream(file.readable, {
      headers: {
        "content-type": url.pathname.endsWith(".js")
          ? "application/javascript"
          : url.pathname.endsWith(".json")
          ? "application/json"
          : url.pathname.endsWith(".html")
          ? "text/html"
          : url.pathname.endsWith(".css")
          ? "text/css"
          : "text/plain",
      },
    });
  } catch (e) {
    return new ResponseStream(e, { status: 404 });
  }
}
