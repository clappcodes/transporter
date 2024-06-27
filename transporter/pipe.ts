export function pipe<
  R,
  T extends [TransformStream<R>, ...TransformStream[]],
>(
  readable: ReadableStream<R>,
  ...transforms: T
): T[-1]["readable"] {
  return transforms.reduce<T[number]["readable"]>(
    (readable, transform) =>
      readable.pipeThrough<T[number]["readable"]>(transform),
    readable,
  );
}
