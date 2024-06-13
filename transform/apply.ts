import type { Transform } from "../types.ts";

/**
 * Applies a transformer function to create a Transform stream.
 *
 * @template S The type of the input data.
 * @template T The type of the transformed data.
 * @param {TransformerTransformCallback<S, T>} transformer The transformer function to apply to each chunk of data.
 * @returns {Transform<S, T>} The Transform stream.
 */
export function apply<S, T>(
  transformer: TransformerTransformCallback<S, T>,
): Transform<S, T> {
  return new TransformStream<S, T>(
    {
      async transform(chunk, controller) {
        try {
          await transformer(chunk, controller);
        } catch (e) {
          controller.error(e);
        }
      },
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 },
  );
}
