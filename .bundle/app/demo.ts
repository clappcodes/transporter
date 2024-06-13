var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import api, { base } from "./api.ts";
import cors from "./cors.ts";
import router from "./router.ts";
import sample from "./sample.ts";
function handle(r) {
  return (fn) => fn(r);
}
__name(handle, "handle");
const apiRoutes = [
  [
    api.any("/test")
  ],
  [api.get("/")],
  [api.post("/edit/:id")],
  [base("https://foo.com/api").get("/posts")]
];
const h1 = handle(api.post("/edit/:id"));
h1((req) => new Response(req.method + " " + req.url));
console.log(apiRoutes);
import * as sample2 from "./sample2.ts";
Object.assign(globalThis, sample2);
var demo_default = {
  serve: typeof Deno !== "undefined" ? {
    key: Deno.env.get("KEY"),
    cert: Deno.env.get("CERT"),
    port: 5050
  } : void 0,
  ...sample,
  ...router,
  ...cors
};
export {
  apiRoutes,
  demo_default as default,
  handle
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vYXBwL2RlbW8udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBhcGksIHsgYmFzZSwgWFJlcXVlc3QgfSBmcm9tIFwiLi9hcGkudHNcIjtcbmltcG9ydCBjb3JzIGZyb20gXCIuL2NvcnMudHNcIjtcbmltcG9ydCByb3V0ZXIgZnJvbSBcIi4vcm91dGVyLnRzXCI7XG5pbXBvcnQgc2FtcGxlIGZyb20gXCIuL3NhbXBsZS50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gaGFuZGxlPFQ+KHI6IFQpIHtcbiAgcmV0dXJuIChmbjogKHJlcXVlc3Q6IFQpID0+IFJlc3BvbnNlKSA9PiBmbihyKTtcbn1cblxuZXhwb3J0IGNvbnN0IGFwaVJvdXRlcyA9IFtcbiAgW1xuICAgIGFwaS5hbnkoXCIvdGVzdFwiKSxcbiAgXSxcbiAgW2FwaS5nZXQoXCIvXCIpXSxcbiAgW2FwaS5wb3N0KFwiL2VkaXQvOmlkXCIpXSxcbiAgW2Jhc2UoXCJodHRwczovL2Zvby5jb20vYXBpXCIpLmdldChcIi9wb3N0c1wiKV0sXG5dO1xuXG5jb25zdCBoMSA9IGhhbmRsZShhcGkucG9zdChcIi9lZGl0LzppZFwiKSk7XG5cbmgxKChyZXEpID0+IG5ldyBSZXNwb25zZShyZXEubWV0aG9kICsgXCIgXCIgKyByZXEudXJsKSk7XG5cbmNvbnNvbGUubG9nKGFwaVJvdXRlcyk7XG5cbmltcG9ydCAqIGFzIHNhbXBsZTIgZnJvbSBcIi4vc2FtcGxlMi50c1wiO1xuT2JqZWN0LmFzc2lnbihnbG9iYWxUaGlzLCBzYW1wbGUyKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzZXJ2ZTogdHlwZW9mIERlbm8gIT09IFwidW5kZWZpbmVkXCJcbiAgICA/IHtcbiAgICAgIGtleTogRGVuby5lbnYuZ2V0KFwiS0VZXCIpLFxuICAgICAgY2VydDogRGVuby5lbnYuZ2V0KFwiQ0VSVFwiKSxcbiAgICAgIHBvcnQ6IDUwNTAsXG4gICAgfVxuICAgIDogdW5kZWZpbmVkLFxuICAuLi5zYW1wbGUsXG4gIC4uLnJvdXRlcixcbiAgLi4uY29ycyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUFBLE9BQU8sT0FBTyxZQUFzQjtBQUNwQyxPQUFPLFVBQVU7QUFDakIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sWUFBWTtBQUVaLFNBQVMsT0FBVSxHQUFNO0FBQzlCLFNBQU8sQ0FBQyxPQUFpQyxHQUFHLENBQUM7QUFDL0M7QUFGZ0I7QUFJVCxNQUFNLFlBQVk7QUFBQSxFQUN2QjtBQUFBLElBQ0UsSUFBSSxJQUFJLE9BQU87QUFBQSxFQUNqQjtBQUFBLEVBQ0EsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDO0FBQUEsRUFDYixDQUFDLElBQUksS0FBSyxXQUFXLENBQUM7QUFBQSxFQUN0QixDQUFDLEtBQUsscUJBQXFCLEVBQUUsSUFBSSxRQUFRLENBQUM7QUFDNUM7QUFFQSxNQUFNLEtBQUssT0FBTyxJQUFJLEtBQUssV0FBVyxDQUFDO0FBRXZDLEdBQUcsQ0FBQyxRQUFRLElBQUksU0FBUyxJQUFJLFNBQVMsTUFBTSxJQUFJLEdBQUcsQ0FBQztBQUVwRCxRQUFRLElBQUksU0FBUztBQUVyQixZQUFZLGFBQWE7QUFDekIsT0FBTyxPQUFPLFlBQVksT0FBTztBQUVqQyxJQUFPLGVBQVE7QUFBQSxFQUNiLE9BQU8sT0FBTyxTQUFTLGNBQ25CO0FBQUEsSUFDQSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUs7QUFBQSxJQUN2QixNQUFNLEtBQUssSUFBSSxJQUFJLE1BQU07QUFBQSxJQUN6QixNQUFNO0FBQUEsRUFDUixJQUNFO0FBQUEsRUFDSixHQUFHO0FBQUEsRUFDSCxHQUFHO0FBQUEsRUFDSCxHQUFHO0FBQ0w7IiwKICAibmFtZXMiOiBbXQp9Cg==
