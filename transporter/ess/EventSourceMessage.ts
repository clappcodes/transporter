/**
 * Represents a message in the Server-Sent Event (SSE) protocol.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#fields}
 */

import { parse } from "./parse.ts";
import { stringify } from "./stringify.ts";

export interface EventSourceMessage {
  /** Ignored by the client. */
  comment?: string;
  /** A string identifying the type of event described. */
  event?: string;
  /** The data field for the message. Split by new lines. */
  data?: string;
  /** The event ID to set the {@linkcode EventSource} object's last event ID value. */
  id?: string | number;
  /** The reconnection time. */
  retry?: number;
}

export class EventSourceMessage implements EventSourceMessage {
  /** Ignored by the client. */
  declare comment?: string;
  /** A string identifying the type of event described. */
  declare event?: string;
  /** The data field for the message. Split by new lines. */
  declare data?: string;
  /** The event ID to set the {@linkcode EventSource} object's last event ID value. */
  declare id?: string | number;
  /** The reconnection time. */
  declare retry?: number;
  declare private type?: "reconnect-interval" | "event";
  declare private readonly raw?: string;

  constructor(
    input: EventSourceMessage | string,
    transform?: (message: EventSourceMessage) => EventSourceMessage,
  ) {
    if (typeof input === "string") {
      const rawInput = input;
      input = parse(input);
      Object.defineProperty(this, "raw", {
        get() {
          return rawInput;
        },
      });
    }

    Object.defineProperty(this, "type", {
      get: () =>
        typeof this.retry !== "undefined" ? "reconnect-interval" : "event",
    });

    // const keys = ["comment", "event", "data", "id", "retry"] as const
    delete input.type;
    const keys = Object.keys(input) as [];

    for (const key of keys) {
      if (input && typeof input[key] !== "undefined") {
        Object.defineProperty(this, key, {
          value: input[key],
          enumerable: true,
          writable: true,
          configurable: true,
        });
      }
    }
    // apply transform
    if (transform) {
      Object.assign(this, transform(this));
    }
  }

  toString(): string {
    return stringify(this);
  }
}
