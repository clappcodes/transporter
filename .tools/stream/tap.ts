// deno-lint-ignore-file no-explicit-any
import { map } from "./map.ts";
import type { Promised, StreamMapper } from "./index.ts";

export function tap<Input>(
  fn: (input: Input) => Promised<any>,
): StreamMapper<Input, Input> {
  return map<Input, Input>(async (input): Promise<Input> => {
    await fn(input);
    return input;
  });
}
