"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutgoingTextStream = exports.IncomingTextStream = void 0;
const main_transporter_js_1 = require("./main.transporter.js");
class IncomingTextStream extends main_transporter_js_1.IncomingStream {
    constructor(input) {
        super(input, new TextDecoderStream());
    }
}
exports.IncomingTextStream = IncomingTextStream;
class OutgoingTextStream extends main_transporter_js_1.OutgoingStream {
    constructor(input) {
        super(input, new TextEncoderStream());
    }
}
exports.OutgoingTextStream = OutgoingTextStream;
