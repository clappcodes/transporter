import type { Transform } from "../types.ts";

export function log<T>(tag: string = ""): Transform<T> {
  return new TransformStream<T, T>(
    {
      start() {
        console.warn(tag, "started");
      },
      async transform(chunk, controller) {
        controller.enqueue(chunk);
        console.log(tag, await chunk);
      },
      async cancel(reason) {
        await Promise.resolve(console.warn(tag, "canceled", reason));
      },
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 },
  );
}
