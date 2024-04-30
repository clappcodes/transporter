import {
  decode,
  encode,
  fromEvent,
  fromURL,
  log,
  map,
  pipe,
  post,
  subscribe,
  toNumber,
} from "./mod.ts";

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
    .then(pipe(decode()).pipe(toNumber()).pipe(log("foo")));

  stream.pipeTo(subscribe());
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

export async function main() {
  // await receive();
  await send();
}
