// deno-lint-ignore-file no-explicit-any
import { DuplexRequest, type DuplexRequestInit } from "./DuplexRequest.ts";
import type { FetchHandler } from "./route.ts";

export class TransportStream<
  W = Uint8Array,
  R = Uint8Array,
> {
  static encoder(): TransformStream<any, any> {
    return new TransformStream();
  }

  static decoder(): TransformStream<any, any> {
    return new TransformStream();
  }

  static headers: HeadersInit = {};

  writable: WritableStream<W>;
  readable: ReadableStream<R>;

  request: DuplexRequest;

  finished: Promise<void>;

  writer?: WritableStreamDefaultWriter<W>;

  constructor(
    input: URL | RequestInfo,
    init?: DuplexRequestInit | FetchHandler,
    fetch?: FetchHandler,
  ) {
    const reqTransform = new.target.encoder();
    const resTransform = new.target.decoder();

    this.writable = reqTransform.writable;
    this.readable = resTransform.readable;

    if (typeof init === "function") {
      fetch = init;
      init = {};
    }

    const headers = {
      ...init?.headers,
      ...TransportStream.headers,
      ...new.target.headers,
    };

    const request = this.request = new DuplexRequest(input, {
      ...init,
      headers,
      body: reqTransform.readable,
    }, fetch);

    this.finished = request.fetch().then((response) =>
      response.body?.pipeTo(resTransform.writable)
    );
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

  async close() {
    if (this.writer) {
      await this.writer.ready;
      await this.writer.close();
      this.writer.releaseLock();
      delete this.writer;
    } else {
      this.writable.close();
    }
  }
}
