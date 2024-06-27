import Static from "../app/handlers/static.ts";
import { send } from "../transport/app/Methods.ts";
import { App, type ESS } from "../transport/mod.ts";
import type { EventSourceMessage } from "../transporter/ess/EventSourceMessage.ts";
import { EventSourceEncoderStream } from "../transporter/ess/mod.ts";

const dup = (req: Request) => {
  const [s1, s2] = req.body!.tee();
  readable.consume(s1.pipeThrough(transform.decode()), console.log);

  return send(s2);
};

let x = 0;
let n = 0;

export default new App({
  tls: {
    key: Deno.env.get("KEY"),
    cert: Deno.env.get("CERT"),
  },
})
  .use(new Static())
  .use(
    "/dup",
    dup,
  )
  .use("/echo", (req) => send(req.body!))
  .use("/res", () => send.stream(readable.fromTimer(100, () => x++)))
  .use("/plus/:n", async (req) => {
    const [body1, body2] = req.body!.tee();
    for await (const x of body2) console.log("xxx", x);
    readable.consume(body2, console.log);

    return send.stream(
      body1
        .pipeThrough(transform.decode())
        .pipeThrough(transform.map(Number))
        .pipeThrough(transform.tap(console.warn))
        .pipeThrough(transform.map((i) => i + Number(req.params.n || 1)))
        .pipeThrough(transform.map((i) => n = i)),
    );
  })
  .use("/multiply/:n", (req) =>
    send.stream(
      req.body!
        .pipeThrough(transform.decode())
        .pipeThrough(transform.map(Number))
        .pipeThrough(transform.tap(console.warn))
        .pipeThrough(transform.map((i) => i * Number(req.params.n || 1)))
        .pipeThrough(transform.map((i) => n = i)),
    ))
  .use("/sse", () =>
    readable
      .every(500, () => ({ data: String(Date.now()) }))
      .pipeThrough(transform.sse.encoder()))
  .use("/sse2", () => {
    const sse = new EventSourceEncoderStream();
    setInterval(() => sse.write({ data: `Value: ${Date.now()}` }), 500);

    return sse.readable;
  })
  .use("/sse3", () => {
    return readable.from<EventSourceMessage>(async function* () {
      yield { data: "Hi there" };
    }).pipeThrough(transform.sse.encoder());
  })
  .use("/sse4", () => {
    return (new ReadableStream<EventSourceMessage>({
      start(ctrl) {
        ctrl.enqueue({ data: "xxxxx" });
      },
    })).pipeThrough(new EventSourceEncoderStream());
  })
  .use("/sse5", () => {
    const sse = new EventSourceEncoderStream();

    readable.of<EventSourceMessage[]>(
      { data: "msg 1" },
      { data: "msg 2" },
    ).pipeTo(sse.writable);

    return sse.readable;
  })
  .use("/sse6", (req) => {
    const inc = transform.sse.decoder();
    const out = transform.sse.encoder();

    req.body?.pipeTo(inc.writable);

    inc.read((message) => {
      if (message.event === "upper") {
        out.write({
          data: message.data?.toUpperCase(),
          event: "result",
          comment: "from upper",
        });
      } else {
        out.write(message);
      }
    });

    out.write({ event: "welcome", data: "Hello All" });

    return out.readable;
  });
