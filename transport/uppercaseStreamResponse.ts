import { duplexHandler } from "../transporter/duplexHandler.ts";
import { PipeStream } from "../transporter/PipeStream.ts";
import type { DuplexRequestInit } from "./DuplexRequestBase.ts";
import { TransportStream } from "../transporter/TransportStream.ts";

export const uppercaseStreamResponse = duplexHandler((req) =>
  new Response(
    req.body?.pipeThrough(
      new PipeStream<Uint8Array, Uint8Array>(
        new TextDecoderStream(),
        transform.toUpperCase(),
        new TextEncoderStream(),
      ),
    ),
  )
);

export const lowercaseStreamResponse = duplexHandler((req) =>
  new Response(
    req.body?.pipeThrough(
      new PipeStream<Uint8Array, Uint8Array>(
        new TextDecoderStream(),
        transform.toLowerCase(),
        new TextEncoderStream(),
      ),
    ),
  )
);

export const uppercaseStreamRequest = (
  init?: DuplexRequestInit,
) =>
  new PipeStream<string, string>(
    new TextEncoderStream(),
    new TransportStream("/uppercase", init),
    new TextDecoderStream(),
  );

export const lowercaseStreamRequest = (
  init?: DuplexRequestInit,
) =>
  new PipeStream<string, string>(
    new TextEncoderStream(),
    new TransportStream("/lowercase", init),
    new TextDecoderStream(),
  );
