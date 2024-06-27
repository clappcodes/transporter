import type { RouteFetch } from "./RoutesInit.ts";
import type { EventSourceMessage } from "../transporter/ess/EventSourceMessage.ts";
import { Route } from "./Route.ts";
import { EventSourceResponse } from "../transporter/mod.ts";

export const get = (path: string, fetch: RouteFetch) =>
  new Route(Route.GET, path, fetch);

export const put = (path: string, fetch: RouteFetch) =>
  new Route(Route.PUT, path, fetch);

export const post = (path: string, fetch: RouteFetch) =>
  new Route(Route.POST, path, fetch);

export const options = (path: string, fetch: RouteFetch) =>
  new Route(Route.OPTIONS, path, fetch);

export const del = (path: string, fetch: RouteFetch) =>
  new Route(Route.DELETE, path, fetch);

export enum Mime {
  html = "text/html",
  text = "text/plain",
  eventStream = "text/event-stream",
  js = "application/javascript",
}

export const send = (
  body?: BodyInit | null | undefined,
  init?: Mime | ResponseInit | undefined,
) =>
  new Response(
    body,
    typeof init === "string" ? { headers: { "content-type": init } } : init,
  );

send.js = (body: BodyInit) => send(body, Mime.js);
send.html = (body: BodyInit) => send(body, Mime.html);
send.text = (body: BodyInit) => send(body, Mime.text);
send.eventStream = (body: BodyInit) => send(body, Mime.eventStream);
send.stream = (body: ReadableStream) =>
  send(body.pipeThrough(transform.toUint8Array()), Mime.eventStream);

send.sse = <T extends EventSourceMessage>(
  stream: ReadableStream<T>,
  init?: ResponseInit,
) => new EventSourceResponse(stream, init);
