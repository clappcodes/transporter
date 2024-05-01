var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shims.ts
function ReadableStreamFrom(iterator) {
  return new ReadableStream({
    async pull(controller) {
      for await (const chunk of iterator) {
        controller.enqueue(chunk);
      }
      controller.close();
    }
  });
}
__name(ReadableStreamFrom, "ReadableStreamFrom");
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
if (!Reflect.has(ReadableStream, "from")) {
  console.log("(shim) ReadableStream.from");
  Object.defineProperty(ReadableStream, "from", {
    value: ReadableStreamFrom
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
  external: () => external,
  from: () => from,
  fromBody: () => fromBody,
  fromEvent: () => fromEvent,
  fromGenerator: () => fromGenerator,
  fromIterable: () => fromIterable,
  fromTimer: () => fromTimer,
  fromURL: () => fromURL,
  just: () => just,
  range: () => range
});

// readable/from-body.ts
function fromBody(input) {
  if (input.body instanceof ReadableStream) {
    return input.body;
  }
  throw new TypeError(`Invalid body type: ${typeof input.body}`);
}
__name(fromBody, "fromBody");

// readable/from-url.ts
async function fromURL(input, init) {
  const request = new Request(input, init);
  const response2 = await fetch(request);
  return fromBody(response2);
}
__name(fromURL, "fromURL");

// readable/from.ts
function from(iterator) {
  return new ReadableStream({
    async pull(controller) {
      if (typeof iterator === "function") {
        iterator = iterator();
      }
      for await (const chunk of iterator) {
        controller.enqueue(chunk);
      }
      controller.close();
    }
  });
}
__name(from, "from");

// readable/from-timer.ts
function fromTimer(ms, chunk = () => null) {
  let id;
  return new ReadableStream({
    start(controller) {
      id = setInterval(() => controller.enqueue(chunk()), ms);
    },
    cancel() {
      clearInterval(id);
    }
  });
}
__name(fromTimer, "fromTimer");

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
function fromEvent(el, name, options) {
  let listener;
  return new ReadableStream(
    {
      start(controller) {
        listener = /* @__PURE__ */ __name((e) => controller.enqueue(e), "listener");
        el.addEventListener(name, listener, options);
      },
      cancel() {
        el.removeEventListener(name, listener, options);
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

// writeable/mod.ts
var mod_exports2 = {};
__export(mod_exports2, {
  RequestStream: () => RequestStream,
  post: () => post,
  response: () => response,
  subscribe: () => subscribe
});

// writeable/subscribe.ts
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

// writeable/post.ts
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
  const { readable, writable } = new TransformStream();
  const request = new RequestStream(input, {
    ...init,
    body: readable
  });
  fetch(request);
  return writable;
}
__name(post, "post");
function response(init) {
  const { readable, writable } = new TransformStream();
  const response2 = new Response(readable, init);
  return { writable, response: response2 };
}
__name(response, "response");

// transform/mod.ts
var mod_exports3 = {};
__export(mod_exports3, {
  debounce: () => debounce,
  decode: () => decode,
  each: () => each,
  encode: () => encode,
  log: () => log2,
  lowerCase: () => lowerCase,
  map: () => map,
  pipe: () => pipe,
  stringify: () => stringify,
  tap: () => tap,
  toNumber: () => toNumber,
  toString: () => toString,
  transform: () => transform,
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
  DeferredPromise: () => DeferredPromise,
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
  isTransformStream: () => isTransformStream,
  log: () => log,
  mkRangeAsyncIterator: () => mkRangeAsyncIterator,
  mkRangeIterator: () => mkRangeIterator,
  putStream: () => putStream,
  swapObject: () => swapObject,
  valueFromKeyObject: () => valueFromKeyObject
});

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

// utils.ts
var isDebug = /* @__PURE__ */ __name(() => typeof Deno !== "undefined" ? Deno.env.get("DEBUG") === "true" : Boolean(Reflect.get(globalThis, "DEBUG")), "isDebug");
Object.assign(globalThis, { isDebug });
console.log(
  green("(utils) DEBUG") + "=" + white(isDebug() + "")
);
function duplexFetch(input, init) {
  const id = String(Math.random());
  const { body, ...rest } = init || {};
  const headers = {
    [idKey]: id,
    ...init?.headers
  };
  fetch(input, {
    body,
    // @ts-ignore .
    duplex: "half",
    method: "POST",
    headers,
    ...rest
  }).then(async (response2) => {
    console.log("POST Request(" + id + ")", "Done", await response2.text());
  });
  return fetch(input, { headers, ...rest });
}
__name(duplexFetch, "duplexFetch");
async function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
__name(delay, "delay");
var idKey = "transporter-stream-id";
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
var DeferredPromise = class extends Promise {
  static {
    __name(this, "DeferredPromise");
  }
  constructor(resolver) {
    const that = {};
    super(function(resolve, reject) {
      Object.assign(that, { resolve, reject });
    });
    Object.assign(this, that);
    if (resolver) {
      resolver(this.resolve, this.reject);
    }
  }
};
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
async function getStream(url, transform2 = new TextDecoderStream()) {
  url = new URL(url, location.href);
  const abortController = new AbortController();
  const headers = new Headers();
  const request = new Request(url, {
    method: "GET",
    cache: "no-cache",
    // @ts-ignore ?
    signal: abortController.signal,
    headers
  });
  const response2 = await fetch(request);
  const id = Number(response2.headers.get("duplex-id") || "0");
  url.hash = `#${id}`;
  if (!response2.body) {
    throw new Error(`Response body`);
  }
  const readable = response2.body.pipeThrough(transform2);
  return {
    url,
    id,
    request,
    response: response2,
    readable
  };
}
__name(getStream, "getStream");
function putStream(url, transform2 = new TextEncoderStream()) {
  url = new URL(url, location.href);
  const { writable, readable } = transform2;
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
    headers
  });
  const response2 = fetch(request);
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
    writable,
    readable,
    readable1,
    readable2,
    headers,
    request,
    response: response2,
    abortController
  };
  return o;
}
__name(putStream, "putStream");
function createRead(readable, cb) {
  const reader = readable instanceof ReadableStream ? readable.getReader() : readable.readable.getReader();
  async function read(cb2) {
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
  __name(read, "read");
  return read(cb);
}
__name(createRead, "createRead");
function createWrite(writable) {
  const writer = writable instanceof WritableStream ? writable.getWriter() : writable.writable.getWriter();
  Object.assign(write, { writer });
  async function write(chunk) {
    await writer.ready;
    await writer.write(chunk);
  }
  __name(write, "write");
  return write;
}
__name(createWrite, "createWrite");
var swapObject = /* @__PURE__ */ __name((obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k])), "swapObject");
var valueFromKeyObject = /* @__PURE__ */ __name((obj) => Object.fromEntries(Object.entries(obj).map(([k, _v]) => [k, k])), "valueFromKeyObject");
var _isTransformStream = /* @__PURE__ */ __name((input) => typeof input === "object" && Object.hasOwn(input, "writable") && Object.hasOwn(input, "readable"), "_isTransformStream");
var isTransformStream = /* @__PURE__ */ __name((a) => typeof a === "object" && "readable" in a, "isTransformStream");
var PipelineStream = class {
  constructor(transformers, writableStrategy, readableStrategy) {
    this.transformers = transformers;
    const [first, ...rest] = this.transformers;
    this.writable = first.writable;
    this.readable = rest.reduce(
      (readable, transform2) => readable.pipeThrough(transform2),
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
var transform = /* @__PURE__ */ __name((transform2) => (input) => {
  return input.pipeThrough(transform2);
}, "transform");
function pipe(mapper) {
  const streamMapper = /* @__PURE__ */ __name((input) => isTransformStream(mapper) ? transform(mapper)(input) : mapper(input), "streamMapper");
  if (isTransformStream(mapper)) {
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
      return isTransformStream(mapper2) ? transform(mapper2)(nextStream) : mapper2(nextStream);
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

// transform/to-string.ts
function toString() {
  return map(String);
}
__name(toString, "toString");
function stringify(options) {
  return map((value) => JSON.stringify(value, null, options?.space));
}
__name(stringify, "stringify");

// transform/to-number.ts
function toNumber() {
  return map(Number);
}
__name(toNumber, "toNumber");

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

// deno.json
var deno_default = {
  name: "@clappcodes/transporter",
  version: "0.2.6",
  exports: "./mod.ts",
  tasks: {
    dev: "deno run -A --inspect --env --watch main.ts",
    bundle: "deno run -A ./.tools/bundle.ts",
    "npm:build": "deno run -A ./.tools/npm.build.ts",
    "npm:publish": "deno run -A ./.tools/npm.publish.ts",
    safe: "deno fmt && deno lint && deno check mod.ts",
    pub: "deno task safe && deno task bundle && deno task npm:publish && deno publish --allow-dirty",
    deploy: "deno task safe && deno task bundle && deployctl deploy --prod"
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
export {
  deno_default as package,
  mod_exports as readable,
  mod_exports3 as transform,
  utils_exports as utils,
  mod_exports2 as writable
};
//# sourceMappingURL=mod.js.map
