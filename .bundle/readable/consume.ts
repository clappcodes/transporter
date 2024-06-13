var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function consume(readable, fn) {
  if (readable instanceof ReadableStream) {
    if (!fn)
      return (fn2) => consume(readable, fn2);
    return (async () => {
      for await (const chunk of readable)
        await fn(chunk);
    })();
  }
  if (typeof readable === "function") {
    return (input) => consume(input, readable);
  }
}
__name(consume, "consume");
function _example() {
  const readable = new ReadableStream();
  const log = /* @__PURE__ */ __name((chunk) => console.log(chunk), "log");
  consume(readable, log);
  consume(readable)(log);
  consume(log)(readable);
}
__name(_example, "_example");
export {
  consume
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhZGFibGUvY29uc3VtZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBDb25zdW1lcyBhIFJlYWRhYmxlU3RyZWFtIGJ5IGFwcGx5aW5nIGEgZnVuY3Rpb24gdG8gZWFjaCBjaHVuay5cbiAqIEBwYXJhbSBmbiAtIFRoZSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGNodW5rIG9mIHRoZSBSZWFkYWJsZVN0cmVhbS5cbiAqIEByZXR1cm5zIEEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGEgUmVhZGFibGVTdHJlYW0gYW5kIGNvbnN1bWVzIGl0IHVzaW5nIHRoZSBwcm92aWRlZCBmdW5jdGlvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnN1bWU8VD4oXG4gIGZuOiAoY2h1bms6IFQpID0+IHVua25vd24sXG4pOiAoaW5wdXQ6IFJlYWRhYmxlU3RyZWFtPFQ+KSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIENvbnN1bWVzIGEgUmVhZGFibGVTdHJlYW0gdXNpbmcgYSBwcm92aWRlZCBmdW5jdGlvbi5cbiAqIEBwYXJhbSByZWFkYWJsZSAtIFRoZSBSZWFkYWJsZVN0cmVhbSB0byBjb25zdW1lLlxuICogQHJldHVybnMgQSBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgYSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGNodW5rIG9mIHRoZSBSZWFkYWJsZVN0cmVhbSBhbmQgY29uc3VtZXMgaXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25zdW1lPFQ+KFxuICByZWFkYWJsZTogUmVhZGFibGVTdHJlYW08VD4sXG4pOiAoZm46IChjaHVuazogVCkgPT4gdW5rbm93bikgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBDb25zdW1lcyBhIFJlYWRhYmxlU3RyZWFtIGJ5IGFwcGx5aW5nIGEgZnVuY3Rpb24gdG8gZWFjaCBjaHVuay5cbiAqIEBwYXJhbSByZWFkYWJsZSAtIFRoZSBSZWFkYWJsZVN0cmVhbSB0byBjb25zdW1lLlxuICogQHBhcmFtIGZuIC0gVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIGVhY2ggY2h1bmsgb2YgdGhlIFJlYWRhYmxlU3RyZWFtLlxuICogQHJldHVybnMgQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgUmVhZGFibGVTdHJlYW0gaGFzIGJlZW4gZnVsbHkgY29uc3VtZWQuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb25zdW1lPFQ+KFxuICByZWFkYWJsZTogUmVhZGFibGVTdHJlYW08VD4sXG4gIGZuOiAoY2h1bms6IFQpID0+IHVua25vd24sXG4pOiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIENvbnN1bWVzIGEgUmVhZGFibGVTdHJlYW0gb3IgYSBmdW5jdGlvbiBieSBhcHBseWluZyBhIGZ1bmN0aW9uIHRvIGVhY2ggY2h1bmsuXG4gKiBAcGFyYW0gcmVhZGFibGUgLSBUaGUgUmVhZGFibGVTdHJlYW0gb3IgZnVuY3Rpb24gdG8gY29uc3VtZS5cbiAqIEBwYXJhbSBmbiAtIFRoZSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGNodW5rIG9mIHRoZSBSZWFkYWJsZVN0cmVhbS5cbiAqIEByZXR1cm5zIEEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGEgUmVhZGFibGVTdHJlYW0gYW5kIGNvbnN1bWVzIGl0IHVzaW5nIHRoZSBwcm92aWRlZCBmdW5jdGlvbiwgb3IgYSBmdW5jdGlvbiB0aGF0IGFjY2VwdHMgYSBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGNodW5rIG9mIHRoZSBSZWFkYWJsZVN0cmVhbSBhbmQgY29uc3VtZXMgaXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb25zdW1lPFQ+KFxuICByZWFkYWJsZTogUmVhZGFibGVTdHJlYW08VD4gfCAoKGNodW5rOiBUKSA9PiB1bmtub3duKSxcbiAgZm4/OiAoY2h1bms6IFQpID0+IHVua25vd24sXG4pIHtcbiAgaWYgKHJlYWRhYmxlIGluc3RhbmNlb2YgUmVhZGFibGVTdHJlYW0pIHtcbiAgICBpZiAoIWZuKSByZXR1cm4gKGZuOiAoY2h1bms6IFQpID0+IHVua25vd24pID0+IGNvbnN1bWUocmVhZGFibGUsIGZuKTtcblxuICAgIHJldHVybiAoYXN5bmMgKCkgPT4ge1xuICAgICAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiByZWFkYWJsZSkgYXdhaXQgZm4oY2h1bmspO1xuICAgIH0pKCk7XG4gIH1cblxuICBpZiAodHlwZW9mIHJlYWRhYmxlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gKGlucHV0OiBSZWFkYWJsZVN0cmVhbTxUPikgPT4gY29uc3VtZShpbnB1dCwgcmVhZGFibGUpO1xuICB9XG59XG5cbi8qKlxuICogRXhhbXBsZSBmdW5jdGlvbiB0aGF0IGRlbW9uc3RyYXRlcyB0aGUgdXNhZ2Ugb2YgdGhlIGBjb25zdW1lYCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gX2V4YW1wbGUoKSB7XG4gIGNvbnN0IHJlYWRhYmxlID0gbmV3IFJlYWRhYmxlU3RyZWFtPHN0cmluZz4oKTtcbiAgY29uc3QgbG9nID0gKGNodW5rOiBzdHJpbmcpID0+IGNvbnNvbGUubG9nKGNodW5rKTtcblxuICBjb25zdW1lKHJlYWRhYmxlLCBsb2cpO1xuXG4gIGNvbnN1bWUocmVhZGFibGUpKGxvZyk7XG5cbiAgY29uc3VtZShsb2cpKHJlYWRhYmxlKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBbUNPLFNBQVMsUUFDZCxVQUNBLElBQ0E7QUFDQSxNQUFJLG9CQUFvQixnQkFBZ0I7QUFDdEMsUUFBSSxDQUFDO0FBQUksYUFBTyxDQUFDQSxRQUE4QixRQUFRLFVBQVVBLEdBQUU7QUFFbkUsWUFBUSxZQUFZO0FBQ2xCLHVCQUFpQixTQUFTO0FBQVUsY0FBTSxHQUFHLEtBQUs7QUFBQSxJQUNwRCxHQUFHO0FBQUEsRUFDTDtBQUVBLE1BQUksT0FBTyxhQUFhLFlBQVk7QUFDbEMsV0FBTyxDQUFDLFVBQTZCLFFBQVEsT0FBTyxRQUFRO0FBQUEsRUFDOUQ7QUFDRjtBQWZnQjtBQW9CaEIsU0FBUyxXQUFXO0FBQ2xCLFFBQU0sV0FBVyxJQUFJLGVBQXVCO0FBQzVDLFFBQU0sTUFBTSx3QkFBQyxVQUFrQixRQUFRLElBQUksS0FBSyxHQUFwQztBQUVaLFVBQVEsVUFBVSxHQUFHO0FBRXJCLFVBQVEsUUFBUSxFQUFFLEdBQUc7QUFFckIsVUFBUSxHQUFHLEVBQUUsUUFBUTtBQUN2QjtBQVRTOyIsCiAgIm5hbWVzIjogWyJmbiJdCn0K
