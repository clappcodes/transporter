import { app } from "@/app.ts";
import { IncomingTextStream, OutgoingTextStream } from "../transporter.ts";

app.get("/foo", async (request) => {
  const outgoing = new OutgoingTextStream(request);

  await outgoing.write("Hello from server");

  return outgoing.response();
});

app.post("/bar", async (request) => {
  const incoming = new IncomingTextStream(request);

  for await (const chunk of await incoming.ready) {
    console.log("(server)", chunk);
  }

  return incoming.response();
});
