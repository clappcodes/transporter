"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadableStreamIterator = exports.ReadableStreamFrom = void 0;
function ReadableStreamFrom(iterator) {
    return new ReadableStream({
        async pull(controller) {
            for await (const chunk of iterator) {
                controller.enqueue(chunk);
            }
            controller.close();
        },
    });
}
exports.ReadableStreamFrom = ReadableStreamFrom;
async function* ReadableStreamIterator() {
    const reader = this.getReader();
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                return;
            }
            yield value;
        }
    }
    finally {
        reader.releaseLock();
    }
}
exports.ReadableStreamIterator = ReadableStreamIterator;
if (typeof ReadableStream.from === "undefined") {
    console.log("(shim) ReadableStream.from");
    ReadableStream.from = ReadableStreamFrom;
}
if (typeof ReadableStream.prototype[Symbol.asyncIterator] === "undefined") {
    console.log("(shim) ReadableStream.prototype[Symbol.asyncIterator]");
    Object.defineProperty(ReadableStream.prototype, Symbol.asyncIterator, {
        value: ReadableStreamIterator,
    });
}
