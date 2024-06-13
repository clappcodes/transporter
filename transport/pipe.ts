import { isTransformStream } from "../utils.ts";

export function pipe<T extends (TransformStream | Transformer)[]>(
  ...transforms: T
) {
  return <R>(readable: ReadableStream<R>) => {
    const ts = transforms.map((o) =>
      !isTransformStream(o) ? new TransformStream(o) : o
    );

    const result = ts.reduce((r, t) => r.pipeThrough(t), readable);

    return result as unknown as (typeof ts)[-1]["readable"];
  };
}
