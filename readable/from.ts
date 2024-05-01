type GeneratorFunc<T> = () => IterableIterator<T>;

export function from<R>(
  iterator: AsyncIterable<R> | Iterable<R | PromiseLike<R>> | GeneratorFunc<R>,
): ReadableStream<R> {
  return new ReadableStream<R>({
    async pull(controller) {
      if (typeof iterator === "function") {
        iterator = iterator();
      }
      for await (const chunk of iterator) {
        controller.enqueue(chunk);
      }

      controller.close();
    },
  });
}
