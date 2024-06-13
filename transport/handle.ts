import type {
  Context,
  Request,
  RequestHandler,
  ServeHandlerReturn,
} from "./types.ts";
import { Promised } from "../utils/Promised.ts";
import { METHOD } from "./RoutesInit.ts";

export const STREAM_ID_KEY = "stream-id";
export const STREAM_TYPE_KEY = "stream-type";
export enum STREAM_TYPE {
  REQUEST = "REQUEST",
  RESPONSE = "RESPONSE",
}
type PromisedResponse = Promised<Response | undefined>;
// requests map
const pmap = new Map<string, PromisedResponse>();
const qmap = new Map<string, PromisedResponse>();

Object.assign(duplex, { pmap, qmap });

export function duplex(
  handler: RequestHandler,
  unhandled?: RequestHandler,
) {
  async function duplexStream<R extends Request, C extends Context>(
    request: R,
    context: C = Object.create(null),
  ): Promise<ServeHandlerReturn> {
    const id = request.headers.get(STREAM_ID_KEY);
    if (!id) {
      console.log(`(duplex) !id ${request.url}`);
      return unhandled
        ? unhandled(request, context)
        : new Response(null, { status: 400 });
    }

    const streamType = request.headers.get(
      STREAM_TYPE_KEY,
    ) as unknown as STREAM_TYPE;

    const isHalfDuplex = !!id && !!streamType &&
      ![METHOD.GET, METHOD.HEAD].includes(request.method as METHOD);

    if (!isHalfDuplex) {
      console.log("!isHalfDuplexd");
      return handler(request, context);
    }

    if (id && !pmap.has(id)) {
      pmap.set(id, new Promised());
      qmap.set(id, new Promised());
    }

    if (streamType === STREAM_TYPE.REQUEST) {
      const getResponse = pmap.get(id)!;
      const putResponse = qmap.get(id)!;

      getResponse.resolve(await handler(request, context));

      return putResponse;
    }

    if (streamType === STREAM_TYPE.RESPONSE) {
      return pmap.get(id);
    }

    return unhandled
      ? unhandled(request, context)
      : new Response(null, { status: 400 });

    // return new Response(null, { status: 400 });
  }

  return duplexStream;
}
