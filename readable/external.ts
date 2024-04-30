/**
 * Symbol indicating the end of a stream. Used with `external`.
 */
// @ts-ignore ?
export const EOF: symbol = Symbol();
export type NextFunc<T> = (v: T | typeof EOF) => void;

/**
 * Utility function to create new observables from external sources.
 * Returns an object with two values: the new observable, and a `next` function
 * which will emit a value to `observable` when called.
 * Calling `next` with `EOF` will indicate there are no more values to emit.
 *
 * @typeparam T Type of items to be emitted by the observable.
 */
export function external<T>(): {
  observable: ReadableStream<T>;
  next: NextFunc<T>;
} {
  let next: NextFunc<T>;
  const observable = new ReadableStream<T>(
    {
      start(controller) {
        next = (v: T | typeof EOF) => {
          if (v === EOF) {
            return controller.close();
          }
          controller.enqueue(v as T);
        };
      },
    },
    { highWaterMark: 0 },
  );
  return { observable, next: next! };
}
