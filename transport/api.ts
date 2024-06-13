// // import { readable, transform } from "../mod.ts";
// import { RequestStream } from "./RequestStream.ts";

// // import "../app/api.util.ts";

// export type URLString<U> = U extends Request ? U["url"]
//   : U extends URL ? U["href"]
//   : U;

// export type AbsoluteURL<U extends string, B extends string> = B extends
//   undefined ? U
//   : `${B}${U}`;

// export type XRequestMethod =
//   | "*"
//   | "OPTIONS"
//   | "HEAD"
//   | "POST"
//   | "GET"
//   | "PUT"
//   | "PATCH"
//   | "DELETE";

// export type XRequestURL<U extends XRequestInput, B extends string> =
//   AbsoluteURL<
//     URLString<U>,
//     B
//   >;

// export type XRequestInit = Omit<RequestInit, "method">;
// export type XRequestInput = RequestInfo | URL;

// export function createRequest<
//   M extends XRequestMethod,
//   U extends XRequestInput,
//   I extends XRequestInit,
// >(
//   method: M,
//   input: U,
//   init?: I,
// ) {
//   return new RequestStream(method, input, init);
// }

// export function create<M extends XRequestMethod, B extends string>(
//   method: M,
//   base?: B,
// ) {
//   const fn = <
//     U extends XRequestInput,
//     I extends XRequestInit,
//     S extends XRequestURL<U, B>,
//   >(
//     input: U,
//     init?: I,
//   ) => {
//     const url =
//       (base && typeof input === "string"
//         ? new URL(input, base).href
//         : String(input || "/")) as S;

//     return createRequest(
//       method,
//       url,
//       init,
//     );
//   };

//   Object.defineProperty(fn, "name", {
//     value: method.toLowerCase(),
//   });

//   Object.defineProperty(fn, "toString", {
//     value: () =>
//       `${method.toLowerCase()}(input: XRequestInput, init?: XRequestInit): Response`,
//   });

//   return fn;
// }

// export function base<U extends string>(input?: U) {
//   return {
//     get: create("GET", input),
//     put: create("PUT", input),
//     post: create("POST", input),
//     head: create("HEAD", input),
//     patch: create("PATCH", input),
//     delete: create("DELETE", input),
//     options: create("OPTIONS", input),
//   };
// }

// export const baseURL = typeof location === "undefined"
//   ? "https://localhost:5050"
//   : location.href as unknown as undefined;

// // export const api = base(baseURL);

// // export default api;
