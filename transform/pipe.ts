import type {
  StrictStream,
  StrictStreamMapper,
  StrictStreamPlumber,
} from "../types.ts";
import { isTransformStream } from "../utils.ts";

export const transform =
  <I, O>(transform: TransformStream<I, O>) =>
  (input: ReadableStream<I>): ReadableStream<O> => {
    return input.pipeThrough(transform);
  };

export function pipe<In, Out>(
  mapper: StrictStreamMapper<In, Out> | TransformStream<In, Out>,
): StrictStreamPlumber<In, Out> {
  const streamMapper: StrictStreamMapper<In, Out> = (input: StrictStream<In>) =>
    isTransformStream(mapper) ? transform(mapper)(input) : mapper(input);

  // todo: make it work
  if (isTransformStream(mapper)) {
    Object.defineProperties(streamMapper, {
      readable: {
        get: () => mapper.readable,
        enumerable: true,
      },
      writable: {
        get: () => mapper.writable,
        enumerable: true,
      },
    });
  }

  // @ts-ignore ?
  streamMapper.pipe = <Output>(
    mapper: StrictStreamMapper<Out, Output> | TransformStream<Out, Output>,
  ) => {
    return pipe<In, Output>((input: StrictStream<In>) => {
      const nextStream = streamMapper(input);
      return isTransformStream(mapper)
        ? transform(mapper)(nextStream)
        : mapper(nextStream);
    });
  };

  return streamMapper as StrictStreamPlumber<In, Out>;
}
