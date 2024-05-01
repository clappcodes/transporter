import { bgBlack, bold, gray, white } from "./colors.ts";
import * as transporter from "./mod.ts";

console.log(
  bgBlack(white(bold(transporter.package.name))) + " " +
    gray(transporter.package.version),
);

const table = {
  readable: Object.keys(transporter.readable),
  writable: Object.keys(transporter.writable),
  transform: Object.keys(transporter.transform),
};

console.log(table);

Object.assign(globalThis, transporter, { transporter });
