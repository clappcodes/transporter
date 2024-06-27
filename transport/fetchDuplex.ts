import type { DuplexRequestBase } from "./DuplexRequestBase.ts";
import { transform } from "../mod.ts";
import { DuplexRequest } from "../transporter/DuplexRequest.ts";

export type XFetchInput =
  | string
  | DuplexRequestBase
  | Request
  | URL;

export const fetchStream = async <R extends Uint8Array>(
  input: XFetchInput,
  rs?:
    | ReadableStream<R>
    | Promise<ReadableStream<R>>
    | Response
    | Promise<Response>,
  init?: RequestInit,
) => {
  if (rs instanceof Promise) {
    rs = await rs;
  }

  const reqBody = rs
    ? rs instanceof ReadableStream
      ? rs.pipeThrough(transform.toUint8Array())
      : rs.body instanceof ReadableStream
      ? rs.body.pipeThrough(transform.toUint8Array())
      : readable.of(rs).pipeThrough(transform.toUint8Array())
    : null;

  return fetchDuplex(input, {
    ...init,
    method: reqBody ? "POST" : "GET",
    body: reqBody,
  });
};

// export function fetchDuplex(
//   input: XFetchInput,
//   init?: RequestInit,
// ): Promise<Response> {
//   // @ts-ignore .
//   const fetch = fetchDuplex.fetch as typeof globalThis.fetch ||
//     globalThis.fetch;

//   const inputUrl = new URL(
//     typeof input === "string"
//       ? input
//       : input instanceof RequestDuplex
//       ? input.url
//       : String(input || globalThis.location),
//     String(globalThis.location),
//   );

//   const request = input instanceof RequestDuplex
//     ? input
//     : new RequestDuplex(inputUrl, init);

//   if (request.duplex === "half") {
//     // console.log(`request.duplex === "half"`);

//     const request2 = new RequestDuplex(request.url, {
//       method: request.method,
//       headers: {
//         ...Object.fromEntries(request.headers.entries()),
//         [STREAM_TYPE_KEY]: STREAM_TYPE.INCOMING,
//       },
//     });

//     fetch(request);

//     return fetch(
//       request2,
//     );
//   } else {
//     console.log("(duplex/ call fetch(request))");

//     return fetch(request);
//   }
// }

export function fetchDuplex(
  input: URL | RequestInfo,
  init?: RequestInit | undefined,
): Promise<Response> {
  return new DuplexRequest(input, init).fetch();
}

// @ts-ignore .
globalThis.fetch.duplex = fetchDuplex;
// @ts-ignore .
globalThis.fetch.stream = fetchStream;
fetchDuplex.stream = fetchStream;
