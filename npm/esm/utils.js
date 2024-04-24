// deno-lint-ignore-file
import "./_dnt.polyfills.js";
import * as dntShim from "./_dnt.shims.js";
import * as colors from "./colors.js";
export { colors };
export const DEBUG = typeof Deno !== "undefined"
    ? Deno.env.get("DEBUG")
    : Reflect.get(dntShim.dntGlobalThis, "DEBUG");
console.log(colors.green("(T) DEBUG") + "=" +
    colors.white(DEBUG + ""));
export var ReadyState;
(function (ReadyState) {
    ReadyState[ReadyState["CONNECTING"] = 0] = "CONNECTING";
    ReadyState[ReadyState["INCOMING"] = 1] = "INCOMING";
    ReadyState[ReadyState["OUTGOING"] = 2] = "OUTGOING";
    ReadyState[ReadyState["OPEN"] = 3] = "OPEN";
    ReadyState[ReadyState["CLOSED"] = 4] = "CLOSED";
    ReadyState[ReadyState["ERRORED"] = 5] = "ERRORED";
})(ReadyState || (ReadyState = {}));
export function* mkRangeIterator(start = 0, end = Infinity, step = 1) {
    let iterationCount = 0;
    for (let i = start; i < end; i += step) {
        iterationCount++;
        yield i;
    }
    return iterationCount;
}
export async function* mkRangeAsyncIterator(start = 0, end = Infinity, delay = 100) {
    let iterationCount = 0;
    for (let i = start; i < end; i += 1) {
        iterationCount++;
        yield await new Promise((resolve) => {
            setTimeout(() => resolve(i), delay);
        });
    }
    return iterationCount;
}
export class DeferredPromise extends Promise {
    constructor(resolver) {
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
export function log(_this, method, ...value) {
    if (!DEBUG)
        return;
    const isIn = _this.constructor.name === "IncomingStream";
    const nameColor = isIn ? colors.cyan : colors.magenta;
    const nameBg = (a) => a;
    console.log(colors.gray(`${(nameColor(nameBg(colors.bold(_this.name) + "[" + _this.env + "]" + " /" +
        colors.italic(_this.url.pathname) +
        " ")))} ${colors.brightWhite(colors.bold(method))}(${colors.brightYellow(_this.id) + ", " +
        colors.brightGreen(_this.idx + "")}) ${colors.blue("=>")}`), ...value);
}
export async function getStream(url, transform = new TextDecoderStream()) {
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
export function putStream(url, transform = new TextEncoderStream()) {
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
        abortController,
    };
    return o;
}
export function createRead(readable, cb) {
    const reader = (readable instanceof ReadableStream)
        ? readable.getReader()
        : readable.readable.getReader();
    async function read(cb) {
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    return;
                }
                cb(value);
            }
        }
        finally {
            reader.releaseLock();
        }
    }
    return read(cb);
}
export function createWrite(writable) {
    const writer = (writable instanceof WritableStream)
        ? writable.getWriter()
        : writable.writable.getWriter();
    Object.assign(write, { writer });
    async function write(chunk) {
        await writer.ready;
        await writer.write(chunk);
    }
    return write;
}
export const swapObject = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
export const valueFromKeyObject = (obj) => Object.fromEntries(Object.entries(obj).map(([k, _v]) => [k, k]));
