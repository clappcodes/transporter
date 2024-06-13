export * from "./from-body.ts";
export * from "./from-fetch.ts";
export * from "./from.ts";
export * from "./from-timer.ts";
export * from "./external.ts";
export * from "./from-event.ts";
export * from "./from-generator.ts";
export * from "./from-iterable.ts";
export * from "./just.ts";
export * from "./range.ts";
export * from "./read.ts";
export * from "./consume.ts";

export function readable<T>(
  start:
    | ((controller: ReadableStreamDefaultController<T>) => void)
    | undefined,
  rest?: Omit<UnderlyingDefaultSource<T>, "start">,
) {
  return new ReadableStream<T>({
    start,
    ...rest,
  });
}
