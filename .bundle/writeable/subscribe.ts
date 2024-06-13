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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vd3JpdGVhYmxlL3N1YnNjcmliZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLyoqXG4gKiBTaW5rIGZvciBvYnNlcnZhYmxlcyB0aGF0IGRpc2NhcmRzIGFsbCB2YWx1ZXMuXG4gKiBVc2VmdWwgdG8gbGVhdmUgYXQgdGhlIGVuZCBvZiBhIGNoYWluLlxuICpcbiAqIEB0eXBlcGFyYW0gVCBUeXBlIG9mIGl0ZW1zIGVtaXR0ZWQgYnkgdGhlIG9ic2VydmFibGUuXG4gKiBAcGFyYW0gZiBGdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIHZhbHVlIGJlZm9yZSBpdFx1MjAxOXMgZGlzY2FyZGVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3Vic2NyaWJlPFQ+KGY6ICh2OiBUKSA9PiB2b2lkID0gKCkgPT4ge30pOiBXcml0YWJsZVN0cmVhbTxUPiB7XG4gIHJldHVybiBuZXcgV3JpdGFibGVTdHJlYW08VD4oXG4gICAge1xuICAgICAgd3JpdGUoY2h1bms6IFQpIHtcbiAgICAgICAgZihjaHVuayk7XG4gICAgICB9LFxuICAgIH0sXG4gICAgeyBoaWdoV2F0ZXJNYXJrOiAxIH0sXG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQU9PLFNBQVMsVUFBYSxJQUFvQixNQUFNO0FBQUMsR0FBc0I7QUFDNUUsU0FBTyxJQUFJO0FBQUEsSUFDVDtBQUFBLE1BQ0UsTUFBTSxPQUFVO0FBQ2QsVUFBRSxLQUFLO0FBQUEsTUFDVDtBQUFBLElBQ0Y7QUFBQSxJQUNBLEVBQUUsZUFBZSxFQUFFO0FBQUEsRUFDckI7QUFDRjtBQVRnQjsiLAogICJuYW1lcyI6IFtdCn0K
