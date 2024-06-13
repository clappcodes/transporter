var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const read = /* @__PURE__ */ __name((cb) => {
  return async (stream) => {
    for await (const chunk of stream) {
      await cb(chunk);
    }
  };
}, "read");
export {
  read
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vcmVhZGFibGUvcmVhZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0IHJlYWQgPSAoY2I6IENhbGxhYmxlRnVuY3Rpb24pID0+IHtcbiAgcmV0dXJuIGFzeW5jIDxUPihzdHJlYW06IFJlYWRhYmxlU3RyZWFtPFQ+KSA9PiB7XG4gICAgZm9yIGF3YWl0IChjb25zdCBjaHVuayBvZiBzdHJlYW0pIHtcbiAgICAgIGF3YWl0IGNiKGNodW5rKTtcbiAgICB9XG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFBTyxNQUFNLE9BQU8sd0JBQUMsT0FBeUI7QUFDNUMsU0FBTyxPQUFVLFdBQThCO0FBQzdDLHFCQUFpQixTQUFTLFFBQVE7QUFDaEMsWUFBTSxHQUFHLEtBQUs7QUFBQSxJQUNoQjtBQUFBLEVBQ0Y7QUFDRixHQU5vQjsiLAogICJuYW1lcyI6IFtdCn0K
