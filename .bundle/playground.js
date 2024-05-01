var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

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
  const response = await fetch(request);
  return fromBody(response);
}
__name(fromURL, "fromURL");

// readable/external.ts
var EOF = Symbol();

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
function green(str) {
  return run(str, code([32], 39));
}
__name(green, "green");
function white(str) {
  return run(str, code([37], 39));
}
__name(white, "white");
var ANSI_PATTERN = new RegExp(
  [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TXZcf-nq-uy=><~]))"
  ].join("|"),
  "g"
);

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
  }).then(async (response) => {
    console.log("POST Request(" + id + ")", "Done", await response.text());
  });
  return fetch(input, { headers, ...rest });
}
__name(duplexFetch, "duplexFetch");
var idKey = "transporter-stream-id";
var isTransformStream = /* @__PURE__ */ __name((a) => typeof a === "object" && "readable" in a, "isTransformStream");

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

// transform/text.ts
function encode(input) {
  return input ? input.pipeThrough(new TextEncoderStream()) : new TextEncoderStream();
}
__name(encode, "encode");
function decode(input) {
  return input ? input.pipeThrough(new TextDecoderStream()) : new TextDecoderStream();
}
__name(decode, "decode");

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

// playground.ts
var arr = /* @__PURE__ */ __name(() => pipe(decode).pipe(map((chunk) => chunk.split(":"))).pipe(map(([key, val]) => [key, Number(val)])), "arr");
var sse = /* @__PURE__ */ __name(() => pipe(decode).pipe(map((chunk) => chunk.split(":"))).pipe(map(([key, val]) => ({ [key]: Number(val) }))), "sse");
async function receive() {
  const stream = await fromURL("/sse").then(pipe(decode()).pipe(log("foo")));
  stream.pipeTo(subscribe((val) => {
    document.querySelector("#outgoing").textContent = val;
  }));
}
__name(receive, "receive");
function send() {
  const body = fromEvent(
    document.querySelector("#message"),
    "input"
  ).pipeThrough(map((e) => e.data)).pipeThrough(encode());
  const [a, b] = body.tee();
  a.pipeThrough(decode()).pipeTo(subscribe(console.warn));
  return b.pipeTo(post("/sse"));
}
__name(send, "send");
var toEvent = /* @__PURE__ */ __name((event = "message") => map(
  (data) => [
    ["event", event || "message"].join(": "),
    ["data", String(data)].join(": ")
  ].join("\n") + "\n\n"
), "toEvent");
async function echo() {
  const incomingStream = await duplexFetch("/echo", {
    body: fromEvent(
      document.querySelector("#message"),
      "input"
    ).pipeThrough(map((e) => e.data)).pipeThrough(toEvent("message")).pipeThrough(encode())
  }).then(fromBody).then(decode);
  const [domStream, iterStream] = incomingStream.tee();
  domStream.pipeTo(subscribe((val) => {
    document.querySelector("#outgoing").innerHTML = val;
  }));
  for await (const _chunk of iterStream) {
    console.log(_chunk);
  }
}
__name(echo, "echo");
async function main() {
  await echo();
}
__name(main, "main");
export {
  arr,
  echo,
  main,
  receive,
  send,
  sse,
  toEvent
};
//# sourceMappingURL=playground.js.map
