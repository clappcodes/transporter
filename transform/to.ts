import type { IOFunction, Transform } from "../types.ts";
import { map } from "./map.ts";

export const to = <I, O>(
  func: IOFunction<I, O>,
): Transform<I, O> => map(func);

export const newNumber = <T>(input: T) => new Number(input);
export const toNumeric = <I>() => to(Number);
export const toNumber = <I>() => to((input: I) => new Number(input));
export const toString = <I>() => to<I, string>(String);
export const toUpperCase = <I extends string>() =>
  to<I, string>((val) => val.toUpperCase());

export const toLine = <I extends string>(separator = "\n") =>
  to((i: I) => i.concat(separator));

export const toFixed = <I>(fd?: number) => {
  const fn = (fd?: number) => <T>(input: T) => (new Number(input)).toFixed(fd);
  const mapper = fn(fd)<I>;

  return to(mapper);
};

export const toPrecision = <I>(precision?: number) => {
  const fn = (fd?: number) => <T>(input: T) =>
    (new Number(input)).toPrecision(fd);
  const mapper = fn(precision)<I>;

  return to(mapper);
};

const alphaMap: [string, ...string[]] = [
  "o", // = 0
  "i", // = 1
  "2", // = 2
  "e", // = 3
  "q", // = 4
  "f", // = 5
  "s", // = 6
  "x", // = 7
  "6", // = 8
  "n", // = 9
  ".", // = .
];

export const toNumAlpha = <T extends number | string>() =>
  map<T, string>((value) =>
    [...String(value)].map((num) => alphaMap[Number(num)]).join("")
  );

export const toAlphaNum = <T extends string | number>() =>
  map<T, number>((value) =>
    Number([...String(value)].map((char) => alphaMap.indexOf(char)).join(""))
  );

export function demo() {
  let id = 0;
  return new ReadableStream<number>({
    start(ctrl) {
      id = setInterval(() => {
        ctrl.enqueue(Number.MAX_SAFE_INTEGER / Math.random());
      }, 1);

      console.log("started", id);

      //   setTimeout(() => {
      //     clearInterval(this.id);
      //   }, 5000);
    },
    cancel() {
      clearInterval(id);
      console.log("cancel", id);
    },
  })
    .pipeThrough(toPrecision(20))
    .pipeThrough(toNumAlpha())
    .pipeThrough(toUpperCase())
    .pipeThrough(toLine("\n"))
    .pipeThrough(
      map((val) => {
        document.body.innerHTML =
          `<h1 style="margin:20px"><code>${val}</code></h1>`;
        return val;
      }),
    );
  // .pipeThrough(to(parseFloat));
  // .pipeThrough(toString());
  // .pipeThrough(to((c) => [...c]));
  // .pipeThrough(toNumber())
  // .pipeThrough(toFixed(2))
  // .pipeThrough(toLine());
}
