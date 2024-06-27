export default {
  fetch: (req: Request) =>
    new Response(`404 - Not Found\n${req.url}`, { status: 404 }),
};
