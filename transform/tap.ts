import type { Transform } from "../types.ts";
import { each } from "./each.ts";

/**
 * Alias for {@link each}.
 */
export function tap<T>(f: (x: T) => void): Transform<T> {
  return each(f);
}
