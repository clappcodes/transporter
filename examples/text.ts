import { IncomingTextStream, OutgoingTextStream } from "../transporter.ts";

export async function textStream() {
  const incoming = new IncomingTextStream("/foo");
  const outgoing = new OutgoingTextStream("/foo");

  await outgoing.write("Hello, from browser");

  for await (const chunk of await incoming.ready) {
    console.log("(server)", chunk);
  }
}
