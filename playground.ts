import { fromBody, fromEvent, fromURL } from "./readable/mod.ts";
import { decode, encode, log, map, pipe } from "./transform/mod.ts";

import { duplexFetch } from "./utils.ts";
import { post } from "./writeable/post.ts";
import { subscribe } from "./writeable/subscribe.ts";

export const arr = () =>
  pipe(decode)
    .pipe(map((chunk) => chunk.split(":")))
    .pipe(map(([key, val]): [string, number] => [key, Number(val)]));

export const sse = () =>
  pipe(decode)
    .pipe(map((chunk) => chunk.split(":")))
    .pipe(map(([key, val]) => ({ [key]: Number(val) })));

export async function receive() {
  const stream = await fromURL("/sse")
    .then(pipe(decode()).pipe(log("foo")));

  stream.pipeTo(subscribe((val) => {
    document.querySelector("#outgoing")!.textContent = val;
  }));
}

export function send() {
  const body = fromEvent<HTMLInputElement, InputEvent>(
    document.querySelector("#message")!,
    "input",
  )
    .pipeThrough(map((e) => e.data))
    .pipeThrough(encode());

  const [a, b] = body.tee();

  a.pipeThrough(decode()).pipeTo(subscribe(console.warn));

  return b.pipeTo(post("/sse"));
}

export const toEvent = <E extends "message" | "ping" = "message">(
  event: E = "message" as E,
) =>
  map<string, string>(
    (data) =>
      [
        ["event", event || "message"].join(": "),
        ["data", String(data)].join(": "),
      ].join("\n") + "\n\n",
  );

export async function echo() {
  // const body = pipe(toEvent()).pipe(map((val) => delay(1000).then(() => val))).pipe(
  //   encode(),
  // )(
  //   from(["one", "two", "22", "How atre u"]),
  // )

  const incomingStream = await duplexFetch("/echo", {
    body: fromEvent<HTMLInputElement, InputEvent>(
      document.querySelector("#message")!,
      "input",
    )
      .pipeThrough(map((e) => e.data))
      .pipeThrough(toEvent("message")) // SSE
      .pipeThrough(encode()),
  })
    .then(fromBody)
    .then(decode);

  const [domStream, iterStream] = incomingStream.tee();

  domStream.pipeTo(subscribe((val) => {
    document.querySelector("#outgoing")!.innerHTML = val;
  }));

  for await (const _chunk of iterStream) {
    console.log(_chunk);
  }
}

export async function main() {
  // await receive();
  // await send();

  await echo();
}
