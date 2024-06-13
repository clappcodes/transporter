var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { idKey } from "../utils.ts";
import { Promised } from "../utils/Promised.ts";
import { headers, Instance, instances } from "./echo1.ts";
function defineStreamHandler(handler) {
  return /* @__PURE__ */ __name(async function handle(request, info) {
    const url = new URL(request.url);
    const id = request.headers.get(idKey) || url.searchParams.get(idKey);
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: { ...headers, [idKey]: id || "" } });
    }
    if (!id) {
      throw new TypeError(`Missing "${idKey}"`);
    }
    if (!instances.has(id)) {
      instances.set(id, new Instance());
    }
    const instance = instances.get(id);
    console.log(
      "[" + request.method + "] " + request.url + " id=" + id,
      instances.size
    );
    request.signal.addEventListener("abort", () => {
      if (request.method === "POST") {
        instance.postRequest = void 0;
      }
      if (request.method === "GET") {
        instances.delete(id);
        console.log(
          request.method + " " + request.url,
          String(request.signal.reason)
        );
        instance.postResponse?.resolve(new Response("Wazzup", { headers }));
      }
    });
    if (request.headers.has("transport-status")) {
      instance.headStream.write(request.headers.get("transport-status"));
    }
    if (request.method === "HEAD") {
      return new Response(instance.headStream.body, {
        status: 200,
        headers: {
          ...headers,
          [idKey]: id
        }
      });
    }
    if (request.method === "POST") {
      instance.postRequest = request;
      instance.postResponse = new Promised();
      return instance.postResponse;
    }
    if (request.method === "GET") {
      const response = await handler(instance.postRequest || request, info);
      for (const [key, value] of new Headers(headers)) {
        response.headers.set(key, value);
      }
      response.headers.set(idKey, id);
      return response;
    }
    return new Response("Bad request!!!", { status: 400 });
  }, "handle");
}
__name(defineStreamHandler, "defineStreamHandler");
export {
  defineStreamHandler
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vYXBwL2RlZmluZVN0cmVhbUhhbmRsZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGlkS2V5IH0gZnJvbSBcIi4uL3V0aWxzLnRzXCI7XG5pbXBvcnQgeyBQcm9taXNlZCB9IGZyb20gXCIuLi91dGlscy9Qcm9taXNlZC50c1wiO1xuaW1wb3J0IHsgaGVhZGVycywgSW5zdGFuY2UsIGluc3RhbmNlcyB9IGZyb20gXCIuL2VjaG8xLnRzXCI7XG5cbnR5cGUgU2VydmVIYW5kbGVyID0gKFxuICByZXF1ZXN0OiBSZXF1ZXN0LFxuICBpbmZvPzogRGVuby5TZXJ2ZUhhbmRsZXJJbmZvLFxuKSA9PiBSZXNwb25zZSB8IFByb21pc2U8UmVzcG9uc2U+O1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lU3RyZWFtSGFuZGxlcihoYW5kbGVyOiBTZXJ2ZUhhbmRsZXIpIHtcbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIGhhbmRsZShcbiAgICByZXF1ZXN0OiBSZXF1ZXN0LFxuICAgIGluZm8/OiBEZW5vLlNlcnZlSGFuZGxlckluZm8sXG4gICk6IFByb21pc2U8UmVzcG9uc2U+IHtcbiAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHJlcXVlc3QudXJsKTtcbiAgICBjb25zdCBpZCA9IHJlcXVlc3QuaGVhZGVycy5nZXQoaWRLZXkpIHx8IHVybC5zZWFyY2hQYXJhbXMuZ2V0KGlkS2V5KTtcblxuICAgIGlmIChyZXF1ZXN0Lm1ldGhvZCA9PT0gXCJPUFRJT05TXCIpIHtcbiAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwgeyBoZWFkZXJzOiB7IC4uLmhlYWRlcnMsIFtpZEtleV06IGlkIHx8IFwiXCIgfSB9KTtcbiAgICB9XG5cbiAgICBpZiAoIWlkKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBNaXNzaW5nIFwiJHtpZEtleX1cImApO1xuICAgIH1cblxuICAgIGlmICghaW5zdGFuY2VzLmhhcyhpZCkpIHtcbiAgICAgIGluc3RhbmNlcy5zZXQoaWQsIG5ldyBJbnN0YW5jZSgpKTtcbiAgICB9XG5cbiAgICBjb25zdCBpbnN0YW5jZSA9IGluc3RhbmNlcy5nZXQoaWQpITtcblxuICAgIGNvbnNvbGUubG9nKFxuICAgICAgXCJbXCIgKyByZXF1ZXN0Lm1ldGhvZCArIFwiXSBcIiArIHJlcXVlc3QudXJsICsgXCIgaWQ9XCIgKyBpZCxcbiAgICAgIGluc3RhbmNlcy5zaXplLFxuICAgICk7XG5cbiAgICByZXF1ZXN0LnNpZ25hbC5hZGRFdmVudExpc3RlbmVyKFwiYWJvcnRcIiwgKCkgPT4ge1xuICAgICAgaWYgKHJlcXVlc3QubWV0aG9kID09PSBcIlBPU1RcIikge1xuICAgICAgICBpbnN0YW5jZS5wb3N0UmVxdWVzdCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlcXVlc3QubWV0aG9kID09PSBcIkdFVFwiKSB7XG4gICAgICAgIGluc3RhbmNlcy5kZWxldGUoaWQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgICByZXF1ZXN0Lm1ldGhvZCArIFwiIFwiICsgcmVxdWVzdC51cmwsXG4gICAgICAgICAgU3RyaW5nKHJlcXVlc3Quc2lnbmFsLnJlYXNvbiksXG4gICAgICAgICk7XG4gICAgICAgIGluc3RhbmNlLnBvc3RSZXNwb25zZT8ucmVzb2x2ZShuZXcgUmVzcG9uc2UoXCJXYXp6dXBcIiwgeyBoZWFkZXJzIH0pKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChyZXF1ZXN0LmhlYWRlcnMuaGFzKFwidHJhbnNwb3J0LXN0YXR1c1wiKSkge1xuICAgICAgaW5zdGFuY2UuaGVhZFN0cmVhbS53cml0ZShyZXF1ZXN0LmhlYWRlcnMuZ2V0KFwidHJhbnNwb3J0LXN0YXR1c1wiKSEpO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0Lm1ldGhvZCA9PT0gXCJIRUFEXCIpIHtcbiAgICAgIC8vIDIwMCBPS1xuICAgICAgLy8gMjAxIENyZWF0ZWRcbiAgICAgIC8vIDIwMiBBY2NlcHRlZFxuICAgICAgcmV0dXJuIG5ldyBSZXNwb25zZShpbnN0YW5jZS5oZWFkU3RyZWFtLmJvZHksIHtcbiAgICAgICAgc3RhdHVzOiAyMDAsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAuLi5oZWFkZXJzLFxuICAgICAgICAgIFtpZEtleV06IGlkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3QubWV0aG9kID09PSBcIlBPU1RcIikge1xuICAgICAgaW5zdGFuY2UucG9zdFJlcXVlc3QgPSByZXF1ZXN0O1xuICAgICAgaW5zdGFuY2UucG9zdFJlc3BvbnNlID0gbmV3IFByb21pc2VkPFJlc3BvbnNlPigpO1xuICAgICAgLy8gaW5zdGFuY2UuaGVhZFN0cmVhbS53cml0ZShTdHJpbmcoMjAxKSk7XG5cbiAgICAgIHJldHVybiBpbnN0YW5jZS5wb3N0UmVzcG9uc2U7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3QubWV0aG9kID09PSBcIkdFVFwiKSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGhhbmRsZXIoaW5zdGFuY2UucG9zdFJlcXVlc3QgfHwgcmVxdWVzdCwgaW5mbyk7XG4gICAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBuZXcgSGVhZGVycyhoZWFkZXJzKSkge1xuICAgICAgICByZXNwb25zZS5oZWFkZXJzLnNldChrZXksIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgcmVzcG9uc2UuaGVhZGVycy5zZXQoaWRLZXksIGlkKTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoXCJCYWQgcmVxdWVzdCEhIVwiLCB7IHN0YXR1czogNDAwIH0pO1xuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFBQSxTQUFTLGFBQWE7QUFDdEIsU0FBUyxnQkFBZ0I7QUFDekIsU0FBUyxTQUFTLFVBQVUsaUJBQWlCO0FBT3RDLFNBQVMsb0JBQW9CLFNBQXVCO0FBQ3pELFNBQU8sc0NBQWUsT0FDcEIsU0FDQSxNQUNtQjtBQUNuQixVQUFNLE1BQU0sSUFBSSxJQUFJLFFBQVEsR0FBRztBQUMvQixVQUFNLEtBQUssUUFBUSxRQUFRLElBQUksS0FBSyxLQUFLLElBQUksYUFBYSxJQUFJLEtBQUs7QUFFbkUsUUFBSSxRQUFRLFdBQVcsV0FBVztBQUNoQyxhQUFPLElBQUksU0FBUyxNQUFNLEVBQUUsU0FBUyxFQUFFLEdBQUcsU0FBUyxDQUFDLEtBQUssR0FBRyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQUEsSUFDMUU7QUFFQSxRQUFJLENBQUMsSUFBSTtBQUNQLFlBQU0sSUFBSSxVQUFVLFlBQVksS0FBSyxHQUFHO0FBQUEsSUFDMUM7QUFFQSxRQUFJLENBQUMsVUFBVSxJQUFJLEVBQUUsR0FBRztBQUN0QixnQkFBVSxJQUFJLElBQUksSUFBSSxTQUFTLENBQUM7QUFBQSxJQUNsQztBQUVBLFVBQU0sV0FBVyxVQUFVLElBQUksRUFBRTtBQUVqQyxZQUFRO0FBQUEsTUFDTixNQUFNLFFBQVEsU0FBUyxPQUFPLFFBQVEsTUFBTSxTQUFTO0FBQUEsTUFDckQsVUFBVTtBQUFBLElBQ1o7QUFFQSxZQUFRLE9BQU8saUJBQWlCLFNBQVMsTUFBTTtBQUM3QyxVQUFJLFFBQVEsV0FBVyxRQUFRO0FBQzdCLGlCQUFTLGNBQWM7QUFBQSxNQUN6QjtBQUVBLFVBQUksUUFBUSxXQUFXLE9BQU87QUFDNUIsa0JBQVUsT0FBTyxFQUFFO0FBQ25CLGdCQUFRO0FBQUEsVUFDTixRQUFRLFNBQVMsTUFBTSxRQUFRO0FBQUEsVUFDL0IsT0FBTyxRQUFRLE9BQU8sTUFBTTtBQUFBLFFBQzlCO0FBQ0EsaUJBQVMsY0FBYyxRQUFRLElBQUksU0FBUyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFBQSxNQUNwRTtBQUFBLElBQ0YsQ0FBQztBQUVELFFBQUksUUFBUSxRQUFRLElBQUksa0JBQWtCLEdBQUc7QUFDM0MsZUFBUyxXQUFXLE1BQU0sUUFBUSxRQUFRLElBQUksa0JBQWtCLENBQUU7QUFBQSxJQUNwRTtBQUVBLFFBQUksUUFBUSxXQUFXLFFBQVE7QUFJN0IsYUFBTyxJQUFJLFNBQVMsU0FBUyxXQUFXLE1BQU07QUFBQSxRQUM1QyxRQUFRO0FBQUEsUUFDUixTQUFTO0FBQUEsVUFDUCxHQUFHO0FBQUEsVUFDSCxDQUFDLEtBQUssR0FBRztBQUFBLFFBQ1g7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBRUEsUUFBSSxRQUFRLFdBQVcsUUFBUTtBQUM3QixlQUFTLGNBQWM7QUFDdkIsZUFBUyxlQUFlLElBQUksU0FBbUI7QUFHL0MsYUFBTyxTQUFTO0FBQUEsSUFDbEI7QUFFQSxRQUFJLFFBQVEsV0FBVyxPQUFPO0FBQzVCLFlBQU0sV0FBVyxNQUFNLFFBQVEsU0FBUyxlQUFlLFNBQVMsSUFBSTtBQUNwRSxpQkFBVyxDQUFDLEtBQUssS0FBSyxLQUFLLElBQUksUUFBUSxPQUFPLEdBQUc7QUFDL0MsaUJBQVMsUUFBUSxJQUFJLEtBQUssS0FBSztBQUFBLE1BQ2pDO0FBRUEsZUFBUyxRQUFRLElBQUksT0FBTyxFQUFFO0FBRTlCLGFBQU87QUFBQSxJQUNUO0FBRUEsV0FBTyxJQUFJLFNBQVMsa0JBQWtCLEVBQUUsUUFBUSxJQUFJLENBQUM7QUFBQSxFQUN2RCxHQTlFTztBQStFVDtBQWhGZ0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
