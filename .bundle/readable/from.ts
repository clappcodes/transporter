var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function from(iterator) {
  if (iterator instanceof ReadableStream) {
    return iterator;
  }
  return new ReadableStream({
    async pull(controller) {
      if (iterator instanceof Promise) {
        try {
          iterator = await iterator;
        } catch (e) {
          controller.error(`(readable.from) ${e}`);
          return;
        }
      }
      if (typeof iterator === "function") {
        iterator = iterator();
      }
      if (
        // typeof iterator === "undefined" || iterator === null ||
        iterator instanceof Blob
      ) {
        for await (const chunk of iterator.stream()) {
          controller.enqueue(chunk);
        }
      } else if (iterator) {
        for await (const chunk of iterator) {
          controller.enqueue(chunk);
        }
      }
      controller.close();
    }
  });
}
__name(from, "from");
async function* foo(x = 1e3) {
  yield "foo";
  yield Promise.resolve(x);
}
__name(foo, "foo");
function* bar() {
  yield "bar";
}
__name(bar, "bar");
const baz = [foo, bar];
const baz2 = /* @__PURE__ */ __name(async function* () {
  yield* foo();
  yield null;
  yield* bar();
  yield void 0;
}, "baz2");
from().pipeTo(
  new WritableStream({
    start() {
      console.log("start");
    },
    write(chunk) {
      console.log("chunk", chunk);
    }
  })
);
const of = /* @__PURE__ */ __name((...args) => from(args), "of");
export {
  from,
  of
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhZGFibGUvZnJvbS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsidHlwZSBHZW5lcmF0b3JGdW5jPFQ+ID0gKCkgPT4gSXRlcmFibGVJdGVyYXRvcjxUPjtcbnR5cGUgQXN5bmNHZW5lcmF0b3JGdW5jPFQ+ID0gKCkgPT4gQXN5bmNJdGVyYWJsZUl0ZXJhdG9yPFQ+O1xuXG50eXBlIEZyb21UeXBlPFI+ID1cbiAgfCBBc3luY0l0ZXJhYmxlPFI+XG4gIHwgSXRlcmFibGU8UiB8IFByb21pc2VMaWtlPFI+PlxuICB8IEdlbmVyYXRvckZ1bmM8Uj5cbiAgfCBBc3luY0dlbmVyYXRvckZ1bmM8Uj5cbiAgfCBBcnJheUJ1ZmZlclZpZXdcbiAgfCBCbG9iXG4gIHwgbnVsbDtcblxuZXhwb3J0IGZ1bmN0aW9uIGZyb208Uj4oXG4gIGl0ZXJhdG9yPzpcbiAgICB8IEZyb21UeXBlPFI+XG4gICAgfCBQcm9taXNlPEZyb21UeXBlPFI+Pixcbik6IFJlYWRhYmxlU3RyZWFtPFI+IHtcbiAgaWYgKGl0ZXJhdG9yIGluc3RhbmNlb2YgUmVhZGFibGVTdHJlYW0pIHtcbiAgICByZXR1cm4gaXRlcmF0b3I7XG4gIH1cblxuICByZXR1cm4gbmV3IFJlYWRhYmxlU3RyZWFtPFI+KHtcbiAgICBhc3luYyBwdWxsKGNvbnRyb2xsZXIpIHtcbiAgICAgIGlmIChpdGVyYXRvciBpbnN0YW5jZW9mIFByb21pc2UpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpdGVyYXRvciA9IGF3YWl0IGl0ZXJhdG9yO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgY29udHJvbGxlci5lcnJvcihgKHJlYWRhYmxlLmZyb20pICR7ZX1gKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYXRvciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGl0ZXJhdG9yID0gaXRlcmF0b3IoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICAvLyB0eXBlb2YgaXRlcmF0b3IgPT09IFwidW5kZWZpbmVkXCIgfHwgaXRlcmF0b3IgPT09IG51bGwgfHxcbiAgICAgICAgaXRlcmF0b3IgaW5zdGFuY2VvZiBCbG9iXG4gICAgICApIHtcbiAgICAgICAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiBpdGVyYXRvci5zdHJlYW0oKSBhcyBSZWFkYWJsZVN0cmVhbTxSPikge1xuICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShjaHVuayk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXRlcmF0b3IpIHtcbiAgICAgICAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiBpdGVyYXRvcikge1xuICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShjaHVuayk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29udHJvbGxlci5jbG9zZSgpO1xuICAgIH0sXG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiogZm9vKHggPSAxMDAwKSB7XG4gIHlpZWxkIFwiZm9vXCI7XG4gIHlpZWxkIFByb21pc2UucmVzb2x2ZSh4KTtcbn1cblxuZnVuY3Rpb24qIGJhcigpIHtcbiAgeWllbGQgXCJiYXJcIjtcbn1cblxuY29uc3QgYmF6ID0gW2ZvbywgYmFyXTtcbmNvbnN0IGJhejIgPSBhc3luYyBmdW5jdGlvbiogKCkge1xuICB5aWVsZCogZm9vKCk7XG4gIHlpZWxkIG51bGw7XG4gIHlpZWxkKiBiYXIoKTtcbiAgeWllbGQgdW5kZWZpbmVkO1xufTtcblxuZnJvbSgpLnBpcGVUbyhcbiAgbmV3IFdyaXRhYmxlU3RyZWFtKHtcbiAgICBzdGFydCgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRcIik7XG4gICAgfSxcbiAgICB3cml0ZShjaHVuaykge1xuICAgICAgY29uc29sZS5sb2coXCJjaHVua1wiLCBjaHVuayk7XG4gICAgfSxcbiAgfSksXG4pO1xuXG5leHBvcnQgY29uc3Qgb2YgPSA8VCBleHRlbmRzIHVua25vd25bXT4oLi4uYXJnczogVCkgPT5cbiAgZnJvbShhcmdzIGFzIFRbbnVtYmVyXVtdKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBWU8sU0FBUyxLQUNkLFVBR21CO0FBQ25CLE1BQUksb0JBQW9CLGdCQUFnQjtBQUN0QyxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU8sSUFBSSxlQUFrQjtBQUFBLElBQzNCLE1BQU0sS0FBSyxZQUFZO0FBQ3JCLFVBQUksb0JBQW9CLFNBQVM7QUFDL0IsWUFBSTtBQUNGLHFCQUFXLE1BQU07QUFBQSxRQUNuQixTQUFTLEdBQUc7QUFDVixxQkFBVyxNQUFNLG1CQUFtQixDQUFDLEVBQUU7QUFDdkM7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVBLFVBQUksT0FBTyxhQUFhLFlBQVk7QUFDbEMsbUJBQVcsU0FBUztBQUFBLE1BQ3RCO0FBRUE7QUFBQTtBQUFBLFFBRUUsb0JBQW9CO0FBQUEsUUFDcEI7QUFDQSx5QkFBaUIsU0FBUyxTQUFTLE9BQU8sR0FBd0I7QUFDaEUscUJBQVcsUUFBUSxLQUFLO0FBQUEsUUFDMUI7QUFBQSxNQUNGLFdBQVcsVUFBVTtBQUNuQix5QkFBaUIsU0FBUyxVQUFVO0FBQ2xDLHFCQUFXLFFBQVEsS0FBSztBQUFBLFFBQzFCO0FBQUEsTUFDRjtBQUVBLGlCQUFXLE1BQU07QUFBQSxJQUNuQjtBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBeENnQjtBQTBDaEIsZ0JBQWdCLElBQUksSUFBSSxLQUFNO0FBQzVCLFFBQU07QUFDTixRQUFNLFFBQVEsUUFBUSxDQUFDO0FBQ3pCO0FBSGdCO0FBS2hCLFVBQVUsTUFBTTtBQUNkLFFBQU07QUFDUjtBQUZVO0FBSVYsTUFBTSxNQUFNLENBQUMsS0FBSyxHQUFHO0FBQ3JCLE1BQU0sT0FBTywwQ0FBbUI7QUFDOUIsU0FBTyxJQUFJO0FBQ1gsUUFBTTtBQUNOLFNBQU8sSUFBSTtBQUNYLFFBQU07QUFDUixHQUxhO0FBT2IsS0FBSyxFQUFFO0FBQUEsRUFDTCxJQUFJLGVBQWU7QUFBQSxJQUNqQixRQUFRO0FBQ04sY0FBUSxJQUFJLE9BQU87QUFBQSxJQUNyQjtBQUFBLElBQ0EsTUFBTSxPQUFPO0FBQ1gsY0FBUSxJQUFJLFNBQVMsS0FBSztBQUFBLElBQzVCO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUFFTyxNQUFNLEtBQUssMkJBQXlCLFNBQ3pDLEtBQUssSUFBbUIsR0FEUjsiLAogICJuYW1lcyI6IFtdCn0K
