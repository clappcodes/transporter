import { OutgoingStream } from "../main.transporter.ts";

export default async function fooHandler(request: Request): Promise<Response> {
  const outgoing = new OutgoingStream(request, new TextEncoderStream());

  await outgoing.ready;
  outgoing.write(": Hi dude " + outgoing.id + "\n");

  const id = setInterval(() => {
    outgoing.write("data: " + Date.now() + "\n");
  }, 1000);

  outgoing.closed.then(() => {
    clearInterval(id);
    console.log("Outgoing closed", outgoing.idx);
  });

  return outgoing.response({
    "content-type": "text/event-stream",
  });
}
