var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
class RequestStream extends Request {
  static {
    __name(this, "RequestStream");
  }
  constructor(input, init) {
    const isReadableStream = init?.body instanceof ReadableStream;
    if (!isReadableStream) {
      throw new TypeError("Invalid body: " + typeof init?.body);
    }
    super(input, {
      method: "POST",
      // @ts-ignore .
      duplex: "half",
      ...init
    });
  }
}
function post(input, init) {
  const { readable, writable } = new TransformStream();
  const request = new RequestStream(input, {
    ...init,
    body: readable
  });
  fetch(request);
  return writable;
}
__name(post, "post");
function response(init) {
  const { readable, writable } = new TransformStream();
  const response2 = new Response(readable, init);
  return { writable, response: response2 };
}
__name(response, "response");
export {
  RequestStream,
  post,
  response
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vd3JpdGVhYmxlL3Bvc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdFN0cmVhbUluaXQgZXh0ZW5kcyBPbWl0PFJlcXVlc3RJbml0LCBcIm1ldGhvZFwiPiB7XG4gIGJvZHk6IFJlYWRhYmxlU3RyZWFtPFVpbnQ4QXJyYXk+O1xufVxuXG5leHBvcnQgY2xhc3MgUmVxdWVzdFN0cmVhbSBleHRlbmRzIFJlcXVlc3Qge1xuICBjb25zdHJ1Y3RvcihpbnB1dDogUmVxdWVzdEluZm8gfCBVUkwsIGluaXQ/OiBSZXF1ZXN0U3RyZWFtSW5pdCkge1xuICAgIGNvbnN0IGlzUmVhZGFibGVTdHJlYW0gPSBpbml0Py5ib2R5IGluc3RhbmNlb2YgUmVhZGFibGVTdHJlYW07XG5cbiAgICBpZiAoIWlzUmVhZGFibGVTdHJlYW0pIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGJvZHk6IFwiICsgdHlwZW9mIGluaXQ/LmJvZHkpO1xuICAgIH1cblxuICAgIHN1cGVyKGlucHV0LCB7XG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgLy8gQHRzLWlnbm9yZSAuXG4gICAgICBkdXBsZXg6IFwiaGFsZlwiLFxuICAgICAgLi4uaW5pdCxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9zdDxUIGV4dGVuZHMgVWludDhBcnJheT4oXG4gIGlucHV0OiBSZXF1ZXN0SW5mbyB8IFVSTCxcbiAgaW5pdD86IFJlcXVlc3RTdHJlYW1Jbml0LFxuKTogV3JpdGFibGVTdHJlYW08VD4ge1xuICBjb25zdCB7IHJlYWRhYmxlLCB3cml0YWJsZSB9ID0gbmV3IFRyYW5zZm9ybVN0cmVhbTxULCBUPigpO1xuXG4gIGNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdFN0cmVhbShpbnB1dCwge1xuICAgIC4uLmluaXQsXG4gICAgYm9keTogcmVhZGFibGUsXG4gIH0pO1xuXG4gIGZldGNoKHJlcXVlc3QpO1xuXG4gIHJldHVybiB3cml0YWJsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc3BvbnNlPFQgZXh0ZW5kcyBVaW50OEFycmF5PihcbiAgaW5pdD86IFJlc3BvbnNlSW5pdCxcbik6IHsgd3JpdGFibGU6IFdyaXRhYmxlU3RyZWFtPFQ+OyByZXNwb25zZTogUmVzcG9uc2UgfSB7XG4gIGNvbnN0IHsgcmVhZGFibGUsIHdyaXRhYmxlIH0gPSBuZXcgVHJhbnNmb3JtU3RyZWFtPFQsIFQ+KCk7XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UocmVhZGFibGUsIGluaXQpO1xuXG4gIHJldHVybiB7IHdyaXRhYmxlLCByZXNwb25zZSB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFJTyxNQUFNLHNCQUFzQixRQUFRO0FBQUEsRUFKM0MsT0FJMkM7QUFBQTtBQUFBO0FBQUEsRUFDekMsWUFBWSxPQUEwQixNQUEwQjtBQUM5RCxVQUFNLG1CQUFtQixNQUFNLGdCQUFnQjtBQUUvQyxRQUFJLENBQUMsa0JBQWtCO0FBQ3JCLFlBQU0sSUFBSSxVQUFVLG1CQUFtQixPQUFPLE1BQU0sSUFBSTtBQUFBLElBQzFEO0FBRUEsVUFBTSxPQUFPO0FBQUEsTUFDWCxRQUFRO0FBQUE7QUFBQSxNQUVSLFFBQVE7QUFBQSxNQUNSLEdBQUc7QUFBQSxJQUNMLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUFFTyxTQUFTLEtBQ2QsT0FDQSxNQUNtQjtBQUNuQixRQUFNLEVBQUUsVUFBVSxTQUFTLElBQUksSUFBSSxnQkFBc0I7QUFFekQsUUFBTSxVQUFVLElBQUksY0FBYyxPQUFPO0FBQUEsSUFDdkMsR0FBRztBQUFBLElBQ0gsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELFFBQU0sT0FBTztBQUViLFNBQU87QUFDVDtBQWRnQjtBQWdCVCxTQUFTLFNBQ2QsTUFDcUQ7QUFDckQsUUFBTSxFQUFFLFVBQVUsU0FBUyxJQUFJLElBQUksZ0JBQXNCO0FBRXpELFFBQU1BLFlBQVcsSUFBSSxTQUFTLFVBQVUsSUFBSTtBQUU1QyxTQUFPLEVBQUUsVUFBVSxVQUFBQSxVQUFTO0FBQzlCO0FBUmdCOyIsCiAgIm5hbWVzIjogWyJyZXNwb25zZSJdCn0K
