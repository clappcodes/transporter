import { fromBody } from "./from-body.ts";

export async function fromURL(
  input: URL | RequestInfo,
  init?: RequestInit,
): Promise<ReadableStream<Uint8Array>> {
  const request = new Request(input, init);
  const response = await fetch(request);

  return fromBody(response);
}
