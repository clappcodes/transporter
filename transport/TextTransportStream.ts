import { Uint8ArrayTransformStream } from "../transform/mod.ts";
import { pipe } from "./pipe.ts";

export class TextTransportStream extends Response {
  finished: Promise<void>;

  constructor(
    public request: Request,
    public transformer?: Transformer<string, string>,
    public init?: ResponseInit,
  ) {
    if (!request.body) {
      throw new TypeError(`Request.body missing`);
    }

    // 1 request stream transform
    const {
      writable,
      readable,
    } = new TransformStream<string, string>(transformer);

    super(readable.pipeThrough(new TextEncoderStream()), init);

    this.finished = request.body
      .pipeThrough(new TextDecoderStream())
      .pipeTo(writable);
  }
}
