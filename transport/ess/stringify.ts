import type { EventSourceMessage } from "./EventSourceMessage.ts";

export const NEWLINE_REGEXP = /\r\n|\r|\n/;

export function assertHasNoNewline(value: string, varName: string) {
  if (value.match(NEWLINE_REGEXP) !== null) {
    throw new RangeError(`${varName} cannot contain a newline`);
  }
}

/**
 * Converts a server-sent message object into a string for the client.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#event_stream_format}
 */

export function stringify(message: EventSourceMessage): string {
  const lines = [];
  if (message.comment) {
    assertHasNoNewline(message.comment, "`message.comment`");
    lines.push(`:${message.comment}`);
  }
  if (message.event) {
    assertHasNoNewline(message.event, "`message.event`");
    lines.push(`event:${message.event}`);
  }
  if (message.data) {
    message.data.split(NEWLINE_REGEXP).forEach((line) =>
      lines.push(`data:${line}`)
    );
  }
  if (message.id) {
    assertHasNoNewline(message.id.toString(), "`message.id`");
    lines.push(`id:${message.id}`);
  }
  if (message.retry) lines.push(`retry:${message.retry}`);

  return lines.join("\n") + "\n\n";
}
