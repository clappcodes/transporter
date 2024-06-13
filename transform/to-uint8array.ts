export class Uint8ArrayTransformStream<T> extends TransformStream<
  T,
  Uint8Array
> {
  constructor() {
    const encoder = new TextEncoder();

    super({
      start() {}, // required.
      async transform(chunk, controller) {
        chunk = await chunk;
        switch (typeof chunk) {
          case "object":
            // just say the stream is done I guess
            if (chunk === null) {
              controller.terminate();
            } else if (ArrayBuffer.isView(chunk)) {
              controller.enqueue(
                new Uint8Array(
                  chunk.buffer,
                  chunk.byteOffset,
                  chunk.byteLength,
                ),
              );
            } else if (
              Array.isArray(chunk) &&
              chunk.every((value) => typeof value === "number")
            ) {
              controller.enqueue(new Uint8Array(chunk));
            } else if (
              typeof chunk.valueOf === "function" &&
              chunk.valueOf() !== chunk
            ) {
              this.transform!(chunk.valueOf() as T, controller); // hack
            } else if ("toJSON" in chunk) {
              this.transform!(JSON.stringify(chunk) as T, controller);
            }
            break;
          case "symbol":
            controller.error("Cannot send a symbol as a chunk part");
            break;
          case "undefined":
            controller.error("Cannot send undefined as a chunk part");
            break;
          default:
            controller.enqueue(encoder.encode(String(chunk)));
            break;
        }
      },
      flush() {
        /* do any destructor work here */
      },
    });
  }
}

export function toUint8Array<T>(): Uint8ArrayTransformStream<T> {
  return new Uint8ArrayTransformStream<T>();
}
