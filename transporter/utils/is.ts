export const isDenoEnv: boolean = Reflect.has(globalThis, "Deno");

export const isStreamingBodyRequest = (init?: RequestInit): boolean =>
  init?.body instanceof ReadableStream &&
  init.method !== "GET" && init.method !== "HEAD";

export const isTransformStream = (a: unknown): a is GenericTransformStream =>
  typeof a === "object" && "readable" in a!;
