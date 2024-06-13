export async function toBlob(
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
