import type { Promised, StrictStream, StrictStreamMapper } from "./index.ts";

export function filter<Input>(
  condition: (input: Input) => Promised<boolean | undefined | null>,
): StrictStreamMapper<Input, Input> {
  return (inputStream) =>
    (async function* filtered(): StrictStream<Input> {
      for await (const record of inputStream) {
        if (await condition(record)) {
          yield record;
        }
      }
    })();
}
