import {
  of,
  type StrictStream,
  type StrictStreamLike,
  type StrictStreamOf,
} from "./index.ts";

export function toStrictStream<Input>(
  stream: StrictStreamLike<Input>,
): StrictStream<Input> {
  if (stream instanceof Object && Symbol.asyncIterator in stream) {
    return stream;
  } else if (stream instanceof Object && Symbol.iterator in stream) {
    return {
      [Symbol.asyncIterator]: () => {
        const syncIterator = stream[Symbol.iterator]();
        return {
          // deno-lint-ignore require-await
          next: async () => syncIterator.next(),
        };
      },
    };
  } else {
    throw new Error(`${typeof stream}, is not iterable`);
  }
}

export function from<Input>(
  streamLike: StrictStreamLike<Input>,
): StrictStreamOf<Input> {
  return of(toStrictStream<Input>(streamLike));
}
