import "../global.ts";
import { ts2js } from "../.tools/transform.ts";
import { ResponseStream } from "../transport/stream.ts";
var static_default = {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/") {
      return new ResponseStream(
        `<script type="module" src="/global.ts?bundle"></script><script type="module">
            Object.assign(self, 
              await import('./app/sample2.ts'), 
              await import('./transport/api.ts'), 
              (await import('./transport/api.ts')).default
            )
            </script>`,
        {
          headers: {
            "content-type": "html"
          }
        }
      );
    }
    try {
      if (url.pathname.endsWith(".ts")) {
        return new ResponseStream(await ts2js(request.url), {
          headers: {
            "content-type": "application/javascript",
            "cache-control": Deno.env.get("BUNDLE") === "true" ? "no-cache" : "cache"
          }
        });
      }
      if (url.pathname.endsWith(".map")) {
        const file2 = await Deno.open("./.bundle" + url.pathname, {
          read: true
        });
        return new ResponseStream(file2.readable, {
          headers: {
            "content-type": "application/javascript"
          }
        });
      }
      const file = await Deno.open("." + url.pathname, { read: true });
      return new ResponseStream(file.readable, {
        headers: {
          "content-type": url.pathname.endsWith(".js") ? "application/javascript" : url.pathname.endsWith(".json") ? "application/json" : url.pathname.endsWith(".html") ? "text/html" : url.pathname.endsWith(".css") ? "text/css" : "text/plain"
        }
      });
    } catch {
      return;
    }
  }
};
export {
  static_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vYXBwL3N0YXRpYy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFwiLi4vZ2xvYmFsLnRzXCI7XG5pbXBvcnQgeyB0czJqcyB9IGZyb20gXCIuLi8udG9vbHMvdHJhbnNmb3JtLnRzXCI7XG5pbXBvcnQgeyBSZXNwb25zZVN0cmVhbSB9IGZyb20gXCIuLi90cmFuc3BvcnQvc3RyZWFtLnRzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXN5bmMgZmV0Y2gocmVxdWVzdDogUmVxdWVzdCk6IFByb21pc2U8UmVzcG9uc2UgfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHJlcXVlc3QudXJsKTtcblxuICAgIGlmICh1cmwucGF0aG5hbWUgPT09IFwiL1wiKSB7XG4gICAgICByZXR1cm4gbmV3IFJlc3BvbnNlU3RyZWFtKFxuICAgICAgICBgPHNjcmlwdCB0eXBlPVwibW9kdWxlXCIgc3JjPVwiL2dsb2JhbC50cz9idW5kbGVcIj48L3NjcmlwdD5gICtcbiAgICAgICAgICBgPHNjcmlwdCB0eXBlPVwibW9kdWxlXCI+XG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHNlbGYsIFxuICAgICAgICAgICAgICBhd2FpdCBpbXBvcnQoJy4vYXBwL3NhbXBsZTIudHMnKSwgXG4gICAgICAgICAgICAgIGF3YWl0IGltcG9ydCgnLi90cmFuc3BvcnQvYXBpLnRzJyksIFxuICAgICAgICAgICAgICAoYXdhaXQgaW1wb3J0KCcuL3RyYW5zcG9ydC9hcGkudHMnKSkuZGVmYXVsdFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgPC9zY3JpcHQ+YCxcbiAgICAgICAge1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIFwiY29udGVudC10eXBlXCI6IFwiaHRtbFwiLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpZiAodXJsLnBhdGhuYW1lLmVuZHNXaXRoKFwiLnRzXCIpKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2VTdHJlYW0oYXdhaXQgdHMyanMocmVxdWVzdC51cmwpLCB7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCIsXG4gICAgICAgICAgICBcImNhY2hlLWNvbnRyb2xcIjogRGVuby5lbnYuZ2V0KFwiQlVORExFXCIpID09PSBcInRydWVcIlxuICAgICAgICAgICAgICA/IFwibm8tY2FjaGVcIlxuICAgICAgICAgICAgICA6IFwiY2FjaGVcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHVybC5wYXRobmFtZS5lbmRzV2l0aChcIi5tYXBcIikpIHtcbiAgICAgICAgY29uc3QgZmlsZSA9IGF3YWl0IERlbm8ub3BlbihcIi4vLmJ1bmRsZVwiICsgdXJsLnBhdGhuYW1lLCB7XG4gICAgICAgICAgcmVhZDogdHJ1ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZVN0cmVhbShmaWxlLnJlYWRhYmxlLCB7XG4gICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgXCJjb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpbGUgPSBhd2FpdCBEZW5vLm9wZW4oXCIuXCIgKyB1cmwucGF0aG5hbWUsIHsgcmVhZDogdHJ1ZSB9KTtcblxuICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZVN0cmVhbShmaWxlLnJlYWRhYmxlLCB7XG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICBcImNvbnRlbnQtdHlwZVwiOiB1cmwucGF0aG5hbWUuZW5kc1dpdGgoXCIuanNcIilcbiAgICAgICAgICAgID8gXCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0XCJcbiAgICAgICAgICAgIDogdXJsLnBhdGhuYW1lLmVuZHNXaXRoKFwiLmpzb25cIilcbiAgICAgICAgICAgID8gXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIDogdXJsLnBhdGhuYW1lLmVuZHNXaXRoKFwiLmh0bWxcIilcbiAgICAgICAgICAgID8gXCJ0ZXh0L2h0bWxcIlxuICAgICAgICAgICAgOiB1cmwucGF0aG5hbWUuZW5kc1dpdGgoXCIuY3NzXCIpXG4gICAgICAgICAgICA/IFwidGV4dC9jc3NcIlxuICAgICAgICAgICAgOiBcInRleHQvcGxhaW5cIixcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2gge1xuICAgICAgcmV0dXJuO1xuICAgICAgLy8gdGhyb3cgbmV3IFR5cGVFcnJvcihlKTtcbiAgICAgIC8vIHJldHVybiBuZXcgUmVzcG9uc2VTdHJlYW0oZSwgeyBzdGF0dXM6IDQwNCB9KTtcbiAgICB9XG4gIH0sXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIkFBQUEsT0FBTztBQUNQLFNBQVMsYUFBYTtBQUN0QixTQUFTLHNCQUFzQjtBQUUvQixJQUFPLGlCQUFRO0FBQUEsRUFDYixNQUFNLE1BQU0sU0FBaUQ7QUFDM0QsVUFBTSxNQUFNLElBQUksSUFBSSxRQUFRLEdBQUc7QUFFL0IsUUFBSSxJQUFJLGFBQWEsS0FBSztBQUN4QixhQUFPLElBQUk7QUFBQSxRQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFRQTtBQUFBLFVBQ0UsU0FBUztBQUFBLFlBQ1AsZ0JBQWdCO0FBQUEsVUFDbEI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxRQUFJO0FBQ0YsVUFBSSxJQUFJLFNBQVMsU0FBUyxLQUFLLEdBQUc7QUFDaEMsZUFBTyxJQUFJLGVBQWUsTUFBTSxNQUFNLFFBQVEsR0FBRyxHQUFHO0FBQUEsVUFDbEQsU0FBUztBQUFBLFlBQ1AsZ0JBQWdCO0FBQUEsWUFDaEIsaUJBQWlCLEtBQUssSUFBSSxJQUFJLFFBQVEsTUFBTSxTQUN4QyxhQUNBO0FBQUEsVUFDTjtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0g7QUFFQSxVQUFJLElBQUksU0FBUyxTQUFTLE1BQU0sR0FBRztBQUNqQyxjQUFNQSxRQUFPLE1BQU0sS0FBSyxLQUFLLGNBQWMsSUFBSSxVQUFVO0FBQUEsVUFDdkQsTUFBTTtBQUFBLFFBQ1IsQ0FBQztBQUVELGVBQU8sSUFBSSxlQUFlQSxNQUFLLFVBQVU7QUFBQSxVQUN2QyxTQUFTO0FBQUEsWUFDUCxnQkFBZ0I7QUFBQSxVQUNsQjtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0g7QUFFQSxZQUFNLE9BQU8sTUFBTSxLQUFLLEtBQUssTUFBTSxJQUFJLFVBQVUsRUFBRSxNQUFNLEtBQUssQ0FBQztBQUUvRCxhQUFPLElBQUksZUFBZSxLQUFLLFVBQVU7QUFBQSxRQUN2QyxTQUFTO0FBQUEsVUFDUCxnQkFBZ0IsSUFBSSxTQUFTLFNBQVMsS0FBSyxJQUN2QywyQkFDQSxJQUFJLFNBQVMsU0FBUyxPQUFPLElBQzdCLHFCQUNBLElBQUksU0FBUyxTQUFTLE9BQU8sSUFDN0IsY0FDQSxJQUFJLFNBQVMsU0FBUyxNQUFNLElBQzVCLGFBQ0E7QUFBQSxRQUNOO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxRQUFRO0FBQ047QUFBQSxJQUdGO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogWyJmaWxlIl0KfQo=
