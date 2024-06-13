import {
  JSONDecoderStream,
  JSONEncoderStream,
  PipeStream,
  Transformers,
} from "../transport/mod.ts";
import { isTransformStream } from "../utils.ts";

type JSONSchema = { uid: string; msg: string };

const writeMessage = (x = "-") =>
  transform.tap<JSONSchema>((o) => console.log(`${x} ${o.uid}: ${o.msg}`));

class JSONStream extends PipeStream<JSONSchema, JSONSchema> {
  uid = "client" as const;
  constructor(input: URL | RequestInfo) {
    super(
      writeMessage(">"),
      new JSONEncoderStream(),
      new TextEncoderStream(),
      new Transporter(input),
      new TextDecoderStream(),
      new JSONDecoderStream(),
      writeMessage("<"),
    );
  }
  send(msg: JSONSchema["msg"]) {
    return this.write({ uid: this.uid, msg });
  }
}

class JSONRequestStream extends PipeStream<Uint8Array, JSONSchema> {
  constructor(public request: Request) {
    super(
      new TextDecoderStream(),
      new JSONDecoderStream(),
      writeMessage(">"),
    );
    request.body?.pipeTo(this.writable);
  }
}

class JSONResponseStream extends PipeStream<JSONSchema, Uint8Array> {
  uid = "server" as const;
  constructor(public init?: ResponseInit) {
    super(
      writeMessage("<"),
      new JSONEncoderStream(),
      new TextEncoderStream(),
    );
  }

  send(msg: JSONSchema["msg"]) {
    return this.write({ uid: this.uid, msg });
  }
}

class JSONTransportStream extends Response {
  writable: WritableStream<JSONSchema>;
  readable: ReadableStream<JSONSchema>;

  write: (message: JSONSchema) => Promise<void>;
  read: (cb: (chunk: JSONSchema) => void) => Promise<void>;

  send: (msg: string) => Promise<void>;

  constructor(public request: Request, public responseInit?: ResponseInit) {
    const _request = new JSONRequestStream(request);
    const _response = new JSONResponseStream();

    super(_response.readable, responseInit);

    this.headers.set("content-type", "text/event-stream");

    this.writable = _response.writable;
    this.write = _response.write.bind(_response);
    this.send = _response.send.bind(_response);

    this.readable = _request.readable;
    this.read = _request.read.bind(_request);
  }
  pipeTo(
    destination: TransformStream<JSONSchema> | WritableStream<JSONSchema>,
  ) {
    return this.readable.pipeTo(
      isTransformStream(destination) ? destination.writable : destination,
    );
  }

  pipe(...transformers: Transformers) {
    return this.readable.pipeThrough(new PipeStream(...transformers));
  }
}

export const jsonStream =
  (fn: (i: JSONTransportStream) => unknown) => (req: Request) => {
    const res = new JSONTransportStream(req);
    if (typeof fn === "function") {
      fn(res);
    }
    return res;
  };

export default {
  init(url: string = "/pipe1") {
    const ts = new JSONStream(url);

    ts.read(console.log);
    ts.send("Hello Server");

    return ts;
  },
  fetch3: jsonStream((stream) =>
    stream.pipe(transform.tap(console.warn)).pipeTo(stream.writable)
  ),
  fetch: jsonStream((stream) => {
    // stream.pipeTo(stream);

    // @ts-ignore .
    globalThis.p1 = stream;

    stream.read((o) => {
      if (o.uid === "xxx") {
        stream.send(`hey ${o.uid}, 
            what is this: ${o.msg}?`);
      }
    });

    stream.write({ uid: "deno", msg: "Hi" });

    return stream;
  }),
};
