import { resolve } from "https://deno.land/std@0.224.0/path/resolve.ts";
import { ts2js } from "../../.tools/transform.ts";
import { send } from "../../transport/mod.ts";
import { METHOD } from "../../transporter/contstants.ts";

export default class Static {
  method = METHOD.GET;

  constructor(public root: string = Deno.cwd()) {
    this.fetch = this.fetch.bind(this);
  }

  async fetch(request: Request): Promise<Response | undefined> {
    const url = new URL(request.url);
    // console.log("Static", this.root, url + "");
    if (url.pathname === "/") {
      return send.html(
        `<script type="module" src="/global.ts?bundle"></script>`,
      );
    }

    try {
      if (url.pathname.endsWith(".ts")) {
        return new Response(await ts2js(request.url), {
          headers: {
            "content-type": "application/javascript",
            "cache-control": Deno.env.get("BUNDLE") === "true"
              ? "no-cache"
              : "cache",
          },
        });
      }

      if (url.pathname.endsWith(".map")) {
        const filePath = resolve(this.root, "./.bundle", "." + url.pathname);
        console.log("Static", filePath);

        const file = await Deno.open(
          filePath,
          {
            read: true,
          },
        );

        return send.js(file.readable);
      }

      const f = resolve(this.root, "." + url.pathname);
      const file = await Deno.open(f, {
        read: true,
      });

      return new Response(file.readable, {
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
    } catch {
      return;
      // throw new TypeError(e);
      // return new ResponseStream(e, { status: 404 });
    }
  }
}
