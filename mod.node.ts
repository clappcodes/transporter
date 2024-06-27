// deno-lint-ignore-file no-explicit-any
if (!globalThis.Promise.withResolvers) {
  await import("npm:@ungap/with-resolvers");
}

declare global {
  interface PromiseWithResolvers<T> {
    promise: Promise<T>;
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason?: any) => void;
  }
  interface ExtendableEvent extends Event {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/ExtendableEvent/waitUntil) */
    waitUntil(f: Promise<any>): void;
  }
  interface FetchEvent extends ExtendableEvent {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/FetchEvent/clientId) */
    readonly clientId: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/FetchEvent/handled) */
    readonly handled: Promise<undefined>;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/FetchEvent/preloadResponse) */
    readonly preloadResponse: Promise<any>;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/FetchEvent/request) */
    readonly request: Request;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/FetchEvent/resultingClientId) */
    readonly resultingClientId: string;
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/FetchEvent/respondWith) */
    respondWith(r: Response | PromiseLike<Response>): void;
  }
}

// Conditional ESM module loading (Node.js and browser)
// @ts-ignore: Property 'UrlPattern' does not exist
if (!globalThis.URLPattern) {
  await import("npm:urlpattern-polyfill");
}

export * from "./mod.ts";
