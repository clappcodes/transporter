export const read = (
  cb: CallableFunction,
): <T>(stream: ReadableStream<T>) => Promise<void> => {
  return async <T>(stream: ReadableStream<T>) => {
    for await (const chunk of stream) {
      await cb(chunk);
    }
  };
};
