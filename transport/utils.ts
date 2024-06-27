export const isDenoEnv = Reflect.has(globalThis, "Deno");
export const isStreamingBodyRequest = (init?: RequestInit) =>
  init?.body instanceof ReadableStream &&
  init.method !== "GET" && init.method !== "HEAD";
