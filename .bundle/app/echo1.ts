var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { transform, writable } from "../mod.ts";
class Instance {
  static {
    __name(this, "Instance");
  }
  postRequest;
  postResponse;
  headStream = createHeadStream();
}
const headers = {
  "cache-control": "no-cache",
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "*",
  "access-control-allow-headers": "*",
  "access-control-max-age": "100",
  // sse
  "content-type": "text/event-stream"
};
function createHeadStream() {
  const t = new TransformStream();
  const body = transform.encode(t.readable);
  const write = writable.write(t.writable);
  return { body, write: (chunk) => write(chunk + "\n") };
}
__name(createHeadStream, "createHeadStream");
const instances = /* @__PURE__ */ new Map();
var echo1_default = {
  fetch: async (request) => {
    console.log("handler", request.method, request.url);
    return new Response(
      request.body?.pipeThrough(transform.decode()).pipeThrough(transform.map((val) => `data: ${val}

`)).pipeThrough(transform.encode())
    );
  }
};
export {
  Instance,
  echo1_default as default,
  headers,
  instances
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vYXBwL2VjaG8xLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyB0cmFuc2Zvcm0sIHdyaXRhYmxlIH0gZnJvbSBcIi4uL21vZC50c1wiO1xuaW1wb3J0IHR5cGUgeyBQcm9taXNlZCB9IGZyb20gXCIuLi91dGlscy9Qcm9taXNlZC50c1wiO1xuXG5leHBvcnQgY2xhc3MgSW5zdGFuY2Uge1xuICBwb3N0UmVxdWVzdD86IFJlcXVlc3Q7XG4gIHBvc3RSZXNwb25zZT86IFByb21pc2VkPFJlc3BvbnNlPjtcbiAgaGVhZFN0cmVhbToge1xuICAgIGJvZHk6IFJlYWRhYmxlU3RyZWFtPFVpbnQ4QXJyYXk+O1xuICAgIHdyaXRlOiAoY2h1bms6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPjtcbiAgfSA9IGNyZWF0ZUhlYWRTdHJlYW0oKTtcbn1cblxuZXhwb3J0IGNvbnN0IGhlYWRlcnMgPSB7XG4gIFwiY2FjaGUtY29udHJvbFwiOiBcIm5vLWNhY2hlXCIsXG4gIFwiYWNjZXNzLWNvbnRyb2wtYWxsb3ctb3JpZ2luXCI6IFwiKlwiLFxuICBcImFjY2Vzcy1jb250cm9sLWFsbG93LW1ldGhvZHNcIjogXCIqXCIsXG4gIFwiYWNjZXNzLWNvbnRyb2wtYWxsb3ctaGVhZGVyc1wiOiBcIipcIixcbiAgXCJhY2Nlc3MtY29udHJvbC1tYXgtYWdlXCI6IFwiMTAwXCIsXG4gIC8vIHNzZVxuICBcImNvbnRlbnQtdHlwZVwiOiBcInRleHQvZXZlbnQtc3RyZWFtXCIsXG59O1xuXG5mdW5jdGlvbiBjcmVhdGVIZWFkU3RyZWFtKCkge1xuICBjb25zdCB0ID0gbmV3IFRyYW5zZm9ybVN0cmVhbTxzdHJpbmcsIHN0cmluZz4oKTtcbiAgY29uc3QgYm9keSA9IHRyYW5zZm9ybS5lbmNvZGUodC5yZWFkYWJsZSk7XG4gIGNvbnN0IHdyaXRlID0gd3JpdGFibGUud3JpdGUodC53cml0YWJsZSk7XG4gIHJldHVybiB7IGJvZHksIHdyaXRlOiAoY2h1bms6IHN0cmluZykgPT4gd3JpdGUoY2h1bmsgKyBcIlxcblwiKSB9O1xufVxuXG5leHBvcnQgY29uc3QgaW5zdGFuY2VzID0gbmV3IE1hcDxzdHJpbmcsIEluc3RhbmNlPigpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGZldGNoOiAoYXN5bmMgKHJlcXVlc3QpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcImhhbmRsZXJcIiwgcmVxdWVzdC5tZXRob2QsIHJlcXVlc3QudXJsKTtcblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoXG4gICAgICByZXF1ZXN0LmJvZHlcbiAgICAgICAgPy5waXBlVGhyb3VnaCh0cmFuc2Zvcm0uZGVjb2RlKCkpXG4gICAgICAgIC5waXBlVGhyb3VnaCh0cmFuc2Zvcm0ubWFwKCh2YWwpID0+IGBkYXRhOiAke3ZhbH1cXG5cXG5gKSlcbiAgICAgICAgLnBpcGVUaHJvdWdoKHRyYW5zZm9ybS5lbmNvZGUoKSksXG4gICAgKTtcbiAgfSksXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFBQSxTQUFTLFdBQVcsZ0JBQWdCO0FBRzdCLE1BQU0sU0FBUztBQUFBLEVBSHRCLE9BR3NCO0FBQUE7QUFBQTtBQUFBLEVBQ3BCO0FBQUEsRUFDQTtBQUFBLEVBQ0EsYUFHSSxpQkFBaUI7QUFDdkI7QUFFTyxNQUFNLFVBQVU7QUFBQSxFQUNyQixpQkFBaUI7QUFBQSxFQUNqQiwrQkFBK0I7QUFBQSxFQUMvQixnQ0FBZ0M7QUFBQSxFQUNoQyxnQ0FBZ0M7QUFBQSxFQUNoQywwQkFBMEI7QUFBQTtBQUFBLEVBRTFCLGdCQUFnQjtBQUNsQjtBQUVBLFNBQVMsbUJBQW1CO0FBQzFCLFFBQU0sSUFBSSxJQUFJLGdCQUFnQztBQUM5QyxRQUFNLE9BQU8sVUFBVSxPQUFPLEVBQUUsUUFBUTtBQUN4QyxRQUFNLFFBQVEsU0FBUyxNQUFNLEVBQUUsUUFBUTtBQUN2QyxTQUFPLEVBQUUsTUFBTSxPQUFPLENBQUMsVUFBa0IsTUFBTSxRQUFRLElBQUksRUFBRTtBQUMvRDtBQUxTO0FBT0YsTUFBTSxZQUFZLG9CQUFJLElBQXNCO0FBRW5ELElBQU8sZ0JBQVE7QUFBQSxFQUNiLE9BQVEsT0FBTyxZQUFZO0FBQ3pCLFlBQVEsSUFBSSxXQUFXLFFBQVEsUUFBUSxRQUFRLEdBQUc7QUFFbEQsV0FBTyxJQUFJO0FBQUEsTUFDVCxRQUFRLE1BQ0osWUFBWSxVQUFVLE9BQU8sQ0FBQyxFQUMvQixZQUFZLFVBQVUsSUFBSSxDQUFDLFFBQVEsU0FBUyxHQUFHO0FBQUE7QUFBQSxDQUFNLENBQUMsRUFDdEQsWUFBWSxVQUFVLE9BQU8sQ0FBQztBQUFBLElBQ25DO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
