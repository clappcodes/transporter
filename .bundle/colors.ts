var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const { Deno } = globalThis;
const noColor = typeof Deno?.noColor === "boolean" ? Deno.noColor : false;
let enabled = !noColor;
function setColorEnabled(value) {
  if (Deno?.noColor) {
    return;
  }
  enabled = value;
}
__name(setColorEnabled, "setColorEnabled");
function getColorEnabled() {
  return enabled;
}
__name(getColorEnabled, "getColorEnabled");
function code(open, close) {
  return {
    open: `\x1B[${open.join(";")}m`,
    close: `\x1B[${close}m`,
    regexp: new RegExp(`\\x1b\\[${close}m`, "g")
  };
}
__name(code, "code");
function run(str, code2) {
  return enabled ? `${code2.open}${str.replace(code2.regexp, code2.open)}${code2.close}` : str;
}
__name(run, "run");
function reset(str) {
  return run(str, code([0], 0));
}
__name(reset, "reset");
function bold(str) {
  return run(str, code([1], 22));
}
__name(bold, "bold");
function dim(str) {
  return run(str, code([2], 22));
}
__name(dim, "dim");
function italic(str) {
  return run(str, code([3], 23));
}
__name(italic, "italic");
function underline(str) {
  return run(str, code([4], 24));
}
__name(underline, "underline");
function inverse(str) {
  return run(str, code([7], 27));
}
__name(inverse, "inverse");
function hidden(str) {
  return run(str, code([8], 28));
}
__name(hidden, "hidden");
function strikethrough(str) {
  return run(str, code([9], 29));
}
__name(strikethrough, "strikethrough");
function black(str) {
  return run(str, code([30], 39));
}
__name(black, "black");
function red(str) {
  return run(str, code([31], 39));
}
__name(red, "red");
function green(str) {
  return run(str, code([32], 39));
}
__name(green, "green");
function yellow(str) {
  return run(str, code([33], 39));
}
__name(yellow, "yellow");
function blue(str) {
  return run(str, code([34], 39));
}
__name(blue, "blue");
function magenta(str) {
  return run(str, code([35], 39));
}
__name(magenta, "magenta");
function cyan(str) {
  return run(str, code([36], 39));
}
__name(cyan, "cyan");
function white(str) {
  return run(str, code([37], 39));
}
__name(white, "white");
function gray(str) {
  return brightBlack(str);
}
__name(gray, "gray");
function brightBlack(str) {
  return run(str, code([90], 39));
}
__name(brightBlack, "brightBlack");
function brightRed(str) {
  return run(str, code([91], 39));
}
__name(brightRed, "brightRed");
function brightGreen(str) {
  return run(str, code([92], 39));
}
__name(brightGreen, "brightGreen");
function brightYellow(str) {
  return run(str, code([93], 39));
}
__name(brightYellow, "brightYellow");
function brightBlue(str) {
  return run(str, code([94], 39));
}
__name(brightBlue, "brightBlue");
function brightMagenta(str) {
  return run(str, code([95], 39));
}
__name(brightMagenta, "brightMagenta");
function brightCyan(str) {
  return run(str, code([96], 39));
}
__name(brightCyan, "brightCyan");
function brightWhite(str) {
  return run(str, code([97], 39));
}
__name(brightWhite, "brightWhite");
function bgBlack(str) {
  return run(str, code([40], 49));
}
__name(bgBlack, "bgBlack");
function bgRed(str) {
  return run(str, code([41], 49));
}
__name(bgRed, "bgRed");
function bgGreen(str) {
  return run(str, code([42], 49));
}
__name(bgGreen, "bgGreen");
function bgYellow(str) {
  return run(str, code([43], 49));
}
__name(bgYellow, "bgYellow");
function bgBlue(str) {
  return run(str, code([44], 49));
}
__name(bgBlue, "bgBlue");
function bgMagenta(str) {
  return run(str, code([45], 49));
}
__name(bgMagenta, "bgMagenta");
function bgCyan(str) {
  return run(str, code([46], 49));
}
__name(bgCyan, "bgCyan");
function bgWhite(str) {
  return run(str, code([47], 49));
}
__name(bgWhite, "bgWhite");
function bgBrightBlack(str) {
  return run(str, code([100], 49));
}
__name(bgBrightBlack, "bgBrightBlack");
function bgBrightRed(str) {
  return run(str, code([101], 49));
}
__name(bgBrightRed, "bgBrightRed");
function bgBrightGreen(str) {
  return run(str, code([102], 49));
}
__name(bgBrightGreen, "bgBrightGreen");
function bgBrightYellow(str) {
  return run(str, code([103], 49));
}
__name(bgBrightYellow, "bgBrightYellow");
function bgBrightBlue(str) {
  return run(str, code([104], 49));
}
__name(bgBrightBlue, "bgBrightBlue");
function bgBrightMagenta(str) {
  return run(str, code([105], 49));
}
__name(bgBrightMagenta, "bgBrightMagenta");
function bgBrightCyan(str) {
  return run(str, code([106], 49));
}
__name(bgBrightCyan, "bgBrightCyan");
function bgBrightWhite(str) {
  return run(str, code([107], 49));
}
__name(bgBrightWhite, "bgBrightWhite");
function clampAndTruncate(n, max = 255, min = 0) {
  return Math.trunc(Math.max(Math.min(n, max), min));
}
__name(clampAndTruncate, "clampAndTruncate");
function rgb8(str, color) {
  return run(str, code([38, 5, clampAndTruncate(color)], 39));
}
__name(rgb8, "rgb8");
function bgRgb8(str, color) {
  return run(str, code([48, 5, clampAndTruncate(color)], 49));
}
__name(bgRgb8, "bgRgb8");
function rgb24(str, color) {
  if (typeof color === "number") {
    return run(
      str,
      code(
        [38, 2, color >> 16 & 255, color >> 8 & 255, color & 255],
        39
      )
    );
  }
  return run(
    str,
    code(
      [
        38,
        2,
        clampAndTruncate(color.r),
        clampAndTruncate(color.g),
        clampAndTruncate(color.b)
      ],
      39
    )
  );
}
__name(rgb24, "rgb24");
function bgRgb24(str, color) {
  if (typeof color === "number") {
    return run(
      str,
      code(
        [48, 2, color >> 16 & 255, color >> 8 & 255, color & 255],
        49
      )
    );
  }
  return run(
    str,
    code(
      [
        48,
        2,
        clampAndTruncate(color.r),
        clampAndTruncate(color.g),
        clampAndTruncate(color.b)
      ],
      49
    )
  );
}
__name(bgRgb24, "bgRgb24");
const ANSI_PATTERN = new RegExp(
  [
    "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
    "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TXZcf-nq-uy=><~]))"
  ].join("|"),
  "g"
);
function stripColor(string) {
  return stripAnsiCode(string);
}
__name(stripColor, "stripColor");
function stripAnsiCode(string) {
  return string.replace(ANSI_PATTERN, "");
}
__name(stripAnsiCode, "stripAnsiCode");
export {
  bgBlack,
  bgBlue,
  bgBrightBlack,
  bgBrightBlue,
  bgBrightCyan,
  bgBrightGreen,
  bgBrightMagenta,
  bgBrightRed,
  bgBrightWhite,
  bgBrightYellow,
  bgCyan,
  bgGreen,
  bgMagenta,
  bgRed,
  bgRgb24,
  bgRgb8,
  bgWhite,
  bgYellow,
  black,
  blue,
  bold,
  brightBlack,
  brightBlue,
  brightCyan,
  brightGreen,
  brightMagenta,
  brightRed,
  brightWhite,
  brightYellow,
  cyan,
  dim,
  getColorEnabled,
  gray,
  green,
  hidden,
  inverse,
  italic,
  magenta,
  red,
  reset,
  rgb24,
  rgb8,
  setColorEnabled,
  strikethrough,
  stripAnsiCode,
  stripColor,
  underline,
  white,
  yellow
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY29sb3JzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDI0IHRoZSBEZW5vIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIE1JVCBsaWNlbnNlLlxuLy8gVGhpcyBtb2R1bGUgaXMgYnJvd3NlciBjb21wYXRpYmxlLlxuLy8gQSBtb2R1bGUgdG8gcHJpbnQgQU5TSSB0ZXJtaW5hbCBjb2xvcnMuIEluc3BpcmVkIGJ5IGNoYWxrLCBrbGV1ciwgYW5kIGNvbG9yc1xuLy8gb24gbnBtLlxuXG4vKipcbiAqIFN0cmluZyBmb3JtYXR0ZXJzIGFuZCB1dGlsaXRpZXMgZm9yIGRlYWxpbmcgd2l0aCBBTlNJIGNvbG9yIGNvZGVzLlxuICpcbiAqIFRoaXMgbW9kdWxlIGlzIGJyb3dzZXIgY29tcGF0aWJsZS5cbiAqXG4gKiBUaGlzIG1vZHVsZSBzdXBwb3J0cyBgTk9fQ09MT1JgIGVudmlyb25tZW50YWwgdmFyaWFibGUgZGlzYWJsaW5nIGFueSBjb2xvcmluZ1xuICogaWYgYE5PX0NPTE9SYCBpcyBzZXQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHRzXG4gKiBpbXBvcnQge1xuICogICBiZ0JsdWUsXG4gKiAgIGJnUmdiMjQsXG4gKiAgIGJnUmdiOCxcbiAqICAgYm9sZCxcbiAqICAgaXRhbGljLFxuICogICByZWQsXG4gKiAgIHJnYjI0LFxuICogICByZ2I4LFxuICogfSBmcm9tIFwiQHN0ZC9mbXQvY29sb3JzXCI7XG4gKlxuICogY29uc29sZS5sb2coYmdCbHVlKGl0YWxpYyhyZWQoYm9sZChcIkhlbGxvLCBXb3JsZCFcIikpKSkpO1xuICpcbiAqIC8vIGFsc28gc3VwcG9ydHMgOGJpdCBjb2xvcnNcbiAqXG4gKiBjb25zb2xlLmxvZyhyZ2I4KFwiSGVsbG8sIFdvcmxkIVwiLCA0MikpO1xuICpcbiAqIGNvbnNvbGUubG9nKGJnUmdiOChcIkhlbGxvLCBXb3JsZCFcIiwgNDIpKTtcbiAqXG4gKiAvLyBhbmQgMjRiaXQgcmdiXG4gKlxuICogY29uc29sZS5sb2cocmdiMjQoXCJIZWxsbywgV29ybGQhXCIsIHtcbiAqICAgcjogNDEsXG4gKiAgIGc6IDQyLFxuICogICBiOiA0MyxcbiAqIH0pKTtcbiAqXG4gKiBjb25zb2xlLmxvZyhiZ1JnYjI0KFwiSGVsbG8sIFdvcmxkIVwiLCB7XG4gKiAgIHI6IDQxLFxuICogICBnOiA0MixcbiAqICAgYjogNDMsXG4gKiB9KSk7XG4gKiBgYGBcbiAqXG4gKiBAbW9kdWxlXG4gKi9cblxuLy8gZGVuby1saW50LWlnbm9yZSBuby1leHBsaWNpdC1hbnlcbmNvbnN0IHsgRGVubyB9ID0gZ2xvYmFsVGhpcyBhcyBhbnk7XG5jb25zdCBub0NvbG9yID0gdHlwZW9mIERlbm8/Lm5vQ29sb3IgPT09IFwiYm9vbGVhblwiXG4gID8gRGVuby5ub0NvbG9yIGFzIGJvb2xlYW5cbiAgOiBmYWxzZTtcblxuaW50ZXJmYWNlIENvZGUge1xuICBvcGVuOiBzdHJpbmc7XG4gIGNsb3NlOiBzdHJpbmc7XG4gIHJlZ2V4cDogUmVnRXhwO1xufVxuXG4vKiogUkdCIDgtYml0cyBwZXIgY2hhbm5lbC4gRWFjaCBpbiByYW5nZSBgMC0+MjU1YCBvciBgMHgwMC0+MHhmZmAgKi9cbmV4cG9ydCBpbnRlcmZhY2UgUmdiIHtcbiAgLyoqIFJlZCBjb21wb25lbnQgdmFsdWUgKi9cbiAgcjogbnVtYmVyO1xuICAvKiogR3JlZW4gY29tcG9uZW50IHZhbHVlICovXG4gIGc6IG51bWJlcjtcbiAgLyoqIEJsdWUgY29tcG9uZW50IHZhbHVlICovXG4gIGI6IG51bWJlcjtcbn1cblxubGV0IGVuYWJsZWQgPSAhbm9Db2xvcjtcblxuLyoqXG4gKiBTZXQgY2hhbmdpbmcgdGV4dCBjb2xvciB0byBlbmFibGVkIG9yIGRpc2FibGVkXG4gKiBAcGFyYW0gdmFsdWVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNldENvbG9yRW5hYmxlZCh2YWx1ZTogYm9vbGVhbikge1xuICBpZiAoRGVubz8ubm9Db2xvcikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGVuYWJsZWQgPSB2YWx1ZTtcbn1cblxuLyoqIEdldCB3aGV0aGVyIHRleHQgY29sb3IgY2hhbmdlIGlzIGVuYWJsZWQgb3IgZGlzYWJsZWQuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29sb3JFbmFibGVkKCk6IGJvb2xlYW4ge1xuICByZXR1cm4gZW5hYmxlZDtcbn1cblxuLyoqXG4gKiBCdWlsZHMgY29sb3IgY29kZVxuICogQHBhcmFtIG9wZW5cbiAqIEBwYXJhbSBjbG9zZVxuICovXG5mdW5jdGlvbiBjb2RlKG9wZW46IG51bWJlcltdLCBjbG9zZTogbnVtYmVyKTogQ29kZSB7XG4gIHJldHVybiB7XG4gICAgb3BlbjogYFxceDFiWyR7b3Blbi5qb2luKFwiO1wiKX1tYCxcbiAgICBjbG9zZTogYFxceDFiWyR7Y2xvc2V9bWAsXG4gICAgcmVnZXhwOiBuZXcgUmVnRXhwKGBcXFxceDFiXFxcXFske2Nsb3NlfW1gLCBcImdcIiksXG4gIH07XG59XG5cbi8qKlxuICogQXBwbGllcyBjb2xvciBhbmQgYmFja2dyb3VuZCBiYXNlZCBvbiBjb2xvciBjb2RlIGFuZCBpdHMgYXNzb2NpYXRlZCB0ZXh0XG4gKiBAcGFyYW0gc3RyIHRleHQgdG8gYXBwbHkgY29sb3Igc2V0dGluZ3MgdG9cbiAqIEBwYXJhbSBjb2RlIGNvbG9yIGNvZGUgdG8gYXBwbHlcbiAqL1xuZnVuY3Rpb24gcnVuKHN0cjogc3RyaW5nLCBjb2RlOiBDb2RlKTogc3RyaW5nIHtcbiAgcmV0dXJuIGVuYWJsZWRcbiAgICA/IGAke2NvZGUub3Blbn0ke3N0ci5yZXBsYWNlKGNvZGUucmVnZXhwLCBjb2RlLm9wZW4pfSR7Y29kZS5jbG9zZX1gXG4gICAgOiBzdHI7XG59XG5cbi8qKlxuICogUmVzZXQgdGhlIHRleHQgbW9kaWZpZWQuXG4gKiBAcGFyYW0gc3RyIHRleHQgdG8gcmVzZXRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0KHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzBdLCAwKSk7XG59XG5cbi8qKlxuICogTWFrZSB0aGUgdGV4dCBib2xkLlxuICogQHBhcmFtIHN0ciB0ZXh0IHRvIG1ha2UgYm9sZFxuICovXG5leHBvcnQgZnVuY3Rpb24gYm9sZChzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBydW4oc3RyLCBjb2RlKFsxXSwgMjIpKTtcbn1cblxuLyoqXG4gKiBUaGUgdGV4dCBlbWl0cyBvbmx5IGEgc21hbGwgYW1vdW50IG9mIGxpZ2h0LlxuICogQHBhcmFtIHN0ciB0ZXh0IHRvIGRpbVxuICpcbiAqIFdhcm5pbmc6IE5vdCBhbGwgdGVybWluYWwgZW11bGF0b3JzIHN1cHBvcnQgYGRpbWAuXG4gKiBGb3IgY29tcGF0aWJpbGl0eSBhY3Jvc3MgYWxsIHRlcm1pbmFscywgdXNlIHtAbGlua2NvZGUgZ3JheX0gb3Ige0BsaW5rY29kZSBicmlnaHRCbGFja30gaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRpbShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBydW4oc3RyLCBjb2RlKFsyXSwgMjIpKTtcbn1cblxuLyoqXG4gKiBNYWtlIHRoZSB0ZXh0IGl0YWxpYy5cbiAqIEBwYXJhbSBzdHIgdGV4dCB0byBtYWtlIGl0YWxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gaXRhbGljKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzNdLCAyMykpO1xufVxuXG4vKipcbiAqIE1ha2UgdGhlIHRleHQgdW5kZXJsaW5lLlxuICogQHBhcmFtIHN0ciB0ZXh0IHRvIHVuZGVybGluZVxuICovXG5leHBvcnQgZnVuY3Rpb24gdW5kZXJsaW5lKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzRdLCAyNCkpO1xufVxuXG4vKipcbiAqIEludmVydCBiYWNrZ3JvdW5kIGNvbG9yIGFuZCB0ZXh0IGNvbG9yLlxuICogQHBhcmFtIHN0ciB0ZXh0IHRvIGludmVydCBpdHMgY29sb3JcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGludmVyc2Uoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcnVuKHN0ciwgY29kZShbN10sIDI3KSk7XG59XG5cbi8qKlxuICogTWFrZSB0aGUgdGV4dCBoaWRkZW4uXG4gKiBAcGFyYW0gc3RyIHRleHQgdG8gaGlkZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaGlkZGVuKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzhdLCAyOCkpO1xufVxuXG4vKipcbiAqIFB1dCBob3Jpem9udGFsIGxpbmUgdGhyb3VnaCB0aGUgY2VudGVyIG9mIHRoZSB0ZXh0LlxuICogQHBhcmFtIHN0ciB0ZXh0IHRvIHN0cmlrZSB0aHJvdWdoXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpa2V0aHJvdWdoKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzldLCAyOSkpO1xufVxuXG4vKipcbiAqIFNldCB0ZXh0IGNvbG9yIHRvIGJsYWNrLlxuICogQHBhcmFtIHN0ciB0ZXh0IHRvIG1ha2UgYmxhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJsYWNrKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzMwXSwgMzkpKTtcbn1cblxuLyoqXG4gKiBTZXQgdGV4dCBjb2xvciB0byByZWQuXG4gKiBAcGFyYW0gc3RyIHRleHQgdG8gbWFrZSByZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZChzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBydW4oc3RyLCBjb2RlKFszMV0sIDM5KSk7XG59XG5cbi8qKlxuICogU2V0IHRleHQgY29sb3IgdG8gZ3JlZW4uXG4gKiBAcGFyYW0gc3RyIHRleHQgdG8gbWFrZSBncmVlblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ3JlZW4oc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcnVuKHN0ciwgY29kZShbMzJdLCAzOSkpO1xufVxuXG4vKipcbiAqIFNldCB0ZXh0IGNvbG9yIHRvIHllbGxvdy5cbiAqIEBwYXJhbSBzdHIgdGV4dCB0byBtYWtlIHllbGxvd1xuICovXG5leHBvcnQgZnVuY3Rpb24geWVsbG93KHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzMzXSwgMzkpKTtcbn1cblxuLyoqXG4gKiBTZXQgdGV4dCBjb2xvciB0byBibHVlLlxuICogQHBhcmFtIHN0ciB0ZXh0IHRvIG1ha2UgYmx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmx1ZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBydW4oc3RyLCBjb2RlKFszNF0sIDM5KSk7XG59XG5cbi8qKlxuICogU2V0IHRleHQgY29sb3IgdG8gbWFnZW50YS5cbiAqIEBwYXJhbSBzdHIgdGV4dCB0byBtYWtlIG1hZ2VudGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1hZ2VudGEoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcnVuKHN0ciwgY29kZShbMzVdLCAzOSkpO1xufVxuXG4vKipcbiAqIFNldCB0ZXh0IGNvbG9yIHRvIGN5YW4uXG4gKiBAcGFyYW0gc3RyIHRleHQgdG8gbWFrZSBjeWFuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjeWFuKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzM2XSwgMzkpKTtcbn1cblxuLyoqXG4gKiBTZXQgdGV4dCBjb2xvciB0byB3aGl0ZS5cbiAqIEBwYXJhbSBzdHIgdGV4dCB0byBtYWtlIHdoaXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB3aGl0ZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBydW4oc3RyLCBjb2RlKFszN10sIDM5KSk7XG59XG5cbi8qKlxuICogU2V0IHRleHQgY29sb3IgdG8gZ3JheS5cbiAqIEBwYXJhbSBzdHIgdGV4dCB0byBtYWtlIGdyYXlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdyYXkoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gYnJpZ2h0QmxhY2soc3RyKTtcbn1cblxuLyoqXG4gKiBTZXQgdGV4dCBjb2xvciB0byBicmlnaHQgYmxhY2suXG4gKiBAcGFyYW0gc3RyIHRleHQgdG8gbWFrZSBicmlnaHQtYmxhY2tcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJyaWdodEJsYWNrKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzkwXSwgMzkpKTtcbn1cblxuLyoqXG4gKiBTZXQgdGV4dCBjb2xvciB0byBicmlnaHQgcmVkLlxuICogQHBhcmFtIHN0ciB0ZXh0IHRvIG1ha2UgYnJpZ2h0LXJlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gYnJpZ2h0UmVkKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzkxXSwgMzkpKTtcbn1cblxuLyoqXG4gKiBTZXQgdGV4dCBjb2xvciB0byBicmlnaHQgZ3JlZW4uXG4gKiBAcGFyYW0gc3RyIHRleHQgdG8gbWFrZSBicmlnaHQtZ3JlZW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJyaWdodEdyZWVuKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzkyXSwgMzkpKTtcbn1cblxuLyoqXG4gKiBTZXQgdGV4dCBjb2xvciB0byBicmlnaHQgeWVsbG93LlxuICogQHBhcmFtIHN0ciB0ZXh0IHRvIG1ha2UgYnJpZ2h0LXllbGxvd1xuICovXG5leHBvcnQgZnVuY3Rpb24gYnJpZ2h0WWVsbG93KHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzkzXSwgMzkpKTtcbn1cblxuLyoqXG4gKiBTZXQgdGV4dCBjb2xvciB0byBicmlnaHQgYmx1ZS5cbiAqIEBwYXJhbSBzdHIgdGV4dCB0byBtYWtlIGJyaWdodC1ibHVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBicmlnaHRCbHVlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzk0XSwgMzkpKTtcbn1cblxuLyoqXG4gKiBTZXQgdGV4dCBjb2xvciB0byBicmlnaHQgbWFnZW50YS5cbiAqIEBwYXJhbSBzdHIgdGV4dCB0byBtYWtlIGJyaWdodC1tYWdlbnRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBicmlnaHRNYWdlbnRhKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzk1XSwgMzkpKTtcbn1cblxuLyoqXG4gKiBTZXQgdGV4dCBjb2xvciB0byBicmlnaHQgY3lhbi5cbiAqIEBwYXJhbSBzdHIgdGV4dCB0byBtYWtlIGJyaWdodC1jeWFuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBicmlnaHRDeWFuKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzk2XSwgMzkpKTtcbn1cblxuLyoqXG4gKiBTZXQgdGV4dCBjb2xvciB0byBicmlnaHQgd2hpdGUuXG4gKiBAcGFyYW0gc3RyIHRleHQgdG8gbWFrZSBicmlnaHQtd2hpdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJyaWdodFdoaXRlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzk3XSwgMzkpKTtcbn1cblxuLyoqXG4gKiBTZXQgYmFja2dyb3VuZCBjb2xvciB0byBibGFjay5cbiAqIEBwYXJhbSBzdHIgdGV4dCB0byBtYWtlIGl0cyBiYWNrZ3JvdW5kIGJsYWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZ0JsYWNrKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzQwXSwgNDkpKTtcbn1cblxuLyoqXG4gKiBTZXQgYmFja2dyb3VuZCBjb2xvciB0byByZWQuXG4gKiBAcGFyYW0gc3RyIHRleHQgdG8gbWFrZSBpdHMgYmFja2dyb3VuZCByZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJnUmVkKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzQxXSwgNDkpKTtcbn1cblxuLyoqXG4gKiBTZXQgYmFja2dyb3VuZCBjb2xvciB0byBncmVlbi5cbiAqIEBwYXJhbSBzdHIgdGV4dCB0byBtYWtlIGl0cyBiYWNrZ3JvdW5kIGdyZWVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZ0dyZWVuKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzQyXSwgNDkpKTtcbn1cblxuLyoqXG4gKiBTZXQgYmFja2dyb3VuZCBjb2xvciB0byB5ZWxsb3cuXG4gKiBAcGFyYW0gc3RyIHRleHQgdG8gbWFrZSBpdHMgYmFja2dyb3VuZCB5ZWxsb3dcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJnWWVsbG93KHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzQzXSwgNDkpKTtcbn1cblxuLyoqXG4gKiBTZXQgYmFja2dyb3VuZCBjb2xvciB0byBibHVlLlxuICogQHBhcmFtIHN0ciB0ZXh0IHRvIG1ha2UgaXRzIGJhY2tncm91bmQgYmx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmdCbHVlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzQ0XSwgNDkpKTtcbn1cblxuLyoqXG4gKiAgU2V0IGJhY2tncm91bmQgY29sb3IgdG8gbWFnZW50YS5cbiAqIEBwYXJhbSBzdHIgdGV4dCB0byBtYWtlIGl0cyBiYWNrZ3JvdW5kIG1hZ2VudGFcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJnTWFnZW50YShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBydW4oc3RyLCBjb2RlKFs0NV0sIDQ5KSk7XG59XG5cbi8qKlxuICogU2V0IGJhY2tncm91bmQgY29sb3IgdG8gY3lhbi5cbiAqIEBwYXJhbSBzdHIgdGV4dCB0byBtYWtlIGl0cyBiYWNrZ3JvdW5kIGN5YW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJnQ3lhbihzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBydW4oc3RyLCBjb2RlKFs0Nl0sIDQ5KSk7XG59XG5cbi8qKlxuICogU2V0IGJhY2tncm91bmQgY29sb3IgdG8gd2hpdGUuXG4gKiBAcGFyYW0gc3RyIHRleHQgdG8gbWFrZSBpdHMgYmFja2dyb3VuZCB3aGl0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmdXaGl0ZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBydW4oc3RyLCBjb2RlKFs0N10sIDQ5KSk7XG59XG5cbi8qKlxuICogU2V0IGJhY2tncm91bmQgY29sb3IgdG8gYnJpZ2h0IGJsYWNrLlxuICogQHBhcmFtIHN0ciB0ZXh0IHRvIG1ha2UgaXRzIGJhY2tncm91bmQgYnJpZ2h0LWJsYWNrXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZ0JyaWdodEJsYWNrKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzEwMF0sIDQ5KSk7XG59XG5cbi8qKlxuICogU2V0IGJhY2tncm91bmQgY29sb3IgdG8gYnJpZ2h0IHJlZC5cbiAqIEBwYXJhbSBzdHIgdGV4dCB0byBtYWtlIGl0cyBiYWNrZ3JvdW5kIGJyaWdodC1yZWRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJnQnJpZ2h0UmVkKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzEwMV0sIDQ5KSk7XG59XG5cbi8qKlxuICogU2V0IGJhY2tncm91bmQgY29sb3IgdG8gYnJpZ2h0IGdyZWVuLlxuICogQHBhcmFtIHN0ciB0ZXh0IHRvIG1ha2UgaXRzIGJhY2tncm91bmQgYnJpZ2h0LWdyZWVuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZ0JyaWdodEdyZWVuKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzEwMl0sIDQ5KSk7XG59XG5cbi8qKlxuICogU2V0IGJhY2tncm91bmQgY29sb3IgdG8gYnJpZ2h0IHllbGxvdy5cbiAqIEBwYXJhbSBzdHIgdGV4dCB0byBtYWtlIGl0cyBiYWNrZ3JvdW5kIGJyaWdodC15ZWxsb3dcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJnQnJpZ2h0WWVsbG93KHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzEwM10sIDQ5KSk7XG59XG5cbi8qKlxuICogU2V0IGJhY2tncm91bmQgY29sb3IgdG8gYnJpZ2h0IGJsdWUuXG4gKiBAcGFyYW0gc3RyIHRleHQgdG8gbWFrZSBpdHMgYmFja2dyb3VuZCBicmlnaHQtYmx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmdCcmlnaHRCbHVlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzEwNF0sIDQ5KSk7XG59XG5cbi8qKlxuICogU2V0IGJhY2tncm91bmQgY29sb3IgdG8gYnJpZ2h0IG1hZ2VudGEuXG4gKiBAcGFyYW0gc3RyIHRleHQgdG8gbWFrZSBpdHMgYmFja2dyb3VuZCBicmlnaHQtbWFnZW50YVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmdCcmlnaHRNYWdlbnRhKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzEwNV0sIDQ5KSk7XG59XG5cbi8qKlxuICogU2V0IGJhY2tncm91bmQgY29sb3IgdG8gYnJpZ2h0IGN5YW4uXG4gKiBAcGFyYW0gc3RyIHRleHQgdG8gbWFrZSBpdHMgYmFja2dyb3VuZCBicmlnaHQtY3lhblxuICovXG5leHBvcnQgZnVuY3Rpb24gYmdCcmlnaHRDeWFuKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzEwNl0sIDQ5KSk7XG59XG5cbi8qKlxuICogU2V0IGJhY2tncm91bmQgY29sb3IgdG8gYnJpZ2h0IHdoaXRlLlxuICogQHBhcmFtIHN0ciB0ZXh0IHRvIG1ha2UgaXRzIGJhY2tncm91bmQgYnJpZ2h0LXdoaXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBiZ0JyaWdodFdoaXRlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzEwN10sIDQ5KSk7XG59XG5cbi8qIFNwZWNpYWwgQ29sb3IgU2VxdWVuY2VzICovXG5cbi8qKlxuICogQ2xhbSBhbmQgdHJ1bmNhdGUgY29sb3IgY29kZXNcbiAqIEBwYXJhbSBuXG4gKiBAcGFyYW0gbWF4IG51bWJlciB0byB0cnVuY2F0ZSB0b1xuICogQHBhcmFtIG1pbiBudW1iZXIgdG8gdHJ1bmNhdGUgZnJvbVxuICovXG5mdW5jdGlvbiBjbGFtcEFuZFRydW5jYXRlKG46IG51bWJlciwgbWF4ID0gMjU1LCBtaW4gPSAwKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGgudHJ1bmMoTWF0aC5tYXgoTWF0aC5taW4obiwgbWF4KSwgbWluKSk7XG59XG5cbi8qKlxuICogU2V0IHRleHQgY29sb3IgdXNpbmcgcGFsZXR0ZWQgOGJpdCBjb2xvcnMuXG4gKiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlIzgtYml0XG4gKiBAcGFyYW0gc3RyIHRleHQgY29sb3IgdG8gYXBwbHkgcGFsZXR0ZWQgOGJpdCBjb2xvcnMgdG9cbiAqIEBwYXJhbSBjb2xvciBjb2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZ2I4KHN0cjogc3RyaW5nLCBjb2xvcjogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIHJ1bihzdHIsIGNvZGUoWzM4LCA1LCBjbGFtcEFuZFRydW5jYXRlKGNvbG9yKV0sIDM5KSk7XG59XG5cbi8qKlxuICogU2V0IGJhY2tncm91bmQgY29sb3IgdXNpbmcgcGFsZXR0ZWQgOGJpdCBjb2xvcnMuXG4gKiBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlIzgtYml0XG4gKiBAcGFyYW0gc3RyIHRleHQgY29sb3IgdG8gYXBwbHkgcGFsZXR0ZWQgOGJpdCBiYWNrZ3JvdW5kIGNvbG9ycyB0b1xuICogQHBhcmFtIGNvbG9yIGNvZGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJnUmdiOChzdHI6IHN0cmluZywgY29sb3I6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBydW4oc3RyLCBjb2RlKFs0OCwgNSwgY2xhbXBBbmRUcnVuY2F0ZShjb2xvcildLCA0OSkpO1xufVxuXG4vKipcbiAqIFNldCB0ZXh0IGNvbG9yIHVzaW5nIDI0Yml0IHJnYi5cbiAqIGBjb2xvcmAgY2FuIGJlIGEgbnVtYmVyIGluIHJhbmdlIGAweDAwMDAwMGAgdG8gYDB4ZmZmZmZmYCBvclxuICogYW4gYFJnYmAuXG4gKlxuICogVG8gcHJvZHVjZSB0aGUgY29sb3IgbWFnZW50YTpcbiAqXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgcmdiMjQgfSBmcm9tIFwiQHN0ZC9mbXQvY29sb3JzXCI7XG4gKlxuICogcmdiMjQoXCJmb29cIiwgMHhmZjAwZmYpO1xuICogcmdiMjQoXCJmb29cIiwge3I6IDI1NSwgZzogMCwgYjogMjU1fSk7XG4gKiBgYGBcbiAqIEBwYXJhbSBzdHIgdGV4dCBjb2xvciB0byBhcHBseSAyNGJpdCByZ2IgdG9cbiAqIEBwYXJhbSBjb2xvciBjb2RlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiByZ2IyNChzdHI6IHN0cmluZywgY29sb3I6IG51bWJlciB8IFJnYik6IHN0cmluZyB7XG4gIGlmICh0eXBlb2YgY29sb3IgPT09IFwibnVtYmVyXCIpIHtcbiAgICByZXR1cm4gcnVuKFxuICAgICAgc3RyLFxuICAgICAgY29kZShcbiAgICAgICAgWzM4LCAyLCAoY29sb3IgPj4gMTYpICYgMHhmZiwgKGNvbG9yID4+IDgpICYgMHhmZiwgY29sb3IgJiAweGZmXSxcbiAgICAgICAgMzksXG4gICAgICApLFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIHJ1bihcbiAgICBzdHIsXG4gICAgY29kZShcbiAgICAgIFtcbiAgICAgICAgMzgsXG4gICAgICAgIDIsXG4gICAgICAgIGNsYW1wQW5kVHJ1bmNhdGUoY29sb3IuciksXG4gICAgICAgIGNsYW1wQW5kVHJ1bmNhdGUoY29sb3IuZyksXG4gICAgICAgIGNsYW1wQW5kVHJ1bmNhdGUoY29sb3IuYiksXG4gICAgICBdLFxuICAgICAgMzksXG4gICAgKSxcbiAgKTtcbn1cblxuLyoqXG4gKiBTZXQgYmFja2dyb3VuZCBjb2xvciB1c2luZyAyNGJpdCByZ2IuXG4gKiBgY29sb3JgIGNhbiBiZSBhIG51bWJlciBpbiByYW5nZSBgMHgwMDAwMDBgIHRvIGAweGZmZmZmZmAgb3JcbiAqIGFuIGBSZ2JgLlxuICpcbiAqIFRvIHByb2R1Y2UgdGhlIGNvbG9yIG1hZ2VudGE6XG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7IGJnUmdiMjQgfSBmcm9tIFwiQHN0ZC9mbXQvY29sb3JzXCI7XG4gKlxuICogYmdSZ2IyNChcImZvb1wiLCAweGZmMDBmZik7XG4gKiBiZ1JnYjI0KFwiZm9vXCIsIHtyOiAyNTUsIGc6IDAsIGI6IDI1NX0pO1xuICogYGBgXG4gKiBAcGFyYW0gc3RyIHRleHQgY29sb3IgdG8gYXBwbHkgMjRiaXQgcmdiIHRvXG4gKiBAcGFyYW0gY29sb3IgY29kZVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmdSZ2IyNChzdHI6IHN0cmluZywgY29sb3I6IG51bWJlciB8IFJnYik6IHN0cmluZyB7XG4gIGlmICh0eXBlb2YgY29sb3IgPT09IFwibnVtYmVyXCIpIHtcbiAgICByZXR1cm4gcnVuKFxuICAgICAgc3RyLFxuICAgICAgY29kZShcbiAgICAgICAgWzQ4LCAyLCAoY29sb3IgPj4gMTYpICYgMHhmZiwgKGNvbG9yID4+IDgpICYgMHhmZiwgY29sb3IgJiAweGZmXSxcbiAgICAgICAgNDksXG4gICAgICApLFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIHJ1bihcbiAgICBzdHIsXG4gICAgY29kZShcbiAgICAgIFtcbiAgICAgICAgNDgsXG4gICAgICAgIDIsXG4gICAgICAgIGNsYW1wQW5kVHJ1bmNhdGUoY29sb3IuciksXG4gICAgICAgIGNsYW1wQW5kVHJ1bmNhdGUoY29sb3IuZyksXG4gICAgICAgIGNsYW1wQW5kVHJ1bmNhdGUoY29sb3IuYiksXG4gICAgICBdLFxuICAgICAgNDksXG4gICAgKSxcbiAgKTtcbn1cblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2NoYWxrL2Fuc2ktcmVnZXgvYmxvYi8wMmZhODkzZDYxOWQzZGE4NTQxMWFjYzhmZDRlMmVlYTBlOTVhOWQ5L2luZGV4LmpzXG5jb25zdCBBTlNJX1BBVFRFUk4gPSBuZXcgUmVnRXhwKFxuICBbXG4gICAgXCJbXFxcXHUwMDFCXFxcXHUwMDlCXVtbXFxcXF0oKSM7P10qKD86KD86KD86KD86O1stYS16QS1aXFxcXGRcXFxcLyMmLjo9PyVAfl9dKykqfFthLXpBLVpcXFxcZF0rKD86O1stYS16QS1aXFxcXGRcXFxcLyMmLjo9PyVAfl9dKikqKT9cXFxcdTAwMDcpXCIsXG4gICAgXCIoPzooPzpcXFxcZHsxLDR9KD86O1xcXFxkezAsNH0pKik/W1xcXFxkQS1QUi1UWFpjZi1ucS11eT0+PH5dKSlcIixcbiAgXS5qb2luKFwifFwiKSxcbiAgXCJnXCIsXG4pO1xuXG4vKipcbiAqIFJlbW92ZSBBTlNJIGVzY2FwZSBjb2RlcyBmcm9tIHRoZSBzdHJpbmcuXG4gKiBAcGFyYW0gc3RyaW5nIHRvIHJlbW92ZSBBTlNJIGVzY2FwZSBjb2RlcyBmcm9tXG4gKlxuICogIEBkZXByZWNhdGVkICh3aWxsIGJlIHJlbW92ZWQgaW4gMS4wLjApIFVzZSB7QGxpbmtjb2RlIHN0cmlwQW5zaUNvZGV9IGluc3RlYWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdHJpcENvbG9yKHN0cmluZzogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHN0cmlwQW5zaUNvZGUoc3RyaW5nKTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgQU5TSSBlc2NhcGUgY29kZXMgZnJvbSB0aGUgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSBzdHJpbmcgdG8gcmVtb3ZlIEFOU0kgZXNjYXBlIGNvZGVzIGZyb21cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0cmlwQW5zaUNvZGUoc3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoQU5TSV9QQVRURVJOLCBcIlwiKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBcURBLE1BQU0sRUFBRSxLQUFLLElBQUk7QUFDakIsTUFBTSxVQUFVLE9BQU8sTUFBTSxZQUFZLFlBQ3JDLEtBQUssVUFDTDtBQWtCSixJQUFJLFVBQVUsQ0FBQztBQU1SLFNBQVMsZ0JBQWdCLE9BQWdCO0FBQzlDLE1BQUksTUFBTSxTQUFTO0FBQ2pCO0FBQUEsRUFDRjtBQUVBLFlBQVU7QUFDWjtBQU5nQjtBQVNULFNBQVMsa0JBQTJCO0FBQ3pDLFNBQU87QUFDVDtBQUZnQjtBQVNoQixTQUFTLEtBQUssTUFBZ0IsT0FBcUI7QUFDakQsU0FBTztBQUFBLElBQ0wsTUFBTSxRQUFRLEtBQUssS0FBSyxHQUFHLENBQUM7QUFBQSxJQUM1QixPQUFPLFFBQVEsS0FBSztBQUFBLElBQ3BCLFFBQVEsSUFBSSxPQUFPLFdBQVcsS0FBSyxLQUFLLEdBQUc7QUFBQSxFQUM3QztBQUNGO0FBTlM7QUFhVCxTQUFTLElBQUksS0FBYUEsT0FBb0I7QUFDNUMsU0FBTyxVQUNILEdBQUdBLE1BQUssSUFBSSxHQUFHLElBQUksUUFBUUEsTUFBSyxRQUFRQSxNQUFLLElBQUksQ0FBQyxHQUFHQSxNQUFLLEtBQUssS0FDL0Q7QUFDTjtBQUpTO0FBVUYsU0FBUyxNQUFNLEtBQXFCO0FBQ3pDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlCO0FBRmdCO0FBUVQsU0FBUyxLQUFLLEtBQXFCO0FBQ3hDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQy9CO0FBRmdCO0FBV1QsU0FBUyxJQUFJLEtBQXFCO0FBQ3ZDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQy9CO0FBRmdCO0FBUVQsU0FBUyxPQUFPLEtBQXFCO0FBQzFDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQy9CO0FBRmdCO0FBUVQsU0FBUyxVQUFVLEtBQXFCO0FBQzdDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQy9CO0FBRmdCO0FBUVQsU0FBUyxRQUFRLEtBQXFCO0FBQzNDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQy9CO0FBRmdCO0FBUVQsU0FBUyxPQUFPLEtBQXFCO0FBQzFDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQy9CO0FBRmdCO0FBUVQsU0FBUyxjQUFjLEtBQXFCO0FBQ2pELFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQy9CO0FBRmdCO0FBUVQsU0FBUyxNQUFNLEtBQXFCO0FBQ3pDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxJQUFJLEtBQXFCO0FBQ3ZDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxNQUFNLEtBQXFCO0FBQ3pDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxPQUFPLEtBQXFCO0FBQzFDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxLQUFLLEtBQXFCO0FBQ3hDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxRQUFRLEtBQXFCO0FBQzNDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxLQUFLLEtBQXFCO0FBQ3hDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxNQUFNLEtBQXFCO0FBQ3pDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxLQUFLLEtBQXFCO0FBQ3hDLFNBQU8sWUFBWSxHQUFHO0FBQ3hCO0FBRmdCO0FBUVQsU0FBUyxZQUFZLEtBQXFCO0FBQy9DLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxVQUFVLEtBQXFCO0FBQzdDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxZQUFZLEtBQXFCO0FBQy9DLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxhQUFhLEtBQXFCO0FBQ2hELFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxXQUFXLEtBQXFCO0FBQzlDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxjQUFjLEtBQXFCO0FBQ2pELFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxXQUFXLEtBQXFCO0FBQzlDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxZQUFZLEtBQXFCO0FBQy9DLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxRQUFRLEtBQXFCO0FBQzNDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxNQUFNLEtBQXFCO0FBQ3pDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxRQUFRLEtBQXFCO0FBQzNDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxTQUFTLEtBQXFCO0FBQzVDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxPQUFPLEtBQXFCO0FBQzFDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxVQUFVLEtBQXFCO0FBQzdDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxPQUFPLEtBQXFCO0FBQzFDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxRQUFRLEtBQXFCO0FBQzNDLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2hDO0FBRmdCO0FBUVQsU0FBUyxjQUFjLEtBQXFCO0FBQ2pELFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2pDO0FBRmdCO0FBUVQsU0FBUyxZQUFZLEtBQXFCO0FBQy9DLFNBQU8sSUFBSSxLQUFLLEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ2pDO0FBRmdCO0FBUVQsU0FBUyxjQUFjLEtBQXFCO0FBQ2pELFNBQU8sSUFBSSxLQUFLLEtB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
