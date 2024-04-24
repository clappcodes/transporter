import { IncomingStream, OutgoingStream } from "./main.transporter.js";
export declare class IncomingTextStream extends IncomingStream<Uint8Array, string> {
    constructor(input: URL | Request | string);
}
export declare class OutgoingTextStream extends OutgoingStream<string, Uint8Array> {
    constructor(input: URL | Request | string);
}
