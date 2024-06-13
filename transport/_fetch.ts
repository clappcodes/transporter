// import { readable, transform } from "../mod.ts";
// import { RequestHandler } from "../types.ts";
// import { duplex } from "./handle.ts";
// import { RequestStream, ResponseStream } from "./stream.ts";

// $fetch.fetch = (
//   input:
//     | string
//     | RequestStream
//     | URL,
//   init?: RequestInit | undefined,
// ) => {
//   console.log("fetch(", input, init, ")");
//   return globalThis.fetch(input, init);
// };

// export function $fetch(
//   input:
//     | string
//     | RequestStream
//     | URL,
//   init?: RequestInit | undefined,
// ): Promise<ResponseStream> {
//   const isBrowser = typeof document !== "undefined";
//   const fetch = $fetch.fetch || globalThis.fetch;

//   if (isBrowser) {
//     console.log("(Browser$)");

//     const request: RequestStream = new RequestStream(
//       input instanceof RequestStream ? input.clone() : input,
//       {
//         ...init,
//         get duplex() {
//           return this.method === "POST" && this.body ? "half" : undefined;
//         },
//       },
//     );
//     const url = new URL(request.url);

//     const id = url.searchParams.get("stream-id") || url.hash.slice(1) ||
//       Math.random().toString().slice(2);

//     request.headers.set("stream-id", id);

//     // POST
//     if (request.method === "POST") {
//       const outgoing = request;

//       const incoming = new RequestStream(request.url, {
//         method: "GET",
//         headers: request.headers,
//       });

//       fetch(outgoing);

//       return fetch(incoming);
//     } else {
//       return fetch(request);
//     }
//   } else {
//     console.log("(Deno@)");

//     return fetch(new RequestStream(input, init));
//   }
// }

// $fetch.from = async (
//   specifier: string | RequestHandler | { fetch: RequestHandler },
//   input?: string | RequestStream | URL,
//   init?: RequestInit | undefined,
// ) => {
//   const handler: RequestHandler = typeof specifier === "string"
//     ? await import(specifier).then((mod) => {
//       return mod.default ? mod.default.fetch || mod.default : mod.fetch;
//     })
//     : specifier;

//   if (typeof handler !== "function") {
//     throw new TypeError(`Invalid Handler (${specifier}): ${typeof handler}`);
//   }
//   const duplexHandler = duplex(handler);

//   if (!input) {
//     return (
//       input: string | RequestStream | URL,
//       init?: RequestInit | undefined,
//     ) => duplexHandler(new RequestStream(input, init));
//   }

//   return duplexHandler(new RequestStream(input, init));
// };

// $fetch.text = (
//   input:
//     | string
//     | RequestStream
//     | URL,
//   init?: RequestInit | undefined,
// ) => $fetch(input, init).then((response) => response.text());

// $fetch.json = (
//   input:
//     | string
//     | RequestStream
//     | URL,
//   init?: RequestInit | undefined,
// ) => $fetch(input, init).then((response) => response.json());

// $fetch.get = (
//   input:
//     | string
//     | RequestStream
//     | URL,
//   init?: Omit<RequestInit, "method"> | undefined,
// ) => $fetch(input, { ...init, method: "GET" });

// $fetch.post = (
//   input:
//     | string
//     | RequestStream
//     | URL,
//   init?: Omit<RequestInit, "method"> | undefined,
// ) => $fetch(input, { ...init, method: "POST" });

// $fetch.read = (
//   input:
//     | string
//     | RequestStream
//     | URL,
//   init?: RequestInit | undefined,
// ) =>
// (cb: (chunk: string) => void) =>
//   $fetch(input, init)
//     .then(readable.fromBody)
//     .then(transform.decode)
//     .then(readable.read(cb));

// export const post = (
//   input: string | RequestStream | URL,
//   body: ReadableStream<Uint8Array>,
// ) =>
//   new RequestStream(input, {
//     method: "POST",
//     // @ts-ignore .
//     duplex: "half",
//     body,
//   });

// export const get = (
//   input: string | RequestStream | URL,
// ) => new RequestStream(input);

// export const handler = (handler: RequestHandler) => duplex(handler);

// export const handle = $fetch.from;

// export const request = (
//   input: string | RequestStream | URL,
//   body?: ReadableStream<Uint8Array>,
// ) => body ? post(input, body) : get(input);

// export const pipeTo =
//   (destination: WritableStream) =>
//   (source: ReadableStream | ResponseStream | RequestStream) =>
//     source instanceof ReadableStream
//       ? source.pipeTo(destination)
//       : source.body!.pipeTo(destination);
