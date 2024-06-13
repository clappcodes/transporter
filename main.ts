import "./global.ts";
import { App, IncomingTextStream, OutgoingTextStream } from "./mod.dev.ts";
import * as mod from "./mod.dev.ts";
//
import { idKey } from "./utils.ts";
import { Promised } from "./utils/Promised.ts";
import { from, fromBody, fromTimer } from "./readable/mod.ts";
import { decode, encode, log, map, pipe, toString } from "./transform/mod.ts";
import { response } from "./writable/mod.ts";
import { subscribe } from "./writable/subscribe.ts";
import { readable, transform, writable } from "./mod.ts";

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
  id: string;
  incoming?: Request;
  outgoing?: Request;
  promise: Promised<Response>;
}>();

Object.assign(globalThis, { streams, requests });

class RequestStream extends TransformStream<Uint8Array, Uint8Array> {
  promise: Promised<Response | Promise<Response>>;
  get request() {
    return requests.get(this.id);
  }

  // get incomingRequest() {
  //   return this.request?.incoming;
  // }

  // get outgoingRequest() {
  //   return this.request?.outgoing;
  // }

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

    this.promise = new Promised<Response | Promise<Response>>();
  }
}

const requestStream = (request: Request) => {
  const id = request.headers.get(idKey);

  if (!id) {
    throw new TypeError("Sync Failed: Request header " + idKey + " = " + id);
  }

  if (!requests.has(id)) {
    requests.set(id, {
      id,
      promise: new Promised<Response>(),
      incoming: undefined,
      outgoing: undefined,
    });

    // streams.set(id, new RequestStream(id));
  }

  const requestPair = requests.get(id)!;
  // const requestStream = streams.get(id)!;

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

  return requestPair;
};

// app.post(
//   "/echo-old",
//   async (request) => {
//     const api = requestStream(request);

//     if (request.body) {
//       await request.body
//         .pipeThrough(decode())
//         .pipeThrough(map((val) => "data: " + val + "\n\n"))
//         .pipeThrough(encode())
//         .pipeTo(api.writable);
//     }

//     return new Response("ok", {
//       headers: {
//         "stream-id": api.id,
//       },
//     });
//   },
// );

// app.get("/echo-old", (request) => {
//   const api = requestStream(request);

//   return new Response(api.readable, {
//     headers: {
//       "content-type": "text/event-stream",
//     },
//   });
// });

type Fetch = (request: Request) => Promise<Response>;

// function fetchStream(fn: Fetch) {
//   return (request: Request): Response | Promise<Response> => {
//     const { id, promise } = requestStream(request);

//     console.log(`fetch #${id} ${request.method}`);

//     // const response = await fn(new Request(request, {
//     //   body: readable
//     // }))

//     // const headers = {
//     //   [idKey]: id,
//     //   "content-type": "text/event-stream",
//     // };

//     // const promise = new DeferredPromise<Response | Promise<Response>>();

//     switch (request.method) {
//       case "GET": {
//         console.log("case GET/ return deffered promise", promise);

//         return promise.then((r) => {
//           console.log("promise.r", r);
//           return r;
//         }); //then(fromBody).then(pipe(decode()).pipe(log("z")).pipe(encode()));

//         // return response

//         // return new Response(readable, {
//         //   headers,
//         // });
//       }

//       case "POST": {
//         const response = fn(request)
//           .then((response) => {
//             response.headers.set(idKey, id);
//             response.headers.set("content-type", "text/event-stream");

//             return response;
//           });

//         return response
//           .then((res) => {
//             console.log("case POST/ response-before", res);
//             return res;
//           })
//           .then(promise.resolve)
//           .then(() => {
//             console.log("case POST/ response-end");

//             return new Response();
//           });

//         // await request.body!.pipeTo(writable);

//         return new Response();
//       }
//     }

//     return new Response(`Unknown transport method: ${request.method}`, {
//       status: 400,
//     });
//   };
// }

let postRequest: Request | undefined = undefined;
let postResponse: Promised<Response> | undefined = undefined;

const headers = {
  "cache-control": "no-cache",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "*",
  "access-control-allow-headers": "*",
  "access-control-max-age": "100",
  // sse
  "content-type": "text/event-stream",
};

const duplexHandler = async (
  request: Request,
  info?: Deno.ServeHandlerInfo,
) => {
  const id = request.headers.get(idKey);

  console.log(
    request.method + " " + request.url + " #id=" + id,
  );

  request.signal.addEventListener("abort", () => {
    console.log(
      request.method + " " + request.url + " Response finished",
      String(request.signal.reason),
    );
    if (request.method === "GET") {
      postResponse?.resolve(new Response("Wazzup", { headers }));
    }
  });

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 200, headers });
  }

  if (request.method === "POST") {
    postRequest = request;
    postResponse = new Promised<Response>();

    return postResponse;
  }

  return new Response(
    postRequest?.body?.pipeThrough(transform.decode()).pipeThrough(
      transform.map((val) => "data: " + val + "\n\n"),
    ).pipeThrough(transform.encode()),
    { headers },
  );
};

Object.assign(globalThis, { duplexHandler, postRequest });

app.use(
  "/echo",
  duplexHandler,
);

app.serve({ port: 8033 });

// dev
Object.assign(globalThis, { app, mod });
