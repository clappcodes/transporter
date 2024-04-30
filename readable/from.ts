export function from<R>(
  iterator: AsyncIterable<R> | Iterable<R | PromiseLike<R>>,
): ReadableStream<R> {
  return new ReadableStream<R>({
    async pull(controller) {
      for await (const chunk of iterator) {
        controller.enqueue(chunk);
      }

      controller.close();
    },
  });
}
