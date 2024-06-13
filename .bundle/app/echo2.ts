var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const alphaMap = [
  "o",
  "i",
  "z",
  "e",
  "q",
  "f",
  "s",
  "x",
  "b",
  "n"
];
const num2alpha = /* @__PURE__ */ __name(() => transform.map(
  (value) => [...String(value)].map((num) => alphaMap[Number(num)]).join("")
), "num2alpha");
const alpha2num = /* @__PURE__ */ __name(() => transform.map(
  (value) => Number([...value].map((char) => alphaMap.indexOf(char)).join(""))
), "alpha2num");
var echo2_default = {
  fetch(request) {
    return new Response(
      request.body?.pipeThrough(transform.decode()).pipeThrough(num2alpha()).pipeThrough(transform.upperCase()).pipeThrough(transform.encode())
    );
  },
  async start() {
    const stream = readable.fromTimer(1, Math.random).pipeThrough(transform.toString()).pipeThrough(transform.encode()).pipeThrough(new TransportStream("app/echo2")).pipeThrough(transform.decode()).pipeThrough(transform.map((value) => {
      document.querySelector("#output").textContent = value;
      return value;
    }));
    for await (const c of stream) {
    }
  }
};
export {
  echo2_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vYXBwL2VjaG8yLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBpbXBvcnQgeyByZWFkYWJsZSwgdHJhbnNmb3JtLCBUcmFuc3BvcnRTdHJlYW0gfSBmcm9tIFwiLi4vbW9kLnRzXCI7XG5cbmNvbnN0IGFscGhhTWFwOiBbc3RyaW5nLCAuLi5zdHJpbmdbXV0gPSBbXG4gIFwib1wiLFxuICBcImlcIixcbiAgXCJ6XCIsXG4gIFwiZVwiLFxuICBcInFcIixcbiAgXCJmXCIsXG4gIFwic1wiLFxuICBcInhcIixcbiAgXCJiXCIsXG4gIFwiblwiLFxuXTtcblxuY29uc3QgbnVtMmFscGhhID0gKCkgPT5cbiAgdHJhbnNmb3JtLm1hcDxudW1iZXIgfCBzdHJpbmcsIHN0cmluZz4oKHZhbHVlKSA9PlxuICAgIFsuLi5TdHJpbmcodmFsdWUpXS5tYXAoKG51bSkgPT4gYWxwaGFNYXBbTnVtYmVyKG51bSldKS5qb2luKFwiXCIpXG4gICk7XG5cbmNvbnN0IGFscGhhMm51bSA9IDxUIGV4dGVuZHMgc3RyaW5nPigpID0+XG4gIHRyYW5zZm9ybS5tYXA8VCwgbnVtYmVyPigodmFsdWUpID0+XG4gICAgTnVtYmVyKFsuLi52YWx1ZV0ubWFwKChjaGFyKSA9PiBhbHBoYU1hcC5pbmRleE9mKGNoYXIpKS5qb2luKFwiXCIpKVxuICApO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGZldGNoKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKFxuICAgICAgcmVxdWVzdC5ib2R5XG4gICAgICAgID8ucGlwZVRocm91Z2godHJhbnNmb3JtLmRlY29kZSgpKVxuICAgICAgICAucGlwZVRocm91Z2gobnVtMmFscGhhKCkpXG4gICAgICAgIC5waXBlVGhyb3VnaCh0cmFuc2Zvcm0udXBwZXJDYXNlKCkpXG4gICAgICAgIC5waXBlVGhyb3VnaCh0cmFuc2Zvcm0uZW5jb2RlKCkpLFxuICAgICk7XG4gIH0sXG4gIGFzeW5jIHN0YXJ0KCkge1xuICAgIGNvbnN0IHN0cmVhbSA9IHJlYWRhYmxlLmZyb21UaW1lcigxLCBNYXRoLnJhbmRvbSlcbiAgICAgIC5waXBlVGhyb3VnaCh0cmFuc2Zvcm0udG9TdHJpbmcoKSlcbiAgICAgIC5waXBlVGhyb3VnaCh0cmFuc2Zvcm0uZW5jb2RlKCkpXG4gICAgICAucGlwZVRocm91Z2gobmV3IFRyYW5zcG9ydFN0cmVhbShcImFwcC9lY2hvMlwiKSlcbiAgICAgIC5waXBlVGhyb3VnaCh0cmFuc2Zvcm0uZGVjb2RlKCkpXG4gICAgICAucGlwZVRocm91Z2godHJhbnNmb3JtLm1hcCgodmFsdWUpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNvdXRwdXRcIikhLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0pKTtcblxuICAgIGZvciBhd2FpdCAoY29uc3QgYyBvZiBzdHJlYW0pIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGMpO1xuICAgIH1cbiAgfSxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUVBLE1BQU0sV0FBa0M7QUFBQSxFQUN0QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGO0FBRUEsTUFBTSxZQUFZLDZCQUNoQixVQUFVO0FBQUEsRUFBNkIsQ0FBQyxVQUN0QyxDQUFDLEdBQUcsT0FBTyxLQUFLLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxTQUFTLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUU7QUFDaEUsR0FIZ0I7QUFLbEIsTUFBTSxZQUFZLDZCQUNoQixVQUFVO0FBQUEsRUFBZSxDQUFDLFVBQ3hCLE9BQU8sQ0FBQyxHQUFHLEtBQUssRUFBRSxJQUFJLENBQUMsU0FBUyxTQUFTLFFBQVEsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDbEUsR0FIZ0I7QUFLbEIsSUFBTyxnQkFBUTtBQUFBLEVBQ2IsTUFBTSxTQUFrQjtBQUN0QixXQUFPLElBQUk7QUFBQSxNQUNULFFBQVEsTUFDSixZQUFZLFVBQVUsT0FBTyxDQUFDLEVBQy9CLFlBQVksVUFBVSxDQUFDLEVBQ3ZCLFlBQVksVUFBVSxVQUFVLENBQUMsRUFDakMsWUFBWSxVQUFVLE9BQU8sQ0FBQztBQUFBLElBQ25DO0FBQUEsRUFDRjtBQUFBLEVBQ0EsTUFBTSxRQUFRO0FBQ1osVUFBTSxTQUFTLFNBQVMsVUFBVSxHQUFHLEtBQUssTUFBTSxFQUM3QyxZQUFZLFVBQVUsU0FBUyxDQUFDLEVBQ2hDLFlBQVksVUFBVSxPQUFPLENBQUMsRUFDOUIsWUFBWSxJQUFJLGdCQUFnQixXQUFXLENBQUMsRUFDNUMsWUFBWSxVQUFVLE9BQU8sQ0FBQyxFQUM5QixZQUFZLFVBQVUsSUFBSSxDQUFDLFVBQVU7QUFDcEMsZUFBUyxjQUFjLFNBQVMsRUFBRyxjQUFjO0FBQ2pELGFBQU87QUFBQSxJQUNULENBQUMsQ0FBQztBQUVKLHFCQUFpQixLQUFLLFFBQVE7QUFBQSxJQUU5QjtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
