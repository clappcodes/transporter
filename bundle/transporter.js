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
function run(str, code2) {
  return enabled ? `${code2.open}${str.replace(code2.regexp, code2.open)}${code2.close}` : str;
}
function bold(str) {
  return run(str, code([1], 22));
}
function italic(str) {
  return run(str, code([3], 23));
}
function green(str) {
  return run(str, code([32], 39));
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
function brightGreen(str) {
  return run(str, code([92], 39));
}
function brightYellow(str) {
  return run(str, code([93], 39));
}
function brightWhite(str) {
  return run(str, code([97], 39));
}
var ANSI_PATTERN = new RegExp(
  [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TXZcf-nq-uy=><~]))"
  ].join("|"),
  "g"
);

// utils.ts
var DEBUG = typeof Deno !== "undefined" ? Deno.env.get("DEBUG") : Reflect.get(globalThis, "DEBUG");
console.log(
  green("(T) DEBUG") + "=" + white(DEBUG + "")
);
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

// main.transporter.ts
var OutgoingStream = class _OutgoingStream {
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
  static get size() {
    return this.set.size;
  }
  idx = _OutgoingStream.idx++;
  id;
  readable;
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
  constructor(url, transform = new TransformStream()) {
    _OutgoingStream.add(this);
    this.env = url instanceof Request ? "server" : "client";
    this.url = url instanceof Request ? new URL(url.url) : new URL(url, String(location));
    this.id = this.url.searchParams.get("id") || "x" + String(this.idx);
    this.closed = new DeferredPromise();
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
    }).pipeThrough(transform);
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
    await this.ready;
    this.controller.enqueue(chunk);
    log(this, "write", chunk);
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
  constructor(url, transform = new TransformStream(), { onResponse } = {}) {
    this.transform = transform;
    if (onResponse) {
      this.onResponse = onResponse;
    }
    this.env = url instanceof Request ? "server" : "client";
    this.url = url instanceof Request ? new URL(url.url) : typeof location === "undefined" ? new URL(url) : new URL(url, String(location));
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
  static idx = 0;
  idx = _IncomingStream.idx++;
  id;
  headers;
  readable;
  ready;
  closed = new DeferredPromise();
  name = " \u2192 " + this.constructor.name;
  // ←
  url;
  env;
  onResponse;
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
      this.readable = response.body.pipeThrough(this.transform);
    } else {
      throw new TypeError(`Response.body required`);
    }
    return this;
  }
  // Server
  async handle(request) {
    if (request.body) {
      this.readable = request.body.pipeThrough(this.transform);
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
  constructor(input) {
    super(input, new TextDecoderStream());
  }
};
var OutgoingTextStream = class extends OutgoingStream {
  constructor(input) {
    super(input, new TextEncoderStream());
  }
};
export {
  IncomingStream,
  IncomingTextStream,
  OutgoingStream,
  OutgoingTextStream
};
//# sourceMappingURL=transporter.js.map
