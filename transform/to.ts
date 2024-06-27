import type { IOFunction } from "../app/types.ts";
import type { Transform } from "../types.ts";
import { map } from "./map.ts";

export const to = <I, O>(
  func: IOFunction<I, O>,
): Transform<I, O> => map(func);

export const newNumber = <T>(input: T): Number => new Number(input);
export const toNumeric = <I>(): Transform<any, number> => to(Number);
export const toNumber = <I>(): Transform<I, Number> =>
  to((input: I) => new Number(input));
export const toString = <I>(): Transform<I, string> => to<I, string>(String);

export const toLine = <I extends string>(
  separator = "\n",
): Transform<I, string> => to((i: I) => i.concat(separator));

export const toFixed = <I>(fd?: number): Transform<I, string> => {
  const fn = (fd?: number) => <T>(input: T) => (new Number(input)).toFixed(fd);
  const mapper = fn(fd)<I>;

  return to(mapper);
};

export const toPrecision = <I>(precision?: number): Transform<I, string> => {
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

export const toNumAlpha = <T extends number | string>(): Transform<T, string> =>
  map<T, string>((value) =>
    [...String(value)].map((num) => alphaMap[Number(num)]).join("")
  );

export const toAlphaNum = <T extends string | number>(): Transform<T, number> =>
  map<T, number>((value) =>
    Number([...String(value)].map((char) => alphaMap.indexOf(char)).join(""))
  );
