import { TransportStream } from "./TransportStream.ts";
import { readable, transform } from "../mod.ts";

export class TextTransportStream<
  W extends string,
  R extends string,
> extends TransportStream<W, R> {
  static encoder = (): TextEncoderStream => new TextEncoderStream();
  static decoder = (): TextDecoderStream => new TextDecoderStream();
  static headers = {
    "content-type": "text/plain",
    "cache-control": "no-cache",
  };
}

function toUpperCaseStreamHandler(request: Request) {
  return new Response(
    request.body!
      .pipeThrough(TextTransportStream.decoder())
      .pipeThrough(transform.toUpperCase())
      .pipeThrough(TextTransportStream.encoder()),
  );
}

// @ts-ignore .
TextTransportStream.demo = async () => {
  // const ts = new TextTransporter(u);

  // ts.read(console.log);
  // await ts.write("Hello World");

  for await (
    const c of readable.of("Hello", "World")
      .pipeThrough(new TextEncoderStream())
      .pipeThrough(new TransportStream("/upper", toUpperCaseStreamHandler))
      .pipeThrough(new TextDecoderStream())
  ) {
    console.log(c);
  }

  for await (
    const c of readable.of("Hello", "World")
      .pipeThrough(
        new TextTransportStream("/uppercase", toUpperCaseStreamHandler),
      )
  ) {
    console.log(c);
  }

  // return ts;
};
