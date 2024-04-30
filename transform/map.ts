import type { Transform } from "../types.ts";

/**
 * Returns a `Transform` with the results of applying the given function
 * to each emitted item of the original observable.
 *
 * @typeparam S Type of items emitted by the original observable.
 * @typeparam T Type of items returned by `f`.
 * @param f Function called with each emitted item. If it returns a promise,
 * the result is awaited then emitted.
 * @returns Transform that emits items produced by `f`.
 */
export function map<S, T>(f: (x: S) => T | Promise<T>): Transform<S, T> {
  return new TransformStream<S, T>(
    {
      async transform(chunk, controller) {
        controller.enqueue(await f(chunk));
      },
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 },
  );
}
