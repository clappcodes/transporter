import { transform } from "../mod.ts";
import { duplex } from "../transport.ts";
var lowercase_default = {
  fetch: duplex((request) => {
    if (request.body) {
      return new Response(
        request.body.pipeThrough(transform.decode()).pipeThrough(transform.lowerCase()).pipeThrough(transform.encode())
      );
    }
    return new Response("Bad req");
  })
};
export {
  lowercase_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vYXBwL2xvd2VyY2FzZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHsgdHJhbnNmb3JtIH0gZnJvbSBcIi4uL21vZC50c1wiO1xuaW1wb3J0IHsgZHVwbGV4IH0gZnJvbSBcIi4uL3RyYW5zcG9ydC50c1wiO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGZldGNoOiBkdXBsZXgoKHJlcXVlc3QpID0+IHtcbiAgICBpZiAocmVxdWVzdC5ib2R5KSB7XG4gICAgICByZXR1cm4gbmV3IFJlc3BvbnNlKFxuICAgICAgICByZXF1ZXN0LmJvZHlcbiAgICAgICAgICAucGlwZVRocm91Z2godHJhbnNmb3JtLmRlY29kZSgpKVxuICAgICAgICAgIC5waXBlVGhyb3VnaCh0cmFuc2Zvcm0ubG93ZXJDYXNlKCkpXG4gICAgICAgICAgLnBpcGVUaHJvdWdoKHRyYW5zZm9ybS5lbmNvZGUoKSksXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoXCJCYWQgcmVxXCIpO1xuICB9KSxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiQUFBQSxTQUFTLGlCQUFpQjtBQUMxQixTQUFTLGNBQWM7QUFFdkIsSUFBTyxvQkFBUTtBQUFBLEVBQ2IsT0FBTyxPQUFPLENBQUMsWUFBWTtBQUN6QixRQUFJLFFBQVEsTUFBTTtBQUNoQixhQUFPLElBQUk7QUFBQSxRQUNULFFBQVEsS0FDTCxZQUFZLFVBQVUsT0FBTyxDQUFDLEVBQzlCLFlBQVksVUFBVSxVQUFVLENBQUMsRUFDakMsWUFBWSxVQUFVLE9BQU8sQ0FBQztBQUFBLE1BQ25DO0FBQUEsSUFDRjtBQUVBLFdBQU8sSUFBSSxTQUFTLFNBQVM7QUFBQSxFQUMvQixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbXQp9Cg==
