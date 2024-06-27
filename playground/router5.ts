import { DevApp } from "../app/DevApp.ts";
import {
  lowercaseStreamResponse,
  uppercaseStreamResponse,
} from "../transport/uppercaseStreamResponse.ts";

export default new DevApp()
  .use("/echo", (req) => new Response(req.body))
  .use("/uppercase", uppercaseStreamResponse)
  .use("/lowercase", lowercaseStreamResponse)
  .use(
    "/upper",
    (req) =>
      new Response(
        req.body
          ?.pipeThrough(new TextDecoderStream())
          .pipeThrough(transform.toUpperCase())
          .pipeThrough(new TextEncoderStream()),
      ),
  );
