var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function lowerCase() {
  return new TransformStream({
    transform(chunk, controller) {
      return controller.enqueue(chunk.toLowerCase());
    }
  });
}
__name(lowerCase, "lowerCase");
export {
  lowerCase
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdHJhbnNmb3JtL2xvd2VyLWNhc2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB0eXBlIHsgVHJhbnNmb3JtIH0gZnJvbSBcIi4uL3R5cGVzLnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBsb3dlckNhc2UoKTogVHJhbnNmb3JtPHN0cmluZz4ge1xuICByZXR1cm4gbmV3IFRyYW5zZm9ybVN0cmVhbTxzdHJpbmcsIHN0cmluZz4oe1xuICAgIHRyYW5zZm9ybShjaHVuaywgY29udHJvbGxlcikge1xuICAgICAgcmV0dXJuIGNvbnRyb2xsZXIuZW5xdWV1ZShjaHVuay50b0xvd2VyQ2FzZSgpKTtcbiAgICB9LFxuICB9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBRU8sU0FBUyxZQUErQjtBQUM3QyxTQUFPLElBQUksZ0JBQWdDO0FBQUEsSUFDekMsVUFBVSxPQUFPLFlBQVk7QUFDM0IsYUFBTyxXQUFXLFFBQVEsTUFBTSxZQUFZLENBQUM7QUFBQSxJQUMvQztBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBTmdCOyIsCiAgIm5hbWVzIjogW10KfQo=
