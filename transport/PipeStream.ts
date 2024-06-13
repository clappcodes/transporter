// deno-lint-ignore-file no-explicit-any
import { pipe } from "./pipe.ts";

export class PipeStream<
  I = any,
  O = any,
> {
  //
  declare writer: WritableStreamDefaultWriter<I>;
  declare reader: ReadableStreamDefaultReader<O>;
  //
  declare readable: ReadableStream<O>;
  declare writable: WritableStream<I>;
  declare transformers: (TransformStream<I, O> | Transformer<I, O>)[];

  constructor(
    ...transformers: (TransformStream | Transformer | undefined)[]
  ) {
    const { writable, readable } = new TransformStream();
    const pipeline = transformers.filter(
      Boolean,
    ) as (TransformStream | Transformer)[];

    this.readable = pipe(...pipeline)(readable);
    this.writable = writable;

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
