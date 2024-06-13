// deno-lint-ignore-file
import * as colors from "./colors.ts";
import { type OutgoingStream } from "./OutgoingStream.ts";
import { type IncomingStream } from "./IncomingStream.ts";
import { readable, transform, writable } from "./mod.ts";

export { colors };
export const idKey = "transport-id";

import demo from "./app/echo2.ts";
import { defineStreamHandler } from "./app/defineStreamHandler.ts";
import { Promised } from "./utils/Promised.ts";

const demoFetch = defineStreamHandler(demo.fetch);

function fetch(input: URL | RequestInfo, init?: RequestInit) {
  const request = input instanceof Request ? input : new Request(input, init);

  return demoFetch(request);
}

// const fetch = defineStreamHandler(demo.fetch);

export const isDebug = (): boolean =>
  typeof Deno !== "undefined"
    ? Deno.env.get("DEBUG") === "true"
    : Boolean(Reflect.get(globalThis, "DEBUG"));

Object.assign(globalThis, { isDebug });

console.log(
  colors.green("(utils) DEBUG") + "=" +
    colors.white(isDebug() + ""),
);

export function mkId<K extends string>(key: K = "abcdefghkl" as K) {
  if (key.length !== 10) {
    throw new TypeError(
      `Key format error, required 10 unique chars, got: "${key}" (len=${key.length})`,
    );
  }
  const alphaMap = [...key];

  return <I extends string = "0123456789">(value: I): K[0] =>
    [...String(value)].map((num) => alphaMap[Number(num)]).join("");
}

export const tid = mkId("5aksj3hg7e".toUpperCase());
export const uid = () => tid(Math.random().toString().split(".").pop()!);

export async function waitForStatus(
  request: Request,
  status: string,
  options: { retry: number } = { retry: 10 },
): Promise<string | null> {
  if (!request.headers.has(idKey)) {
    throw new TypeError(`Header "${idKey}" missing`);
  }

  // const reqIdValue = request.headers.get(idKey);
  const promise = new Promised<string>();

  const response = await fetch(request);
  const body = response.body!;

  const stream = body.pipeThrough(transform.decode());

  const read = readable.read((_status: string) => {
    const isOk = String(_status).trim() === String(status).trim();
    console.log(
      "(waitForStatus)",
      request.method,
      request.url,
      status,
      _status,
      isOk,
    );

    if (isOk && !promise.resolved) {
      promise.resolved = true;
      promise.resolve(_status);
    }
  });

  read(stream);

  return promise;
}

export async function duplexFetch(
  input: URL | RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  const id = uid(); // String(Math.random()).slice(2);
  const { body, ...rest } = init || {};

  const headers = Object.assign(Object.create(null), init?.headers, {
    [idKey]: id,
  });

  // incoming
  // outgoing
  const ready = waitForStatus(
    new Request(input, { method: "HEAD", headers }),
    "incoming",
  );

  fetch(input, {
    // @ts-ignore .
    duplex: "half",
    method: "POST",
    ...rest,
    headers: {
      ...headers,
      "transport-status": "incoming",
    },
    body,
  });

  await ready;

  return fetch(input, {
    ...rest,
    headers: {
      ...headers,
      "transport-status": "outgoing",
    },
  });
}

export async function delay(ms: number): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

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

export function log(
  _this: IncomingStream | OutgoingStream,
  method: string,
  ...value: unknown[]
) {
  if (!isDebug()) return;
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

export const _isTransformStream = <T extends object>(input: T): boolean =>
  typeof input === "object" &&
  Object.hasOwn(input, "writable") && Object.hasOwn(input, "readable");

export const isTransformStream = (a: unknown): a is GenericTransformStream =>
  typeof a === "object" && "readable" in a!;

type LengthOfTuple<T extends any[]> = T extends { length: infer L } ? L
  : never;
type DropFirstInTuple<T extends any[]> = ((...args: T) => any) extends
  (arg: any, ...rest: infer U) => any ? U : T;
export type LastInTuple<T extends any[]> =
  T[LengthOfTuple<DropFirstInTuple<T>>];

export class PipelineStream<
  T extends [TransformStream, ...TransformStream[]],
> {
  readable: LastInTuple<T>["readable"];
  writable: T[0]["writable"];

  constructor(
    private transformers: T,
    writableStrategy?: QueuingStrategy,
    readableStrategy?: QueuingStrategy,
  ) {
    const [first, ...rest] = this.transformers;

    this.writable = first.writable;
    this.readable = rest.reduce(
      (readable, transform) => readable.pipeThrough(transform),
      first.readable,
    );

    // if (this.transformers.length === 3) {
    //   this.readable = this.transformers[0].readable
    //     .pipeThrough(this.transformers[1])
    //     .pipeThrough(this.transformers[2]);
    // } else {
    //   this.readable = this.transformers.at(-1)!.readable;
    // }
  }
}

// const pip = new PipelineStream([
//   new TransformStream<string, number>(),
//   new TransformStream<number, symbol>(),
//   new TransformStream<string, number>(),
// ]);

// pip.writable.getWriter().write("ss");
// pip.readable.getReader();
