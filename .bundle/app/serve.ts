var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
async function serve(specifier) {
  const mod = await import(specifier);
  Object.assign(globalThis, { mod });
  const module = mod.default;
  const options = {
    ...module.serve,
    onError: module.error
  };
  const handle = /* @__PURE__ */ __name(async (request, info) => {
    const response = await module.fetch(request, { info });
    if (response instanceof Response) {
      return response;
    }
    return new Response(
      `400 - Unhandled Request
${request.method} ${request.url}`,
      {
        status: 400
      }
    );
  }, "handle");
  return { options, handle };
}
__name(serve, "serve");
if (import.meta.main) {
  const specifier = Deno.args.at(0);
  if (!specifier) {
    throw new TypeError(`Module specifier missing`);
  }
  console.log("(serve)", specifier);
  const { handle, options } = await serve(specifier);
  Deno.serve(options, handle);
}
export {
  serve
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vYXBwL3NlcnZlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7IEhhbmRsZXJNb2R1bGUgfSBmcm9tIFwiLi4vdHlwZXMudHNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlcnZlKHNwZWNpZmllcjogc3RyaW5nKSB7XG4gIGNvbnN0IG1vZCA9IGF3YWl0IGltcG9ydChzcGVjaWZpZXIpO1xuICBPYmplY3QuYXNzaWduKGdsb2JhbFRoaXMsIHsgbW9kIH0pO1xuXG4gIGNvbnN0IG1vZHVsZSA9IG1vZC5kZWZhdWx0IGFzIEhhbmRsZXJNb2R1bGU7XG4gIGNvbnN0IG9wdGlvbnM6IERlbm8uU2VydmVPcHRpb25zIHwgRGVuby5TZXJ2ZVRsc09wdGlvbnMgPSB7XG4gICAgLi4ubW9kdWxlLnNlcnZlLFxuICAgIG9uRXJyb3I6IG1vZHVsZS5lcnJvcixcbiAgfTtcbiAgY29uc3QgaGFuZGxlOiBEZW5vLlNlcnZlSGFuZGxlciA9IGFzeW5jIChyZXF1ZXN0LCBpbmZvKSA9PiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBtb2R1bGUuZmV0Y2gocmVxdWVzdCwgeyBpbmZvIH0pO1xuICAgIGlmIChyZXNwb25zZSBpbnN0YW5jZW9mIFJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZShcbiAgICAgIGA0MDAgLSBVbmhhbmRsZWQgUmVxdWVzdFxcbiR7cmVxdWVzdC5tZXRob2R9ICR7cmVxdWVzdC51cmx9YCxcbiAgICAgIHtcbiAgICAgICAgc3RhdHVzOiA0MDAsXG4gICAgICB9LFxuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIHsgb3B0aW9ucywgaGFuZGxlIH07XG59XG5cbmlmIChpbXBvcnQubWV0YS5tYWluKSB7XG4gIGNvbnN0IHNwZWNpZmllciA9IERlbm8uYXJncy5hdCgwKTtcbiAgaWYgKCFzcGVjaWZpZXIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBNb2R1bGUgc3BlY2lmaWVyIG1pc3NpbmdgKTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKFwiKHNlcnZlKVwiLCBzcGVjaWZpZXIpO1xuXG4gIGNvbnN0IHsgaGFuZGxlLCBvcHRpb25zIH0gPSBhd2FpdCBzZXJ2ZShzcGVjaWZpZXIpO1xuXG4gIERlbm8uc2VydmUob3B0aW9ucywgaGFuZGxlKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBRUEsZUFBc0IsTUFBTSxXQUFtQjtBQUM3QyxRQUFNLE1BQU0sTUFBTSxPQUFPO0FBQ3pCLFNBQU8sT0FBTyxZQUFZLEVBQUUsSUFBSSxDQUFDO0FBRWpDLFFBQU0sU0FBUyxJQUFJO0FBQ25CLFFBQU0sVUFBb0Q7QUFBQSxJQUN4RCxHQUFHLE9BQU87QUFBQSxJQUNWLFNBQVMsT0FBTztBQUFBLEVBQ2xCO0FBQ0EsUUFBTSxTQUE0Qiw4QkFBTyxTQUFTLFNBQVM7QUFDekQsVUFBTSxXQUFXLE1BQU0sT0FBTyxNQUFNLFNBQVMsRUFBRSxLQUFLLENBQUM7QUFDckQsUUFBSSxvQkFBb0IsVUFBVTtBQUNoQyxhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU8sSUFBSTtBQUFBLE1BQ1Q7QUFBQSxFQUE0QixRQUFRLE1BQU0sSUFBSSxRQUFRLEdBQUc7QUFBQSxNQUN6RDtBQUFBLFFBQ0UsUUFBUTtBQUFBLE1BQ1Y7QUFBQSxJQUNGO0FBQUEsRUFDRixHQVprQztBQWNsQyxTQUFPLEVBQUUsU0FBUyxPQUFPO0FBQzNCO0FBeEJzQjtBQTBCdEIsSUFBSSxZQUFZLE1BQU07QUFDcEIsUUFBTSxZQUFZLEtBQUssS0FBSyxHQUFHLENBQUM7QUFDaEMsTUFBSSxDQUFDLFdBQVc7QUFDZCxVQUFNLElBQUksVUFBVSwwQkFBMEI7QUFBQSxFQUNoRDtBQUVBLFVBQVEsSUFBSSxXQUFXLFNBQVM7QUFFaEMsUUFBTSxFQUFFLFFBQVEsUUFBUSxJQUFJLE1BQU0sTUFBTSxTQUFTO0FBRWpELE9BQUssTUFBTSxTQUFTLE1BQU07QUFDNUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
