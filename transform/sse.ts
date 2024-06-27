import { EventSourceDecoderStream } from "../transporter/ess/EventSourceDecoderStream.ts";
import { EventSourceEncoderStream } from "../transporter/ess/EventSourceEncoderStream.ts";
import type { EventSourceMessage } from "../transporter/ess/EventSourceMessage.ts";

const encoder = (): EventSourceEncoderStream<EventSourceMessage, string> =>
    new EventSourceEncoderStream();

const decoder = (): EventSourceDecoderStream<string, EventSourceMessage> =>
    new EventSourceDecoderStream();

export const sse = { encoder, decoder };
