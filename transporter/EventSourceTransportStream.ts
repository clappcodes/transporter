import {
  EventSourceDecoderStream,
  EventSourceEncoderStream,
  type EventSourceMessage,
} from "./ess/mod.ts";
import { PipeStream } from "./PipeStream.ts";
import { TransportStream } from "./TransportStream.ts";
import { transform } from "../mod.ts";

export * from "./ess/mod.ts";

export class EventSourceTransportStream
  extends TransportStream<EventSourceMessage, EventSourceMessage> {
  static encoder = (): PipeStream<EventSourceMessage, Uint8Array> =>
    new PipeStream<EventSourceMessage, Uint8Array>(
      new EventSourceEncoderStream(),
      new TextEncoderStream(),
    );
  static decoder = (): PipeStream<Uint8Array, EventSourceMessage> =>
    new PipeStream<Uint8Array, EventSourceMessage>(
      new TextDecoderStream(),
      new EventSourceDecoderStream(),
    );

  static headers: HeadersInit = {
    "content-type": "text/event-stream",
    "cache-control": "no-cache",
  };
}

export class EventSourceResponse extends Response {
  constructor(body: ReadableStream<EventSourceMessage>, init?: ResponseInit) {
    super(
      body
        .pipeThrough(new EventSourceEncoderStream())
        .pipeThrough(new TextEncoderStream()),
      init,
    );
    this.headers.set("content-type", "text/event-stream");
    this.headers.set("cache-control", "no-cache");
  }
}

function eventSourceStreamHandler(request: Request) {
  return new Response(
    request.body!
      .pipeThrough(EventSourceTransportStream.decoder())
      .pipeThrough(
        transform.map((m) => ({
          ...m,
          comment: "Duplexxx",
        })),
      )
      .pipeThrough(EventSourceTransportStream.encoder()),
  );
}

// @ts-ignore .
EventSourceTransportStream.demo = () => {
  const ess = new EventSourceTransportStream("/ess", eventSourceStreamHandler);

  ess.read(console.log);

  ess.write({ data: "hi es" });

  return ess;
};
