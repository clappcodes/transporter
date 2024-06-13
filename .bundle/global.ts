var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// colors.ts
var colors_exports = {};
__export(colors_exports, {
  bgBlack: () => bgBlack,
  bgBlue: () => bgBlue,
  bgBrightBlack: () => bgBrightBlack,
  bgBrightBlue: () => bgBrightBlue,
  bgBrightCyan: () => bgBrightCyan,
  bgBrightGreen: () => bgBrightGreen,
  bgBrightMagenta: () => bgBrightMagenta,
  bgBrightRed: () => bgBrightRed,
  bgBrightWhite: () => bgBrightWhite,
  bgBrightYellow: () => bgBrightYellow,
  bgCyan: () => bgCyan,
  bgGreen: () => bgGreen,
  bgMagenta: () => bgMagenta,
  bgRed: () => bgRed,
  bgRgb24: () => bgRgb24,
  bgRgb8: () => bgRgb8,
  bgWhite: () => bgWhite,
  bgYellow: () => bgYellow,
  black: () => black,
  blue: () => blue,
  bold: () => bold,
  brightBlack: () => brightBlack,
  brightBlue: () => brightBlue,
  brightCyan: () => brightCyan,
  brightGreen: () => brightGreen,
  brightMagenta: () => brightMagenta,
  brightRed: () => brightRed,
  brightWhite: () => brightWhite,
  brightYellow: () => brightYellow,
  cyan: () => cyan,
  dim: () => dim,
  getColorEnabled: () => getColorEnabled,
  gray: () => gray,
  green: () => green,
  hidden: () => hidden,
  inverse: () => inverse,
  italic: () => italic,
  magenta: () => magenta,
  red: () => red,
  reset: () => reset,
  rgb24: () => rgb24,
  rgb8: () => rgb8,
  setColorEnabled: () => setColorEnabled,
  strikethrough: () => strikethrough,
  stripAnsiCode: () => stripAnsiCode,
  stripColor: () => stripColor,
  underline: () => underline,
  white: () => white,
  yellow: () => yellow
});
var { Deno: Deno2 } = globalThis;
var noColor = typeof Deno2?.noColor === "boolean" ? Deno2.noColor : false;
var enabled = !noColor;
function setColorEnabled(value) {
  if (Deno2?.noColor) {
    return;
  }
  enabled = value;
}
__name(setColorEnabled, "setColorEnabled");
function getColorEnabled() {
  return enabled;
}
__name(getColorEnabled, "getColorEnabled");
function code(open, close) {
  return {
    open: `\x1B[${open.join(";")}m`,
    close: `\x1B[${close}m`,
    regexp: new RegExp(`\\x1b\\[${close}m`, "g")
  };
}
__name(code, "code");
function run(str, code2) {
  return enabled ? `${code2.open}${str.replace(code2.regexp, code2.open)}${code2.close}` : str;
}
__name(run, "run");
function reset(str) {
  return run(str, code([0], 0));
}
__name(reset, "reset");
function bold(str) {
  return run(str, code([1], 22));
}
__name(bold, "bold");
function dim(str) {
  return run(str, code([2], 22));
}
__name(dim, "dim");
function italic(str) {
  return run(str, code([3], 23));
}
__name(italic, "italic");
function underline(str) {
  return run(str, code([4], 24));
}
__name(underline, "underline");
function inverse(str) {
  return run(str, code([7], 27));
}
__name(inverse, "inverse");
function hidden(str) {
  return run(str, code([8], 28));
}
__name(hidden, "hidden");
function strikethrough(str) {
  return run(str, code([9], 29));
}
__name(strikethrough, "strikethrough");
function black(str) {
  return run(str, code([30], 39));
}
__name(black, "black");
function red(str) {
  return run(str, code([31], 39));
}
__name(red, "red");
function green(str) {
  return run(str, code([32], 39));
}
__name(green, "green");
function yellow(str) {
  return run(str, code([33], 39));
}
__name(yellow, "yellow");
function blue(str) {
  return run(str, code([34], 39));
}
__name(blue, "blue");
function magenta(str) {
  return run(str, code([35], 39));
}
__name(magenta, "magenta");
function cyan(str) {
  return run(str, code([36], 39));
}
__name(cyan, "cyan");
function white(str) {
  return run(str, code([37], 39));
}
__name(white, "white");
function gray(str) {
  return brightBlack(str);
}
__name(gray, "gray");
function brightBlack(str) {
  return run(str, code([90], 39));
}
__name(brightBlack, "brightBlack");
function brightRed(str) {
  return run(str, code([91], 39));
}
__name(brightRed, "brightRed");
function brightGreen(str) {
  return run(str, code([92], 39));
}
__name(brightGreen, "brightGreen");
function brightYellow(str) {
  return run(str, code([93], 39));
}
__name(brightYellow, "brightYellow");
function brightBlue(str) {
  return run(str, code([94], 39));
}
__name(brightBlue, "brightBlue");
function brightMagenta(str) {
  return run(str, code([95], 39));
}
__name(brightMagenta, "brightMagenta");
function brightCyan(str) {
  return run(str, code([96], 39));
}
__name(brightCyan, "brightCyan");
function brightWhite(str) {
  return run(str, code([97], 39));
}
__name(brightWhite, "brightWhite");
function bgBlack(str) {
  return run(str, code([40], 49));
}
__name(bgBlack, "bgBlack");
function bgRed(str) {
  return run(str, code([41], 49));
}
__name(bgRed, "bgRed");
function bgGreen(str) {
  return run(str, code([42], 49));
}
__name(bgGreen, "bgGreen");
function bgYellow(str) {
  return run(str, code([43], 49));
}
__name(bgYellow, "bgYellow");
function bgBlue(str) {
  return run(str, code([44], 49));
}
__name(bgBlue, "bgBlue");
function bgMagenta(str) {
  return run(str, code([45], 49));
}
__name(bgMagenta, "bgMagenta");
function bgCyan(str) {
  return run(str, code([46], 49));
}
__name(bgCyan, "bgCyan");
function bgWhite(str) {
  return run(str, code([47], 49));
}
__name(bgWhite, "bgWhite");
function bgBrightBlack(str) {
  return run(str, code([100], 49));
}
__name(bgBrightBlack, "bgBrightBlack");
function bgBrightRed(str) {
  return run(str, code([101], 49));
}
__name(bgBrightRed, "bgBrightRed");
function bgBrightGreen(str) {
  return run(str, code([102], 49));
}
__name(bgBrightGreen, "bgBrightGreen");
function bgBrightYellow(str) {
  return run(str, code([103], 49));
}
__name(bgBrightYellow, "bgBrightYellow");
function bgBrightBlue(str) {
  return run(str, code([104], 49));
}
__name(bgBrightBlue, "bgBrightBlue");
function bgBrightMagenta(str) {
  return run(str, code([105], 49));
}
__name(bgBrightMagenta, "bgBrightMagenta");
function bgBrightCyan(str) {
  return run(str, code([106], 49));
}
__name(bgBrightCyan, "bgBrightCyan");
function bgBrightWhite(str) {
  return run(str, code([107], 49));
}
__name(bgBrightWhite, "bgBrightWhite");
function clampAndTruncate(n, max = 255, min = 0) {
  return Math.trunc(Math.max(Math.min(n, max), min));
}
__name(clampAndTruncate, "clampAndTruncate");
function rgb8(str, color) {
  return run(str, code([38, 5, clampAndTruncate(color)], 39));
}
__name(rgb8, "rgb8");
function bgRgb8(str, color) {
  return run(str, code([48, 5, clampAndTruncate(color)], 49));
}
__name(bgRgb8, "bgRgb8");
function rgb24(str, color) {
  if (typeof color === "number") {
    return run(
      str,
      code(
        [38, 2, color >> 16 & 255, color >> 8 & 255, color & 255],
        39
      )
    );
  }
  return run(
    str,
    code(
      [
        38,
        2,
        clampAndTruncate(color.r),
        clampAndTruncate(color.g),
        clampAndTruncate(color.b)
      ],
      39
    )
  );
}
__name(rgb24, "rgb24");
function bgRgb24(str, color) {
  if (typeof color === "number") {
    return run(
      str,
      code(
        [48, 2, color >> 16 & 255, color >> 8 & 255, color & 255],
        49
      )
    );
  }
  return run(
    str,
    code(
      [
        48,
        2,
        clampAndTruncate(color.r),
        clampAndTruncate(color.g),
        clampAndTruncate(color.b)
      ],
      49
    )
  );
}
__name(bgRgb24, "bgRgb24");
var ANSI_PATTERN = new RegExp(
  [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TXZcf-nq-uy=><~]))"
  ].join("|"),
  "g"
);
function stripColor(string) {
  return stripAnsiCode(string);
}
__name(stripColor, "stripColor");
function stripAnsiCode(string) {
  return string.replace(ANSI_PATTERN, "");
}
__name(stripAnsiCode, "stripAnsiCode");

// mod.ts
var mod_exports6 = {};
__export(mod_exports6, {
  package: () => deno_default,
  readable: () => mod_exports,
  transform: () => mod_exports2,
  transport: () => mod_exports5,
  utils: () => utils_exports,
  writable: () => mod_exports3
});

// utils/is-plain-object.ts
function isPlainObject(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
}
__name(isPlainObject, "isPlainObject");

// readable/from.ts
var isTransformStream = /* @__PURE__ */ __name((input) => input instanceof TransformStream || "readable" in input && "writable" in input, "isTransformStream");
function from(input) {
  if (isTransformStream(input)) {
    return input.readable;
  }
  return readableFromIterable(input);
}
__name(from, "from");
var of = /* @__PURE__ */ __name((...args) => from(args), "of");
function readableFromIterable(iterable) {
  if (typeof iterable === "function") {
    iterable = iterable();
  }
  return new ReadableStream({
    async pull(controller) {
      for await (const chunk of iterable) {
        controller.enqueue(await chunk);
      }
      controller.close();
    }
  });
}
__name(readableFromIterable, "readableFromIterable");
function readableFromObject(input) {
  if (isPlainObject(input)) {
    const str = JSON.stringify(input, null, 2);
    const lines = str.split("\n");
    return readableFromIterable(lines);
  }
  console.log("readableFromObject", input);
  throw new TypeError(`Invalid input type: ${typeof input}`);
}
__name(readableFromObject, "readableFromObject");

// shims.ts
async function* ReadableStreamIterator() {
  const reader = this.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
__name(ReadableStreamIterator, "ReadableStreamIterator");
if (!("from" in ReadableStream)) {
  console.log("(shim) ReadableStream.from");
  Object.defineProperty(ReadableStream, "from", {
    value: from
  });
}
if (typeof ReadableStream.prototype[Symbol.asyncIterator] === "undefined") {
  console.log("(shim) ReadableStream.prototype[Symbol.asyncIterator]");
  Object.defineProperty(ReadableStream.prototype, Symbol.asyncIterator, {
    value: ReadableStreamIterator
  });
}

// readable/mod.ts
var mod_exports = {};
__export(mod_exports, {
  EOF: () => EOF,
  consume: () => consume,
  every: () => every,
  external: () => external,
  from: () => from,
  fromBody: () => fromBody,
  fromEvent: () => fromEvent,
  fromFetch: () => fromFetch,
  fromGenerator: () => fromGenerator,
  fromIterable: () => fromIterable,
  fromTimer: () => fromTimer,
  just: () => just,
  of: () => of,
  range: () => range,
  read: () => read,
  readable: () => readable2,
  readableFromIterable: () => readableFromIterable,
  readableFromObject: () => readableFromObject
});

// readable/from-body.ts
function fromBody(input) {
  const isRequest = input instanceof Request;
  const isResponse = input instanceof Response;
  if (isRequest || isResponse) {
    if (input.body) {
      return mod_exports.from(input.body).pipeThrough(mod_exports2.decode());
    }
  }
  throw new TypeError(`Invalid body type: ${typeof input.body}`);
}
__name(fromBody, "fromBody");

// readable/from-fetch.ts
async function fromFetch(input, init) {
  return fromBody(await fetch(new Request(input, init)));
}
__name(fromFetch, "fromFetch");

// readable/from-timer.ts
function fromTimer(ms, chunk = () => null) {
  let id;
  return new ReadableStream({
    start(controller) {
      id = setInterval(() => {
        controller.enqueue(chunk());
      }, ms);
    },
    cancel() {
      clearInterval(id);
    }
  });
}
__name(fromTimer, "fromTimer");
var every = fromTimer;

// readable/external.ts
var EOF = Symbol();
function external() {
  let next;
  const observable = new ReadableStream(
    {
      start(controller) {
        next = /* @__PURE__ */ __name((v) => {
          if (v === EOF) {
            return controller.close();
          }
          controller.enqueue(v);
        }, "next");
      }
    },
    { highWaterMark: 0 }
  );
  return { observable, next };
}
__name(external, "external");

// readable/from-event.ts
function fromEvent(el, name, options2) {
  let listener;
  return new ReadableStream(
    {
      start(controller) {
        listener = /* @__PURE__ */ __name((e) => controller.enqueue(e), "listener");
        el.addEventListener(name, listener, options2);
      },
      cancel() {
        el.removeEventListener(name, listener, options2);
      }
    },
    { highWaterMark: 0 }
  );
}
__name(fromEvent, "fromEvent");

// readable/from-iterable.ts
function fromIterable(it) {
  const { next, observable } = external();
  for (const v of it) {
    next(v);
  }
  next(EOF);
  return observable;
}
__name(fromIterable, "fromIterable");

// readable/from-generator.ts
function fromGenerator(f) {
  return fromIterable(f());
}
__name(fromGenerator, "fromGenerator");
function* x() {
  yield "one";
  yield "two";
}
__name(x, "x");
fromGenerator(x);

// readable/just.ts
function just(...vs) {
  const { next, observable } = external();
  for (const v of vs) {
    next(v);
  }
  next(EOF);
  return observable;
}
__name(just, "just");

// readable/range.ts
function range(start, end) {
  const { observable, next } = external();
  const len = Math.abs(end - start);
  const dir = Math.sign(end - start);
  for (let i = 0; i <= len; i++) {
    next(start + i * dir);
  }
  next(EOF);
  return observable;
}
__name(range, "range");

// readable/read.ts
var read = /* @__PURE__ */ __name((cb) => {
  return async (stream) => {
    for await (const chunk of stream) {
      await cb(chunk);
    }
  };
}, "read");

// readable/consume.ts
function consume(readable3, fn) {
  if (readable3 instanceof ReadableStream) {
    if (!fn)
      return (fn2) => consume(readable3, fn2);
    return (async () => {
      for await (const chunk of readable3)
        await fn(chunk);
    })();
  }
  if (typeof readable3 === "function") {
    return (input) => consume(input, readable3);
  }
}
__name(consume, "consume");

// readable/mod.ts
function readable2(start, rest) {
  return new ReadableStream({
    start,
    ...rest
  });
}
__name(readable2, "readable");

// writable/mod.ts
var mod_exports3 = {};
__export(mod_exports3, {
  RequestStream: () => RequestStream,
  post: () => post,
  response: () => response,
  subscribe: () => subscribe,
  write: () => write
});

// writable/subscribe.ts
function subscribe(f = () => {
}) {
  return new WritableStream(
    {
      write(chunk) {
        f(chunk);
      }
    },
    { highWaterMark: 1 }
  );
}
__name(subscribe, "subscribe");

// writable/post.ts
var RequestStream = class extends Request {
  static {
    __name(this, "RequestStream");
  }
  constructor(input, init) {
    const isReadableStream = init?.body instanceof ReadableStream;
    if (!isReadableStream) {
      throw new TypeError("Invalid body: " + typeof init?.body);
    }
    super(input, {
      method: "POST",
      // @ts-ignore .
      duplex: "half",
      ...init
    });
  }
};
function post(input, init) {
  const { readable: readable3, writable: writable3 } = new TransformStream();
  const request = new RequestStream(input, {
    ...init,
    body: readable3
  });
  fetch(request);
  return writable3;
}
__name(post, "post");
function response(init) {
  const { readable: readable3, writable: writable3 } = new TransformStream();
  const response2 = new Response(readable3, init);
  return { writable: writable3, response: response2 };
}
__name(response, "response");

// writable/write.ts
function write(writable3) {
  const writer = writable3.getWriter();
  return /* @__PURE__ */ __name(async function w(chunk) {
    await writer.ready;
    await writer.write(chunk);
  }, "w");
}
__name(write, "write");

// transform/mod.ts
var mod_exports2 = {};
__export(mod_exports2, {
  Uint8ArrayTransformStream: () => Uint8ArrayTransformStream,
  apply: () => apply,
  check: () => check,
  debounce: () => debounce,
  decode: () => decode,
  demo: () => demo,
  each: () => each,
  encode: () => encode,
  filter: () => filter,
  log: () => log2,
  lowerCase: () => lowerCase,
  map: () => map,
  newNumber: () => newNumber,
  pipe: () => pipe,
  sse: () => sse,
  tap: () => tap,
  to: () => to,
  toAlphaNum: () => toAlphaNum,
  toFixed: () => toFixed,
  toLine: () => toLine,
  toNumAlpha: () => toNumAlpha,
  toNumber: () => toNumber,
  toNumeric: () => toNumeric,
  toPrecision: () => toPrecision,
  toString: () => toString,
  toUint8Array: () => toUint8Array,
  toUpperCase: () => toUpperCase,
  transform: () => transform2,
  upperCase: () => upperCase
});

// transform/each.ts
function each(f) {
  return new TransformStream(
    {
      async transform(chunk, controller) {
        controller.enqueue(chunk);
        try {
          await f(chunk);
        } catch {
        }
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
__name(each, "each");

// transform/lower-case.ts
function lowerCase() {
  return new TransformStream({
    transform(chunk, controller) {
      return controller.enqueue(chunk.toLowerCase());
    }
  });
}
__name(lowerCase, "lowerCase");

// transform/map.ts
function map(f) {
  return new TransformStream(
    {
      async transform(chunk, controller) {
        controller.enqueue(await f(chunk));
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
__name(map, "map");

// utils.ts
var utils_exports = {};
__export(utils_exports, {
  PipelineStream: () => PipelineStream,
  ReadyState: () => ReadyState,
  _isTransformStream: () => _isTransformStream,
  colors: () => colors_exports,
  createRead: () => createRead,
  createWrite: () => createWrite,
  delay: () => delay,
  duplexFetch: () => duplexFetch,
  getStream: () => getStream,
  idKey: () => idKey,
  isDebug: () => isDebug,
  isTransformStream: () => isTransformStream2,
  log: () => log,
  mkId: () => mkId,
  mkRangeAsyncIterator: () => mkRangeAsyncIterator,
  mkRangeIterator: () => mkRangeIterator,
  putStream: () => putStream,
  swapObject: () => swapObject,
  tid: () => tid,
  uid: () => uid,
  valueFromKeyObject: () => valueFromKeyObject,
  waitForStatus: () => waitForStatus
});

// app/echo2.ts
var alphaMap = [
  "o",
  "i",
  "z",
  "e",
  "q",
  "f",
  "s",
  "x",
  "b",
  "n"
];
var num2alpha = /* @__PURE__ */ __name(() => transform.map(
  (value) => [...String(value)].map((num) => alphaMap[Number(num)]).join("")
), "num2alpha");
var echo2_default = {
  fetch(request) {
    return new Response(
      request.body?.pipeThrough(transform.decode()).pipeThrough(num2alpha()).pipeThrough(transform.upperCase()).pipeThrough(transform.encode())
    );
  },
  async start() {
    const stream = readable.fromTimer(1, Math.random).pipeThrough(transform.toString()).pipeThrough(transform.encode()).pipeThrough(new TransportStream("app/echo2")).pipeThrough(transform.decode()).pipeThrough(transform.map((value) => {
      document.querySelector("#output").textContent = value;
      return value;
    }));
    for await (const c of stream) {
    }
  }
};

// utils/Promised.ts
var Promised = class extends Promise {
  static {
    __name(this, "Promised");
  }
  #resolve;
  #reject;
  resolved = false;
  rejected = false;
  constructor(resolver) {
    const that = /* @__PURE__ */ Object.create(null);
    super(function(resolve, reject) {
      Object.assign(that, {
        resolve,
        reject
      });
    });
    this.#reject = (reason) => {
      this.rejected = true;
      that.reject(reason);
    };
    this.#resolve = (value) => {
      this.resolved = true;
      that.resolve(value);
    };
    if (resolver) {
      resolver(this.#resolve, this.#reject);
    }
  }
  resolve(value) {
    this.#resolve(value);
  }
  reject(reason) {
    this.#reject(reason);
  }
  get state() {
    return promiseState(this);
  }
};
Object.assign(globalThis, { Promised });
function promiseState(promise) {
  const pendingState = { status: "pending" };
  return Promise.race([promise, pendingState]).then(
    (value) => value === pendingState ? value : { status: "fulfilled", value },
    (reason) => ({ status: "rejected", reason })
  );
}
__name(promiseState, "promiseState");

// app/echo1.ts
var Instance = class {
  static {
    __name(this, "Instance");
  }
  postRequest;
  postResponse;
  headStream = createHeadStream();
};
var headers = {
  "cache-control": "no-cache",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "*",
  "access-control-allow-headers": "*",
  "access-control-max-age": "100",
  // sse
  "content-type": "text/event-stream"
};
function createHeadStream() {
  const t = new TransformStream();
  const body = mod_exports2.encode(t.readable);
  const write2 = mod_exports3.write(t.writable);
  return { body, write: (chunk) => write2(chunk + "\n") };
}
__name(createHeadStream, "createHeadStream");
var instances = /* @__PURE__ */ new Map();

// app/defineStreamHandler.ts
function defineStreamHandler(handler) {
  return /* @__PURE__ */ __name(async function handle(request, info) {
    const url = new URL(request.url);
    const id = request.headers.get(idKey) || url.searchParams.get(idKey);
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: { ...headers, [idKey]: id || "" } });
    }
    if (!id) {
      throw new TypeError(`Missing "${idKey}"`);
    }
    if (!instances.has(id)) {
      instances.set(id, new Instance());
    }
    const instance = instances.get(id);
    console.log(
      "[" + request.method + "] " + request.url + " id=" + id,
      instances.size
    );
    request.signal.addEventListener("abort", () => {
      if (request.method === "POST") {
        instance.postRequest = void 0;
      }
      if (request.method === "GET") {
        instances.delete(id);
        console.log(
          request.method + " " + request.url,
          String(request.signal.reason)
        );
        instance.postResponse?.resolve(new Response("Wazzup", { headers }));
      }
    });
    if (request.headers.has("transport-status")) {
      instance.headStream.write(request.headers.get("transport-status"));
    }
    if (request.method === "HEAD") {
      return new Response(instance.headStream.body, {
        status: 200,
        headers: {
          ...headers,
          [idKey]: id
        }
      });
    }
    if (request.method === "POST") {
      instance.postRequest = request;
      instance.postResponse = new Promised();
      return instance.postResponse;
    }
    if (request.method === "GET") {
      const response2 = await handler(instance.postRequest || request, info);
      for (const [key, value] of new Headers(headers)) {
        response2.headers.set(key, value);
      }
      response2.headers.set(idKey, id);
      return response2;
    }
    return new Response("Bad request!!!", { status: 400 });
  }, "handle");
}
__name(defineStreamHandler, "defineStreamHandler");

// utils.ts
var idKey = "transport-id";
var demoFetch = defineStreamHandler(echo2_default.fetch);
function fetch2(input, init) {
  const request = input instanceof Request ? input : new Request(input, init);
  return demoFetch(request);
}
__name(fetch2, "fetch");
var isDebug = /* @__PURE__ */ __name(() => typeof Deno !== "undefined" ? Deno.env.get("DEBUG") === "true" : Boolean(Reflect.get(globalThis, "DEBUG")), "isDebug");
Object.assign(globalThis, { isDebug });
console.log(
  green("(utils) DEBUG") + "=" + white(isDebug() + "")
);
function mkId(key = "abcdefghkl") {
  if (key.length !== 10) {
    throw new TypeError(
      `Key format error, required 10 unique chars, got: "${key}" (len=${key.length})`
    );
  }
  const alphaMap3 = [...key];
  return (value) => [...String(value)].map((num) => alphaMap3[Number(num)]).join("");
}
__name(mkId, "mkId");
var tid = mkId("5aksj3hg7e".toUpperCase());
var uid = /* @__PURE__ */ __name(() => tid(Math.random().toString().split(".").pop()), "uid");
async function waitForStatus(request, status, options2 = { retry: 10 }) {
  if (!request.headers.has(idKey)) {
    throw new TypeError(`Header "${idKey}" missing`);
  }
  const promise = new Promised();
  const response2 = await fetch2(request);
  const body = response2.body;
  const stream = body.pipeThrough(mod_exports2.decode());
  const read2 = mod_exports.read((_status) => {
    const isOk = String(_status).trim() === String(status).trim();
    console.log(
      "(waitForStatus)",
      request.method,
      request.url,
      status,
      _status,
      isOk
    );
    if (isOk && !promise.resolved) {
      promise.resolved = true;
      promise.resolve(_status);
    }
  });
  read2(stream);
  return promise;
}
__name(waitForStatus, "waitForStatus");
async function duplexFetch(input, init) {
  const id = uid();
  const { body, ...rest } = init || {};
  const headers2 = Object.assign(/* @__PURE__ */ Object.create(null), init?.headers, {
    [idKey]: id
  });
  const ready = waitForStatus(
    new Request(input, { method: "HEAD", headers: headers2 }),
    "incoming"
  );
  fetch2(input, {
    // @ts-ignore .
    duplex: "half",
    method: "POST",
    ...rest,
    headers: {
      ...headers2,
      "transport-status": "incoming"
    },
    body
  });
  await ready;
  return fetch2(input, {
    ...rest,
    headers: {
      ...headers2,
      "transport-status": "outgoing"
    }
  });
}
__name(duplexFetch, "duplexFetch");
async function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
__name(delay, "delay");
var ReadyState = /* @__PURE__ */ ((ReadyState2) => {
  ReadyState2[ReadyState2["CONNECTING"] = 0] = "CONNECTING";
  ReadyState2[ReadyState2["INCOMING"] = 1] = "INCOMING";
  ReadyState2[ReadyState2["OUTGOING"] = 2] = "OUTGOING";
  ReadyState2[ReadyState2["OPEN"] = 3] = "OPEN";
  ReadyState2[ReadyState2["CLOSED"] = 4] = "CLOSED";
  ReadyState2[ReadyState2["ERRORED"] = 5] = "ERRORED";
  return ReadyState2;
})(ReadyState || {});
function* mkRangeIterator(start = 0, end = Infinity, step = 1) {
  let iterationCount = 0;
  for (let i = start; i < end; i += step) {
    iterationCount++;
    yield i;
  }
  return iterationCount;
}
__name(mkRangeIterator, "mkRangeIterator");
async function* mkRangeAsyncIterator(start = 0, end = Infinity, delay2 = 100) {
  let iterationCount = 0;
  for (let i = start; i < end; i += 1) {
    iterationCount++;
    yield await new Promise((resolve) => {
      setTimeout(() => resolve(i), delay2);
    });
  }
  return iterationCount;
}
__name(mkRangeAsyncIterator, "mkRangeAsyncIterator");
function log(_this, method, ...value) {
  if (!isDebug())
    return;
  const isIn = _this.constructor.name === "IncomingStream";
  const nameColor = isIn ? cyan : magenta;
  const nameBg = /* @__PURE__ */ __name((a) => a, "nameBg");
  console.log(
    gray(
      `${nameColor(
        nameBg(
          bold(_this.name) + "[" + _this.env + "] /" + italic(_this.url.pathname) + " "
        )
      )} ${brightWhite(bold(method))}(${brightYellow(_this.id) + ", " + brightGreen(_this.idx + "")}) ${blue("=>")}`
    ),
    ...value
  );
}
__name(log, "log");
async function getStream(url, transform3 = new TextDecoderStream()) {
  url = new URL(url, location.href);
  const abortController = new AbortController();
  const headers2 = new Headers();
  const request = new Request(url, {
    method: "GET",
    cache: "no-cache",
    // @ts-ignore ?
    signal: abortController.signal,
    headers: headers2
  });
  const response2 = await fetch2(request);
  const id = Number(response2.headers.get("duplex-id") || "0");
  url.hash = `#${id}`;
  if (!response2.body) {
    throw new Error(`Response body`);
  }
  const readable3 = response2.body.pipeThrough(transform3);
  return {
    url,
    id,
    request,
    response: response2,
    readable: readable3
  };
}
__name(getStream, "getStream");
function putStream(url, transform3 = new TextEncoderStream()) {
  url = new URL(url, location.href);
  const { writable: writable3, readable: readable3 } = transform3;
  const [readable1, readable22] = readable3.tee();
  const abortController = new AbortController();
  const headers2 = new Headers();
  const id = Number(url.hash.slice(1) || "0");
  if (id) {
    headers2.set("duplex-id", String(id));
  }
  const request = new Request(url, {
    method: "PUT",
    body: readable1,
    cache: "no-cache",
    // @ts-ignore ?
    duplex: "half",
    signal: abortController.signal,
    headers: headers2
  });
  const response2 = fetch2(request);
  response2.then(async (response3) => {
    if (response3.ok) {
      const message2 = await response3.text();
      console.log("[closed]", message2);
      return;
    }
    const status = response3.status;
    const message = await response3.text();
    throw new Error(`Request failed: ${message}`, { cause: status });
  }).catch((error) => {
    console.warn(error.name, error.cause, error.message);
  });
  const o = {
    id,
    writable: writable3,
    readable: readable3,
    readable1,
    readable2: readable22,
    headers: headers2,
    request,
    response: response2,
    abortController
  };
  return o;
}
__name(putStream, "putStream");
function createRead(readable3, cb) {
  const reader = readable3 instanceof ReadableStream ? readable3.getReader() : readable3.readable.getReader();
  async function read2(cb2) {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          return;
        }
        cb2(value);
      }
    } finally {
      reader.releaseLock();
    }
  }
  __name(read2, "read");
  return read2(cb);
}
__name(createRead, "createRead");
function createWrite(writable3) {
  const writer = writable3 instanceof WritableStream ? writable3.getWriter() : writable3.writable.getWriter();
  Object.assign(write2, { writer });
  async function write2(chunk) {
    await writer.ready;
    await writer.write(chunk);
  }
  __name(write2, "write");
  return write2;
}
__name(createWrite, "createWrite");
var swapObject = /* @__PURE__ */ __name((obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k])), "swapObject");
var valueFromKeyObject = /* @__PURE__ */ __name((obj) => Object.fromEntries(Object.entries(obj).map(([k, _v]) => [k, k])), "valueFromKeyObject");
var _isTransformStream = /* @__PURE__ */ __name((input) => typeof input === "object" && Object.hasOwn(input, "writable") && Object.hasOwn(input, "readable"), "_isTransformStream");
var isTransformStream2 = /* @__PURE__ */ __name((a) => typeof a === "object" && "readable" in a, "isTransformStream");
var PipelineStream = class {
  constructor(transformers, writableStrategy, readableStrategy) {
    this.transformers = transformers;
    const [first, ...rest] = this.transformers;
    this.writable = first.writable;
    this.readable = rest.reduce(
      (readable3, transform3) => readable3.pipeThrough(transform3),
      first.readable
    );
  }
  static {
    __name(this, "PipelineStream");
  }
  readable;
  writable;
};

// transform/pipe.ts
var transform2 = /* @__PURE__ */ __name((transform3) => (input) => {
  return input.pipeThrough(transform3);
}, "transform");
function pipe(mapper) {
  const streamMapper = /* @__PURE__ */ __name((input) => isTransformStream2(mapper) ? transform2(mapper)(input) : mapper(input), "streamMapper");
  if (isTransformStream2(mapper)) {
    Object.defineProperties(streamMapper, {
      readable: {
        get: () => mapper.readable,
        enumerable: true
      },
      writable: {
        get: () => mapper.writable,
        enumerable: true
      }
    });
  }
  streamMapper.pipe = (mapper2) => {
    return pipe((input) => {
      const nextStream = streamMapper(input);
      return isTransformStream2(mapper2) ? transform2(mapper2)(nextStream) : mapper2(nextStream);
    });
  };
  return streamMapper;
}
__name(pipe, "pipe");

// transform/tap.ts
function tap(f) {
  return each(f);
}
__name(tap, "tap");

// transform/text.ts
function encode(input) {
  return input ? input.pipeThrough(new TextEncoderStream()) : new TextEncoderStream();
}
__name(encode, "encode");
function decode(input) {
  return input ? input.pipeThrough(new TextDecoderStream()) : new TextDecoderStream();
}
__name(decode, "decode");

// transform/upper-case.ts
function upperCase() {
  return new TransformStream({
    transform(chunk, controller) {
      return controller.enqueue(chunk.toUpperCase());
    }
  });
}
__name(upperCase, "upperCase");

// transform/log.ts
function log2(tag = "") {
  return new TransformStream(
    {
      start() {
        console.warn(tag, "started");
      },
      async transform(chunk, controller) {
        controller.enqueue(chunk);
        console.log(tag, await chunk);
      },
      async cancel(reason) {
        await Promise.resolve(console.warn(tag, "canceled", reason));
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
__name(log2, "log");

// transform/to.ts
var to = /* @__PURE__ */ __name((func) => map(func), "to");
var newNumber = /* @__PURE__ */ __name((input) => new Number(input), "newNumber");
var toNumeric = /* @__PURE__ */ __name(() => to(Number), "toNumeric");
var toNumber = /* @__PURE__ */ __name(() => to((input) => new Number(input)), "toNumber");
var toString = /* @__PURE__ */ __name(() => to(String), "toString");
var toUpperCase = /* @__PURE__ */ __name(() => to((val) => val.toUpperCase()), "toUpperCase");
var toLine = /* @__PURE__ */ __name((separator = "\n") => to((i) => i.concat(separator)), "toLine");
var toFixed = /* @__PURE__ */ __name((fd) => {
  const fn = /* @__PURE__ */ __name((fd2) => (input) => new Number(input).toFixed(fd2), "fn");
  const mapper = fn(fd);
  return to(mapper);
}, "toFixed");
var toPrecision = /* @__PURE__ */ __name((precision) => {
  const fn = /* @__PURE__ */ __name((fd) => (input) => new Number(input).toPrecision(fd), "fn");
  const mapper = fn(precision);
  return to(mapper);
}, "toPrecision");
var alphaMap2 = [
  "o",
  // = 0
  "i",
  // = 1
  "2",
  // = 2
  "e",
  // = 3
  "q",
  // = 4
  "f",
  // = 5
  "s",
  // = 6
  "x",
  // = 7
  "6",
  // = 8
  "n",
  // = 9
  "."
  // = .
];
var toNumAlpha = /* @__PURE__ */ __name(() => map(
  (value) => [...String(value)].map((num) => alphaMap2[Number(num)]).join("")
), "toNumAlpha");
var toAlphaNum = /* @__PURE__ */ __name(() => map(
  (value) => Number([...String(value)].map((char) => alphaMap2.indexOf(char)).join(""))
), "toAlphaNum");
function demo() {
  let id = 0;
  return new ReadableStream({
    start(ctrl) {
      id = setInterval(() => {
        ctrl.enqueue(Number.MAX_SAFE_INTEGER / Math.random());
      }, 1);
      console.log("started", id);
    },
    cancel() {
      clearInterval(id);
      console.log("cancel", id);
    }
  }).pipeThrough(toPrecision(20)).pipeThrough(toNumAlpha()).pipeThrough(toUpperCase()).pipeThrough(toLine("\n")).pipeThrough(
    map((val) => {
      document.body.innerHTML = `<h1 style="margin:20px"><code>${val}</code></h1>`;
      return val;
    })
  );
}
__name(demo, "demo");

// transform/to-uint8array.ts
var Uint8ArrayTransformStream = class extends TransformStream {
  static {
    __name(this, "Uint8ArrayTransformStream");
  }
  constructor() {
    const encoder2 = new TextEncoder();
    super({
      start() {
      },
      // required.
      async transform(chunk, controller) {
        chunk = await chunk;
        switch (typeof chunk) {
          case "object":
            if (chunk === null) {
              controller.terminate();
            } else if (ArrayBuffer.isView(chunk)) {
              controller.enqueue(
                new Uint8Array(
                  chunk.buffer,
                  chunk.byteOffset,
                  chunk.byteLength
                )
              );
            } else if (Array.isArray(chunk) && chunk.every((value) => typeof value === "number")) {
              controller.enqueue(new Uint8Array(chunk));
            } else if (typeof chunk.valueOf === "function" && chunk.valueOf() !== chunk) {
              this.transform(chunk.valueOf(), controller);
            } else if ("toJSON" in chunk) {
              this.transform(JSON.stringify(chunk), controller);
            }
            break;
          case "symbol":
            controller.error("Cannot send a symbol as a chunk part");
            break;
          case "undefined":
            controller.error("Cannot send undefined as a chunk part");
            break;
          default:
            controller.enqueue(encoder2.encode(String(chunk)));
            break;
        }
      },
      flush() {
      }
    });
  }
};
function toUint8Array() {
  return new Uint8ArrayTransformStream();
}
__name(toUint8Array, "toUint8Array");

// transform/debounce.ts
function debounce(ms) {
  let timeout;
  let timeoutP;
  let savedChunk;
  return new TransformStream(
    {
      transform(chunk, controller) {
        savedChunk = chunk;
        if (timeout > 0) {
          clearTimeout(timeout);
        }
        timeoutP = new Promise((resolve) => {
          timeout = setTimeout(() => {
            controller.enqueue(savedChunk);
            timeout = 0;
            resolve(void 0);
          }, ms);
        });
      },
      async flush() {
        await timeoutP;
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
__name(debounce, "debounce");

// transform/filter.ts
function filter(f) {
  return new TransformStream(
    {
      transform(chunk, controller) {
        if (f(chunk)) {
          controller.enqueue(chunk);
        }
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
__name(filter, "filter");

// transform/check.ts
function check(f, message) {
  return new TransformStream(
    {
      transform(chunk, controller) {
        if (!f(chunk)) {
          throw new TypeError(
            `Check Failed: ${message || "type: " + typeof chunk + " validate func: " + String(f)}`
          );
        }
        controller.enqueue(chunk);
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
__name(check, "check");

// transform/apply.ts
function apply(transformer) {
  return new TransformStream(
    {
      async transform(chunk, controller) {
        try {
          await transformer(chunk, controller);
        } catch (e) {
          controller.error(e);
        }
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
__name(apply, "apply");

// transport/pipe.ts
function pipe2(...transforms) {
  return (readable3) => {
    const ts = transforms.map(
      (o) => !isTransformStream2(o) ? new TransformStream(o) : o
    );
    const result = ts.reduce((r, t) => r.pipeThrough(t), readable3);
    return result;
  };
}
__name(pipe2, "pipe");

// transport/PipeStream.ts
var PipeStream = class {
  static {
    __name(this, "PipeStream");
  }
  constructor(...transformers) {
    const { writable: writable3, readable: readable3 } = new TransformStream();
    const pipeline = transformers.filter(
      Boolean
    );
    this.readable = pipe2(...pipeline)(readable3);
    this.writable = writable3;
    this.transformers = pipeline;
  }
  async write(message) {
    this.writer = this.writer || this.writable.getWriter();
    await this.writer.ready;
    await this.writer.write(message);
  }
  async read(cb) {
    for await (const chunk of this.readable) {
      await cb(chunk);
    }
  }
};

// transport/ess/parser.ts
function createParser(onParse) {
  let isFirstChunk;
  let buffer;
  let startingPosition;
  let startingFieldLength;
  let eventId;
  let eventName;
  let data;
  let comment;
  let to2;
  let rest = {};
  let result;
  reset2();
  Object.defineProperty(feed, "buffer", { get: () => buffer });
  feed.reset = reset2;
  return { push: feed, reset: reset2 };
  function reset2() {
    isFirstChunk = true;
    buffer = "";
    startingPosition = 0;
    startingFieldLength = -1;
    result = void 0;
    eventId = void 0;
    eventName = void 0;
    comment = void 0;
    data = void 0;
    to2 = void 0;
    rest = {};
  }
  __name(reset2, "reset");
  function feed(chunk = "") {
    if (result) {
      reset2();
    }
    buffer = buffer ? buffer + chunk : chunk;
    if (isFirstChunk && hasBom(buffer)) {
      buffer = buffer.slice(BOM.length);
    }
    isFirstChunk = false;
    const length = buffer.length;
    let position = 0;
    let discardTrailingNewline = false;
    while (position < length) {
      if (discardTrailingNewline) {
        if (buffer[position] === "\n") {
          ++position;
        }
        discardTrailingNewline = false;
      }
      let lineLength = -1;
      let fieldLength = startingFieldLength;
      let character;
      for (let index = startingPosition; lineLength < 0 && index < length; ++index) {
        character = buffer[index];
        if (character === ":" && fieldLength < 0) {
          fieldLength = index - position;
        } else if (character === "\r") {
          discardTrailingNewline = true;
          lineLength = index - position;
        } else if (character === "\n") {
          lineLength = index - position;
        }
      }
      if (lineLength < 0) {
        startingPosition = length - position;
        startingFieldLength = fieldLength;
        break;
      } else {
        startingPosition = 0;
        startingFieldLength = -1;
      }
      parseEventStreamLine(buffer, position, fieldLength, lineLength);
      position += lineLength + 1;
    }
    if (position === length) {
      buffer = "";
    } else if (position > 0) {
      buffer = buffer.slice(position);
    }
    return result || feed;
  }
  __name(feed, "feed");
  function parseEventStreamLine(lineBuffer, index, fieldLength, lineLength) {
    if (lineLength === 0) {
      result = {
        type: "event",
        id: eventId,
        to: to2,
        // @ts-ignore >
        event: eventName || void 0,
        comment,
        data: data ? data.slice(0, -1) : data,
        // remove trailing newline,
        ...rest
      };
      if (typeof onParse === "function") {
        onParse(result);
      }
      to2 = void 0;
      data = void 0;
      comment = void 0;
      eventId = void 0;
      eventName = void 0;
      return;
    }
    const noValue = fieldLength < 0;
    const field = lineBuffer.slice(
      index,
      index + (noValue ? lineLength : fieldLength)
    );
    let step = 0;
    if (noValue) {
      step = lineLength;
    } else if (lineBuffer[index + fieldLength + 1] === " ") {
      step = fieldLength + 2;
    } else {
      step = fieldLength + 1;
    }
    const position = index + step;
    const valueLength = lineLength - step;
    const value = lineBuffer.slice(position, position + valueLength).toString();
    if (field === "data") {
      if (!data) {
        data = "";
      }
      data += value ? `${value}
` : "\n";
    } else if (field === "event") {
      eventName = value;
    } else if (field === "") {
      comment = value;
    } else if (field === "id" && !value.includes("\0")) {
      eventId = value;
    } else if (field === "to") {
      to2 = value === "*" ? value : Number(value);
    } else if (field === "retry") {
      const retry = parseInt(value, 10);
      if (!Number.isNaN(retry)) {
        if (typeof onParse === "function") {
          onParse({ type: "reconnect-interval", value: retry });
        } else {
          rest.type = "reconnect-interval";
          rest.retry = retry;
        }
      }
    } else {
      rest[field] = value;
    }
  }
  __name(parseEventStreamLine, "parseEventStreamLine");
}
__name(createParser, "createParser");
var BOM = [239, 187, 191];
function hasBom(buffer) {
  return BOM.every(
    (charCode, index) => buffer.charCodeAt(index) === charCode
  );
}
__name(hasBom, "hasBom");

// transport/ess/parse.ts
function parse(input) {
  const result = createParser().push(input);
  if (typeof result === "function") {
    throw new TypeError(`Parse failed`);
  }
  return result;
}
__name(parse, "parse");

// transport/ess/stringify.ts
var NEWLINE_REGEXP = /\r\n|\r|\n/;
function assertHasNoNewline(value, varName) {
  if (value.match(NEWLINE_REGEXP) !== null) {
    throw new RangeError(`${varName} cannot contain a newline`);
  }
}
__name(assertHasNoNewline, "assertHasNoNewline");
function stringify(message) {
  const lines = [];
  if (message.comment) {
    assertHasNoNewline(message.comment, "`message.comment`");
    lines.push(`:${message.comment}`);
  }
  if (message.event) {
    assertHasNoNewline(message.event, "`message.event`");
    lines.push(`event:${message.event}`);
  }
  if (message.data) {
    message.data.split(NEWLINE_REGEXP).forEach(
      (line) => lines.push(`data:${line}`)
    );
  }
  if (message.id) {
    assertHasNoNewline(message.id.toString(), "`message.id`");
    lines.push(`id:${message.id}`);
  }
  if (message.retry)
    lines.push(`retry:${message.retry}`);
  return lines.join("\n") + "\n\n";
}
__name(stringify, "stringify");

// transport/ess/EventSourceMessage.ts
var EventSourceMessage = class {
  static {
    __name(this, "EventSourceMessage");
  }
  constructor(input, transform3) {
    if (typeof input === "string") {
      const rawInput = input;
      input = parse(input);
      Object.defineProperty(this, "raw", {
        get() {
          return rawInput;
        }
      });
    }
    Object.defineProperty(this, "type", {
      get: () => typeof this.retry !== "undefined" ? "reconnect-interval" : "event"
    });
    for (const key of ["comment", "event", "data", "id", "retry"]) {
      if (input && typeof input[key] !== "undefined") {
        Object.defineProperty(this, key, {
          value: input[key],
          enumerable: true,
          writable: true,
          configurable: true
        });
      }
    }
    if (transform3) {
      Object.assign(this, transform3(this));
    }
  }
  toString() {
    return stringify(this);
  }
};

// transport/ess/EventSourceDecoderStream.ts
var textDecoder = new TextDecoder();
var EventSourceDecoderStream = class extends PipeStream {
  static {
    __name(this, "EventSourceDecoderStream");
  }
  constructor() {
    const instance = /* @__PURE__ */ Object.create(null);
    super(
      {
        transform(chunk, controller) {
          controller.enqueue(
            chunk instanceof Uint8Array ? textDecoder.decode(chunk) : chunk
          );
        }
      },
      {
        start(controller) {
          Object.assign(instance, {
            controller,
            parser: createParser(
              (message) => instance.controller.enqueue(new EventSourceMessage(message))
            )
          });
        },
        transform(chunk) {
          instance.parser.push(chunk);
        }
      }
    );
  }
};

// transport/ess/EventSourceEncoderStream.ts
var EventSourceEncoderStream = class extends PipeStream {
  static {
    __name(this, "EventSourceEncoderStream");
  }
  constructor() {
    super(
      {
        transform(message, controller) {
          controller.enqueue(stringify(message));
        }
      },
      new TextEncoderStream()
    );
  }
};

// transform/sse.ts
var encoder = /* @__PURE__ */ __name(() => new EventSourceEncoderStream(), "encoder");
var decoder = /* @__PURE__ */ __name(() => new EventSourceDecoderStream(), "decoder");
var sse = { encoder, decoder };

// transport/mod.ts
var mod_exports5 = {};
__export(mod_exports5, {
  App: () => App,
  EventSourceTransporter: () => EventSourceTransporter,
  JSONDecoderStream: () => JSONDecoderStream,
  JSONEncoderStream: () => JSONEncoderStream,
  JSONTransporter: () => JSONTransporter,
  Mime: () => Mime,
  PipeStream: () => PipeStream,
  RequestDuplex: () => RequestDuplex,
  RequestStream: () => RequestStream2,
  RequestTransformerStream: () => RequestTransformerStream,
  Route: () => Route,
  Router: () => Router,
  STREAM_ID_KEY: () => STREAM_ID_KEY,
  STREAM_TYPE: () => STREAM_TYPE,
  STREAM_TYPE_KEY: () => STREAM_TYPE_KEY,
  TextTransportStream: () => TextTransportStream,
  TextTransporter: () => TextTransporter,
  TransportStream: () => TransportStream2,
  Transporter: () => Transporter2,
  counterReadableStream: () => counterReadableStream,
  del: () => del,
  duplex: () => duplex,
  ess: () => mod_exports4,
  fetchDuplex: () => fetchDuplex,
  fetchStream: () => fetchStream,
  fromResponse: () => fromResponse,
  get: () => get,
  options: () => options,
  pipe: () => pipe2,
  pipeTo: () => pipeTo,
  post: () => post2,
  put: () => put,
  requestStreamDemo: () => requestStreamDemo,
  rwStream: () => rwStream,
  send: () => send,
  tapp: () => tapp,
  toRequest: () => toRequest
});

// transport/RoutesInit.ts
var METHOD = /* @__PURE__ */ ((METHOD2) => {
  METHOD2["GET"] = "GET";
  METHOD2["HEAD"] = "HEAD";
  METHOD2["POST"] = "POST";
  METHOD2["PUT"] = "PUT";
  METHOD2["DELETE"] = "DELETE";
  METHOD2["OPTIONS"] = "OPTIONS";
  METHOD2["PATCH"] = "PATCH";
  METHOD2["ANY"] = "ANY";
  return METHOD2;
})(METHOD || {});
var METHOD_ARR = Object.entries(METHOD).map(
  ([, value]) => value
);

// transport/handle.ts
var STREAM_ID_KEY = "stream-id";
var STREAM_TYPE_KEY = "stream-type";
var STREAM_TYPE = /* @__PURE__ */ ((STREAM_TYPE2) => {
  STREAM_TYPE2["REQUEST"] = "REQUEST";
  STREAM_TYPE2["RESPONSE"] = "RESPONSE";
  return STREAM_TYPE2;
})(STREAM_TYPE || {});
var pmap = /* @__PURE__ */ new Map();
var qmap = /* @__PURE__ */ new Map();
Object.assign(duplex, { pmap, qmap });
function duplex(handler, unhandled) {
  async function duplexStream(request, context = /* @__PURE__ */ Object.create(null)) {
    const id = request.headers.get(STREAM_ID_KEY);
    if (!id) {
      console.log(`(duplex) !id ${request.url}`);
      return unhandled ? unhandled(request, context) : new Response(null, { status: 400 });
    }
    const streamType = request.headers.get(
      STREAM_TYPE_KEY
    );
    const isHalfDuplex = !!id && !!streamType && !["GET" /* GET */, "HEAD" /* HEAD */].includes(request.method);
    if (!isHalfDuplex) {
      console.log("!isHalfDuplexd");
      return handler(request, context);
    }
    if (id && !pmap.has(id)) {
      pmap.set(id, new Promised());
      qmap.set(id, new Promised());
    }
    if (streamType === "REQUEST" /* REQUEST */) {
      const getResponse = pmap.get(id);
      const putResponse = qmap.get(id);
      getResponse.resolve(await handler(request, context));
      return putResponse;
    }
    if (streamType === "RESPONSE" /* RESPONSE */) {
      return pmap.get(id);
    }
    return unhandled ? unhandled(request, context) : new Response(null, { status: 400 });
  }
  __name(duplexStream, "duplexStream");
  return duplexStream;
}
__name(duplex, "duplex");

// transport/RequestDuplex.ts
var isDenoEnv = Reflect.has(globalThis, "Deno");
var isStreamingBodyRequest = /* @__PURE__ */ __name((init) => init?.body instanceof ReadableStream && init.method !== "GET" && init.method !== "HEAD", "isStreamingBodyRequest");
var RequestDuplex = class extends Request {
  static {
    __name(this, "RequestDuplex");
  }
  /**
   * Creates a new instance of RequestDuplex.
   * @param input - The URL or RequestInfo object.
   * @param init - The optional RequestInit object.
   */
  constructor(input, init) {
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
      this.headers.set(STREAM_TYPE_KEY, "REQUEST" /* REQUEST */);
      this[STREAM_TYPE_KEY] = "REQUEST" /* REQUEST */;
    } else {
      if (this.headers.has(STREAM_ID_KEY)) {
        this.headers.set(STREAM_TYPE_KEY, "RESPONSE" /* RESPONSE */);
        this[STREAM_TYPE_KEY] = "RESPONSE" /* RESPONSE */;
      }
    }
  }
};

// playground/useCors.ts
function useCors(response2) {
  response2.headers.set("cache-control", "no-cache");
  response2.headers.set("access-control-allow-origin", "*");
  response2.headers.set("access-control-allow-methods", "*");
  response2.headers.set("access-control-allow-headers", "*");
  response2.headers.set("access-control-max-age", "100");
  return response2;
}
__name(useCors, "useCors");

// transport/fetchDuplex.ts
var fetchStream = /* @__PURE__ */ __name(async (input, rs, init) => {
  if (rs instanceof Promise) {
    rs = await rs;
  }
  const reqBody = rs ? rs instanceof ReadableStream ? rs.pipeThrough(mod_exports2.toUint8Array()) : rs.body instanceof ReadableStream ? rs.body.pipeThrough(mod_exports2.toUint8Array()) : readable.of(rs).pipeThrough(mod_exports2.toUint8Array()) : null;
  return fetchDuplex(input, {
    ...init,
    method: reqBody ? "POST" : "GET",
    body: reqBody
  });
}, "fetchStream");
function fetchDuplex(input, init) {
  const fetch3 = fetchDuplex.fetch || globalThis.fetch;
  const inputUrl = new URL(
    typeof input === "string" ? input : input instanceof RequestDuplex ? input.url : String(input || globalThis.location),
    String(globalThis.location)
  );
  const request = input instanceof RequestDuplex ? input : new RequestDuplex(inputUrl, init);
  if (request.duplex === "half") {
    const request2 = new RequestDuplex(request.url, {
      method: request.method,
      headers: {
        ...Object.fromEntries(request.headers.entries()),
        [STREAM_TYPE_KEY]: "RESPONSE" /* RESPONSE */
      }
    });
    fetch3(request);
    return fetch3(
      request2
    );
  } else {
    console.log("(duplex/ call fetch(request))");
    return fetch3(request);
  }
}
__name(fetchDuplex, "fetchDuplex");
globalThis.fetch.duplex = fetchDuplex;
globalThis.fetch.stream = fetchStream;
fetchDuplex.stream = fetchStream;

// transport/pipeTo.ts
var pipeTo = /* @__PURE__ */ __name((destination) => (source) => source instanceof ReadableStream ? source.pipeTo(
  destination instanceof WritableStream ? destination : destination.writable
) : source.body.pipeTo(
  destination instanceof WritableStream ? destination : destination.writable
), "pipeTo");

// transport/Transporter.ts
var RequestTransformerStream = class {
  static {
    __name(this, "RequestTransformerStream");
  }
  writable;
  readable;
  writer;
  request;
  constructor(input, transformers = []) {
    const ps = transformers instanceof PipeStream ? transformers : new PipeStream(...transformers);
    if (input instanceof Request) {
      input.body?.pipeTo(ps.writable);
      this.request = input;
    } else {
      this.request = new RequestDuplex(input, {
        body: ps.readable,
        method: "POST",
        //@ts-ignore .
        duplex: "half"
      });
    }
    this.readable = ps.readable;
    this.writable = ps.writable;
  }
  pipeTo(destination) {
    return this.readable.pipeTo(destination);
  }
  async write(message) {
    this.writer = this.writer || this.writable.getWriter();
    await this.writer.ready;
    await this.writer.write(message);
  }
  async read(cb) {
    for await (const chunk of this.readable) {
      await cb(chunk);
    }
  }
};
var Transporter2 = class extends Response {
  static {
    __name(this, "Transporter");
  }
  writable;
  readable;
  finished;
  closed = new Promised();
  static encoder = () => void 0;
  static decoder = () => void 0;
  constructor(input, requestTransformers = [], response2) {
    const decoder2 = new.target.decoder();
    const encoder2 = new.target.encoder();
    if (input instanceof Request) {
      const responseInit = response2;
      const ps = new PipeStream(
        decoder2,
        ...requestTransformers,
        encoder2
      );
      const readable3 = input.body ? input.body.pipeThrough(ps) : ps.readable;
      const writable3 = ps.writable;
      super(readable3, responseInit);
      this.writable = writable3;
      this.readable = readable3;
      useCors(this);
    } else {
      const responseTransformers = response2 || [];
      const reqTransform = new PipeStream(...requestTransformers, encoder2);
      const resTransform = new PipeStream(decoder2, ...responseTransformers);
      super(
        resTransform.readable
        /** init */
      );
      this.writable = reqTransform.writable;
      this.readable = resTransform.readable;
      this.finished = fetchStream(input, reqTransform.readable).then(pipeTo(resTransform));
    }
  }
  async write(message) {
    this.writer = this.writer || this.writable.getWriter();
    await this.writer.ready;
    await this.writer.write(message);
  }
  async read(cb) {
    for await (const chunk of this.readable) {
      await cb(chunk);
    }
  }
  async close() {
    if (this.closed.rejected || this.closed.resolved) {
      throw new TypeError(
        `Already closed: ${this.closed.rejected ? "rejected" : this.closed.resolved ? "resolved" : "unknown"}`
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
};
Transporter2.demo = (u = "/upper") => {
  const ts = new PipeStream(
    new TextEncoderStream(),
    new Transporter2(u),
    new TextDecoderStream()
  );
  ts.read(console.log);
  ts.write("Hello World");
  return ts;
};

// transport/JSONTransporter.ts
var EOL = "\n";
var JSONEncoderStream = class extends TransformStream {
  static {
    __name(this, "JSONEncoderStream");
  }
  constructor() {
    super({
      transform(chunk, controller) {
        try {
          controller.enqueue(JSON.stringify(chunk) + EOL);
        } catch {
        }
      }
    });
  }
};
var JSONDecoderStream = class extends TransformStream {
  static {
    __name(this, "JSONDecoderStream");
  }
  constructor() {
    super({
      transform(chunk, controller) {
        let runningText = "";
        const objects = chunk.split(EOL);
        for (const obj of objects) {
          try {
            runningText += obj;
            const result = JSON.parse(runningText);
            controller.enqueue(result);
            runningText = "";
          } catch (_e) {
          }
        }
      }
    });
  }
};
var JSONTransporter = class extends Transporter2 {
  static {
    __name(this, "JSONTransporter");
  }
  static encoder() {
    return new PipeStream(
      new JSONEncoderStream(),
      new TextEncoderStream()
    );
  }
  static decoder() {
    return new PipeStream(
      new TextDecoderStream(),
      new JSONDecoderStream()
    );
  }
};
JSONTransporter.demo = (u = "/json") => {
  const ts = new JSONTransporter(u);
  ts.read(console.log);
  ts.write({ uid: "serebano", msg: "Anybody here?" });
  return ts;
};

// transport/RequestStream.ts
var RequestStream2 = class _RequestStream {
  static {
    __name(this, "RequestStream");
  }
  static fetch = (...args) => globalThis.fetch(...args);
  outgoing;
  incoming;
  response;
  /**
   * Fetches the request stream.
   * @param init - Optional request initialization options.
   * @returns A Promise that resolves to the response of the request.
   */
  async fetch(init) {
    if (this.incoming) {
      _RequestStream.fetch(this.outgoing, init);
      this.response = await _RequestStream.fetch(this.incoming, init);
    } else {
      this.response = await _RequestStream.fetch(this.outgoing, init);
    }
    return this.response;
  }
  /**
   * Creates a new instance of RequestStream.
   * @param input - The URL or Request object.
   * @param init - Optional request initialization options.
   */
  constructor(input, init) {
    this.outgoing = new RequestDuplex(input, init);
    this.incoming = this.outgoing.duplex === "half" ? new RequestDuplex(this.outgoing.url, {
      method: this.outgoing.method,
      headers: {
        ...Object.fromEntries(this.outgoing.headers.entries()),
        [STREAM_TYPE_KEY]: "RESPONSE" /* RESPONSE */
      }
    }) : void 0;
  }
  static demo = requestStreamDemo;
};
async function requestStreamDemo() {
  const enc = JSONTransporter.encoder();
  const dec = JSONTransporter.decoder();
  const req = new RequestStream2("/pipe1", {
    body: enc.readable,
    method: "put"
  });
  await req.fetch();
  req.response?.body?.pipeTo(dec.writable);
  const api = {
    // request/response
    outgoing: req.outgoing,
    incoming: req.incoming,
    response: req.response,
    // streams
    writable: enc.writable,
    readable: dec.readable,
    // methods
    write: enc.write.bind(enc),
    read: dec.read.bind(dec)
  };
  readable.consume(
    readable.of("foo", "bar", "baz").pipeThrough(
      new PipeStream(
        transform.map((msg) => ({ uid: "xxx", msg })),
        api
      )
    ),
    console.log
  );
  return api;
}
__name(requestStreamDemo, "requestStreamDemo");

// transport/TextTransporter.ts
var TextTransporter = class extends Transporter2 {
  static {
    __name(this, "TextTransporter");
  }
  static encoder = () => new TextEncoderStream();
  static decoder = () => new TextDecoderStream();
};
TextTransporter.demo = (u = "/upper") => {
  const ts = new TextTransporter(u);
  ts.read(console.log);
  ts.write("Hello World");
  return ts;
};

// transport/ess/mod.ts
var mod_exports4 = {};
__export(mod_exports4, {
  ESS: () => ESS,
  EventSourceDecoderStream: () => EventSourceDecoderStream,
  EventSourceEncoderStream: () => EventSourceEncoderStream,
  EventSourceMessage: () => EventSourceMessage,
  EventSourceStream: () => EventSourceStream
});

// transport/ess/EventSourceStream.ts
var EventSourceStream = class {
  static {
    __name(this, "EventSourceStream");
  }
  writable;
  readable;
  finished;
  closed;
  body;
  constructor(input, init) {
    const sseEncoder = new EventSourceEncoderStream();
    const sseDecoder = new EventSourceDecoderStream();
    this.writable = sseEncoder.writable;
    this.readable = sseDecoder.readable;
    this.body = sseEncoder.readable;
    this.closed = new Promised();
    if (input instanceof Request) {
      console.log("ess input from request");
      this.finished = input.body.pipeTo(sseDecoder.writable);
      this.response = (init2) => new Response(this.body, init2);
    } else {
      this.finished = fetchStream(input, this.body, init).then(pipeTo(sseDecoder.writable));
    }
  }
  async write(message) {
    this.writer = this.writer || this.writable.getWriter();
    await this.writer.ready;
    await this.writer.write(message);
  }
  async read(cb) {
    for await (const chunk of this.readable) {
      await cb(chunk);
    }
  }
  async close() {
    if (this.closed.rejected || this.closed.resolved) {
      throw new TypeError(
        `Already closed: ${this.closed.rejected ? "rejected" : this.closed.resolved ? "resolved" : "unknown"}`
      );
    }
    this.writer = this.writer || this.writable.getWriter();
    await this.writer.ready;
    await this.writer.close();
    this.closed.resolve(true);
  }
};
EventSourceStream.demo = () => {
  const ess2 = new EventSourceStream("/ess-2");
  ess2.read(console.log);
  ess2.write({
    data: "Demo"
  });
  return ess2;
};

// transport/ess/ESS.ts
var ESS = class {
  static {
    __name(this, "ESS");
  }
  static Message = EventSourceMessage;
  static EncoderStream = EventSourceEncoderStream;
  static DecoderStream = EventSourceDecoderStream;
  static Stream = EventSourceStream;
  static stringify = stringify;
  static parse = parse;
};

// transport/EventSourceTransporter.ts
var EventSourceTransporter = class extends Transporter2 {
  static {
    __name(this, "EventSourceTransporter");
  }
  static encoder = () => new EventSourceEncoderStream();
  static decoder = () => new EventSourceDecoderStream();
};
EventSourceTransporter.demo = (u = "/est-1") => {
  const ts = new EventSourceTransporter(u);
  ts.read(console.log);
  ts.write({ data: "hi es" });
  return ts;
};

// transport/TextTransportStream.ts
var TextTransportStream = class extends Response {
  constructor(request, transformer, init) {
    if (!request.body) {
      throw new TypeError(`Request.body missing`);
    }
    const {
      writable: writable3,
      readable: readable3
    } = new TransformStream(transformer);
    super(readable3.pipeThrough(new TextEncoderStream()), init);
    this.request = request;
    this.transformer = transformer;
    this.init = init;
    this.finished = request.body.pipeThrough(new TextDecoderStream()).pipeTo(writable3);
  }
  static {
    __name(this, "TextTransportStream");
  }
  finished;
};

// transport/TransportStream.ts
var TransportStream2 = class extends Response {
  // readable: ReadableStream<Uint8Array>;
  // finished: Promise<void>;
  constructor(request, transformers = [], init) {
    if (!request.body) {
      throw new TypeError(`Request.body missing`);
    }
    const readable3 = request.body.pipeThrough(new PipeStream(...transformers));
    super(readable3, init);
    this.request = request;
    this.transformers = transformers;
    this.init = init;
  }
  static {
    __name(this, "TransportStream");
  }
  static demo = demo2;
};
function demo2(request) {
  return new TransportStream2(request, [
    new TextDecoderStream(),
    {
      transform(chunk, ctrl) {
        ctrl.enqueue(chunk.toUpperCase());
      }
    },
    new TextEncoderStream()
  ], {
    status: 200
  });
}
__name(demo2, "demo");
function rwStream(stream) {
  readable.read(console.log)(stream.readable);
  return writable.write(stream.writable);
}
__name(rwStream, "rwStream");
var counterReadableStream = /* @__PURE__ */ __name((ms = 1e3, idx = 0) => {
  return readable.fromTimer(ms, () => idx >= 10 ? null : "Count: " + ++idx);
}, "counterReadableStream");
function toRequest(readable3) {
  return function(input, init) {
    return new RequestDuplex(
      input,
      {
        ...init,
        method: "POST",
        body: readable3.pipeThrough(transform.toUint8Array())
      }
    );
  };
}
__name(toRequest, "toRequest");
function fromResponse(response2) {
  if (response2.body) {
    return response2.body.pipeThrough(transform.decode()).pipeTo(writable.subscribe(console.log));
  } else {
    throw new TypeError(`Bad Response.body: ${typeof response2.body}`);
  }
}
__name(fromResponse, "fromResponse");

// utils/app.ts
var mergePath = /* @__PURE__ */ __name((...paths) => {
  let p = "";
  let endsWithSlash = false;
  for (let path of paths) {
    if (p[p.length - 1] === "/") {
      p = p.slice(0, -1);
      endsWithSlash = true;
    }
    if (path[0] !== "/") {
      path = `/${path}`;
    }
    if (path === "/" && endsWithSlash) {
      p = `${p}/`;
    } else if (path !== "/") {
      p = `${p}${path}`;
    }
    if (path === "/" && p === "") {
      p = "/";
    }
  }
  return p;
}, "mergePath");

// transport/app/Route.ts
var Route = class _Route {
  static {
    __name(this, "Route");
  }
  static ANY = "ANY" /* ANY */;
  static GET = "GET" /* GET */;
  static POST = "POST" /* POST */;
  static PUT = "PUT" /* PUT */;
  static PATCH = "PATCH" /* PATCH */;
  static DELETE = "DELETE" /* DELETE */;
  static OPTIONS = "OPTIONS" /* OPTIONS */;
  static HEAD = "HEAD" /* HEAD */;
  method;
  path;
  fetch;
  static from(module) {
    const { path, method, fetch: fetch3, ...options2 } = module;
    return new this(
      method || _Route.ANY,
      path || "*",
      fetch3,
      options2
    );
  }
  constructor(method, path, fetch3, options2) {
    this.method = method || "ANY" /* ANY */;
    this.path = path || "*";
    this.fetch = duplex(fetch3, fetch3);
    if (options2) {
      this.options = options2;
    }
  }
  get [Symbol.toStringTag]() {
    return `[${this.method}] ${this.path}`;
  }
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  [Symbol.iterator]() {
    return [this.method, this.path, this.fetch].values();
  }
  route(path) {
    const instance = Reflect.construct(
      this.constructor,
      [],
      this.constructor
    );
    const result = Object.assign(instance, { ...this }, {
      path: mergePath(path, this.path)
    });
    console.log("instance", path, result);
    return result;
  }
  match(method, input, base) {
    const baseURL = /^https?:\/\//.test(input) ? void 0 : `http://localhost`;
    const res = new URLPattern({
      pathname: mergePath(base || "", this.path)
    }).exec(input, baseURL)?.pathname.groups;
    if (res) {
      console.log(
        `${colors_exports.brightWhite(this.method.toLowerCase())}(${colors_exports.yellow(base || "")}${colors_exports.green(this.path)})  [${colors_exports.cyan(method)}] ${colors_exports.brightBlue(new URL(input).pathname)}`
      );
    }
    return res;
  }
  request(input, init) {
    if (input instanceof Request) {
      if (init !== void 0) {
        input = new Request(input, init);
      }
      const context = {
        url: new URL(input.url),
        method: input.method,
        responseInit: {}
      };
      Object.assign(input, { context });
      return this.fetch(input, context);
    }
    input = input.toString();
    const path = /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`;
    init = init || {};
    init.method = init.method || this.method;
    const match = init.method === this.method && this.match(init.method, path);
    if (match) {
      const request = new Request(path, init);
      const context = {
        url: new URL(request.url),
        method: request.method,
        params: match,
        responseInit: {}
      };
      Object.assign(request, { context });
      const response2 = this.fetch(request, context);
      if (response2 instanceof ReadableStream) {
        return new Response(response2.pipeThrough(transform.toUint8Array()));
      }
      if (response2 instanceof Response) {
        return response2;
      }
      if (response2) {
        return new Response(response2);
      }
    }
  }
};

// transport/app/Router.ts
var Router = class _Router extends Route {
  static {
    __name(this, "Router");
  }
  routes = [];
  constructor(options2) {
    const { path = "/", ...rest } = options2 || {};
    super(
      "ANY" /* ANY */,
      path,
      (req) => this.#fetch(req, req.context),
      rest
    );
  }
  base(path) {
    const mergedPath = mergePath(path, this.path);
    const router = new _Router({ ...this.options, path: mergedPath });
    for (const route of this.routes) {
      router.use(route);
    }
    return router;
  }
  request(input, init) {
    if (input instanceof Request) {
      if (init !== void 0) {
        input = new Request(input, init);
      }
      const context2 = {
        url: new URL(input.url),
        method: input.method,
        responseInit: {}
      };
      Object.assign(input, { context: context2 });
      return this.fetch(input, context2);
    }
    input = input.toString();
    const path = /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`;
    const request = new Request(path, init);
    const context = {
      url: new URL(request.url),
      method: request.method,
      responseInit: {}
    };
    Object.assign(request, { context });
    return this.fetch(request, context);
  }
  async #fetch(request, context) {
    request.context = request.context || context || /* @__PURE__ */ Object.create(null);
    context = request.context;
    context.base = mergePath(context.base || "", context.router?.path || "");
    context.router = this;
    for (const route of this.routes) {
      if (route.method === "ANY" /* ANY */ || request.method === route.method) {
        const match = route.match(
          request.method,
          request.url,
          mergePath(context.base || "", this.path)
        );
        if (match) {
          context.params = request.params = match;
          context.route = route;
          const response2 = context.responseRaw = await route.fetch(
            request,
            context
          );
          if (typeof response2 !== "undefined") {
            return response2;
          }
        }
      }
    }
  }
  use(path, handle) {
    if (typeof path === "string" && handle) {
      const route = handle instanceof _Router ? handle.base(path) : handle instanceof Route ? handle.route(path) : typeof handle === "function" ? new Route(
        Route.ANY,
        path,
        handle
      ) : new Route(
        handle.method || "ANY" /* ANY */,
        handle.path || "*",
        handle.fetch
      );
      this.routes.push(route);
    } else if (typeof path !== "string") {
      const handlers = Array.from(arguments);
      for (const handle2 of handlers) {
        if (handle2 instanceof Route) {
          this.routes.push(handle2);
        } else {
          this.routes.push(
            typeof handle2 === "function" ? new Route("ANY" /* ANY */, "*", handle2) : new Route(
              handle2.method || "ANY" /* ANY */,
              handle2.path || "*",
              handle2.fetch
            )
          );
        }
      }
    }
    return this;
  }
  get(path, handle) {
    if (handle instanceof Route) {
      this.routes.push(handle.route(path));
    } else {
      this.routes.push(new Route(Route.GET, path, handle));
    }
    return this;
  }
  match(input, base) {
    const baseURL = /^https?:\/\//.test(input) ? void 0 : `http://localhost`;
    const match = new URLPattern({
      pathname: mergePath(base || "", this.path, "/*")
    }).exec(input, baseURL)?.pathname.groups;
    const ident = "\n     @ ";
    console.log(
      `${ident}${colors_exports.blue(this.constructor.name)}( [${colors_exports.gray(base || "/")}${colors_exports.blue(this.path)}] ).match( ${input} ) =>`,
      match
    );
    return match;
  }
};

// transport/app/App.ts
var App = class extends Router {
  static {
    __name(this, "App");
  }
};
function tapp(options2) {
  return new App(options2);
}
__name(tapp, "tapp");

// transport/app/Methods.ts
var get = /* @__PURE__ */ __name((path, fetch3) => new Route(Route.GET, path, fetch3), "get");
var put = /* @__PURE__ */ __name((path, fetch3) => new Route(Route.PUT, path, fetch3), "put");
var post2 = /* @__PURE__ */ __name((path, fetch3) => new Route(Route.POST, path, fetch3), "post");
var options = /* @__PURE__ */ __name((path, fetch3) => new Route(Route.OPTIONS, path, fetch3), "options");
var del = /* @__PURE__ */ __name((path, fetch3) => new Route(Route.DELETE, path, fetch3), "del");
var Mime = /* @__PURE__ */ ((Mime2) => {
  Mime2["html"] = "text/html";
  Mime2["text"] = "text/plain";
  Mime2["eventStream"] = "text/event-stream";
  Mime2["js"] = "application/javascript";
  return Mime2;
})(Mime || {});
var send = /* @__PURE__ */ __name((body, init) => new Response(
  body,
  typeof init === "string" ? { headers: { "content-type": init } } : init
), "send");
send.js = (body) => send(body, "application/javascript" /* js */);
send.html = (body) => send(body, "text/html" /* html */);
send.text = (body) => send(body, "text/plain" /* text */);
send.eventStream = (body) => send(body, "text/event-stream" /* eventStream */);
send.stream = (body) => send(body.pipeThrough(transform.toUint8Array()), "text/event-stream" /* eventStream */);
send.sse = (stream) => {
  const body = stream.pipeThrough(transform.sse());
  return new Response(body, {
    headers: {
      "content-type": "text/event-stream",
      "cache-control": "no-cache"
    }
  });
};

// deno.json
var deno_default = {
  name: "@clappcodes/transporter",
  version: "0.2.7",
  exports: "./mod.ts",
  tasks: {
    dev: "DEBUG=false deno run -A --inspect --env --watch main.ts",
    run: "deno run -A --watch --env --inspect=127.0.0.1:9229 run.ts",
    serve: "deno run -A --env --watch --inspect=127.0.0.1:9230 serve.ts",
    bundle: "deno run -A ./.tools/bundle.ts",
    "npm:build": "deno run -A ./.tools/npm.build.ts",
    "npm:publish": "deno run -A ./.tools/npm.publish.ts",
    safe: "deno fmt && deno lint && deno check mod.ts",
    pub: "deno task safe && deno task bundle && deno task npm:publish && deno publish --allow-dirty",
    deploy: "deno task safe && deno task bundle && deployctl deploy --prod",
    install: "deno install -f -A --name serve --env serve.ts --"
  },
  exclude: [
    ".npm",
    ".bundle"
  ],
  compilerOptions: {
    lib: [
      "deno.window",
      "dom"
    ]
  },
  deploy: {
    project: "98ab1ab7-5378-473f-9ac8-12d09564c492",
    name: "transporter",
    exclude: [
      "**/node_modules",
      ".npm"
    ],
    include: [],
    entrypoint: "main.ts"
  }
};

// playground/pipe1.ts
var writeMessage = /* @__PURE__ */ __name((x2 = "-") => transform.tap((o) => console.log(`${x2} ${o.uid}: ${o.msg}`)), "writeMessage");
var JSONStream = class extends PipeStream {
  static {
    __name(this, "JSONStream");
  }
  uid = "client";
  constructor(input) {
    super(
      writeMessage(">"),
      new JSONEncoderStream(),
      new TextEncoderStream(),
      new Transporter(input),
      new TextDecoderStream(),
      new JSONDecoderStream(),
      writeMessage("<")
    );
  }
  send(msg) {
    return this.write({ uid: this.uid, msg });
  }
};
var JSONRequestStream = class extends PipeStream {
  constructor(request) {
    super(
      new TextDecoderStream(),
      new JSONDecoderStream(),
      writeMessage(">")
    );
    this.request = request;
    request.body?.pipeTo(this.writable);
  }
  static {
    __name(this, "JSONRequestStream");
  }
};
var JSONResponseStream = class extends PipeStream {
  constructor(init) {
    super(
      writeMessage("<"),
      new JSONEncoderStream(),
      new TextEncoderStream()
    );
    this.init = init;
  }
  static {
    __name(this, "JSONResponseStream");
  }
  uid = "server";
  send(msg) {
    return this.write({ uid: this.uid, msg });
  }
};
var JSONTransportStream = class extends Response {
  constructor(request, responseInit) {
    const _request = new JSONRequestStream(request);
    const _response = new JSONResponseStream();
    super(_response.readable, responseInit);
    this.request = request;
    this.responseInit = responseInit;
    this.headers.set("content-type", "text/event-stream");
    this.writable = _response.writable;
    this.write = _response.write.bind(_response);
    this.send = _response.send.bind(_response);
    this.readable = _request.readable;
    this.read = _request.read.bind(_request);
  }
  static {
    __name(this, "JSONTransportStream");
  }
  writable;
  readable;
  write;
  read;
  send;
  pipeTo(destination) {
    return this.readable.pipeTo(
      isTransformStream2(destination) ? destination.writable : destination
    );
  }
  pipe(...transformers) {
    return this.readable.pipeThrough(new PipeStream(...transformers));
  }
};
var jsonStream = /* @__PURE__ */ __name((fn) => (req) => {
  const res = new JSONTransportStream(req);
  if (typeof fn === "function") {
    fn(res);
  }
  return res;
}, "jsonStream");
var pipe1_default = {
  init(url = "/pipe1") {
    const ts = new JSONStream(url);
    ts.read(console.log);
    ts.send("Hello Server");
    return ts;
  },
  fetch3: jsonStream(
    (stream) => stream.pipe(transform.tap(console.warn)).pipeTo(stream.writable)
  ),
  fetch: jsonStream((stream) => {
    globalThis.p1 = stream;
    stream.read((o) => {
      if (o.uid === "xxx") {
        stream.send(`hey ${o.uid}, 
            what is this: ${o.msg}?`);
      }
    });
    stream.write({ uid: "deno", msg: "Hi" });
    return stream;
  })
};

// global.ts
Object.assign(globalThis, { pipe1: pipe1_default });
console.log(
  "\n	" + bold(red(deno_default.name)) + " " + gray(deno_default.version) + "\n\n"
);
var {
  Route: Route2,
  Router: Router2,
  App: App2,
  tapp: tapp2,
  fetchDuplex: fetchDuplex2,
  fetchStream: fetchStream2,
  get: get2,
  send: send2,
  put: put2,
  post: post3,
  duplex: duplex2,
  ess,
  TransportStream: TransportStream3,
  Transporter: Transporter3,
  TextTransporter: TextTransporter2,
  EventSourceTransporter: EventSourceTransporter2,
  JSONTransporter: JSONTransporter2,
  RequestDuplex: RequestDuplex2,
  RequestStream: RequestStream3,
  PipeStream: PipeStream2
} = mod_exports5;
Object.assign(globalThis, mod_exports6, ess, {
  TransportStream: TransportStream3,
  PipeStream: PipeStream2,
  Transporter: Transporter3,
  TextTransporter: TextTransporter2,
  EventSourceTransporter: EventSourceTransporter2,
  JSONTransporter: JSONTransporter2,
  RequestDuplex: RequestDuplex2,
  RequestStream: RequestStream3,
  transporter: mod_exports6,
  readable: Object.assign(mod_exports.readable, mod_exports),
  Route: Route2,
  ess,
  Router: Router2,
  App: App2,
  tapp: tapp2,
  fetchDuplex: fetchDuplex2,
  fetchStream: fetchStream2,
  duplex: duplex2,
  get: get2,
  send: send2,
  put: put2,
  post: post3
});
//# sourceMappingURL=global.ts.map
