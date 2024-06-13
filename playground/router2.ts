import { Route } from "../transport/app/Route.ts";
import { duplex } from "../transport/handle.ts";
import { delay } from "../utils.ts";

const helloWorld = tapp("/hello-world")
  .use("*", () => {
    console.log("catch-all hw");
  })
  .get("/set-name", () => "Set Name")
  .get(
    "/:name?",
    async function* hello(req) {
      yield `Hello, `;
      await delay(1000);
      yield req.params?.name || `World`;
    },
  );

// helloWorld.routes.at(2)?.path
// helloWorld.routes

const duplexStream = tapp("/x").use(
  duplex((req) =>
    new Response(
      readable.fromTimer(500, Date.now).pipeThrough(transform.toUint8Array()),
    )
  ),
);

export default tapp("/")
  .use((req) => {
    console.log(`req(${req.url})`, req.context);
  })
  .use("/foo", () => "foo")
  .use("/bar", () => "bar")
  .use(helloWorld)
  .use(
    "/duplex",
    duplexStream,
  )
  .use(Route.get("*/favicon.ico", () => {
    return new Response("404 - Not Found", { status: 404 });
  }))
  .use((req) => {
    req.context.responseInit.status = 404;
  })
  .use((req) => [`404 - Not Found\n`, req.url]);
