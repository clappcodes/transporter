import { PairStream } from "./PairStream.ts";

export class BroadcastStream<
  W extends Uint8Array,
  R extends W = W,
> extends PairStream<W, R> {
  static debug = true;
  static weakMap: WeakMap<
    BroadcastStream<Uint8Array, Uint8Array>,
    ReadableStreamDefaultController<Uint8Array>
  > = new WeakMap<
    BroadcastStream<Uint8Array>,
    ReadableStreamDefaultController<Uint8Array>
  >();

  static controllers: Set<ReadableStreamDefaultController<Uint8Array>> =
    new Set<ReadableStreamDefaultController<Uint8Array>>();

  constructor(
    public controllers: Set<ReadableStreamDefaultController<R>> =
      new.target.controllers,
    writableStrategy?: QueuingStrategy<W>,
    readableStrategy?: QueuingStrategy<R>,
  ) {
    const debug = new.target.debug;

    super();

    this.writable = new WritableStream<W>({
      start: () => {
        debug && console.log(new.target.name, ".writable.start()");
      },
      close: () => {
        debug && console.log(new.target.name, ".writable.close()");
      },
      abort: () => {
        debug && console.log(new.target.name, ".writable.abort()");
      },
      write: (chunk) => {
        debug && console.log(
          new.target.name,
          ".writable.write()",
          this.controllers.size,
        );
        this.controllers.forEach((controller) => {
          controller.enqueue(chunk as R);
        });
      },
    }, writableStrategy);

    this.readable = new ReadableStream<R>({
      start: (controller) => {
        debug && console.log(
          new.target.name,
          ".readable.start()",
          this.controllers.size,
        );

        new.target.weakMap.set(this, controller);
        this.controllers.add(controller);
      },
      cancel: () => {
        this.controllers.delete(new.target.weakMap.get(this)!);
        new.target.weakMap.delete(this);

        debug && console.log(
          new.target.name,
          ".readable.cancel()",
          this.controllers.size,
        );
      },
      pull() {
        // console.log("[BroadcastStream].readable.pull()");
      },
    }, readableStrategy);
  }
}
