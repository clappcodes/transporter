import type { Transform } from "../types.ts";

export function encode(): TextEncoderStream;

export function encode(
  input: ReadableStream<string>,
): ReadableStream<Uint8Array>;

export function encode(
  input?: ReadableStream<string>,
): ReadableStream<Uint8Array> | Transform<string, Uint8Array> {
  return input
    ? input.pipeThrough(new TextEncoderStream())
    : new TextEncoderStream();
}

export function decode(): TextDecoderStream;

export function decode(
  input: ReadableStream<Uint8Array>,
): ReadableStream<string>;

export function decode(
  input?: ReadableStream<Uint8Array>,
): ReadableStream<string> | Transform<Uint8Array, string> {
  return input
    ? input.pipeThrough(new TextDecoderStream())
    : new TextDecoderStream();
}
