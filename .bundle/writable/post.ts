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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vd3JpdGFibGUvcG9zdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0U3RyZWFtSW5pdCBleHRlbmRzIE9taXQ8UmVxdWVzdEluaXQsIFwibWV0aG9kXCI+IHtcbiAgYm9keTogUmVhZGFibGVTdHJlYW08VWludDhBcnJheT47XG59XG5cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0U3RyZWFtIGV4dGVuZHMgUmVxdWVzdCB7XG4gIGNvbnN0cnVjdG9yKGlucHV0OiBSZXF1ZXN0SW5mbyB8IFVSTCwgaW5pdD86IFJlcXVlc3RTdHJlYW1Jbml0KSB7XG4gICAgY29uc3QgaXNSZWFkYWJsZVN0cmVhbSA9IGluaXQ/LmJvZHkgaW5zdGFuY2VvZiBSZWFkYWJsZVN0cmVhbTtcblxuICAgIGlmICghaXNSZWFkYWJsZVN0cmVhbSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYm9keTogXCIgKyB0eXBlb2YgaW5pdD8uYm9keSk7XG4gICAgfVxuXG4gICAgc3VwZXIoaW5wdXQsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAvLyBAdHMtaWdub3JlIC5cbiAgICAgIGR1cGxleDogXCJoYWxmXCIsXG4gICAgICAuLi5pbml0LFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3N0PFQgZXh0ZW5kcyBVaW50OEFycmF5PihcbiAgaW5wdXQ6IFJlcXVlc3RJbmZvIHwgVVJMLFxuICBpbml0PzogUmVxdWVzdFN0cmVhbUluaXQsXG4pOiBXcml0YWJsZVN0cmVhbTxUPiB7XG4gIGNvbnN0IHsgcmVhZGFibGUsIHdyaXRhYmxlIH0gPSBuZXcgVHJhbnNmb3JtU3RyZWFtPFQsIFQ+KCk7XG5cbiAgY29uc3QgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0U3RyZWFtKGlucHV0LCB7XG4gICAgLi4uaW5pdCxcbiAgICBib2R5OiByZWFkYWJsZSxcbiAgfSk7XG5cbiAgZmV0Y2gocmVxdWVzdCk7XG5cbiAgcmV0dXJuIHdyaXRhYmxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVzcG9uc2U8VCBleHRlbmRzIFVpbnQ4QXJyYXk+KFxuICBpbml0PzogUmVzcG9uc2VJbml0LFxuKTogeyB3cml0YWJsZTogV3JpdGFibGVTdHJlYW08VD47IHJlc3BvbnNlOiBSZXNwb25zZSB9IHtcbiAgY29uc3QgeyByZWFkYWJsZSwgd3JpdGFibGUgfSA9IG5ldyBUcmFuc2Zvcm1TdHJlYW08VCwgVD4oKTtcblxuICBjb25zdCByZXNwb25zZSA9IG5ldyBSZXNwb25zZShyZWFkYWJsZSwgaW5pdCk7XG5cbiAgcmV0dXJuIHsgd3JpdGFibGUsIHJlc3BvbnNlIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUlPLE1BQU0sc0JBQXNCLFFBQVE7QUFBQSxFQUozQyxPQUkyQztBQUFBO0FBQUE7QUFBQSxFQUN6QyxZQUFZLE9BQTBCLE1BQTBCO0FBQzlELFVBQU0sbUJBQW1CLE1BQU0sZ0JBQWdCO0FBRS9DLFFBQUksQ0FBQyxrQkFBa0I7QUFDckIsWUFBTSxJQUFJLFVBQVUsbUJBQW1CLE9BQU8sTUFBTSxJQUFJO0FBQUEsSUFDMUQ7QUFFQSxVQUFNLE9BQU87QUFBQSxNQUNYLFFBQVE7QUFBQTtBQUFBLE1BRVIsUUFBUTtBQUFBLE1BQ1IsR0FBRztBQUFBLElBQ0wsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQUVPLFNBQVMsS0FDZCxPQUNBLE1BQ21CO0FBQ25CLFFBQU0sRUFBRSxVQUFVLFNBQVMsSUFBSSxJQUFJLGdCQUFzQjtBQUV6RCxRQUFNLFVBQVUsSUFBSSxjQUFjLE9BQU87QUFBQSxJQUN2QyxHQUFHO0FBQUEsSUFDSCxNQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsUUFBTSxPQUFPO0FBRWIsU0FBTztBQUNUO0FBZGdCO0FBZ0JULFNBQVMsU0FDZCxNQUNxRDtBQUNyRCxRQUFNLEVBQUUsVUFBVSxTQUFTLElBQUksSUFBSSxnQkFBc0I7QUFFekQsUUFBTUEsWUFBVyxJQUFJLFNBQVMsVUFBVSxJQUFJO0FBRTVDLFNBQU8sRUFBRSxVQUFVLFVBQUFBLFVBQVM7QUFDOUI7QUFSZ0I7IiwKICAibmFtZXMiOiBbInJlc3BvbnNlIl0KfQo=
