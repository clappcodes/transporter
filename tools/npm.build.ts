import { build, emptyDir } from "https://deno.land/x/dnt@0.40.0/mod.ts";
import { join } from "https://deno.land/std@0.222.1/path/mod.ts";
import { makeOptions } from "./meta.ts";
import pkg from "../deno.json" with { type: "json" };

export async function buildPkg(version: string): Promise<void> {
  await emptyDir("./npm");
  const pkg = makeOptions(version);
  Deno.copyFile(
    join(".", "README.md"),
    join(pkg.outDir, "README.md"),
  );
  await build(pkg);
}

if (import.meta.main) {
  await buildPkg(pkg.version);
}
