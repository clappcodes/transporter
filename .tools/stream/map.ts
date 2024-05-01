import type { Promised, StreamMapper } from "./index.ts";

export function map<Input, Output>(
  mapper: (input: Input) => Promised<Output>,
): StreamMapper<AsyncIterable<Input>, AsyncIterable<Output>> {
  return (inputStream) =>
    (async function* mappedStream(): AsyncIterable<Output> {
      for await (const record of inputStream) {
        yield await mapper(record);
      }
    })();
}
