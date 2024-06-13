import { resolve } from "https://deno.land/std@0.224.0/path/resolve.ts";

if (Deno.mainModule) {
  const filePath = Deno.args.at(0);
  if (typeof filePath === "undefined") {
    throw new TypeError("Usage: \n\tdeno task run file.ts");
  }

  const resolvedPath = resolve(filePath);
  console.log(`\nrun: ${filePath}\n${resolvedPath}`);

  await import("./global.ts");
  await import(resolvedPath);
}
