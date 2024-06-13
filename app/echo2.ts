// import { readable, transform, TransportStream } from "../mod.ts";

const alphaMap: [string, ...string[]] = [
  "o",
  "i",
  "z",
  "e",
  "q",
  "f",
  "s",
  "x",
  "b",
  "n",
];

const num2alpha = () =>
  transform.map<number | string, string>((value) =>
    [...String(value)].map((num) => alphaMap[Number(num)]).join("")
  );

const alpha2num = <T extends string>() =>
  transform.map<T, number>((value) =>
    Number([...value].map((char) => alphaMap.indexOf(char)).join(""))
  );

export default {
  fetch(request: Request) {
    return new Response(
      request.body
        ?.pipeThrough(transform.decode())
        .pipeThrough(num2alpha())
        .pipeThrough(transform.upperCase())
        .pipeThrough(transform.encode()),
    );
  },
  async start() {
    const stream = readable.fromTimer(1, Math.random)
      .pipeThrough(transform.toString())
      .pipeThrough(transform.encode())
      .pipeThrough(new TransportStream("app/echo2"))
      .pipeThrough(transform.decode())
      .pipeThrough(transform.map((value) => {
        document.querySelector("#output")!.textContent = value;
        return value;
      }));

    for await (const c of stream) {
      // console.log(c);
    }
  },
};
