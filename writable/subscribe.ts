/**
 * Sink for observables that discards all values.
 * Useful to leave at the end of a chain.
 *
 * @typeparam T Type of items emitted by the observable.
 * @param f Function to call for each value before it’s discarded.
 */
export function subscribe<T>(f: (v: T) => void = () => {}): WritableStream<T> {
  return new WritableStream<T>(
    {
      write(chunk: T) {
        f(chunk);
      },
    },
    { highWaterMark: 1 },
  );
}
