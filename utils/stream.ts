export const isAsyncGeneratorFunc = (
  i: () => AsyncGenerator | AsyncGeneratorFunction | GeneratorFunction,
): i is AsyncGeneratorFunction =>
  i.constructor.name === "AsyncGeneratorFunction";

export const isGeneratorFunc = (
  i: () => Generator | GeneratorFunction | AsyncGeneratorFunction,
): i is GeneratorFunction => i.constructor.name === "GeneratorFunction";

export async function readableToBlob(
  body?: ReadableStream<Uint8Array> | null,
  type?: string | null,
): Promise<Blob> {
  if (!body) {
    return new Blob(undefined, type ? { type } : undefined);
  }
  const chunks: Uint8Array[] = [];
  for await (const chunk of body) {
    chunks.push(chunk);
  }
  return new Blob(chunks, type ? { type } : undefined);
}
