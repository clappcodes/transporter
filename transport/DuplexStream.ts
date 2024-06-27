import { PipeStream } from "../transporter/PipeStream.ts";
import { isTransformStream } from "../utils.ts";

export type Transformers<I = any, O = any> =
  (Transformer<I, O> | TransformStream<I, O>)[];

export type DuplexStreamInput<W, R> = {
  writable: WritableStream<W>;
  readable: ReadableStream<R>;
};

export function duplexStreamDemo() {
  const duplex = new DuplexStream<string, string>();

  duplex.read(console.log);

  duplex.write("Hello World");

  return duplex;
}

export class DuplexStream<W, R = W> {
  writable: WritableStream<W>;
  readable: ReadableStream<R>;

  declare writer: WritableStreamDefaultWriter<W>;

  constructor(input: DuplexStreamInput<W, R> = new TransformStream<W, R>()) {
    this.writable = input.writable;
    this.readable = input.readable;
  }

  async write(message: W) {
    this.writer = this.writer || this.writable.getWriter();

    await this.writer.ready;
    await this.writer.write(message);
  }

  async read(cb: (chunk: R) => void) {
    for await (const chunk of this.readable) {
      await cb(chunk);
    }
  }

  pipeTo(
    destination: TransformStream<R> | WritableStream<R>,
  ) {
    return this.readable
      .pipeTo(
        isTransformStream(destination) ? destination.writable : destination,
      );
  }

  pipe(...transformers: Transformers) {
    return this.readable.pipeThrough(new PipeStream(...transformers));
  }

  static demo = duplexStreamDemo;
}
