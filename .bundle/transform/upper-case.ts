var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function upperCase() {
  return new TransformStream({
    transform(chunk, controller) {
      return controller.enqueue(chunk.toUpperCase());
    }
  });
}
__name(upperCase, "upperCase");
export {
  upperCase
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdHJhbnNmb3JtL3VwcGVyLWNhc2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0eXBlIHsgVHJhbnNmb3JtIH0gZnJvbSBcIi4uL3R5cGVzLnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cHBlckNhc2UoKTogVHJhbnNmb3JtPHN0cmluZz4ge1xuICByZXR1cm4gbmV3IFRyYW5zZm9ybVN0cmVhbTxzdHJpbmcsIHN0cmluZz4oe1xuICAgIHRyYW5zZm9ybShjaHVuaywgY29udHJvbGxlcikge1xuICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuZW5xdWV1ZShjaHVuay50b1VwcGVyQ2FzZSgpKTtcbiAgICB9LFxuICB9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBRU8sU0FBUyxZQUErQjtBQUM3QyxTQUFPLElBQUksZ0JBQWdDO0FBQUEsSUFDekMsVUFBVSxPQUFPLFlBQVk7QUFDM0IsYUFBTyxXQUFXLFFBQVEsTUFBTSxZQUFZLENBQUM7QUFBQSxJQUMvQztBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBTmdCOyIsCiAgIm5hbWVzIjogW10KfQo=
