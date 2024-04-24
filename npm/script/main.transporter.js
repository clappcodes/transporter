"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _a, _OutgoingStream_writable;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomingStream = exports.OutgoingStream = void 0;
// deno-lint-ignore-file no-explicit-any require-await
require("./shims.js");
const utils_js_1 = require("./utils.js");
class OutgoingStream {
    static get size() {
        return this.set.size;
    }
    static write(chunk) {
        for (const outgoing of this.set) {
            outgoing.write(chunk);
        }
    }
    constructor(url, transform = new TransformStream()) {
        _OutgoingStream_writable.set(this, void 0);
        Object.defineProperty(this, "ready", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "closed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "idx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: _a.idx++
        });
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "readable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: " ← " + this.constructor.name
        }); // →
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "env", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // add this instance to set
        _a.add(this);
        this.env = url instanceof Request ? "server" : "client";
        this.url = (url instanceof Request)
            ? new URL(url.url)
            : new URL(url, String(location));
        this.id = this.url.searchParams.get("id") || "x" + String(this.idx);
        this.closed = new utils_js_1.DeferredPromise();
        this.readable = new ReadableStream({
            start: (controller) => {
                this.controller = controller;
                (0, utils_js_1.log)(this, "start", _a.size);
            },
            cancel: (_reason) => {
                _a.del(this);
                this.closed.resolve(_reason);
                (0, utils_js_1.log)(this, "close", _a.size);
            },
        }).pipeThrough(transform);
        if (this.env === "server") {
            this.ready = this.handle(url);
        }
        else {
            this.ready = this.fetch();
        }
        this.headers = new Headers({
            "x-id": this.id,
            "x-idx": String(this.idx),
        });
    }
    get writable() {
        __classPrivateFieldSet(this, _OutgoingStream_writable, __classPrivateFieldGet(this, _OutgoingStream_writable, "f") || new WritableStream({
            write: (chunk) => {
                this.controller.enqueue(chunk);
            },
            close: () => {
                this.close();
            },
            abort: (err) => {
                console.log("Writable error:", err);
            },
        }), "f");
        return __classPrivateFieldGet(this, _OutgoingStream_writable, "f");
    }
    async write(chunk) {
        await this.ready;
        this.controller.enqueue(chunk);
        (0, utils_js_1.log)(this, "write", chunk);
    }
    close() {
        this.controller?.close();
    }
    async fetch() {
        fetch(new Request(this.url, {
            method: "POST",
            // @ts-ignore ?
            duplex: "half",
            body: this.readable,
            headers: this.headers,
        }));
        return Promise.resolve(this);
    }
    async handle(_request) {
        return Promise.resolve(this);
    }
    async response(headers = {}) {
        return new Response(this.readable, {
            headers: { ...this.headers, ...headers },
        });
    }
}
exports.OutgoingStream = OutgoingStream;
_a = OutgoingStream, _OutgoingStream_writable = new WeakMap();
Object.defineProperty(OutgoingStream, "idx", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 0
});
Object.defineProperty(OutgoingStream, "set", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new Set()
});
Object.defineProperty(OutgoingStream, "add", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (instance) => _a.set.add(instance)
});
Object.defineProperty(OutgoingStream, "del", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (instance) => _a.set.delete(instance)
});
Object.defineProperty(OutgoingStream, "get", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: (obj) => {
        return Array.from(_a.set).filter((instance) => {
            const a = obj.id && instance.id === obj.id;
            const b = obj.idx && instance.idx === obj.idx;
            return a || b;
        });
    }
});
class IncomingStream {
    constructor(url, transform = new TransformStream(), { onResponse } = {}) {
        Object.defineProperty(this, "transform", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: transform
        });
        Object.defineProperty(this, "idx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: IncomingStream.idx++
        });
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "readable", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "ready", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "closed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new utils_js_1.DeferredPromise()
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: " → " + this.constructor.name
        }); // ←
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "env", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "onResponse", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (onResponse) {
            this.onResponse = onResponse;
        }
        this.env = url instanceof Request ? "server" : "client";
        this.url = (url instanceof Request)
            ? new URL(url.url)
            : typeof location === "undefined"
                ? new URL(url)
                : new URL(url, String(location));
        if (this.env === "server") {
            this.ready = this.handle(url);
        }
        else {
            this.ready = this.fetch();
        }
        this.id = this.url.searchParams.get("id") || "x" + String(this.idx);
        this.headers = new Headers({
            "x-id": this.id,
            "x-idx": String(this.idx),
        });
    }
    async *[Symbol.asyncIterator]() {
        const reader = this.readable.getReader();
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) {
                    return;
                }
                (0, utils_js_1.log)(this, "read", value);
                yield value;
            }
        }
        finally {
            reader.releaseLock();
        }
    }
    // Browser
    async fetch() {
        const response = await fetch(new Request(this.url, {
            headers: this.headers,
        }));
        if (this.onResponse) {
            await this.onResponse(response);
            return this;
        }
        if (response.body) {
            this.readable = response.body.pipeThrough(this.transform);
        }
        else {
            throw new TypeError(`Response.body required`);
        }
        return this;
    }
    // Server
    async handle(request) {
        if (request.body) {
            this.readable = request.body.pipeThrough(this.transform);
        }
        else {
            throw new TypeError(`Request.body required`);
        }
        return this;
    }
    async response(headers = {}) {
        return new Response("done", {
            headers: { ...this.headers, ...headers },
        });
    }
}
exports.IncomingStream = IncomingStream;
Object.defineProperty(IncomingStream, "idx", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: 0
});
