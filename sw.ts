declare const self: ServiceWorkerGlobalScope;
declare const app: import("./transporter/Router.ts").Router;

importScripts("/global.ts?bundle");

self.addEventListener("fetch", async (event: FetchEvent) => {
  await app.handleEvent(event);
});
