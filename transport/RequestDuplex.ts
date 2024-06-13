import { STREAM_ID_KEY, STREAM_TYPE, STREAM_TYPE_KEY } from "./handle.ts";

const isDenoEnv = Reflect.has(globalThis, "Deno");
const isStreamingBodyRequest = (init?: RequestInit) =>
  init?.body instanceof ReadableStream &&
  init.method !== "GET" && init.method !== "HEAD";

export type RequestDuplexInit = RequestInit & { duplex?: "half" | "full" };

/**
 * Represents a duplex request that can send and receive data.
 */
export class RequestDuplex extends Request {
  declare [STREAM_TYPE_KEY]: STREAM_TYPE;
  declare duplex: "half" | "full" | undefined;

  /**
   * Creates a new instance of RequestDuplex.
   * @param input - The URL or RequestInfo object.
   * @param init - The optional RequestInit object.
   */
  constructor(
    input: URL | RequestInfo,
    init?: RequestDuplexInit,
  ) {
    input = input || "";
    init = init || {};
    if (isStreamingBodyRequest(init)) {
      init.duplex = isDenoEnv ? "full" : "half";
    }

    super(input, init);

    if (init.duplex) {
      this.duplex = init.duplex;
    }

    if (this.duplex === "half") {
      this.headers.set(STREAM_ID_KEY, Math.random().toString().slice(2));
      this.headers.set(STREAM_TYPE_KEY, STREAM_TYPE.REQUEST);
      this[STREAM_TYPE_KEY] = STREAM_TYPE.REQUEST;
    } else {
      if (this.headers.has(STREAM_ID_KEY)) {
        // if (this.headers.get(STREAM_TYPE_KEY) === STREAM_TYPE.REQUEST) {
        this.headers.set(STREAM_TYPE_KEY, STREAM_TYPE.RESPONSE);
        this[STREAM_TYPE_KEY] = STREAM_TYPE.RESPONSE;
        // }
      }
    }
  }
}
