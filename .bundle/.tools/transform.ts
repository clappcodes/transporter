var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import * as esbuild from "npm:esbuild@0.20.2";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader@^0.10.3";
async function ts2js(file) {
  let bundle = false;
  let minify = false;
  let cache = false;
  let src = false;
  let sourcemap = "inline";
  if (file.includes("://")) {
    const url = new URL(file);
    file = "." + url.pathname;
    minify = url.searchParams.has("minify");
    bundle = url.searchParams.has("bundle");
    cache = url.searchParams.has("cache");
    src = url.searchParams.has("src") || url.searchParams.has("source");
    sourcemap = url.searchParams.get("sourcemap") || bundle ? "linked" : "inline";
  }
  const outfile = src ? file : "./.bundle/" + file;
  try {
    if (!src && Deno.env.get("BUNDLE") === "true" && !cache) {
      await esbuild.build({
        plugins: [...denoPlugins({ configPath: Deno.cwd() + "/deno.json" })],
        entryPoints: [file],
        outfile,
        sourcemap,
        minify,
        bundle,
        format: "esm",
        write: true,
        platform: "neutral",
        target: "esnext",
        keepNames: true
      });
    }
    const _file = await Deno.open(outfile, { read: true });
    return _file.readable;
  } catch (e) {
    await esbuild.stop();
    console.log(e);
    throw e;
  }
}
__name(ts2js, "ts2js");
export {
  ts2js
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLnRvb2xzL3RyYW5zZm9ybS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0ICogYXMgZXNidWlsZCBmcm9tIFwibnBtOmVzYnVpbGRAMC4yMC4yXCI7XG5cbi8vIEltcG9ydCB0aGUgV0FTTSBidWlsZCBvbiBwbGF0Zm9ybXMgd2hlcmUgcnVubmluZyBzdWJwcm9jZXNzZXMgaXMgbm90XG4vLyBwZXJtaXR0ZWQsIHN1Y2ggYXMgRGVubyBEZXBsb3ksIG9yIHdoZW4gcnVubmluZyB3aXRob3V0IGAtLWFsbG93LXJ1bmAuXG4vLyBpbXBvcnQgKiBhcyBlc2J1aWxkIGZyb20gXCJodHRwczovL2Rlbm8ubGFuZC94L2VzYnVpbGRAMC4yMC4yL3dhc20uanNcIjtcblxuaW1wb3J0IHsgZGVub1BsdWdpbnMgfSBmcm9tIFwianNyOkBsdWNhL2VzYnVpbGQtZGVuby1sb2FkZXJAXjAuMTAuM1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdHMyanMoZmlsZTogc3RyaW5nKSB7XG4gIGxldCBidW5kbGUgPSBmYWxzZTtcbiAgbGV0IG1pbmlmeSA9IGZhbHNlO1xuICBsZXQgY2FjaGUgPSBmYWxzZTtcbiAgbGV0IHNyYyA9IGZhbHNlO1xuXG4gIGxldCBzb3VyY2VtYXA6XG4gICAgfCBib29sZWFuXG4gICAgfCBcImlubGluZVwiXG4gICAgfCBcImV4dGVybmFsXCJcbiAgICB8IFwibGlua2VkXCJcbiAgICB8IFwiYm90aFwiXG4gICAgfCB1bmRlZmluZWQgPSBcImlubGluZVwiO1xuXG4gIGlmIChmaWxlLmluY2x1ZGVzKFwiOi8vXCIpKSB7XG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChmaWxlKTtcbiAgICBmaWxlID0gXCIuXCIgKyB1cmwucGF0aG5hbWU7XG4gICAgbWluaWZ5ID0gdXJsLnNlYXJjaFBhcmFtcy5oYXMoXCJtaW5pZnlcIik7XG4gICAgYnVuZGxlID0gdXJsLnNlYXJjaFBhcmFtcy5oYXMoXCJidW5kbGVcIik7XG4gICAgY2FjaGUgPSB1cmwuc2VhcmNoUGFyYW1zLmhhcyhcImNhY2hlXCIpO1xuICAgIHNyYyA9IHVybC5zZWFyY2hQYXJhbXMuaGFzKFwic3JjXCIpIHx8IHVybC5zZWFyY2hQYXJhbXMuaGFzKFwic291cmNlXCIpO1xuXG4gICAgc291cmNlbWFwID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJzb3VyY2VtYXBcIikgYXMgdHlwZW9mIHNvdXJjZW1hcCB8fFxuICAgICAgICBidW5kbGVcbiAgICAgID8gXCJsaW5rZWRcIlxuICAgICAgOiBcImlubGluZVwiO1xuICB9XG4gIGNvbnN0IG91dGZpbGUgPSBzcmMgPyBmaWxlIDogXCIuLy5idW5kbGUvXCIgKyBmaWxlO1xuXG4gIHRyeSB7XG4gICAgaWYgKCFzcmMgJiYgRGVuby5lbnYuZ2V0KFwiQlVORExFXCIpID09PSBcInRydWVcIiAmJiAhY2FjaGUpIHtcbiAgICAgIGF3YWl0IGVzYnVpbGQuYnVpbGQoe1xuICAgICAgICBwbHVnaW5zOiBbLi4uZGVub1BsdWdpbnMoeyBjb25maWdQYXRoOiBEZW5vLmN3ZCgpICsgXCIvZGVuby5qc29uXCIgfSldLFxuICAgICAgICBlbnRyeVBvaW50czogW2ZpbGVdLFxuICAgICAgICBvdXRmaWxlLFxuICAgICAgICBzb3VyY2VtYXAsXG4gICAgICAgIG1pbmlmeSxcbiAgICAgICAgYnVuZGxlLFxuICAgICAgICBmb3JtYXQ6IFwiZXNtXCIsXG4gICAgICAgIHdyaXRlOiB0cnVlLFxuICAgICAgICBwbGF0Zm9ybTogXCJuZXV0cmFsXCIsXG4gICAgICAgIHRhcmdldDogXCJlc25leHRcIixcbiAgICAgICAga2VlcE5hbWVzOiB0cnVlLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZXNidWlsZC5zdG9wKCk7XG4gICAgLy8gcmV0dXJuIHJlc3VsdC5vdXRwdXRGaWxlcy5hdCgwKT8uY29udGVudHM7XG5cbiAgICBjb25zdCBfZmlsZSA9IGF3YWl0IERlbm8ub3BlbihvdXRmaWxlLCB7IHJlYWQ6IHRydWUgfSk7XG5cbiAgICByZXR1cm4gX2ZpbGUucmVhZGFibGU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBhd2FpdCBlc2J1aWxkLnN0b3AoKTtcbiAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB0aHJvdyBlOyAvLyBuZXcgVHlwZUVycm9yKGUpO1xuICAgIC8vIGNvbnNvbGUubG9nKGUpO1xuICAgIC8vIHJldHVybiBTdHJpbmcoZSk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7O0FBQUEsWUFBWSxhQUFhO0FBTXpCLFNBQVMsbUJBQW1CO0FBRTVCLGVBQXNCLE1BQU0sTUFBYztBQUN4QyxNQUFJLFNBQVM7QUFDYixNQUFJLFNBQVM7QUFDYixNQUFJLFFBQVE7QUFDWixNQUFJLE1BQU07QUFFVixNQUFJLFlBTVk7QUFFaEIsTUFBSSxLQUFLLFNBQVMsS0FBSyxHQUFHO0FBQ3hCLFVBQU0sTUFBTSxJQUFJLElBQUksSUFBSTtBQUN4QixXQUFPLE1BQU0sSUFBSTtBQUNqQixhQUFTLElBQUksYUFBYSxJQUFJLFFBQVE7QUFDdEMsYUFBUyxJQUFJLGFBQWEsSUFBSSxRQUFRO0FBQ3RDLFlBQVEsSUFBSSxhQUFhLElBQUksT0FBTztBQUNwQyxVQUFNLElBQUksYUFBYSxJQUFJLEtBQUssS0FBSyxJQUFJLGFBQWEsSUFBSSxRQUFRO0FBRWxFLGdCQUFZLElBQUksYUFBYSxJQUFJLFdBQVcsS0FDeEMsU0FDQSxXQUNBO0FBQUEsRUFDTjtBQUNBLFFBQU0sVUFBVSxNQUFNLE9BQU8sZUFBZTtBQUU1QyxNQUFJO0FBQ0YsUUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLElBQUksUUFBUSxNQUFNLFVBQVUsQ0FBQyxPQUFPO0FBQ3ZELFlBQU0sUUFBUSxNQUFNO0FBQUEsUUFDbEIsU0FBUyxDQUFDLEdBQUcsWUFBWSxFQUFFLFlBQVksS0FBSyxJQUFJLElBQUksYUFBYSxDQUFDLENBQUM7QUFBQSxRQUNuRSxhQUFhLENBQUMsSUFBSTtBQUFBLFFBQ2xCO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQSxRQUFRO0FBQUEsUUFDUixPQUFPO0FBQUEsUUFDUCxVQUFVO0FBQUEsUUFDVixRQUFRO0FBQUEsUUFDUixXQUFXO0FBQUEsTUFDYixDQUFDO0FBQUEsSUFDSDtBQUtBLFVBQU0sUUFBUSxNQUFNLEtBQUssS0FBSyxTQUFTLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFckQsV0FBTyxNQUFNO0FBQUEsRUFDZixTQUFTLEdBQUc7QUFDVixVQUFNLFFBQVEsS0FBSztBQUNuQixZQUFRLElBQUksQ0FBQztBQUNiLFVBQU07QUFBQSxFQUdSO0FBQ0Y7QUEzRHNCOyIsCiAgIm5hbWVzIjogW10KfQo=
