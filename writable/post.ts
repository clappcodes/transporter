export interface RequestStreamInit extends Omit<RequestInit, "method"> {
  body: ReadableStream<Uint8Array>;
}

export class RequestStream extends Request {
  constructor(input: RequestInfo | URL, init?: RequestStreamInit) {
    const isReadableStream = init?.body instanceof ReadableStream;

    if (!isReadableStream) {
      throw new TypeError("Invalid body: " + typeof init?.body);
    }

    super(input, {
      method: "POST",
      // @ts-ignore .
      duplex: "half",
      ...init,
    });
  }
}

export function post<T extends Uint8Array>(
  input: RequestInfo | URL,
  init?: RequestStreamInit,
): WritableStream<T> {
  const { readable, writable } = new TransformStream<T, T>();

  const request = new RequestStream(input, {
    ...init,
    body: readable,
  });

  fetch(request);

  return writable;
}

export function response<T extends Uint8Array>(
  init?: ResponseInit,
): { writable: WritableStream<T>; response: Response } {
  const { readable, writable } = new TransformStream<T, T>();

  const response = new Response(readable, init);

  return { writable, response };
}
