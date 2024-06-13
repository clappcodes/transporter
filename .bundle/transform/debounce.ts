var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
function debounce(ms) {
  let timeout;
  let timeoutP;
  let savedChunk;
  return new TransformStream(
    {
      transform(chunk, controller) {
        savedChunk = chunk;
        if (timeout > 0) {
          clearTimeout(timeout);
        }
        timeoutP = new Promise((resolve) => {
          timeout = setTimeout(() => {
            controller.enqueue(savedChunk);
            timeout = 0;
            resolve(void 0);
          }, ms);
        });
      },
      async flush() {
        await timeoutP;
      }
    },
    { highWaterMark: 1 },
    { highWaterMark: 0 }
  );
}
__name(debounce, "debounce");
export {
  debounce
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdHJhbnNmb3JtL2RlYm91bmNlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7IFRyYW5zZm9ybSB9IGZyb20gXCIuLi90eXBlcy50c1wiO1xuXG4vKipcbiAqIFJldHVybnMgYSBgVHJhbnNmb3JtYCB3aGVyZSBpdGVtcyBhcmUgb25seSBlbWl0dGVkIGlmIGBtc2AgbWlsbGlzZWNvbmRzXG4gKiBwYXNzIHdpdGhvdXQgbmV3IGEgbmV3IGVtaXQgYnkgdGhlIHNvdXJjZSBvYnNlcnZhYmxlLiBJZiBhIG5ldyB2YWx1ZSBpc1xuICogZW1pdHRlZCwgdGhlIFx1MjAxQ2Nvb2xkb3duXHUyMDFEIGlzIHJlc3RhcnRlZCBhbmQgdGhlIG9sZCB2YWx1ZSBpcyBkaXNjYXJkZWQuXG4gKlxuICogQHR5cGVwYXJhbSBUIFR5cGUgb2YgaXRlbXMgZW1pdHRlZCBieSB0aGUgb2JzZXJ2YWJsZS5cbiAqIEBwYXJhbSBtcyBNaWxsaXNlY29uZHMgdG8gd2FpdCBiZWZvcmUgZW1pdHRpbmcgYW4gaXRlbS5cbiAqIEByZXR1cm5zIFRyYW5zZm9ybSB0aGF0IGVtaXRzIHNvbWUgaXRlbXMgZnJvbSB0aGUgb3JpZ2luYWwgb2JzZXJ2YWJsZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlPFQ+KG1zOiBudW1iZXIpOiBUcmFuc2Zvcm08VD4ge1xuICBsZXQgdGltZW91dDogbnVtYmVyO1xuICBsZXQgdGltZW91dFA6IFByb21pc2U8dW5rbm93bj47XG4gIGxldCBzYXZlZENodW5rOiBUO1xuICByZXR1cm4gbmV3IFRyYW5zZm9ybVN0cmVhbShcbiAgICB7XG4gICAgICB0cmFuc2Zvcm0oY2h1bmssIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgc2F2ZWRDaHVuayA9IGNodW5rO1xuICAgICAgICBpZiAodGltZW91dCA+IDApIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGltZW91dFAgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICAgIC8vIEB0cy1pZ25vcmUgTm9kZUpTIHR5cGVzIGFyZSBpbnRlcmZlcmluZyBoZXJlXG4gICAgICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKHNhdmVkQ2h1bmspO1xuICAgICAgICAgICAgdGltZW91dCA9IDA7XG4gICAgICAgICAgICByZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgfSwgbXMpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBhc3luYyBmbHVzaCgpIHtcbiAgICAgICAgYXdhaXQgdGltZW91dFA7XG4gICAgICB9LFxuICAgIH0sXG4gICAgeyBoaWdoV2F0ZXJNYXJrOiAxIH0sXG4gICAgeyBoaWdoV2F0ZXJNYXJrOiAwIH0sXG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQVdPLFNBQVMsU0FBWSxJQUEwQjtBQUNwRCxNQUFJO0FBQ0osTUFBSTtBQUNKLE1BQUk7QUFDSixTQUFPLElBQUk7QUFBQSxJQUNUO0FBQUEsTUFDRSxVQUFVLE9BQU8sWUFBWTtBQUMzQixxQkFBYTtBQUNiLFlBQUksVUFBVSxHQUFHO0FBQ2YsdUJBQWEsT0FBTztBQUFBLFFBQ3RCO0FBQ0EsbUJBQVcsSUFBSSxRQUFRLENBQUMsWUFBWTtBQUVsQyxvQkFBVSxXQUFXLE1BQU07QUFDekIsdUJBQVcsUUFBUSxVQUFVO0FBQzdCLHNCQUFVO0FBQ1Ysb0JBQVEsTUFBUztBQUFBLFVBQ25CLEdBQUcsRUFBRTtBQUFBLFFBQ1AsQ0FBQztBQUFBLE1BQ0g7QUFBQSxNQUNBLE1BQU0sUUFBUTtBQUNaLGNBQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLElBQ0EsRUFBRSxlQUFlLEVBQUU7QUFBQSxJQUNuQixFQUFFLGVBQWUsRUFBRTtBQUFBLEVBQ3JCO0FBQ0Y7QUEzQmdCOyIsCiAgIm5hbWVzIjogW10KfQo=
