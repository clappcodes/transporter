import { RequestDuplex } from "./RequestDuplex.ts";
import { PipeStream } from "./PipeStream.ts";

export class TransportStream extends Response {
  // readable: ReadableStream<Uint8Array>;
  // finished: Promise<void>;
  constructor(
    public request: Request,
    public transformers: (Transformer | TransformStream)[] = [],
    public init?: ResponseInit,
  ) {
    if (!request.body) {
      throw new TypeError(`Request.body missing`);
    }

    const readable = request.body
      .pipeThrough(new PipeStream(...transformers));

    super(readable, init);
  }

  static demo = demo;
}

function demo(request: Request) {
  return new TransportStream(request, [
    new TextDecoderStream(),
    {
      transform(chunk, ctrl) {
        ctrl.enqueue(chunk.toUpperCase());
      },
    } as Transformer<string, string>,
    new TextEncoderStream(),
  ], {
    status: 200,
  });
}

// const x = new EventSourceStream("https://localhost:8000/sse1");
// x.read(console.log);
// x.write({
//   data: "Hello World",
// });

// export class EventSourceStream<
//   I extends SSEMessage = SSEMessage,
//   O extends Uint8Array = Uint8Array,
// > extends BaseTransformStream<I, O> {
//   finished: Promise<void>;
//   constructor(input: URL | RequestInfo, init?: RequestInit) {
//     super({
//       transform(chunk, controller) {
//         controller.enqueue(chunk);
//       },
//     });

//     this.finished = fetchStream(input, this.readable)
//       .then((res) => res.body.pipeTo(this.writable));
//   }
// }

export function rwStream(stream: ReadableWritablePair) {
  readable.read(console.log)(stream.readable);
  return writable.write(stream.writable);
}

export const counterReadableStream = (ms = 1000, idx = 0) => {
  return readable
    .fromTimer(ms, () => idx >= 10 ? null : "Count: " + (++idx));
};

export function toRequest<R extends ReadableStream<string>>(readable: R) {
  return function (input: RequestInfo, init?: RequestInit) {
    return new RequestDuplex(
      input,
      {
        ...init,
        method: "POST",
        body: readable.pipeThrough(transform.toUint8Array()),
      },
    );
  };
}

export function fromResponse(response: Response) {
  if (response.body) {
    return response.body
      .pipeThrough(transform.decode())
      .pipeTo(writable.subscribe(console.log));
  } else {
    throw new TypeError(`Bad Response.body: ${typeof response.body}`);
  }
}

// export function fromFetch(
//   input: string | URL | Request,
//   init?: RequestInit | undefined,
// ): Promise<ReadableStream<Uint8Array>> {
//   return duplexFetch(input, init).then(fromBody);
// }
