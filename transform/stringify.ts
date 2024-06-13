import type { Transform } from "../types.ts";
import { map } from "./map.ts";

export function stringify<T>(
  options?: { space?: string | number | undefined },
): Transform<T, string> {
  return map<T, string>((value) =>
    typeof value === "object"
      ? JSON.stringify(value, null, options?.space)
      : String(value)
  );
}
