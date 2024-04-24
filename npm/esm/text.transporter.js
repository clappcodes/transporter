import { IncomingStream, OutgoingStream } from "./main.transporter.js";
export class IncomingTextStream extends IncomingStream {
    constructor(input) {
        super(input, new TextDecoderStream());
    }
}
export class OutgoingTextStream extends OutgoingStream {
    constructor(input) {
        super(input, new TextEncoderStream());
    }
}
