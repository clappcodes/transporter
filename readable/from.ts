// deno-lint-ignore-file no-explicit-any
import isPlainObject from "../utils/is-plain-object.ts";

type GeneratorFunc<T> = () => IterableIterator<T>;
type AsyncGeneratorFunc<T> = () => AsyncIterableIterator<T>;

type FromObject<T> = [string, T][]; // { [s: string]: T; } | ArrayLike<T>

type FromType<T> =
  | AsyncIterable<T>
  | Iterable<T>
  | GeneratorFunc<T>
  | AsyncGeneratorFunc<T>
  | ReadableStream<T>
  | TransformStream<T, T>;

type FromIterable<T> =
  | AsyncIterable<T>
  | Iterable<T>
  | GeneratorFunc<T>
  | AsyncGeneratorFunc<T>
  | ReadableStream<T>;

// function isFoo<T extends Record<string, never>>(obj: T): obj is T {
//   return (obj as T).foo !== undefined;
// }

const isTransformStream = (input: object): input is TransformStream =>
  (input instanceof TransformStream) ||
  ("readable" in input && "writable" in input);

export function from<R>(
  input: FromType<R>,
): ReadableStream<R> {
  if (isTransformStream(input)) {
    return input.readable;
  }

  return readableFromIterable(input);
}

export const of = <T extends unknown[]>(...args: T) =>
  from(args as T[number][]);

export function readableFromIterable<T>(iterable: FromIterable<T>) {
  if (typeof iterable === "function") {
    iterable = iterable();
  }

  return new ReadableStream<T>({
    async pull(controller) {
      for await (const chunk of iterable) {
        controller.enqueue(await chunk);
      }
      controller.close();
    },
  });
}

export function readableFromObject<T>(input: T) {
  if (isPlainObject(input)) {
    const str = JSON.stringify(input, null, 2);
    const lines = str.split("\n");
    return readableFromIterable(lines);
  }

  console.log("readableFromObject", input);
  throw new TypeError(`Invalid input type: ${typeof input}`);
}

// const foo = from([1, "a"]);
// const bar = from(new Blob().stream());
// const baz = from(Object.entries({a:1,b:2,c:'dd'}));
