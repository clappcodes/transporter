// deno-lint-ignore-file no-explicit-any
import { DeferredPromise, log, PipelineStream } from "./utils.ts";

/**
 * Represents an incoming stream of data.
 *
 * @template I - The type of the input data.
 * @template O - The type of the output data.
 */
export class IncomingStream<I extends Uint8Array = Uint8Array, O = any> {
  /**
   * The static index counter for the instances of the class.
   */
  static idx = 0;

  /**
   * The instance index.
   */
  public idx = IncomingStream.idx++;

  /**
   * The unique identifier for the stream.
   */
  public id: string;

  /**
   * The headers associated with the stream.
   */
  headers: Headers;

  /**
   * The promise that resolves when the stream is ready.
   */
  ready: Promise<this>;

  /**
   * The deferred promise that resolves when the stream is closed.
   */
  closed: DeferredPromise<unknown> = new DeferredPromise();

  /**
   * The name of the stream.
   */
  name = " → " + this.constructor.name;

  /**
   * The URL associated with the stream.
   */
  url: URL;

  /**
   * The environment in which the stream is running.
   */
  env: "server" | "client";

  /**
   * The callback function to be executed when a response is received.
   */
  onResponse?: (response: Response) => Promise<void>;

  /**
   * The pipeline stream that transforms the input data.
   */
  pipeline: PipelineStream<[TransformStream<I, O>, ...TransformStream[]]>;

  /**
   * The readable stream associated with the pipeline.
   */
  get readable() {
    return this.pipeline.readable;
  }

  /**
   * Creates an instance of IncomingStream.
   *
   * @param url - The URL or RequestInfo associated with the stream.
   * @param transformers - The array of transform streams to be used in the pipeline.
   * @param onResponse - The callback function to be executed when a response is received.
   */
  constructor(
    url: URL | RequestInfo = "/",
    private transformers: [TransformStream<I, O>, ...TransformStream[]],
    { onResponse }: { onResponse?: (response: Response) => Promise<void> } = {},
  ) {
    if (onResponse) {
      this.onResponse = onResponse;
    }

    this.pipeline = new PipelineStream(transformers);

    this.env = url instanceof Request ? "server" : "client";
    this.url = (url instanceof Request)
      ? new URL(url.url)
      : typeof location === "undefined"
      ? new URL(url)
      : new URL(url || "/", String(location));

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

  /**
   * Returns an async iterator for the stream.
   *
   * @returns An async generator that yields the output data.
   */
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

  /**
   * Fetches the data from the server.
   *
   * @returns A promise that resolves to the current instance of IncomingStream.
   */
  async fetch(): Promise<this> {
    const response = await fetch(
      new Request(this.url, {
        headers: this.headers,
      }),
    );
    if (this.onResponse) {
      await this.onResponse(response);
      return this;
    }

    if (response.body) {
      response.body.pipeTo(this.pipeline.writable);
    } else {
      throw new TypeError(`Response.body required`);
    }

    return this;
  }

  /**
   * Handles the incoming request on the server.
   *
   * @param request - The incoming request.
   * @returns A promise that resolves to the current instance of IncomingStream.
   */
  handle(request: Request): Promise<this> {
    if (request.body) {
      request.body.pipeTo(this.pipeline.writable);
    } else {
      throw new TypeError(`Request.body required`);
    }

    return Promise.resolve(this);
  }

  /**
   * Creates a response with the specified headers.
   *
   * @param headers - The headers to be included in the response.
   * @returns A promise that resolves to the created response.
   */
  response(headers: HeadersInit = {}): Promise<Response> {
    return Promise.resolve(
      new Response("done", {
        headers: { ...this.headers, ...headers },
      }),
    );
  }
}
