var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { isTransformStream } from "../utils.ts";
const transform = /* @__PURE__ */ __name((transform2) => (input) => {
  return input.pipeThrough(transform2);
}, "transform");
function pipe(mapper) {
  const streamMapper = /* @__PURE__ */ __name((input) => isTransformStream(mapper) ? transform(mapper)(input) : mapper(input), "streamMapper");
  if (isTransformStream(mapper)) {
    Object.defineProperties(streamMapper, {
      readable: {
        get: () => mapper.readable,
        enumerable: true
      },
      writable: {
        get: () => mapper.writable,
        enumerable: true
      }
    });
  }
  streamMapper.pipe = (mapper2) => {
    return pipe((input) => {
      const nextStream = streamMapper(input);
      return isTransformStream(mapper2) ? transform(mapper2)(nextStream) : mapper2(nextStream);
    });
  };
  return streamMapper;
}
__name(pipe, "pipe");
export {
  pipe,
  transform
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdHJhbnNmb3JtL3BpcGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0eXBlIHtcbiAgU3RyaWN0U3RyZWFtLFxuICBTdHJpY3RTdHJlYW1NYXBwZXIsXG4gIFN0cmljdFN0cmVhbVBsdW1iZXIsXG59IGZyb20gXCIuLi90eXBlcy50c1wiO1xuaW1wb3J0IHsgaXNUcmFuc2Zvcm1TdHJlYW0gfSBmcm9tIFwiLi4vdXRpbHMudHNcIjtcblxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybSA9XG4gIDxJLCBPPih0cmFuc2Zvcm06IFRyYW5zZm9ybVN0cmVhbTxJLCBPPikgPT5cbiAgKGlucHV0OiBSZWFkYWJsZVN0cmVhbTxJPik6IFJlYWRhYmxlU3RyZWFtPE8+ID0+IHtcbiAgICByZXR1cm4gaW5wdXQucGlwZVRocm91Z2godHJhbnNmb3JtKTtcbiAgfTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBpcGU8SW4sIE91dD4oXG4gIG1hcHBlcjogU3RyaWN0U3RyZWFtTWFwcGVyPEluLCBPdXQ+IHwgVHJhbnNmb3JtU3RyZWFtPEluLCBPdXQ+LFxuKTogU3RyaWN0U3RyZWFtUGx1bWJlcjxJbiwgT3V0PiB7XG4gIGNvbnN0IHN0cmVhbU1hcHBlcjogU3RyaWN0U3RyZWFtTWFwcGVyPEluLCBPdXQ+ID0gKGlucHV0OiBTdHJpY3RTdHJlYW08SW4+KSA9PlxuICAgIGlzVHJhbnNmb3JtU3RyZWFtKG1hcHBlcikgPyB0cmFuc2Zvcm0obWFwcGVyKShpbnB1dCkgOiBtYXBwZXIoaW5wdXQpO1xuXG4gIC8vIHRvZG86IG1ha2UgaXQgd29ya1xuICBpZiAoaXNUcmFuc2Zvcm1TdHJlYW0obWFwcGVyKSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHN0cmVhbU1hcHBlciwge1xuICAgICAgcmVhZGFibGU6IHtcbiAgICAgICAgZ2V0OiAoKSA9PiBtYXBwZXIucmVhZGFibGUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICB9LFxuICAgICAgd3JpdGFibGU6IHtcbiAgICAgICAgZ2V0OiAoKSA9PiBtYXBwZXIud3JpdGFibGUsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLy8gQHRzLWlnbm9yZSA/XG4gIHN0cmVhbU1hcHBlci5waXBlID0gPE91dHB1dD4oXG4gICAgbWFwcGVyOiBTdHJpY3RTdHJlYW1NYXBwZXI8T3V0LCBPdXRwdXQ+IHwgVHJhbnNmb3JtU3RyZWFtPE91dCwgT3V0cHV0PixcbiAgKSA9PiB7XG4gICAgcmV0dXJuIHBpcGU8SW4sIE91dHB1dD4oKGlucHV0OiBTdHJpY3RTdHJlYW08SW4+KSA9PiB7XG4gICAgICBjb25zdCBuZXh0U3RyZWFtID0gc3RyZWFtTWFwcGVyKGlucHV0KTtcbiAgICAgIHJldHVybiBpc1RyYW5zZm9ybVN0cmVhbShtYXBwZXIpXG4gICAgICAgID8gdHJhbnNmb3JtKG1hcHBlcikobmV4dFN0cmVhbSlcbiAgICAgICAgOiBtYXBwZXIobmV4dFN0cmVhbSk7XG4gICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIHN0cmVhbU1hcHBlciBhcyBTdHJpY3RTdHJlYW1QbHVtYmVyPEluLCBPdXQ+O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFLQSxTQUFTLHlCQUF5QjtBQUUzQixNQUFNLFlBQ1gsd0JBQU9BLGVBQ1AsQ0FBQyxVQUFnRDtBQUMvQyxTQUFPLE1BQU0sWUFBWUEsVUFBUztBQUNwQyxHQUhBO0FBS0ssU0FBUyxLQUNkLFFBQzhCO0FBQzlCLFFBQU0sZUFBNEMsd0JBQUMsVUFDakQsa0JBQWtCLE1BQU0sSUFBSSxVQUFVLE1BQU0sRUFBRSxLQUFLLElBQUksT0FBTyxLQUFLLEdBRG5CO0FBSWxELE1BQUksa0JBQWtCLE1BQU0sR0FBRztBQUM3QixXQUFPLGlCQUFpQixjQUFjO0FBQUEsTUFDcEMsVUFBVTtBQUFBLFFBQ1IsS0FBSyxNQUFNLE9BQU87QUFBQSxRQUNsQixZQUFZO0FBQUEsTUFDZDtBQUFBLE1BQ0EsVUFBVTtBQUFBLFFBQ1IsS0FBSyxNQUFNLE9BQU87QUFBQSxRQUNsQixZQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFHQSxlQUFhLE9BQU8sQ0FDbEJDLFlBQ0c7QUFDSCxXQUFPLEtBQWlCLENBQUMsVUFBNEI7QUFDbkQsWUFBTSxhQUFhLGFBQWEsS0FBSztBQUNyQyxhQUFPLGtCQUFrQkEsT0FBTSxJQUMzQixVQUFVQSxPQUFNLEVBQUUsVUFBVSxJQUM1QkEsUUFBTyxVQUFVO0FBQUEsSUFDdkIsQ0FBQztBQUFBLEVBQ0g7QUFFQSxTQUFPO0FBQ1Q7QUFqQ2dCOyIsCiAgIm5hbWVzIjogWyJ0cmFuc2Zvcm0iLCAibWFwcGVyIl0KfQo=
