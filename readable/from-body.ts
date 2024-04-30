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
): ReadableStream<Uint8Array> {
  if (input.body instanceof ReadableStream) {
    return input.body;
  }

  throw new TypeError(`Invalid body type: ${typeof input.body}`);
}
