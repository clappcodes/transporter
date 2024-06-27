import { PipeStream } from "./PipeStream.ts";
import { TransportStream } from "./TransportStream.ts";
import { STREAM_ID_KEY } from "./contstants.ts";
import { duplexHandler } from "./duplexHandler.ts";

const EOL = "\n";

export class JSONEncoderStream<
  I extends object,
  O extends string,
> extends TransformStream<I, O> {
  constructor() {
    super({
      transform(chunk, controller) {
        try {
          controller.enqueue(JSON.stringify(chunk) + EOL as O);
        } catch { /** err */ }
      },
    });
  }
}

export class JSONDecoderStream<
  I extends string = string,
  O extends object = object,
> extends TransformStream<I, O> {
  constructor() {
    super({
      transform(chunk, controller) {
        let runningText = "";
        const objects = chunk.split(EOL);
        for (const obj of objects) {
          try {
            runningText += obj;
            const result = JSON.parse(runningText);
            controller.enqueue(result);
            runningText = "";
          } catch (_e) {
            // Not a valid JSON object
          }
        }
      },
    });
  }
}

export class JSONTransportStream extends TransportStream<object, object> {
  static encoder<I extends object, O extends Uint8Array>(): PipeStream<I, O> {
    return new PipeStream<I, O>(
      new JSONEncoderStream(),
      new TextEncoderStream(),
    );
  }
  static decoder<I extends Uint8Array, O extends object>(): PipeStream<I, O> {
    return new PipeStream<I, O>(
      new TextDecoderStream(),
      new JSONDecoderStream(),
    );
  }
  static headers: HeadersInit = {
    "content-type": "text/event-stream",
    "cache-control": "no-cache",
  };
}

const jsonStreamHandler = duplexHandler((request) =>
  new Response(
    request.body?.pipeThrough(
      new PipeStream(
        new TextDecoderStream(),
        new JSONDecoderStream(),
        new TransformStream<object, object>({
          transform(chunk, ctrl) {
            ctrl.enqueue({
              ...chunk,
              url: request.url,
              id: request.headers.get(STREAM_ID_KEY),
            });
          },
        }),
        new JSONEncoderStream(),
        new TextEncoderStream(),
      ),
    ),
  )
);

const jsonStreamHandler2 = duplexHandler((request) =>
  new Response(
    request.body!
      .pipeThrough(JSONTransportStream.decoder())
      .pipeThrough(
        new TransformStream<object, object>({
          transform(chunk, ctrl) {
            ctrl.enqueue({
              ...chunk,
              url: request.url,
              id: request.headers.get(STREAM_ID_KEY)!,
            });
          },
        }),
      )
      .pipeThrough(JSONTransportStream.encoder()),
  )
);

// @ts-ignore .
JSONTransportStream.demo = () => {
  const ts = new JSONTransportStream("/json", jsonStreamHandler2);
  ts.read(console.log);

  ts.write({ uid: "serebano", msg: "Anybody here?" });

  return ts;
};
