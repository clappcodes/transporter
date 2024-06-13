// deno-lint-ignore-file no-explicit-any
import type { EventSourceMessage } from "./EventSourceMessage.ts";

export function formatMessage<T extends EventSourceMessage>(input: T) {
  // const inputType = typeof input
  // if (inputType !== 'object') {
  //   input = { data: input as any, comment: 'converted' }
  // }
  const _keys = Object.keys(input) as (keyof EventSourceMessage)[];
  const keys = _keys.filter((key) => typeof input[key] !== "undefined");
  const chunks: string[] = [];

  for (const key of keys) {
    const value = input[key];
    chunks.push(formatValue(value, key));
  }

  chunks.push("\n");

  return chunks.join("\n");
}

export function formatValue(value: any, key: string) {
  const valueType = typeof value;

  if (valueType === "string") {
    return parseTextData(value, key);
  }
  if (valueType === "function") {
    return parseTextData(value, key);
  }
  if (valueType === "object") {
    return parseTextData(JSON.stringify(value), key);
  }

  return `${key}: ${value}`.trim();
}

export function parseTextData(text: string, key = "data"): string {
  const data = String(text).replace(/(\r\n|\r|\n)/g, "\n");
  const lines = data.split(/\n/);
  let output = "";
  for (let i = 0, l = lines.length; i < l; ++i) {
    const line = lines[i];
    output += key + ": " + line;
    output += i + 1 === l ? "" : "\n";
  }
  return output;
}
