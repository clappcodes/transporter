import type { Readable } from "../types.ts";
import { fromIterable } from "./from-iterable.ts";

type GeneratorFunc<T> = () => IterableIterator<T>;

/**
 * Creates an observable from a generator that takes no arguments.
 *
 * @typeparam T Type of items to be emitted by the observable.
 * @param f Generator function to create an observable from.
 * @returns New observable that emits values from the generator.
 */
export function fromGenerator<T>(f: GeneratorFunc<T>): Readable<T> {
  return fromIterable(f());
}

function* x() {
  yield "one";
  yield "two";
}

fromGenerator(x);
