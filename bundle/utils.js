var __defProp = Object.defineProperty;
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
function getColorEnabled() {
  return enabled;
}
function code(open, close) {
  return {
    open: `\x1B[${open.join(";")}m`,
    close: `\x1B[${close}m`,
    regexp: new RegExp(`\\x1b\\[${close}m`, "g")
  };
}
function run(str, code2) {
  return enabled ? `${code2.open}${str.replace(code2.regexp, code2.open)}${code2.close}` : str;
}
function reset(str) {
  return run(str, code([0], 0));
}
function bold(str) {
  return run(str, code([1], 22));
}
function dim(str) {
  return run(str, code([2], 22));
}
function italic(str) {
  return run(str, code([3], 23));
}
function underline(str) {
  return run(str, code([4], 24));
}
function inverse(str) {
  return run(str, code([7], 27));
}
function hidden(str) {
  return run(str, code([8], 28));
}
function strikethrough(str) {
  return run(str, code([9], 29));
}
function black(str) {
  return run(str, code([30], 39));
}
function red(str) {
  return run(str, code([31], 39));
}
function green(str) {
  return run(str, code([32], 39));
}
function yellow(str) {
  return run(str, code([33], 39));
}
function blue(str) {
  return run(str, code([34], 39));
}
function magenta(str) {
  return run(str, code([35], 39));
}
function cyan(str) {
  return run(str, code([36], 39));
}
function white(str) {
  return run(str, code([37], 39));
}
function gray(str) {
  return brightBlack(str);
}
function brightBlack(str) {
  return run(str, code([90], 39));
}
function brightRed(str) {
  return run(str, code([91], 39));
}
function brightGreen(str) {
  return run(str, code([92], 39));
}
function brightYellow(str) {
  return run(str, code([93], 39));
}
function brightBlue(str) {
  return run(str, code([94], 39));
}
function brightMagenta(str) {
  return run(str, code([95], 39));
}
function brightCyan(str) {
  return run(str, code([96], 39));
}
function brightWhite(str) {
  return run(str, code([97], 39));
}
function bgBlack(str) {
  return run(str, code([40], 49));
}
function bgRed(str) {
  return run(str, code([41], 49));
}
function bgGreen(str) {
  return run(str, code([42], 49));
}
function bgYellow(str) {
  return run(str, code([43], 49));
}
function bgBlue(str) {
  return run(str, code([44], 49));
}
function bgMagenta(str) {
  return run(str, code([45], 49));
}
function bgCyan(str) {
  return run(str, code([46], 49));
}
function bgWhite(str) {
  return run(str, code([47], 49));
}
function bgBrightBlack(str) {
  return run(str, code([100], 49));
}
function bgBrightRed(str) {
  return run(str, code([101], 49));
}
function bgBrightGreen(str) {
  return run(str, code([102], 49));
}
function bgBrightYellow(str) {
  return run(str, code([103], 49));
}
function bgBrightBlue(str) {
  return run(str, code([104], 49));
}
function bgBrightMagenta(str) {
  return run(str, code([105], 49));
}
function bgBrightCyan(str) {
  return run(str, code([106], 49));
}
function bgBrightWhite(str) {
  return run(str, code([107], 49));
}
function clampAndTruncate(n, max = 255, min = 0) {
  return Math.trunc(Math.max(Math.min(n, max), min));
}
function rgb8(str, color) {
  return run(str, code([38, 5, clampAndTruncate(color)], 39));
}
function bgRgb8(str, color) {
  return run(str, code([48, 5, clampAndTruncate(color)], 49));
}
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
function stripAnsiCode(string) {
  return string.replace(ANSI_PATTERN, "");
}

// utils.ts
var DEBUG = typeof Deno !== "undefined" ? Deno.env.get("DEBUG") : Reflect.get(globalThis, "DEBUG");
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
var DeferredPromise = class extends Promise {
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
  if (!DEBUG)
    return;
  const isIn = _this.constructor.name === "IncomingStream";
  const nameColor = isIn ? cyan : magenta;
  const nameBg = (a) => a;
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
  return read(cb);
}
function createWrite(writable) {
  const writer = writable instanceof WritableStream ? writable.getWriter() : writable.writable.getWriter();
  Object.assign(write, { writer });
  async function write(chunk) {
    await writer.ready;
    await writer.write(chunk);
  }
  return write;
}
var swapObject = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
var valueFromKeyObject = (obj) => Object.fromEntries(Object.entries(obj).map(([k, _v]) => [k, k]));
export {
  DEBUG,
  DeferredPromise,
  ReadyState,
  colors_exports as colors,
  createRead,
  createWrite,
  getStream,
  log,
  mkRangeAsyncIterator,
  mkRangeIterator,
  putStream,
  swapObject,
  valueFromKeyObject
};
//# sourceMappingURL=utils.js.map
