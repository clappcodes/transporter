import { fetchStream } from "../fetchDuplex.ts";
import {
  EventSourceDecoderStream,
  EventSourceEncoderStream,
  type EventSourceMessage,
} from "./mod.ts";
import { pipeTo } from "../pipeTo.ts";
import { Promised } from "../../utils/Promised.ts";

export class EventSourceStream {
  writable: WritableStream<EventSourceMessage>;
  readable: ReadableStream<EventSourceMessage>;

  finished: Promise<void>;
  closed: Promised<boolean>;

  declare private writer: WritableStreamDefaultWriter<EventSourceMessage>;
  declare response: (init: ResponseInit) => Response;
  body: ReadableStream<Uint8Array>;

  constructor(input: URL | RequestInfo, init?: RequestInit) {
    const sseEncoder = new EventSourceEncoderStream();
    const sseDecoder = new EventSourceDecoderStream();

    this.writable = sseEncoder.writable;
    this.readable = sseDecoder.readable;

    this.body = sseEncoder.readable;

    this.closed = new Promised();

    if (input instanceof Request) {
      console.log("ess input from request");
      this.finished = input.body!.pipeTo(sseDecoder.writable);
      this.response = (init?: ResponseInit) => new Response(this.body, init);
    } else {
      this.finished = fetchStream(input, this.body, init)
        .then(pipeTo(sseDecoder.writable));
    }
  }

  async write(message: EventSourceMessage) {
    this.writer = this.writer || this.writable.getWriter();

    await this.writer.ready;
    await this.writer.write(message);
  }

  async read(cb: (chunk: EventSourceMessage) => void) {
    for await (const chunk of this.readable) {
      await cb(chunk);
    }
  }

  async close() {
    if (this.closed.rejected || this.closed.resolved) {
      throw new TypeError(
        `Already closed: ${
          this.closed.rejected
            ? "rejected"
            : this.closed.resolved
            ? "resolved"
            : "unknown"
        }`,
      );
    }

    this.writer = this.writer || this.writable.getWriter();

    await this.writer.ready;
    await this.writer.close();

    this.closed.resolve(true);
  }
}

// @ts-ignore .
EventSourceStream.demo = () => {
  const ess = new EventSourceStream("/ess-2");

  ess.read(console.log);
  ess.write({
    data: "Demo",
  });

  return ess;
};
