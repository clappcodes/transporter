import type { Readable } from "../types.ts";
import { EOF, external } from "./external.ts";

/**
 * Creates an observable that emits numbers from `start` to `end`.
 *
 * @param start Number to start emitting from, such as `0`.
 * @param end Number to stop emitting at, inclusive.
 * @returns New observable that emits numbers.
 */
export function range(start: number, end: number): Readable<number> {
  const { observable, next } = external<number>();
  const len = Math.abs(end - start);
  const dir = Math.sign(end - start);
  for (let i = 0; i <= len; i++) {
    next(start + i * dir);
  }
  next(EOF);
  return observable;
}
