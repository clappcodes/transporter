var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { readable, transform } from "../mod.ts";
import { duplex } from "./handle.ts";
import { RequestStream } from "./stream.ts";
$fetch.fetch = (input, init) => {
  console.log("fetch(", input, init, ")");
  return globalThis.fetch(input, init);
};
function $fetch(input, init) {
  const isBrowser = typeof document !== "undefined";
  const fetch = $fetch.fetch || globalThis.fetch;
  if (isBrowser) {
    console.log("(Browser$)");
    const request2 = new RequestStream(
      input instanceof RequestStream ? input.clone() : input,
      {
        ...init,
        get duplex() {
          return this.method === "POST" && this.body ? "half" : void 0;
        }
      }
    );
    const url = new URL(request2.url);
    const id = url.searchParams.get("stream-id") || url.hash.slice(1) || Math.random().toString().slice(2);
    request2.headers.set("stream-id", id);
    if (request2.method === "POST") {
      const outgoing = request2;
      const incoming = new RequestStream(request2.url, {
        method: "GET",
        headers: request2.headers
      });
      fetch(outgoing);
      return fetch(incoming);
    } else {
      return fetch(request2);
    }
  } else {
    console.log("(Deno@)");
    return fetch(new RequestStream(input, init));
  }
}
__name($fetch, "$fetch");
$fetch.from = async (specifier, input, init) => {
  const handler2 = typeof specifier === "string" ? await import(specifier).then((mod) => {
    return mod.default ? mod.default.fetch || mod.default : mod.fetch;
  }) : specifier;
  if (typeof handler2 !== "function") {
    throw new TypeError(`Invalid Handler (${specifier}): ${typeof handler2}`);
  }
  const duplexHandler = duplex(handler2);
  if (!input) {
    return (input2, init2) => duplexHandler(new RequestStream(input2, init2));
  }
  return duplexHandler(new RequestStream(input, init));
};
$fetch.text = (input, init) => $fetch(input, init).then((response) => response.text());
$fetch.json = (input, init) => $fetch(input, init).then((response) => response.json());
$fetch.get = (input, init) => $fetch(input, { ...init, method: "GET" });
$fetch.post = (input, init) => $fetch(input, { ...init, method: "POST" });
$fetch.read = (input, init) => (cb) => $fetch(input, init).then(readable.fromBody).then(transform.decode).then(readable.read(cb));
const post = /* @__PURE__ */ __name((input, body) => new RequestStream(input, {
  method: "POST",
  // @ts-ignore .
  duplex: "half",
  body
}), "post");
const get = /* @__PURE__ */ __name((input) => new RequestStream(input), "get");
const handler = /* @__PURE__ */ __name((handler2) => duplex(handler2), "handler");
const handle = $fetch.from;
const request = /* @__PURE__ */ __name((input, body) => body ? post(input, body) : get(input), "request");
const pipeTo = /* @__PURE__ */ __name((destination) => (source) => source instanceof ReadableStream ? source.pipeTo(destination) : source.body.pipeTo(destination), "pipeTo");
export {
  $fetch,
  get,
  handle,
  handler,
  pipeTo,
  post,
  request
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdHJhbnNwb3J0L2ZldGNoLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyByZWFkYWJsZSwgdHJhbnNmb3JtIH0gZnJvbSBcIi4uL21vZC50c1wiO1xuaW1wb3J0IHsgUmVxdWVzdEhhbmRsZXIgfSBmcm9tIFwiLi4vdHlwZXMudHNcIjtcbmltcG9ydCB7IGR1cGxleCB9IGZyb20gXCIuL2hhbmRsZS50c1wiO1xuaW1wb3J0IHsgUmVxdWVzdFN0cmVhbSwgUmVzcG9uc2VTdHJlYW0gfSBmcm9tIFwiLi9zdHJlYW0udHNcIjtcblxuJGZldGNoLmZldGNoID0gKFxuICBpbnB1dDpcbiAgICB8IHN0cmluZ1xuICAgIHwgUmVxdWVzdFN0cmVhbVxuICAgIHwgVVJMLFxuICBpbml0PzogUmVxdWVzdEluaXQgfCB1bmRlZmluZWQsXG4pID0+IHtcbiAgY29uc29sZS5sb2coXCJmZXRjaChcIiwgaW5wdXQsIGluaXQsIFwiKVwiKTtcbiAgcmV0dXJuIGdsb2JhbFRoaXMuZmV0Y2goaW5wdXQsIGluaXQpO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uICRmZXRjaChcbiAgaW5wdXQ6XG4gICAgfCBzdHJpbmdcbiAgICB8IFJlcXVlc3RTdHJlYW1cbiAgICB8IFVSTCxcbiAgaW5pdD86IFJlcXVlc3RJbml0IHwgdW5kZWZpbmVkLFxuKTogUHJvbWlzZTxSZXNwb25zZVN0cmVhbT4ge1xuICBjb25zdCBpc0Jyb3dzZXIgPSB0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCI7XG4gIGNvbnN0IGZldGNoID0gJGZldGNoLmZldGNoIHx8IGdsb2JhbFRoaXMuZmV0Y2g7XG5cbiAgaWYgKGlzQnJvd3Nlcikge1xuICAgIGNvbnNvbGUubG9nKFwiKEJyb3dzZXIkKVwiKTtcblxuICAgIGNvbnN0IHJlcXVlc3Q6IFJlcXVlc3RTdHJlYW0gPSBuZXcgUmVxdWVzdFN0cmVhbShcbiAgICAgIGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdFN0cmVhbSA/IGlucHV0LmNsb25lKCkgOiBpbnB1dCxcbiAgICAgIHtcbiAgICAgICAgLi4uaW5pdCxcbiAgICAgICAgZ2V0IGR1cGxleCgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5tZXRob2QgPT09IFwiUE9TVFwiICYmIHRoaXMuYm9keSA/IFwiaGFsZlwiIDogdW5kZWZpbmVkO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICApO1xuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwocmVxdWVzdC51cmwpO1xuXG4gICAgY29uc3QgaWQgPSB1cmwuc2VhcmNoUGFyYW1zLmdldChcInN0cmVhbS1pZFwiKSB8fCB1cmwuaGFzaC5zbGljZSgxKSB8fFxuICAgICAgTWF0aC5yYW5kb20oKS50b1N0cmluZygpLnNsaWNlKDIpO1xuXG4gICAgcmVxdWVzdC5oZWFkZXJzLnNldChcInN0cmVhbS1pZFwiLCBpZCk7XG5cbiAgICAvLyBQT1NUXG4gICAgaWYgKHJlcXVlc3QubWV0aG9kID09PSBcIlBPU1RcIikge1xuICAgICAgY29uc3Qgb3V0Z29pbmcgPSByZXF1ZXN0O1xuXG4gICAgICBjb25zdCBpbmNvbWluZyA9IG5ldyBSZXF1ZXN0U3RyZWFtKHJlcXVlc3QudXJsLCB7XG4gICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgaGVhZGVyczogcmVxdWVzdC5oZWFkZXJzLFxuICAgICAgfSk7XG5cbiAgICAgIGZldGNoKG91dGdvaW5nKTtcblxuICAgICAgcmV0dXJuIGZldGNoKGluY29taW5nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZyhcIihEZW5vQClcIik7XG5cbiAgICByZXR1cm4gZmV0Y2gobmV3IFJlcXVlc3RTdHJlYW0oaW5wdXQsIGluaXQpKTtcbiAgfVxufVxuXG4kZmV0Y2guZnJvbSA9IGFzeW5jIChcbiAgc3BlY2lmaWVyOiBzdHJpbmcgfCBSZXF1ZXN0SGFuZGxlciB8IHsgZmV0Y2g6IFJlcXVlc3RIYW5kbGVyIH0sXG4gIGlucHV0Pzogc3RyaW5nIHwgUmVxdWVzdFN0cmVhbSB8IFVSTCxcbiAgaW5pdD86IFJlcXVlc3RJbml0IHwgdW5kZWZpbmVkLFxuKSA9PiB7XG4gIGNvbnN0IGhhbmRsZXI6IFJlcXVlc3RIYW5kbGVyID0gdHlwZW9mIHNwZWNpZmllciA9PT0gXCJzdHJpbmdcIlxuICAgID8gYXdhaXQgaW1wb3J0KHNwZWNpZmllcikudGhlbigobW9kKSA9PiB7XG4gICAgICByZXR1cm4gbW9kLmRlZmF1bHQgPyBtb2QuZGVmYXVsdC5mZXRjaCB8fCBtb2QuZGVmYXVsdCA6IG1vZC5mZXRjaDtcbiAgICB9KVxuICAgIDogc3BlY2lmaWVyO1xuXG4gIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgSW52YWxpZCBIYW5kbGVyICgke3NwZWNpZmllcn0pOiAke3R5cGVvZiBoYW5kbGVyfWApO1xuICB9XG4gIGNvbnN0IGR1cGxleEhhbmRsZXIgPSBkdXBsZXgoaGFuZGxlcik7XG5cbiAgaWYgKCFpbnB1dCkge1xuICAgIHJldHVybiAoXG4gICAgICBpbnB1dDogc3RyaW5nIHwgUmVxdWVzdFN0cmVhbSB8IFVSTCxcbiAgICAgIGluaXQ/OiBSZXF1ZXN0SW5pdCB8IHVuZGVmaW5lZCxcbiAgICApID0+IGR1cGxleEhhbmRsZXIobmV3IFJlcXVlc3RTdHJlYW0oaW5wdXQsIGluaXQpKTtcbiAgfVxuXG4gIHJldHVybiBkdXBsZXhIYW5kbGVyKG5ldyBSZXF1ZXN0U3RyZWFtKGlucHV0LCBpbml0KSk7XG59O1xuXG4kZmV0Y2gudGV4dCA9IChcbiAgaW5wdXQ6XG4gICAgfCBzdHJpbmdcbiAgICB8IFJlcXVlc3RTdHJlYW1cbiAgICB8IFVSTCxcbiAgaW5pdD86IFJlcXVlc3RJbml0IHwgdW5kZWZpbmVkLFxuKSA9PiAkZmV0Y2goaW5wdXQsIGluaXQpLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpO1xuXG4kZmV0Y2guanNvbiA9IChcbiAgaW5wdXQ6XG4gICAgfCBzdHJpbmdcbiAgICB8IFJlcXVlc3RTdHJlYW1cbiAgICB8IFVSTCxcbiAgaW5pdD86IFJlcXVlc3RJbml0IHwgdW5kZWZpbmVkLFxuKSA9PiAkZmV0Y2goaW5wdXQsIGluaXQpLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuXG4kZmV0Y2guZ2V0ID0gKFxuICBpbnB1dDpcbiAgICB8IHN0cmluZ1xuICAgIHwgUmVxdWVzdFN0cmVhbVxuICAgIHwgVVJMLFxuICBpbml0PzogT21pdDxSZXF1ZXN0SW5pdCwgXCJtZXRob2RcIj4gfCB1bmRlZmluZWQsXG4pID0+ICRmZXRjaChpbnB1dCwgeyAuLi5pbml0LCBtZXRob2Q6IFwiR0VUXCIgfSk7XG5cbiRmZXRjaC5wb3N0ID0gKFxuICBpbnB1dDpcbiAgICB8IHN0cmluZ1xuICAgIHwgUmVxdWVzdFN0cmVhbVxuICAgIHwgVVJMLFxuICBpbml0PzogT21pdDxSZXF1ZXN0SW5pdCwgXCJtZXRob2RcIj4gfCB1bmRlZmluZWQsXG4pID0+ICRmZXRjaChpbnB1dCwgeyAuLi5pbml0LCBtZXRob2Q6IFwiUE9TVFwiIH0pO1xuXG4kZmV0Y2gucmVhZCA9IChcbiAgaW5wdXQ6XG4gICAgfCBzdHJpbmdcbiAgICB8IFJlcXVlc3RTdHJlYW1cbiAgICB8IFVSTCxcbiAgaW5pdD86IFJlcXVlc3RJbml0IHwgdW5kZWZpbmVkLFxuKSA9PlxuKGNiOiAoY2h1bms6IHN0cmluZykgPT4gdm9pZCkgPT5cbiAgJGZldGNoKGlucHV0LCBpbml0KVxuICAgIC50aGVuKHJlYWRhYmxlLmZyb21Cb2R5KVxuICAgIC50aGVuKHRyYW5zZm9ybS5kZWNvZGUpXG4gICAgLnRoZW4ocmVhZGFibGUucmVhZChjYikpO1xuXG5leHBvcnQgY29uc3QgcG9zdCA9IChcbiAgaW5wdXQ6IHN0cmluZyB8IFJlcXVlc3RTdHJlYW0gfCBVUkwsXG4gIGJvZHk6IFJlYWRhYmxlU3RyZWFtPFVpbnQ4QXJyYXk+LFxuKSA9PlxuICBuZXcgUmVxdWVzdFN0cmVhbShpbnB1dCwge1xuICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgLy8gQHRzLWlnbm9yZSAuXG4gICAgZHVwbGV4OiBcImhhbGZcIixcbiAgICBib2R5LFxuICB9KTtcblxuZXhwb3J0IGNvbnN0IGdldCA9IChcbiAgaW5wdXQ6IHN0cmluZyB8IFJlcXVlc3RTdHJlYW0gfCBVUkwsXG4pID0+IG5ldyBSZXF1ZXN0U3RyZWFtKGlucHV0KTtcblxuZXhwb3J0IGNvbnN0IGhhbmRsZXIgPSAoaGFuZGxlcjogUmVxdWVzdEhhbmRsZXIpID0+IGR1cGxleChoYW5kbGVyKTtcblxuZXhwb3J0IGNvbnN0IGhhbmRsZSA9ICRmZXRjaC5mcm9tO1xuXG5leHBvcnQgY29uc3QgcmVxdWVzdCA9IChcbiAgaW5wdXQ6IHN0cmluZyB8IFJlcXVlc3RTdHJlYW0gfCBVUkwsXG4gIGJvZHk/OiBSZWFkYWJsZVN0cmVhbTxVaW50OEFycmF5PixcbikgPT4gYm9keSA/IHBvc3QoaW5wdXQsIGJvZHkpIDogZ2V0KGlucHV0KTtcblxuZXhwb3J0IGNvbnN0IHBpcGVUbyA9XG4gIChkZXN0aW5hdGlvbjogV3JpdGFibGVTdHJlYW0pID0+XG4gIChzb3VyY2U6IFJlYWRhYmxlU3RyZWFtIHwgUmVzcG9uc2VTdHJlYW0gfCBSZXF1ZXN0U3RyZWFtKSA9PlxuICAgIHNvdXJjZSBpbnN0YW5jZW9mIFJlYWRhYmxlU3RyZWFtXG4gICAgICA/IHNvdXJjZS5waXBlVG8oZGVzdGluYXRpb24pXG4gICAgICA6IHNvdXJjZS5ib2R5IS5waXBlVG8oZGVzdGluYXRpb24pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFBQSxTQUFTLFVBQVUsaUJBQWlCO0FBRXBDLFNBQVMsY0FBYztBQUN2QixTQUFTLHFCQUFxQztBQUU5QyxPQUFPLFFBQVEsQ0FDYixPQUlBLFNBQ0c7QUFDSCxVQUFRLElBQUksVUFBVSxPQUFPLE1BQU0sR0FBRztBQUN0QyxTQUFPLFdBQVcsTUFBTSxPQUFPLElBQUk7QUFDckM7QUFFTyxTQUFTLE9BQ2QsT0FJQSxNQUN5QjtBQUN6QixRQUFNLFlBQVksT0FBTyxhQUFhO0FBQ3RDLFFBQU0sUUFBUSxPQUFPLFNBQVMsV0FBVztBQUV6QyxNQUFJLFdBQVc7QUFDYixZQUFRLElBQUksWUFBWTtBQUV4QixVQUFNQSxXQUF5QixJQUFJO0FBQUEsTUFDakMsaUJBQWlCLGdCQUFnQixNQUFNLE1BQU0sSUFBSTtBQUFBLE1BQ2pEO0FBQUEsUUFDRSxHQUFHO0FBQUEsUUFDSCxJQUFJLFNBQVM7QUFDWCxpQkFBTyxLQUFLLFdBQVcsVUFBVSxLQUFLLE9BQU8sU0FBUztBQUFBLFFBQ3hEO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxVQUFNLE1BQU0sSUFBSSxJQUFJQSxTQUFRLEdBQUc7QUFFL0IsVUFBTSxLQUFLLElBQUksYUFBYSxJQUFJLFdBQVcsS0FBSyxJQUFJLEtBQUssTUFBTSxDQUFDLEtBQzlELEtBQUssT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUM7QUFFbEMsSUFBQUEsU0FBUSxRQUFRLElBQUksYUFBYSxFQUFFO0FBR25DLFFBQUlBLFNBQVEsV0FBVyxRQUFRO0FBQzdCLFlBQU0sV0FBV0E7QUFFakIsWUFBTSxXQUFXLElBQUksY0FBY0EsU0FBUSxLQUFLO0FBQUEsUUFDOUMsUUFBUTtBQUFBLFFBQ1IsU0FBU0EsU0FBUTtBQUFBLE1BQ25CLENBQUM7QUFFRCxZQUFNLFFBQVE7QUFFZCxhQUFPLE1BQU0sUUFBUTtBQUFBLElBQ3ZCLE9BQU87QUFDTCxhQUFPLE1BQU1BLFFBQU87QUFBQSxJQUN0QjtBQUFBLEVBQ0YsT0FBTztBQUNMLFlBQVEsSUFBSSxTQUFTO0FBRXJCLFdBQU8sTUFBTSxJQUFJLGNBQWMsT0FBTyxJQUFJLENBQUM7QUFBQSxFQUM3QztBQUNGO0FBakRnQjtBQW1EaEIsT0FBTyxPQUFPLE9BQ1osV0FDQSxPQUNBLFNBQ0c7QUFDSCxRQUFNQyxXQUEwQixPQUFPLGNBQWMsV0FDakQsTUFBTSxPQUFPLFdBQVcsS0FBSyxDQUFDLFFBQVE7QUFDdEMsV0FBTyxJQUFJLFVBQVUsSUFBSSxRQUFRLFNBQVMsSUFBSSxVQUFVLElBQUk7QUFBQSxFQUM5RCxDQUFDLElBQ0M7QUFFSixNQUFJLE9BQU9BLGFBQVksWUFBWTtBQUNqQyxVQUFNLElBQUksVUFBVSxvQkFBb0IsU0FBUyxNQUFNLE9BQU9BLFFBQU8sRUFBRTtBQUFBLEVBQ3pFO0FBQ0EsUUFBTSxnQkFBZ0IsT0FBT0EsUUFBTztBQUVwQyxNQUFJLENBQUMsT0FBTztBQUNWLFdBQU8sQ0FDTEMsUUFDQUMsVUFDRyxjQUFjLElBQUksY0FBY0QsUUFBT0MsS0FBSSxDQUFDO0FBQUEsRUFDbkQ7QUFFQSxTQUFPLGNBQWMsSUFBSSxjQUFjLE9BQU8sSUFBSSxDQUFDO0FBQ3JEO0FBRUEsT0FBTyxPQUFPLENBQ1osT0FJQSxTQUNHLE9BQU8sT0FBTyxJQUFJLEVBQUUsS0FBSyxDQUFDLGFBQWEsU0FBUyxLQUFLLENBQUM7QUFFM0QsT0FBTyxPQUFPLENBQ1osT0FJQSxTQUNHLE9BQU8sT0FBTyxJQUFJLEVBQUUsS0FBSyxDQUFDLGFBQWEsU0FBUyxLQUFLLENBQUM7QUFFM0QsT0FBTyxNQUFNLENBQ1gsT0FJQSxTQUNHLE9BQU8sT0FBTyxFQUFFLEdBQUcsTUFBTSxRQUFRLE1BQU0sQ0FBQztBQUU3QyxPQUFPLE9BQU8sQ0FDWixPQUlBLFNBQ0csT0FBTyxPQUFPLEVBQUUsR0FBRyxNQUFNLFFBQVEsT0FBTyxDQUFDO0FBRTlDLE9BQU8sT0FBTyxDQUNaLE9BSUEsU0FFRixDQUFDLE9BQ0MsT0FBTyxPQUFPLElBQUksRUFDZixLQUFLLFNBQVMsUUFBUSxFQUN0QixLQUFLLFVBQVUsTUFBTSxFQUNyQixLQUFLLFNBQVMsS0FBSyxFQUFFLENBQUM7QUFFcEIsTUFBTSxPQUFPLHdCQUNsQixPQUNBLFNBRUEsSUFBSSxjQUFjLE9BQU87QUFBQSxFQUN2QixRQUFRO0FBQUE7QUFBQSxFQUVSLFFBQVE7QUFBQSxFQUNSO0FBQ0YsQ0FBQyxHQVRpQjtBQVdiLE1BQU0sTUFBTSx3QkFDakIsVUFDRyxJQUFJLGNBQWMsS0FBSyxHQUZUO0FBSVosTUFBTSxVQUFVLHdCQUFDRixhQUE0QixPQUFPQSxRQUFPLEdBQTNDO0FBRWhCLE1BQU0sU0FBUyxPQUFPO0FBRXRCLE1BQU0sVUFBVSx3QkFDckIsT0FDQSxTQUNHLE9BQU8sS0FBSyxPQUFPLElBQUksSUFBSSxJQUFJLEtBQUssR0FIbEI7QUFLaEIsTUFBTSxTQUNYLHdCQUFDLGdCQUNELENBQUMsV0FDQyxrQkFBa0IsaUJBQ2QsT0FBTyxPQUFPLFdBQVcsSUFDekIsT0FBTyxLQUFNLE9BQU8sV0FBVyxHQUpyQzsiLAogICJuYW1lcyI6IFsicmVxdWVzdCIsICJoYW5kbGVyIiwgImlucHV0IiwgImluaXQiXQp9Cg==
