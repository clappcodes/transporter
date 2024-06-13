import { OutgoingStream } from "./OutgoingStream.ts";
import { IncomingStream } from "./IncomingStream.ts";

export class IncomingTextStream extends IncomingStream {
  constructor(
    input: URL | RequestInfo,
    transformers: [...TransformStream[]] = [],
  ) {
    super(
      input,
      [
        new TextDecoderStream(),
        ...transformers,
      ],
    );
  }
}

export class OutgoingTextStream extends OutgoingStream {
  constructor(
    input: URL | RequestInfo,
    transformers: [...TransformStream[]] = [],
  ) {
    super(input, [
      new TextEncoderStream(),
      ...transformers,
    ]);
  }
}
