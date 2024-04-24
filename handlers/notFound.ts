export default function notFoundHandler(request: Request): Response {
  return new Response(
    `
    <h1>404 - Not Found</h1>
    <code>${request.url}</code>`,
    {
      status: 404,
      headers: {
        "content-type": "text/html",
      },
    },
  );
}
