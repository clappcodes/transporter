// deno-lint-ignore-file
import * as colors from "./colors.ts";

export { colors };
export const idKey = "transport-id";

export const isDebug = (): boolean =>
  typeof Deno !== "undefined"
    ? Deno.env.get("DEBUG") === "true"
    : Boolean(Reflect.get(globalThis, "DEBUG"));

Object.assign(globalThis, { isDebug });

console.log(
  colors.green("(utils) DEBUG") + "=" +
    colors.white(isDebug() + ""),
);

export function mkId<K extends string>(key: K = "abcdefghkl" as K) {
  if (key.length !== 10) {
    throw new TypeError(
      `Key format error, required 10 unique chars, got: "${key}" (len=${key.length})`,
    );
  }
  const alphaMap = [...key];

  return <I extends string = "0123456789">(value: I): K[0] =>
    [...String(value)].map((num) => alphaMap[Number(num)]).join("");
}

export const tid = mkId("5aksj3hg7e".toUpperCase());
export const uid = () => tid(Math.random().toString().split(".").pop()!);

export async function delay(ms: number): Promise<unknown> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export enum ReadyState {
  CONNECTING = 0,
  INCOMING = 1,
  OUTGOING = 2,
  OPEN = 3,
  CLOSED = 4,
  ERRORED = 5,
}

export function* mkRangeIterator(
  start = 0,
  end = Infinity,
  step = 1,
): Generator<number, number, unknown> {
  let iterationCount = 0;
  for (let i = start; i < end; i += step) {
    iterationCount++;
    yield i;
  }
  return iterationCount;
}

export async function* mkRangeAsyncIterator(
  start = 0,
  end = Infinity,
  delay = 100,
): AsyncGenerator<unknown, number, unknown> {
  let iterationCount = 0;
  for (let i = start; i < end; i += 1) {
    iterationCount++;
    yield await new Promise((resolve) => {
      setTimeout(() => resolve(i), delay);
    });
  }
  return iterationCount;
}

export const swapObject = <T extends { [key: PropertyKey]: any }>(
  obj: T,
): {
  [K in keyof T as T[K]]: K;
} => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));

export const valueFromKeyObject = <T extends { [key: PropertyKey]: any }>(
  obj: T,
): {
  [K in keyof T]: K;
} => Object.fromEntries(Object.entries(obj).map(([k, _v]) => [k as any, k]));

export const _isTransformStream = <T extends object>(input: T): boolean =>
  typeof input === "object" &&
  Object.hasOwn(input, "writable") && Object.hasOwn(input, "readable");

export const isTransformStream = (a: unknown): a is GenericTransformStream =>
  typeof a === "object" && "readable" in a!;

type LengthOfTuple<T extends any[]> = T extends { length: infer L } ? L
  : never;
type DropFirstInTuple<T extends any[]> = ((...args: T) => any) extends
  (arg: any, ...rest: infer U) => any ? U : T;
export type LastInTuple<T extends any[]> =
  T[LengthOfTuple<DropFirstInTuple<T>>];
