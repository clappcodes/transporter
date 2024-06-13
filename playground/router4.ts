import { JSONTransporter, TextTransportStream } from "../transport/mod.ts";
import {
  RequestTransformerStream,
  Transporter,
} from "../transport/Transporter.ts";
import { DevApp } from "../transport/app/DevApp.ts";
import {
  EventSourceDecoderStream,
  EventSourceEncoderStream,
  EventSourceMessage,
} from "../transport/ess/mod.ts";
import { decode, encode } from "../transport/ess/utils.ts";
import { PipeStream } from "../transport/PipeStream.ts";
import { useCors } from "./useCors.ts";
import { TextTransporter } from "../transport/TextTransporter.ts";
import { EventSourceTransporter } from "../transport/EventSourceTransporter.ts";

export default new DevApp()
  .use("/ess-1", (request) => {
    // const ess = new EventSourceStream(req);

    const essDecoder = new EventSourceDecoderStream();
    const essEncoder = new EventSourceEncoderStream();

    request.body?.pipeTo(essDecoder.writable);
    essDecoder.readable
      .pipeThrough(transform.map((message) => {
        return ({
          data: message.data?.toUpperCase(),
          event: "res-" + (message.event || "message"),
        });
      }))
      .pipeTo(essEncoder.writable);

    return essEncoder.readable;
  })
  .use("/ess-2", (request) => {
    return new TextTransportStream(request, {
      transform(chunk, ctrl) {
        ctrl.enqueue(String(
          new EventSourceMessage(chunk, (message) => ({
            data: message.data?.toUpperCase(),
            comment: "@TextTransportStream",
          })),
        ));
      },
    });
  })
  .use("/upper", (request) =>
    new Transporter(request, [{
      transform(chunk, ctrl) {
        const str = decode(chunk) as string;
        const res = str.toUpperCase();

        ctrl.enqueue(encode(res));
      },
    }], {
      headers: {
        xxxx: "xxxxx",
      },
    }))
  .use(
    "/upper2",
    (req) =>
      new PipeStream(
        transform.decode(),
        new Transporter(req),
        transform.upperCase(),
        transform.encode(),
      ),
  )
  .use("/upper3", (req) =>
    new TextTransporter(req, [
      transform.upperCase(),
      {
        transform(chunk, ctrl) {
          if (chunk === "HI") {
            ctrl.enqueue("Wazzup dude?");
          } else {
            ctrl.enqueue(chunk);
          }
        },
      },
      transform.tap(console.log),
    ]))
  .use("est-1", (req) =>
    new EventSourceTransporter(req, [
      transform.map((m) => ({
        ...m,
        comment: "at EventSourceTransporter",
      })),
      transform.tap(console.log),
    ]))
  .use("/json-1", (req) =>
    new JSONTransporter(req, [
      transform.map((o) => Object.assign(o, { xkey: new Date() })),
      transform.tap(console.log),
    ]))
  .use("/json-chat", (req) => {
    const reqTS = JSONTransporter.decoder<{ uid: string; msg: string }>();
    const resTS = JSONTransporter.encoder<{ uid: string; msg: string }>();

    console.log("json-chat -req", req);

    const request = new RequestTransformerStream(req, reqTS);
    console.log("json-chat -RequestStream", request);

    // globalThis._req = request;
    // const readable = reqTS.readable;
    // const read = reqTS.read.bind(reqTS);

    // const writable = resTS.writable;
    const write = resTS.write.bind(resTS);

    // req.body?.pipeTo(reqTS.writable);

    // readable.pipeTo(writable);

    // request.pipeTo(resTS.writable);

    request.read((o) => {
      console.log(`read`, o);
      if (o.uid === "xxx") {
        write({ uid: "deno", msg: `Wazzup "${o.uid}"?` });
      }
    });

    write({ uid: "deno", msg: "Hi" });

    return new Response(resTS.readable);
  })
  .use("pipe1", (await import("./pipe1.ts")).default);
