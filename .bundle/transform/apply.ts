var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function apply(transformer) {
  return new TransformStream(
    {
      async transform(chunk, controller) {
        try {
          await transformer(chunk, controller);
        } catch (e) {
          controller.error(e);
        }
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
__name(apply, "apply");
export {
  apply
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdHJhbnNmb3JtL2FwcGx5LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7IFRyYW5zZm9ybSB9IGZyb20gXCIuLi90eXBlcy50c1wiO1xuXG4vKipcbiAqIEFwcGxpZXMgYSB0cmFuc2Zvcm1lciBmdW5jdGlvbiB0byBjcmVhdGUgYSBUcmFuc2Zvcm0gc3RyZWFtLlxuICpcbiAqIEB0ZW1wbGF0ZSBTIFRoZSB0eXBlIG9mIHRoZSBpbnB1dCBkYXRhLlxuICogQHRlbXBsYXRlIFQgVGhlIHR5cGUgb2YgdGhlIHRyYW5zZm9ybWVkIGRhdGEuXG4gKiBAcGFyYW0ge1RyYW5zZm9ybWVyVHJhbnNmb3JtQ2FsbGJhY2s8UywgVD59IHRyYW5zZm9ybWVyIFRoZSB0cmFuc2Zvcm1lciBmdW5jdGlvbiB0byBhcHBseSB0byBlYWNoIGNodW5rIG9mIGRhdGEuXG4gKiBAcmV0dXJucyB7VHJhbnNmb3JtPFMsIFQ+fSBUaGUgVHJhbnNmb3JtIHN0cmVhbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5PFMsIFQ+KFxuICB0cmFuc2Zvcm1lcjogVHJhbnNmb3JtZXJUcmFuc2Zvcm1DYWxsYmFjazxTLCBUPixcbik6IFRyYW5zZm9ybTxTLCBUPiB7XG4gIHJldHVybiBuZXcgVHJhbnNmb3JtU3RyZWFtPFMsIFQ+KFxuICAgIHtcbiAgICAgIGFzeW5jIHRyYW5zZm9ybShjaHVuaywgY29udHJvbGxlcikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHRyYW5zZm9ybWVyKGNodW5rLCBjb250cm9sbGVyKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGNvbnRyb2xsZXIuZXJyb3IoZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgICB7IGhpZ2hXYXRlck1hcms6IDEgfSxcbiAgICB7IGhpZ2hXYXRlck1hcms6IDAgfSxcbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBVU8sU0FBUyxNQUNkLGFBQ2lCO0FBQ2pCLFNBQU8sSUFBSTtBQUFBLElBQ1Q7QUFBQSxNQUNFLE1BQU0sVUFBVSxPQUFPLFlBQVk7QUFDakMsWUFBSTtBQUNGLGdCQUFNLFlBQVksT0FBTyxVQUFVO0FBQUEsUUFDckMsU0FBUyxHQUFHO0FBQ1YscUJBQVcsTUFBTSxDQUFDO0FBQUEsUUFDcEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsRUFBRSxlQUFlLEVBQUU7QUFBQSxJQUNuQixFQUFFLGVBQWUsRUFBRTtBQUFBLEVBQ3JCO0FBQ0Y7QUFoQmdCOyIsCiAgIm5hbWVzIjogW10KfQo=
