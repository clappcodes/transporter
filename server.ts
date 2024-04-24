import { app } from "./app.ts";
import publicHandler from "@/handlers/public.ts";
import { IncomingTextStream, OutgoingTextStream } from "./transporter.ts";

app.use(publicHandler);

app.get("/foo", async (request) => {
  const outgoing = new OutgoingTextStream(request);

  await outgoing.write("Hello from server");

  return outgoing.response({
    "content-type": "text/event-stream",
  });
});

app.post("/bar", async (request) => {
  const incoming = new IncomingTextStream(request);

  for await (const chunk of await incoming.ready) {
    console.log("(server)", chunk);
  }

  return incoming.response();
});

app.serve({ port: 8032 });
