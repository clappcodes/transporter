"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.pub = exports.sub = void 0;
require("./_dnt.polyfills.js");
const transporter_js_1 = require("./transporter.js");
async function sub() {
    const incoming = new transporter_js_1.IncomingTextStream("/foo");
    for await (const chunk of await incoming.ready) {
        console.log("(browser)", chunk);
    }
}
exports.sub = sub;
async function pub() {
    const outgoing = new transporter_js_1.OutgoingTextStream("/bar");
    await outgoing.write("Hello from browser");
}
exports.pub = pub;
function test() {
    // @ts-ignore ?
    globalThis.fetch = fetch;
    async function fetch(request) {
        const incoming = new transporter_js_1.IncomingTextStream(request);
        for await (const chunk of await incoming.ready) {
            console.log("(server)", chunk);
        }
        return incoming.response();
    }
    new transporter_js_1.OutgoingTextStream("/test").write("Hello World!");
}
exports.test = test;
