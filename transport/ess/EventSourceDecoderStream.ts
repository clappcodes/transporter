import { PipeStream } from "../PipeStream.ts";
import { EventSourceMessage } from "./EventSourceMessage.ts";
import { createParser } from "./parser.ts";
import type { SSEParser } from "./types.ts";

const textDecoder = new TextDecoder();

export class EventSourceDecoderStream extends PipeStream {
  constructor() {
    const instance = Object.create(null) as {
      controller: TransformStreamDefaultController<EventSourceMessage>;
      parser: SSEParser;
    };

    super(
      {
        transform(chunk, controller) {
          controller.enqueue(
            chunk instanceof Uint8Array ? textDecoder.decode(chunk) : chunk,
          );
        },
      } as Transformer<Uint8Array | string, string>,
      {
        start(controller) {
          Object.assign(instance, {
            controller,
            parser: createParser((message) =>
              instance.controller.enqueue(new EventSourceMessage(message))
            ),
          });
        },
        transform(chunk) {
          instance.parser.push(chunk);
        },
      } as Transformer<string, EventSourceMessage>,
    );
  }
}
