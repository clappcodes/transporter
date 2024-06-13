import { Uint8ArrayTransformStream } from "./to-uint8array.ts";

export function toRequestBody<T>(): Uint8ArrayTransformStream<T> {
  return new Uint8ArrayTransformStream();
}
