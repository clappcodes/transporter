var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { from } from "./readable/from.ts";
async function* ReadableStreamIterator() {
  const reader = this.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      yield value;
    }
  } finally {
    reader.releaseLock();
  }
}
__name(ReadableStreamIterator, "ReadableStreamIterator");
if (!("from" in ReadableStream)) {
  console.log("(shim) ReadableStream.from");
  Object.defineProperty(ReadableStream, "from", {
    value: from
  });
}
if (typeof ReadableStream.prototype[Symbol.asyncIterator] === "undefined") {
  console.log("(shim) ReadableStream.prototype[Symbol.asyncIterator]");
  Object.defineProperty(ReadableStream.prototype, Symbol.asyncIterator, {
    value: ReadableStreamIterator
  });
}
export {
  ReadableStreamIterator
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc2hpbXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGZyb20gfSBmcm9tIFwiLi9yZWFkYWJsZS9mcm9tLnRzXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiogUmVhZGFibGVTdHJlYW1JdGVyYXRvcjxSPih0aGlzOiBSZWFkYWJsZVN0cmVhbTxSPikge1xuICBjb25zdCByZWFkZXIgPSB0aGlzLmdldFJlYWRlcigpO1xuICB0cnkge1xuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBjb25zdCB7IGRvbmUsIHZhbHVlIH0gPSBhd2FpdCByZWFkZXIucmVhZCgpO1xuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgeWllbGQgdmFsdWU7XG4gICAgfVxuICB9IGZpbmFsbHkge1xuICAgIHJlYWRlci5yZWxlYXNlTG9jaygpO1xuICB9XG59XG5cbmlmICghKFwiZnJvbVwiIGluIFJlYWRhYmxlU3RyZWFtKSkge1xuICBjb25zb2xlLmxvZyhcIihzaGltKSBSZWFkYWJsZVN0cmVhbS5mcm9tXCIpO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhZGFibGVTdHJlYW0sIFwiZnJvbVwiLCB7XG4gICAgdmFsdWU6IGZyb20sXG4gIH0pO1xufVxuXG5pZiAodHlwZW9mIFJlYWRhYmxlU3RyZWFtLnByb3RvdHlwZVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgY29uc29sZS5sb2coXCIoc2hpbSkgUmVhZGFibGVTdHJlYW0ucHJvdG90eXBlW1N5bWJvbC5hc3luY0l0ZXJhdG9yXVwiKTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWRhYmxlU3RyZWFtLnByb3RvdHlwZSwgU3ltYm9sLmFzeW5jSXRlcmF0b3IsIHtcbiAgICB2YWx1ZTogUmVhZGFibGVTdHJlYW1JdGVyYXRvcixcbiAgfSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUFBLFNBQVMsWUFBWTtBQUVyQixnQkFBdUIseUJBQW1EO0FBQ3hFLFFBQU0sU0FBUyxLQUFLLFVBQVU7QUFDOUIsTUFBSTtBQUNGLFdBQU8sTUFBTTtBQUNYLFlBQU0sRUFBRSxNQUFNLE1BQU0sSUFBSSxNQUFNLE9BQU8sS0FBSztBQUMxQyxVQUFJLE1BQU07QUFDUjtBQUFBLE1BQ0Y7QUFDQSxZQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0YsVUFBRTtBQUNBLFdBQU8sWUFBWTtBQUFBLEVBQ3JCO0FBQ0Y7QUFidUI7QUFldkIsSUFBSSxFQUFFLFVBQVUsaUJBQWlCO0FBQy9CLFVBQVEsSUFBSSw0QkFBNEI7QUFDeEMsU0FBTyxlQUFlLGdCQUFnQixRQUFRO0FBQUEsSUFDNUMsT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUNIO0FBRUEsSUFBSSxPQUFPLGVBQWUsVUFBVSxPQUFPLGFBQWEsTUFBTSxhQUFhO0FBQ3pFLFVBQVEsSUFBSSx1REFBdUQ7QUFDbkUsU0FBTyxlQUFlLGVBQWUsV0FBVyxPQUFPLGVBQWU7QUFBQSxJQUNwRSxPQUFPO0FBQUEsRUFDVCxDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbXQp9Cg==
