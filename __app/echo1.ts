import { transform, writable } from "../mod.ts";
import type { Promised } from "../utils/Promised.ts";

export class Instance {
  postRequest?: Request;
  postResponse?: Promised<Response>;
  headStream: {
    body: ReadableStream<Uint8Array>;
    write: (chunk: string) => Promise<void>;
  } = createHeadStream();
}

export const headers = {
  "cache-control": "no-cache",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "*",
  "access-control-allow-headers": "*",
  "access-control-max-age": "100",
  // sse
  "content-type": "text/event-stream",
};

function createHeadStream() {
  const t = new TransformStream<string, string>();
  const body = transform.encode(t.readable);
  const write = writable.write(t.writable);
  return { body, write: (chunk: string) => write(chunk + "\n") };
}

export const instances = new Map<string, Instance>();

export default {
  fetch: (async (request) => {
    console.log("handler", request.method, request.url);

    return new Response(
      request.body
        ?.pipeThrough(transform.decode())
        .pipeThrough(transform.map((val) => `data: ${val}\n\n`))
        .pipeThrough(transform.encode()),
    );
  }),
};
