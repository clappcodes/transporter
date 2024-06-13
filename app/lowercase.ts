import { transform } from "../mod.ts";
import { duplex } from "../transport/mod.ts";
import { ResponseStream } from "../transport/TransportStream.ts";

export default {
  fetch: duplex((request) => {
    if (request.body) {
      return new ResponseStream(
        request.body
          .pipeThrough(transform.decode())
          .pipeThrough(transform.lowerCase())
          .pipeThrough(transform.encode()),
      );
    }

    return new ResponseStream("Bad req");
  }),
};
