import { EventSourceMessage } from "./EventSourceMessage.ts";
import { createParser } from "./parser.ts";

export function parse(
  input: string,
): EventSourceMessage {
  const result = createParser().push(input);

  if (typeof result === "function") {
    throw new TypeError(`Parse failed`);
  }

  return result; // new EventSourceMessage(result);
}
