const { of, from, consume } = readable;

function consumeReadableFrom() {
  async function* bar() {
    yield 10;
    yield "foo";
    yield* of(1, 5, "ddd", null, { a: 4 });
    yield* "bar";
  }

  consume(from(bar), (c) => console.log("from()", c));
}

function consumeReadableOf() {
  function* bar() {
    yield 10;
    yield "foo";
    yield of(1, 5, "ddd", null, { a: 4 });
    yield* "bar";
  }

  consume(
    of(...bar())
      .pipeThrough(transform.apply(async (chunk, ctrl) => {
        if (chunk instanceof ReadableStream) {
          await consume(chunk, (chunk) => ctrl.enqueue(chunk));
        } else {
          ctrl.enqueue(chunk);
        }
      })),
    (c) => console.log("of()", c),
  );
}

// consumeReadableFrom();
// consumeReadableOf();
