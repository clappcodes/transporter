var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import * as colors from "./colors.ts";
import { readable, transform } from "./mod.ts";
const idKey = "transport-id";
import demo from "./app/echo2.ts";
import { defineStreamHandler } from "./app/defineStreamHandler.ts";
import { Promised } from "./utils/Promised.ts";
const demoFetch = defineStreamHandler(demo.fetch);
function fetch(input, init) {
  const request = input instanceof Request ? input : new Request(input, init);
  return demoFetch(request);
}
__name(fetch, "fetch");
const isDebug = /* @__PURE__ */ __name(() => typeof Deno !== "undefined" ? Deno.env.get("DEBUG") === "true" : Boolean(Reflect.get(globalThis, "DEBUG")), "isDebug");
Object.assign(globalThis, { isDebug });
console.log(
  colors.green("(utils) DEBUG") + "=" + colors.white(isDebug() + "")
);
function mkId(key = "abcdefghkl") {
  if (key.length !== 10) {
    throw new TypeError(
      `Key format error, required 10 unique chars, got: "${key}" (len=${key.length})`
    );
  }
  const alphaMap = [...key];
  return (value) => [...String(value)].map((num) => alphaMap[Number(num)]).join("");
}
__name(mkId, "mkId");
const tid = mkId("5aksj3hg7e".toUpperCase());
const uid = /* @__PURE__ */ __name(() => tid(Math.random().toString().split(".").pop()), "uid");
async function waitForStatus(request, status, options = { retry: 10 }) {
  if (!request.headers.has(idKey)) {
    throw new TypeError(`Header "${idKey}" missing`);
  }
  const promise = new Promised();
  const response = await fetch(request);
  const body = response.body;
  const stream = body.pipeThrough(transform.decode());
  const read = readable.read((_status) => {
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
  read(stream);
  return promise;
}
__name(waitForStatus, "waitForStatus");
async function duplexFetch(input, init) {
  const id = uid();
  const { body, ...rest } = init || {};
  const headers = Object.assign(/* @__PURE__ */ Object.create(null), init?.headers, {
    [idKey]: id
  });
  const ready = waitForStatus(
    new Request(input, { method: "HEAD", headers }),
    "incoming"
  );
  fetch(input, {
    // @ts-ignore .
    duplex: "half",
    method: "POST",
    ...rest,
    headers: {
      ...headers,
      "transport-status": "incoming"
    },
    body
  });
  await ready;
  return fetch(input, {
    ...rest,
    headers: {
      ...headers,
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
  const nameColor = isIn ? colors.cyan : colors.magenta;
  const nameBg = /* @__PURE__ */ __name((a) => a, "nameBg");
  console.log(
    colors.gray(
      `${nameColor(
        nameBg(
          colors.bold(_this.name) + "[" + _this.env + "] /" + colors.italic(_this.url.pathname) + " "
        )
      )} ${colors.brightWhite(colors.bold(method))}(${colors.brightYellow(_this.id) + ", " + colors.brightGreen(_this.idx + "")}) ${colors.blue("=>")}`
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
  const response = await fetch(request);
  const id = Number(response.headers.get("duplex-id") || "0");
  url.hash = `#${id}`;
  if (!response.body) {
    throw new Error(`Response body`);
  }
  const readable2 = response.body.pipeThrough(transform2);
  return {
    url,
    id,
    request,
    response,
    readable: readable2
  };
}
__name(getStream, "getStream");
function putStream(url, transform2 = new TextEncoderStream()) {
  url = new URL(url, location.href);
  const { writable: writable2, readable: readable2 } = transform2;
  const [readable1, readable22] = readable2.tee();
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
    writable: writable2,
    readable: readable2,
    readable1,
    readable2: readable22,
    headers,
    request,
    response,
    abortController
  };
  return o;
}
__name(putStream, "putStream");
function createRead(readable2, cb) {
  const reader = readable2 instanceof ReadableStream ? readable2.getReader() : readable2.readable.getReader();
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
function createWrite(writable2) {
  const writer = writable2 instanceof WritableStream ? writable2.getWriter() : writable2.writable.getWriter();
  Object.assign(write, { writer });
  async function write(chunk) {
    await writer.ready;
    await writer.write(chunk);
  }
  __name(write, "write");
  return write;
}
__name(createWrite, "createWrite");
const swapObject = /* @__PURE__ */ __name((obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k])), "swapObject");
const valueFromKeyObject = /* @__PURE__ */ __name((obj) => Object.fromEntries(Object.entries(obj).map(([k, _v]) => [k, k])), "valueFromKeyObject");
const _isTransformStream = /* @__PURE__ */ __name((input) => typeof input === "object" && Object.hasOwn(input, "writable") && Object.hasOwn(input, "readable"), "_isTransformStream");
const isTransformStream = /* @__PURE__ */ __name((a) => typeof a === "object" && "readable" in a, "isTransformStream");
class PipelineStream {
  constructor(transformers, writableStrategy, readableStrategy) {
    this.transformers = transformers;
    const [first, ...rest] = this.transformers;
    this.writable = first.writable;
    this.readable = rest.reduce(
      (readable2, transform2) => readable2.pipeThrough(transform2),
      first.readable
    );
  }
  static {
    __name(this, "PipelineStream");
  }
  readable;
  writable;
}
export {
  PipelineStream,
  ReadyState,
  _isTransformStream,
  colors,
  createRead,
  createWrite,
  delay,
  duplexFetch,
  getStream,
  idKey,
  isDebug,
  isTransformStream,
  log,
  mkId,
  mkRangeAsyncIterator,
  mkRangeIterator,
  putStream,
  swapObject,
  tid,
  uid,
  valueFromKeyObject,
  waitForStatus
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vdXRpbHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIGRlbm8tbGludC1pZ25vcmUtZmlsZVxuaW1wb3J0ICogYXMgY29sb3JzIGZyb20gXCIuL2NvbG9ycy50c1wiO1xuaW1wb3J0IHsgdHlwZSBPdXRnb2luZ1N0cmVhbSB9IGZyb20gXCIuL091dGdvaW5nU3RyZWFtLnRzXCI7XG5pbXBvcnQgeyB0eXBlIEluY29taW5nU3RyZWFtIH0gZnJvbSBcIi4vSW5jb21pbmdTdHJlYW0udHNcIjtcbmltcG9ydCB7IHJlYWRhYmxlLCB0cmFuc2Zvcm0sIHdyaXRhYmxlIH0gZnJvbSBcIi4vbW9kLnRzXCI7XG5cbmV4cG9ydCB7IGNvbG9ycyB9O1xuZXhwb3J0IGNvbnN0IGlkS2V5ID0gXCJ0cmFuc3BvcnQtaWRcIjtcblxuaW1wb3J0IGRlbW8gZnJvbSBcIi4vYXBwL2VjaG8yLnRzXCI7XG5pbXBvcnQgeyBkZWZpbmVTdHJlYW1IYW5kbGVyIH0gZnJvbSBcIi4vYXBwL2RlZmluZVN0cmVhbUhhbmRsZXIudHNcIjtcbmltcG9ydCB7IFByb21pc2VkIH0gZnJvbSBcIi4vdXRpbHMvUHJvbWlzZWQudHNcIjtcblxuY29uc3QgZGVtb0ZldGNoID0gZGVmaW5lU3RyZWFtSGFuZGxlcihkZW1vLmZldGNoKTtcblxuZnVuY3Rpb24gZmV0Y2goaW5wdXQ6IFVSTCB8IFJlcXVlc3RJbmZvLCBpbml0PzogUmVxdWVzdEluaXQpIHtcbiAgY29uc3QgcmVxdWVzdCA9IGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCA/IGlucHV0IDogbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpO1xuXG4gIHJldHVybiBkZW1vRmV0Y2gocmVxdWVzdCk7XG59XG5cbi8vIGNvbnN0IGZldGNoID0gZGVmaW5lU3RyZWFtSGFuZGxlcihkZW1vLmZldGNoKTtcblxuZXhwb3J0IGNvbnN0IGlzRGVidWcgPSAoKTogYm9vbGVhbiA9PlxuICB0eXBlb2YgRGVubyAhPT0gXCJ1bmRlZmluZWRcIlxuICAgID8gRGVuby5lbnYuZ2V0KFwiREVCVUdcIikgPT09IFwidHJ1ZVwiXG4gICAgOiBCb29sZWFuKFJlZmxlY3QuZ2V0KGdsb2JhbFRoaXMsIFwiREVCVUdcIikpO1xuXG5PYmplY3QuYXNzaWduKGdsb2JhbFRoaXMsIHsgaXNEZWJ1ZyB9KTtcblxuY29uc29sZS5sb2coXG4gIGNvbG9ycy5ncmVlbihcIih1dGlscykgREVCVUdcIikgKyBcIj1cIiArXG4gICAgY29sb3JzLndoaXRlKGlzRGVidWcoKSArIFwiXCIpLFxuKTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1rSWQ8SyBleHRlbmRzIHN0cmluZz4oa2V5OiBLID0gXCJhYmNkZWZnaGtsXCIgYXMgSykge1xuICBpZiAoa2V5Lmxlbmd0aCAhPT0gMTApIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFxuICAgICAgYEtleSBmb3JtYXQgZXJyb3IsIHJlcXVpcmVkIDEwIHVuaXF1ZSBjaGFycywgZ290OiBcIiR7a2V5fVwiIChsZW49JHtrZXkubGVuZ3RofSlgLFxuICAgICk7XG4gIH1cbiAgY29uc3QgYWxwaGFNYXAgPSBbLi4ua2V5XTtcblxuICByZXR1cm4gPEkgZXh0ZW5kcyBzdHJpbmcgPSBcIjAxMjM0NTY3ODlcIj4odmFsdWU6IEkpOiBLWzBdID0+XG4gICAgWy4uLlN0cmluZyh2YWx1ZSldLm1hcCgobnVtKSA9PiBhbHBoYU1hcFtOdW1iZXIobnVtKV0pLmpvaW4oXCJcIik7XG59XG5cbmV4cG9ydCBjb25zdCB0aWQgPSBta0lkKFwiNWFrc2ozaGc3ZVwiLnRvVXBwZXJDYXNlKCkpO1xuZXhwb3J0IGNvbnN0IHVpZCA9ICgpID0+IHRpZChNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCkuc3BsaXQoXCIuXCIpLnBvcCgpISk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3YWl0Rm9yU3RhdHVzKFxuICByZXF1ZXN0OiBSZXF1ZXN0LFxuICBzdGF0dXM6IHN0cmluZyxcbiAgb3B0aW9uczogeyByZXRyeTogbnVtYmVyIH0gPSB7IHJldHJ5OiAxMCB9LFxuKTogUHJvbWlzZTxzdHJpbmcgfCBudWxsPiB7XG4gIGlmICghcmVxdWVzdC5oZWFkZXJzLmhhcyhpZEtleSkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBIZWFkZXIgXCIke2lkS2V5fVwiIG1pc3NpbmdgKTtcbiAgfVxuXG4gIC8vIGNvbnN0IHJlcUlkVmFsdWUgPSByZXF1ZXN0LmhlYWRlcnMuZ2V0KGlkS2V5KTtcbiAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlZDxzdHJpbmc+KCk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChyZXF1ZXN0KTtcbiAgY29uc3QgYm9keSA9IHJlc3BvbnNlLmJvZHkhO1xuXG4gIGNvbnN0IHN0cmVhbSA9IGJvZHkucGlwZVRocm91Z2godHJhbnNmb3JtLmRlY29kZSgpKTtcblxuICBjb25zdCByZWFkID0gcmVhZGFibGUucmVhZCgoX3N0YXR1czogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgaXNPayA9IFN0cmluZyhfc3RhdHVzKS50cmltKCkgPT09IFN0cmluZyhzdGF0dXMpLnRyaW0oKTtcbiAgICBjb25zb2xlLmxvZyhcbiAgICAgIFwiKHdhaXRGb3JTdGF0dXMpXCIsXG4gICAgICByZXF1ZXN0Lm1ldGhvZCxcbiAgICAgIHJlcXVlc3QudXJsLFxuICAgICAgc3RhdHVzLFxuICAgICAgX3N0YXR1cyxcbiAgICAgIGlzT2ssXG4gICAgKTtcblxuICAgIGlmIChpc09rICYmICFwcm9taXNlLnJlc29sdmVkKSB7XG4gICAgICBwcm9taXNlLnJlc29sdmVkID0gdHJ1ZTtcbiAgICAgIHByb21pc2UucmVzb2x2ZShfc3RhdHVzKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJlYWQoc3RyZWFtKTtcblxuICByZXR1cm4gcHJvbWlzZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGR1cGxleEZldGNoKFxuICBpbnB1dDogVVJMIHwgUmVxdWVzdEluZm8sXG4gIGluaXQ/OiBSZXF1ZXN0SW5pdCxcbik6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgY29uc3QgaWQgPSB1aWQoKTsgLy8gU3RyaW5nKE1hdGgucmFuZG9tKCkpLnNsaWNlKDIpO1xuICBjb25zdCB7IGJvZHksIC4uLnJlc3QgfSA9IGluaXQgfHwge307XG5cbiAgY29uc3QgaGVhZGVycyA9IE9iamVjdC5hc3NpZ24oT2JqZWN0LmNyZWF0ZShudWxsKSwgaW5pdD8uaGVhZGVycywge1xuICAgIFtpZEtleV06IGlkLFxuICB9KTtcblxuICAvLyBpbmNvbWluZ1xuICAvLyBvdXRnb2luZ1xuICBjb25zdCByZWFkeSA9IHdhaXRGb3JTdGF0dXMoXG4gICAgbmV3IFJlcXVlc3QoaW5wdXQsIHsgbWV0aG9kOiBcIkhFQURcIiwgaGVhZGVycyB9KSxcbiAgICBcImluY29taW5nXCIsXG4gICk7XG5cbiAgZmV0Y2goaW5wdXQsIHtcbiAgICAvLyBAdHMtaWdub3JlIC5cbiAgICBkdXBsZXg6IFwiaGFsZlwiLFxuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgLi4ucmVzdCxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAuLi5oZWFkZXJzLFxuICAgICAgXCJ0cmFuc3BvcnQtc3RhdHVzXCI6IFwiaW5jb21pbmdcIixcbiAgICB9LFxuICAgIGJvZHksXG4gIH0pO1xuXG4gIGF3YWl0IHJlYWR5O1xuXG4gIHJldHVybiBmZXRjaChpbnB1dCwge1xuICAgIC4uLnJlc3QsXG4gICAgaGVhZGVyczoge1xuICAgICAgLi4uaGVhZGVycyxcbiAgICAgIFwidHJhbnNwb3J0LXN0YXR1c1wiOiBcIm91dGdvaW5nXCIsXG4gICAgfSxcbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWxheShtczogbnVtYmVyKTogUHJvbWlzZTx1bmtub3duPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpO1xuICB9KTtcbn1cblxuZXhwb3J0IGVudW0gUmVhZHlTdGF0ZSB7XG4gIENPTk5FQ1RJTkcgPSAwLFxuICBJTkNPTUlORyA9IDEsXG4gIE9VVEdPSU5HID0gMixcbiAgT1BFTiA9IDMsXG4gIENMT1NFRCA9IDQsXG4gIEVSUk9SRUQgPSA1LFxufVxuXG5leHBvcnQgZnVuY3Rpb24qIG1rUmFuZ2VJdGVyYXRvcihcbiAgc3RhcnQgPSAwLFxuICBlbmQgPSBJbmZpbml0eSxcbiAgc3RlcCA9IDEsXG4pOiBHZW5lcmF0b3I8bnVtYmVyLCBudW1iZXIsIHVua25vd24+IHtcbiAgbGV0IGl0ZXJhdGlvbkNvdW50ID0gMDtcbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IHN0ZXApIHtcbiAgICBpdGVyYXRpb25Db3VudCsrO1xuICAgIHlpZWxkIGk7XG4gIH1cbiAgcmV0dXJuIGl0ZXJhdGlvbkNvdW50O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24qIG1rUmFuZ2VBc3luY0l0ZXJhdG9yKFxuICBzdGFydCA9IDAsXG4gIGVuZCA9IEluZmluaXR5LFxuICBkZWxheSA9IDEwMCxcbik6IEFzeW5jR2VuZXJhdG9yPHVua25vd24sIG51bWJlciwgdW5rbm93bj4ge1xuICBsZXQgaXRlcmF0aW9uQ291bnQgPSAwO1xuICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMSkge1xuICAgIGl0ZXJhdGlvbkNvdW50Kys7XG4gICAgeWllbGQgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVzb2x2ZShpKSwgZGVsYXkpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBpdGVyYXRpb25Db3VudDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvZyhcbiAgX3RoaXM6IEluY29taW5nU3RyZWFtIHwgT3V0Z29pbmdTdHJlYW0sXG4gIG1ldGhvZDogc3RyaW5nLFxuICAuLi52YWx1ZTogdW5rbm93bltdXG4pIHtcbiAgaWYgKCFpc0RlYnVnKCkpIHJldHVybjtcbiAgY29uc3QgaXNJbiA9IF90aGlzLmNvbnN0cnVjdG9yLm5hbWUgPT09IFwiSW5jb21pbmdTdHJlYW1cIjtcbiAgY29uc3QgbmFtZUNvbG9yID0gaXNJbiA/IGNvbG9ycy5jeWFuIDogY29sb3JzLm1hZ2VudGE7XG4gIGNvbnN0IG5hbWVCZyA9IChhOiBzdHJpbmcpID0+IGE7XG5cbiAgY29uc29sZS5sb2coXG4gICAgY29sb3JzLmdyYXkoXG4gICAgICBgJHsobmFtZUNvbG9yKFxuICAgICAgICBuYW1lQmcoXG4gICAgICAgICAgY29sb3JzLmJvbGQoX3RoaXMubmFtZSkgKyBcIltcIiArIF90aGlzLmVudiArIFwiXVwiICsgXCIgL1wiICtcbiAgICAgICAgICAgIGNvbG9ycy5pdGFsaWMoX3RoaXMudXJsLnBhdGhuYW1lKSArXG4gICAgICAgICAgICBcIiBcIixcbiAgICAgICAgKSxcbiAgICAgICkpfSAke2NvbG9ycy5icmlnaHRXaGl0ZShjb2xvcnMuYm9sZChtZXRob2QpKX0oJHtcbiAgICAgICAgY29sb3JzLmJyaWdodFllbGxvdyhfdGhpcy5pZCkgKyBcIiwgXCIgK1xuICAgICAgICBjb2xvcnMuYnJpZ2h0R3JlZW4oX3RoaXMuaWR4ICsgXCJcIilcbiAgICAgIH0pICR7Y29sb3JzLmJsdWUoXCI9PlwiKX1gLFxuICAgICksXG4gICAgLi4udmFsdWUsXG4gICk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTdHJlYW0oXG4gIHVybDogVVJMIHwgc3RyaW5nLFxuICB0cmFuc2Zvcm06IFRyYW5zZm9ybVN0cmVhbSA9IG5ldyBUZXh0RGVjb2RlclN0cmVhbSgpLFxuKTogUHJvbWlzZTx7XG4gIHVybDogVVJMO1xuICBpZDogbnVtYmVyO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICByZXNwb25zZTogUmVzcG9uc2U7XG4gIHJlYWRhYmxlOiBSZWFkYWJsZVN0cmVhbTxzdHJpbmc+O1xufT4ge1xuICB1cmwgPSBuZXcgVVJMKHVybCwgbG9jYXRpb24uaHJlZik7XG5cbiAgY29uc3QgYWJvcnRDb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcblxuICBjb25zdCByZXF1ZXN0ID0gbmV3IFJlcXVlc3QodXJsLCB7XG4gICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIGNhY2hlOiBcIm5vLWNhY2hlXCIsXG4gICAgLy8gQHRzLWlnbm9yZSA/XG4gICAgc2lnbmFsOiBhYm9ydENvbnRyb2xsZXIuc2lnbmFsLFxuICAgIGhlYWRlcnMsXG4gIH0pO1xuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocmVxdWVzdCk7XG4gIGNvbnN0IGlkID0gTnVtYmVyKHJlc3BvbnNlLmhlYWRlcnMuZ2V0KFwiZHVwbGV4LWlkXCIpIHx8IFwiMFwiKTtcbiAgdXJsLmhhc2ggPSBgIyR7aWR9YDtcblxuICBpZiAoIXJlc3BvbnNlLmJvZHkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYFJlc3BvbnNlIGJvZHlgKTtcbiAgfVxuXG4gIGNvbnN0IHJlYWRhYmxlID0gcmVzcG9uc2UuYm9keS5waXBlVGhyb3VnaCh0cmFuc2Zvcm0pO1xuXG4gIHJldHVybiB7XG4gICAgdXJsLFxuICAgIGlkLFxuICAgIHJlcXVlc3QsXG4gICAgcmVzcG9uc2UsXG4gICAgcmVhZGFibGUsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwdXRTdHJlYW0oXG4gIHVybDogVVJMIHwgc3RyaW5nLFxuICB0cmFuc2Zvcm06IFRyYW5zZm9ybVN0cmVhbSA9IG5ldyBUZXh0RW5jb2RlclN0cmVhbSgpLFxuKToge1xuICBpZDogbnVtYmVyO1xuICB3cml0YWJsZTogV3JpdGFibGVTdHJlYW08YW55PjtcbiAgcmVhZGFibGU6IFJlYWRhYmxlU3RyZWFtPGFueT47XG4gIHJlYWRhYmxlMTogUmVhZGFibGVTdHJlYW08YW55PjtcbiAgcmVhZGFibGUyOiBSZWFkYWJsZVN0cmVhbTxhbnk+O1xuICBoZWFkZXJzOiBIZWFkZXJzO1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICByZXNwb25zZTogUHJvbWlzZTxSZXNwb25zZT47XG4gIGFib3J0Q29udHJvbGxlcjogQWJvcnRDb250cm9sbGVyO1xufSB7XG4gIHVybCA9IG5ldyBVUkwodXJsLCBsb2NhdGlvbi5ocmVmKTtcblxuICBjb25zdCB7IHdyaXRhYmxlLCByZWFkYWJsZSB9ID0gdHJhbnNmb3JtO1xuICBjb25zdCBbcmVhZGFibGUxLCByZWFkYWJsZTJdID0gcmVhZGFibGUudGVlKCk7XG4gIGNvbnN0IGFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICBjb25zdCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKTtcbiAgY29uc3QgaWQgPSBOdW1iZXIodXJsLmhhc2guc2xpY2UoMSkgfHwgXCIwXCIpO1xuXG4gIGlmIChpZCkge1xuICAgIGhlYWRlcnMuc2V0KFwiZHVwbGV4LWlkXCIsIFN0cmluZyhpZCkpO1xuICB9XG5cbiAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KHVybCwge1xuICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICBib2R5OiByZWFkYWJsZTEsXG4gICAgY2FjaGU6IFwibm8tY2FjaGVcIixcbiAgICAvLyBAdHMtaWdub3JlID9cbiAgICBkdXBsZXg6IFwiaGFsZlwiLFxuICAgIHNpZ25hbDogYWJvcnRDb250cm9sbGVyLnNpZ25hbCxcbiAgICBoZWFkZXJzLFxuICB9KTtcblxuICBjb25zdCByZXNwb25zZSA9IGZldGNoKHJlcXVlc3QpO1xuXG4gIHJlc3BvbnNlLnRoZW4oYXN5bmMgKHJlc3BvbnNlKSA9PiB7XG4gICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuXG4gICAgICBjb25zb2xlLmxvZyhcIltjbG9zZWRdXCIsIG1lc3NhZ2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHN0YXR1cyA9IHJlc3BvbnNlLnN0YXR1cztcbiAgICBjb25zdCBtZXNzYWdlID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuXG4gICAgdGhyb3cgbmV3IEVycm9yKGBSZXF1ZXN0IGZhaWxlZDogJHttZXNzYWdlfWAsIHsgY2F1c2U6IHN0YXR1cyB9KTtcbiAgfSkuY2F0Y2goKGVycm9yOiBFcnJvcikgPT4ge1xuICAgIGNvbnNvbGUud2FybihlcnJvci5uYW1lLCBlcnJvci5jYXVzZSwgZXJyb3IubWVzc2FnZSk7XG4gIH0pO1xuXG4gIGNvbnN0IG8gPSB7XG4gICAgaWQsXG4gICAgd3JpdGFibGUsXG4gICAgcmVhZGFibGUsXG4gICAgcmVhZGFibGUxLFxuICAgIHJlYWRhYmxlMixcbiAgICBoZWFkZXJzLFxuICAgIHJlcXVlc3QsXG4gICAgcmVzcG9uc2UsXG4gICAgYWJvcnRDb250cm9sbGVyLFxuICB9O1xuXG4gIHJldHVybiBvO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVhZDxUPihcbiAgcmVhZGFibGU6IFJlYWRhYmxlU3RyZWFtPFQ+IHwgeyByZWFkYWJsZTogUmVhZGFibGVTdHJlYW08VD4gfSxcbiAgY2I6IChjaHVuazogVCkgPT4gdm9pZCxcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCByZWFkZXIgPSAocmVhZGFibGUgaW5zdGFuY2VvZiBSZWFkYWJsZVN0cmVhbSlcbiAgICA/IHJlYWRhYmxlLmdldFJlYWRlcigpXG4gICAgOiByZWFkYWJsZS5yZWFkYWJsZS5nZXRSZWFkZXIoKTtcblxuICBhc3luYyBmdW5jdGlvbiByZWFkKGNiOiAoY2h1bms6IFQpID0+IHZvaWQpIHtcbiAgICB0cnkge1xuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgY29uc3QgeyBkb25lLCB2YWx1ZSB9ID0gYXdhaXQgcmVhZGVyLnJlYWQoKTtcbiAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2IodmFsdWUpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICByZWFkZXIucmVsZWFzZUxvY2soKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVhZChjYik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVXcml0ZTxUPihcbiAgd3JpdGFibGU6IFdyaXRhYmxlU3RyZWFtPFQ+IHwgeyB3cml0YWJsZTogV3JpdGFibGVTdHJlYW08VD4gfSxcbik6IChjaHVuazogVCkgPT4gUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHdyaXRlciA9ICh3cml0YWJsZSBpbnN0YW5jZW9mIFdyaXRhYmxlU3RyZWFtKVxuICAgID8gd3JpdGFibGUuZ2V0V3JpdGVyKClcbiAgICA6IHdyaXRhYmxlLndyaXRhYmxlLmdldFdyaXRlcigpO1xuXG4gIE9iamVjdC5hc3NpZ24od3JpdGUsIHsgd3JpdGVyIH0pO1xuXG4gIGFzeW5jIGZ1bmN0aW9uIHdyaXRlKGNodW5rOiBUKSB7XG4gICAgYXdhaXQgd3JpdGVyLnJlYWR5O1xuICAgIGF3YWl0IHdyaXRlci53cml0ZShjaHVuayk7XG4gIH1cblxuICByZXR1cm4gd3JpdGU7XG59XG5cbmV4cG9ydCBjb25zdCBzd2FwT2JqZWN0ID0gPFQgZXh0ZW5kcyB7IFtrZXk6IFByb3BlcnR5S2V5XTogYW55IH0+KFxuICBvYmo6IFQsXG4pOiB7XG4gIFtLIGluIGtleW9mIFQgYXMgVFtLXV06IEs7XG59ID0+IE9iamVjdC5mcm9tRW50cmllcyhPYmplY3QuZW50cmllcyhvYmopLm1hcCgoW2ssIHZdKSA9PiBbdiwga10pKTtcblxuZXhwb3J0IGNvbnN0IHZhbHVlRnJvbUtleU9iamVjdCA9IDxUIGV4dGVuZHMgeyBba2V5OiBQcm9wZXJ0eUtleV06IGFueSB9PihcbiAgb2JqOiBULFxuKToge1xuICBbSyBpbiBrZXlvZiBUXTogSztcbn0gPT4gT2JqZWN0LmZyb21FbnRyaWVzKE9iamVjdC5lbnRyaWVzKG9iaikubWFwKChbaywgX3ZdKSA9PiBbayBhcyBhbnksIGtdKSk7XG5cbmV4cG9ydCBjb25zdCBfaXNUcmFuc2Zvcm1TdHJlYW0gPSA8VCBleHRlbmRzIG9iamVjdD4oaW5wdXQ6IFQpOiBib29sZWFuID0+XG4gIHR5cGVvZiBpbnB1dCA9PT0gXCJvYmplY3RcIiAmJlxuICBPYmplY3QuaGFzT3duKGlucHV0LCBcIndyaXRhYmxlXCIpICYmIE9iamVjdC5oYXNPd24oaW5wdXQsIFwicmVhZGFibGVcIik7XG5cbmV4cG9ydCBjb25zdCBpc1RyYW5zZm9ybVN0cmVhbSA9IChhOiB1bmtub3duKTogYSBpcyBHZW5lcmljVHJhbnNmb3JtU3RyZWFtID0+XG4gIHR5cGVvZiBhID09PSBcIm9iamVjdFwiICYmIFwicmVhZGFibGVcIiBpbiBhITtcblxudHlwZSBMZW5ndGhPZlR1cGxlPFQgZXh0ZW5kcyBhbnlbXT4gPSBUIGV4dGVuZHMgeyBsZW5ndGg6IGluZmVyIEwgfSA/IExcbiAgOiBuZXZlcjtcbnR5cGUgRHJvcEZpcnN0SW5UdXBsZTxUIGV4dGVuZHMgYW55W10+ID0gKCguLi5hcmdzOiBUKSA9PiBhbnkpIGV4dGVuZHNcbiAgKGFyZzogYW55LCAuLi5yZXN0OiBpbmZlciBVKSA9PiBhbnkgPyBVIDogVDtcbmV4cG9ydCB0eXBlIExhc3RJblR1cGxlPFQgZXh0ZW5kcyBhbnlbXT4gPVxuICBUW0xlbmd0aE9mVHVwbGU8RHJvcEZpcnN0SW5UdXBsZTxUPj5dO1xuXG5leHBvcnQgY2xhc3MgUGlwZWxpbmVTdHJlYW08XG4gIFQgZXh0ZW5kcyBbVHJhbnNmb3JtU3RyZWFtLCAuLi5UcmFuc2Zvcm1TdHJlYW1bXV0sXG4+IHtcbiAgcmVhZGFibGU6IExhc3RJblR1cGxlPFQ+W1wicmVhZGFibGVcIl07XG4gIHdyaXRhYmxlOiBUWzBdW1wid3JpdGFibGVcIl07XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0cmFuc2Zvcm1lcnM6IFQsXG4gICAgd3JpdGFibGVTdHJhdGVneT86IFF1ZXVpbmdTdHJhdGVneSxcbiAgICByZWFkYWJsZVN0cmF0ZWd5PzogUXVldWluZ1N0cmF0ZWd5LFxuICApIHtcbiAgICBjb25zdCBbZmlyc3QsIC4uLnJlc3RdID0gdGhpcy50cmFuc2Zvcm1lcnM7XG5cbiAgICB0aGlzLndyaXRhYmxlID0gZmlyc3Qud3JpdGFibGU7XG4gICAgdGhpcy5yZWFkYWJsZSA9IHJlc3QucmVkdWNlKFxuICAgICAgKHJlYWRhYmxlLCB0cmFuc2Zvcm0pID0+IHJlYWRhYmxlLnBpcGVUaHJvdWdoKHRyYW5zZm9ybSksXG4gICAgICBmaXJzdC5yZWFkYWJsZSxcbiAgICApO1xuXG4gICAgLy8gaWYgKHRoaXMudHJhbnNmb3JtZXJzLmxlbmd0aCA9PT0gMykge1xuICAgIC8vICAgdGhpcy5yZWFkYWJsZSA9IHRoaXMudHJhbnNmb3JtZXJzWzBdLnJlYWRhYmxlXG4gICAgLy8gICAgIC5waXBlVGhyb3VnaCh0aGlzLnRyYW5zZm9ybWVyc1sxXSlcbiAgICAvLyAgICAgLnBpcGVUaHJvdWdoKHRoaXMudHJhbnNmb3JtZXJzWzJdKTtcbiAgICAvLyB9IGVsc2Uge1xuICAgIC8vICAgdGhpcy5yZWFkYWJsZSA9IHRoaXMudHJhbnNmb3JtZXJzLmF0KC0xKSEucmVhZGFibGU7XG4gICAgLy8gfVxuICB9XG59XG5cbi8vIGNvbnN0IHBpcCA9IG5ldyBQaXBlbGluZVN0cmVhbShbXG4vLyAgIG5ldyBUcmFuc2Zvcm1TdHJlYW08c3RyaW5nLCBudW1iZXI+KCksXG4vLyAgIG5ldyBUcmFuc2Zvcm1TdHJlYW08bnVtYmVyLCBzeW1ib2w+KCksXG4vLyAgIG5ldyBUcmFuc2Zvcm1TdHJlYW08c3RyaW5nLCBudW1iZXI+KCksXG4vLyBdKTtcblxuLy8gcGlwLndyaXRhYmxlLmdldFdyaXRlcigpLndyaXRlKFwic3NcIik7XG4vLyBwaXAucmVhZGFibGUuZ2V0UmVhZGVyKCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUNBLFlBQVksWUFBWTtBQUd4QixTQUFTLFVBQVUsaUJBQTJCO0FBR3ZDLE1BQU0sUUFBUTtBQUVyQixPQUFPLFVBQVU7QUFDakIsU0FBUywyQkFBMkI7QUFDcEMsU0FBUyxnQkFBZ0I7QUFFekIsTUFBTSxZQUFZLG9CQUFvQixLQUFLLEtBQUs7QUFFaEQsU0FBUyxNQUFNLE9BQTBCLE1BQW9CO0FBQzNELFFBQU0sVUFBVSxpQkFB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TyxVQUFVLFlBQ2pCLE9BQU8sT0FBTyxPQUFPLFVBQVUsS0FBSyxPQUFPLE9BQU8sT0FBTyxVQUFVLEdBRm5DO0FBSTNCLE1BQU0sb0JBQW9CLHdCQUFDLE1BQ2hDLE9BQU8sTUFBTSxZQUFZLGNBQWMsR0FEUjtBQVUxQixNQUFNLGVBRVg7QUFBQSxFQUlBLFlBQ1UsY0FDUixrQkFDQSxrQkFDQTtBQUhRO0FBSVIsVUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLElBQUksS0FBSztBQUU5QixTQUFLLFdBQVcsTUFBTTtBQUN0QixTQUFLLFdBQVcsS0FBSztBQUFBLE1BQ25CLENBQUNELFdBQVVELGVBQWNDLFVBQVMsWUFBWUQsVUFBUztBQUFBLE1BQ3ZELE1BQU07QUFBQSxJQUNSO0FBQUEsRUFTRjtBQUFBLEVBdFpGLE9BOFhFO0FBQUE7QUFBQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBdUJGOyIsCiAgIm5hbWVzIjogWyJSZWFkeVN0YXRlIiwgImRlbGF5IiwgInRyYW5zZm9ybSIsICJyZWFkYWJsZSIsICJ3cml0YWJsZSIsICJyZWFkYWJsZTIiLCAicmVzcG9uc2UiLCAibWVzc2FnZSIsICJjYiJdCn0K
