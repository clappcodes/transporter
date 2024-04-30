var Transporter = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // utils.ts
  var utils_exports = {};
  __export(utils_exports, {
    DEBUG: () => DEBUG,
    DeferredPromise: () => DeferredPromise,
    PipeStream: () => PipeStream,
    PipelineStream: () => PipelineStream,
    ReadyState: () => ReadyState,
    colors: () => colors_exports,
    createRead: () => createRead,
    createWrite: () => createWrite,
    getStream: () => getStream,
    isDebug: () => isDebug,
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
  var DEBUG = typeof Deno !== "undefined" ? Boolean(Deno.env.get("DEBUG")) : Reflect.get(globalThis, "DEBUG");
  var isDebug = /* @__PURE__ */ __name(() => typeof Deno !== "undefined" ? Boolean(Deno.env.get("DEBUG")) : Reflect.get(globalThis, "DEBUG"), "isDebug");
  console.log(
    green("(T) DEBUG") + "=" + white(DEBUG + "")
  );
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
  async function* mkRangeAsyncIterator(start = 0, end = Infinity, delay = 100) {
    let iterationCount = 0;
    for (let i = start; i < end; i += 1) {
      iterationCount++;
      yield await new Promise((resolve) => {
        setTimeout(() => resolve(i), delay);
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
  async function getStream(url, transform = new TextDecoderStream()) {
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
      readable
    };
  }
  __name(getStream, "getStream");
  function putStream(url, transform = new TextEncoderStream()) {
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
      headers
    });
    const response = fetch(request);
    response.then(async (response2) => {
      if (response2.ok) {
        const message2 = await response2.text();
        console.log("[closed]", message2);
        return;
      }
      const status = response2.status;
      const message = await response2.text();
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
      response,
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
  var PipeStream = class {
    constructor(_source, _transform, _sink) {
      this._source = _source;
      this._transform = _transform;
      this._sink = _sink;
      this._source.pipeThrough(_transform).pipeTo(_sink);
    }
    static {
      __name(this, "PipeStream");
    }
    get source() {
      return this._source;
    }
    get transform() {
      return this._transform;
    }
    get sink() {
      return this._sink;
    }
  };
  var PipelineStream = class {
    constructor(transformers, writableStrategy, readableStrategy) {
      this.transformers = transformers;
      const [first, ...rest] = this.transformers;
      this.writable = first.writable;
      this.readable = rest.reduce(
        (readable, transform) => readable.pipeThrough(transform),
        first.readable
      );
    }
    static {
      __name(this, "PipelineStream");
    }
    readable;
    writable;
  };
  return __toCommonJS(utils_exports);
})();
//# sourceMappingURL=utils.js.map
