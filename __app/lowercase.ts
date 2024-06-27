import { transform } from "../mod.ts";
import { duplexHandler } from "../transport/mod.ts";
import { ResponseStream } from "../transport/TransportStream.ts";

export default {
  fetch: duplexHandler((request) => {
    if (request.body) {
      return new ResponseStream(
        request.body
          .pipeThrough(transform.decode())
          .pipeThrough(transform.toLowerCase())
          .pipeThrough(transform.encode()),
      );
    }

    return new ResponseStream("Bad req");
  }),
};
