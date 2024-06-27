import { stringify } from "./stringify.ts";
import type { EventSourceMessage } from "./EventSourceMessage.ts";

export class EventSourceEncoderStream<
  I extends EventSourceMessage,
  O extends string,
> extends TransformStream<I, O> {
  constructor() {
    super(
      {
        transform(message, controller) {
          controller.enqueue(stringify(message) as O);
        },
      },
    );
  }
}
