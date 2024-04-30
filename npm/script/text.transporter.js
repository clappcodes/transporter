(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./main.transporter.js"], factory);
    }
})(function (require, exports) {
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
});
