import { idKey } from "../utils.ts";
import { Promised } from "../utils/Promised.ts";
import { headers, Instance, instances } from "./echo1.ts";

type ServeHandler = (
  request: Request,
  info?: Deno.ServeHandlerInfo,
) => Response | Promise<Response>;

export function defineStreamHandler(handler: ServeHandler) {
  return async function handle(
    request: Request,
    info?: Deno.ServeHandlerInfo,
  ): Promise<Response> {
    const url = new URL(request.url);
    const id = request.headers.get(idKey) || url.searchParams.get(idKey);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: { ...headers, [idKey]: id || "" } });
    }

    if (!id) {
      throw new TypeError(`Missing "${idKey}"`);
    }

    if (!instances.has(id)) {
      instances.set(id, new Instance());
    }

    const instance = instances.get(id)!;

    console.log(
      "[" + request.method + "] " + request.url + " id=" + id,
      instances.size,
    );

    request.signal.addEventListener("abort", () => {
      if (request.method === "POST") {
        instance.postRequest = undefined;
      }

      if (request.method === "GET") {
        instances.delete(id);
        console.log(
          request.method + " " + request.url,
          String(request.signal.reason),
        );
        instance.postResponse?.resolve(new Response("Wazzup", { headers }));
      }
    });

    if (request.headers.has("transport-status")) {
      instance.headStream.write(request.headers.get("transport-status")!);
    }

    if (request.method === "HEAD") {
      // 200 OK
      // 201 Created
      // 202 Accepted
      return new Response(instance.headStream.body, {
        status: 200,
        headers: {
          ...headers,
          [idKey]: id,
        },
      });
    }

    if (request.method === "POST") {
      instance.postRequest = request;
      instance.postResponse = new Promised<Response>();
      // instance.headStream.write(String(201));

      return instance.postResponse;
    }

    if (request.method === "GET") {
      const response = await handler(instance.postRequest || request, info);
      for (const [key, value] of new Headers(headers)) {
        response.headers.set(key, value);
      }

      response.headers.set(idKey, id);

      return response;
    }

    return new Response("Bad request!!!", { status: 400 });
  };
}
