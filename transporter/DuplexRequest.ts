import { STREAM_ID_KEY, STREAM_TYPE, STREAM_TYPE_KEY } from "./contstants.ts";
import { isDenoEnv, isStreamingBodyRequest } from "./utils/is.ts";
import { duplexHandler } from "./duplexHandler.ts";
import type { FetchHandler, RouteHandler } from "./route.ts";

export type DuplexRequestInit = RequestInit & { duplex?: "half" | "full" };

export type DuplexRequestFetch = RouteHandler;

/**
 * Represents a request stream that extends the RequestDuplex class.
 */
export class DuplexRequest extends Request {
  declare duplex: "half" | "full" | undefined;
  declare outgoing: DuplexRequest | undefined;

  declare response: Response | Promise<Response> | undefined;

  private _fetch(
    ...args: [
      input: Request,
      init?: RequestInit,
    ]
  ): Response | Promise<Response> {
    return globalThis.fetch(...args);
  }

  /**
   * Creates a new instance of RequestStream.
   * @param input - The URL or Request object.
   * @param init - Optional request initialization options.
   */

  constructor(
    input: URL | RequestInfo,
    init?: DuplexRequestInit | FetchHandler,
    fetch?: FetchHandler,
  ) {
    if (typeof init === "function") {
      fetch = init;
      init = {};
    }

    input = input || "";
    init = init || {};

    if (isStreamingBodyRequest(init)) {
      init.duplex = isDenoEnv ? "full" : "half";
      init.method = init.method || "POST";
    }

    const headers = new Headers(init.headers);
    headers.set(
      STREAM_ID_KEY,
      headers.get(STREAM_ID_KEY) || Math.random().toString().slice(2),
    );

    let outgoing;

    if (init.duplex === "half" && !headers.has(STREAM_TYPE_KEY)) {
      outgoing = new new.target(input, {
        ...init,
        headers: {
          ...Object.fromEntries(headers.entries()),
          [STREAM_TYPE_KEY]: STREAM_TYPE.OUTGOING,
        },
      });

      init = {
        body: null,
        method: init.method,
        headers: {
          ...Object.fromEntries(headers.entries()),
          [STREAM_TYPE_KEY]: STREAM_TYPE.INCOMING,
        },
      };
    } else {
      init = {
        ...init,
        headers,
      };
    }

    super(input, init);

    if (outgoing) {
      Object.defineProperty(this, "outgoing", {
        value: outgoing,
      });
    }

    if (typeof fetch === "function") {
      Object.defineProperty(this, "_fetch", {
        value: duplexHandler(fetch),
      });
    }
  }

  get requestType(): STREAM_TYPE {
    return this.headers.get(STREAM_TYPE_KEY) === STREAM_TYPE.OUTGOING
      ? STREAM_TYPE.OUTGOING
      : STREAM_TYPE.INCOMING;
  }

  /**
   * Fetches the request stream.
   * @param init - Optional request initialization options.
   * @returns A Promise that resolves to the response of the request.
   */
  async fetch(init?: RequestInit): Promise<Response> {
    try {
      if (this.outgoing) {
        // >> send stream.
        this.outgoing.response = this._fetch(this.outgoing, init);
      }

      // << receive stream.
      this.response = await this._fetch(
        this,
        init,
      );

      if (!this.response.ok) {
        throw new Error(
          `Failed to fetch. Response status: ${this.response.status} `,
        );
      }
    } catch (err) {
      console.warn(`[${this.constructor.name}] ${err.message}`);
      console.error(err);

      return this.response!;
    }

    return this.response;
  }
}
