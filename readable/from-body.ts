import { readable, transform } from "../mod.ts";

/**
 * Retrieves the body of a request or response as a ReadableStream.
 * If the body is already a ReadableStream, it is returned as is.
 * Otherwise, a TypeError is thrown.
 *
 * @param input - The request or response object.
 * @returns The body as a ReadableStream.
 * @throws {TypeError} If the body is not a ReadableStream.
 */
export function fromBody(
  input: Request | Response,
): ReadableStream<string> {
  const isRequest = input instanceof Request;
  const isResponse = input instanceof Response;

  if (isRequest || isResponse) {
    if (input.body) {
      return readable.from(input.body)
        .pipeThrough(transform.decode());
    }
  }

  throw new TypeError(`Invalid body type: ${typeof input.body}`);
}
