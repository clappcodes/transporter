var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const EOF = Symbol();
function external() {
  let next;
  const observable = new ReadableStream(
    {
      start(controller) {
        next = /* @__PURE__ */ __name((v) => {
          if (v === EOF) {
            return controller.close();
          }
          controller.enqueue(v);
        }, "next");
      }
    },
    { highWaterMark: 0 }
  );
  return { observable, next };
}
__name(external, "external");
export {
  EOF,
  external
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhZGFibGUvZXh0ZXJuYWwudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogU3ltYm9sIGluZGljYXRpbmcgdGhlIGVuZCBvZiBhIHN0cmVhbS4gVXNlZCB3aXRoIGBleHRlcm5hbGAuXG4gKi9cbi8vIEB0cy1pZ25vcmUgP1xuZXhwb3J0IGNvbnN0IEVPRjogc3ltYm9sID0gU3ltYm9sKCk7XG5leHBvcnQgdHlwZSBOZXh0RnVuYzxUPiA9ICh2OiBUIHwgdHlwZW9mIEVPRikgPT4gdm9pZDtcblxuLyoqXG4gKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIGNyZWF0ZSBuZXcgb2JzZXJ2YWJsZXMgZnJvbSBleHRlcm5hbCBzb3VyY2VzLlxuICogUmV0dXJucyBhbiBvYmplY3Qgd2l0aCB0d28gdmFsdWVzOiB0aGUgbmV3IG9ic2VydmFibGUsIGFuZCBhIGBuZXh0YCBmdW5jdGlvblxuICogd2hpY2ggd2lsbCBlbWl0IGEgdmFsdWUgdG8gYG9ic2VydmFibGVgIHdoZW4gY2FsbGVkLlxuICogQ2FsbGluZyBgbmV4dGAgd2l0aCBgRU9GYCB3aWxsIGluZGljYXRlIHRoZXJlIGFyZSBubyBtb3JlIHZhbHVlcyB0byBlbWl0LlxuICpcbiAqIEB0eXBlcGFyYW0gVCBUeXBlIG9mIGl0ZW1zIHRvIGJlIGVtaXR0ZWQgYnkgdGhlIG9ic2VydmFibGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHRlcm5hbDxUPigpOiB7XG4gIG9ic2VydmFibGU6IFJlYWRhYmxlU3RyZWFtPFQ+O1xuICBuZXh0OiBOZXh0RnVuYzxUPjtcbn0ge1xuICBsZXQgbmV4dDogTmV4dEZ1bmM8VD47XG4gIGNvbnN0IG9ic2VydmFibGUgPSBuZXcgUmVhZGFibGVTdHJlYW08VD4oXG4gICAge1xuICAgICAgc3RhcnQoY29udHJvbGxlcikge1xuICAgICAgICBuZXh0ID0gKHY6IFQgfCB0eXBlb2YgRU9GKSA9PiB7XG4gICAgICAgICAgaWYgKHYgPT09IEVPRikge1xuICAgICAgICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuY2xvc2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKHYgYXMgVCk7XG4gICAgICAgIH07XG4gICAgICB9LFxuICAgIH0sXG4gICAgeyBoaWdoV2F0ZXJNYXJrOiAwIH0sXG4gICk7XG4gIHJldHVybiB7IG9ic2VydmFibGUsIG5leHQ6IG5leHQhIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUlPLE1BQU0sTUFBYyxPQUFPO0FBVzNCLFNBQVMsV0FHZDtBQUNBLE1BQUk7QUFDSixRQUFNLGFBQWEsSUFBSTtBQUFBLElBQ3JCO0FBQUEsTUFDRSxNQUFNLFlBQVk7QUFDaEIsZUFBTyx3QkFBQyxNQUFzQjtBQUM1QixjQUFJLE1BQU0sS0FBSztBQUNiLG1CQUFPLFdBQVcsTUFBTTtBQUFBLFVBQzFCO0FBQ0EscUJBQVcsUUFBUSxDQUFNO0FBQUEsUUFDM0IsR0FMTztBQUFBLE1BTVQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxFQUFFLGVBQWUsRUFBRTtBQUFBLEVBQ3JCO0FBQ0EsU0FBTyxFQUFFLFlBQVksS0FBWTtBQUNuQztBQW5CZ0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
