var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function subscribe(f = () => {
}) {
  return new WritableStream(
    {
      write(chunk) {
        f(chunk);
      }
    },
    { highWaterMark: 1 }
  );
}
__name(subscribe, "subscribe");
export {
  subscribe
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vd3JpdGFibGUvc3Vic2NyaWJlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKipcbiAqIFNpbmsgZm9yIG9ic2VydmFibGVzIHRoYXQgZGlzY2FyZHMgYWxsIHZhbHVlcy5cbiAqIFVzZWZ1bCB0byBsZWF2ZSBhdCB0aGUgZW5kIG9mIGEgY2hhaW4uXG4gKlxuICogQHR5cGVwYXJhbSBUIFR5cGUgb2YgaXRlbXMgZW1pdHRlZCBieSB0aGUgb2JzZXJ2YWJsZS5cbiAqIEBwYXJhbSBmIEZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggdmFsdWUgYmVmb3JlIGl0XHUyMDE5cyBkaXNjYXJkZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdWJzY3JpYmU8VD4oZjogKHY6IFQpID0+IHZvaWQgPSAoKSA9PiB7fSk6IFdyaXRhYmxlU3RyZWFtPFQ+IHtcbiAgcmV0dXJuIG5ldyBXcml0YWJsZVN0cmVhbTxUPihcbiAgICB7XG4gICAgICB3cml0ZShjaHVuazogVCkge1xuICAgICAgICBmKGNodW5rKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7IGhpZ2hXYXRlck1hcms6IDEgfSxcbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBT08sU0FBUyxVQUFhLElBQW9CLE1BQU07QUFBQyxHQUFzQjtBQUM1RSxTQUFPLElBQUk7QUFBQSxJQUNUO0FBQUEsTUFDRSxNQUFNLE9BQVU7QUFDZCxVQUFFLEtBQUs7QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUFBLElBQ0EsRUFBRSxlQUFlLEVBQUU7QUFBQSxFQUNyQjtBQUNGO0FBVGdCOyIsCiAgIm5hbWVzIjogW10KfQo=
