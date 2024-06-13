var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
class Uint8ArrayTransformStream extends TransformStream {
  static {
    __name(this, "Uint8ArrayTransformStream");
  }
  constructor() {
    const encoder = new TextEncoder();
    super({
      start() {
      },
      // required.
      async transform(chunk, controller) {
        chunk = await chunk;
        switch (typeof chunk) {
          case "object":
            if (chunk === null) {
              controller.terminate();
            } else if (ArrayBuffer.isView(chunk)) {
              controller.enqueue(
                new Uint8Array(
                  chunk.buffer,
                  chunk.byteOffset,
                  chunk.byteLength
                )
              );
            } else if (Array.isArray(chunk) && chunk.every((value) => typeof value === "number")) {
              controller.enqueue(new Uint8Array(chunk));
            } else if (typeof chunk.valueOf === "function" && chunk.valueOf() !== chunk) {
              this.transform(chunk.valueOf(), controller);
            } else if ("toJSON" in chunk) {
              this.transform(JSON.stringify(chunk), controller);
            }
            break;
          case "symbol":
            controller.error("Cannot send a symbol as a chunk part");
            break;
          case "undefined":
            controller.error("Cannot send undefined as a chunk part");
            break;
          default:
            controller.enqueue(encoder.encode(String(chunk)));
            break;
        }
      },
      flush() {
      }
    });
  }
}
function toUint8Array() {
  return new Uint8ArrayTransformStream();
}
__name(toUint8Array, "toUint8Array");
export {
  Uint8ArrayTransformStream,
  toUint8Array
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdHJhbnNmb3JtL3RvLXVpbnQ4YXJyYXkudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBjbGFzcyBVaW50OEFycmF5VHJhbnNmb3JtU3RyZWFtPFQ+IGV4dGVuZHMgVHJhbnNmb3JtU3RyZWFtPFxuICBULFxuICBVaW50OEFycmF5XG4+IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xuXG4gICAgc3VwZXIoe1xuICAgICAgc3RhcnQoKSB7fSwgLy8gcmVxdWlyZWQuXG4gICAgICBhc3luYyB0cmFuc2Zvcm0oY2h1bmssIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgY2h1bmsgPSBhd2FpdCBjaHVuaztcbiAgICAgICAgc3dpdGNoICh0eXBlb2YgY2h1bmspIHtcbiAgICAgICAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAgICAgICAvLyBqdXN0IHNheSB0aGUgc3RyZWFtIGlzIGRvbmUgSSBndWVzc1xuICAgICAgICAgICAgaWYgKGNodW5rID09PSBudWxsKSB7XG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIudGVybWluYXRlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5QnVmZmVyLmlzVmlldyhjaHVuaykpIHtcbiAgICAgICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKFxuICAgICAgICAgICAgICAgIG5ldyBVaW50OEFycmF5KFxuICAgICAgICAgICAgICAgICAgY2h1bmsuYnVmZmVyLFxuICAgICAgICAgICAgICAgICAgY2h1bmsuYnl0ZU9mZnNldCxcbiAgICAgICAgICAgICAgICAgIGNodW5rLmJ5dGVMZW5ndGgsXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgIEFycmF5LmlzQXJyYXkoY2h1bmspICYmXG4gICAgICAgICAgICAgIGNodW5rLmV2ZXJ5KCh2YWx1ZSkgPT4gdHlwZW9mIHZhbHVlID09PSBcIm51bWJlclwiKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShuZXcgVWludDhBcnJheShjaHVuaykpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgdHlwZW9mIGNodW5rLnZhbHVlT2YgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAgICAgICBjaHVuay52YWx1ZU9mKCkgIT09IGNodW5rXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm0hKGNodW5rLnZhbHVlT2YoKSBhcyBULCBjb250cm9sbGVyKTsgLy8gaGFja1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcInRvSlNPTlwiIGluIGNodW5rKSB7XG4gICAgICAgICAgICAgIHRoaXMudHJhbnNmb3JtIShKU09OLnN0cmluZ2lmeShjaHVuaykgYXMgVCwgY29udHJvbGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwic3ltYm9sXCI6XG4gICAgICAgICAgICBjb250cm9sbGVyLmVycm9yKFwiQ2Fubm90IHNlbmQgYSBzeW1ib2wgYXMgYSBjaHVuayBwYXJ0XCIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcInVuZGVmaW5lZFwiOlxuICAgICAgICAgICAgY29udHJvbGxlci5lcnJvcihcIkNhbm5vdCBzZW5kIHVuZGVmaW5lZCBhcyBhIGNodW5rIHBhcnRcIik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKGVuY29kZXIuZW5jb2RlKFN0cmluZyhjaHVuaykpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZmx1c2goKSB7XG4gICAgICAgIC8qIGRvIGFueSBkZXN0cnVjdG9yIHdvcmsgaGVyZSAqL1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9VaW50OEFycmF5PFQ+KCk6IFVpbnQ4QXJyYXlUcmFuc2Zvcm1TdHJlYW08VD4ge1xuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXlUcmFuc2Zvcm1TdHJlYW08VD4oKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBQU8sTUFBTSxrQ0FBcUMsZ0JBR2hEO0FBQUEsRUFIRixPQUdFO0FBQUE7QUFBQTtBQUFBLEVBQ0EsY0FBYztBQUNaLFVBQU0sVUFBVSxJQUFJLFlBQVk7QUFFaEMsVUFBTTtBQUFBLE1BQ0osUUFBUTtBQUFBLE1BQUM7QUFBQTtBQUFBLE1BQ1QsTUFBTSxVQUFVLE9BQU8sWUFBWTtBQUNqQyxnQkFBUSxNQUFNO0FBQ2QsZ0JBQVEsT0FBTyxPQUFPO0FBQUEsVUFDcEIsS0FBSztBQUVILGdCQUFJLFVBQVUsTUFBTTtBQUNsQix5QkFBVyxVQUFVO0FBQUEsWUFDdkIsV0FBVyxZQUFZLE9BQU8sS0FBSyxHQUFHO0FBQ3BDLHlCQUFXO0FBQUEsZ0JBQ1QsSUFBSTtBQUFBLGtCQUNGLE1BQU07QUFBQSxrQkFDTixNQUFNO0FBQUEsa0JBQ04sTUFBTTtBQUFBLGdCQUNSO0FBQUEsY0FDRjtBQUFBLFlBQ0YsV0FDRSxNQUFNLFFBQVEsS0FBSyxLQUNuQixNQUFNLE1BQU0sQ0FBQyxVQUFVLE9BQU8sVUFBVSxRQUFRLEdBQ2hEO0FBQ0EseUJBQVcsUUFBUSxJQUFJLFdBQVcsS0FBSyxDQUFDO0FBQUEsWUFDMUMsV0FDRSxPQUFPLE1BQU0sWUFBWSxjQUN6QixNQUFNLFFBQVEsTUFBTSxPQUNwQjtBQUNBLG1CQUFLLFVBQVcsTUFBTSxRQUFRLEdBQVEsVUFBVTtBQUFBLFlBQ2xELFdBQVcsWUFBWSxPQUFPO0FBQzVCLG1CQUFLLFVBQVcsS0FBSyxVQUFVLEtBQUssR0FBUSxVQUFVO0FBQUEsWUFDeEQ7QUFDQTtBQUFBLFVBQ0YsS0FBSztBQUNILHVCQUFXLE1BQU0sc0NBQXNDO0FBQ3ZEO0FBQUEsVUFDRixLQUFLO0FBQ0gsdUJBQVcsTUFBTSx1Q0FBdUM7QUFDeEQ7QUFBQSxVQUNGO0FBQ0UsdUJBQVcsUUFBUSxRQUFRLE9BQU8sT0FBTyxLQUFLLENBQUMsQ0FBQztBQUNoRDtBQUFBLFFBQ0o7QUFBQSxNQUNGO0FBQUEsTUFDQSxRQUFRO0FBQUEsTUFFUjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQUVPLFNBQVMsZUFBZ0Q7QUFDOUQsU0FBTyxJQUFJLDBCQUE2QjtBQUMxQztBQUZnQjsiLAogICJuYW1lcyI6IFtdCn0K
