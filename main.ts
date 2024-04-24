import { App, IncomingTextStream, OutgoingTextStream } from "./mod.ts";
import * as mod from "./mod.ts";

const app = new App();

app.post("/foo", async (request) => {
  const stream = new IncomingTextStream(request);

  for await (const chunk of await stream.ready) {
    console.log("(client)", chunk);
  }

  return new Response();
});

app.get("/foo", (request) => {
  const stream = new OutgoingTextStream(request);

  stream.write("Hello from server");

  return new Response(stream.readable);
});

app.use(App.static("."));

app.serve({ port: 8033 });

// dev
Object.assign(globalThis, { app, mod });
