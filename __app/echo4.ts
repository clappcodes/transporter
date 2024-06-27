import { readable, transform } from "../mod.ts";

export default ({
  fetch(request: Request) {
    console.log(import.meta.url, request.url);
    return new Response(
      readable.fromTimer(1000, Math.random)
        .pipeThrough(transform.toString())
        .pipeThrough(transform.map((value) => {
          return [
            ["data", value].join(": ") + "\n\n",
          ].join("\n");
        }))
        .pipeThrough(transform.encode()),
      {
        status: 200,
        headers: {
          "content-type": "text/event-stream",
        },
      },
    );
  },
});
