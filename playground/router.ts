// const router = await transport.Router.fromPath("routes", {
//   onMatch(request) {
//     console.log("onMatch", request.url, [...request.context.route!]);
//   },
//   onResponse(request) {
//     console.log("onResponse", request.context);
//   },
//   onError() {},
//   onListen() {},
// });

import { tapp, type TappOptions } from "../transport/Tapp.ts";

// export default {
//   port: 8001,
//   tls: {
//     key: Deno.env.get("KEY"),
//     cert: Deno.env.get("CERT"),
//   },
//   fetch: router.fetch,
//   onError(err) {
//     console.warn(`(serve:module) error`, err);
//     return new Response(`Error: ${err}`, { status: 500 });
//   },
//   onListen() {
//     console.log(router.routes.map((r) => [...r]));
//   },
// } as TApp.Serve;

const app = tapp({
  routes: "./routes",
  port: 8001,
  tls: {
    key: Deno.env.get("KEY"),
    cert: Deno.env.get("CERT"),
  },
  onError(err) {
    console.warn(`(serve:module) error`, err);
    return new Response(`Error: ${err}`, { status: 500 });
  },
  onListen(x) {
    console.log("onListen", x);
    // console.log(this.routes.map((r) => [...r]));
  },
  onMatch(request) {
    console.log("onMatch", request.url, [...request.context.route!]);
  },
  onResponse(request) {
    console.log("onResponse", request.context);
  },
}, "/root");
// .any("/hi/:name", (req) => `Hello ${req.context.params?.name}!`);

// app.router.ready.then(router => console.log([...router.routes.map((r) => [...r])]));
await app.router.ready;

const opts: TappOptions = {
  routes: [],
  onRequest(r) {
    console.log("onRequest two", r);
  },
  onMatch(x) {
    console.log("onMatch two", x);
  },
};

const one = tapp(opts, "/one");
one.get("/", () => `Hello from app one`);

const two = tapp(opts, "/two");
two.get("/", () => `Hello from app two`);
// two.route("/", one)

const app1 = tapp({ routes: "playground/app1" }, "/app1");
const app2 = tapp({ routes: "playground/app2" }, "/app2");

app.route("/subapp", one);
app.route("/subapp", two);

await app1.router.ready;
await app2.router.ready;

app.route("/apps", app1);
app.route("/apps", app2);

Object.assign(globalThis, { app, one, two, app1, app2 });

console.log([...app.router.routes.map((r) => [...r])]);

export default app;
