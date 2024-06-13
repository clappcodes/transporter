import type { Transform } from "../types.ts";

export function check<T>(f: (x: T) => boolean, message?: string): Transform<T> {
  return new TransformStream<T, T>(
    {
      transform(chunk, controller) {
        if (!f(chunk)) {
          throw new TypeError(
            `Check Failed: ${
              message ||
              "type: " + typeof chunk + " validate func: " + String(f)
            }`,
          );
        }
        controller.enqueue(chunk);
      },
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 },
  );
}
