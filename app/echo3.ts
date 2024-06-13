export default defineApp({
  fetch(request) {
    return new Response([request.method, request.url].join(" "));
  },
  async start(options: unknown) {
    console.log("start", this.host);

    const response = await fetch(new URL("/testing", "https://" + this.host), {
      method: "POST",
      headers: {
        myName: "Serebano",
      },
    });

    await response.text().then(console.warn);
  },
});
