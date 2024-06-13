import { EventSourceDecoderStream } from "../transport/ess/EventSourceDecoderStream.ts";
import { EventSourceEncoderStream } from "../transport/ess/EventSourceEncoderStream.ts";

const encoder = () => new EventSourceEncoderStream();
const decoder = () => new EventSourceDecoderStream();

export const sse = { encoder, decoder };
