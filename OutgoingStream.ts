// deno-lint-ignore-file no-explicit-any
import { log, PipelineStream } from "./utils.ts";
import { Promised } from "./utils/Promised.ts";

export class OutgoingStream<
  I = any,
  O extends Uint8Array = Uint8Array,
> {
  static idx: number = 0;
  static set: Set<OutgoingStream> = new Set<OutgoingStream>();
  static add = (
    instance: OutgoingStream,
  ): Set<OutgoingStream> => this.set.add(instance);
  static del = (instance: OutgoingStream): boolean => this.set.delete(instance);
  static get = (
    obj: { idx?: number; id?: string },
  ): OutgoingStream[] => {
    return Array.from(this.set).filter((instance) => {
      const a = obj.id && instance.id === obj.id;
      const b = obj.idx && instance.idx === obj.idx;
      return a || b;
    });
  };
  #writable?: WritableStream<I>;
  ready: Promise<this>;
  closed: Promised<unknown>;
  pipeline: PipelineStream<[TransformStream<I, O>, ...TransformStream[]]>;
  readable: ReadableStream<any>;
  // get readable() {
  //   return this.pipeline.readable;
  // }
  static get size(): number {
    return this.set.size;
  }

  public idx = OutgoingStream.idx++;
  public id: string;

  // public readable: ReadableStream<Uint8Array>;
  static write<T>(chunk: T) {
    for (const outgoing of this.set) {
      outgoing.write(chunk);
    }
  }

  declare controller: ReadableStreamDefaultController<I>;

  headers: Headers;
  name = " ← " + this.constructor.name; // →
  url: URL;
  env: "client" | "server";

  constructor(
    url: URL | RequestInfo = "/",
    private transformers: [TransformStream<I, O>, ...TransformStream[]],
  ) {
    // add this instance to set
    OutgoingStream.add(this);

    this.env = url instanceof Request ? "server" : "client";
    this.url = (url instanceof Request)
      ? new URL(url.url)
      : new URL(url, String(location));

    this.id = this.url.searchParams.get("id") || "x" + String(this.idx);

    this.closed = new Promised();
    this.pipeline = new PipelineStream(transformers);

    this.readable = new ReadableStream({
      start: (controller) => {
        this.controller = controller;
        log(this, "start", OutgoingStream.size);
      },
      cancel: (_reason) => {
        OutgoingStream.del(this);
        this.closed.resolve(_reason);

        log(this, "close", OutgoingStream.size);
      },
    }).pipeThrough(this.pipeline);

    if (this.env === "server") {
      this.ready = this.handle(url as Request);
    } else {
      this.ready = this.fetch();
    }

    this.headers = new Headers({
      "x-id": this.id,
      "x-idx": String(this.idx),
    });
  }

  get writable(): WritableStream<I> {
    this.#writable = this.#writable || new WritableStream({
      write: (chunk) => {
        this.controller.enqueue(chunk);
      },
      close: () => {
        this.close();
      },
      abort: (err) => {
        console.log("Writable error:", err);
      },
    });

    return this.#writable;
  }

  async write(chunk: I): Promise<void> {
    try {
      await this.ready;
      if ((this.controller?.desiredSize)! <= 0) {
        // The internal queue is full, so propagate
        // the backpressure signal to the underlying source.
        console.log("backpressure signal", this.controller.desiredSize);
      }
      this.controller.enqueue(chunk);
      log(this, "write", chunk);
    } catch (e) {
      log(this, "write", e);
    }
  }

  close(): void {
    this.controller?.close();
  }

  fetch(): Promise<this> {
    fetch(
      new Request(this.url, {
        method: "POST",
        // @ts-ignore ?
        duplex: "half",
        body: this.readable,
        headers: this.headers,
      }),
    );

    return Promise.resolve(this);
  }

  handle(_request: Request): Promise<this> {
    return Promise.resolve(this);
  }

  response(headers: HeadersInit = {}): Response {
    return new Response(this.readable, {
      headers: { ...this.headers, ...headers },
    });
  }
}
