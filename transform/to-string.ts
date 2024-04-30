import type { Transform } from "../types.ts";
import { map } from "./map.ts";

export function toString<T>(): Transform<T, string> {
  return map<T, string>(String);
}

export function stringify<T>(
  options?: { space?: string | number | undefined },
): Transform<T, string> {
  return map<T, string>((value) => JSON.stringify(value, null, options?.space));
}
