export type Readable<T> = ReadableStream<T>;
export type Writable<T> = WritableStream<T>;
export type Observable<T> = ReadableStream<T>;
export type Transform<I, O = I> = TransformStream<I, O>;

export interface Incoming<T> extends Readable<T> {
  url?: URL | string;
}

export interface Outgoing<T> extends Writable<T> {
  url?: URL | string;
}

export interface Transport<I, O = I> {
  readonly incoming: Incoming<I>;
  readonly outgoing: Outgoing<O>;
}

export type StrictStream<Type> = ReadableStream<Type>;
export type StrictStreamOf<Input> = StrictStream<Input> & {
  pipe<Output>(
    mapper: StrictStreamMapper<Input, Output>,
  ): StrictStreamOf<Output>;
};

export type StrictStreamLike<Type> =
  | ReadableStream<Type>
  | Readable<Type>;

export type StrictStreamMapper<Input, Output> = (
  stream: StrictStream<Input>,
) => StrictStream<Output>;

export type Promised<Type> = Type | Promise<Type>;

export type StrictStreamPlumber<In, Out> = StrictStreamMapper<In, Out> & {
  pipe<Output>(
    mapper: StrictStreamMapper<Out, Output> | TransformStream<Out, Output>,
  ): StrictStreamPlumber<In, Output>;
};
