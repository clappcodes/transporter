// deno-lint-ignore-file no-explicit-any
import { PairStream } from "./PairStream.ts";
import { isTransformStream } from "./utils/is.ts";
import { pipe } from "./pipe.ts";

export class PipeStream<
  I = any,
  O = any,
> extends PairStream<I, O> {
  //
  declare writer: WritableStreamDefaultWriter<I>;
  declare reader: ReadableStreamDefaultReader<O>;
  //
  declare readable: ReadableStream<O>;
  declare writable: WritableStream<I>;
  declare transformers: TransformStream<I, O>[];

  constructor(
    ...transformers: (TransformStream | Transformer | undefined)[]
  ) {
    const { writable, readable } = new TransformStream<I, O>();

    const pipeline = transformers
      .filter(Boolean)
      .map((ts) => isTransformStream(ts) ? ts : new TransformStream(ts)) as [
        TransformStream,
        ...TransformStream[],
      ];

    super({
      readable: pipe(readable, ...pipeline),
      writable,
    });

    this.transformers = pipeline;
  }

  async write(message: I) {
    this.writer = this.writer || this.writable.getWriter();

    await this.writer.ready;
    await this.writer.write(message);
  }

  async read(cb: (chunk: O) => void) {
    for await (const chunk of this.readable) {
      await cb(chunk);
    }
  }
}
