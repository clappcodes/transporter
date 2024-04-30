import type { Readable } from "../types.ts";

/**
 * Creates an observable that will forever emit `chunk()` every `ms` milliseconds.
 *
 * @param ms Milliseconds between each emit.
 * @returns New observable that emits null values.
 */
export function fromTimer<T>(
  ms: number,
  chunk: () => T = () => null as T,
): Readable<T> {
  let id: number;
  return new ReadableStream<T>({
    start(controller) {
      id = setInterval(() => controller.enqueue(chunk()), ms);
    },
    cancel() {
      clearInterval(id);
    },
  });
}
