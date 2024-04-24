export default function exampleHandler(_request: Request): Response {
  const stream = ReadableStream.from(async function* () {
    yield "Welcome!\n";

    while (true) {
      yield await new Promise((resolve) => {
        setTimeout(() => resolve(`${Date.now()}\n`), 1000);
      });
    }
  }());

  return new Response(stream.pipeThrough(new TextEncoderStream()), {
    status: 200,
    headers: {
      "content-type": "text/event-stream",
    },
  });
}
