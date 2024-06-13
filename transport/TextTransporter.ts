import { RequestTransformerStream, Transporter } from "./Transporter.ts";

export class TextTransporter extends Transporter<string, string> {
  static encoder = (): TransformStream<string, Uint8Array> =>
    new TextEncoderStream();
  static decoder = (): TransformStream<Uint8Array, string> =>
    new TextDecoderStream();
}

// @ts-ignore .
TextTransporter.demo = (u = "/upper") => {
  const ts = new TextTransporter(u);

  ts.read(console.log);
  ts.write("Hello World");

  return ts;
};
