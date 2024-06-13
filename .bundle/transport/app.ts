var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { $fetch } from "./fetch.ts";
class TransportApp {
  static {
    __name(this, "TransportApp");
  }
  static fetch = $fetch;
  constructor(app) {
    return Object.assign(this, app);
  }
  /**
   * Serve fetch handler
   * @param request
   */
  fetch(request) {
    return new Response(request.url);
  }
  /**
   * Start client app
   * @param options
   */
  start(_options) {
    throw new TypeError("Not Implemented");
  }
}
function defineApp(app) {
  return new TransportApp(app);
}
__name(defineApp, "defineApp");
async function serveApp(path) {
  const resolved = import.meta.resolve("../" + path + ".ts");
  const mod = (await import(resolved)).default;
  mod.path = path;
  mod.host = path.split("/").reverse().join(".");
  return mod;
}
__name(serveApp, "serveApp");
export {
  TransportApp,
  defineApp,
  serveApp
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdHJhbnNwb3J0L2FwcC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgJGZldGNoIH0gZnJvbSBcIi4vZmV0Y2gudHNcIjtcblxuZXhwb3J0IGNsYXNzIFRyYW5zcG9ydEFwcCB7XG4gIHN0YXRpYyBmZXRjaCA9ICRmZXRjaDtcblxuICBjb25zdHJ1Y3RvcihhcHA6IFBhcnRpYWw8VHJhbnNwb3J0QXBwPikge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMsIGFwcCk7XG4gIH1cbiAgZGVjbGFyZSBwYXRoOiBzdHJpbmc7XG4gIGRlY2xhcmUgaG9zdDogc3RyaW5nO1xuICAvKipcbiAgICogU2VydmUgZmV0Y2ggaGFuZGxlclxuICAgKiBAcGFyYW0gcmVxdWVzdFxuICAgKi9cbiAgZmV0Y2gocmVxdWVzdDogUmVxdWVzdCk6IFJlc3BvbnNlIHwgUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UocmVxdWVzdC51cmwpO1xuICB9XG4gIC8qKlxuICAgKiBTdGFydCBjbGllbnQgYXBwXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqL1xuICBzdGFydChfb3B0aW9uczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4pOiB1bmtub3duIHwgUHJvbWlzZTx1bmtub3duPiB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIk5vdCBJbXBsZW1lbnRlZFwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVmaW5lQXBwKGFwcDogUGFydGlhbDxUcmFuc3BvcnRBcHA+KSB7XG4gIHJldHVybiBuZXcgVHJhbnNwb3J0QXBwKGFwcCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXJ2ZUFwcChwYXRoOiBzdHJpbmcpIHtcbiAgY29uc3QgcmVzb2x2ZWQgPSBpbXBvcnQubWV0YS5yZXNvbHZlKFwiLi4vXCIgKyBwYXRoICsgXCIudHNcIik7XG5cbiAgY29uc3QgbW9kID0gKGF3YWl0IGltcG9ydChyZXNvbHZlZCkpLmRlZmF1bHQgYXMgVHJhbnNwb3J0QXBwO1xuICBtb2QucGF0aCA9IHBhdGg7XG4gIG1vZC5ob3N0ID0gcGF0aC5zcGxpdChcIi9cIikucmV2ZXJzZSgpLmpvaW4oXCIuXCIpO1xuXG4gIHJldHVybiBtb2Q7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUFBLFNBQVMsY0FBYztBQUVoQixNQUFNLGFBQWE7QUFBQSxFQUYxQixPQUUwQjtBQUFBO0FBQUE7QUFBQSxFQUN4QixPQUFPLFFBQVE7QUFBQSxFQUVmLFlBQVksS0FBNEI7QUFDdEMsV0FBTyxPQUFPLE9BQU8sTUFBTSxHQUFHO0FBQUEsRUFDaEM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBT0EsTUFBTSxTQUFnRDtBQUNwRCxXQUFPLElBQUksU0FBUyxRQUFRLEdBQUc7QUFBQSxFQUNqQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFLQSxNQUFNLFVBQStEO0FBQ25FLFVBQU0sSUFBSSxVQUFVLGlCQUFpQjtBQUFBLEVBQ3ZDO0FBQ0Y7QUFFTyxTQUFTLFVBQVUsS0FBNEI7QUFDcEQsU0FBTyxJQUFJLGFBQWEsR0FBRztBQUM3QjtBQUZnQjtBQUloQixlQUFzQixTQUFTLE1BQWM7QUFDM0MsUUFBTSxXQUFXLFlBQVksUUFBUSxRQUFRLE9BQU8sS0FBSztBQUV6RCxRQUFNLE9BQU8sTUFBTSxPQUFPLFdBQVc7QUFDckMsTUFBSSxPQUFPO0FBQ1gsTUFBSSxPQUFPLEtBQUssTUFBTSxHQUFHLEVBQUUsUUFBUSxFQUFFLEtBQUssR0FBRztBQUU3QyxTQUFPO0FBQ1Q7QUFSc0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
