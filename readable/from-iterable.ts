import type { Readable } from "../types.ts";
import { EOF, external } from "./external.ts";

/**
 * Creates an observable from a synchronous iterable.
 *
 * @typeparam T Type of items to be emitted by the observable.
 * @param it Iterable to create an observable from.
 * @returns New observable that emits values from the iterable.
 */
export function fromIterable<T>(
  it: Iterable<T> | IterableIterator<T>,
): Readable<T> {
  const { next, observable } = external<T>();
  for (const v of it) {
    next(v);
  }
  next(EOF);
  return observable;
}
