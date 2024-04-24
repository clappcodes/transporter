import { IncomingStream, OutgoingStream } from "./main.transporter.ts";

export class IncomingTextStream extends IncomingStream<Uint8Array, string> {
  constructor(input: URL | Request | string) {
    super(input, new TextDecoderStream());
  }
}

export class OutgoingTextStream extends OutgoingStream<string, Uint8Array> {
  constructor(input: URL | Request | string) {
    super(input, new TextEncoderStream());
  }
}
