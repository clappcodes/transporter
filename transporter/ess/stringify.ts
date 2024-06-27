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

export function stringify(
  message: EventSourceMessage | EventSourceMessage & { [x: string]: string },
): string {
  const lines = [];
  if (message.comment) {
    assertHasNoNewline(message.comment, "`message.comment`");
    lines.push(`:${message.comment}`);
    delete message.comment;
  }
  if (message.event) {
    assertHasNoNewline(message.event, "`message.event`");
    lines.push(`event:${message.event}`);
    delete message.event;
  }
  if (message.data) {
    String(message.data).split(NEWLINE_REGEXP).forEach((line) =>
      lines.push(`data:${line}`)
    );
    delete message.data;
  }

  if (message.id) {
    assertHasNoNewline(message.id.toString(), "`message.id`");
    lines.push(`id:${message.id}`);
    delete message.id;
  }

  if (message.retry) {
    lines.push(`retry:${message.retry}`);
    delete message.retry;
  }

  const extraMessage =
    message as (EventSourceMessage & { [x: string]: string | number });
  const extraKeys = Object.keys(extraMessage);

  for (const key of extraKeys) {
    assertHasNoNewline(String(extraMessage[key]), "`message." + key + "`");
    lines.push(`${key}:${extraMessage[key]}`);
    delete extraMessage[key];
  }

  return lines.join("\n") + "\n\n";
}
