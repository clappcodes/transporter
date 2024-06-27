import { bold, gray, yellow } from "./colors.ts";
import * as transporter from "./mod.ts";
import pkg from "./deno.json" with { type: "json" };

Object.assign(globalThis, { transporter }, transporter);

// if ("serviceWorker" in navigator) {
//   navigator.serviceWorker.register("/sw.ts");
// }

if (typeof document !== "undefined") {
  fetch("/transporter.txt").then((res) => res.text()).then((res) => {
    console.log(bold(gray(res)));
    Object.assign(globalThis, {
      TransporterLogo: res,
    });
  });
}

console.log(
  "\n\t" +
    bold(yellow(pkg.name)) + " " +
    gray(pkg.version) + "\n\n",
);

declare global {
  const readable: typeof transporter.readable;
  const writable: typeof transporter.writable;
  const transform: typeof transporter.transform;
}

export {};
