import type { Transform } from "../types.ts";

export function upperCase(): Transform<string> {
  return new TransformStream<string, string>({
    transform(chunk, controller) {
      return controller.enqueue(chunk.toUpperCase());
    },
  });
}
