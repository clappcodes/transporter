export default new TransportApp({
  async fetch(request) {
    const form = await request.formData();
    const name = form.get("name") || "World";

    return new Response(`Hello ${name}!`);
  },

  async start(options) {
    const body = new FormData();
    body.set("name", "Serebano");

    const response = await fetch("/xxx", {
      body,
    });

    console.log(options, await response.text());

    return response;
  },
});
