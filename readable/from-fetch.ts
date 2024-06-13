import { fromBody } from "./from-body.ts";

export async function fromFetch(
  input: URL | RequestInfo,
  init?: RequestInit,
): Promise<ReadableStream<string>> {
  return fromBody(await fetch(new Request(input, init)));
}
