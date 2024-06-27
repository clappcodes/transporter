// deno-lint-ignore-file no-explicit-any

export class PairStream<W = any, R = W> {
  public writable: WritableStream<W>;
  public readable: ReadableStream<R>;

  private _writer?: WritableStreamDefaultWriter<W>;

  constructor(
    { writable, readable }: {
      writable: WritableStream<W>;
      readable: ReadableStream<R>;
    } = new TransformStream<W, R>(),
  ) {
    this.writable = writable;
    this.readable = readable;
  }

  async write(message: W) {
    this._writer = this._writer || this.writable.getWriter();

    await this._writer.ready;
    await this._writer.write(message);
  }

  async read(cb: (chunk: R) => void) {
    for await (const chunk of this.readable) {
      await cb(chunk);
    }
  }

  async close() {
    if (this._writer) {
      await this._writer.ready;
      await this._writer.close();
      this._writer.releaseLock();
      delete this._writer;
    } else {
      this.writable.close();
    }
  }
}
