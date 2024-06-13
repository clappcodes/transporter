import { PipeStream } from "./PipeStream.ts";
import { Transporter } from "./Transporter.ts";

const EOL = "\n";

export class JSONEncoderStream extends TransformStream<object, string> {
  constructor() {
    super({
      transform(chunk, controller) {
        try {
          controller.enqueue(JSON.stringify(chunk) + EOL);
        } catch { /** err */ }
      },
    });
  }
}
export class JSONDecoderStream<
  I extends string = string,
  O extends object = object,
> extends TransformStream<I, O> {
  constructor() {
    super({
      transform(chunk, controller) {
        let runningText = "";
        const objects = chunk.split(EOL);
        for (const obj of objects) {
          try {
            runningText += obj;
            const result = JSON.parse(runningText);
            controller.enqueue(result);
            runningText = "";
          } catch (_e) {
            // Not a valid JSON object
          }
        }
      },
    });
  }
}

export class JSONTransporter extends Transporter<object, object> {
  static encoder<T extends object>() {
    return new PipeStream<T, Uint8Array>(
      new JSONEncoderStream(),
      new TextEncoderStream(),
    );
  }
  static decoder<T extends object>() {
    return new PipeStream<Uint8Array, T>(
      new TextDecoderStream(),
      new JSONDecoderStream(),
    );
  }
}

// @ts-ignore .
JSONTransporter.demo = (u = "/json") => {
  const ts = new JSONTransporter(u);
  ts.read(console.log);

  ts.write({ uid: "serebano", msg: "Anybody here?" });

  return ts;
};
