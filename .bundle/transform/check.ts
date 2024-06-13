var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function check(f, message) {
  return new TransformStream(
    {
      transform(chunk, controller) {
        if (!f(chunk)) {
          throw new TypeError(
            `Check Failed: ${message || "type: " + typeof chunk + " validate func: " + String(f)}`
          );
        }
        controller.enqueue(chunk);
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
__name(check, "check");
export {
  check
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdHJhbnNmb3JtL2NoZWNrLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7IFRyYW5zZm9ybSB9IGZyb20gXCIuLi90eXBlcy50c1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2s8VD4oZjogKHg6IFQpID0+IGJvb2xlYW4sIG1lc3NhZ2U/OiBzdHJpbmcpOiBUcmFuc2Zvcm08VD4ge1xuICByZXR1cm4gbmV3IFRyYW5zZm9ybVN0cmVhbTxULCBUPihcbiAgICB7XG4gICAgICB0cmFuc2Zvcm0oY2h1bmssIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgaWYgKCFmKGNodW5rKSkge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgICBgQ2hlY2sgRmFpbGVkOiAke1xuICAgICAgICAgICAgICBtZXNzYWdlIHx8XG4gICAgICAgICAgICAgIFwidHlwZTogXCIgKyB0eXBlb2YgY2h1bmsgKyBcIiB2YWxpZGF0ZSBmdW5jOiBcIiArIFN0cmluZyhmKVxuICAgICAgICAgICAgfWAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBjb250cm9sbGVyLmVucXVldWUoY2h1bmspO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHsgaGlnaFdhdGVyTWFyazogMSB9LFxuICAgIHsgaGlnaFdhdGVyTWFyazogMCB9LFxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFFTyxTQUFTLE1BQVMsR0FBc0IsU0FBZ0M7QUFDN0UsU0FBTyxJQUFJO0FBQUEsSUFDVDtBQUFBLE1BQ0UsVUFBVSxPQUFPLFlBQVk7QUFDM0IsWUFBSSxDQUFDLEVBQUUsS0FBSyxHQUFHO0FBQ2IsZ0JBQU0sSUFBSTtBQUFBLFlBQ1IsaUJBQ0UsV0FDQSxXQUFXLE9BQU8sUUFBUSxxQkFBcUIsT0FBTyxDQUFDLENBQ3pEO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFDQSxtQkFBVyxRQUFRLEtBQUs7QUFBQSxNQUMxQjtBQUFBLElBQ0Y7QUFBQSxJQUNBLEVBQUUsZUFBZSxFQUFFO0FBQUEsSUFDbkIsRUFBRSxlQUFlLEVBQUU7QUFBQSxFQUNyQjtBQUNGO0FBbEJnQjsiLAogICJuYW1lcyI6IFtdCn0K
