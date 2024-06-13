export const pipeTo =
  <T extends Uint8Array>(
    destination: WritableStream<T> | TransformStream<T, T>,
  ) =>
  (source: ReadableStream<T> | Response | Request) =>
    source instanceof ReadableStream
      ? source.pipeTo(
        destination instanceof WritableStream
          ? destination
          : destination.writable,
      )
      : source.body!.pipeTo(
        destination instanceof WritableStream
          ? destination
          : destination.writable,
      );
