// Copyright 2018-2024 the Deno authors. All rights reserved. MIT license.
// This module is browser compatible.

export const NEWLINE_REGEXP = /\r\n|\r|\n/;
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export function assertHasNoNewline(value: string, varName: string) {
  if (value.match(NEWLINE_REGEXP) !== null) {
    throw new RangeError(`${varName} cannot contain a newline`);
  }
}

export function tryJson(input: string): false | object {
  try {
    return JSON.parse(input);
  } catch (_e) {
    return false;
  }
}

export function encode(input: string | object) {
  if (typeof input === "string") {
    return textEncoder.encode(input);
  }

  return textEncoder.encode(JSON.stringify(input));
}

export function decode(input: Uint8Array) {
  const result = textDecoder.decode(input);

  return tryJson(result) || result;
}
