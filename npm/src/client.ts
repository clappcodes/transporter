import "./_dnt.polyfills.js";
import { IncomingTextStream, OutgoingTextStream } from "./transporter.js";

export async function sub() {
  const incoming = new IncomingTextStream("/foo");

  for await (const chunk of await incoming.ready) {
    console.log("(browser)", chunk);
  }
}

export async function pub() {
  const outgoing = new OutgoingTextStream("/bar");

  await outgoing.write("Hello from browser");
}

export function test() {
  // @ts-ignore ?
  globalThis.fetch = fetch;

  async function fetch(request: Request) {
    const incoming = new IncomingTextStream(request);

    for await (const chunk of await incoming.ready) {
      console.log("(server)", chunk);
    }

    return incoming.response();
  }

  new OutgoingTextStream("/test").write("Hello World!");
}
