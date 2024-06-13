var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function write(writable) {
  const writer = writable.getWriter();
  return /* @__PURE__ */ __name(async function w(chunk) {
    await writer.ready;
    await writer.write(chunk);
  }, "w");
}
__name(write, "write");
export {
  write
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vd3JpdGFibGUvd3JpdGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0eXBlIHsgV3JpdGFibGUgfSBmcm9tIFwiLi4vdHlwZXMudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHdyaXRlPFQ+KHdyaXRhYmxlOiBXcml0YWJsZTxUPikge1xuICBjb25zdCB3cml0ZXIgPSB3cml0YWJsZS5nZXRXcml0ZXIoKTtcblxuICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gdyhjaHVuazogVCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHdyaXRlci5yZWFkeTtcbiAgICBhd2FpdCB3cml0ZXIud3JpdGUoY2h1bmspO1xuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFFTyxTQUFTLE1BQVMsVUFBdUI7QUFDOUMsUUFBTSxTQUFTLFNBQVMsVUFBVTtBQUVsQyxTQUFPLHNDQUFlLEVBQUUsT0FBeUI7QUFDL0MsVUFBTSxPQUFPO0FBQ2IsVUFBTSxPQUFPLE1BQU0sS0FBSztBQUFBLEVBQzFCLEdBSE87QUFJVDtBQVBnQjsiLAogICJuYW1lcyI6IFtdCn0K
