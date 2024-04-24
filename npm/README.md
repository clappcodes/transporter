# @clapp/transporter

### Client

```ts
import {
  IncomingTextStream,
  OutgoingTextStream,
} from "@clappcodes/transporter";

async function receive() {
  const stream = new IncomingTextStream("/foo");

  for await (const chunk of await stream.ready) {
    console.log("(server)", chunk);
  }
}

async function send() {
  const stream = new OutgoingTextStream("/foo");

  await stream.write("Hello from browser");
}
```

### Server

```ts
import {
  IncomingTextStream,
  OutgoingTextStream,
} from "@clappcodes/transporter";

async function receive(request: Request) {
  const stream = new IncomingTextStream(request);

  for await (const chunk of await stream.ready) {
    console.log("(client)", chunk);
  }
}

async function send(request: Request) {
  const stream = new OutgoingTextStream(request);

  stream.write("Hello from server");
  // new Response(stream.readable)
  return stream.response();
}

// pseudo request handlers
app.put("/foo", receive);
app.get("/foo", send);
```
