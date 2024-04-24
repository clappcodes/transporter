import { assertExists } from "@std/assert/assert-exists";

/*
`deno info --json` is unstable, and I didn't find any mention of schema for its
output in the docs, but here's a (conservative) partial type for the bits
that are relevant to this example, derived from looking at just a couple
of outputs from Deno v1.25.1:
*/

type ModuleInfo =
  & Record<"kind" | "local" | "mediaType" | "specifier", string>
  & Record<"emit" | "map", string | null>
  & {
    dependencies?: unknown[];
    size: number;
  };

type DependencyInspectorResult = {
  modules: ModuleInfo[];
  roots: string[];
};

/**
 * Creates a formatted error message and allows for improved error handling by
 * discriminating error instances
 */
class ProcessError extends Error {
  override name = "ProcessError";

  constructor(status: Deno.CommandStatus, stdErr?: string) {
    let msg = `The process exited with status code ${status.code}`;
    if (stdErr) msg += `. stderr:\n${stdErr}`;
    super(msg);
  }
}

/**
 * Parses output from `deno info --json`. The resulting command will look like:
 * `deno info --json [...denoInfoArgs] specifier`
 * @param specifier local/remote path/URL
 * @param denoInfoArgs optional, additional arguments to be used with `deno info --json`
 */
export async function getCachedModuleInfo(
  specifier: string | URL,
  denoInfoArgs?: string[],
): Promise<ModuleInfo> {
  const decoder = new TextDecoder();
  const specifierStr = String(specifier);

  const args = ["info", "--json"];
  if (denoInfoArgs?.length) args.push(...denoInfoArgs);
  args.push(specifierStr);

  const child = new Deno.Command(Deno.execPath(), { args });
  const { stderr, stdout, success, code, signal } = await child.output();

  if (!success) {
    const stdErr = decoder.decode(stderr).trim();
    throw new ProcessError({ signal, success, code }, stdErr);
  }

  const result = JSON.parse(
    decoder.decode(stdout),
  ) as DependencyInspectorResult;

  const modFile: string = "/" + specifierStr.split("/").pop()!;

  const moduleInfo = result.modules.find((info) =>
    info.specifier.endsWith(modFile) || info.specifier.endsWith(modFile + ".ts")
  );

  const mods = result.modules.map((i) => i.specifier);
  //   console.log("input", modFile);

  //   console.log(result.modules);
  assertExists(
    moduleInfo,
    "Module (" + modFile + ") not found in output\n" + mods.join("\n"),
  );
  return moduleInfo || {};
}

/**
 * `console.log` truncates long strings and deep object properties by default.
 * This overrides that behavior.
 */
function _print(value: unknown): void {
  const inspectOpts: Deno.InspectOptions = {
    colors: true,
    depth: Infinity,
    strAbbreviateSize: Infinity,
  };

  const formattedOutput = Deno.inspect(value, inspectOpts);
  console.log(formattedOutput);
}

// async function main() {
//   await import("jsr:@std/fmt/colors");
//   const moduleInfo = await getCachedModuleInfo(
//     "jsr:@std/fmt/colors",
//   );

//   const { local, specifier } = moduleInfo;
//   print({ specifier, local });
// }

// if (import.meta.main) main();
