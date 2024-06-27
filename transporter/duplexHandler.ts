import { Promised } from "./utils/Promised.ts";
import { DuplexRequest } from "./DuplexRequest.ts";
import {
  isDuplexHandler,
  METHOD,
  STREAM_ID_KEY,
  STREAM_TYPE,
  STREAM_TYPE_KEY,
} from "./contstants.ts";
import {
  Context,
  type HandlerResponse,
  route,
  type RouteHandler,
} from "./route.ts";

const map = new Map<
  string,
  {
    [P in STREAM_TYPE]: Promised<HandlerResponse>;
  }
>();

export function duplexHandler<
  H extends (
    request: Request,
    context?: Context | object,
  ) => Response | Promise<Response>,
>(handler: H): H {
  if (isDuplexHandler in handler) {
    return handler;
  }

  const duplex = (async (request: Request, context?: Context | object) => {
    const id = request.headers.get(STREAM_ID_KEY);

    if (!id) {
      return handler(request, context);
    }

    const streamType = request.headers.get(
      STREAM_TYPE_KEY,
    ) as STREAM_TYPE;

    const isHalfDuplex = !!id && !!streamType &&
      ![METHOD.GET, METHOD.HEAD].includes(request.method as METHOD);

    if (!isHalfDuplex) {
      return handler(request, context);
    }

    if (!map.has(id)) {
      map.set(id, {
        INCOMING: new Promised(),
        OUTGOING: new Promised(),
      });
    }

    const { INCOMING, OUTGOING } = map.get(id)!;

    switch (streamType) {
      case STREAM_TYPE.OUTGOING: {
        if (request instanceof DuplexRequest) {
          request.response = new Response();
        }

        INCOMING.resolve(await handler(request, context));
        map.delete(id);

        return OUTGOING;
      }

      case STREAM_TYPE.INCOMING: {
        if (
          request instanceof DuplexRequest && request.outgoing &&
          !request.outgoing.response
        ) {
          request.outgoing.response = new Response();

          INCOMING.resolve(await handler(request.outgoing, context));
          map.delete(id);
        }

        return INCOMING;
      }

      default:
        return handler(request, context);
    }
  }) as H;

  return Object.assign(
    duplex,
    {
      [isDuplexHandler]: true,
      handler,
    },
  );
}
