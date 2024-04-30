import type { Transform } from "../types.ts";
import { map } from "./map.ts";

export function toNumber<T>(): Transform<T, number> {
  return map<T, number>(Number);
}
