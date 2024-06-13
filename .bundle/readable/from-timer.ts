var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function fromTimer(ms, chunk = () => null) {
  let id;
  return new ReadableStream({
    start(controller) {
      id = setInterval(() => controller.enqueue(chunk()), ms);
    },
    cancel() {
      clearInterval(id);
    }
  });
}
__name(fromTimer, "fromTimer");
export {
  fromTimer
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhZGFibGUvZnJvbS10aW1lci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHR5cGUgeyBSZWFkYWJsZSB9IGZyb20gXCIuLi90eXBlcy50c1wiO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gb2JzZXJ2YWJsZSB0aGF0IHdpbGwgZm9yZXZlciBlbWl0IGBjaHVuaygpYCBldmVyeSBgbXNgIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcGFyYW0gbXMgTWlsbGlzZWNvbmRzIGJldHdlZW4gZWFjaCBlbWl0LlxuICogQHJldHVybnMgTmV3IG9ic2VydmFibGUgdGhhdCBlbWl0cyBudWxsIHZhbHVlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21UaW1lcjxUPihcbiAgbXM6IG51bWJlcixcbiAgY2h1bms6ICgpID0+IFQgPSAoKSA9PiBudWxsIGFzIFQsXG4pOiBSZWFkYWJsZTxUPiB7XG4gIGxldCBpZDogbnVtYmVyO1xuICByZXR1cm4gbmV3IFJlYWRhYmxlU3RyZWFtPFQ+KHtcbiAgICBzdGFydChjb250cm9sbGVyKSB7XG4gICAgICBpZCA9IHNldEludGVydmFsKCgpID0+IGNvbnRyb2xsZXIuZW5xdWV1ZShjaHVuaygpKSwgbXMpO1xuICAgIH0sXG4gICAgY2FuY2VsKCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChpZCk7XG4gICAgfSxcbiAgfSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQVFPLFNBQVMsVUFDZCxJQUNBLFFBQWlCLE1BQU0sTUFDVjtBQUNiLE1BQUk7QUFDSixTQUFPLElBQUksZUFBa0I7QUFBQSxJQUMzQixNQUFNLFlBQVk7QUFDaEIsV0FBSyxZQUFZLE1BQU0sV0FBVyxRQUFRLE1BQU0sQ0FBQyxHQUFHLEVBQUU7QUFBQSxJQUN4RDtBQUFBLElBQ0EsU0FBUztBQUNQLG9CQUFjLEVBQUU7QUFBQSxJQUNsQjtBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBYmdCOyIsCiAgIm5hbWVzIjogW10KfQo=
