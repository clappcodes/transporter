import type { Writable } from "../types.ts";

export function write<T>(writable: Writable<T>): (chunk: T) => Promise<void> {
  const writer = writable.getWriter();

  return async function w(chunk: T): Promise<void> {
    await writer.ready;
    await writer.write(chunk);
  };
}
