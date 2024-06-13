var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { map } from "./map.ts";
const to = /* @__PURE__ */ __name((func) => map(func), "to");
const newNumber = /* @__PURE__ */ __name((input) => new Number(input), "newNumber");
const toNumeric = /* @__PURE__ */ __name(() => to(Number), "toNumeric");
const toNumber = /* @__PURE__ */ __name(() => to((input) => new Number(input)), "toNumber");
const toString = /* @__PURE__ */ __name(() => to(String), "toString");
const toUpperCase = /* @__PURE__ */ __name(() => to((val) => val.toUpperCase()), "toUpperCase");
const toLine = /* @__PURE__ */ __name((separator = "\n") => to((i) => i.concat(separator)), "toLine");
const toFixed = /* @__PURE__ */ __name((fd) => {
  const fn = /* @__PURE__ */ __name((fd2) => (input) => new Number(input).toFixed(fd2), "fn");
  const mapper = fn(fd);
  return to(mapper);
}, "toFixed");
const toPrecision = /* @__PURE__ */ __name((precision) => {
  const fn = /* @__PURE__ */ __name((fd) => (input) => new Number(input).toPrecision(fd), "fn");
  const mapper = fn(precision);
  return to(mapper);
}, "toPrecision");
const alphaMap = [
  "o",
  // = 0
  "i",
  // = 1
  "2",
  // = 2
  "e",
  // = 3
  "q",
  // = 4
  "f",
  // = 5
  "s",
  // = 6
  "x",
  // = 7
  "6",
  // = 8
  "n",
  // = 9
  "."
  // = .
];
const toNumAlpha = /* @__PURE__ */ __name(() => map(
  (value) => [...String(value)].map((num) => alphaMap[Number(num)]).join("")
), "toNumAlpha");
const toAlphaNum = /* @__PURE__ */ __name(() => map(
  (value) => Number([...String(value)].map((char) => alphaMap.indexOf(char)).join(""))
), "toAlphaNum");
function demo() {
  let id = 0;
  return new ReadableStream({
    start(ctrl) {
      id = setInterval(() => {
        ctrl.enqueue(Number.MAX_SAFE_INTEGER / Math.random());
      }, 1);
      console.log("started", id);
    },
    cancel() {
      clearInterval(id);
      console.log("cancel", id);
    }
  }).pipeThrough(toPrecision(20)).pipeThrough(toNumAlpha()).pipeThrough(toUpperCase()).pipeThrough(toLine("\n")).pipeThrough(
    map((val) => {
      document.body.innerHTML = `<h1 style="margin:20px"><code>${val}</code></h1>`;
      return val;
    })
  );
}
__name(demo, "demo");
export {
  demo,
  newNumber,
  to,
  toAlphaNum,
  toFixed,
  toLine,
  toNumAlpha,
  toNumber,
  toNumeric,
  toPrecision,
  toString,
  toUpperCase
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vdHJhbnNmb3JtL3RvLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgdHlwZSB7IElPRnVuY3Rpb24sIFRyYW5zZm9ybSB9IGZyb20gXCIuLi90eXBlcy50c1wiO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSBcIi4vbWFwLnRzXCI7XG5cbmV4cG9ydCBjb25zdCB0byA9IDxJLCBPPihcbiAgZnVuYzogSU9GdW5jdGlvbjxJLCBPPixcbik6IFRyYW5zZm9ybTxJLCBPPiA9PiBtYXAoZnVuYyk7XG5cbmV4cG9ydCBjb25zdCBuZXdOdW1iZXIgPSA8VD4oaW5wdXQ6IFQpID0+IG5ldyBOdW1iZXIoaW5wdXQpO1xuZXhwb3J0IGNvbnN0IHRvTnVtZXJpYyA9IDxJPigpID0+IHRvKE51bWJlcik7XG5leHBvcnQgY29uc3QgdG9OdW1iZXIgPSA8ST4oKSA9PiB0bygoaW5wdXQ6IEkpID0+IG5ldyBOdW1iZXIoaW5wdXQpKTtcbmV4cG9ydCBjb25zdCB0b1N0cmluZyA9IDxJPigpID0+IHRvPEksIHN0cmluZz4oU3RyaW5nKTtcbmV4cG9ydCBjb25zdCB0b1VwcGVyQ2FzZSA9IDxJIGV4dGVuZHMgc3RyaW5nPigpID0+XG4gIHRvPEksIHN0cmluZz4oKHZhbCkgPT4gdmFsLnRvVXBwZXJDYXNlKCkpO1xuXG5leHBvcnQgY29uc3QgdG9MaW5lID0gPEkgZXh0ZW5kcyBzdHJpbmc+KHNlcGFyYXRvciA9IFwiXFxuXCIpID0+XG4gIHRvKChpOiBJKSA9PiBpLmNvbmNhdChzZXBhcmF0b3IpKTtcblxuZXhwb3J0IGNvbnN0IHRvRml4ZWQgPSA8ST4oZmQ/OiBudW1iZXIpID0+IHtcbiAgY29uc3QgZm4gPSAoZmQ/OiBudW1iZXIpID0+IDxUPihpbnB1dDogVCkgPT4gKG5ldyBOdW1iZXIoaW5wdXQpKS50b0ZpeGVkKGZkKTtcbiAgY29uc3QgbWFwcGVyID0gZm4oZmQpPEk+O1xuXG4gIHJldHVybiB0byhtYXBwZXIpO1xufTtcblxuZXhwb3J0IGNvbnN0IHRvUHJlY2lzaW9uID0gPEk+KHByZWNpc2lvbj86IG51bWJlcikgPT4ge1xuICBjb25zdCBmbiA9IChmZD86IG51bWJlcikgPT4gPFQ+KGlucHV0OiBUKSA9PlxuICAgIChuZXcgTnVtYmVyKGlucHV0KSkudG9QcmVjaXNpb24oZmQpO1xuICBjb25zdCBtYXBwZXIgPSBmbihwcmVjaXNpb24pPEk+O1xuXG4gIHJldHVybiB0byhtYXBwZXIpO1xufTtcblxuY29uc3QgYWxwaGFNYXA6IFtzdHJpbmcsIC4uLnN0cmluZ1tdXSA9IFtcbiAgXCJvXCIsIC8vID0gMFxuICBcImlcIiwgLy8gPSAxXG4gIFwiMlwiLCAvLyA9IDJcbiAgXCJlXCIsIC8vID0gM1xuICBcInFcIiwgLy8gPSA0XG4gIFwiZlwiLCAvLyA9IDVcbiAgXCJzXCIsIC8vID0gNlxuICBcInhcIiwgLy8gPSA3XG4gIFwiNlwiLCAvLyA9IDhcbiAgXCJuXCIsIC8vID0gOVxuICBcIi5cIiwgLy8gPSAuXG5dO1xuXG5leHBvcnQgY29uc3QgdG9OdW1BbHBoYSA9IDxUIGV4dGVuZHMgbnVtYmVyIHwgc3RyaW5nPigpID0+XG4gIG1hcDxULCBzdHJpbmc+KCh2YWx1ZSkgPT5cbiAgICBbLi4uU3RyaW5nKHZhbHVlKV0ubWFwKChudW0pID0+IGFscGhhTWFwW051bWJlcihudW0pXSkuam9pbihcIlwiKVxuICApO1xuXG5leHBvcnQgY29uc3QgdG9BbHBoYU51bSA9IDxUIGV4dGVuZHMgc3RyaW5nIHwgbnVtYmVyPigpID0+XG4gIG1hcDxULCBudW1iZXI+KCh2YWx1ZSkgPT5cbiAgICBOdW1iZXIoWy4uLlN0cmluZyh2YWx1ZSldLm1hcCgoY2hhcikgPT4gYWxwaGFNYXAuaW5kZXhPZihjaGFyKSkuam9pbihcIlwiKSlcbiAgKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlbW8oKSB7XG4gIGxldCBpZCA9IDA7XG4gIHJldHVybiBuZXcgUmVhZGFibGVTdHJlYW08bnVtYmVyPih7XG4gICAgc3RhcnQoY3RybCkge1xuICAgICAgaWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGN0cmwuZW5xdWV1ZShOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiAvIE1hdGgucmFuZG9tKCkpO1xuICAgICAgfSwgMSk7XG5cbiAgICAgIGNvbnNvbGUubG9nKFwic3RhcnRlZFwiLCBpZCk7XG5cbiAgICAgIC8vICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmlkKTtcbiAgICAgIC8vICAgfSwgNTAwMCk7XG4gICAgfSxcbiAgICBjYW5jZWwoKSB7XG4gICAgICBjbGVhckludGVydmFsKGlkKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2FuY2VsXCIsIGlkKTtcbiAgICB9LFxuICB9KVxuICAgIC5waXBlVGhyb3VnaCh0b1ByZWNpc2lvbigyMCkpXG4gICAgLnBpcGVUaHJvdWdoKHRvTnVtQWxwaGEoKSlcbiAgICAucGlwZVRocm91Z2godG9VcHBlckNhc2UoKSlcbiAgICAucGlwZVRocm91Z2godG9MaW5lKFwiXFxuXCIpKVxuICAgIC5waXBlVGhyb3VnaChcbiAgICAgIG1hcCgodmFsKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuaW5uZXJIVE1MID1cbiAgICAgICAgICBgPGgxIHN0eWxlPVwibWFyZ2luOjIwcHhcIj48Y29kZT4ke3ZhbH08L2NvZGU+PC9oMT5gO1xuICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgfSksXG4gICAgKTtcbiAgLy8gLnBpcGVUaHJvdWdoKHRvKHBhcnNlRmxvYXQpKTtcbiAgLy8gLnBpcGVUaHJvdWdoKHRvU3RyaW5nKCkpO1xuICAvLyAucGlwZVRocm91Z2godG8oKGMpID0+IFsuLi5jXSkpO1xuICAvLyAucGlwZVRocm91Z2godG9OdW1iZXIoKSlcbiAgLy8gLnBpcGVUaHJvdWdoKHRvRml4ZWQoMikpXG4gIC8vIC5waXBlVGhyb3VnaCh0b0xpbmUoKSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUNBLFNBQVMsV0FBVztBQUViLE1BQU0sS0FB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
