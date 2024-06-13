import { IncomingStream } from "./IncomingStream.ts";
import { OutgoingStream } from "./OutgoingStream.ts";

export class DOMStream extends TransformStream<string, string> {
  constructor(sender: string) {
    super({
      start() {
        const ul = document.createElement("ul");
        const li = document.createElement("li");
        li.textContent = "connected";
        ul.append(li);
        document.body.append(ul);
      },
      transform(chunk, controller) {
        const ul = document.querySelector("ul");
        const li = document.createElement("li");
        li.textContent = "(" + sender + ") " + chunk;
        ul?.append(li);
        controller.enqueue(li.outerHTML);
      },
    });
  }
}

class LogStream extends TransformStream<string, string> {
  constructor(tag: string) {
    super({
      start() {
        console.log(tag + ".start");
      },
      transform(chunk, ctrl) {
        console.log(tag + ".transform", typeof chunk, chunk);
        ctrl.enqueue(chunk);
      },
    });
  }
}

export async function textStream() {
  const incoming = new IncomingStream("/demo", [
    new TextDecoderStream(),
    new LogStream("(1) Incoming DemoClient"),
    new DOMStream("server"),
    new LogStream("(2) Incoming DemoClient"),
  ]);

  const outgoing = new OutgoingStream("/demo", [
    new TextEncoderStream(),
    new LogStream("1 Outgoing DemoClient"),
    new DOMStream("client"),
    new LogStream("2 Outgoing DemoClient"),
  ]);

  Object.assign(window, {
    incoming,
    outgoing,
    write: outgoing.write.bind(outgoing),
  });

  outgoing.write("Hello, from browser");

  for await (const chunk of await incoming.ready) {
    console.log("(server)" + " " + chunk);
  }
}
