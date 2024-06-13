var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function log(tag = "") {
  return new TransformStream(
    {
      start() {
        console.warn(tag, "started");
      },
      async transform(chunk, controller) {
        controller.enqueue(chunk);
        console.log(tag, await chunk);
      },
      async cancel(reason) {
        await Promise.resolve(console.warn(tag, "canceled", reason));
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
__name(log, "log");
export {
  log
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdHJhbnNmb3JtL2xvZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHR5cGUgeyBUcmFuc2Zvcm0gfSBmcm9tIFwiLi4vdHlwZXMudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGxvZzxUPih0YWc6IHN0cmluZyA9IFwiXCIpOiBUcmFuc2Zvcm08VD4ge1xuICByZXR1cm4gbmV3IFRyYW5zZm9ybVN0cmVhbTxULCBUPihcbiAgICB7XG4gICAgICBzdGFydCgpIHtcbiAgICAgICAgY29uc29sZS53YXJuKHRhZywgXCJzdGFydGVkXCIpO1xuICAgICAgfSxcbiAgICAgIGFzeW5jIHRyYW5zZm9ybShjaHVuaywgY29udHJvbGxlcikge1xuICAgICAgICBjb250cm9sbGVyLmVucXVldWUoY2h1bmspO1xuICAgICAgICBjb25zb2xlLmxvZyh0YWcsIGF3YWl0IGNodW5rKTtcbiAgICAgIH0sXG4gICAgICBhc3luYyBjYW5jZWwocmVhc29uKSB7XG4gICAgICAgIGF3YWl0IFByb21pc2UucmVzb2x2ZShjb25zb2xlLndhcm4odGFnLCBcImNhbmNlbGVkXCIsIHJlYXNvbikpO1xuICAgICAgfSxcbiAgICB9LFxuICAgIHsgaGlnaFdhdGVyTWFyazogMSB9LFxuICAgIHsgaGlnaFdhdGVyTWFyazogMCB9LFxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFFTyxTQUFTLElBQU8sTUFBYyxJQUFrQjtBQUNyRCxTQUFPLElBQUk7QUFBQSxJQUNUO0FBQUEsTUFDRSxRQUFRO0FBQ04sZ0JBQVEsS0FBSyxLQUFLLFNBQVM7QUFBQSxNQUM3QjtBQUFBLE1BQ0EsTUFBTSxVQUFVLE9BQU8sWUFBWTtBQUNqQyxtQkFBVyxRQUFRLEtBQUs7QUFDeEIsZ0JBQVEsSUFBSSxLQUFLLE1BQU0sS0FBSztBQUFBLE1BQzlCO0FBQUEsTUFDQSxNQUFNLE9BQU8sUUFBUTtBQUNuQixjQUFNLFFBQVEsUUFBUSxRQUFRLEtBQUssS0FBSyxZQUFZLE1BQU0sQ0FBQztBQUFBLE1BQzdEO0FBQUEsSUFDRjtBQUFBLElBQ0EsRUFBRSxlQUFlLEVBQUU7QUFBQSxJQUNuQixFQUFFLGVBQWUsRUFBRTtBQUFBLEVBQ3JCO0FBQ0Y7QUFqQmdCOyIsCiAgIm5hbWVzIjogW10KfQo=
