/**
 * Consumes a ReadableStream by applying a function to each chunk.
 * @param fn - The function to apply to each chunk of the ReadableStream.
 * @returns A function that accepts a ReadableStream and consumes it using the provided function.
 */
export function consume<T>(
  fn: (chunk: T) => unknown,
): (input: ReadableStream<T>) => Promise<void>;

/**
 * Consumes a ReadableStream using a provided function.
 * @param readable - The ReadableStream to consume.
 * @returns A function that accepts a function to apply to each chunk of the ReadableStream and consumes it.
 */
export function consume<T>(
  readable: ReadableStream<T>,
): (fn: (chunk: T) => unknown) => Promise<void>;

/**
 * Consumes a ReadableStream by applying a function to each chunk.
 * @param readable - The ReadableStream to consume.
 * @param fn - The function to apply to each chunk of the ReadableStream.
 * @returns A Promise that resolves when the ReadableStream has been fully consumed.
 */
export async function consume<T>(
  readable: ReadableStream<T>,
  fn: (chunk: T) => unknown,
): Promise<void>;

/**
 * Consumes a ReadableStream or a function by applying a function to each chunk.
 * @param readable - The ReadableStream or function to consume.
 * @param fn - The function to apply to each chunk of the ReadableStream.
 * @returns A function that accepts a ReadableStream and consumes it using the provided function, or a function that accepts a function to apply to each chunk of the ReadableStream and consumes it.
 */
export function consume<T>(
  readable: ReadableStream<T> | ((chunk: T) => unknown),
  fn?: (chunk: T) => unknown,
) {
  if (readable instanceof ReadableStream) {
    if (!fn) return (fn: (chunk: T) => unknown) => consume(readable, fn);

    return (async () => {
      for await (const chunk of readable) await fn(chunk);
    })();
  }

  if (typeof readable === "function") {
    return (input: ReadableStream<T>) => consume(input, readable);
  }
}

/**
 * Example function that demonstrates the usage of the `consume` function.
 */
function _example() {
  const readable = new ReadableStream<string>();
  const log = (chunk: string) => console.log(chunk);

  consume(readable, log);

  consume(readable)(log);

  consume(log)(readable);
}
