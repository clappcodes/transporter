// deno-lint-ignore-file no-explicit-any require-await
import "./shims.js";
import { DeferredPromise, log } from "./utils.js";

export class OutgoingStream<I = any, O extends Uint8Array = Uint8Array> {
  static idx: number = 0;
  static set: Set<OutgoingStream<any, Uint8Array>> = new Set<OutgoingStream>();
  static add = (
    instance: OutgoingStream,
  ): Set<OutgoingStream<any, Uint8Array>> => this.set.add(instance);
  static del = (instance: OutgoingStream): boolean => this.set.delete(instance);
  static get = (
    obj: { idx?: number; id?: string },
  ): OutgoingStream<any, Uint8Array>[] => {
    return Array.from(this.set).filter((instance) => {
      const a = obj.id && instance.id === obj.id;
      const b = obj.idx && instance.idx === obj.idx;
      return a || b;
    });
  };
  #writable?: WritableStream<I>;

  ready: Promise<this>;
  closed: DeferredPromise<unknown>;

  static get size(): number {
    return this.set.size;
  }

  public idx = OutgoingStream.idx++;
  public id: string;

  public readable: ReadableStream<Uint8Array>;

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
    url: URL | string | Request,
    transform: TransformStream<I, O> = new TransformStream<I, O>(),
  ) {
    // add this instance to set
    OutgoingStream.add(this);
    this.env = url instanceof Request ? "server" : "client";
    this.url = (url instanceof Request)
      ? new URL(url.url)
      : new URL(url, String(location));

    this.id = this.url.searchParams.get("id") || "x" + String(this.idx);

    this.closed = new DeferredPromise();

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
    }).pipeThrough(transform);

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
    await this.ready;
    this.controller.enqueue(chunk);
    log(this, "write", chunk);
  }

  close(): void {
    this.controller?.close();
  }

  async fetch(): Promise<this> {
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

  async handle(_request: Request): Promise<this> {
    return Promise.resolve(this);
  }

  async response(headers: HeadersInit = {}): Promise<Response> {
    return new Response(this.readable, {
      headers: { ...this.headers, ...headers },
    });
  }
}

export class IncomingStream<I extends Uint8Array = Uint8Array, O = any> {
  static idx = 0;
  public idx = IncomingStream.idx++;
  public id: string;

  headers: Headers;
  readable!: ReadableStream<O>;
  ready: Promise<this>;
  closed: DeferredPromise<unknown> = new DeferredPromise();

  name = " → " + this.constructor.name; // ←
  url: URL;
  env: "server" | "client";
  constructor(
    url: string | URL | Request,
    private transform: TransformStream<I, O> = new TransformStream<I, O>(),
  ) {
    this.env = url instanceof Request ? "server" : "client";
    this.url = (url instanceof Request)
      ? new URL(url.url)
      : new URL(url, String(location));

    if (this.env === "server") {
      this.ready = this.handle(url as Request);
    } else {
      this.ready = this.fetch();
    }

    this.id = this.url.searchParams.get("id") || "x" + String(this.idx);

    this.headers = new Headers({
      "x-id": this.id,
      "x-idx": String(this.idx),
    });
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<Awaited<O>, void, unknown> {
    const reader = this.readable.getReader();
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          return;
        }
        log(this, "read", value);
        yield value;
      }
    } finally {
      reader.releaseLock();
    }
  }

  // Browser
  async fetch(): Promise<this> {
    const response = await fetch(
      new Request(this.url, {
        headers: this.headers,
      }),
    );

    if (response.body) {
      this.readable = response.body.pipeThrough(this.transform);
    } else {
      throw new TypeError(`Response.body required`);
    }

    return this;
  }

  // Server
  async handle(request: Request): Promise<this> {
    if (request.body) {
      this.readable = request.body.pipeThrough(this.transform);
    } else {
      throw new TypeError(`Request.body required`);
    }

    return this;
  }

  async response(headers: HeadersInit = {}): Promise<Response> {
    return new Response("done", {
      headers: { ...this.headers, ...headers },
    });
  }
}
