// import { readable, transform, transport } from "../mod.ts";
// import { duplex, STREAM_ID_KEY } from "../transport/handle.ts";
// import { Router } from "../transport/router.ts";
// import _static from "../app/static.ts";
// import "../global.ts";
// import { STREAM_TYPE_KEY } from "../transport/mod.ts";

// Object.assign(globalThis, transport);

// const { get, post, patch, any, fetch, routes } = new Router([], {
//   onRequest(request, context) {
//     if (request.url.endsWith("/echo")) {
//       console.log(
//         "onRequest",
//         request.method,
//         request.url,
//         request,
//         request.headers.get(STREAM_ID_KEY),
//         request.headers.get("stream-x"),
//       );
//     }
//   },
//   //   onMatch(request, context) {
//   //     if (request.url.endsWith("/echo")) {
//   //       console.log("onMatch", request.method, request.url, context.route);
//   //     }
//   //   },
//   onResponse(request, context) {
//     if (request.url.endsWith("/echo")) {
//       console.log(
//         "onResponse",
//         request.method,
//         request.url,
//         request,
//         request.headers.get(STREAM_ID_KEY),
//         request.headers.get("stream-x"),
//         context.response.status,
//         context.response.body,
//       );
//     }
//   },
// });

// get("/home", () => new Response("Home"));
// get("/foo", (req) => new Response(req.url));

// post(
//   "/bar",
//   duplex((req) =>
//     new Response(
//       readable.fromTimer(1000, () => "hello\n").pipeThrough(transform.encode()),
//     )
//   ),
// );

// post(
//   "/echo",
//   duplex((req, ctx) =>
//     new Response(req.body, {
//       headers: {
//         "stream-r": req.headers.get(STREAM_TYPE_KEY) || "?",
//       },
//     })
//   ),
// );

// get("/*", _static.fetch);

// any(
//   "*",
//   (req) =>
//     new Response(
//       req.method === "HEAD" ? null : `Not Found | [${req.method}] ${req.url}`,
//       { status: 404 },
//     ),
// );

// export default {
//   fetch: fetch,

//   port: 5050,

//   tls: {
//     key: Deno.env.get("KEY"),
//     cert: Deno.env.get("CERT"),
//   },
// };
