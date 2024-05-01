import "./global.ts";
import { App, IncomingTextStream, OutgoingTextStream } from "./mod.dev.ts";
import * as mod from "./mod.dev.ts";

import { fromBody, fromTimer } from "./readable/mod.ts";
import { decode, encode, toString } from "./transform/mod.ts";

import { idKey } from "./utils.ts";

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

const streams = new Map<string, RequestStream>();
const requests = new Map<string, {
  incoming?: Request;
  outgoing?: Request;
}>();

Object.assign(globalThis, { streams, requests });

class RequestStream extends TransformStream<Uint8Array, Uint8Array> {
  get request() {
    return requests.get(this.id);
  }

  get incomingRequest() {
    return this.request?.incoming;
  }

  get outgoingRequest() {
    return this.request?.outgoing;
  }

  constructor(public id: string) {
    super({
      start() {
        console.log("<< Started >>", id);
      },
      transform(chunk, ctrl) {
        console.log("( transform )", id);
        ctrl.enqueue(chunk);
      },
      cancel(reason) {
        console.log("<< Closed >>", id, reason);

        streams.delete(id);
        requests.delete(id);

        return Promise.resolve();
      },
    });
  }
}

const requestStream = (request: Request) => {
  const id = request.headers.get(idKey);

  if (!id) {
    throw new TypeError("Sync Failed: Request header " + idKey + " = " + id);
  }

  if (!streams.has(id)) {
    requests.set(id, {
      incoming: undefined,
      outgoing: undefined,
    });
    streams.set(id, new RequestStream(id));
  }

  const requestPair = requests.get(id)!;
  const requestStream = streams.get(id)!;

  if (
    request.method === "POST" && typeof requestPair.incoming === "undefined"
  ) {
    console.log("(set)( incoming )(request)", id);
    requestPair.incoming = request;
  } else if (
    request.method === "GET" && typeof requestPair.outgoing === "undefined"
  ) {
    console.log("(set)( outgoing )(request)", id);
    requestPair.outgoing = request;
  }

  return requestStream;
};

app.post(
  "/echo",
  async (request) => {
    const api = requestStream(request);
    await request.body?.pipeTo(api.writable);
    return new Response("ok", {
      headers: {
        "stream-id": api.id,
      },
    });
  },
);

app.get("/echo", (request) => {
  const api = requestStream(request);

  return new Response(api.readable, {
    headers: {
      "content-type": "text/event-stream",
    },
  });
});

app.serve({ port: 8033 });

// dev
Object.assign(globalThis, { app, mod });
