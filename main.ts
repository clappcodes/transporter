import { App, IncomingTextStream, OutgoingTextStream } from "./mod.dev.ts";
import * as mod from "./mod.dev.ts";
import { decode, encode, fromBody, fromTimer, toString } from "./mod.ts";

const app = new App();
app.use(App.static());

app.post("/demo", async (request) => {
  const stream = new IncomingTextStream(request);
  Object.assign(window, { incoming: stream });

  for await (const chunk of await stream.ready) {
    console.log("(client)", chunk);
  }

  return new Response();
});

app.get("/demo", (request) => {
  const stream = new OutgoingTextStream(request);
  Object.assign(window, { outgoing: stream, write: stream.write.bind(stream) });

  stream.write("Hello from server");

  return new Response(stream.readable, {
    headers: {
      "content-type": "text/event-stream",
    },
  });
});

app.get("/sse", () => {
  const stream = fromTimer(500, Date.now)
    .pipeThrough(toString())
    .pipeThrough(encode());

  return new Response(stream, {
    headers: {
      "content-type": "text/event-stream",
    },
  });
});

app.post("/sse", async (request) => {
  const stream = fromBody(request)
    .pipeThrough(decode());

  for await (const chunk of stream) {
    console.log(chunk);
  }

  return new Response();
});

app.serve({ port: 8033 });

// dev
Object.assign(globalThis, { app, mod });
