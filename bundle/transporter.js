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

  // transporter.ts
  var transporter_exports = {};
  __export(transporter_exports, {
    IncomingStream: () => IncomingStream,
    IncomingTextStream: () => IncomingTextStream,
    OutgoingStream: () => OutgoingStream,
    OutgoingTextStream: () => OutgoingTextStream
  });

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
  if (typeof ReadableStream.from === "undefined") {
    console.log("(shim) ReadableStream.from");
    ReadableStream.from = ReadableStreamFrom;
  }
  if (typeof ReadableStream.prototype[Symbol.asyncIterator] === "undefined") {
    console.log("(shim) ReadableStream.prototype[Symbol.asyncIterator]");
    Object.defineProperty(ReadableStream.prototype, Symbol.asyncIterator, {
      value: ReadableStreamIterator
    });
  }

  // colors.ts
  var { Deno: Deno2 } = globalThis;
  var noColor = typeof Deno2?.noColor === "boolean" ? Deno2.noColor : false;
  var enabled = !noColor;
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
  function bold(str) {
    return run(str, code([1], 22));
  }
  __name(bold, "bold");
  function italic(str) {
    return run(str, code([3], 23));
  }
  __name(italic, "italic");
  function green(str) {
    return run(str, code([32], 39));
  }
  __name(green, "green");
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
  function brightGreen(str) {
    return run(str, code([92], 39));
  }
  __name(brightGreen, "brightGreen");
  function brightYellow(str) {
    return run(str, code([93], 39));
  }
  __name(brightYellow, "brightYellow");
  function brightWhite(str) {
    return run(str, code([97], 39));
  }
  __name(brightWhite, "brightWhite");
  var ANSI_PATTERN = new RegExp(
    [
      "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
      "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TXZcf-nq-uy=><~]))"
    ].join("|"),
    "g"
  );

  // utils.ts
  var DEBUG = typeof Deno !== "undefined" ? Boolean(Deno.env.get("DEBUG")) : Reflect.get(globalThis, "DEBUG");
  var isDebug = /* @__PURE__ */ __name(() => typeof Deno !== "undefined" ? Boolean(Deno.env.get("DEBUG")) : Reflect.get(globalThis, "DEBUG"), "isDebug");
  console.log(
    green("(T) DEBUG") + "=" + white(DEBUG + "")
  );
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

  // main.transporter.ts
  var OutgoingStream = class _OutgoingStream {
    static {
      __name(this, "OutgoingStream");
    }
    static idx = 0;
    static set = /* @__PURE__ */ new Set();
    static add = (instance) => this.set.add(instance);
    static del = (instance) => this.set.delete(instance);
    static get = (obj) => {
      return Array.from(this.set).filter((instance) => {
        const a = obj.id && instance.id === obj.id;
        const b = obj.idx && instance.idx === obj.idx;
        return a || b;
      });
    };
    #writable;
    ready;
    closed;
    pipeline;
    readable;
    // get readable() {
    //   return this.pipeline.readable;
    // }
    static get size() {
      return this.set.size;
    }
    idx = _OutgoingStream.idx++;
    id;
    // public readable: ReadableStream<Uint8Array>;
    static write(chunk) {
      for (const outgoing of this.set) {
        outgoing.write(chunk);
      }
    }
    headers;
    name = " \u2190 " + this.constructor.name;
    // →
    url;
    env;
    constructor(url, transformers) {
      _OutgoingStream.add(this);
      this.env = url instanceof Request ? "server" : "client";
      this.url = url instanceof Request ? new URL(url.url) : new URL(url, String(location));
      this.id = this.url.searchParams.get("id") || "x" + String(this.idx);
      this.closed = new DeferredPromise();
      this.pipeline = new PipelineStream(transformers);
      this.readable = new ReadableStream({
        start: (controller) => {
          this.controller = controller;
          log(this, "start", _OutgoingStream.size);
        },
        cancel: (_reason) => {
          _OutgoingStream.del(this);
          this.closed.resolve(_reason);
          log(this, "close", _OutgoingStream.size);
        }
      }).pipeThrough(this.pipeline);
      if (this.env === "server") {
        this.ready = this.handle(url);
      } else {
        this.ready = this.fetch();
      }
      this.headers = new Headers({
        "x-id": this.id,
        "x-idx": String(this.idx)
      });
    }
    get writable() {
      this.#writable = this.#writable || new WritableStream({
        write: (chunk) => {
          this.controller.enqueue(chunk);
        },
        close: () => {
          this.close();
        },
        abort: (err) => {
          console.log("Writable error:", err);
        }
      });
      return this.#writable;
    }
    async write(chunk) {
      try {
        await this.ready;
        if (this.controller?.desiredSize <= 0) {
          console.log("backpressure signal", this.controller.desiredSize);
        }
        this.controller.enqueue(chunk);
        log(this, "write", chunk);
      } catch (e) {
        log(this, "write", e);
      }
    }
    close() {
      this.controller?.close();
    }
    async fetch() {
      fetch(
        new Request(this.url, {
          method: "POST",
          // @ts-ignore ?
          duplex: "half",
          body: this.readable,
          headers: this.headers
        })
      );
      return Promise.resolve(this);
    }
    async handle(_request) {
      return Promise.resolve(this);
    }
    async response(headers = {}) {
      return new Response(this.readable, {
        headers: { ...this.headers, ...headers }
      });
    }
  };
  var IncomingStream = class _IncomingStream {
    constructor(url = "/", transformers, { onResponse } = {}) {
      this.transformers = transformers;
      if (onResponse) {
        this.onResponse = onResponse;
      }
      this.pipeline = new PipelineStream(transformers);
      this.env = url instanceof Request ? "server" : "client";
      this.url = url instanceof Request ? new URL(url.url) : typeof location === "undefined" ? new URL(url) : new URL(url || "/", String(location));
      if (this.env === "server") {
        this.ready = this.handle(url);
      } else {
        this.ready = this.fetch();
      }
      this.id = this.url.searchParams.get("id") || "x" + String(this.idx);
      this.headers = new Headers({
        "x-id": this.id,
        "x-idx": String(this.idx)
      });
    }
    static {
      __name(this, "IncomingStream");
    }
    static idx = 0;
    idx = _IncomingStream.idx++;
    id;
    headers;
    // readable!: ReadableStream<O>;
    ready;
    closed = new DeferredPromise();
    name = " \u2192 " + this.constructor.name;
    // ←
    url;
    env;
    onResponse;
    pipeline;
    get readable() {
      return this.pipeline.readable;
    }
    async *[Symbol.asyncIterator]() {
      const reader = this.readable.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            return;
          }
          log(this, "read", value);
          yield value;
        }
      } finally {
        reader.releaseLock();
      }
    }
    // Browser
    async fetch() {
      const response = await fetch(
        new Request(this.url, {
          headers: this.headers
        })
      );
      if (this.onResponse) {
        await this.onResponse(response);
        return this;
      }
      if (response.body) {
        response.body.pipeTo(this.pipeline.writable);
      } else {
        throw new TypeError(`Response.body required`);
      }
      return this;
    }
    // Server
    async handle(request) {
      if (request.body) {
        request.body.pipeTo(this.pipeline.writable);
      } else {
        throw new TypeError(`Request.body required`);
      }
      return this;
    }
    async response(headers = {}) {
      return new Response("done", {
        headers: { ...this.headers, ...headers }
      });
    }
  };

  // text.transporter.ts
  var IncomingTextStream = class extends IncomingStream {
    static {
      __name(this, "IncomingTextStream");
    }
    constructor(input, t) {
      super(input || "/", [new TextDecoderStream(), ...t || []]);
    }
  };
  var OutgoingTextStream = class extends OutgoingStream {
    static {
      __name(this, "OutgoingTextStream");
    }
    constructor(input, t) {
      super(input || "/", [
        new TextEncoderStream(),
        ...t || []
      ]);
    }
  };
  return __toCommonJS(transporter_exports);
})();
//# sourceMappingURL=transporter.js.map
