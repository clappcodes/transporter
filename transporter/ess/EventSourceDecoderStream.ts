import { EventSourceMessage } from "./EventSourceMessage.ts";
import { createParser } from "./parser.ts";
import type { SSEParser } from "./types.ts";

export class EventSourceDecoderStream<
  I extends string,
  O extends EventSourceMessage,
> extends TransformStream<I, O> {
  constructor() {
    const instance = Object.create(null) as {
      controller: TransformStreamDefaultController<O>;
      parser: SSEParser<O>;
    };

    super(
      {
        start(controller) {
          Object.assign(instance, {
            controller,
            parser: createParser((message) =>
              instance.controller.enqueue(new EventSourceMessage(message) as O)
            ),
          });
        },
        transform(chunk) {
          instance.parser.push(chunk);
        },
      } as Transformer<I, O>,
    );
  }
}
