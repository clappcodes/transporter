export default {
  fetch: function foo(req: Request) {
    return new Response(req.body);
  },
} as TApp.Serve;
