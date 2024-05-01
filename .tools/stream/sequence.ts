import type { StrictStream } from "./index.ts";

export async function* sequence(length: number): StrictStream<number> {
  for (let i = 0; i < length; i++) {
    yield i;
  }
}
