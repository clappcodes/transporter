export default {
  fetch: (req) => `Hello from sub route ${req.context.url}`,
} as TApp.Serve;
