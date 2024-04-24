// import { transpile } from "https://deno.land/x/emit@0.38.2/mod.ts";
// import * as esbuild from "npm:esbuild@0.20.2";
// import { denoPlugins } from "jsr:@luca/esbuild-deno-loader@^0.10.3";
import { getCachedModuleInfo } from "../tools/mod.ts";

export default async function publicHandler(
  request: Request,
): Promise<Response | undefined> {
  const url = new URL(request.url, import.meta.url);

  const jsHeaders = {
    "cache-control": "no-cache",
    "content-type": "application/javascript",
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "*",
    "access-control-allow-headers": "*",
    "access-control-max-age": "100",
  };

  if (url.pathname === "/") {
    return Deno.readFile("./index.html")
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
      ? new URL(".." + url.pathname, import.meta.url)
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

    // const specifier = url.pathname.startsWith("/@")
    //   ? url.pathname.slice(1)
    //   : "." + url.pathname;

    // const resolvedUrl = import.meta.resolve(specifier);
    // // const resolvedUrl2 = import.meta.resolve(resolvedUrl);
    // const resolvedUrl2 = resolvedUrl.replace("jsr:", "https://jsr.io/");
    // console.log("resolvedUrl", {
    //   path: url.pathname,
    //   specifier,
    //   resolvedUrl,
    //   resolvedUrl2,
    // });

    // const modCode = url.pathname.startsWith("/@")
    //   ? await fetch(resolvedUrl2).then((res) => res.text())
    //   : await Deno.readFile(new URL(".." + url.pathname, import.meta.url));

    // // const modCode = await Deno.readFile(modUrl);

    // const result = await esbuild.transform(modCode, {
    //   format: "esm",
    //   loader: "ts",
    // });

    // console.log("ESB", modUrl + "", !!result.code);

    // esbuild.stop();

    // return new Response(result.code, {
    //   status: 200,
    //   headers: jsHeaders,
    // });
  } else if (url.pathname.endsWith(".js") || url.pathname.endsWith(".map")) {
    return Deno.readFile("." + url.pathname)
      .then((res) => new Response(res, { headers: jsHeaders }))
      .catch((err) => new Response(err));
  } else {
    if (url.pathname.endsWith(".ico")) {
      return new Response(":(", {
        status: 404,
      });
    }
  }
}
