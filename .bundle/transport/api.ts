var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { XRequest } from "./XRequest.ts";
function createRequest(method, input, init) {
  return new XRequest(method, input, init);
}
__name(createRequest, "createRequest");
function create(method, base2) {
  const fn = /* @__PURE__ */ __name((input, init) => {
    const url = base2 && typeof input === "string" ? new URL(input, base2).href : String(input || "/");
    return createRequest(
      method,
      url,
      init
    );
  }, "fn");
  Object.defineProperty(fn, "name", {
    value: method.toLowerCase()
  });
  Object.defineProperty(fn, "toString", {
    value: () => `${method.toLowerCase()}(input: XRequestInput, init?: XRequestInit): Response`
  });
  return fn;
}
__name(create, "create");
function base(input) {
  return {
    get: create("GET", input),
    put: create("PUT", input),
    post: create("POST", input),
    head: create("HEAD", input),
    patch: create("PATCH", input),
    delete: create("DELETE", input),
    options: create("OPTIONS", input)
  };
}
__name(base, "base");
const baseURL = typeof location === "undefined" ? "https://localhost:5050" : location.href;
export {
  base,
  baseURL,
  create,
  createRequest
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdHJhbnNwb3J0L2FwaS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gaW1wb3J0IHsgcmVhZGFibGUsIHRyYW5zZm9ybSB9IGZyb20gXCIuLi9tb2QudHNcIjtcbmltcG9ydCB7IFhSZXF1ZXN0IH0gZnJvbSBcIi4vWFJlcXVlc3QudHNcIjtcblxuLy8gaW1wb3J0IFwiLi4vYXBwL2FwaS51dGlsLnRzXCI7XG5cbmV4cG9ydCB0eXBlIFVSTFN0cmluZzxVPiA9IFUgZXh0ZW5kcyBSZXF1ZXN0ID8gVVtcInVybFwiXVxuICA6IFUgZXh0ZW5kcyBVUkwgPyBVW1wiaHJlZlwiXVxuICA6IFU7XG5cbmV4cG9ydCB0eXBlIEFic29sdXRlVVJMPFUgZXh0ZW5kcyBzdHJpbmcsIEIgZXh0ZW5kcyBzdHJpbmc+ID0gQiBleHRlbmRzXG4gIHVuZGVmaW5lZCA/IFVcbiAgOiBgJHtCfSR7VX1gO1xuXG5leHBvcnQgdHlwZSBYUmVxdWVzdE1ldGhvZCA9XG4gIHwgXCIqXCJcbiAgfCBcIk9QVElPTlNcIlxuICB8IFwiSEVBRFwiXG4gIHwgXCJQT1NUXCJcbiAgfCBcIkdFVFwiXG4gIHwgXCJQVVRcIlxuICB8IFwiUEFUQ0hcIlxuICB8IFwiREVMRVRFXCI7XG5cbmV4cG9ydCB0eXBlIFhSZXF1ZXN0VVJMPFUgZXh0ZW5kcyBYUmVxdWVzdElucHV0LCBCIGV4dGVuZHMgc3RyaW5nPiA9XG4gIEFic29sdXRlVVJMPFxuICAgIFVSTFN0cmluZzxVPixcbiAgICBCXG4gID47XG5cbmV4cG9ydCB0eXBlIFhSZXF1ZXN0SW5pdCA9IE9taXQ8UmVxdWVzdEluaXQsIFwibWV0aG9kXCI+O1xuZXhwb3J0IHR5cGUgWFJlcXVlc3RJbnB1dCA9IFJlcXVlc3RJbmZvIHwgVVJMO1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVxdWVzdDxcbiAgTSBleHRlbmRzIFhSZXF1ZXN0TWV0aG9kLFxuICBVIGV4dGVuZHMgWFJlcXVlc3RJbnB1dCxcbiAgSSBleHRlbmRzIFhSZXF1ZXN0SW5pdCxcbj4oXG4gIG1ldGhvZDogTSxcbiAgaW5wdXQ6IFUsXG4gIGluaXQ/OiBJLFxuKSB7XG4gIHJldHVybiBuZXcgWFJlcXVlc3QobWV0aG9kLCBpbnB1dCwgaW5pdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGU8TSBleHRlbmRzIFhSZXF1ZXN0TWV0aG9kLCBCIGV4dGVuZHMgc3RyaW5nPihcbiAgbWV0aG9kOiBNLFxuICBiYXNlPzogQixcbikge1xuICBjb25zdCBmbiA9IDxcbiAgICBVIGV4dGVuZHMgWFJlcXVlc3RJbnB1dCxcbiAgICBJIGV4dGVuZHMgWFJlcXVlc3RJbml0LFxuICAgIFMgZXh0ZW5kcyBYUmVxdWVzdFVSTDxVLCBCPixcbiAgPihcbiAgICBpbnB1dDogVSxcbiAgICBpbml0PzogSSxcbiAgKSA9PiB7XG4gICAgY29uc3QgdXJsID1cbiAgICAgIChiYXNlICYmIHR5cGVvZiBpbnB1dCA9PT0gXCJzdHJpbmdcIlxuICAgICAgICA/IG5ldyBVUkwoaW5wdXQsIGJhc2UpLmhyZWZcbiAgICAgICAgOiBTdHJpbmcoaW5wdXQgfHwgXCIvXCIpKSBhcyBTO1xuXG4gICAgcmV0dXJuIGNyZWF0ZVJlcXVlc3QoXG4gICAgICBtZXRob2QsXG4gICAgICB1cmwsXG4gICAgICBpbml0LFxuICAgICk7XG4gIH07XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBcIm5hbWVcIiwge1xuICAgIHZhbHVlOiBtZXRob2QudG9Mb3dlckNhc2UoKSxcbiAgfSk7XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBcInRvU3RyaW5nXCIsIHtcbiAgICB2YWx1ZTogKCkgPT5cbiAgICAgIGAke21ldGhvZC50b0xvd2VyQ2FzZSgpfShpbnB1dDogWFJlcXVlc3RJbnB1dCwgaW5pdD86IFhSZXF1ZXN0SW5pdCk6IFJlc3BvbnNlYCxcbiAgfSk7XG5cbiAgcmV0dXJuIGZuO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYmFzZTxVIGV4dGVuZHMgc3RyaW5nPihpbnB1dD86IFUpIHtcbiAgcmV0dXJuIHtcbiAgICBnZXQ6IGNyZWF0ZShcIkdFVFwiLCBpbnB1dCksXG4gICAgcHV0OiBjcmVhdGUoXCJQVVRcIiwgaW5wdXQpLFxuICAgIHBvc3Q6IGNyZWF0ZShcIlBPU1RcIiwgaW5wdXQpLFxuICAgIGhlYWQ6IGNyZWF0ZShcIkhFQURcIiwgaW5wdXQpLFxuICAgIHBhdGNoOiBjcmVhdGUoXCJQQVRDSFwiLCBpbnB1dCksXG4gICAgZGVsZXRlOiBjcmVhdGUoXCJERUxFVEVcIiwgaW5wdXQpLFxuICAgIG9wdGlvbnM6IGNyZWF0ZShcIk9QVElPTlNcIiwgaW5wdXQpLFxuICB9O1xufVxuXG5leHBvcnQgY29uc3QgYmFzZVVSTCA9IHR5cGVvZiBsb2NhdGlvbiA9PT0gXCJ1bmRlZmluZWRcIlxuICA/IFwiaHR0cHM6Ly9sb2NhbGhvc3Q6NTA1MFwiXG4gIDogbG9jYXRpb24uaHJlZiBhcyB1bmtub3duIGFzIHVuZGVmaW5lZDtcblxuLy8gZXhwb3J0IGNvbnN0IGFwaSA9IGJhc2UoYmFzZVVSTCk7XG5cbi8vIGV4cG9ydCBkZWZhdWx0IGFwaTtcbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBQ0EsU0FBUyxnQkFBZ0I7QUErQmxCLFNBQVMsY0FLZCxRQUNBLE9BQ0EsTUFDQTtBQUNBLFNBQU8sSUFBSSxTQUFTLFFBQVEsT0FBTyxJQUFJO0FBQ3pDO0FBVmdCO0FBWVQsU0FBUyxPQUNkLFFBQ0FBLE9BQ0E7QUFDQSxRQUFNLEtBQUssd0JBS1QsT0FDQSxTQUNHO0FBQ0gsVUFBTSxNQUNIQSxTQUFRLE9BQU8sVUFBVSxXQUN0QixJQUFJLElBQUksT0FBT0EsS0FBSSxFQUFFLE9BQ3JCLE9BQU8sU0FBUyxHQUFHO0FBRXpCLFdBQU87QUFBQSxNQUNMO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsRUFDRixHQWxCVztBQW9CWCxTQUFPLGVBQWUsSUFBSSxRQUFRO0FBQUEsSUFDaEMsT0FBTyxPQUFPLFlBQVk7QUFBQSxFQUM1QixDQUFDO0FBRUQsU0FBTyxlQUFlLElBQUksWUFBWTtBQUFBLElBQ3BDLE9BQU8sTUFDTCxHQUFHLE9BQU8sWUFBWSxDQUFDO0FBQUEsRUFDM0IsQ0FBQztBQUVELFNBQU87QUFDVDtBQWxDZ0I7QUFvQ1QsU0FBUyxLQUF1QixPQUFXO0FBQ2hELFNBQU87QUFBQSxJQUNMLEtBQUssT0FBTyxPQUFPLEtBQUs7QUFBQSxJQUN4QixLQUFLLE9BQU8sT0FBTyxLQUFLO0FBQUEsSUFDeEIsTUFBTSxPQUFPLFFBQVEsS0FBSztBQUFBLElBQzFCLE1BQU0sT0FBTyxRQUFRLEtBQUs7QUFBQSxJQUMxQixPQUFPLE9BQU8sU0FBUyxLQUFLO0FBQUEsSUFDNUIsUUFBUSxPQUFPLFVBQVUsS0FBSztBQUFBLElBQzlCLFNBQVMsT0FBTyxXQUFXLEtBQUs7QUFBQSxFQUNsQztBQUNGO0FBVmdCO0FBWVQsTUFBTSxVQUFVLE9BQU8sYUFBYSxjQUN2QywyQkFDQSxTQUFTOyIsCiAgIm5hbWVzIjogWyJiYXNlIl0KfQo=
