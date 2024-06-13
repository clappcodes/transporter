import { EventSourceDecoderStream } from "./EventSourceDecoderStream.ts";
import { EventSourceEncoderStream } from "./EventSourceEncoderStream.ts";
import { EventSourceStream } from "./EventSourceStream.ts";
import { EventSourceMessage } from "./EventSourceMessage.ts";
import { parse } from "./parse.ts";
import { stringify } from "./stringify.ts";

export class ESS {
  static Message = EventSourceMessage;
  static EncoderStream = EventSourceEncoderStream;
  static DecoderStream = EventSourceDecoderStream;
  static Stream = EventSourceStream;
  static stringify = stringify;
  static parse = parse;
}
