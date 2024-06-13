import { stringify } from "./stringify.ts";
import type { EventSourceMessage } from "./EventSourceMessage.ts";
import { PipeStream } from "../PipeStream.ts";

export class EventSourceEncoderStream extends PipeStream {
  constructor() {
    super(
      {
        transform(message, controller) {
          controller.enqueue(stringify(message));
        },
      } as Transformer<EventSourceMessage, string>,
      new TextEncoderStream(),
    );
  }
}
