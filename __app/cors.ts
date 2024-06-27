import type { FetchHandler } from "../types.ts";
import type { Serve } from "../transport/types.ts";

export function defineHandler<
  T extends FetchHandler,
  R extends Partial<Serve> & { fetch: T } = Partial<Serve> & {
    fetch: T;
  },
>(fetch: T, rest?: R) {
  return Object.assign({ fetch } as R, rest);
}

export function defineResponseHandler<
  T extends FetchHandler,
  R extends Partial<Serve> & { onResponse: T } =
    & Partial<Serve>
    & {
      onResponse: T;
    },
>(onResponse: T, rest?: R) {
  return Object.assign({ onResponse } as R, rest);
}

export function defineRequestHandler<
  T extends FetchHandler,
  R extends Partial<Serve> & { onRequest: T } =
    & Partial<Serve>
    & {
      onRequest: T;
    },
>(onRequest: T, rest?: R) {
  return Object.assign({ onRequest } as R, rest);
}

const responseCors = defineResponseHandler(
  function onCorsResponse(request, context) {
    console.log(`[[defineResponseHandler]] ${context.response?.url}`);
    if (!context.response) {
      console.warn(`Context.response unavailable (${request.url})`);
      context.response = new Response(
        `Context.response unavailable (${request.url})`,
      );
    }

    context.response.headers.set("cache-control", "no-cache");
    context.response.headers.set("access-control-allow-origin", "*");
    context.response.headers.set("access-control-allow-methods", "*");
    context.response.headers.set("access-control-allow-headers", "*");
    context.response.headers.set("access-control-max-age", "100");

    console.log(`Context.response headers setup (${request.url})`);
  },
);

const requestCors = defineRequestHandler(
  function onCorsRequest(request, context) {
    console.log(
      `[[defineRequestHandler]] ${request.url}`,
    );
    // request.headers.set("x-cors-req", new Date().toDateString());
  },
);

export default Object.assign(responseCors, requestCors);
