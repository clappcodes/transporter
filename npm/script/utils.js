var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./_dnt.polyfills.js", "./_dnt.shims.js", "./colors.js"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.valueFromKeyObject = exports.swapObject = exports.createWrite = exports.createRead = exports.putStream = exports.getStream = exports.log = exports.DeferredPromise = exports.mkRangeAsyncIterator = exports.mkRangeIterator = exports.ReadyState = exports.DEBUG = exports.colors = void 0;
    // deno-lint-ignore-file
    require("./_dnt.polyfills.js");
    const dntShim = __importStar(require("./_dnt.shims.js"));
    const colors = __importStar(require("./colors.js"));
    exports.colors = colors;
    exports.DEBUG = typeof Deno !== "undefined"
        ? Deno.env.get("DEBUG")
        : Reflect.get(dntShim.dntGlobalThis, "DEBUG");
    console.log(colors.green("(T) DEBUG") + "=" +
        colors.white(exports.DEBUG + ""));
    var ReadyState;
    (function (ReadyState) {
        ReadyState[ReadyState["CONNECTING"] = 0] = "CONNECTING";
        ReadyState[ReadyState["INCOMING"] = 1] = "INCOMING";
        ReadyState[ReadyState["OUTGOING"] = 2] = "OUTGOING";
        ReadyState[ReadyState["OPEN"] = 3] = "OPEN";
        ReadyState[ReadyState["CLOSED"] = 4] = "CLOSED";
        ReadyState[ReadyState["ERRORED"] = 5] = "ERRORED";
    })(ReadyState || (exports.ReadyState = ReadyState = {}));
    function* mkRangeIterator(start = 0, end = Infinity, step = 1) {
        let iterationCount = 0;
        for (let i = start; i < end; i += step) {
            iterationCount++;
            yield i;
        }
        return iterationCount;
    }
    exports.mkRangeIterator = mkRangeIterator;
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
    exports.mkRangeAsyncIterator = mkRangeAsyncIterator;
    class DeferredPromise extends Promise {
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
    exports.DeferredPromise = DeferredPromise;
    function log(_this, method, ...value) {
        if (!exports.DEBUG)
            return;
        const isIn = _this.constructor.name === "IncomingStream";
        const nameColor = isIn ? colors.cyan : colors.magenta;
        const nameBg = (a) => a;
        console.log(colors.gray(`${(nameColor(nameBg(colors.bold(_this.name) + "[" + _this.env + "]" + " /" +
            colors.italic(_this.url.pathname) +
            " ")))} ${colors.brightWhite(colors.bold(method))}(${colors.brightYellow(_this.id) + ", " +
            colors.brightGreen(_this.idx + "")}) ${colors.blue("=>")}`), ...value);
    }
    exports.log = log;
    async function getStream(url, transform = new TextDecoderStream()) {
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
    exports.getStream = getStream;
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
    exports.putStream = putStream;
    function createRead(readable, cb) {
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
    exports.createRead = createRead;
    function createWrite(writable) {
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
    exports.createWrite = createWrite;
    const swapObject = (obj) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));
    exports.swapObject = swapObject;
    const valueFromKeyObject = (obj) => Object.fromEntries(Object.entries(obj).map(([k, _v]) => [k, k]));
    exports.valueFromKeyObject = valueFromKeyObject;
});
