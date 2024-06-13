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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vd3JpdGVhYmxlL3dyaXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7IFdyaXRhYmxlIH0gZnJvbSBcIi4uL3R5cGVzLnRzXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiB3cml0ZTxUPih3cml0YWJsZTogV3JpdGFibGU8VD4pIHtcbiAgY29uc3Qgd3JpdGVyID0gd3JpdGFibGUuZ2V0V3JpdGVyKCk7XG5cbiAgcmV0dXJuIGFzeW5jIGZ1bmN0aW9uIHcoY2h1bms6IFQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB3cml0ZXIucmVhZHk7XG4gICAgYXdhaXQgd3JpdGVyLndyaXRlKGNodW5rKTtcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBRU8sU0FBUyxNQUFTLFVBQXVCO0FBQzlDLFFBQU0sU0FBUyxTQUFTLFVBQVU7QUFFbEMsU0FBTyxzQ0FBZSxFQUFFLE9BQXlCO0FBQy9DLFVBQU0sT0FBTztBQUNiLFVBQU0sT0FBTyxNQUFNLEtBQUs7QUFBQSxFQUMxQixHQUhPO0FBSVQ7QUFQZ0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
