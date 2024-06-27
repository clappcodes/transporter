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
var mod_exports5 = {};
__export(mod_exports5, {
  BroadcastStream: () => BroadcastStream,
  DuplexRequest: () => DuplexRequest,
  ESS: () => ESS,
  EventSourceDecoderStream: () => EventSourceDecoderStream,
  EventSourceEncoderStream: () => EventSourceEncoderStream,
  EventSourceMessage: () => EventSourceMessage,
  EventSourceResponse: () => EventSourceResponse,
  EventSourceTransportStream: () => EventSourceTransportStream,
  JSONDecoderStream: () => JSONDecoderStream,
  JSONEncoderStream: () => JSONEncoderStream,
  JSONTransportStream: () => JSONTransportStream,
  PairStream: () => PairStream,
  PipeStream: () => PipeStream,
  Route: () => Route,
  Router: () => Router,
  TextTransportStream: () => TextTransportStream,
  TransportStream: () => TransportStream,
  duplexHandler: () => duplexHandler,
  package: () => deno_default,
  pipe: () => pipe2,
  readable: () => mod_exports,
  route: () => route,
  transform: () => mod_exports2,
  utils: () => mod_exports4,
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
  readable: () => readable,
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
function consume(readable2, fn) {
  if (readable2 instanceof ReadableStream) {
    if (!fn)
      return (fn2) => consume(readable2, fn2);
    return (async () => {
      for await (const chunk of readable2)
        await fn(chunk);
    })();
  }
  if (typeof readable2 === "function") {
    return (input) => consume(input, readable2);
  }
}
__name(consume, "consume");

// readable/mod.ts
function readable(start, rest) {
  return new ReadableStream({
    start,
    ...rest
  });
}
__name(readable, "readable");

// writable/mod.ts
var mod_exports3 = {};
__export(mod_exports3, {
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

// writable/write.ts
function write(writable) {
  const writer = writable.getWriter();
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
  each: () => each,
  encode: () => encode,
  filter: () => filter,
  log: () => log,
  map: () => map,
  newNumber: () => newNumber,
  pipe: () => pipe,
  sse: () => sse,
  tap: () => tap,
  to: () => to,
  toAlphaNum: () => toAlphaNum,
  toFixed: () => toFixed,
  toLine: () => toLine,
  toLowerCase: () => toLowerCase,
  toNumAlpha: () => toNumAlpha,
  toNumber: () => toNumber,
  toNumeric: () => toNumeric,
  toPrecision: () => toPrecision,
  toString: () => toString,
  toUint8Array: () => toUint8Array,
  toUpperCase: () => toUpperCase,
  transform: () => transform
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
function toLowerCase() {
  return new TransformStream({
    transform(chunk, controller) {
      return controller.enqueue(chunk.toLowerCase());
    }
  });
}
__name(toLowerCase, "toLowerCase");

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
  const alphaMap2 = [...key];
  return (value) => [...String(value)].map((num) => alphaMap2[Number(num)]).join("");
}
__name(mkId, "mkId");
var tid = mkId("5aksj3hg7e".toUpperCase());
async function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
__name(delay, "delay");
var isTransformStream2 = /* @__PURE__ */ __name((a) => typeof a === "object" && "readable" in a, "isTransformStream");

// transform/pipe.ts
var transform = /* @__PURE__ */ __name((transform2) => (input) => {
  return input.pipeThrough(transform2);
}, "transform");
function pipe(mapper) {
  const streamMapper = /* @__PURE__ */ __name((input) => isTransformStream2(mapper) ? transform(mapper)(input) : mapper(input), "streamMapper");
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
      return isTransformStream2(mapper2) ? transform(mapper2)(nextStream) : mapper2(nextStream);
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
function toUpperCase() {
  return new TransformStream({
    transform(chunk, controller) {
      return controller.enqueue(chunk.toUpperCase());
    }
  });
}
__name(toUpperCase, "toUpperCase");

// transform/log.ts
function log(tag = "") {
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
__name(log, "log");

// transform/to.ts
var to = /* @__PURE__ */ __name((func) => map(func), "to");
var newNumber = /* @__PURE__ */ __name((input) => new Number(input), "newNumber");
var toNumeric = /* @__PURE__ */ __name(() => to(Number), "toNumeric");
var toNumber = /* @__PURE__ */ __name(() => to((input) => new Number(input)), "toNumber");
var toString = /* @__PURE__ */ __name(() => to(String), "toString");
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
var alphaMap = [
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
  (value) => [...String(value)].map((num) => alphaMap[Number(num)]).join("")
), "toNumAlpha");
var toAlphaNum = /* @__PURE__ */ __name(() => map(
  (value) => Number([...String(value)].map((char) => alphaMap.indexOf(char)).join(""))
), "toAlphaNum");

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

// transporter/ess/parser.ts
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

// transporter/ess/parse.ts
function parse(input) {
  const result = createParser().push(input);
  if (typeof result === "function") {
    throw new TypeError(`Parse failed`);
  }
  return result;
}
__name(parse, "parse");

// transporter/ess/stringify.ts
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
    delete message.comment;
  }
  if (message.event) {
    assertHasNoNewline(message.event, "`message.event`");
    lines.push(`event:${message.event}`);
    delete message.event;
  }
  if (message.data) {
    String(message.data).split(NEWLINE_REGEXP).forEach(
      (line) => lines.push(`data:${line}`)
    );
    delete message.data;
  }
  if (message.id) {
    assertHasNoNewline(message.id.toString(), "`message.id`");
    lines.push(`id:${message.id}`);
    delete message.id;
  }
  if (message.retry) {
    lines.push(`retry:${message.retry}`);
    delete message.retry;
  }
  const extraMessage = message;
  const extraKeys = Object.keys(extraMessage);
  for (const key of extraKeys) {
    assertHasNoNewline(String(extraMessage[key]), "`message." + key + "`");
    lines.push(`${key}:${extraMessage[key]}`);
    delete extraMessage[key];
  }
  return lines.join("\n") + "\n\n";
}
__name(stringify, "stringify");

// transporter/ess/EventSourceMessage.ts
var EventSourceMessage = class {
  static {
    __name(this, "EventSourceMessage");
  }
  constructor(input, transform2) {
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
    delete input.type;
    const keys = Object.keys(input);
    for (const key of keys) {
      if (input && typeof input[key] !== "undefined") {
        Object.defineProperty(this, key, {
          value: input[key],
          enumerable: true,
          writable: true,
          configurable: true
        });
      }
    }
    if (transform2) {
      Object.assign(this, transform2(this));
    }
  }
  toString() {
    return stringify(this);
  }
};

// transporter/ess/EventSourceDecoderStream.ts
var EventSourceDecoderStream = class extends TransformStream {
  static {
    __name(this, "EventSourceDecoderStream");
  }
  constructor() {
    const instance = /* @__PURE__ */ Object.create(null);
    super(
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

// transporter/ess/EventSourceEncoderStream.ts
var EventSourceEncoderStream = class extends TransformStream {
  static {
    __name(this, "EventSourceEncoderStream");
  }
  constructor() {
    super(
      {
        transform(message, controller) {
          controller.enqueue(stringify(message));
        }
      }
    );
  }
};

// transform/sse.ts
var encoder = /* @__PURE__ */ __name(() => new EventSourceEncoderStream(), "encoder");
var decoder = /* @__PURE__ */ __name(() => new EventSourceDecoderStream(), "decoder");
var sse = { encoder, decoder };

// transporter/contstants.ts
var isDuplexHandler = Symbol("isDuplexHandler");
var STREAM_ID_KEY = "stream-id";
var STREAM_TYPE_KEY = "stream-type";

// transporter/utils/is.ts
var isDenoEnv = Reflect.has(globalThis, "Deno");
var isStreamingBodyRequest = /* @__PURE__ */ __name((init) => init?.body instanceof ReadableStream && init.method !== "GET" && init.method !== "HEAD", "isStreamingBodyRequest");
var isTransformStream3 = /* @__PURE__ */ __name((a) => typeof a === "object" && "readable" in a, "isTransformStream");

// transporter/utils/Promised.ts
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
  // get state() {
  //   return promiseState(this);
  // }
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

// transporter/duplexHandler.ts
var map2 = /* @__PURE__ */ new Map();
function duplexHandler(handler) {
  if (isDuplexHandler in handler) {
    return handler;
  }
  const duplex = /* @__PURE__ */ __name(async (request, context) => {
    const id = request.headers.get(STREAM_ID_KEY);
    if (!id) {
      return handler(request, context);
    }
    const streamType = request.headers.get(
      STREAM_TYPE_KEY
    );
    const isHalfDuplex = !!id && !!streamType && !["GET" /* GET */, "HEAD" /* HEAD */].includes(request.method);
    if (!isHalfDuplex) {
      return handler(request, context);
    }
    if (!map2.has(id)) {
      map2.set(id, {
        INCOMING: new Promised(),
        OUTGOING: new Promised()
      });
    }
    const { INCOMING, OUTGOING } = map2.get(id);
    switch (streamType) {
      case "OUTGOING" /* OUTGOING */: {
        if (request instanceof DuplexRequest) {
          request.response = new Response();
        }
        INCOMING.resolve(await handler(request, context));
        map2.delete(id);
        return OUTGOING;
      }
      case "INCOMING" /* INCOMING */: {
        if (request instanceof DuplexRequest && request.outgoing && !request.outgoing.response) {
          request.outgoing.response = new Response();
          INCOMING.resolve(await handler(request.outgoing, context));
          map2.delete(id);
        }
        return INCOMING;
      }
      default:
        return handler(request, context);
    }
  }, "duplex");
  return Object.assign(
    duplex,
    {
      [isDuplexHandler]: true,
      handler
    }
  );
}
__name(duplexHandler, "duplexHandler");

// transporter/DuplexRequest.ts
var DuplexRequest = class extends Request {
  static {
    __name(this, "DuplexRequest");
  }
  _fetch(...args) {
    return globalThis.fetch(...args);
  }
  /**
   * Creates a new instance of RequestStream.
   * @param input - The URL or Request object.
   * @param init - Optional request initialization options.
   */
  constructor(input, init, fetch2) {
    if (typeof init === "function") {
      fetch2 = init;
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
      headers.get(STREAM_ID_KEY) || Math.random().toString().slice(2)
    );
    let outgoing;
    if (init.duplex === "half" && !headers.has(STREAM_TYPE_KEY)) {
      outgoing = new new.target(input, {
        ...init,
        headers: {
          ...Object.fromEntries(headers.entries()),
          [STREAM_TYPE_KEY]: "OUTGOING" /* OUTGOING */
        }
      });
      init = {
        body: null,
        method: init.method,
        headers: {
          ...Object.fromEntries(headers.entries()),
          [STREAM_TYPE_KEY]: "INCOMING" /* INCOMING */
        }
      };
    } else {
      init = {
        ...init,
        headers
      };
    }
    super(input, init);
    if (outgoing) {
      Object.defineProperty(this, "outgoing", {
        value: outgoing
      });
    }
    if (typeof fetch2 === "function") {
      Object.defineProperty(this, "_fetch", {
        value: duplexHandler(fetch2)
      });
    }
  }
  get requestType() {
    return this.headers.get(STREAM_TYPE_KEY) === "OUTGOING" /* OUTGOING */ ? "OUTGOING" /* OUTGOING */ : "INCOMING" /* INCOMING */;
  }
  /**
   * Fetches the request stream.
   * @param init - Optional request initialization options.
   * @returns A Promise that resolves to the response of the request.
   */
  async fetch(init) {
    try {
      if (this.outgoing) {
        this.outgoing.response = this._fetch(this.outgoing, init);
      }
      this.response = await this._fetch(
        this,
        init
      );
      if (!this.response.ok) {
        throw new Error(
          `Failed to fetch. Response status: ${this.response.status} `
        );
      }
    } catch (err) {
      console.warn(`[${this.constructor.name}] ${err.message}`);
      console.error(err);
      return this.response;
    }
    return this.response;
  }
};

// transporter/TransportStream.ts
var TransportStream = class _TransportStream {
  static {
    __name(this, "TransportStream");
  }
  static encoder() {
    return new TransformStream();
  }
  static decoder() {
    return new TransformStream();
  }
  static headers = {};
  writable;
  readable;
  request;
  finished;
  writer;
  constructor(input, init, fetch2) {
    const reqTransform = new.target.encoder();
    const resTransform = new.target.decoder();
    this.writable = reqTransform.writable;
    this.readable = resTransform.readable;
    if (typeof init === "function") {
      fetch2 = init;
      init = {};
    }
    const headers = {
      ...init?.headers,
      ..._TransportStream.headers,
      ...new.target.headers
    };
    const request = this.request = new DuplexRequest(input, {
      ...init,
      headers,
      body: reqTransform.readable
    }, fetch2);
    this.finished = request.fetch().then(
      (response) => response.body?.pipeTo(resTransform.writable)
    );
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
    if (this.writer) {
      await this.writer.ready;
      await this.writer.close();
      this.writer.releaseLock();
      delete this.writer;
    } else {
      this.writable.close();
    }
  }
};

// transporter/TextTransportStream.ts
var TextTransportStream = class extends TransportStream {
  static {
    __name(this, "TextTransportStream");
  }
  static encoder = () => new TextEncoderStream();
  static decoder = () => new TextDecoderStream();
  static headers = {
    "content-type": "text/plain",
    "cache-control": "no-cache"
  };
};
function toUpperCaseStreamHandler(request) {
  return new Response(
    request.body.pipeThrough(TextTransportStream.decoder()).pipeThrough(mod_exports2.toUpperCase()).pipeThrough(TextTransportStream.encoder())
  );
}
__name(toUpperCaseStreamHandler, "toUpperCaseStreamHandler");
TextTransportStream.demo = async () => {
  for await (const c of mod_exports.of("Hello", "World").pipeThrough(new TextEncoderStream()).pipeThrough(new TransportStream("/upper", toUpperCaseStreamHandler)).pipeThrough(new TextDecoderStream())) {
    console.log(c);
  }
  for await (const c of mod_exports.of("Hello", "World").pipeThrough(
    new TextTransportStream("/uppercase", toUpperCaseStreamHandler)
  )) {
    console.log(c);
  }
};

// transporter/PairStream.ts
var PairStream = class {
  static {
    __name(this, "PairStream");
  }
  writable;
  readable;
  _writer;
  constructor({ writable, readable: readable2 } = new TransformStream()) {
    this.writable = writable;
    this.readable = readable2;
  }
  async write(message) {
    this._writer = this._writer || this.writable.getWriter();
    await this._writer.ready;
    await this._writer.write(message);
  }
  async read(cb) {
    for await (const chunk of this.readable) {
      await cb(chunk);
    }
  }
  async close() {
    if (this._writer) {
      await this._writer.ready;
      await this._writer.close();
      this._writer.releaseLock();
      delete this._writer;
    } else {
      this.writable.close();
    }
  }
};

// transporter/pipe.ts
function pipe2(readable2, ...transforms) {
  return transforms.reduce(
    (readable3, transform2) => readable3.pipeThrough(transform2),
    readable2
  );
}
__name(pipe2, "pipe");

// transporter/PipeStream.ts
var PipeStream = class extends PairStream {
  static {
    __name(this, "PipeStream");
  }
  constructor(...transformers) {
    const { writable, readable: readable2 } = new TransformStream();
    const pipeline = transformers.filter(Boolean).map((ts) => isTransformStream3(ts) ? ts : new TransformStream(ts));
    super({
      readable: pipe2(readable2, ...pipeline),
      writable
    });
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

// transporter/JSONTransportStream.ts
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
var JSONTransportStream = class extends TransportStream {
  static {
    __name(this, "JSONTransportStream");
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
  static headers = {
    "content-type": "text/event-stream",
    "cache-control": "no-cache"
  };
};
var jsonStreamHandler = duplexHandler(
  (request) => new Response(
    request.body?.pipeThrough(
      new PipeStream(
        new TextDecoderStream(),
        new JSONDecoderStream(),
        new TransformStream({
          transform(chunk, ctrl) {
            ctrl.enqueue({
              ...chunk,
              url: request.url,
              id: request.headers.get(STREAM_ID_KEY)
            });
          }
        }),
        new JSONEncoderStream(),
        new TextEncoderStream()
      )
    )
  )
);
var jsonStreamHandler2 = duplexHandler(
  (request) => new Response(
    request.body.pipeThrough(JSONTransportStream.decoder()).pipeThrough(
      new TransformStream({
        transform(chunk, ctrl) {
          ctrl.enqueue({
            ...chunk,
            url: request.url,
            id: request.headers.get(STREAM_ID_KEY)
          });
        }
      })
    ).pipeThrough(JSONTransportStream.encoder())
  )
);
JSONTransportStream.demo = () => {
  const ts = new JSONTransportStream("/json", jsonStreamHandler2);
  ts.read(console.log);
  ts.write({ uid: "serebano", msg: "Anybody here?" });
  return ts;
};

// transporter/ess/mod.ts
var ESS = { stringify, parse };

// transporter/EventSourceTransportStream.ts
var EventSourceTransportStream = class extends TransportStream {
  static {
    __name(this, "EventSourceTransportStream");
  }
  static encoder = () => new PipeStream(
    new EventSourceEncoderStream(),
    new TextEncoderStream()
  );
  static decoder = () => new PipeStream(
    new TextDecoderStream(),
    new EventSourceDecoderStream()
  );
  static headers = {
    "content-type": "text/event-stream",
    "cache-control": "no-cache"
  };
};
var EventSourceResponse = class extends Response {
  static {
    __name(this, "EventSourceResponse");
  }
  constructor(body, init) {
    super(
      body.pipeThrough(new EventSourceEncoderStream()).pipeThrough(new TextEncoderStream()),
      init
    );
    this.headers.set("content-type", "text/event-stream");
    this.headers.set("cache-control", "no-cache");
  }
};
function eventSourceStreamHandler(request) {
  return new Response(
    request.body.pipeThrough(EventSourceTransportStream.decoder()).pipeThrough(
      mod_exports2.map((m) => ({
        ...m,
        comment: "Duplexxx"
      }))
    ).pipeThrough(EventSourceTransportStream.encoder())
  );
}
__name(eventSourceStreamHandler, "eventSourceStreamHandler");
EventSourceTransportStream.demo = () => {
  const ess = new EventSourceTransportStream("/ess", eventSourceStreamHandler);
  ess.read(console.log);
  ess.write({ data: "hi es" });
  return ess;
};

// transporter/BroadcastStream.ts
var BroadcastStream = class extends PairStream {
  constructor(controllers = new.target.controllers, writableStrategy, readableStrategy) {
    const debug = new.target.debug;
    super();
    this.controllers = controllers;
    this.writable = new WritableStream({
      start: () => {
        debug && console.log(new.target.name, ".writable.start()");
      },
      close: () => {
        debug && console.log(new.target.name, ".writable.close()");
      },
      abort: () => {
        debug && console.log(new.target.name, ".writable.abort()");
      },
      write: (chunk) => {
        debug && console.log(
          new.target.name,
          ".writable.write()",
          this.controllers.size
        );
        this.controllers.forEach((controller) => {
          controller.enqueue(chunk);
        });
      }
    }, writableStrategy);
    this.readable = new ReadableStream({
      start: (controller) => {
        debug && console.log(
          new.target.name,
          ".readable.start()",
          this.controllers.size
        );
        new.target.weakMap.set(this, controller);
        this.controllers.add(controller);
      },
      cancel: () => {
        this.controllers.delete(new.target.weakMap.get(this));
        new.target.weakMap.delete(this);
        debug && console.log(
          new.target.name,
          ".readable.cancel()",
          this.controllers.size
        );
      },
      pull() {
      }
    }, readableStrategy);
  }
  static {
    __name(this, "BroadcastStream");
  }
  static debug = true;
  static weakMap = /* @__PURE__ */ new WeakMap();
  static controllers = /* @__PURE__ */ new Set();
};

// transporter/Router.ts
var Context = class {
  static {
    __name(this, "Context");
  }
  constructor(init) {
    Object.assign(this, init);
  }
};
var Route = class _Route {
  static {
    __name(this, "Route");
  }
  method;
  path;
  pattern;
  handler;
  static create = (method) => (path, init) => path && typeof path !== "string" ? new _Route(Object.assign(path, { method })) : new _Route(path, Object.assign(init || {}, { method }));
  static any = this.create("*" /* ANY */);
  static get = this.create("GET" /* GET */);
  static put = this.create("PUT" /* PUT */);
  static post = this.create("POST" /* POST */);
  static head = this.create("HEAD" /* HEAD */);
  static patch = this.create("PATCH" /* PATCH */);
  static delete = this.create("DELETE" /* DELETE */);
  static options = this.create("OPTIONS" /* OPTIONS */);
  constructor(path, routeInit) {
    if (typeof path !== "undefined" && typeof path !== "string") {
      routeInit = path;
      path = void 0;
    }
    path = path || "";
    routeInit = routeInit || {};
    if (routeInit instanceof _Route) {
      const _routeInit = routeInit;
      this.basePath = _routeInit.basePath || "";
      const handler = _routeInit.handler instanceof Router ? _routeInit.handler.base(path.replaceAll("/*", "")) : _routeInit.handler;
      path = path + _routeInit.path;
      const method = _routeInit.method || "*";
      routeInit = { handler, method };
    } else if (routeInit instanceof Router) {
      const _routeInit = routeInit.base(path);
      this.basePath = _routeInit.basePath;
      path = this.basePath ? this.basePath + "/*" : "*";
      const method = "*";
      routeInit = { handler: _routeInit, method };
    } else if (typeof routeInit === "function") {
      const method = routeInit.method || "*";
      routeInit = { handler: routeInit, method };
    }
    routeInit.handler = routeInit.handler || (() => `Handler Placeholder`);
    this.path = path || "*";
    this.method = routeInit?.method || "*";
    this.handler = routeInit.handler;
    this.pattern = new URLPattern({ pathname: this.path });
  }
  base(path) {
    return new _Route(path, this);
  }
  match(request) {
    const match = (this.method === "*" || request.method === this.method) && this.pattern.exec(request.url);
    return match ? {
      params: match.pathname.groups,
      path: match.pathname.input,
      route: this
    } : null;
  }
  toString(i = "") {
    const type = this.handler instanceof Router || this.handler instanceof _Route ? this.handler.constructor.name : this.handler?.name || String(this.handler).split("\n")[0].replace("=> {", "=> { ... }").replace("=>{", "=>{...}");
    const routes = this.handler instanceof Router ? colors_exports.magenta(` [${this.handler.stack.length}]`) : ``;
    return this.handler instanceof Router || this.handler instanceof _Route ? [
      i,
      colors_exports.brightBlue(`[${this.method}]`),
      colors_exports.brightBlue(this.path),
      "",
      colors_exports.yellow(type + routes)
    ].join(" ") + "\n" + this.handler.toString(i + "    ") : [
      i,
      colors_exports.white(`[${this.method}]`),
      colors_exports.brightWhite(this.path),
      "",
      colors_exports.gray(colors_exports.italic(type))
    ].join(
      " "
    );
  }
  print() {
    console.log(this.toString());
  }
};
var Router = class _Router {
  constructor(basePath = "", stack = []) {
    this.basePath = basePath;
    this.stack = stack;
    this.handler = duplexHandler(this.handler.bind(this));
    this.match = this.match.bind(this);
    this.base = this.base.bind(this);
    this.use = this.use.bind(this);
    this.toString = this.toString.bind(this);
  }
  static {
    __name(this, "Router");
  }
  Route = Route;
  Context = Context;
  async test(path) {
    const res = await this.handler(new DuplexRequest(path));
    return res.text();
  }
  base(path) {
    if (path?.includes("*")) {
      throw new TypeError(`Base path contains invalid characters: ${path}`);
    }
    const router = new _Router(
      (path || "") + this.basePath,
      this.stack.map((route2) => new Route(path, route2))
    );
    return router;
  }
  add = (method, path, handlers) => {
    if (typeof path === "function" || path instanceof Route || path instanceof _Router) {
      handlers = [path, ...handlers];
      path = "";
    }
    const paths = (typeof path === "object" ? [...path] : [path]).map(
      (p) => this.basePath + p
    );
    const prop = method.toLowerCase();
    const methodFunc = prop === "*" ? Route["any"] : Route[prop];
    for (const path2 of paths) {
      for (const handler of handlers) {
        this.stack.push(methodFunc(path2, handler));
      }
    }
    return this;
  };
  create = (method) => (path, ...handlers) => this.add(method, path, handlers);
  use = this.create("*" /* ANY */);
  any = this.create("*" /* ANY */);
  get = this.create("GET" /* GET */);
  put = this.create("PUT" /* PUT */);
  post = this.create("POST" /* POST */);
  head = this.create("HEAD" /* HEAD */);
  patch = this.create("PATCH" /* PATCH */);
  delete = this.create("DELETE" /* DELETE */);
  options = this.create("OPTIONS" /* OPTIONS */);
  async handler(request, baseContext) {
    const hasBase = baseContext instanceof Context;
    const context = this.createContext(request, baseContext);
    try {
      const response = await handle(request, context, this.stack);
      if (response instanceof Response) {
        context.handled.resolve(response);
        return response;
      }
      if (!hasBase) {
        return new Response(`404 - Unhandled Request`, { status: 404 });
      }
    } catch (e) {
      context.handled.reject(e);
      return new Response(`500 - ${e.message}`, { status: 500 });
    }
  }
  createContext(request, context) {
    if (context instanceof Context) {
      return context;
    }
    return new Context({
      url: new URL(request.url),
      method: request.method,
      duplexId: request.headers.get(STREAM_ID_KEY),
      headers: new Headers(),
      status: 200,
      params: {},
      routes: [],
      handled: Promise.withResolvers()
    });
  }
  async handleEvent(event) {
    const context = this.createContext(event.request);
    const response = await this.handler(event.request, context);
    if (response) {
      event.respondWith(response);
    }
    return response;
  }
  match(request) {
    return this.stack.map((route2) => route2.match(request));
  }
  toString(i = "") {
    return this.stack.map((route2) => route2.toString(i)).join("\n");
  }
  print() {
    console.log(this.toString());
  }
};
async function handle(request, context, stack) {
  for (const layer of stack) {
    const match = layer.match(request);
    if (match) {
      context.params = match.params;
      context.route = layer;
      const handler = layer.handler instanceof Router ? layer.handler.handler : layer.handler;
      const result = await handler(request, context);
      if (typeof result === "undefined") {
        continue;
      }
      if (result instanceof Response) {
        return result;
      }
      const responseInit = {
        status: context.status,
        headers: context.headers
      };
      if (result instanceof ReadableStream || typeof result === "string" || result === null) {
        return new Response(result, responseInit);
      }
      if (typeof result === "object") {
        return Response.json(result, responseInit);
      }
    }
  }
}
__name(handle, "handle");
route.Route = Route;
route.Router = Router;
route.Context = Context;
function route(path, ...handlers) {
  if (typeof path !== "string") {
    handlers = [path, ...handlers];
    path = "";
  }
  return new Router(path).use(...handlers);
}
__name(route, "route");
route.test = async () => {
  const app = new Router();
  app.use("*", route.cors(), route.logger());
  app.use("/", () => "Home Page");
  app.use("/delay", () => delay(3e3).then(() => "Done"));
  app.use("/about", () => "About Page");
  app.use("/echo", route.broadcastHandler);
  const blog = new Router("/ipress");
  blog.use("/", () => "Blog Home");
  blog.use("/post/:id", (_, ctx) => `Blog Post #${ctx.params.id}`);
  app.use(blog.base("/blog1"));
  app.use("/blog2", blog);
  app.use("/test", (_) => `Testtst`);
  const x2 = route("").use("/", () => "hi");
  const a = x2.base("/a");
  const b = x2.base("/b");
  const c = x2.base("/c").use("/*", () => "xxc");
  app.use(a.use(b.use(c)));
  const request = new Request("https://localhost/blog1/ipress/");
  const result = await (await app.handler(request)).text();
  console.log(result);
  console.log(app.toString());
  Object.assign(globalThis, { app, blog, route });
  if (typeof Deno !== "undefined") {
    const server = route.serve(app);
    console.log(server);
  }
  return app;
};
route.serve = (handler) => Deno.serve({
  port: 8001,
  key: Deno.env.get("KEY"),
  cert: Deno.env.get("CERT")
}, handler instanceof Router ? handler.handler : handler);
route.handler = (h) => h;
route.cors = () => route.handler((_req, ctx) => {
  ctx.headers.set("cache-control", "no-cache");
  ctx.headers.set("access-control-allow-origin", "*");
  ctx.headers.set("access-control-allow-methods", "*");
  ctx.headers.set("access-control-allow-headers", "*");
  ctx.headers.set("access-control-max-age", "100");
  if (_req.method === "OPTIONS") {
    return new Response(null, ctx);
  }
});
route.broadcastHandler = () => route(
  route.cors(),
  (_, ctx) => {
    ctx.headers.set("content-type", "text/event-stream");
  },
  /* @__PURE__ */ __name(function broadcastStream(req) {
    const stream = new BroadcastStream();
    req.body?.pipeTo(stream.writable);
    return stream.readable;
  }, "broadcastStream")
);
route.notFound = () => route.handler(
  (req) => new Response(`404 - Not Found
${req.method} ${req.url}`, { status: 404 })
);
route.logger = (tag = "") => route.handler((req, ctx) => {
  console.log(
    `${colors_exports.dim(tag)} ${ctx.base ? "----" : "--"} >> [${colors_exports.blue(req.method)}] ${colors_exports.dim(req.url)} ${ctx.duplexId ? colors_exports.bgWhite(ctx.duplexId) : ""}`
  );
  ctx.handled.promise.then((response) => {
    console.log(
      `${colors_exports.dim(tag)} << ${ctx.base ? "----" : "--"} [${colors_exports.yellow(req.method)}] ${colors_exports.dim(req.url)}`,
      response.headers
    );
  });
});
route.test();

// transporter/utils/mod.ts
var mod_exports4 = {};
__export(mod_exports4, {
  Promised: () => Promised,
  isDenoEnv: () => isDenoEnv,
  isStreamingBodyRequest: () => isStreamingBodyRequest,
  isTransformStream: () => isTransformStream3,
  mergePath: () => mergePath,
  pipeTo: () => pipeTo,
  promiseState: () => promiseState
});

// transporter/utils/pipeTo.ts
var pipeTo = /* @__PURE__ */ __name((destination) => (source) => source instanceof ReadableStream ? source.pipeTo(
  destination instanceof WritableStream ? destination : destination.writable
) : source.body.pipeTo(
  destination instanceof WritableStream ? destination : destination.writable
), "pipeTo");

// transporter/utils/path.ts
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

// deno.json
var deno_default = {
  name: "@clappcodes/transporter",
  version: "0.3.5",
  exports: "./mod.ts",
  tasks: {
    dev: "DEBUG=false deno run -A --inspect --env --watch main.ts",
    run: "deno run -A --watch --env --inspect=127.0.0.1:9229 run.ts",
    serve: "deno run -A --env --watch --inspect=127.0.0.1:9230 serve.ts",
    bundle: "deno run -A ./.tools/bundle.ts",
    "npm:build": "deno run -A ./.tools/npm.build.ts",
    "npm:publish": "deno run -A ./.tools/npm.publish.ts",
    safe: "deno fmt mod.ts && deno lint mod.ts && deno check mod.ts",
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
      "webworker",
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

// global.ts
Object.assign(globalThis, { transporter: mod_exports5 }, mod_exports5);
if (typeof document !== "undefined") {
  fetch("/transporter.txt").then((res) => res.text()).then((res) => {
    console.log(bold(gray(res)));
    Object.assign(globalThis, {
      TransporterLogo: res
    });
  });
}
console.log(
  "\n	" + bold(yellow(deno_default.name)) + " " + gray(deno_default.version) + "\n\n"
);
//# sourceMappingURL=global.js.map
