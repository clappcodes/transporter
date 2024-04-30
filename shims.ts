export function ReadableStreamFrom<R>(
  iterator: AsyncIterable<R> | Iterable<R | PromiseLike<R>>,
) {
  return new ReadableStream<R>({
    async pull(controller) {
      for await (const chunk of iterator) {
        controller.enqueue(chunk);
      }

      controller.close();
    },
  });
}

export async function* ReadableStreamIterator<R>(this: ReadableStream<R>) {
  const reader = this.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}

if (!Reflect.has(ReadableStream, "from")) {
  console.log("(shim) ReadableStream.from");
  Object.defineProperty(ReadableStream, "from", {
    value: ReadableStreamFrom,
  });
}

if (typeof ReadableStream.prototype[Symbol.asyncIterator] === "undefined") {
  console.log("(shim) ReadableStream.prototype[Symbol.asyncIterator]");
  Object.defineProperty(ReadableStream.prototype, Symbol.asyncIterator, {
    value: ReadableStreamIterator,
  });
}
