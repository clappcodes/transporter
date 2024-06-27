import type { Route } from "./app/Route.ts";
import { METHOD, type RouteArr, type RouteMethod } from "./RoutesInit.ts";

export async function routerFromPath(root: string | URL) {
  if (typeof globalThis.Deno === "undefined") {
    throw new TypeError(`Not implmented for current environment`);
  }

  const { walk } = await import("jsr:@std/fs@^0.223.0/walk");
  const path = await import("https://deno.land/std@0.224.0/path/mod.ts");

  const routes: RouteArr[] = [];

  try {
    const rootPath = path.resolve(String(root));

    for await (const dirEntry of walk(rootPath, { exts: ["ts"] })) {
      if (dirEntry.isFile) {
        const filenameParts = dirEntry.name.split(".");
        const _filenameExt = filenameParts.pop();

        const hasMethod = filenameParts.length > 1;
        const method = hasMethod
          ? filenameParts.shift()?.toUpperCase() as RouteMethod
          : METHOD.ANY;

        const relPath = dirEntry.path.replace(rootPath, "").split("/");
        const _relPathFilename = relPath.pop();

        let pathname = [...relPath, filenameParts.join(".")].join("/");

        if (pathname.endsWith("/index")) {
          pathname = pathname.replace("index", "");
        }

        // console.log(dirEntry.path, pathname);

        const module: TApp.Serve | undefined = await import(dirEntry.path).then(
          (
            mod,
          ) => mod.default,
        );

        if (typeof module === "undefined") continue;

        routes.push([
          method,
          pathname as Route["path"],
          module.fetch,
          {
            import: dirEntry.path,
            module,
          },
        ]);
      }
    }
  } catch (e) {
    console.warn(e);
    return routes;
  }

  return routes;
}
