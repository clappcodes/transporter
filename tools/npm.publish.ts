// deno-lint-ignore-file
import { prerelease, valid } from "https://deno.land/x/semver@v1.4.1/mod.ts";
import { makeOptions } from "./meta.ts";
import denoPkg from "../deno.json" with { type: "json" };

if (import.meta.main) {
  const version = denoPkg.version;

  const isPrerelease = prerelease(version);
  const tag = isPrerelease?.[0] ?? "latest";

  const pkg = makeOptions(version);
  const result = await Deno.run({
    cmd: ["npm", "publish", pkg.outDir, "--tag", String(tag)],
    stdout: "piped",
  })
    .output();

  console.log(new TextDecoder().decode(result));
}
