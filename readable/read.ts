export const read = (cb: CallableFunction) => {
  return async <T>(stream: ReadableStream<T>) => {
    for await (const chunk of stream) {
      await cb(chunk);
    }
  };
};
