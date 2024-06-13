var METHOD = /* @__PURE__ */ ((METHOD2) => {
  METHOD2["GET"] = "GET";
  METHOD2["HEAD"] = "HEAD";
  METHOD2["POST"] = "POST";
  METHOD2["PUT"] = "PUT";
  METHOD2["DELETE"] = "DELETE";
  METHOD2["OPTIONS"] = "OPTIONS";
  METHOD2["PATCH"] = "PATCH";
  METHOD2["ANY"] = "ANY";
  return METHOD2;
})(METHOD || {});
const METHOD_ARR = Object.entries(METHOD).map(
  ([, value]) => value
);
export {
  METHOD,
  METHOD_ARR
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdHJhbnNwb3J0L1JvdXRlc0luaXQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IFJvdXRlIH0gZnJvbSBcIi4vYXBwL1JvdXRlLnRzXCI7XG5pbXBvcnQgdHlwZSB7IENvbnRleHQsIFJlcXVlc3QsIFNlcnZlSGFuZGxlclJldHVybiB9IGZyb20gXCIuL3R5cGVzLnRzXCI7XG5cbmV4cG9ydCB0eXBlIFVSTFBhdHRlcm5SZXN1bHRQYXJhbXMgPSB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB8IHVuZGVmaW5lZCB9O1xuXG5leHBvcnQgZW51bSBNRVRIT0Qge1xuICBHRVQgPSBcIkdFVFwiLFxuICBIRUFEID0gXCJIRUFEXCIsXG4gIFBPU1QgPSBcIlBPU1RcIixcbiAgUFVUID0gXCJQVVRcIixcbiAgREVMRVRFID0gXCJERUxFVEVcIixcbiAgT1BUSU9OUyA9IFwiT1BUSU9OU1wiLFxuICBQQVRDSCA9IFwiUEFUQ0hcIixcbiAgQU5ZID0gXCJBTllcIixcbn1cblxuZXhwb3J0IGNvbnN0IE1FVEhPRF9BUlIgPSBPYmplY3QuZW50cmllcyhNRVRIT0QpLm1hcChcbiAgKFssIHZhbHVlXSkgPT4gdmFsdWUsXG4pO1xuXG5leHBvcnQgdHlwZSBNRVRIT0RfTUFQID0ge1xuICBbTSBpbiBNRVRIT0RdOiBNO1xufTtcblxuZXhwb3J0IHR5cGUgUm91dGVGYWN0b3J5TWV0aG9kcyA9IExvd2VyY2FzZTxrZXlvZiB0eXBlb2YgTUVUSE9EPjtcblxuZXhwb3J0IHR5cGUgUm91dGVNZXRob2QgPSBNRVRIT0Q7XG4vLyBleHBvcnQgdHlwZSBSb3V0ZUhhbmRsZXIgPSBUQXBwLkhhbmRsZXI7XG5cbmV4cG9ydCB0eXBlIFJvdXRlRmV0Y2g8QyA9IHt9PiA9IChcbiAgcmVxdWVzdDogUmVxdWVzdCAmIEMsXG4gIGNvbnRleHQ6IENvbnRleHQgJiBDLFxuKSA9PiBTZXJ2ZUhhbmRsZXJSZXR1cm4gfCBQcm9taXNlPFNlcnZlSGFuZGxlclJldHVybj47XG5cbmV4cG9ydCB0eXBlIFJvdXRlckV2ZW50cyA9IHtcbiAgb25SZXF1ZXN0PzogUm91dGVGZXRjaDtcbiAgb25NYXRjaD86IFJvdXRlRmV0Y2g7XG4gIG9uUmVzcG9uc2U/OiBSb3V0ZUZldGNoO1xufTtcblxuZXhwb3J0IHR5cGUgUm91dGVBcnIgPSBbXG4gIFJvdXRlW1wibWV0aG9kXCJdLFxuICBSb3V0ZVtcInBhdGhcIl0sXG4gIFJvdXRlW1wiZmV0Y2hcIl0sXG4gIFJvdXRlW1wibWV0YVwiXT8sXG5dO1xuXG5leHBvcnQgdHlwZSBSb3V0ZXNJbml0ID0gUm91dGVbXSB8IFJvdXRlQXJyW10gfCBzdHJpbmc7XG5leHBvcnQgdHlwZSBSb3V0ZU1ldGEgPSB7XG4gIGltcG9ydD86IHN0cmluZztcbiAgbW9kdWxlPzogUGFydGlhbDxUQXBwLlNlcnZlPjtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiQUFLTyxJQUFLLFNBQUwsa0JBQUtBLFlBQUw7QUFDTCxFQUFBQSxRQUFBLFNBQU07QUFDTixFQUFBQSxRQUFBLFVBQU87QUFDUCxFQUFBQSxRQUFBLFVBQU87QUFDUCxFQUFBQSxRQUFBLFNBQU07QUFDTixFQUFBQSxRQUFBLFlBQVM7QUFDVCxFQUFBQSxRQUFBLGFBQVU7QUFDVixFQUFBQSxRQUFBLFdBQVE7QUFDUixFQUFBQSxRQUFBLFNBQU07QUFSSSxTQUFBQTtBQUFBLEdBQUE7QUFXTCxNQUFNLGFBQWEsT0FBTyxRQUFRLE1BQU0sRUFBRTtBQUFBLEVBQy9DLENBQUMsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUNqQjsiLAogICJuYW1lcyI6IFsiTUVUSE9EIl0KfQo=
