export async function* readJSON(readableStream: ReadableStream) {
  const reader = readableStream.getReader();
  let runningText = "";
  const decoder = new TextDecoder("utf-8");
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    const text = decoder.decode(value, { stream: true });
    const objects = text.split("\n");
    for (const obj of objects) {
      try {
        runningText += obj;
        const result = JSON.parse(runningText);
        yield result;
        runningText = "";
      } catch (_e) {
        // Not a valid JSON object
      }
    }
  }
}
