export default new TransportApp({
  fetch({ method, url }) {
    return new Response("Hello " + method + " " + url);
  },
});
