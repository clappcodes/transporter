export default {
  fetch: (req) => [JSON.stringify(req.context, null, 4)],
} as TApp.Serve;
