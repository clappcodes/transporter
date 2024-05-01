import type { Readable } from "../types.ts";
import { EOF, external } from "./external.ts";

/**
 * Creates an observable that emits a set of values.
 *
 * @typeparam T Type of the emitted value.
 * @param vs Values to emit.
 * @returns New observable that emits the given values before ending.
 */
export function just<T>(...vs: T[]): Readable<T> {
  const { next, observable } = external<T>();
  for (const v of vs) {
    next(v);
  }
  next(EOF);
  return observable;
}
