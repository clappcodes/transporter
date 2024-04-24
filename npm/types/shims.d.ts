export declare function ReadableStreamFrom<R>(iterator: AsyncIterable<R> | Iterable<R | PromiseLike<R>>): ReadableStream<R>;
export declare function ReadableStreamIterator<R>(this: ReadableStream<R>): AsyncGenerator<Awaited<R>, void, unknown>;
