// deno-lint-ignore-file constructor-super no-explicit-any
import { useCors } from "../playground/useCors.ts";
import { Promised } from "../utils/Promised.ts";
import { fetchStream } from "./fetchDuplex.ts";
import { PipeStream } from "./PipeStream.ts";
import { pipeTo } from "./pipeTo.ts";
import { RequestDuplex } from "./RequestDuplex.ts";
// import { RequestDuplex } from "./RequestDuplex.ts";

export type Transformers<I = any, O = any> =
  (Transformer<I, O> | TransformStream<I, O>)[];

export class RequestTransformerStream<W, R> {
  writable: WritableStream<W>;
  readable: ReadableStream<R>;

  writer?: WritableStreamDefaultWriter<W>;
  request: Request;

  constructor(
    input: URL | RequestInfo,
    transformers: Transformers | PipeStream<W, R> = [],
  ) {
    const ps = transformers instanceof PipeStream
      ? transformers
      : new PipeStream<W, R>(...transformers);

    if (input instanceof Request) {
      input.body?.pipeTo(ps.writable as WritableStream<Uint8Array>);
      this.request = input;
      // super("/a");
    } else {
      this.request = new RequestDuplex(input, {
        body: ps.readable,
        method: "POST",
        //@ts-ignore .
        duplex: "half",
      });
    }
    this.readable = ps.readable;
    this.writable = ps.writable;
  }

  pipeTo(destination: WritableStream<R>) {
    return this.readable.pipeTo(destination);
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
}

export class Transporter<
  I = any,
  O = any,
> extends Response {
  writable!: WritableStream<I>;
  readable!: ReadableStream<O>;

  finished!: Promise<void>;
  closed = new Promised();

  declare private writer?: WritableStreamDefaultWriter<I>;

  static encoder = (): TransformStream | Transformer | undefined => undefined;
  static decoder = (): TransformStream | Transformer | undefined => undefined;

  constructor(
    input: URL | RequestInfo,
    requestTransformers?: Transformers<I, O>,
    responseInit?: ResponseInit,
  );

  constructor(
    input: URL | RequestInfo,
    requestTransformers?: Transformers<I, O>,
    responseTransformers?: Transformers<I, O>,
  );

  constructor(
    input: URL | RequestInfo,
    requestTransformers: Transformers<I, O> = [],
    response?: ResponseInit | Transformers<I, O>,
  ) {
    const decoder = new.target.decoder();
    const encoder = new.target.encoder();

    if (input instanceof Request) {
      const responseInit = response as ResponseInit;

      const ps = new PipeStream(
        decoder,
        ...requestTransformers,
        encoder,
      );

      const readable = input.body ? input.body.pipeThrough(ps) : ps.readable;
      const writable = ps.writable;

      super(readable, responseInit);
      this.writable = writable;
      this.readable = readable;

      useCors(this);
    } else {
      // fetch request
      const responseTransformers = (response || []) as Transformers;

      const reqTransform = new PipeStream(...requestTransformers, encoder);
      const resTransform = new PipeStream(decoder, ...responseTransformers);

      super(resTransform.readable /** init */);

      this.writable = reqTransform.writable;
      this.readable = resTransform.readable;
      this.finished = fetchStream(input, reqTransform.readable)
        .then(pipeTo(resTransform));
    }
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

    if (this.writer) {
      await this.writer.ready;
      await this.writer.close();
      this.writer.releaseLock();
      delete this.writer;
    } else {
      this.writable.close();
    }

    this.closed.resolve(true);
  }
}

// @ts-ignore .
Transporter.demo = (u = "/upper") => {
  const ts = new PipeStream<string, string>(
    new TextEncoderStream(),
    new Transporter(u),
    new TextDecoderStream(),
  );

  ts.read(console.log);

  ts.write("Hello World");

  return ts;
};
