// deno-lint-ignore-file
import "./_dnt.polyfills.js";

import * as dntShim from "./_dnt.shims.js";

import * as colors from "./colors.js";
import {
  type IncomingStream,
  type OutgoingStream,
} from "./main.transporter.js";

export { colors };

export const DEBUG: boolean = typeof Deno !== "undefined"
  ? Deno.env.get("DEBUG")
  : Reflect.get(dntShim.dntGlobalThis, "DEBUG");

console.log(
  colors.green("(T) DEBUG") + "=" +
    colors.white(DEBUG + ""),
);

export enum ReadyState {
  CONNECTING = 0,
  INCOMING = 1,
  OUTGOING = 2,
  OPEN = 3,
  CLOSED = 4,
  ERRORED = 5,
}

export function* mkRangeIterator(
  start = 0,
  end = Infinity,
  step = 1,
): Generator<number, number, unknown> {
  let iterationCount = 0;
  for (let i = start; i < end; i += step) {
    iterationCount++;
    yield i;
  }
  return iterationCount;
}

export async function* mkRangeAsyncIterator(
  start = 0,
  end = Infinity,
  delay = 100,
): AsyncGenerator<unknown, number, unknown> {
  let iterationCount = 0;
  for (let i = start; i < end; i += 1) {
    iterationCount++;
    yield await new Promise((resolve) => {
      setTimeout(() => resolve(i), delay);
    });
  }
  return iterationCount;
}

export class DeferredPromise<T> extends Promise<T> {
  declare resolve: (value: T) => void;
  declare reject: (reason?: unknown) => void;

  constructor(
    resolver?: (
      resolve: (value: T) => void,
      reject: (reason?: unknown) => void,
    ) => void,
  ) {
    const that = {};
    super(function (resolve, reject) {
      Object.assign(that, { resolve, reject });
    });
    Object.assign(this, that);
    if (resolver) {
      resolver(this.resolve, this.reject);
    }
  }
}

export function log(
  _this: IncomingStream | OutgoingStream,
  method: string,
  ...value: unknown[]
) {
  if (!DEBUG) return;
  const isIn = _this.constructor.name === "IncomingStream";
  const nameColor = isIn ? colors.cyan : colors.magenta;
  const nameBg = (a: string) => a;

  console.log(
    colors.gray(
      `${(nameColor(
        nameBg(
          colors.bold(_this.name) + "[" + _this.env + "]" + " /" +
            colors.italic(_this.url.pathname) +
            " ",
        ),
      ))} ${colors.brightWhite(colors.bold(method))}(${
        colors.brightYellow(_this.id) + ", " +
        colors.brightGreen(_this.idx + "")
      }) ${colors.blue("=>")}`,
    ),
    ...value,
  );
}

export async function getStream(
  url: URL | string,
  transform: TransformStream = new TextDecoderStream(),
): Promise<{
  url: URL;
  id: number;
  request: Request;
  response: Response;
  readable: ReadableStream<string>;
}> {
  url = new URL(url, location.href);

  const abortController = new AbortController();
  const headers = new Headers();

  const request = new Request(url, {
    method: "GET",
    cache: "no-cache",
    // @ts-ignore ?
    signal: abortController.signal,
    headers,
  });

  const response = await fetch(request);
  const id = Number(response.headers.get("duplex-id") || "0");
  url.hash = `#${id}`;

  if (!response.body) {
    throw new Error(`Response body`);
  }

  const readable = response.body.pipeThrough(transform);

  return {
    url,
    id,
    request,
    response,
    readable,
  };
}

export function putStream(
  url: URL | string,
  transform: TransformStream = new TextEncoderStream(),
): {
  id: number;
  writable: WritableStream<any>;
  readable: ReadableStream<any>;
  readable1: ReadableStream<any>;
  readable2: ReadableStream<any>;
  headers: Headers;
  request: Request;
  response: Promise<Response>;
  abortController: AbortController;
} {
  url = new URL(url, location.href);

  const { writable, readable } = transform;
  const [readable1, readable2] = readable.tee();
  const abortController = new AbortController();

  const headers = new Headers();
  const id = Number(url.hash.slice(1) || "0");

  if (id) {
    headers.set("duplex-id", String(id));
  }

  const request = new Request(url, {
    method: "PUT",
    body: readable1,
    cache: "no-cache",
    // @ts-ignore ?
    duplex: "half",
    signal: abortController.signal,
    headers,
  });

  const response = fetch(request);

  response.then(async (response) => {
    if (response.ok) {
      const message = await response.text();

      console.log("[closed]", message);
      return;
    }

    const status = response.status;
    const message = await response.text();

    throw new Error(`Request failed: ${message}`, { cause: status });
  }).catch((error: Error) => {
    console.warn(error.name, error.cause, error.message);
  });

  const o = {
    id,
    writable,
    readable,
    readable1,
    readable2,
    headers,
    request,
    response,
    abortController,
  };

  return o;
}

export function createRead<T>(
  readable: ReadableStream<T> | { readable: ReadableStream<T> },
  cb: (chunk: T) => void,
): Promise<void> {
  const reader = (readable instanceof ReadableStream)
    ? readable.getReader()
    : readable.readable.getReader();

  async function read(cb: (chunk: T) => void) {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          return;
        }
        cb(value);
      }
    } finally {
      reader.releaseLock();
    }
  }

  return read(cb);
}

export function createWrite<T>(
  writable: WritableStream<T> | { writable: WritableStream<T> },
): (chunk: T) => Promise<void> {
  const writer = (writable instanceof WritableStream)
    ? writable.getWriter()
    : writable.writable.getWriter();

  Object.assign(write, { writer });

  async function write(chunk: T) {
    await writer.ready;
    await writer.write(chunk);
  }

  return write;
}

export const swapObject = <T extends { [key: PropertyKey]: any }>(
  obj: T,
): {
  [K in keyof T as T[K]]: K;
} => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));

export const valueFromKeyObject = <T extends { [key: PropertyKey]: any }>(
  obj: T,
): {
  [K in keyof T]: K;
} => Object.fromEntries(Object.entries(obj).map(([k, _v]) => [k as any, k]));
